<template>
  <div class="crop-file">
    <div ref="container" class="image-container flex">
      <div class="img-show" :style="imgStyle"></div>
    </div>
    <div class="crop-editor">
      <div
        class="option aspect-ratio flex flex-col"
        :class="{ active: aspectRatioActive }"
        v-click-outside="() => (aspectRatioActive = false)"
      >
        <div class="extend">
          <div
            class="item flex original"
            :class="{ active: aspectRatio == 'original' }"
            @click="changeRatio('original')"
          >
            <span class="item-text">Gốc</span>
            <div class="item-icon">
              <image-icon />
            </div>
          </div>
          <div class="separator separator-small"></div>
          <div
            class="item flex ratio-1-1"
            :class="{ active: aspectRatio == '1:1' }"
            @click="changeRatio('1:1')"
          >
            <span class="item-text">1:1</span>
            <div class="item-icon">
              <Ratio1x1 />
            </div>
          </div>
          <div class="separator separator-small"></div>
          <div
            class="item flex ratio-4-5"
            :class="{ active: aspectRatio == '4:5' }"
            @click="changeRatio('4:5')"
          >
            <span class="item-text">4:5</span>
            <div class="item-icon">
              <Ratio4x5 />
            </div>
          </div>
          <div class="separator separator-small"></div>
          <div
            class="item flex ratio-16-9"
            :class="{ active: aspectRatio == '16:9' }"
            @click="changeRatio('16:9')"
          >
            <span class="item-text">16:9</span>
            <div class="item-icon">
              <Ratio16x9 />
            </div>
          </div>
        </div>
        <div class="icon" @click="aspectRatioActive = !aspectRatioActive">
          <ratio-icon />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageIcon from "@/components/SVG/ImageIcon.vue";
import RatioIcon from "@/components/SVG/RatioIcon.vue";
import Ratio1x1 from "@/components/SVG/Ratio1x1.vue";
import Ratio4x5 from "@/components/SVG/Ratio4x5.vue";
import Ratio16x9 from "@/components/SVG/Ratio16x9.vue";

import { mapGetters } from "vuex";

export default {
  data() {
    return {
      currentFileURL: null,
      aspectRatioActive: false,
      aspectRatio: "1:1",
      containerHeight: 0,
      containerWidth: 0,
      newHeight: 0,
      newWidth: 0,
      heightOriginal: 0,
      widthOriginal: 0,
    };
  },
  computed: {
    ...mapGetters("createPost", ["files"]),
    filesUrl() {
      let urls = [];
      for (const file of this.files) {
        urls.push(URL.createObjectURL(file));
      }
      console.log(this.files);
      return urls;
    },
    imgStyle() {
      return {
        backgroundImage: `url(${this.currentFileURL})`,
        height: this.newHeight + "px",
        width: this.newWidth + "px",
      };
    },
  },
  methods: {
    changeRatio(ratio) {
      this.aspectRatio = ratio;

      switch (this.aspectRatio) {
        case "original":
          if (this.heightOriginal < this.widthOriginal) {
            this.newHeight =
              (this.containerWidth * this.heightOriginal) / this.widthOriginal;
            this.newWidth = this.containerWidth;
          } else {
            this.newHeight = this.containerHeight;
            this.newWidth =
              (this.containerHeight * this.widthOriginal) / this.heightOriginal;
          }
          break;
        case "1:1":
          this.newHeight = this.containerHeight;
          this.newWidth = this.containerWidth;
          break;
        case "4:5":
          this.newHeight = this.containerHeight;
          this.newWidth = (this.containerHeight * 4) / 5;
          break;
        case "16:9":
          this.newHeight = (this.containerWidth * 9) / 16;
          this.newWidth = this.containerWidth;
          break;
      }
    },
  },
  beforeMount() {
    this.currentFileURL = URL.createObjectURL(this.files[0]);
    const img = new Image();
    img.src = this.currentFileURL;

    img.addEventListener("load", () => {
      this.heightOriginal = img.height;
      this.widthOriginal = img.width;
    });
  },
  mounted() {
    this.containerHeight = this.$refs.container.offsetHeight;
    this.containerWidth = this.$refs.container.offsetWidth;

    this.newHeight = this.containerHeight;
    this.newWidth = this.containerWidth;
  },
  components: { RatioIcon, ImageIcon, Ratio1x1, Ratio4x5, Ratio16x9 },
};
</script>

<style scoped>
.image-container {
  background: #f5f5f5;
  align-items: center;
  justify-content: center;
}

.crop-file,
.image-container {
  height: 100%;
  width: 100%;
}

.crop-file {
  position: relative;
}

.img-show {
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}

.crop-editor {
  position: absolute;
  left: 0;
  bottom: 0;
  user-select: none;
}

.option .icon {
  width: 32px;
  height: 32px;
  padding: 8px;
  margin: 16px;
  background: #1a1a1acc;
  border-radius: 50%;
  transition: 0.2s;
  cursor: pointer;
}

.option .icon:hover {
  opacity: 0.6;
}

.option .icon > svg {
  color: #fff;
  fill: #fff;
}

.option .extend {
  transform: translateY(16px);
  opacity: 0;
  transition: opacity 180ms linear, transform 90ms ease-out;
}

.option.active .extend {
  transform: translateY(0px);
  opacity: 1;
}

.aspect-ratio.active .icon {
  background: #fff;
}

.aspect-ratio.active .icon svg {
  color: #000;
  fill: #000;
}

.aspect-ratio .extend {
  margin-left: 16px;
  background: rgba(26, 26, 26, 0.8);
  border-radius: 8px;
}

.extend .item {
  align-items: center;
  padding-left: 16px;
  cursor: pointer;
  opacity: 0.6;
}

.extend .item.active {
  opacity: 1;
}

.extend .item-text {
  color: #fff;
  font-weight: 600;
}

.extend .item-icon {
  padding: 12px;
}

.extend .item-icon svg {
  color: #fff;
  fill: #fff;
  vertical-align: middle;
}
</style>
