<template>
  <div v-if="user" class="profile-container">
    <div class="general">
      <general
        :isFollowing="isFollowing"
        :mutualFollowers="mutualFollowers"
        @updateIsFollowing="handleUpdateIsFollowing"
      />
    </div>
    <div class="highlight">
      <story-list />
    </div>
    <div class="tabs">
      <h1>Tabs</h1>
      <router-view></router-view>
    </div>
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
      mutualFollowers: [],
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
  },
  async beforeRouteUpdate(to, from) {
    const { getUserWithUsername } = useUser();
    const { isFollowing, getMutualFollowers } = useFollow();

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
    this.isFollowing = await isFollowing(this.currentUser.id, this.user.id);

    if (to.params.username != from.params.username)
      this.mutualFollowers = await getMutualFollowers();
  },
  async beforeMount() {
    const { isFollowing, getMutualFollowers } = useFollow();

    document.title = `${this.user.fullname} (@${this.user.username}) | Instagram`;
    if (this.currentUser) {
      this.isFollowing = await isFollowing(this.currentUser.id, this.user.id);
    }

    this.mutualFollowers = await getMutualFollowers();

    const { watchUserChange } = useUser();
    watchUserChange(this.user.id);
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
