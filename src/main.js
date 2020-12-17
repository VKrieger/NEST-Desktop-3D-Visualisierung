import { createApp } from "vue";
import App from "./App.vue";
import global from "./store/global";

createApp(App).provide("global", global).mount("#app");
