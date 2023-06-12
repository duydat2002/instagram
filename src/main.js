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
        if (!binding.modifiers.short) {
          let mouseDownPosition = null;

          el._mouseDownEvent = (event) => {
            if (!(el === event.target || el.contains(event.target))) {
              mouseDownPosition = { x: event.clientX, y: event.clientY };
            }
          };

          el._mouseUpEvent = (event) => {
            const mouseUpPosition = { x: event.clientX, y: event.clientY };

            if (
              mouseDownPosition &&
              mouseDownPosition.x == mouseUpPosition.x &&
              mouseDownPosition.y == mouseUpPosition.y
            ) {
              binding.value(event);
            }

            mouseDownPosition = null;
          };

          document.body.addEventListener("mousedown", el._mouseDownEvent);
          document.body.addEventListener("mouseup", el._mouseUpEvent);
        } else {
          el._clickEvent = (event) => {
            if (!(el === event.target || el.contains(event.target))) {
              binding.value(event);
            }
          };

          document.body.addEventListener("mousedown", el._clickEvent);
        }
      },
      unmounted(el, binding) {
        if (!binding.modifiers.short) {
          document.body.removeEventListener("mousedown", el._mouseDownEvent);
          document.body.removeEventListener("mouseup", el._mouseUpEvent);
        } else {
          document.body.removeEventListener("mousedown", el._clickEvent);
        }
      },
    });

    app.use(router).use(store).mount("#app");
  }
});
