import { createApp } from "vue";

import App from "@/App.vue";
import { router } from "@/router/index";
import store from "@/store/index";
import UI from "@/components/UI";

// Styles
import "@/assets/css/zero.css";
import "@/assets/css/base.css";
import "@/assets/css/feather-icon.css";
import "@/assets/css/sticky-footer.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const app = createApp(App)

UI.forEach(component => {
    app.component(component.name, component)
})

app.use(router).use(store).mount("#app");