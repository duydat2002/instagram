<template>
  <Suspense>
    <keep-alive>
      <component :is="$route.meta.layout" />
    </keep-alive>

    <template #fallback>
      <h1
        style="
          font-size: 30px;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1000;
        "
      >
        Loading...
      </h1>
    </template>
  </Suspense>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    ...mapActions(["initUser"]),
  },
  async mounted() {
    await this.initUser();
  },
};
</script>
