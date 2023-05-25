import { createStore } from "vuex";
import { auth, db } from "@/firebase/init";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const store = createStore({
  state() {
    return {
      user: null,
    };
  },
  getters: {
    user: (state) => state.user,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    initUser({ commit }) {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const docSnap = await getDoc(doc(db, "users", user.uid));

          if (docSnap.exists()) {
            commit("setUser", docSnap.data());
          } else {
            commit("setUser", null);
          }
        } else {
          commit("setUser", null);
        }
      });
    },
  },
});

export default store;
