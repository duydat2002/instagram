// import store from "@/store/index";
import { storage } from "@/firebase/init";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const useStorage = () => {
  const setAvatar = async (userId, file) => {
    try {
      const snapshot = await uploadBytes(
        ref(storage, `${userId}/avatar/${file.name}`),
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

  return { setAvatar };
};
