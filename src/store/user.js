import { auth } from "@/firebase/init";
import { onAuthStateChanged } from "firebase/auth";
import { useUser } from "@/composables/useUser";

const user = {
  namespaced: true,
  state() {
    return {
      user: null, //Người dùng đang xem trang cá nhân
      currentUser: null, //Người dùng đang đăng nhập
    };
  },
  getters: {
    user: (state) => state.user,
    currentUser: (state) => state.currentUser,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setCurrentUser(state, currentUser) {
      state.currentUser = currentUser;
    },
    updateUser(state, payload) {
      Object.assign(state.user, payload);
    },
    updateCurrentUser(state, payload) {
      Object.assign(state.currentUser, payload);
    },
  },
  actions: {
    async initCurrentUser({ commit }) {
      const { getCurrentUser } = useUser();
      if (auth.currentUser) commit("setCurrentUser", await getCurrentUser());
      await onAuthStateChanged(auth, async (user) => {
        if (user) {
          commit("setCurrentUser", await getCurrentUser());
        } else {
          commit("setCurrentUser", null);
        }
      });
    },
  },
};

export default user;
