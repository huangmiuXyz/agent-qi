import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { persistPlugin } from "./store/plugins";

const app = createApp(App);
const pinia = createPinia();

pinia.use(persistPlugin);

app.use(router).use(pinia).mount("#app");
