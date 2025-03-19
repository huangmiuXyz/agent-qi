import { Window, WindowOptions } from '@tauri-apps/api/window';

export const createWindow = (label: string, options: WindowOptions): Promise<Window> => {
    return new Promise((resolve, reject) => {
        const window = new Window(label, options)
        window.once('tauri://created', () => {
            resolve(window)
        });
        window.once('tauri://error', (e) => {
            reject(e)
        });
    })
}

export const getWindowByLabel = (label: string) => {
    const window = Window.getByLabel(label)
    return window
}
