import { auth, db } from "@/firebase/init";
import {
  collection,
  doc,
  addDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import store from "@/store";
import { useStorage } from "@/composables/useStorage";

export const usePost = () => {
  const setPost = async () => {
    try {
      const { uploadPosts } = useStorage();

      const postRef = await addDoc(collection(db, "posts"), {});
      const postId = postRef.id;

      const dataUrls = [];
      store.getters["createPost/medias"].forEach((media) => {
        dataUrls.push(media.canvas.toDataURL());
      });
      const urls = await uploadPosts(postId, dataUrls);

      const post = {
        userId: auth.currentUser.uid,
        tags: [],
        caption: store.getters["createPost/caption"],
        contents: urls,
        createAt: serverTimestamp(),
      };

      await setDoc(doc(db, "posts", postId), post);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    setPost,
  };
};
