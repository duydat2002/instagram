<template>
  <div class="create-post-modal flex flex-col">
    <div class="header">
      <div v-if="currentTab != 'InitFiles'" class="back" @click="handleBack">
        <fa size="xl" :icon="['fas', 'arrow-left']" />
      </div>
      <div class="title">
        <span>{{ title }}</span>
      </div>
      <div v-if="currentTab != 'InitFiles'" class="next" @click="handleNext">
        <ui-button variant="text">Tiếp</ui-button>
      </div>
    </div>
    <div class="content">
      <component :is="currentTab"></component>
    </div>
  </div>
</template>

<script>
import UiButton from "@/components/UI/UiButton.vue";
import InitFiles from "@/components/Post/InitFiles.vue";
import CropFiles from "@/components/Post/CropFiles.vue";
import EditFiles from "@/components/Post/EditFiles.vue";
import PostFiles from "@/components/Post/PostFiles.vue";
import test from "@/components/Post/test.vue";

import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      title: "Tạo bài viết mới",
    };
  },
  computed: {
    ...mapGetters("createPost", ["currentTab"]),
  },
  methods: {
    ...mapMutations("modal", ["setStopScroll"]),
    ...mapActions("createPost", ["nextTab", "prevTab"]),
    handleBack() {
      this.prevTab();
    },
    handleNext() {
      this.nextTab();
    },
  },
  mounted() {
    this.setStopScroll(true);
  },
  components: { InitFiles, CropFiles, EditFiles, PostFiles, UiButton, test },
};
</script>

<style scoped>
.create-post-modal {
  flex-wrap: nowrap;
  width: 406px;
  height: calc(100vh - 40px);
  max-height: 448px;
  color: var(--primary-text-color);
  background: var(--modal-color);
  border-radius: 12px;
  overflow: hidden;
  text-align: center;
  user-select: none;
}

.header {
  position: relative;
  display: flex;
  flex: none;
  align-items: center;
  height: 42px;
  background: var(--modal-color);
  border-bottom: 1px solid var(--separator-modal-color);
  z-index: 1;
}

.title {
  position: absolute;
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
}

.back {
  position: absolute;
  left: 8px;
  padding: 8px;
  cursor: pointer;
  z-index: 1;
}

.next {
  position: absolute;
  right: 0;
  z-index: 1;
}

.content {
  height: 100%;
  max-height: 406px;
}

.init-file {
  padding: 24px;
  height: 100%;
}
</style>
