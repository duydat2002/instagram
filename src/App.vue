<template>
  <component :is="$route.meta.layout" />
</template>

<script>
import DashBoard from "./components/DashBoard.vue";
export default {
  components: { DashBoard },
};
</script>

<style></style>
