<template>
  <div class="user-container flex">
    <div class="user-avatar"></div>
    <div class="user-name flex">
      <span class="user-username"></span>
      <span class="user-fullname"></span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.user-container {
  padding: 8px 16px;
  align-items: center;
}

.user-avatar {
  height: 44px;
  width: 44px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
  background: var(--skeleton-bg-color);
}

.user-name {
  flex-direction: column;
  flex-grow: 1;
}

.user-username {
  height: 14px;
  width: 116px;
  background: var(--skeleton-bg-color);
  border-radius: 4px;
  margin-bottom: 8px;
}

.user-fullname {
  height: 14px;
  width: 84px;
  background: var(--skeleton-bg-color);
  border-radius: 4px;
}
</style>
