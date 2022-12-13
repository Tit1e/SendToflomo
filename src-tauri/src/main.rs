#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use dirs;
use rusqlite::{Connection, Result};
use serde::Serialize;
use serde_json::to_string;
use plist;
use std::fs::File;
use std::io::BufReader;

#[derive(Serialize, Debug)]
pub struct Data {
    books: String,
    notes: String,
}
#[derive(Serialize, Debug)]
pub struct Book {
    id: String,
    broader_text: String,
    selected_text: String,
    note: String,
    chapter: String,
    localtion: String,
}

fn get_data() -> Result<Vec<Book>> {
    let home_dir = dirs::home_dir().unwrap();
    let _home_dir = home_dir.display();
    let sqlite_path = format!("{}/Library/Containers/com.apple.iBooksX/Data/Documents/AEAnnotation/AEAnnotation_v10312011_1727_local.sqlite", _home_dir);
    let conn = Connection::open(sqlite_path)?;

    // Execute SQL query
    let mut stmt = conn.prepare("SELECT
        COALESCE(ZANNOTATIONREPRESENTATIVETEXT, '') as broader_text,
        COALESCE(ZANNOTATIONSELECTEDTEXT, '') as selected_text,
        COALESCE(ZANNOTATIONNOTE, '') as note,
        COALESCE(ZFUTUREPROOFING5, '') as chapter,
        COALESCE(ZANNOTATIONLOCATION, '') as localtion,
        COALESCE(ZANNOTATIONASSETID, '') as id
    FROM ZAEANNOTATION
    WHERE ZANNOTATIONSELECTEDTEXT IS NOT NULL
    AND ZANNOTATIONDELETED = 0
    ORDER BY ZANNOTATIONASSETID ASC")?;

    let book_iterator = stmt.query_map([], |row| {
        Ok(Book {
            broader_text: row.get(0)?,
            selected_text: row.get(1)?,
            note: row.get(2)?,
            chapter: row.get(3)?,
            localtion: row.get(4)?,
            id: row.get(5)?,
        })
    })?;
    let mut books:Vec<Book> = Vec::new();

    for book in book_iterator {
        books.push(book?);
    }
    Ok(books)
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn get_apple_books() -> String {
    let home_dir = dirs::home_dir().unwrap();
    let _home_dir = home_dir.display();
    let plist_file = format!("{}/Library/Containers/com.apple.BKAgentService/Data/Documents/iBooks/Books/Books.plist", _home_dir);
    let file = File::open(plist_file).unwrap();
    let reader = BufReader::new(file);
    let plist: plist::Value = plist::from_reader(reader).unwrap();
    let books = to_string(&plist).unwrap();


    let data = get_data().unwrap();
    let notes = to_string(&data).unwrap();
    let res:Data = Data{
        books: books,
        notes: notes
    };
    to_string(&res).unwrap()
}

mod menu;

fn main() {
    let context = tauri::generate_context!();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_apple_books])
        .plugin(tauri_plugin_positioner::init())
        .menu(menu::init(&context))
        .on_menu_event(menu::handler)
        .run(context)
        .expect("error while running tauri application");
}
