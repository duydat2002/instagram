<template>
  <div class="user-container flex">
    <div class="user-avatar">
      <img src="@/assets/images/defaultAvatar.jpg" alt="Avatar" />
    </div>
    <div class="user-name flex">
      <span class="user-username">
        <router-link
          :to="{ name: 'Profile', params: { username: user.username } }"
        >
          {{ user.username }}
        </router-link>
      </span>
      <span class="user-fullname">{{ user.fullname }}</span>
    </div>
    <div class="user-follow" v-if="currentUser.id != user.id">
      <ui-button
        secondary
        v-if="isFollowing"
        :isLoading="isLoadingFollow"
        @click="unfollow"
      >
        <span>Đang theo dõi</span>
      </ui-button>
      <ui-button primary v-else :isLoading="isLoadingFollow" @click="follow">
        <span>Theo dõi</span>
      </ui-button>
    </div>
  </div>
</template>

<script>
import UiButton from "../UI/UiButton.vue";

import { mapGetters } from "vuex";
import { useFollow } from "@/composables/useFollow";

export default {
  props: {
    user: Object,
  },
  data() {
    return {
      isFollowing: null,
      isLoadingFollow: false,
    };
  },
  computed: {
    ...mapGetters("user", ["currentUser"]),
  },
  methods: {
    async follow() {
      const { setFollow } = useFollow();

      this.isLoadingFollow = true;
      await setFollow(this.currentUser.id, this.user.id);
      this.isFollowing = true;
      this.isLoadingFollow = false;
    },
    async unfollow() {
      const { deleteFollow } = useFollow();

      this.isLoadingFollow = true;
      await deleteFollow(this.currentUser.id, this.user.id);
      this.isFollowing = false;
      this.isLoadingFollow = false;
    },
  },
  async beforeMount() {
    const { getFollowing } = useFollow();
    this.isFollowing = await getFollowing(this.currentUser.id, this.user.id);
    this.$emit("updateFollowState", false);
  },
  components: { UiButton },
};
</script>

<style scoped>
.user-container {
  padding: 8px 16px;
  align-items: center;
}

.user-avatar {
  height: 44px;
  width: 44px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
}

.user-name {
  flex-direction: column;
  flex-grow: 1;
}

.user-username {
  font-weight: 600;
}

.user-fullname {
  color: var(--secondary-text-color);
}
</style>
