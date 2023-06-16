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
import { updateWithTransaction } from "@/utils";
import store from "@/store/index";
import { get as lodashGet } from "lodash";

export const useFollow = () => {
  const checkFollowing = ref(null);
  const watchFollowChange = async (followerId, followingId) => {
    const unsubscribe = onSnapshot(
      doc(db, "followers", `${followerId}-${followingId}`),
      (doc) => {
        if (!doc.metadata.hasPendingWrites) {
          if (doc.exists()) {
            checkFollowing.value = true;
          } else {
            checkFollowing.value = false;
          }
        }
      }
    );

    onBeforeUnmount(() => {
      unsubscribe();
    });

    return checkFollowing;
  };

  const getFollows = async (fieldNameFind, fieldNameGet) => {
    //Ex: Get followers => followingId = userId => get all user - followedId
    const currentUser = store.getters["user/currentUser"];
    const user = store.getters["user/user"];
    let hasCurrentUser = false;
    const users = ref([]);

    const querySnap = await getDocs(
      query(collection(db, "followers"), where(fieldNameFind, "==", user.id))
    );

    const promises = querySnap.docs.map(async (followDoc) => {
      const docSnap = await getDoc(
        doc(db, "users", lodashGet(followDoc.data(), fieldNameGet))
      );
      if (docSnap.exists()) {
        //Check is currentUser
        if (docSnap.id === currentUser.id) {
          hasCurrentUser = true;
        } else {
          //Check currentUser follow?
          const isCurrentUserFollowing = await isFollowing(
            currentUser.id,
            docSnap.id
          );
          const userData = {
            id: docSnap.id,
            ...docSnap.data(),
            isCurrentUserFollowing,
          };
          if (isCurrentUserFollowing) {
            users.value.unshift(userData);
          } else {
            users.value.push(userData);
          }
        }
      }
    });

    await Promise.all(promises);

    if (hasCurrentUser) {
      users.value.unshift(currentUser);
    }

    return users;
  };

  const getFollowers = async () => {
    return await getFollows("followingId", "followerId");
  };

  const getFollowings = async () => {
    return await getFollows("followerId", "followingId");
  };

  const getMutualFollowers = async () => {
    const currentUser = store.getters["user/currentUser"];
    const user = store.getters["user/user"];
    const users = ref([]);

    const querySnap = await getDocs(
      query(collection(db, "followers"), where("followingId", "==", user.id))
    );

    querySnap.docs.map(async (followDoc) => {
      const docSnap = await getDoc(
        doc(db, "users", lodashGet(followDoc.data(), "followerId"))
      );
      if (docSnap.exists()) {
        //Check currentUser follow?
        const isCurrentUserFollowing = await isFollowing(
          currentUser.id,
          docSnap.id
        );
        if (isCurrentUserFollowing) {
          users.value.push({
            id: docSnap.id,
            ...docSnap.data(),
            isCurrentUserFollowing,
          });
        }
      }
    });

    return users;
  };

  const isFollowing = async (followerId, followingId) => {
    const docSnap = await getDoc(
      doc(db, "followers", `${followerId}-${followingId}`)
    );

    if (docSnap.exists()) {
      return true;
    } else {
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
    // === SERVER ===
    // Update followingCount of currentUser(followerId)
    await updateWithTransaction(
      doc(db, "users", followerId),
      "insight.followingCount",
      (oldValue) => oldValue + 1
    );
    // Update followersCount of user(followingId)
    await updateWithTransaction(
      doc(db, "users", followingId),
      "insight.followersCount",
      (oldValue) => oldValue + 1
    );
  };

  //Update currentUser, user when unfollow user
  const updateUnfollowCount = async (followerId, followingId) => {
    // === SERVER ===
    // Update followingCount of currentUser(followerId)
    await updateWithTransaction(
      doc(db, "users", followerId),
      "insight.followingCount",
      (oldValue) => oldValue - 1
    );
    // Update followersCount of user(followingId)
    await updateWithTransaction(
      doc(db, "users", followingId),
      "insight.followersCount",
      (oldValue) => oldValue - 1
    );
  };

  return {
    setFollow,
    deleteFollow,
    isFollowing,
    getFollows,
    getFollowers,
    getMutualFollowers,
    getFollowings,
    watchFollowChange,
  };
};
