use tauri::{TitleBarStyle, WebviewUrl, WebviewWindowBuilder};

pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let win_builder = WebviewWindowBuilder::new(app, "main", WebviewUrl::default())
                .title("agent-qi")
                .inner_size(900.0, 600.0);

            // 仅在 macOS 时设置标题栏样式
            #[cfg(target_os = "macos")]
            let win_builder = win_builder.title_bar_style(TitleBarStyle::Overlay);

            let window = win_builder.build().unwrap();

            // 仅在构建 macOS 时设置背景颜色和窗口属性
            #[cfg(target_os = "macos")]
            {
                use cocoa::appkit::{NSColor, NSWindow, NSWindowTitleVisibility};
                use cocoa::base::{id, nil, YES};

                let ns_window = window.ns_window().unwrap() as id;
                unsafe {
                    // 设置背景颜色
                    let bg_color = NSColor::colorWithRed_green_blue_alpha_(
                        nil,
                        50.0 / 255.0,
                        158.0 / 255.0,
                        163.5 / 255.0,
                        1.0,
                    );
                    ns_window.setBackgroundColor_(bg_color);

                    // 设置标题栏为悬浮样式
                    ns_window.setTitleVisibility_(NSWindowTitleVisibility::NSWindowTitleHidden);
                    ns_window.setTitlebarAppearsTransparent_(YES);
                }
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
