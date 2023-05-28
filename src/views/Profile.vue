<template>
  <div class="profile-container">
    <div class="general">
      <general />
    </div>
    <div class="highlight">
      <story-list />
    </div>
    <div class="user-posts">
      <component :is="$route.meta.nestedLayout" />
    </div>
  </div>
</template>

<script>
import General from "@/components/Profile/General.vue";
import StoryList from "@/components/Story/StoryList.vue";

export default {
  components: { General, StoryList },
};
</script>

<style scoped></style>
