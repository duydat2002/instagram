<template>
  <div class="crop-file">
    <div ref="container" class="image-container flex">
      <div
        ref="cropper"
        class="image-cropper"
        :style="{
          height: cropperSize.height + 'px',
          width: cropperSize.width + 'px',
        }"
      >
        <div
          ref="image"
          class="img-show"
          :style="imgStyle"
          @mousedown="mouseDownImage"
        ></div>
      </div>
      <canvas
        v-show="false"
        ref="canvas"
        :width="cropperSize.width"
        :height="cropperSize.height"
      />
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
                  @change="stick"
                />
              </div>
            </div>
          </transition>
          <div class="icon" @click="scaleImageActive = !scaleImageActive">
            <glass-plus-icon />
          </div>
        </div>
      </div>
      <div class="right">
        <div
          class="option list flex flex-col"
          :class="{ active: listImageActive }"
          v-click-outside="() => (listImageActive = false)"
        >
          <transition name="fadeUp">
            <div class="extend flex" v-if="listImageActive">
              <div class="item flex">
                <div class="list-image-container flex">
                  <div class="image-item" @click="cac">
                    <div class="image"></div>
                    <div class="image-delete">
                      <fa size="xl" :icon="['fas', 'xmark']" />
                    </div>
                  </div>
                  <div class="image-item">
                    <div class="image"></div>
                    <div class="image-delete">
                      <fa size="xl" :icon="['fas', 'xmark']" />
                    </div>
                  </div>
                  <div class="add-image" @click="lon">
                    <div class="add-image-icon">
                      <fa :icon="['fas', 'plus']" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
          <div class="icon" @click="listImageActive = !listImageActive">
            <layer-icon />
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
import LayerIcon from "@/components/SVG/LayerIcon.vue";
import Ratio1x1 from "@/components/SVG/Ratio1x1.vue";
import Ratio4x5 from "@/components/SVG/Ratio4x5.vue";
import Ratio16x9 from "@/components/SVG/Ratio16x9.vue";

