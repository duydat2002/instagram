<template>
  <Teleport :to="isPopup ? '#popup' : '#modal'">
    <div v-if="isShow" class="modal-container">
      <div class="content flex" v-click-outside="handleClickOutsideModal">
        <slot />
      </div>
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
    handleClickOutsideModal() {
      if (
        (document.querySelector("#modal > div") &&
          !document.querySelector("#popup > div")) ||
        (!document.querySelector("#modal > div") &&
          document.querySelector("#popup > div"))
      ) {
        this.handleClickOutside();
      }
    },
  },
  mounted() {
    if (this.isShow) this.setStopScroll(true);
    setTimeout(() => {
      document.documentElement.scrollTop = this.scrollPosition;
    }, 0);
  },
  unmounted() {
    if (!this.isPopup) {
      this.setStopScroll(false);
    }
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
  background: #0000004d;
  z-index: 1001;

  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  /* width: 100%;
  height: 100%; */
  margin: 20px;
  align-items: center;
  justify-content: center;
}
</style>
