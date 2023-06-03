import { createStore } from "vuex";
import user from "./user";
import loading from "./loading";
import modal from "./modal";
import theme from "./theme";

const store = createStore({
  modules: {
    user,
    loading,
    modal,
    theme,
  },
});

export default store;
