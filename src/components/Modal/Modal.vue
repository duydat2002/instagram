<template>
  <div
    v-if="isShow"
    class="modal-container flex"
    @click.self="handleChildClick"
  >
    <slot />
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    handleClick: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    ...mapMutations("modal", ["setScrollPosition"]),
    handleChildClick() {
      this.handleClick();
    },
  },
  mounted() {
    this.setScrollPosition(document.scrollingElement.scrollTop);
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