import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      currentFileURL: null,
      aspectRatioActive: false,
      scaleImageActive: false,
      listImageActive: false,
      isDragging: false,
      aspectRatio: "1:1",
      scaleValue: 1,
      translatePosition: {
        x: 0,
        y: 0,
      },
      containerSize: {
        width: 0,
        height: 0,
      },
      cropperSize: {
        width: 0,
        height: 0,
      },
      imageSize: {
        width: 0,
        height: 0,
      },
      reviewImageSize: {
        width: 0,
        height: 0,
      },
      mousePosition: {
        x: 0,
        y: 0,
      },
      mouseDownPosition: {
        x: 0,
        y: 0,
      },
      img: null,
      newCanvas: null,
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
        width: this.reviewImageSize.width + "px",
        height: this.reviewImageSize.height + "px",
        backgroundImage: `url(${this.currentFileURL})`,
        transform: `translate(calc(-50% + ${this.translatePosition.x}px), calc(-50% + ${this.translatePosition.y}px)) scale(${this.scaleValue})`,
        cursor: this.isDragging ? "grabbing" : "grab",
      };
    },
  },
  methods: {
    ...mapMutations("createPost", ["setCanvasFiles"]),
    changeRatio(ratio) {
      this.aspectRatio = ratio;

      switch (this.aspectRatio) {
        case "original":
          if (this.imageSize.height < this.imageSize.width) {
            this.cropperSize.height =
              (this.containerSize.width * this.imageSize.height) /
              this.imageSize.width;
            this.cropperSize.width = this.containerSize.width;
          } else {
            this.cropperSize.height = this.containerSize.height;
            this.cropperSize.width =
              (this.containerSize.height * this.imageSize.width) /
              this.imageSize.height;
          }
          break;
        case "1:1":
          this.cropperSize.height = this.containerSize.height;
          this.cropperSize.width = this.containerSize.width;
          break;
        case "4:5":
          this.cropperSize.height = this.containerSize.height;
          this.cropperSize.width = (this.containerSize.height * 4) / 5;
          break;
        case "16:9":
          this.cropperSize.height = (this.containerSize.width * 9) / 16;
          this.cropperSize.width = this.containerSize.width;
          break;
      }

      if (this.imageSize.height < this.imageSize.width) {
        this.reviewImageSize.height = this.cropperSize.height;
        this.reviewImageSize.width =
          (this.cropperSize.height * this.imageSize.width) /
          this.imageSize.height;
      } else {
        this.reviewImageSize.width = this.cropperSize.width;
        this.reviewImageSize.height =
          (this.reviewImageSize.width * this.imageSize.height) /
          this.imageSize.width;
      }

      this.stick();
    },
    mouseDownImage(event) {
      document.body.style.cursor = "grabbing";
      this.isDragging = true;
      this.aspectRatioActive = false;
      this.scaleImageActive = false;

      this.mousePosition.x = event.clientX;
      this.mousePosition.y = event.clientY;

      this.mouseDownPosition.x = this.translatePosition.x;
      this.mouseDownPosition.y = this.translatePosition.y;
    },
    mouseMoveImage(event) {
      this.translatePosition.x =
        this.mouseDownPosition.x + (event.clientX - this.mousePosition.x) / 2;
      this.translatePosition.y =
        this.mouseDownPosition.y + (event.clientY - this.mousePosition.y) / 2;
    },
    mouseUpImage() {
      document.body.style.cursor = "auto";
      this.isDragging = false;

      this.stick();
    },
    stick() {
      const cropper = this.$refs.cropper.getBoundingClientRect();
      const image = this.$refs.image.getBoundingClientRect();

      if (cropper.left < image.left) {
        this.translatePosition.x += cropper.left - image.left;
      }
      if (cropper.top < image.top) {
        this.translatePosition.y += cropper.top - image.top;
      }
      if (cropper.right > image.right) {
        this.translatePosition.x += cropper.right - image.right;
      }
      if (cropper.bottom > image.bottom) {
        this.translatePosition.y += cropper.bottom - image.bottom;
      }
    },
    async initImage() {
      this.currentFileURL = URL.createObjectURL(this.files[0]);
      this.img = new Image();
      this.img.src = this.currentFileURL;

      return new Promise((resolve) => {
        this.img.addEventListener("load", () => {
          this.imageSize.height = this.img.height;
          this.imageSize.width = this.img.width;
          resolve();
        });
      });
    },
    cac() {
      const cropper = this.$refs.cropper.getBoundingClientRect();
      const image = this.$refs.image.getBoundingClientRect();
      const img = new Image();
      img.src = this.currentFileURL;
      const canvas = document.createElement("canvas");
      this.newCanvas = canvas;

      const ratioCrop = img.width / (this.cropperSize.width * this.scaleValue);

      canvas.width = this.cropperSize.width * ratioCrop;
      canvas.height = this.cropperSize.height * ratioCrop;
      console.log(canvas.width, canvas.height);

      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      img.addEventListener("load", () => {
        ctx.drawImage(img, 0, 0);
      });

      ctx.translate(
        (image.x - cropper.x) * ratioCrop,
        (image.y - cropper.y) * ratioCrop
      );
    },
    lon() {
      const a = this.newCanvas.toDataURL();
      const newTab1 = window.open();
      newTab1.document.write(
        '<html><body><img src="' + a + '"/></body></html>'
      );
    },
  },
  watch: {
    isDragging(newValue) {
      if (newValue) {
        document.addEventListener("mousemove", this.mouseMoveImage);
        document.addEventListener("mouseup", this.mouseUpImage);
      } else {
        document.removeEventListener("mousemove", this.mouseMoveImage);
        document.removeEventListener("mouseup", this.mouseUpImage);
      }
    },
  },
  async mounted() {
    this.containerSize.height = this.$refs.container.offsetHeight;
    this.containerSize.width = this.$refs.container.offsetWidth;

    await this.initImage();

    this.changeRatio("original");
  },
  beforeUnmount() {
    console.log(this.currentTab);
    if (this.currentTab == "EditFiles") {
      const cropper = this.$refs.cropper.getBoundingClientRect();
      const image = this.$refs.image.getBoundingClientRect();
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      const loadImg = new Promise((resolve) => {
        this.img.addEventListener("load", () => {
          ctx.drawImage(this.img, 0, 0, canvas.width, canvas.height);
          resolve();
        });
      });
      ctx.translate(image.x - cropper.x, image.y - cropper.y);
      ctx.scale(this.scaleValue, this.scaleValue);

      this.setCanvasFiles([canvas.toDataURL()]);
      loadImg.then(() => {
        const url = canvas.toDataURL();
        console.log(url);
      });
    }
  },
  components: {
    RatioIcon,
    ImageIcon,
    GlassPlusIcon,
    LayerIcon,
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

.image-cropper {
  position: relative;
  overflow: hidden;
}

.img-show {
  position: absolute;
  top: 50%;
  left: 50%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 1;
}

.crop-editor {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
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

.aspect-ratio {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
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
  z-index: 1;
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
  margin: 5px 0;
  cursor: pointer;
  color: transparent;
  background: #000;
}
.scale-input::-moz-range-trackk {
  width: 100%;
  height: 1px;
  margin: 5px 0;
  cursor: pointer;
  color: transparent;
  background: #000;
}
.scale-input::-ms-track {
  width: 100%;
  height: 1px;
  margin: 5px 0;
  cursor: pointer;
  color: transparent;
  background: #000;
}

.list {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 1;
}

.list-image-container {
  padding: 8px;
  background: rgba(26, 26, 26, 0.8);
  height: 118px;
  align-items: center;
  justify-content: center;
}
</style>
