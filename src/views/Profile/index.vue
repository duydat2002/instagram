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
    async getMutualFollowers() {
      const { getFollowers } = useFollow();

      if (this.currentUser) {
        const newMutualFollowers = await getFollowers();

        this.mutualFollowers = newMutualFollowers.value.filter((user) => {
          return user.isCurrentUserFollowing && user.id != this.currentUser.id;
        });

        console.log("after", newMutualFollowers);
      }
    },
  },
  async beforeRouteUpdate(to, from) {
    const { getUserWithUsername } = useUser();
    const { isFollowing } = useFollow();

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
      await this.getMutualFollowers();
  },
  async beforeMount() {
    const { isFollowing } = useFollow();

    document.title = `${this.user.fullname} (@${this.user.username}) | Instagram`;
    if (this.currentUser) {
      this.isFollowing = await isFollowing(this.currentUser.id, this.user.id);
    }

    await this.getMutualFollowers();

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
