<template>
  <div v-if="!true">Loading...</div>
  <template v-else>
    <div class="general-container flex">
      <div class="general-avatar">
        <div class="avatar-wrapper">
          <img src="@/assets/images/defaultAvatar.jpg" alt="Avatar" />
        </div>
      </div>
      <div class="general-info flex flex-col">
        <div class="general-header flex">
          <div class="user-username">
            <span>{{ $route.params.username }}</span>
          </div>
          <div class="general-actions flex">
            <ui-button class="profile-edit" secondary v-if="isCurrentUser"
              >Chỉnh sửa trang cá nhân</ui-button
            >
            <div v-else class="general-more flex">
              <div class="general-follow">
                <ui-button
                  class="following"
                  secondary
                  v-if="isFollowing"
                  :isDisabled="isLoadingFollow"
                  :isLoading="isLoadingFollow"
                  @click="unfollow"
                >
                  <span>Đang theo dõi</span>
                  <fa :icon="['fas', 'chevron-down']" />
                </ui-button>
                <ui-button
                  primary
                  v-else
                  :isDisabled="isLoadingFollow"
                  :isLoading="isLoadingFollow"
                  @click="follow"
                >
                  <span>Theo dõi</span>
                </ui-button>
              </div>
              <div v-if="currentUser" class="general-inbox">
                <ui-button secondary>
                  <span>Nhắn tin</span>
                </ui-button>
              </div>
              <div v-if="currentUser" class="general-suggest">
                <ui-button class="suggest" secondary>
                  <template #icon>
                    <suggest-icon :active="true" />
                  </template>
                </ui-button>
              </div>
            </div>
          </div>
          <div v-if="currentUser" class="general-setting">
            <ui-button v-if="isCurrentUser" variant="text" class="setting-icon">
              <template #icon>
                <setting-icon />
              </template>
            </ui-button>
            <ui-button v-else variant="text" class="setting-icon">
              <template #icon>
                <fa :icon="['fas', 'ellipsis']" />
              </template>
            </ui-button>
          </div>
        </div>
        <ul class="user-statistic flex">
          <li class="statistic-item">
            <span class="value" :title="user.insight.postsCount">{{
              formatNumber(user.insight.postsCount)
            }}</span>
            bài viết
          </li>
          <li class="statistic-item">
            <component
              :is="user.insight.followersCount == 0 ? 'span' : 'router-link'"
              :to="{ name: 'Followers' }"
            >
              <span class="value" :title="user.insight.followersCount">{{
                formatNumber(user.insight.followersCount)
              }}</span>
              người theo dõi
            </component>
          </li>
          <li class="statistic-item">
            <component
              :is="user.insight.followingCount == 0 ? 'span' : 'router-link'"
              :to="{ name: 'Following' }"
            >
              Đang theo dõi
              <span class="value" :title="user.insight.followingCount">{{
                formatNumber(user.insight.followingCount)
              }}</span>
              người dùng
            </component>
          </li>
        </ul>
        <div class="general-bio flex flex-col">
          <span class="user-fullname">{{ user.fullname }}</span>
          <span class="user-bio">{{ user.bio }}</span>
        </div>
        <div v-if="generalFollowers.length != 0" class="general-followers">
          <router-link :to="{ name: 'Followers' }"
            >Có
            <span class="follower-usernames">{{ generalFollowersComp }}</span>
            <span v-if="generalFollowers.length > 3">
              và {{ generalFollowers.length - 3 }} người khác theo dõi</span
            >
            theo dõi</router-link
          >
        </div>
      </div>
    </div>
  </template>
</template>

<script>
import SettingIcon from "../SVG/SettingIcon.vue";
import SuggestIcon from "../SVG/SuggestIcon.vue";
import UiButton from "../UI/UiButton.vue";

import { mapGetters } from "vuex";
import { formatNumberToSuffix } from "@/untils";
import { useFollow } from "@/composables/useFollow";

export default {
  props: {
    isFollowing: Boolean,
    generalFollowers: Array,
  },
  data() {
    return {
      isLoadingFollow: false,
    };
  },
  computed: {
    ...mapGetters("user", ["user", "currentUser"]),
    isCurrentUser() {
      return (
        this.currentUser &&
        this.$route.params.username == this.currentUser.username
      );
    },
    generalFollowersComp() {
      const usernames = [];
      const threeFollowers = this.generalFollowers.slice(0, 3);
      threeFollowers.forEach((user) => {
        usernames.push(user.username);
      });

      console.log(this.generalFollowers);
      return usernames.join(", ");
    },
  },
  methods: {
    formatNumber(number) {
      return formatNumberToSuffix(number);
    },
    async follow() {
      const { setFollow } = useFollow();

      this.isLoadingFollow = true;
      await setFollow(this.currentUser.id, this.user.id);
      this.isLoadingFollow = false;
      this.$emit("updateIsFollowing", true);
    },
    async unfollow() {
      const { deleteFollow } = useFollow();

      this.isLoadingFollow = true;
      await deleteFollow(this.currentUser.id, this.user.id);
      this.isLoadingFollow = false;
      this.$emit("updateIsFollowing", false);
    },
  },
  async beforeMount() {
    const { getFollows } = useFollow();

    if (this.currentUser) {
      const newGeneralFollowers = await getFollows(
        "followingId",
        "followerId",
        this.user.id
      );

      if (newGeneralFollowers.value[0].id == this.currentUser.id)
        newGeneralFollowers.value.shift();
      this.$emit("updateGeneralFollowers", newGeneralFollowers);
    }
  },
  components: { UiButton, SettingIcon, SuggestIcon },
};
</script>

<style scoped>
.general-container {
  margin-bottom: 44px;
}

.general-avatar {
  flex: 1 0 0;
  margin-right: 30px;
}

.avatar-wrapper {
  width: 150px;
  height: 150px;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
}

.general-info {
  flex: 2 1 30px;
}

.general-header {
  align-items: center;
}

.user-username {
  flex-shrink: 1;
  font-size: 20px;
  cursor: pointer;
}

.general-actions {
  margin-left: 20px;
}

.profile-edit,
.general-more > * {
  margin-left: 8px;
}

.following > svg {
  margin-left: 4px;
  width: 12px;
  height: 12px;
}

.suggest {
  padding: 8px;
}

.setting-icon {
  padding: 8px;
  width: 40px;
  height: 40px;
  margin-left: 5px;
}
.setting-icon svg {
  width: 100%;
  height: 100%;
}

.user-statistic {
  margin-top: 18px;
  font-size: 16px;
}

.user-statistic > .statistic-item:not(:last-child) {
  margin-right: 40px;
}

.statistic-item .value {
  font-weight: 600;
}

.general-bio {
  margin-top: 20px;
}

.user-fullname {
  font-weight: 600;
}

.general-followers {
  margin-top: 12px;
  font-size: 12px;
  font-weight: 500;
  color: var(--secondary-text-color);
}

.follower-usernames {
  color: var(--primary-text-color);
}
</style>
