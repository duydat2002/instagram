<template>
  <div class="posts-container flex">
    <div class="col-4 pd" v-for="post in posts" :key="post">
      <post-review-item :post="post" />
    </div>
  </div>
</template>

<script>
import PostReviewItem from "@/components/Post/PostReviewItem.vue";

import { mapGetters } from "vuex";
import { usePost } from "@/composables/usePost";

export default {
  data() {
    return {
      posts: [],
    };
  },
  computed: {
    ...mapGetters("user", ["user"]),
  },
  async beforeMount() {
    const { getPosts } = usePost();
    this.posts = await getPosts(this.user.id);
    console.log(this.posts);
  },
  components: { PostReviewItem },
};
</script>

<style scoped>
.posts-container {
  margin: -4px;
}

.pd {
  padding: 4px;
}
</style>
