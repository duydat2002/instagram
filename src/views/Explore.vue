<template>
  <div class="cac">
    <div class="cropper-area">
      <div class="image-cropper">
        <vue-cropper ref="cropper" v-bind="options" />
      </div>
    </div>
  </div>
</template>

<script>
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";

import { useUser } from "@/composables/useUser";

export default {
  data() {
    return {
      options: {
        src: require("@/assets/images/IMG_0683.jpeg"),
        viewMode: 1,
        dragMode: "move",
        aspectRatio: 1 / 1,
        zoomOnWheel: false,
        cropBoxMovable: false,
        cropBoxResizable: false,
      },
    };
  },
  async created() {
    const { getCurrentUser } = useUser();
    const user = await getCurrentUser();
    console.log(user);
  },
  components: { VueCropper },
};
</script>

<style scoped>
.cropper-area {
  width: 400px;
  height: 400px;
  margin: 0 auto;
}

.image-cropper {
  width: 100%;
  height: 100%;
}

img {
  display: block;

  max-width: 100%;
}
</style>
