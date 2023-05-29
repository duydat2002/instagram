<template>
  <div v-if="user" class="profile-container">
    <div class="general">
      <general />
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

import { useUser } from "@/composables/useUser";
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      profileUser: null,
    };
  },
  computed: {
    ...mapGetters("user", ["user"]),
  },
  methods: {
    ...mapMutations("user", ["setUser"]),
    async setUserByUsername(username) {
      const { getUserWithUsername } = useUser();
      const user = await getUserWithUsername(username);
      this.setUser(user);
    },
  },
  async beforeRouteUpdate(to) {
    const { getUserWithUsername } = useUser();
    const user = await getUserWithUsername(to.params.username);
    this.setUser(user);
    console.log(this.user);
    if (!user) {
      this.$router.push({
        name: "NotFound",
        params: { pathMatch: to.path.substring(1).split("/") },
        query: to.query,
        hash: to.hash,
      });
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
