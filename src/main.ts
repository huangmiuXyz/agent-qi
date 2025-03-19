import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { persistPlugin, syncPlugin } from "./store/plugins";
import "@/assets/styles/index.css";

const app = createApp(App);
const pinia = createPinia();

pinia.use(persistPlugin);
pinia.use(syncPlugin);

app.use(router).use(pinia).mount("#app");
