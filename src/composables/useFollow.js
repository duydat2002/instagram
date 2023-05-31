import { db } from "@/firebase/init";
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { ref, onBeforeUnmount } from "vue";
import { updateWithTransaction } from "@/untils";
import store from "@/store/index";

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

  return { setFollow, deleteFollow, getFollowing, watchFollowChange };
};
