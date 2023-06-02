<template>
  <div v-if="!true">Loading...</div>
  <template v-else>
    <div class="general-container flex">
      <div class="general-avatar">
        <div class="avatar-wrapper">
          <div class="loading" v-if="isLoadingAvatar">
            <fa :icon="['fas', 'spinner']" />
          </div>
          <img class="avatar" :src="user.avatar" alt="Avatar" />
          <button
            v-if="isCurrentUser"
            class="avatar-button"
            title="Thay đổi ảnh đại diện"
            @click="handleClickChangeAvatar"
          ></button>
        </div>
        <form method="post" enctype="multipart/form-data">
          <input
            ref="inputAvatar"
            accept="image/jpeg,image/png,image/jpg"
            type="file"
            style="display: none"
            @change="getInputAvatar($event)"
          />
        </form>
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
              :is="
                user.insight.followersCount == 0 || !currentUser
                  ? 'span'
                  : 'router-link'
              "
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
              :is="
                user.insight.followingCount == 0 || !currentUser
                  ? 'span'
                  : 'router-link'
              "
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
        <div
          v-if="!isCurrentUser && mutualFollowers.length != 0"
          class="mutual-followers"
        >
          <router-link :to="{ name: 'Followers' }"
            >Có
            <span class="follower-usernames">{{ mutualFollowersComp }}</span>
            <span v-if="mutualFollowers.length > 3">
              và {{ mutualFollowers.length - 3 }} người khác theo dõi</span
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

import { mapGetters, mapMutations } from "vuex";
import { formatNumberToSuffix } from "@/untils";
import { useUser } from "@/composables/useUser";
import { useFollow } from "@/composables/useFollow";
import { useStorage } from "@/composables/useStorage";

export default {
  props: {
    isFollowing: Boolean,
    mutualFollowers: Array,
  },
  data() {
    return {
      isLoadingFollow: false,
      isLoadingAvatar: false,
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
    mutualFollowersComp() {
      const usernames = [];
      const threeFollowers = this.mutualFollowers.slice(0, 3);
      threeFollowers.forEach((user) => {
        usernames.push(user.username);
      });

      return usernames.join(", ");
    },
  },
  methods: {
    ...mapMutations("user", ["setCurrentUser"]),
    formatNumber(number) {
      return formatNumberToSuffix(number);
    },
    async follow() {
      if (this.currentUser) {
        const { setFollow } = useFollow();

        this.isLoadingFollow = true;
        await setFollow(this.currentUser.id, this.user.id);
        this.isLoadingFollow = false;
        this.$emit("updateIsFollowing", true);
      }
    },
    async unfollow() {
      const { deleteFollow } = useFollow();

      this.isLoadingFollow = true;
      await deleteFollow(this.currentUser.id, this.user.id);
      this.isLoadingFollow = false;
      this.$emit("updateIsFollowing", false);
    },
    handleClickChangeAvatar() {
      this.$refs.inputAvatar.click();
    },
    async getInputAvatar(event) {
      const file = event.target.files[0];
      const fileName = file?.name;
      console.log(file, fileName);

      const { setAvatar } = useStorage();
      const { updateAvatar } = useUser();

      this.isLoadingAvatar = true;
      const urlAvatar = await setAvatar(this.currentUser.id, file);
      await updateAvatar(this.currentUser.id, urlAvatar);
      this.isLoadingAvatar = false;
    },
  },
  async beforeMount() {},
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
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
}

.avatar-button {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
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

.mutual-followers {
  margin-top: 12px;
  font-size: 12px;
  font-weight: 500;
  color: var(--secondary-text-color);
}

.follower-usernames {
  color: var(--primary-text-color);
}
</style>
