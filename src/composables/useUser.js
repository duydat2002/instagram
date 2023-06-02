import { ref, onUnmounted } from "vue";
import { auth, db } from "@/firebase/init";
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import store from "@/store";

export const useUser = () => {
  const currentUser = ref(null);
  const user = ref(null);
  currentUser.value = auth.currentUser;

  const getUser = async (userId) => {
    const docSnap = await getDoc(doc(db, "users", userId));

    if (docSnap.exists()) {
      user.value = {
        id: docSnap.id,
        ...docSnap.data(),
      };
    } else {
      user.value = null;
    }

    return user;
  };

  const getCurrentUser = async () => {
    return await getUser(auth.currentUser.uid);
  };

  const watchUserChange = (userId) => {
    const unsubscribe = onSnapshot(doc(db, "users", userId), (doc) => {
      if (doc.exists()) {
        console.log("Data change", userId);
        if (userId == store.getters["user/currentUser"]?.id) {
          store.commit("user/updateCurrentUser", {
            ...doc.data(),
          });
          console.log(store.getters["user/currentUser"]?.id);
        }

        if (userId == store.getters["user/user"]?.id) {
          store.commit("user/updateUser", {
            ...doc.data(),
          });
          console.log(store.getters["user/user"]?.id);
        }
      }
    });

    onUnmounted(() => {
      unsubscribe();
    });
  };

  const getUserWithQuery = async (field, condition, value) => {
    let user = null;

    const querySnapshot = await getDocs(
      query(collection(db, "users"), where(field, condition, value))
    );

    if (querySnapshot.empty) {
      user = null;
    } else {
      querySnapshot.forEach((doc) => {
        user = {
          id: doc.id,
          ...doc.data(),
        };
      });
    }

    return user;
  };

  const getUserWithUsername = async (username) => {
    return await getUserWithQuery("username", "==", username);
  };

  const updateAvatar = async (userId, avatar) => {
    await updateDoc(doc(db, "users", userId), {
      avatar: avatar,
    });

    // store.commit("user/updateCurrentUser", {
    //   avatar: avatar,
    // });

    // if (userId == auth.currentUser.uid)
    //   store.commit("user/updateUser", {
    //     avatar: avatar,
    //   });
  };

  return {
    user,
    getUser,
    getCurrentUser,
    watchUserChange,
    getUserWithQuery,
    getUserWithUsername,
    updateAvatar,
  };
};
