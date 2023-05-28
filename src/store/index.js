import { createStore } from "vuex";
import user from "./user";
import splashLoading from "./splashLoading";
import modal from "./modal";
import theme from "./theme";

const store = createStore({
  modules: {
    user,
    splash: splashLoading,
    modal,
    theme,
  },
});

export default store;
