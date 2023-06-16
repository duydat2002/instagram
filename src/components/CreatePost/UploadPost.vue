<template>
  <div
    class="drag-drop-container flex flex-col"
    @dragover="handleDragOver"
    @drop="handleDrop"
  >
    <div class="icon">
      <media-files-icon />
    </div>
    <span class="text">Kéo ảnh và video vào đây</span>
    <ui-button primary class="button" @click="handleClickChooseFile"
      >Chọn từ máy tính</ui-button
    >
    <form method="post" enctype="multipart/form-data">
      <input
        ref="inputFiles"
        accept="image/*, video/*"
        type="file"
        style="display: none"
        multiple
        @change="getInputFiles($event)"
      />
    </form>
  </div>
</template>

<script>
import MediaFilesIcon from "@/components/SVG/MediaFilesIcon.vue";
import UiButton from "../UI/UiButton.vue";
import { mapMutations, mapActions } from "vuex";

export default {
  computed: {},
  methods: {
    ...mapMutations("createPost", ["setMedias", "setCurrentMedia"]),
    ...mapActions("createPost", ["nextTab", "uploadMedias"]),
    handleClickChooseFile() {
      this.$refs.inputFiles.click();
    },
    getInputFiles(event) {
      const files = event.target.files;

      this.uploadMedias(files);
    },
    handleDragOver(event) {
      event.preventDefault();
    },
    handleDrop(event) {
      event.preventDefault();
      const files = event.dataTransfer.files;

      this.uploadMedias(files);
    },
  },
  components: { UiButton, MediaFilesIcon },
};
</script>

<style scoped>
.drag-drop-container {
  height: 100%;
  width: 406px;
  align-items: center;
  justify-content: center;
}

.text {
  font-size: 20px;
  font-weight: 400;
  margin-top: 10px;
  margin-bottom: 20px;
}

.button {
  width: auto;
}
</style>
