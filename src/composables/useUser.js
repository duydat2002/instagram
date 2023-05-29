import { ref } from "vue";
import { auth, db } from "@/firebase/init";
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";

export const useUser = () => {
  const currentUser = ref(null);
  const user = ref(null);
  currentUser.value = auth.currentUser;

  const getUser = async () => {
    // console.log(auth.currentUser);
    const docSnap = await getDoc(doc(db, "users", auth.currentUser.uid));

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
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
        user = doc.data();
      });
    }

    return user;
  };

  const getUserWithUsername = async (username) => {
    return await getUserWithQuery("username", "==", username);
  };

  return {
    user,
    getUser,
    getUserWithQuery,
    getUserWithUsername,
  };
};
