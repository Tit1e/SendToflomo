import { dexieGet, dexieAdd } from '@/db/dexie'
import md5 from 'md5'
import init from '@/utils/init.js'
import { invoke } from "@tauri-apps/api/tauri";




export async function readSQLite({ books = '{}', notes = '[]' }) {
  try {
    const { Books = [] } = JSON.parse(books)
    const allnotes = JSON.parse(notes)
    if (Books && Books.length) {
      books = Books
      for (let i = 0; i < Books.length; i++) {
        const {itemName} = Books[i]
        const title = itemName
        const uuid = md5(title)
        let bookInfo = {
          uuid,
          title,
          book: title,
          from: 'applebooks',
        }
        const res = await dexieGet(uuid, 'books')
        if (!res) {
          await dexieAdd(bookInfo, 'books')
        }
      }
    }
    if (allnotes.length) {
      try {
        for (let d = 0; d < allnotes.length; d++) {
          const i = allnotes[d]
          const index = books.findIndex( v => v.BKGeneratedItemId === i.id)
          if (index > -1) {
            const title = books[index].itemName
            const text = i.selected_text
            const note = i.note || ''
            const localtion = i.localtion || ''
            const assetid = i.id || ''
            const uuid = md5(`${title}${text}`)
            let noteItem = {
              uuid,
              title,
              text,
              note,
              localtion,
              assetid,
              content_update: '',
              uploaded: false,
              from: 'applebooks'
            }
            const res = await dexieGet(uuid)
            if (!res) {
              await dexieAdd(noteItem)
            }
          }
        }
      } catch (error) {
        return Promise.reject(error)
      }
    }
    await init(Books.map(i => i.itemName))
    return Promise.resolve(true)
  } catch (error) {
    return Promise.reject(error)
  }
}

export default async function parseAppleBooks() {
  const json = await invoke("get_apple_books")
  await readSQLite(JSON.parse(json))
}