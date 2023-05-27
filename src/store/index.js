import { createStore } from "vuex";
import { auth, db } from "@/firebase/init";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const store = createStore({
  state() {
    return {
      isLoading: false,
      progress: 0,
      user: null,
    };
  },
  getters: {
    isLoading: (state) => state.isLoading,
    progress: (state) => state.progress,
    user: (state) => state.user,
  },
  mutations: {
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setProgress(state, progress) {
      console.log(progress);
      state.progress = progress;
    },
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
