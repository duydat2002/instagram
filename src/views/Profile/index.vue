<template>
  <div v-if="user" class="profile-container">
    <div class="general">
      <general
        :isFollowing="isFollowing"
        :generalFollowers="generalFollowers"
        @updateIsFollowing="handleUpdateIsFollowing"
        @updateGeneralFollowers="handleUpdateGeneralFollowers"
      />
    </div>
    <div class="highlight">
      <story-list />
    </div>
    <div class="user-posts">
      <component :is="$route.meta.nestedLayout" />
    </div>
    <component v-if="true" :is="$route.meta.isPopup" />
  </div>
</template>

<script>
import General from "@/components/Profile/General.vue";
import StoryList from "@/components/Story/StoryList.vue";

import { mapGetters, mapMutations } from "vuex";
import { useUser } from "@/composables/useUser";
import { useFollow } from "@/composables/useFollow";

export default {
  data() {
    return {
      isFollowing: null,
      generalFollowers: [],
    };
  },
  computed: {
    ...mapGetters("user", ["currentUser", "user"]),
  },
  methods: {
    ...mapMutations("user", ["setUser"]),
    handleUpdateIsFollowing(value) {
      this.isFollowing = value;
    },
    handleUpdateGeneralFollowers(value) {
      this.generalFollowers = value;
    },
  },
  async beforeRouteUpdate(to) {
    const { getUserWithUsername } = useUser();
    const { getFollowing } = useFollow();

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
    const { getFollowing } = useFollow();

    if (this.currentUser) {
      this.isFollowing = await getFollowing(this.currentUser.id, this.user.id);
    }
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
