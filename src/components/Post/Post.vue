<template>
  <div v-if="!loading" class="post-container">
    <div class="post-wrapper flex">
      <div class="post-slider">
        <swiper v-bind="swiperOptions">
          <swiper-slide v-for="url in post?.contents" :key="url">
            <img :src="url" />
          </swiper-slide>
        </swiper>
        <div class="media-navigation">
          <div class="navigation-button navigation-prev">
            <fa
              :icon="['fas', 'circle-chevron-left']"
              class="navigation-icon"
            />
          </div>
          <div class="navigation-button navigation-next">
            <fa
              :icon="['fas', 'circle-chevron-right']"
              class="navigation-icon"
            />
          </div>
        </div>
      </div>
      <div class="post-info flex flex-col">
        <div class="post-header flex">
          <div class="user-desc flex">
            <router-link
              :to="{ name: 'Profile', params: { username: user.username } }"
              class="avatar"
            >
              <img
                src="@/assets/images/IMG_0683.jpeg"
                alt="Ảnh đại diện của ..."
              />
            </router-link>
            <router-link
              :to="{ name: 'Profile', params: { username: user.username } }"
              class="username"
              >duydat</router-link
            >
          </div>
          <div class="post-setting">
            <div class="icon"><fa :icon="['fas', 'ellipsis']" /></div>
          </div>
        </div>
        <div class="post-comments">
          <div class="comments-container no-scrollbar flex">
            <comment-item :user="user" />
            <comment-item :user="user" />
            <comment-item :user="user" />
            <comment-item :user="user" />
            <comment-item :user="user" />
            <comment-item :user="user" />
            <comment-item :user="user" />
            <comment-item :user="user" />
          </div>
        </div>
        <div class="post-actions flex flex-col">
          <div class="actions flex">
            <div class="flex">
              <div class="like-action action">
                <heart-icon v-if="true" />
                <heart-full-icon v-else />
              </div>
              <div class="comment-action action">
                <comment-icon />
              </div>
              <div class="share-action action">
                <share-icon />
              </div>
            </div>
            <div class="saved-action action">
              <bookmark-icon />
            </div>
          </div>
          <span class="like-count"
            >{{ post.likeCount.toLocaleString("en-US").replace(",", ".") }} lượt
            thích</span
          >
          <span class="date-create">{{ dateCreate }}</span>
        </div>
        <div class="post-comment flex">
          <div
            class="emoji-container"
            v-click-outside.short="
              () => {
                activeEmojiTooltip = false;
              }
            "
          >
            <div class="icon" @click="activeEmojiTooltip = !activeEmojiTooltip">
              <emoticon-icon />
            </div>
            <div v-if="activeEmojiTooltip" class="extend">
              <div class="emoji-box">
                <div
                  v-for="emojiType in emojis"
                  :key="emojiType.label"
                  class="emoji-type flex flex-col"
                >
                  <div class="emoji-title">{{ emojiType.label }}</div>
                  <div class="emoji-list flex">
                    <div
                      v-for="emoji in emojiType.icons"
                      :key="emoji"
                      class="emoji-item"
                      @click="handleChooseIcon(emoji)"
                    >
                      {{ emoji }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="comment-input">
            <textarea
              v-model="comment"
              class="textarea"
              ref="commentInput"
              placeholder="Thêm bình luận..."
              @input="handleInputComment"
            ></textarea>
          </div>
          <div class="comment-button"><span>Đăng</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeartIcon from "@/components/SVG/HeartIcon.vue";
import HeartFullIcon from "@/components/SVG/HeartFullIcon.vue";
import CommentIcon from "@/components/SVG/CommentIcon.vue";
import ShareIcon from "@/components/SVG/ShareIcon.vue";
import BookmarkIcon from "@/components/SVG/BookmarkIcon.vue";
import EmoticonIcon from "@/components/SVG/EmoticonIcon.vue";

import CommentItem from "@/components/Post/CommentItem.vue";

import { EMOJI } from "@/constants/emoji";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";

import { usePost } from "@/composables/usePost";
import { useUser } from "@/composables/useUser";
import { formatDateTime } from "@/utils";

export default {
  data() {
    return {
      loading: true,
      emojis: EMOJI,
      activeEmojiTooltip: false,
      comment: "",
      post: null,
      user: null,
      swiperOptions: {
        modules: [Navigation, Pagination],
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 0,
        allowTouchMove: true,
        navigation: {
          nextEl: ".navigation-next",
          prevEl: ".navigation-prev",
        },
        pagination: { clickable: true },
      },
    };
  },
  methods: {
    handleChooseIcon(emoji) {
      this.comment += emoji + "";
      this.$refs.commentInput.focus();
    },
    handleInputComment() {
      const textarea = this.$refs.commentInput;
      textarea.style.height = "";
      textarea.style.height = Math.min(textarea.scrollHeight, 80) + "px";
    },
  },
  computed: {
    dateCreate() {
      return formatDateTime(this.post.createdAt.toDate());
    },
  },
  async beforeMount() {
    const { getPost } = usePost();
    const { getUser } = useUser();
    this.post = await getPost(this.$route.params.id);
    this.user = await getUser(this.post.userId);
    this.loading = false;
  },
  components: {
    CommentItem,
    ShareIcon,
    CommentIcon,
    HeartIcon,
    HeartFullIcon,
    BookmarkIcon,
    EmoticonIcon,
    Swiper,
    SwiperSlide,
  },
};
</script>

<style scoped>
.post-container {
  margin: 0 auto;
  width: calc(100% - 40px);
  max-width: 935px;
  padding: 17px 20px;
  box-sizing: content-box;
}

.post-wrapper {
  flex-wrap: nowrap;
  border: 1px solid var(--border-color);
}

.post-slider {
  position: relative;
  flex-grow: 1;
  overflow: hidden;
  /* width: 785px; */
}

.post-info {
  width: var(--post-info-width);
  background: var(--primary-bg-color);
  flex-shrink: 0;
}

.post-header {
  padding: 14px 16px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-color);
}

