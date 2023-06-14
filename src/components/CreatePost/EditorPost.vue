<template>
  <div class="editor-post flex">
    <div class="editor-left">
      <div ref="container" class="image-cropper-container flex">
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
          <div class="img-cover" :style="imgCoverStyle"></div>
        </div>
        <div class="navigation">
          <div
            v-if="currentMedia.url != medias[0].url"
            class="navigation-button navigation-prev"
            @click="prevMedia"
          >
            <fa :icon="['fas', 'chevron-left']" class="navigation-icon" />
          </div>
          <div
            v-if="currentMedia.url != medias[medias.length - 1].url"
            class="navigation-button navigation-next"
            @click="nextMedia"
          >
            <fa :icon="['fas', 'chevron-right']" class="navigation-icon" />
          </div>
        </div>
        <div v-if="medias.length > 1" class="pagination">
          <div
            v-for="media in medias"
            :key="media.url"
            :class="['dot', { active: media.url == currentMedia.url }]"
          ></div>
        </div>
        <div v-if="isDragging" class="gridlines">
          <div class="lines lines-col flex flex-col">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
          </div>
          <div class="lines lines-row flex flex-row">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
          </div>
        </div>
        <canvas
          v-show="true"
          ref="canvas"
          :width="cropperSize.width"
          :height="cropperSize.height"
        />
      </div>
      <div v-if="currentTab == 'EditorPost'" class="crop-editor">
        <div class="left">
          <div
            class="option aspect-ratio flex flex-col"
            :class="{ active: aspectRatioActive }"
            v-click-outside.short="() => (aspectRatioActive = false)"
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
            v-click-outside.short="() => (scaleImageActive = false)"
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
                    @change="handleChangeScale"
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
            v-click-outside.short="() => (listImageActive = false)"
          >
            <transition name="fadeUp">
              <div class="extend flex" v-if="listImageActive">
                <div class="item flex">
                  <list-post />
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
    <transition name="slideRight">
      <div
        v-if="currentTab == 'FilterPost' || currentTab == 'CaptionPost'"
        class="editor-right"
      >
        <filter-post v-if="currentTab == 'FilterPost'" />
        <caption-post v-if="currentTab == 'CaptionPost'" />
      </div>
    </transition>
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
import FilterPost from "@/components/CreatePost/FilterPost.vue";
import CaptionPost from "@/components/CreatePost/CaptionPost.vue";
import ListPost from "@/components/CreatePost/ListPost.vue";

