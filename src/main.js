import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { FontAwesomeIcon } from "@/plugins/fontAwesome";
import store from "@/store/index";
import { auth } from "@/firebase/init";
import { onAuthStateChanged } from "firebase/auth";

import "@/assets/css/global.css";

let app = null;

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App);

    app.component("fa", FontAwesomeIcon);

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

    // app.directive("click-outside", {
    //   mounted(el, binding) {
    //     el._clickOutside = (event) => {
    //       if (!(el === event.target || el.contains(event.target))) {
    //         binding.value(event);
    //       }
    //     };
    //     document.body.addEventListener("click", el._clickOutside);
    //   },
    //   unmounted(el) {
    //     document.body.removeEventListener("click", el._clickOutside);
    //   },
    // });

    app.use(router).use(store).mount("#app");
  }
});
