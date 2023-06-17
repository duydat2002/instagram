// import store from "@/store/index";
import { auth, storage } from "@/firebase/init";
import {
  ref,
  uploadBytes,
  uploadString,
  getDownloadURL,
} from "firebase/storage";

export const useStorage = () => {
  const setAvatar = async (userId, file) => {
    try {
      const snapshot = await uploadBytes(
        ref(storage, `${userId}/avatar/${userId}.jpg`),
        file,
        {
          contentType: file.type,
        }
      );

      const url = await getDownloadURL(snapshot.ref);

      // store.commit("user/setUser")

      return url;
    } catch (err) {
      console.log(err);
    }
  };

  const uploadPost = async (name, dataUrl) => {
    try {
      const snapshot = await uploadString(
        ref(storage, name),
        dataUrl,
        "data_url"
      );

      const url = await getDownloadURL(snapshot.ref);

      return url;
    } catch (err) {
      console.log(err);
    }
  };

  const uploadPosts = async (postId, dataUrls) => {
    const promises = dataUrls.map(async (dataUrl, index) => {
      const url = await uploadPost(
        `${auth.currentUser.uid}/posts/${postId}/media-${index}.png`,
        dataUrl
      );
      return url;
    });

    const urls = await Promise.all(promises);
    return urls;
  };

  return { setAvatar, uploadPosts };
};
