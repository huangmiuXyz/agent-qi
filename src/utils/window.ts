import { WebviewOptions } from '@tauri-apps/api/webview';
import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
import { WindowOptions } from '@tauri-apps/api/window';

export const createWindow = (label: string, options: (Omit<WebviewOptions, "x" | "y" | "width" | "height"> & WindowOptions) | undefined): Promise<WebviewWindow> => {
    return new Promise((resolve, reject) => {
        const window = new WebviewWindow(label, options)
        window.once('tauri://created', () => {
            resolve(window)
        });
        window.once('tauri://error', (e) => {
            reject(e)
        });
    })
}

export const getWindowByLabel = (label: string) => {
    const window = WebviewWindow.getByLabel(label)
    return window
}
