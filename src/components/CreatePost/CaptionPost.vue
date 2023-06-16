<template>
  <div class="caption-post flex flex-col">
    <div class="user flex">
      <div class="avatar">
        <img :src="currentUser.avatar" alt="" />
      </div>
      <div class="username">{{ currentUser.username }}</div>
    </div>
    <div class="caption-container flex flex-col">
      <div class="caption-input">
        <textarea
          v-model="captionComp"
          class="textarea"
          placeholder="Viết chú thích..."
        ></textarea>
      </div>
      <div class="caption-features flex">
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
                    @click="captionComp += emoji + ''"
                  >
                    {{ emoji }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="maximum-characters"
          :class="{ active: activeCharactersTooltip }"
          v-click-outside.short="
            () => {
              activeCharactersTooltip = false;
            }
          "
        >
          <span
            class="number"
            @click="activeCharactersTooltip = !activeCharactersTooltip"
            >{{ characterCount }}/2.200</span
          >
          <div v-if="activeCharactersTooltip" class="extend">
            <span
              >Chú thích dài hơn 125 ký tự sẽ bị cắt bớt trên bảng feed.</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="location flex tab">
      <input type="text" class="input" placeholder="Thêm vị trí" />
      <div class="icon">
        <location-icon v-if="true" />
        <fa v-else :icon="['far', 'circle-xmark']" />
      </div>
      <!-- <div class="extend"></div> -->
    </div>
    <div class="accessibility flex tab">
      <div
        class="accessibility-header header flex"
        @click="activeAccessibility = !activeAccessibility"
      >
        <span class="title">Trợ năng</span>
        <div class="icon">
          <fa v-if="true" :icon="['fas', 'chevron-down']" />
          <fa v-else :icon="['fas', 'chevron-up']" />
        </div>
      </div>
      <div v-if="activeAccessibility" class="extend">
        <div class="accessibility-wrapper">
          <span class="desc"
            >Văn bản thay thế mô tả ảnh cho những người suy giảm thị lực. Văn
            bản thay thế sẽ được tạo tự động cho ảnh của bạn hoặc bạn có thể tự
            viết.</span
          >
          <div class="accessibility-list">
            <div
              v-for="media in medias"
              :key="media.url"
              class="accessibility-item flex"
            >
              <div class="accessibility-image">
                <img :src="media.url" alt="" />
              </div>
              <div class="accessibility-input">
                <input type="text" placeholder="Viết văn bản thay thế..." />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="setting flex tab">
      <div class="setting-header header flex">
        <span class="title">Cài đặt nâng cao</span>
        <div class="icon">
          <fa v-if="true" :icon="['fas', 'chevron-down']" />
          <fa v-else :icon="['fas', 'chevron-up']" />
        </div>
      </div>
      <div class="extend"></div>
    </div>
  </div>
</template>

<script>
import EmoticonIcon from "@/components/SVG/EmoticonIcon.vue";
import LocationIcon from "@/components/SVG/LocationIcon.vue";

import { EMOJI } from "@/constants/emoji";
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      emojis: EMOJI,
      activeEmojiTooltip: false,
      activeCharactersTooltip: false,
      activeAccessibility: false,
    };
  },
  computed: {
    ...mapGetters("user", ["currentUser"]),
    ...mapGetters("createPost", ["medias", "caption"]),
    captionComp: {
      get() {
        return this.caption;
      },
      set(value) {
        this.setCaption(value);
      },
    },
    characterCount() {
      return this.captionComp.length.toLocaleString("en-US").replace(",", ".");
    },
  },
  methods: {
    ...mapMutations("createPost", ["setCaption"]),
  },
  watch: {
    caption(newCaption, oldCaption) {
      if (newCaption.length >= 2200) {
        this.caption = newCaption.slice(0, oldCaption.length);
      }
    },
  },
  components: { EmoticonIcon, LocationIcon },
};
</script>

<style scoped>
.caption-post {
  width: 340px;
  height: 100%;
  overflow-y: scroll;
  flex-wrap: nowrap;
  padding-bottom: 24px;
}

.user {
  margin: 16px;
  align-items: center;
  cursor: pointer;
}

.avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
}

.caption-input {
  height: 168px;
}

.textarea {
  width: 100%;
  height: 100%;
  padding: 0 16px;
  font-size: 16px;
  resize: none;
}

.textarea::placeholder {
  color: var(--placeholder-color);
}

.tab,
.caption-features {
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  flex-shrink: 0;
}

.emoji-container {
  position: relative;
}

.emoji-container .icon {
  padding: 8px;
  cursor: pointer;
}

.emoji-container .icon > svg {
  color: var(--secondary-text-color) !important;
  fill: var(--secondary-text-color) !important;
  vertical-align: middle;
}

.emoji-container .extend,
.maximum-characters .extend {
  position: absolute;
  top: 100%;
  border-radius: 8px;
  z-index: 1;
  filter: drop-shadow(0 0 7px rgba(0, 0, 0, 0.1));
}

.emoji-container .extend {
  left: 0;
  width: 300px;
  color: var(--secondary-text-color);
  background: #fff;
  margin-top: 5px;
}

.emoji-container .extend::after,
.maximum-characters .extend::after {
  content: "";
  width: 20px;
  height: 20px;
  position: absolute;
  top: -5px;
  border-radius: 2px;
  transform: rotateZ(45deg);
  z-index: -1;
}

.emoji-container .extend::after {
  left: 10px;
  background: #fff;
}

.emoji-box {
  width: 100%;
  height: 160px;
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

.maximum-characters {
  position: relative;
  margin-right: 8px;
}

.maximum-characters .number {
  font-size: 12px;
  color: var(--secondary-text-color);
  cursor: pointer;
}

.maximum-characters.active .number {
  color: var(--primary-text-color);
}

.maximum-characters .extend {
  right: 0;
  width: 291px;
  color: #fff;
  background: #000;
  margin-top: 10px;
  padding: 12px;
}

.maximum-characters .extend::after {
  right: 10px;
  background: #000;
}

.tab {
  position: relative;
  width: 100%;
  border-top: 1px solid var(--separator-modal-color);
  padding: 0 16px;
  font-size: 16px;
}

.tab .header {
  width: 100%;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.tab .title {
  padding: 12px 0;
  line-height: 20px;
}

.location .input {
  font-size: 16px;
  line-height: 30px;
  padding: 7px 0;
}

.accessibility-wrapper .desc {
  display: block;
  font-size: 12px;
  color: var(--secondary-text-color);
  text-align: left;
}

.accessibility-list {
  margin-top: 12px;
}

.accessibility-item {
  margin-bottom: 16px;
}

.accessibility-image {
  width: 44px;
  height: 44px;
  margin-right: 8px;
}

.accessibility-input {
  flex-grow: 1;
}

.accessibility-input input {
  width: 100%;
  height: 100%;
  padding: 4px 12px;
  border: 1px solid var(--separator-modal-color);
  border-radius: 6px;
}

.accessibility-input input:focus {
  border-color: var(--border-dark-color);
}
</style>