import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
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
      newCanvas: null,
    };
  },
  computed: {
    ...mapGetters("createPost", [
      "medias",
      "filter",
      "currentMedia",
      "currentMediaIndex",
      "currentRatio",
      "currentTab",
    ]),
    imgStyle() {
      let cursorType;
      if (this.currentTab == "EditorPost") {
        cursorType = this.isDragging ? "grabbing" : "grab";
      } else if (this.currentTab == "FilterPost") {
        cursorType = "pointer";
      } else {
        cursorType = "crosshair";
      }

      return {
        width: this.reviewImageSize.width + "px",
        height: this.reviewImageSize.height + "px",
        backgroundImage: `url(${this.currentMedia.url})`,
        transform: `translate(calc(-50% + ${this.translatePosition.x}px), calc(-50% + ${this.translatePosition.y}px)) scale(${this.scaleValue})`,
        cursor: cursorType,
        "-webkit-filter": this.currentMedia.filters.filter,
        filter: this.currentMedia.filters.filter,
      };
    },
    imgCoverStyle() {
      return {
        background: this.currentMedia.filters.background,
      };
    },
  },
  methods: {
    ...mapMutations("createPost", [
      "setCurrentMedia",
      "updateMedia",
      "setCurrentRatio",
    ]),
    ...mapActions("createPost", ["nextMedia", "prevMedia"]),
    changeRatio(ratio) {
      this.setCurrentRatio(ratio);

      switch (ratio) {
        case "original":
          if (this.currentMedia.size.height < this.currentMedia.size.width) {
            this.cropperSize.height =
              (this.containerSize.width * this.currentMedia.size.height) /
              this.currentMedia.size.width;
            this.cropperSize.width = this.containerSize.width;
          } else {
            this.cropperSize.height = this.containerSize.height;
            this.cropperSize.width =
              (this.containerSize.height * this.currentMedia.size.width) /
              this.currentMedia.size.height;
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

      if (
        this.currentMedia.size.height < this.currentMedia.size.width ||
        (ratio == "4:5" &&
          this.currentMedia.size.height == this.currentMedia.size.width)
      ) {
        this.reviewImageSize.height = this.cropperSize.height;
        this.reviewImageSize.width =
          (this.cropperSize.height * this.currentMedia.size.width) /
          this.currentMedia.size.height;
      } else {
        this.reviewImageSize.width = this.cropperSize.width;
        this.reviewImageSize.height =
          (this.reviewImageSize.width * this.currentMedia.size.height) /
          this.currentMedia.size.width;
      }

      this.stick();
    },
    handleChangeScale() {
      const media = {
        ...this.currentMedia,
        scale: this.scaleValue,
      };

      this.updateMedia({ index: this.currentMediaIndex, newMedia: media });
      this.stick();
    },
    mouseDownImage(event) {
      if (this.currentTab == "EditorPost") {
        document.body.style.cursor = "grabbing";
        this.isDragging = true;
        this.currentRatioActive = false;
        this.scaleImageActive = false;

        this.mousePosition.x = event.clientX;
        this.mousePosition.y = event.clientY;

        this.mouseDownPosition.x = this.translatePosition.x;
        this.mouseDownPosition.y = this.translatePosition.y;
      }
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

      const media = {
        ...this.currentMedia,
        translate: { ...this.translatePosition },
      };

      this.updateMedia({ index: this.currentMediaIndex, newMedia: media });

      this.stick();
    },
    stick() {
      setTimeout(() => {
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
      }, 0);
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
    currentMedia(newMedia) {
      // Set scale and translate from newMedia
      this.scaleValue = newMedia.scale;
      this.translatePosition = { ...newMedia.translate };

      setTimeout(() => {
        this.changeRatio(this.currentRatio);
      }, 0);
    },
  },
  async mounted() {
    this.containerSize.height = this.$refs.container.offsetHeight;
    this.containerSize.width = this.$refs.container.offsetWidth;

    this.changeRatio(this.currentRatio);

    this.setCurrentMedia(this.medias[0]);
  },
  components: {
    RatioIcon,
    ImageIcon,
    GlassPlusIcon,
    LayerIcon,
    Ratio1x1,
    Ratio4x5,
    Ratio16x9,
    ListPost,
    FilterPost,
    CaptionPost,
  },
};
</script>

<style scoped>
.editor-post {
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
  height: 100%;
}

.image-cropper-container {
  background: #f5f5f5;
  align-items: center;
  justify-content: center;
}

.editor-left,
.image-cropper-container {
  height: 100%;
  width: 100%;
}

.editor-left {
  position: relative;
  width: 406px;
}

.editor-right {
  overflow: hidden;
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

.img-cover {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
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

.option .extend,
.option .icon {
  z-index: 1;
}

.aspect-ratio {
  position: absolute;
  bottom: 0;
  left: 0;
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
  -moz-appearance: none;
  appearance: none;
  background: transparent;
}

.scale-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  height: 16px;
  width: 16px;
  background: #fff !important;
  border-radius: 50%;
  cursor: pointer;
  margin-top: -8px;
}
.scale-input::-moz-range-thumb {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  height: 16px;
  width: 16px;
  background: #fff !important;
  border-radius: 50%;
  cursor: pointer;
  margin-top: -8px;
}
.scale-input::-ms-thumb {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
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
  align-items: end;
}

.gridlines {
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
}

.gridlines,
.lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.line {
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
  background: rgba(255, 255, 255, 0.3);
}

.lines-col .line {
  width: 1px;
  height: 100%;
}

.lines-row .line {
  height: 1px;
  width: 100%;
}

.navigation-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  background: #1a1a1acc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  transition: 0.2s;
  cursor: pointer;
  z-index: 1;
}

.navigation-button:hover {
  opacity: 0.6;
}

.navigation-button svg {
  color: #fff;
  fill: #fff;
}

.navigation-prev {
  left: 8px;
}
.navigation-next {
  right: 8px;
}

.navigation-icon {
  font-size: 16px;
}

.pagination {
  position: absolute;
  left: 50%;
  bottom: 30px;
  transform: translateX(-50%);
  display: flex;
  z-index: 1;
}

.pagination .dot {
  width: 6px;
  height: 6px;
  background: var(--border-dark-color);
  border-radius: 50%;
  margin: 0 2px;
  transition: all 0.2s ease-in-out;
}

.pagination .dot.active {
  background: var(--primary-button-color);
}
</style>
