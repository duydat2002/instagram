<template>
  <div class="not-found">
    <h3 class="title">Rất tiếc, trang này hiện không khả dụng.</h3>
    <p class="desc">
      Liên kết bạn theo dõi có thể bị hỏng hoặc trang này có thể đã bị gỡ.
      <router-link class="link" to="/">Quay lại Instagram.</router-link>
    </p>
  </div>
</template>

<script>
export default {
  beforeMount() {
    document.title = "Không tìm thấy trang - Instagram";
  },
};
</script>

<style scoped>
.not-found {
  padding: 40px;
  color: var(--primary-text-color);
  text-align: center;
}

.title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 25px;
}

.desc {
  font-size: 16px;
}

.link {
  color: var(--link-color);
}
</style>
