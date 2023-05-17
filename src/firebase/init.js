import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBWQyBNgTsh_-Q7P815mN8TUio746sgvU0",
  authDomain: "instagram-f9ac5.firebaseapp.com",
  projectId: "instagram-f9ac5",
  storageBucket: "instagram-f9ac5.appspot.com",
  messagingSenderId: "985655336439",
  appId: "1:985655336439:web:3add2c543c647263e0e2f2",
};

const app = initializeApp(firebaseConfig);
export default getFirestore(app);
