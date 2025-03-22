import { createPinia } from "pinia";
import { persistPlugin, syncPlugin } from "./plugins";
export const piniaInstance = createPinia();


piniaInstance.use(persistPlugin);
if (window.__TAURI_OS_PLUGIN_INTERNALS__) {
    piniaInstance.use(syncPlugin);
}