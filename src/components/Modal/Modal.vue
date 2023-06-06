<template>
  <Teleport :to="isPopup ? '#popup' : '#modal'">
    <div
      v-if="isShow"
      class="modal-container flex"
      @click.self="handleChildClick"
    >
      <slot />
    </div>
  </Teleport>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    isPopup: {
      type: Boolean,
      default: false,
    },
    hasClose: {
      type: Boolean,
      default: false,
    },
    handleClickOutside: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters("modal", ["scrollPosition"]),
  },
  methods: {
    ...mapMutations("modal", ["setStopScroll"]),
    handleChildClick() {
      this.setStopScroll(false);
      this.handleClickOutside();
    },
  },
  mounted() {
    this.setStopScroll(true);
    setTimeout(() => {
      document.documentElement.scrollTop = this.scrollPosition;
    }, 0);
  },
  unmounted() {
    this.setStopScroll(false);
    setTimeout(() => {
      document.documentElement.scrollTop = this.scrollPosition;
    }, 0);
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
