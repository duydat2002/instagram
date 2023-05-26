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
    initUser({ state, commit }) {
      console.log("Init User");
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const docSnap = await getDoc(doc(db, "users", user.uid));

          if (docSnap.exists()) {
            console.log("Has user");
            commit("setUser", docSnap.data());
          } else {
            console.log("No user");
            commit("setUser", null);
          }
        } else {
          console.log("No user");
          commit("setUser", null);
        }
        console.log(state.user);
      });
    },
  },
});

export default store;
