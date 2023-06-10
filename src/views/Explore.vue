<template>
  <div class="list-wrapper">
    <div class="list-draggable" :style="styles">
      <div class="image-item" v-for="item in lists" :key="item">
        <div
          class="image"
          :style="{
            backgroundImage: `url(${item})`,
          }"
        ></div>
        <div class="image-delete" @click="remove(item)">
          <fa size="sm" style="color: #fff" :icon="['fas', 'xmark']" />
        </div>
      </div>
    </div>
    <div class="navigation">
      <div class="navigation-button navigation-prev" @click="prev">
        <fa :icon="['fas', 'circle-chevron-left']" class="navigation-icon" />
      </div>
      <div class="navigation-button navigation-next" @click="next">
        <fa :icon="['fas', 'circle-chevron-right']" class="navigation-icon" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      itemWidth: 0,
      wrapperWidth: 300,
      listWidth: 848,
      length: 0,
      step: 2,
      translateX: 0,

      lists: [
        "https://loremflickr.com/320/320?random=" + 1,
        "https://loremflickr.com/320/320?random=" + 2,
        "https://loremflickr.com/320/320?random=" + 3,
        "https://loremflickr.com/320/320?random=" + 4,
        "https://loremflickr.com/320/320?random=" + 5,
        "https://loremflickr.com/320/320?random=" + 6,
        "https://loremflickr.com/320/320?random=" + 7,
        "https://loremflickr.com/320/320?random=" + 8,
      ],
    };
  },
  computed: {
    styles() {
      return {
        transform: `translateX(-${this.translateX}px)`,
      };
    },
  },
  methods: {
    translate() {},
    prev() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.translateX = this.step * this.currentIndex * this.itemWidth;
      }
    },
    next() {
      if (
        this.translateX + this.step * this.itemWidth <
        this.listWidth - this.wrapperWidth
      ) {
        this.currentIndex++;
        this.translateX = this.step * this.currentIndex * this.itemWidth;
      } else {
        this.translateX = this.listWidth - this.wrapperWidth;
      }
    },
    remove(url) {
      this.lists = this.lists.filter((item) => {
        return item != url;
      });
    },
  },
  mounted() {
    const list = document.querySelectorAll(".image-item");
    this.itemWidth = list[0].offsetWidth;
    this.length = list.length;
    this.listWidth = this.itemWidth * this.length;
  },
};
</script>

<style scoped>
.list-wrapper {
  position: relative;
  display: flex;
  margin: 50px auto;
  width: 300px;
  overflow: hidden;
}

.list-draggable {
  display: flex;
  align-items: center;
  transition: 0.2s;
}

.image-item {
  position: relative;
  cursor: pointer;
  padding: 0 6px;
}

.image-item .image {
  width: 94px;
  height: 94px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}

.image-item .image-delete {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  background: rgba(26, 26, 26, 0.8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s;
}

.image-item .image-delete:hover {
  opacity: 0.6;
}

.navigation-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  cursor: pointer;
}

.navigation-button svg {
  color: #000;
  fill: #000;
}

.navigation-button.swiper-button-disabled {
  display: none;
}

.navigation-prev {
  left: 0;
}
.navigation-next {
  right: 0;
}

.navigation-icon {
  font-size: 23px;
}
</style>
