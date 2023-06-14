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
          v-model="caption"
          class="textarea"
          placeholder="Viết chú thích..."
          @input="hanldeInputCaption"
        ></textarea>
      </div>
      <div class="caption-features flex">
        <div class="emoticon-container">
          <div class="icon">
            <emoticon-icon />
          </div>
          <div v-if="activeEmoticonTooltip" class="extend"></div>
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
      <div class="extend"></div>
    </div>
    <div class="accessibility flex tab">
      <span class="title">Trợ năng</span>
      <div class="icon">
        <fa v-if="true" :icon="['fas', 'chevron-down']" />
        <fa v-else :icon="['fas', 'chevron-up']" />
      </div>
      <div class="extend"></div>
    </div>
    <div class="setting flex tab">
      <span class="title">Cài đặt nâng cao</span>
      <div class="icon">
        <fa v-if="true" :icon="['fas', 'chevron-down']" />
        <fa v-else :icon="['fas', 'chevron-up']" />
      </div>
      <div class="extend"></div>
    </div>
  </div>
</template>

<script>
import EmoticonIcon from "@/components/SVG/EmoticonIcon.vue";
import LocationIcon from "@/components/SVG/LocationIcon.vue";

import { mapGetters } from "vuex";

export default {
  data() {
    return {
      caption: "",
      activeEmoticonTooltip: false,
      activeCharactersTooltip: false,
    };
  },
  computed: {
    ...mapGetters("user", ["currentUser"]),
    characterCount() {
      return this.caption.length.toLocaleString("en-US").replace(",", ".");
    },
  },
  methods: {
    hanldeInputCaption(event) {
      if (this.caption.length >= 2200) {
        this.caption = event.target.value.slice(0, 2200);
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
  height: 44px;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  flex-shrink: 0;
}

.emoticon-container .icon {
  padding: 8px;
  cursor: pointer;
}

.emoticon-container .icon > svg {
  color: var(--secondary-text-color) !important;
  fill: var(--secondary-text-color) !important;
  vertical-align: middle;
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
  top: 100%;
  right: 0;
  width: 291px;
  color: #fff;
  background: #000;
  border-radius: 8px;
  padding: 12px;
  z-index: 1;
  margin-top: 10px;
}

.maximum-characters .extend::after {
  content: "";
  width: 20px;
  height: 20px;
  position: absolute;
  top: -5px;
  right: 10px;
  background: #000;
  border-radius: 2px;
  transform: rotateZ(45deg);
  z-index: -1;
}

.tab {
  position: relative;
  width: 100%;
  border-top: 1px solid var(--separator-modal-color);
  padding: 0 16px;
  font-size: 16px;
}

.extend {
  position: absolute;
}

.location .input {
  font-size: 16px;
}

.accessibility,
.setting {
  cursor: pointer;
}
</style>
