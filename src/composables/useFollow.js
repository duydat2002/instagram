import { db } from "@/firebase/init";
import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  query,
  where,
  collection,
} from "firebase/firestore";
import { ref, onBeforeUnmount } from "vue";
import { updateWithTransaction } from "@/untils";
import store from "@/store/index";
import { get as lodashGet } from "lodash";

export const useFollow = () => {
  const isFollowing = ref(null);
  const watchFollowChange = async (followerId, followingId) => {
    const unsubscribe = onSnapshot(
      doc(db, "followers", `${followerId}-${followingId}`),
      (doc) => {
        if (!doc.metadata.hasPendingWrites) {
          if (doc.exists()) {
            isFollowing.value = true;
          } else {
            isFollowing.value = false;
          }
        }
      }
    );

    onBeforeUnmount(() => {
      unsubscribe();
    });

    return isFollowing;
  };

  const getFollows = async (fieldNameFind, fieldNameGet, value) => {
    //Get followers => followingId = userId => get all user - followedId
    const users = ref([]);
    const querySnap = await getDocs(
      query(collection(db, "followers"), where(fieldNameFind, "==", value))
    );
    querySnap.forEach(async (followDoc) => {
      const docSnap = await getDoc(
        doc(db, "users", lodashGet(followDoc.data(), fieldNameGet))
      );
      if (docSnap.exists()) {
        users.value.push({
          id: docSnap.id,
          ...docSnap.data(),
        });
      }
    });

    return users;
  };

  const getFollowing = async (followerId, followingId) => {
    const docSnap = await getDoc(
      doc(db, "followers", `${followerId}-${followingId}`)
    );

    if (docSnap.exists()) {
      console.log("followed");
      return true;
    } else {
      console.log("unfollowed");
      return false;
    }
  };

  const setFollow = async (followerId, followingId) => {
    try {
      await setDoc(doc(db, "followers", `${followerId}-${followingId}`), {
        followerId,
        followingId,
        createAt: serverTimestamp(),
      });
      await updateFollowCount(followerId, followingId);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFollow = async (followerId, followingId) => {
    try {
      await deleteDoc(doc(db, "followers", `${followerId}-${followingId}`));
      await updateUnfollowCount(followerId, followingId);
    } catch (error) {
      console.log(error);
    }
  };

  //Update currentUser, user when follow user
  const updateFollowCount = async (followerId, followingId) => {
    // Update followingCount of currentUser(followerId)
    const followerDocRef = doc(db, "users", followerId);
    const updatedCurrentUserData = await updateWithTransaction(
      followerDocRef,
      "insight.followingCount",
      (oldValue) => oldValue + 1
    );
    // Update currentUser data in store
    store.commit("user/setCurrentUser", updatedCurrentUserData);

    // Update followersCount of user(followingId)
    const followingDocRef = doc(db, "users", followingId);
    const updatedUserData = await updateWithTransaction(
      followingDocRef,
      "insight.followersCount",
      (oldValue) => oldValue + 1
    );
    // Update currentUser data in store
    store.commit("user/setUser", updatedUserData);
  };

  //Update currentUser, user when unfollow user
  const updateUnfollowCount = async (followerId, followingId) => {
    // Update followingCount of currentUser(followerId)
    const followerDocRef = doc(db, "users", followerId);
    const updatedCurrentUserData = await updateWithTransaction(
      followerDocRef,
      "insight.followingCount",
      (oldValue) => oldValue - 1
    );
    // Update currentUser data in store
    store.commit("user/setCurrentUser", updatedCurrentUserData);

    // Update followersCount of user(followingId)
    const followingDocRef = doc(db, "users", followingId);
    const updatedUserData = await updateWithTransaction(
      followingDocRef,
      "insight.followersCount",
      (oldValue) => oldValue - 1
    );
    // Update currentUser data in store
    store.commit("user/setUser", updatedUserData);
  };

  return {
    setFollow,
    deleteFollow,
    getFollowing,
    getFollows,
    watchFollowChange,
  };
};
