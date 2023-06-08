<template>
  <div class="cac flex-col">
    <div class="images flex">
      <div ref="cropper" class="cropper-container">
        <div
          ref="image"
          class="image-container"
          :style="styleImg"
          @mousedown="mouseDownImage"
        >
          <!-- <img src="@/assets/images/IMG_0683.jpeg" alt="" /> -->
          <span class="dot nw"></span>
          <span class="dot ne"></span>
          <span class="dot se"></span>
          <span class="dot sw"></span>
        </div>
        <span class="dot nw"></span>
        <span class="dot ne"></span>
        <span class="dot se"></span>
        <span class="dot sw"></span>
      </div>
      <div class="canvas-container">
        <canvas id="canvas" ref="canvas" />
      </div>
    </div>
    <div class="control flex">
      <div class="group">
        <label for="x">x</label>
        <input type="number" step="100" id="x" v-model="x" />
      </div>
      <div class="group">
        <label for="y">y</label>
        <input type="number" step="100" id="y" v-model="y" />
      </div>
      <div class="group">
        <label for="width">width</label>
        <input type="number" step="100" id="width" v-model="width" />
      </div>
      <div class="group">
        <label for="height">height</label>
        <input type="number" step="100" id="height" v-model="height" />
      </div>
      <div class="group">
        <label for="scale">scale</label>
        <input
          type="range"
          min="1"
          max="2"
          step="0.01"
          id="scale"
          v-model="scale"
          @change="stick"
        />
      </div>
    </div>
    <button @click="click">OK</button>
    <button @click="reset">Reset</button>
    <button @click="cac">Cac</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      x: 0,
      y: 0,
      width: 1536,
      height: 2048,
      scale: 1,
      isDragging: false,
      mousePosition: { x: 0, y: 0 },
      oldX: 0,
      oldY: 0,
      canvasFull: null,
    };
  },
  computed: {
    styleImg() {
      return {
        transform: `translate(${this.x}px, ${this.y}px) scale(${this.scale})`,
        cursor: this.isDragging ? "grabbing" : "grab",
      };
    },
  },
  methods: {
    mouseDownImage(event) {
      document.body.style.cursor = "grabbing";
      this.isDragging = true;
      this.mousePosition.x = event.clientX;
      this.mousePosition.y = event.clientY;

      this.oldX = this.x;
      this.oldY = this.y;
    },
    mouseMoveImage(event) {
      this.x = this.oldX + (event.clientX - this.mousePosition.x) / 2;
      this.y = this.oldY + (event.clientY - this.mousePosition.y) / 2;
    },
    mouseUpImage() {
      document.body.style.cursor = "auto";
      this.isDragging = false;

      this.stick();
    },
    testCanvas() {
      const originalImage = new Image();
      originalImage.src = require("@/assets/images/IMG_0683.jpeg");

      originalImage.addEventListener("load", () => {
        const canvas = document.createElement("canvas");
        canvas.width = 406;
        canvas.height = 406;

        this.canvasFull = canvas;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(
          originalImage,
          0,
          0,
          originalImage.width,
          originalImage.height,
          (canvas.width - originalImage.width) / 2, // Căn giữa theo chiều ngang
          (canvas.height - originalImage.height) / 2, // Căn giữa theo chiều dọc
          originalImage.width,
          originalImage.height
        );

        const croppedImage = new Image();
        croppedImage.src = canvas.toDataURL("image/jpeg");
        console.log(croppedImage.src);
      });
    },
    newCanvas() {
      const img = new Image();
      img.src = require("@/assets/images/IMG_0683.jpeg");

      const canvas = document.createElement("canvas");

      const ratioCrop = img.width / (304.5 * this.scale);

      this.canvasFull = canvas;
      canvas.width = 304.5 * ratioCrop;
      canvas.height = 406 * ratioCrop;

      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      const cropper = this.$refs.cropper.getBoundingClientRect();
      const image = this.$refs.image.getBoundingClientRect();

      img.addEventListener("load", () => {
        ctx.drawImage(img, 0, 0);
      });
      ctx.translate(
        (image.x - cropper.x) * ratioCrop,
        (image.y - cropper.y) * ratioCrop
      );
    },
    click() {
      const canvas = this.$refs.canvas;
      canvas.width = 304.5;
      canvas.height = 406;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const img = new Image();
      img.src = require("@/assets/images/IMG_0683.jpeg");
      this.width = img.width;
      this.height = img.height;
      const cropper = this.$refs.cropper.getBoundingClientRect();
      const image = this.$refs.image.getBoundingClientRect();

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      img.addEventListener("load", () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      });
      ctx.translate(image.x - cropper.x, image.y - cropper.y);
      ctx.scale(this.scale, this.scale);

      this.testCanvas();
    },
    reset() {
      this.x = 0;
      this.y = 0;
      this.scale = 1;
    },
    stick() {
      const cropper = this.$refs.cropper.getBoundingClientRect();
      const image = this.$refs.image.getBoundingClientRect();

      if (cropper.left < image.left) {
        this.x += cropper.left - image.left;
      }
      if (cropper.top < image.top) {
        this.y += cropper.top - image.top;
      }
      if (cropper.right > image.right) {
        this.x += cropper.right - image.right;
      }
      if (cropper.bottom > image.bottom) {
        this.y += cropper.bottom - image.bottom;
      }
    },
    cac() {
      // const url = this.$refs.canvas.toDataURL();
      const a = this.canvasFull.toDataURL();
      console.log(a);
      // console.log(url);

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
};
</script>

<style scoped>
.cac {
  margin-top: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.images {
  gap: 20px;
}

#canvas {
  background: #ffbaba;
}

.control {
  margin-top: 20px;
  z-index: 100;
}

.group {
  margin: 10px;
}

label {
  margin-right: 5px;
}

input {
  width: 50px;
  border: 1px solid #000;
}

button {
  padding: 10px;
  margin-top: 20px;
  z-index: 100;
}

.cropper-container {
  position: relative;
  overflow: hidden;
}

.image-container {
  position: relative;
  height: 406px;
  width: 304.5px;
  background-image: url("@/assets/images/IMG_0683.jpeg");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: grab;
  /* transition: 0.16s; */
}

.canvas-container {
  width: 304.5px;
  height: 406px;
}

#canvas {
  width: 100%;
  height: 100%;
}

.dot {
  display: block;
  position: absolute;
  width: 1px;
  height: 1px;
  background: #2bff00;
}

.nw {
  top: 0;
  left: 0;
}

.ne {
  top: 0;
  right: 0;
}

.sw {
  bottom: 0;
  left: 0;
}

.se {
  bottom: 0;
  right: 0;
}
</style>
