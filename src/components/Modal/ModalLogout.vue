<template>
  <div class="logout-modal flex flex-col">
    <div class="content">
      <span class="title">Đang đăng xuất</span>
      <span class="desc">Bạn cần đăng nhập lại</span>
    </div>
    <div class="separator separator-small"></div>
    <div class="button">
      <ui-button
        variant="text"
        color="var(--primary-text-color)"
        style="padding: 15px; font-weight: 400"
        @click="handleClickSignin"
        >Đăng nhập</ui-button
      >
    </div>
  </div>
</template>

<script>
import UiButton from "@/components/UI/UiButton.vue";

import { mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations("modal", ["setLogoutModalShow"]),
    handleClickSignin() {
      this.setLogoutModalShow(false);
      this.$router.push({ name: "Login" });
    },
  },
  components: { UiButton },
};
</script>

<style scoped>
.logout-modal {
  width: 400px;
  background: var(--modal-color);
  color: var(--primary-text-color);
  border-radius: 12px;
}

.content {
  padding: 32px;
  font-weight: 400;
  text-align: center;
}

.title {
  display: block;
  font-size: 20px;
}

.desc {
  display: block;
  font-size: 14px;
  color: #a8a8a8;
  margin-top: 5px;
}
</style>
