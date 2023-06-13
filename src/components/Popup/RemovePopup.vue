<template>
  <modal isPopup :isShow="true">
    <div class="remove-popup-container">
      <div class="content">
        <span class="title">{{ title }}</span>
        <span class="desc">{{ desc }}</span>
      </div>
      <div class="button remove-button" @click="handleRemove">
        <span>Bỏ</span>
      </div>
      <div class="button cancel-button" @click="handleCancel">
        <span>Hủy</span>
      </div>
    </div>
  </modal>
</template>

<script>
import Modal from "@/components/Modal/Modal.vue";

export default {
  props: {
    title: String,
    desc: String,
  },
  methods: {
    handleRemove() {
      this.$emit("remove");
    },
    handleCancel() {
      this.$emit("cancel");
    },
  },
  components: { Modal },
};
</script>

<style scoped>
.remove-popup-container {
  width: 100%;
  max-width: 400px;
  background: var(--modal-color);
  border-radius: 12px;
  text-align: center;
  overflow: hidden;
}

.content {
  padding: 32px;
}

.title {
  display: block;
  font-size: 20px;
}

.desc {
  display: block;
  color: var(--secondary-text-color);
}

.button {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid var(--separator-modal-color);
  cursor: pointer;
  user-select: none;
}

.button:active {
  background: #e5e5e5;
}

.remove-button {
  font-weight: 700;
  color: var(--error-color);
}
</style>
