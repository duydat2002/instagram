import { createStore } from "vuex";
import user from "./user";
import splashLoading from "./splashLoading";
import modal from "./modal";

const store = createStore({
  modules: {
    user,
    splash: splashLoading,
    modal,
  },
});

export default store;
