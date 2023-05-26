import { ref } from "vue";
import { auth, db } from "@/firebase/init";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  query,
  where,
  // doc,
  // getDoc,
  getDocs,
  or,
} from "firebase/firestore";

export const useUser = () => {
  const currentUser = ref(null);
  const user = ref(null);
  currentUser.value = auth.currentUser;

  const getUser = async () => {
    console.log(auth.currentUser);
    // const docSnap = await getDoc(doc(db, "users", auth.currentUser.uid));

    // if (docSnap.exists()) {
    //   return docSnap.data();
    // } else {
    //   return null;
    // }
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

  const getUserInLogin = async (username, password) => {
    try {
      let user = null;
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

  return { user, getUser, getUserWithQuery, getUserInLogin };
};
