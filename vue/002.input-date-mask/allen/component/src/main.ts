import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import Aura from "@primeuix/themes/aura";

const app = createApp(App);
app.use(ToastService);
app.use(createPinia());
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

app.mount("#app");
