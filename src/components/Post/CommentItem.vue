<template>
  <div class="comment-container flex">
    <router-link
      :to="{ name: 'Profile', params: { username: user.username } }"
      class="avatar"
    >
      <img src="@/assets/images/defaultAvatar.jpg" alt="Ảnh đại diện của" />
    </router-link>
    <div class="desc flex flex-col">
      <div class="comment-wrapper flex">
        <router-link
          class="username"
          :to="{ name: 'Profile', params: { username: user.username } }"
          >duydat</router-link
        >
        <span class="comment"
          >abcdefgh abcdefgh abcdefgh abcdefgh abcdefgh
        </span>
      </div>
      <div class="info flex">
        <span class="time">2 tuần</span>
        <span class="like-count">1 lượt thích</span>
        <span class="reply">Trả lời</span>
        <div class="comment-setting">
          <fa :icon="['fas', 'ellipsis']" />
        </div>
      </div>
    </div>
    <div class="like" title="Thích">
      <heart-icon v-if="false" />
      <heart-full-icon v-else />
    </div>
  </div>
</template>

<script>
import HeartIcon from "../SVG/HeartIcon.vue";
import HeartFullIcon from "../SVG/HeartFullIcon.vue";
export default {
  props: {
    user: Object,
  },
  components: { HeartIcon, HeartFullIcon },
};
</script>

<style scoped>
.comment-container {
  width: 100%;
  margin-top: 12px;
  align-items: start;
  flex-wrap: nowrap;
}

.avatar {
  margin-right: 18px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.desc {
  flex-grow: 1;
}

.username {
  font-weight: 600;
  margin-right: 4px;
}

.info {
  margin: 8px 0 4px;
  align-items: center;
}

.info > span {
  font-size: 12px;
  margin-right: 12px;
  color: var(--secondary-text-color);
  cursor: pointer;
}

.like-count,
.reply {
  font-weight: 600;
}

.comment-setting {
  display: none;
  line-height: 1;
  cursor: pointer;
  margin-left: 10px;
}

.info:hover .comment-setting {
  display: block;
}

.comment-setting svg {
  font-size: 15px;
  color: var(--secondary-text-color);
}

.like {
  margin-top: 10px;
  cursor: pointer;
}

.like:hover {
  opacity: 0.5;
}

.like > svg {
  width: 12px;
  height: 12px;
}
</style>
