import { db } from "@/firebase/init";
import {
  doc,
  getDoc,
  setDoc,
  // updateDoc,
  deleteDoc,
  // runTransaction,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { ref, onBeforeUnmount } from "vue";
import { updateWithTransaction } from "@/untils";

export const useFollow = () => {
  const isFollowing = ref(null);
  const watchFollowChange = (followerId, followingId) => {
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

  const updateFollowCount = async (followerId, followingId) => {
    // Update followingCount of currentUser(followerId)
    const followerDocRef = doc(db, "users", followerId);
    await updateWithTransaction(
      followerDocRef,
      "insight.followingCount",
      (oldValue) => oldValue + 1
    );

    // Update followersCount of user(followingId)
    const followingDocRef = doc(db, "users", followingId);
    await updateWithTransaction(
      followingDocRef,
      "insight.followersCount",
      (oldValue) => oldValue + 1
    );
  };

  const updateUnfollowCount = async (followerId, followingId) => {
    // Update followingCount of currentUser(followerId)
    const followerDocRef = doc(db, "users", followerId);
    await updateWithTransaction(
      followerDocRef,
      "insight.followingCount",
      (oldValue) => oldValue - 1
    );

    // Update followersCount of user(followingId)
    const followingDocRef = doc(db, "users", followingId);
    await updateWithTransaction(
      followingDocRef,
      "insight.followersCount",
      (oldValue) => oldValue + 1
    );
  };

  return { setFollow, deleteFollow, getFollowing, watchFollowChange };
};
