<template>
  <div id="loading" :style="{ width: progress + '%' }">
    <div></div>
  </div>
</template>

<script>
export default {
  props: {
    progress: Number,
  },
};
</script>

<style scoped>
#loading {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  width: 0%;
  z-index: 1000;
  transition: 1s linear;
}

#loading div {
  height: 100%;
  background-image: linear-gradient(
    to right,
    rgb(var(--gradient-purple)),
    rgb(var(--gradient-yellow)),
    rgb(var(--gradient-orange)),
    rgb(var(--gradient-pink)),
    rgb(var(--gradient-lavender)),
    rgb(var(--gradient-purple)),
    rgb(var(--gradient-yellow))
  );
  background-size: 400% auto;
  animation: loading 3s linear infinite;
}

@keyframes loading {
  0% {
    background-position: 0% 100%;
  }
  100% {
    background-position: 100% 100%;
  }
}

@keyframes scaleWidth {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}
</style>
