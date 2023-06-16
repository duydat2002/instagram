<template>
  <div class="create-post-modal flex flex-col">
    <div class="header">
      <div v-if="currentTab != 'UploadPost'" class="back" @click="handleBack">
        <fa size="xl" :icon="['fas', 'arrow-left']" />
      </div>
      <div class="title" @click="handleUpPost">
        <span>{{ title }}</span>
      </div>
      <div v-if="currentTab != 'UploadPost'" class="next" @click="handleNext">
        <ui-button variant="text">{{
          currentTab != "CaptionPost" ? "Tiếp" : "Chia sẻ"
        }}</ui-button>
      </div>
    </div>
    <div class="content">
      <upload-post v-if="currentTab == 'UploadPost'" />
      <editor-post v-else ref="editorPost" />
    </div>
  </div>

  <remove-popup
    v-if="removePostPopupShow"
    title="Bỏ bài viết?"
    desc="Nếu rời đi, bạn sẽ mất những gì vừa chỉnh sửa."
    @remove="handleRemovePost"
    @cancel="setRemovePostPopupShow(false)"
  />
  <remove-popup
    v-if="removeMediaPopupShow"
    title="Bỏ ảnh?"
    desc="Thao tác này sẽ gỡ ảnh khỏi bài viết của bạn."
    @remove="hanldeRemoveMedia"
    @cancel="setRemoveMediaPopupShow(false)"
  />
</template>

<script>
import UiButton from "@/components/UI/UiButton.vue";
import RemovePopup from "@/components/Popup/RemovePopup.vue";
import UploadPost from "@/components/CreatePost/UploadPost.vue";
import EditorPost from "@/components/CreatePost/EditorPost.vue";

import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      isClickBackFromEditor: false,
    };
  },
  computed: {
    ...mapGetters("createPost", ["currentTab", "currentMediaIndex"]),
    ...mapGetters("modal", ["removeMediaPopupShow", "removePostPopupShow"]),
    title() {
      let titleText = "";
      switch (this.currentTab) {
        case "UploadPost":
          titleText = "Tạo bài viết mới";
          break;
        case "EditorPost":
          titleText = "Cắt";
          break;
        case "FilterPost":
          titleText = "Chỉnh sửa";
          break;
        case "CaptionPost":
          titleText = "Tạo bài viết mới";
          break;
      }
      return titleText;
    },
  },
  methods: {
    ...mapMutations("modal", [
      "setModalCreatePostShow",
      "setRemoveMediaPopupShow",
      "setRemovePostPopupShow",
    ]),
    ...mapMutations("createPost", ["deleteMedia"]),
    ...mapActions("createPost", ["nextTab", "prevTab", "resetCreatePost"]),
    handleBack() {
      if (this.currentTab == "EditorPost") {
        this.isClickBackFromEditor = true;
        this.setRemovePostPopupShow(true);
      } else {
        this.isClickBack = false;
        this.prevTab();
      }
    },
    handleNext() {
      this.nextTab();
    },
    hanldeRemoveMedia() {
      this.deleteMedia(this.currentMediaIndex);
      this.setRemoveMediaPopupShow(false);
    },
    handleRemovePost() {
      if (this.isClickBackFromEditor) {
        this.setRemovePostPopupShow(false);
        this.prevTab();
      } else {
        this.setRemovePostPopupShow(false);
        this.setModalCreatePostShow(false);
      }

      setTimeout(() => {
        this.resetCreatePost();
      }, 0);
    },
    handleUpPost() {
      this.$refs.editorPost.createCanvas1();
    },
  },
  mounted() {
    document.title = "Tạo bài viết mới • Instagram";
  },
  components: { UploadPost, EditorPost, UiButton, RemovePopup },
};
</script>

<style scoped>
.create-post-modal {
  flex-wrap: nowrap;
  width: 100%;
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
