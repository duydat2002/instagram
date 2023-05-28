<template>
  <Teleport to="#modal">
    <div v-if="isShow" class="modal-container flex">
      <div class="content">
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1001;
}
</style>