.user-desc {
  align-items: center;
}

.user-desc .avatar {
  width: 32px;
  height: 32px;
  margin-right: 14px;
  border-radius: 50%;
  overflow: hidden;
}

.user-desc .username {
  font-weight: 600;
}

.post-setting {
  font-size: 20px;
  cursor: pointer;
}

.post-comments {
  position: relative;
  margin: 10px 16px 0;
  flex-grow: 1;
}

.comments-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}

.post-actions {
  padding: 6px 16px;
  border-top: 1px solid var(--border-color);
}

.actions {
  margin: 0 -8px;
  justify-content: space-between;
}

.action {
  font-size: 24px;
  padding: 8px;
  line-height: 1;
  cursor: pointer;
}

.action:hover {
  opacity: 0.6;
}

.action > svg {
  width: 24px;
  height: 24px;
}

.like-count {
  font-weight: 600;
}

.date-create {
  font-size: 10px;
  color: var(--secondary-text-color);
  text-transform: uppercase;
  margin-bottom: 16px;
}

.post-comment {
  align-items: center;
  border-top: 1px solid var(--border-color);
  flex-wrap: nowrap;
  padding: 6px 16px;
}

.comment-input {
  flex-grow: 1;
  margin-left: 16px;
  margin-right: 8px;
  display: flex;
  align-items: center;
}

.comment-input .textarea {
  height: 18px;
  width: 100%;
  resize: none;
}

.emoji-container {
  position: relative;
}

.emoji-container .icon {
  padding: 8px;
  line-height: 1;
  cursor: pointer;
}

.emoji-container .icon > svg {
  width: 24px;
  height: 24px;
}

.emoji-container .extend {
  position: absolute;
  left: 0;
  bottom: 100%;
  width: 315px;
  margin-bottom: 7px;
  color: var(--secondary-text-color);
  background: #fff;
  filter: drop-shadow(0 0 7px rgba(0, 0, 0, 0.1));
  border-radius: 8px;
  z-index: 1;
}

.emoji-box {
  width: 100%;
  height: 320px;
  padding: 8px;
  overflow-y: auto;
}

.emoji-title {
  margin: 8px;
  text-align: left;
  font-weight: 600;
}

.emoji-box .emoji-type:not(:first-child) .emoji-title {
  margin-top: 16px;
}

.emoji-item {
  width: 40px;
  height: 34px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s;
}

.emoji-item:hover {
  background: var(--separator-color);
}

.comment-button {
  flex-shrink: 0;
  font-weight: 600;
  color: var(--primary-button-color);
  cursor: pointer;
}

.comment-button:hover {
  color: var(--link-color);
}

.navigation-button {
  padding: 15px;
  position: absolute;
  top: 50%;
  transform: translateY(calc(-50% - 6px));
  z-index: 1;
  cursor: pointer;
  user-select: none;
}

.navigation-button svg {
  color: rgba(255, 255, 255, 0.7);
  fill: rgba(255, 255, 255, 0.7);
}

.navigation-button.swiper-button-disabled {
  display: none;
}

.navigation-next {
  right: 0;
}

.navigation-icon {
  font-size: 23px;
}

.post-slider :deep(.swiper-pagination-bullet) {
  width: 6px;
  height: 6px;
  background: #fff !important;
  opacity: 0.4;
}

.post-slider :deep(.swiper-pagination-bullet-active) {
  opacity: 1;
}
</style>
