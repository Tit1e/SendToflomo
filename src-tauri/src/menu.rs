use tauri::utils::assets::EmbeddedAssets;
use tauri::{Context, CustomMenuItem, Menu, Submenu, WindowMenuEvent, MenuItem};

// 应用菜单项
pub fn init(_context: &Context<EmbeddedAssets>) -> Menu {
    // 应用名称
    let name = &_context.package_info().name;
    let version = &_context.package_info().version;
    let about = format!("{} v{}", name, version);
    let app_menu = Submenu::new(
        "",
        Menu::new()
          .add_item(CustomMenuItem::new("about".to_string(), about).disabled().into())
          .add_native_item(MenuItem::Separator)
          .add_item(CustomMenuItem::new("quit".to_string(), "退出").accelerator("CmdOrCtrl+Q").into())
    );

    Menu::new()
        .add_submenu(app_menu)
}

// 应用菜单处理事件
pub fn handler(event: WindowMenuEvent) {
    // 匹配菜单 id
    match event.menu_item_id() {
        "quit" => {
            std::process::exit(0);
        }
        _ => {}
    }
}