import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "@/assets/css/global.css";

const app = createApp(App);

app.directive("click-outside", {
  mounted(el, binding) {
    el._clickOutside = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    document.body.addEventListener("click", el._clickOutside);
  },
  unmounted(el) {
    document.body.removeEventListener("click", el._clickOutside);
  },
});

app.use(router).mount("#app");
