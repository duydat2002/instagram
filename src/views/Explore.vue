<template>
  <h1>explore</h1>
</template>

<script>
import { useUser } from "@/composables/useUser";

export default {
  async created() {
    const { getUser } = useUser();
    const user = await getUser();
    console.log(user);
  },
};
</script>

<style></style>
