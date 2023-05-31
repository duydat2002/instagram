<template>
  <div v-if="user && isFollowing != null" class="profile-container">
    <div class="general">
      <general
        :isFollowing="isFollowing"
        @updateIsFollowing="handleUpdateIsFollowing"
      />
    </div>
    <div class="highlight">
      <story-list />
    </div>
    <div class="user-posts">
      <component :is="$route.meta.nestedLayout" />
    </div>
  </div>
</template>

<script>
import General from "@/components/Profile/General.vue";
import StoryList from "@/components/Story/StoryList.vue";

import { mapGetters, mapMutations } from "vuex";
import { useUser } from "@/composables/useUser";
import { useFollow } from "@/composables/useFollow";
const { getFollowing } = useFollow();

export default {
  data() {
    return {
      isFollowing: null,
    };
  },
  computed: {
    ...mapGetters("user", ["currentUser", "user"]),
  },
  methods: {
    ...mapMutations("user", ["setUser"]),
    async setUserByUsername(username) {
      const { getUserWithUsername } = useUser();
      const user = await getUserWithUsername(username);
      console.log(user);
      this.setUser(user);
    },
    handleUpdateIsFollowing(value) {
      this.isFollowing = value;
    },
  },
  async beforeRouteUpdate(to) {
    const { getUserWithUsername } = useUser();
    const user = await getUserWithUsername(to.params.username);
    this.setUser(user);
    if (!user) {
      this.$router.push({
        name: "NotFound",
        params: { pathMatch: to.path.substring(1).split("/") },
        query: to.query,
        hash: to.hash,
      });
    }
    this.isFollowing = await getFollowing(this.currentUser.id, this.user.id);
  },
  async beforeMount() {
    this.isFollowing = await getFollowing(this.currentUser.id, this.user.id);
  },
  components: { General, StoryList },
};
</script>

<style scoped>
.profile-container {
  margin: 0 65px;
  padding: 30px 20px;
}
</style>
