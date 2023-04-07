import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";

import "./index.css";
// vant 兼容 pc端的touch 操作， 引入模块后自动生效
import "@vant/touch-emulator";
import "vant/lib/index.css";

const app = createApp(App);
app.use(router);

app.mount("#app");
