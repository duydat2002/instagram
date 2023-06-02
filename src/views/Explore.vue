<template>
  <h1>explore</h1>
</template>

<script>
import { useUser } from "@/composables/useUser";

export default {
  async created() {
    const { getCurrentUser } = useUser();
    const user = await getCurrentUser();
    console.log(user);
  },
};
</script>

<style></style>
