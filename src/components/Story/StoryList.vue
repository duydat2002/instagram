<template>
  <div class="stories-slide">
    <swiper v-bind="swiperOptions">
      <swiper-slide v-for="n in 20" :key="n">
        <story-item :username="'username' + n" />
      </swiper-slide>
    </swiper>
    <div class="stories-navigation">
      <div class="navigation-prev">
        <fa :icon="['fas', 'angle-right']" />
      </div>
      <div class="navigation-next">
        <fa :icon="['fas', 'angle-left']" />
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
</style>
