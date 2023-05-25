<template>
  <component :is="$route.meta.layout" />
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
  async created() {
    await this.initUser();
  },
};
</script>
