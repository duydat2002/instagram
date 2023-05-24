import { ref } from "vue";
import { auth, db } from "@/firebase/init";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const useAuth = () => {
  const authUser = ref(null);
  const authError = ref(null);

  const signUp = async (email, password, fullname, username) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email,
        fullname,
        username,
      });

      authUser.value = user;
    } catch (error) {
      let message = "";
      switch (error.code) {
        case "auth/invalid-email":
          message = "Invalid Email";
          break;
        case "auth/missing-password":
          message = "Missing Password";
          break;
        case "auth/weak-password":
          message = "Weak Password";
          break;
        case "auth/email-already-in-use":
          message = "Email Already In Use";
          break;
      }
      authError.value = message;
    }
  };

  return { authUser, authError, signUp };
};
