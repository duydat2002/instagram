<template>
  <svg
    aria-label="Cài đặt"
    class="_ab6-"
    color="rgb(245, 245, 245)"
    fill="rgb(245, 245, 245)"
    height="24"
    role="img"
    viewBox="0 0 24 24"
    width="24"
  >
    <line
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-width="activeSVG"
      x1="3"
      x2="21"
      y1="4"
      y2="4"
    ></line>
    <line
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-width="activeSVG"
      x1="3"
      x2="21"
      y1="12"
      y2="12"
    ></line>
    <line
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-width="activeSVG"
      x1="3"
      x2="21"
      y1="20"
      y2="20"
    ></line>
  </svg>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    activeSVG() {
      return this.active ? "3" : "2";
    },
  },
};
</script>
