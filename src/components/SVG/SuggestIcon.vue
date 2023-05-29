<template>
  <template v-if="!active">
    <svg
      aria-label="Gợi ý"
      class="x1lliihq x1n2onr6"
      color="rgb(0, 0, 0)"
      fill="rgb(0, 0, 0)"
      height="16"
      role="img"
      viewBox="0 0 24 24"
      width="16"
    >
      <title>Gợi ý</title>
      <path
        d="M19.006 8.252a3.5 3.5 0 1 1-3.499-3.5 3.5 3.5 0 0 1 3.5 3.5Z"
        fill="none"
        stroke="currentColor"
        stroke-miterlimit="10"
        stroke-width="2"
      ></path>
      <path
        d="M22 19.5v-.447a4.05 4.05 0 0 0-4.05-4.049h-4.906a4.05 4.05 0 0 0-4.049 4.049v.447"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      ></path>
      <line
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-miterlimit="10"
        stroke-width="2"
        x1="5.001"
        x2="5.001"
        y1="7.998"
        y2="14.003"
      ></line>
      <line
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-miterlimit="10"
        stroke-width="2"
        x1="8.004"
        x2="2.003"
        y1="11"
        y2="11"
      ></line>
    </svg>
  </template>
  <template v-else>
    <svg
      aria-label="Gợi ý"
      class="x1lliihq x1n2onr6"
      color="rgb(0, 0, 0)"
      fill="rgb(0, 0, 0)"
      height="16"
      role="img"
      viewBox="0 0 48 48"
      width="16"
    >
      <title>Gợi ý</title>
      <path
        clip-rule="evenodd"
        d="M46 41.5H18c-.8 0-1.5-.7-1.5-1.5v-1.5c0-5.5 4.5-10 10-10h11c5.5 0 10 4.5 10 10V40c0 .8-.7 1.5-1.5 1.5zm-14-16c-5.2 0-9.5-4.3-9.5-9.5s4.3-9.5 9.5-9.5 9.5 4.3 9.5 9.5-4.3 9.5-9.5 9.5zm-16 1h-4.5V31c0 .8-.7 1.5-1.5 1.5H8c-.8 0-1.5-.7-1.5-1.5v-4.5H2c-.8 0-1.5-.7-1.5-1.5v-2c0-.8.7-1.5 1.5-1.5h4.5V17c0-.8.7-1.5 1.5-1.5h2c.8 0 1.5.7 1.5 1.5v4.5H16c.8 0 1.5.7 1.5 1.5v2c0 .8-.7 1.5-1.5 1.5z"
        fill-rule="evenodd"
      ></path>
    </svg>
  </template>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
