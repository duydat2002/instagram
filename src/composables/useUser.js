import { ref } from "vue";
import { auth, db } from "@/firebase/init";
import { collection, query, where, getDocs } from "firebase/firestore";

export const useUser = () => {
  const currentUser = ref(null);
  const user = ref(null);
  currentUser.value = auth.currentUser;

  const getUserWithQuery = async (field, condition, value) => {
    const querySnapshot = await getDocs(
      query(collection(db, "users"), where(field, condition, value))
    );

    if (querySnapshot.empty) {
      user.value = null;
    } else {
      querySnapshot.forEach((doc) => {
        user.value = doc.data();
      });
    }

    return querySnapshot;
  };

  return { user, getUserWithQuery };
};
