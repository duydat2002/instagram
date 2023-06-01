import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBWQyBNgTsh_-Q7P815mN8TUio746sgvU0",
  authDomain: "instagram-f9ac5.firebaseapp.com",
  projectId: "instagram-f9ac5",
  storageBucket: "instagram-f9ac5.appspot.com",
  messagingSenderId: "985655336439",
  appId: "1:985655336439:web:3add2c543c647263e0e2f2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
