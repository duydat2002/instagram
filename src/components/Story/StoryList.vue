<template>
  <div class="stories-slide">
    <swiper v-bind="swiperOptions">
      <swiper-slide v-for="n in 20" :key="n">
        <story-item
          :username="'username' + n"
          :image="'https://loremflickr.com/320/320?random=' + n"
        />
      </swiper-slide>
    </swiper>
    <div class="stories-navigation">
      <div class="navigation-button navigation-prev">
        <fa :icon="['fas', 'circle-chevron-left']" class="navigation-icon" />
      </div>
      <div class="navigation-button navigation-next">
        <fa :icon="['fas', 'circle-chevron-right']" class="navigation-icon" />
      </div>
    </div>
  </div>
</template>

<script>
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";
import StoryItem from "./StoryItem.vue";

export default {
  data() {
    return {
      swiperOptions: {
        modules: [Navigation],
        slidesPerView: 8,
        slidesPerGroup: 4,
        spaceBetween: 14,
        allowTouchMove: true,
        navigation: {
          nextEl: ".navigation-next",
          prevEl: ".navigation-prev",
        },
      },
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    StoryItem,
  },
};
</script>

<style scoped>
.stories-slide {
  position: relative;
  width: 100%;
}

.navigation-button {
  padding: 15px;
  position: absolute;
  top: 50%;
  transform: translateY(calc(-50% - 6px));
  z-index: 1;
  cursor: pointer;
}

.navigation-button svg {
  color: #fff;
  fill: #fff;
}

.navigation-button.swiper-button-disabled {
  display: none;
}

.navigation-next {
  right: 0;
}

.navigation-icon {
  font-size: 23px;
}
</style>
