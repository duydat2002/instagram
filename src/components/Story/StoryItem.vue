<template>
  <router-link :to="'/stories/' + username">
    <div class="story-item flex flex-col">
      <div class="img-container">
        <div class="img-wrapper">
          <img :src="image" alt="" />
        </div>
      </div>
      <span class="story-username">{{ username }}</span>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    username: String,
    image: {
      type: String,
      default: "@/assets/images/defaultAvatar.jpg",
    },
  },
};
</script>

<style scoped>
.story-item {
  width: 66px;
  align-items: center;
}

.img-container {
  padding: 2px;
  background: radial-gradient(
    circle at 30% 107%,
    #fdf497 0%,
    #fdf497 5%,
    #fd5949 45%,
    #d6249f 60%,
    #285aeb 90%
  );
  border-radius: 50%;
  overflow: hidden;
}

.img-wrapper {
  border: 2px solid var(--primary-background);
  border-radius: 50%;
  overflow: hidden;
}

.story-username {
  max-width: 100%;
  margin-top: 2px;
  font-size: 12px;
  line-height: 16px;
  color: var(--primary-text-color);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
