<template>
  <h1 @click.self="cac">Inbox</h1>
</template>

<script>
export default {
  methods: {
    cac() {
      console.log("cac");
    },
  },
};
</script>

<style scoped>
h1 {
  user-select: none;
  cursor: pointer;
}
</style>
