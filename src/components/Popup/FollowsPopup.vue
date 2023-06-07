<template>
  <modal isPopup :isShow="isShow" :handleClickOutside="handleClickOutside">
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
        <template v-if="isLoadingFollowItems">
          <user-item-skeleton v-for="n in 10" :key="n" />
        </template>
        <user-item v-for="user in follows" :key="user.id" :user="user" />
        <ui-button variant="text">
          <router-link
            v-if="isMutualFollowersPage"
            :to="{ name: 'MutualFirstFollowers' }"
            >Xem tất cả người theo dõi</router-link
          >
        </ui-button>
      </div>
    </div>
  </modal>
</template>

<script>
import Modal from "@/components/Modal/Modal.vue";
import UserItem from "@/components/User/UserItem.vue";
import UserItemSkeleton from "@/components/User/UserItemSkeleton.vue";
import UiButton from "@/components/UI/UiButton.vue";

import { mapGetters, mapMutations } from "vuex";
import { useFollow } from "@/composables/useFollow";

export default {
  data() {
    return {
      isShow: true,
      isLoadingFollowItems: true,
      follows: [],
    };
  },
  computed: {
    ...mapGetters("user", ["user", "currentUser"]),
    ...mapGetters("modal", ["stopScroll", "scrollPosition"]),
    isFollowersPage() {
      if (this.$route.path.includes("followers")) return true;

      if (this.$route.path.includes("following")) return false;

      return null;
    },
    isMutualFollowersPage() {
      return this.$route.path.includes("mutualOnly") ? true : false;
    },
  },
  methods: {
    ...mapMutations("modal", ["setStopScroll"]),
    handleClickOutside() {
      this.$router.push({ name: "Profile" });
    },
    closePopup() {
      this.$router.push({ name: "Profile" });
    },
    async getFollows() {
      this.isLoadingFollowItems = true;
      const { getFollowers, getMutualFollowers, getFollowings } = useFollow();
      if (this.isFollowersPage != null) {
        if (this.isFollowersPage) {
          //Get followers => followingId = userId => get all user - followedId
          if (this.isMutualFollowersPage) {
            this.follows = await getMutualFollowers();
          } else {
            this.follows = await getFollowers();
            if (this.$route.path.includes("mutualFirst")) {
              this.follows.sort((a, b) => {
                if (!a.isCurrentUserFollowing && !b.isCurrentUserFollowing)
                  return 0;
                if (a.isCurrentUserFollowing && !b.isCurrentUserFollowing)
                  return -1;
                if (!a.isCurrentUserFollowing && b.isCurrentUserFollowing)
                  return 1;
              });
            }
          }
        } else {
          //Get followings => followedId = userId => get all user - followingId
          this.follows = await getFollowings();
        }
      }
      this.isLoadingFollowItems = false;
    },
  },
  watch: {
    async $route() {
      await this.getFollows();
    },
  },
  async beforeMount() {
    await this.getFollows();
  },
  components: { Modal, UserItem, UserItemSkeleton, UiButton },
};
</script>

<style scoped>
.follow-container {
  flex-wrap: nowrap;
  width: 400px;
  height: calc(100vh - 40px);
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
