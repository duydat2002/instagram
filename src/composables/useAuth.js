import { ref } from "vue";
import { auth, db } from "@/firebase/init";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  or,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export const useAuth = () => {
  const authError = ref(null);

  const signUp = async (email, password, fullname, username) => {
    authError.value = null;

    try {
      let user = null;

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      user = userCredential.user;

      const userData = {
        email,
        fullname,
        username,
        avatar: "",
        bio: "",
        insight: { followersCount: 0, followingCount: 0, postsCount: 0 },
      };

      await setDoc(doc(db, "users", user.uid), userData);

      return user;
    } catch (error) {
      let message = "";
      switch (error.code) {
        case "auth/invalid-email":
          message = "Email không hợp lệ.";
          break;
        case "auth/missing-password":
          message = "Bạn chưa nhập mật khẩu.";
          break;
        case "auth/weak-password":
          message = "Mật khẩu yếu, hãy đổi sang mật khẩu khác mạnh hơn.";
          break;
        case "auth/email-already-in-use":
          message = "Một tài khoản khác đang dùng chung email.";
          break;
      }
      authError.value = message;
    }
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
      console.log(user);

      return user;
    } catch (error) {
      console.log(error);
    }
  };

  return { authError, signUp, getUserInLogin };
};
