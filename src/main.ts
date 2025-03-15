import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { persistPlugin } from "./store/plugins";
import "ant-design-vue/dist/reset.css";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import "@/assets/styles/index.css";
import { RecycleScroller } from "vue-virtual-scroller";

const app = createApp(App);
app.component("RecycleScroller", RecycleScroller);
const pinia = createPinia();

pinia.use(persistPlugin);

app.use(router).use(pinia).mount("#app");
