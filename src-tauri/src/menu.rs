use tauri::{
  utils::assets::EmbeddedAssets,Manager
};
use tauri::{Context, CustomMenuItem, Menu, Submenu, WindowMenuEvent, MenuItem};

// 应用菜单项
pub fn init(_context: &Context<EmbeddedAssets>) -> Menu {
    // 应用名称
    // let name = &_context.package_info().name;
    let version = &_context.package_info().version;
    let about = format!("Version: {}", version);
    let app_menu = Submenu::new(
        "",
        Menu::new()
          .add_item(CustomMenuItem::new("about".to_string(), about).disabled().into())
          .add_native_item(MenuItem::Separator)
            .add_item(
              CustomMenuItem::new("reload".to_string(), "刷新")
                .accelerator("CmdOrCtrl+R"),
            )
          .add_native_item(MenuItem::Separator)
          .add_item(
            CustomMenuItem::new("restart".to_string(), "重启应用")
            .accelerator("CmdOrCtrl+Shift+R"),
          )
          .add_native_item(MenuItem::Separator)
          .add_item(
            CustomMenuItem::new("dev_tools".to_string(), "控制台")
                .accelerator("F12"),
          )
          .add_native_item(MenuItem::Separator)
          .add_item(CustomMenuItem::new("quit".to_string(), "退出").accelerator("CmdOrCtrl+Q").into())
    );
    let edit_menu = Submenu::new(
      "编辑",
      Menu::new()
        .add_native_item(MenuItem::Undo)
        .add_native_item(MenuItem::Redo)
        .add_native_item(MenuItem::Separator)
        .add_native_item(MenuItem::Cut)
        .add_native_item(MenuItem::Copy)
        .add_native_item(MenuItem::Paste)
        .add_native_item(MenuItem::SelectAll),
    );

    Menu::new()
        .add_submenu(app_menu)
        .add_submenu(edit_menu)
}

// 应用菜单处理事件
pub fn handler(event: WindowMenuEvent<tauri::Wry>) {
  // 匹配菜单 id
  let win = Some(event.window()).unwrap();
  let app = win.app_handle();
  match event.menu_item_id() {
    "restart" => tauri::api::process::restart(&app.env()),
    "reload" => win.eval("window.location.reload()").unwrap(),
    "dev_tools" => {
      win.open_devtools();
      win.close_devtools();
    }
    "quit" => {
      std::process::exit(0);
    }
    _ => {}
  }
}