<template>
  <div id="dashboard">
    <div>
      <sidebar-left></sidebar-left>
      <div id="main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarLeft from "@/components/Sidebar/SidebarLeft.vue";
export default {
  components: { SidebarLeft },
};
</script>

<style scoped>
#main {
  margin-left: auto;
  padding: 0 46px;
  background: var(--primary-bg-color);
  height: 1000px;
  width: calc(100% - var(--nav-medium-width));
}

@media (min-width: 768px) and (max-width: 1263px) {
  #main {
    transition: all 0.3s;
    width: calc(100% - var(--nav-narrow-width));
  }
}
</style>
