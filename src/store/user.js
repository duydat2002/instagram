import { auth, db } from "@/firebase/init";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

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
  },
  actions: {
    async initCurrentUser({ commit }) {
      await onAuthStateChanged(auth, async (user) => {
        if (user) {
          const docSnap = await getDoc(doc(db, "users", user.uid));

          if (docSnap.exists()) {
            commit("setCurrentUser", {
              id: docSnap.id,
              ...docSnap.data(),
            });
          } else {
            commit("setCurrentUser", null);
          }
        } else {
          commit("setCurrentUser", null);
        }
      });
    },
  },
};

export default user;
