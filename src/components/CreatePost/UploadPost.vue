<template>
  <div class="upload-post flex flex-col">
    <div class="gif" :style="gifStyle"></div>
    <p v-if="!isUploadding" class="text">Đã chia sẻ bài viết của bạn.</p>
  </div>
</template>

<script>
import { usePost } from "@/composables/usePost";

export default {
  data() {
    return {
      isUploadding: true,
    };
  },
  computed: {
    gifStyle() {
      return {
        backgroundImage: `url(${require(`@/assets/images/${
          this.isUploadding ? "Loading" : "Done"
        }.gif`)})`,
      };
    },
  },
  watch: {
    isUploadding(newValue) {
      this.$emit(
        "changeTitle",
        newValue ? "Đang chia sẻ" : "Đã chia sẻ bài viết"
      );
    },
  },
  async mounted() {
    const { setPost } = usePost();
    await setPost();
    this.isUploadding = false;
  },
};
</script>

<style scoped>
.upload-post {
  height: 100%;
  width: 406px;
  align-items: center;
  justify-content: center;
}

.gif {
  width: 96px;
  height: 96px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.text {
  font-size: 20px;
  color: var(--primary-text-color);
  margin: 16px 0;
}
</style>
