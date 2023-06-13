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
    ...mapActions("createPost", ["nextTab"]),
    getImageSize(url) {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          resolve({ width: img.width, height: img.height });
        };
      });
    },
    filesToMedias(files) {
      const medias = [];
      const promises = [];

      for (let file of files) {
        const url = URL.createObjectURL(file);

        const promise = this.getImageSize(url).then((size) => {
          const media = {
            url,
            size,
            translate: {
              x: 0,
              y: 0,
            },
            scale: 1,
            filters: {},
            adjust: {
              brightness: 0,
              contrast: 0,
              saturate: 0,
              blur: 0,
              grayscale: 0,
              sepia: 0,
              "hue-rotate": 0,
              temperature: 0,
              blurBorder: 0,
            },
            filterTemplate: {},
          };
          medias.push(media);
        });

        promises.push(promise);
      }

      Promise.all(promises).then(() => {
        this.setMedias(medias);
        this.setCurrentMedia(medias[0]);
        this.nextTab();
      });
    },
    handleClickChooseFile() {
      this.$refs.inputFiles.click();
    },
    getInputFiles(event) {
      const files = event.target.files;

      this.filesToMedias(files);
    },
    handleDragOver(event) {
      event.preventDefault();
    },
    handleDrop(event) {
      event.preventDefault();
      const files = event.dataTransfer.files;

      this.filesToMedias(files);
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
