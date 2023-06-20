<template>
  <div :to="`/p/${post.id}`" class="item" @click="goToPost(post.id)">
    <div class="thumb">
      <img :src="post.contents[0]" :alt="post.caption" />
    </div>
    <div class="counts flex">
      <div class="like-count count flex">
        <div class="icon">
          <fa :icon="['fas', 'heart']" />
        </div>
        <span class="number">{{ likeCount }}</span>
      </div>
      <div class="comment-count count flex">
        <div class="icon">
          <fa :icon="['fas', 'comment']" flip="horizontal" />
        </div>
        <span class="number">{{ commentCount }}</span>
      </div>
    </div>
    <div class="type">
      <play-icon v-if="false" />
      <reel-icon v-if="false" />
      <layer-icon v-if="post.type == 'multiple'" />
    </div>
  </div>
</template>

<script>
import PlayIcon from "@/components/SVG/PlayIcon.vue";
import ReelIcon from "@/components/SVG/ReelIcon.vue";
import LayerIcon from "@/components/SVG/LayerIcon.vue";

import { formatNumberToSuffix } from "@/utils";

export default {
  props: {
    post: Object,
  },
  computed: {
    likeCount() {
      return formatNumberToSuffix(this.post.likeCount);
    },
    commentCount() {
      return formatNumberToSuffix(this.post.commentCount);
    },
  },
  methods: {
    goToPost(id) {
      this.$router.replace({ name: "Post", params: { id: id } });
    },
  },
  mounted() {
    console.log(this.post);
  },
  components: { PlayIcon, ReelIcon, LayerIcon },
};
</script>

<style scoped>
.item {
  position: relative;
  width: 100%;
  padding-top: 100%;
  cursor: pointer;
  overflow: hidden;
}

.item svg {
  font-size: 20px;
  color: #fff;
  fill: #fff;
}

.thumb img {
  position: absolute;
  top: 0;
  right: 0;
}

.counts {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: 0.1s;
}

.item:hover .counts {
  opacity: 1;
}

.count {
  align-items: center;
  justify-content: center;
}

.count .number {
  margin-left: 7px;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
}

.like-count {
  margin-right: 30px;
}

.type {
  position: absolute;
  top: 8px;
  right: 8px;
}
</style>
