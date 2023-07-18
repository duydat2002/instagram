import { auth, db } from "@/firebase/init";
import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
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

      let type = "image";
      if (urls.length > 1) {
        type = "multiple";
      } else {
        // store.getters["createPost/medias"][0]
        type = "image";
      }

      const post = {
        userId: auth.currentUser.uid,
        caption: store.getters["createPost/caption"],
        contents: urls,
        type,
        likeCount: 0,
        commentCount: 0,
        tags: [],
        comments: [],
        createdAt: serverTimestamp(),
      };

      await setDoc(doc(db, "posts", postId), post);
    } catch (error) {
      console.log(error);
    }
  };

  const getPosts = async (userId) => {
    try {
      const posts = [];

      const querySnapshot = await getDocs(
        query(collection(db, "posts"), where("userId", "==", userId))
      );

      querySnapshot.forEach((doc) => {
        posts.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      return posts;
    } catch (error) {
      console.log(error);
    }
  };

  const getPost = async (postId) => {
    try {
      const docSnap = await getDoc(doc(db, "posts", postId));

      if (docSnap.exists()) {
        return {
          id: postId,
          ...docSnap.data(),
        };
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    setPost,
    getPosts,
    getPost,
  };
};
