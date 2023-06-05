import { createStore } from "vuex";
import user from "./user";
import loading from "./loading";
import modal from "./modal";
import theme from "./theme";
import createPost from "./createPost";

const store = createStore({
  modules: {
    user,
    loading,
    modal,
    theme,
    createPost,
  },
});

export default store;
