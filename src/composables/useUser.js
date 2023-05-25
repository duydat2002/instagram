import { ref } from "vue";
import { auth, db } from "@/firebase/init";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs, or } from "firebase/firestore";

export const useUser = () => {
  const currentUser = ref(null);
  const user = ref(null);
  currentUser.value = auth.currentUser;

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

  const getUserInLogin = async (username, password) => {
    let user = null;

    try {
      const querySnapshot = await getDocs(
        query(
          collection(db, "users"),
          or(
            where("username", "==", username),
            where("phoneNumber", "==", username),
            where("email", "==", username)
          )
        )
      );

      if (querySnapshot.empty) {
        user = null;
      } else {
        querySnapshot.forEach((doc) => {
          user = doc.data();
        });
      }

      const userCredential = await signInWithEmailAndPassword(
        auth,
        user.email,
        password
      );

      user = userCredential.user;

      return user;
    } catch (error) {
      console.log(error);
    }
  };

  return { user, getUserWithQuery, getUserInLogin };
};
