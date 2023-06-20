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
      <div class="tabs-title flex">
        <router-link :to="{ name: 'Posts' }" class="tab flex">
          <div class="icon"><grid-icon /></div>
          <span class="title">Bài viết</span>
        </router-link>
        <router-link :to="{ name: 'Saved' }" class="tab flex">
          <div class="icon"><bookmark-icon /></div>
          <span class="title">Đã lưu</span>
        </router-link>
        <router-link :to="{ name: 'Tagged' }" class="tab flex">
          <div class="icon"><tag-icon /></div>
          <span class="title">Được gắn thẻ</span>
        </router-link>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import GridIcon from "@/components/SVG/GridIcon.vue";
import BookmarkIcon from "@/components/SVG/BookmarkIcon.vue";
import TagIcon from "@/components/SVG/TagIcon.vue";
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
    ...mapMutations("loading", ["setIsLoadingOnReload"]),
    handleUpdateIsFollowing(value) {
      this.isFollowing = value;
    },
  },
  async beforeRouteUpdate(to, from) {
    console.log(to);
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
  components: { General, StoryList, GridIcon, BookmarkIcon, TagIcon },
};
</script>

<style scoped>
.profile-container {
  margin: 0 auto;
  width: calc(100% - 40px);
  max-width: 935px;
  padding: 30px 20px;
  box-sizing: content-box;
}

.tabs {
  margin-top: 44px;
  border-top: 1px solid var(--border-color);
}

.tabs-title {
  justify-content: center;
}

.tabs-title .tab:not(:last-child) {
  margin-right: 60px;
}

.tab {
  height: 52px;
  align-items: center;
  justify-content: center;
  color: var(--secondary-text-color);
  border-top: 1px solid transparent;
  cursor: pointer;
}

.tab.active {
  color: var(--primary-text-color);
  border-color: #000;
}

.tab .icon svg {
  width: 12px;
  height: 12px;
  color: var(--secondary-text-color);
  fill: var(--secondary-text-color);
}

.tab.active .icon svg {
  color: var(--primary-text-color);
  fill: var(--primary-text-color);
}

.tab .title {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  margin-left: 6px;
}
</style>
