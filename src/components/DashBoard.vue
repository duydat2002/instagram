<template>
  <div id="dashboard">
    <div class="flex">
      <sidebar-left></sidebar-left>
      <div class="main">
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
#dashboard {
  /* background: var(--bg-color); */
}

.main {
  flex: 1;
  margin: 0 46px;
  background: #5af4ff;
}
</style>
