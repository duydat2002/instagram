<template>
  <div class="crop-file">
    <div ref="container" class="image-container flex">
      <div
        ref="wrapper"
        class="image-wrapper"
        :style="{ height: imgStyle.height, width: imgStyle.width }"
      >
        <div ref="image" class="img-show" :style="imgStyle"></div>
      </div>
    </div>
    <div class="crop-editor">
      <div class="left">
        <div
          class="option aspect-ratio flex flex-col"
          :class="{ active: aspectRatioActive }"
          v-click-outside="() => (aspectRatioActive = false)"
        >
          <transition name="fadeUp">
            <div class="extend" v-if="aspectRatioActive">
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
          </transition>
          <div class="icon" @click="aspectRatioActive = !aspectRatioActive">
            <ratio-icon />
          </div>
        </div>
        <div
          class="option scale flex flex-col"
          :class="{ active: scaleImageActive }"
          v-click-outside="() => (scaleImageActive = false)"
        >
          <transition name="fadeUp">
            <div class="extend flex" v-if="scaleImageActive">
              <div class="item flex">
                <input
                  ref="scale"
                  class="scale-input"
                  type="range"
                  min="1"
                  max="2"
                  step="0.01"
                  v-model="scaleValue"
                />
              </div>
            </div>
          </transition>
          <div class="icon" @click="scaleImageActive = !scaleImageActive">
            <glass-plus-icon />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageIcon from "@/components/SVG/ImageIcon.vue";
import RatioIcon from "@/components/SVG/RatioIcon.vue";
import GlassPlusIcon from "@/components/SVG/GlassPlusIcon.vue";
import Ratio1x1 from "@/components/SVG/Ratio1x1.vue";
import Ratio4x5 from "@/components/SVG/Ratio4x5.vue";
import Ratio16x9 from "@/components/SVG/Ratio16x9.vue";

import { mapGetters } from "vuex";

export default {
  data() {
    return {
      currentFileURL: null,
      aspectRatioActive: false,
      scaleImageActive: false,
      aspectRatio: "1:1",
      scaleValue: 1,
      containerHeight: 0,
      containerWidth: 0,
      newHeight: 0,
      newWidth: 0,
      heightOriginal: 0,
      widthOriginal: 0,
      img: null,
    };
  },
  computed: {
    ...mapGetters("createPost", ["files", "currentTab"]),
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
        transform: `scale(${this.scaleValue})`,
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
    this.img = new Image();
    this.img.src = this.currentFileURL;

    this.img.addEventListener("load", () => {
      this.heightOriginal = this.img.height;
      this.widthOriginal = this.img.width;
    });
  },
  mounted() {
    this.containerHeight = this.$refs.container.offsetHeight;
    this.containerWidth = this.$refs.container.offsetWidth;

    this.newHeight = this.containerHeight;
    this.newWidth = this.containerWidth;
  },
  beforeUnmount() {
    console.log(this.currentTab);
    if (this.currentTab == "EditFiles") {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = this.newWidth;
      canvas.height = this.newHeight;

      // ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
      // ctx.translate(canvas.width / 2, canvas.height / 2);
      // if (rotate !== 0) {
      //   ctx.rotate((rotate * Math.PI) / 180);
      // }
      ctx.scale(this.scaleValue, this.scaleValue);
      ctx.drawImage(this.img, 0, 0, canvas.width, canvas.height);

      // console.log(canvas.toDataURL());
      window.open(canvas.toDataURL(), "_blank").focus();
    }
  },
  components: {
    RatioIcon,
    ImageIcon,
    GlassPlusIcon,
    Ratio1x1,
    Ratio4x5,
    Ratio16x9,
  },
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

.image-wrapper {
  overflow: hidden;
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

.option.active .icon {
  background: #fff;
}

.option.active .icon svg {
  color: #000;
  fill: #000;
}

.aspect-ratio .extend {
  margin-left: 16px;
  background: rgba(26, 26, 26, 0.8);
  border-radius: 8px;
}

.aspect-ratio .item {
  align-items: center;
  padding-left: 16px;
  cursor: pointer;
  opacity: 0.6;
}

.aspect-ratio .item.active {
  opacity: 1;
}

.aspect-ratio .item-text {
  color: #fff;
  font-weight: 600;
}

.aspect-ratio .item-icon {
  padding: 12px;
}

.aspect-ratio .item-icon svg {
  color: #fff;
  fill: #fff;
  vertical-align: middle;
}

.scale {
  position: absolute;
  left: 44px;
  bottom: 0;
}

.scale .extend {
  background: rgba(26, 26, 26, 0.8);
  border-radius: 8px;
  height: 32px;
  align-items: center;
}

.scale .item {
  height: 100%;
  padding: 8px 12px;
  align-items: center;
}

.scale-input {
  -webkit-appearance: none;
  background: transparent;
}

.scale-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 16px;
  width: 16px;
  background: #fff !important;
  border-radius: 50%;
  cursor: pointer;
  margin-top: -8px;
}
.scale-input::-moz-range-thumb {
  -webkit-appearance: none;
  height: 16px;
  width: 16px;
  background: #fff !important;
  border-radius: 50%;
  cursor: pointer;
  margin-top: -8px;
}
.scale-input::-ms-thumb {
  -webkit-appearance: none;
  height: 16px;
  width: 16px;
  background: #fff !important;
  border-radius: 50%;
  cursor: pointer;
  margin-top: -8px;
}

.scale-input::-webkit-slider-runnable-track {
  width: 100%;
  height: 1px;
  cursor: pointer;
  color: transparent;
  background: #000;
}
.scale-input::-moz-range-trackk {
  width: 100%;
  height: 1px;
  cursor: pointer;
  color: transparent;
  background: #000;
}
.scale-input::-ms-track {
  width: 100%;
  height: 1px;
  cursor: pointer;
  color: transparent;
  background: #000;
}
</style>
