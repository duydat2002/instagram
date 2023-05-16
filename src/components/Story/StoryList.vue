<template>
  <div class="story-slide">
    <swiper
      :slides-per-view="8"
      :slides-per-group="4"
      :space-between="14"
      :allow-touch-move="true"
    >
      <swiper-slide v-for="n in 20" :key="n">
        <story-item :username="'username' + n" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";
import StoryItem from "./StoryItem.vue";

export default {
  components: {
    Swiper,
    SwiperSlide,
    StoryItem,
  },
};
</script>

<style scoped>
.story-slide {
  width: 100%;
}
</style>
