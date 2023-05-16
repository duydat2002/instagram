<template>
  <div class="home flex flex-row">
    <div class="stories">
      <story-list />
    </div>
    <sidebar-right />
  </div>
</template>

<script>
import StoryList from "@/components/Story/StoryList.vue";
import SidebarRight from "@/components/Sidebar/SidebarRight.vue";
export default {
  components: { StoryList, SidebarRight },
};
</script>

<style scoped>
.stories {
  padding: 16px 0;
  margin-top: 30px;
  margin-right: 64px;
  flex: 1 0;
  max-width: 630px;
}
</style>
