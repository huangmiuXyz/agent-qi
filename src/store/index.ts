import { createPinia } from "pinia";
import { persistPlugin, syncPlugin } from "./plugins";
export const piniaInstance = createPinia();


piniaInstance.use(persistPlugin);
piniaInstance.use(syncPlugin);