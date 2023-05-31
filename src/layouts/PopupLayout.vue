<template>
  <modal :isShow="isShow" :handleClick="handleClickOutside">
    <div class="follow-container flex flex-col">
      <div class="follow-header">
        <h1 class="follow-title">
          {{ isFollowersPage ? "Người theo dõi" : "Đang theo dõi" }}
        </h1>
        <div class="close" @click="closePopup">
          <fa size="xl" :icon="['fas', 'xmark']" />
        </div>
      </div>
      <div class="follow-list">
        <div class="loading" v-if="isLoadingFollows">
          <fa :icon="['fas', 'spinner']" />
        </div>
        <template v-else>
          <template v-if="isLoadingFollowState">
            <user-item-skeleton v-for="n in 10" :key="n" />
          </template>
          <user-item
            v-show="!isLoadingFollowState"
            v-for="user in follows"
            :key="user.id"
            :user="user"
            @updateFollowState="handleUpdateFollowState"
          />
        </template>
      </div>
    </div>
  </modal>
</template>

<script>
import Modal from "@/components/Modal/Modal.vue";
import UserItem from "@/components/User/UserItem.vue";
import UserItemSkeleton from "@/components/User/UserItemSkeleton.vue";

import { mapGetters, mapMutations } from "vuex";
import { useFollow } from "@/composables/useFollow";

export default {
  data() {
    return {
      isShow: true,
      isLoadingFollows: true,
      isLoadingFollowState: true,
      follows: [],
    };
  },
  computed: {
    ...mapGetters("user", ["user"]),
    isFollowersPage() {
      return this.$route.path.includes("followers")
        ? true // Người follow user
        : false; // Người user follow
    },
  },
  methods: {
    ...mapMutations("modal", ["setActiveOverlay"]),
    handleClickOutside() {
      this.setActiveOverlay(false);
      this.$router.push({ name: "Profile" });
    },
    handleUpdateFollowState(value) {
      this.isLoadingFollowState = value;
    },
    closePopup() {
      this.setActiveOverlay(false);
      this.$router.push({ name: "Profile" });
    },
  },
  async beforeMount() {
    const { getFollows } = useFollow();
    if (this.isFollowersPage) {
      //Get followers => followingId = userId => get all user - followedId
      this.follows = await getFollows(
        "followingId",
        "followerId",
        this.user.id
      );
    } else {
      //Get followings => followedId = userId => get all user - followingId
      this.follows = await getFollows(
        "followerId",
        "followingId",
        this.user.id
      );
    }
    this.isLoadingFollows = false;
  },
  mounted() {
    this.setActiveOverlay(true);
  },
  components: { Modal, UserItem, UserItemSkeleton },
};
</script>

<style scoped>
.follow-container {
  flex-wrap: nowrap;
  margin: 20px;
  width: 400px;
  height: calc(100% - 40px);
  max-height: 400px;
  color: var(--primary-text-color);
  background: var(--modal-color);
  border-radius: 12px;
  overflow: hidden;
}

.follow-header {
  position: relative;
  display: flex;
  align-items: center;
  height: 42px;
  border-bottom: 1px solid var(--separator-modal-color);
}

.follow-title {
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
}

.follow-list {
  height: 100%;
  overflow-y: scroll;
}

.close {
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  padding: 8px;
  cursor: pointer;
}
</style>
