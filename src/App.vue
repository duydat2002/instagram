<template>
  <div>
    <loading v-if="isLoading" />

    <keep-alive v-else>
      <component :is="$route.meta.layout" />
    </keep-alive>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Loading from "./components/Loading.vue";

export default {
  data() {
    return {
      isLoading: true,
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    ...mapActions(["initUser"]),
    handleBeforeUnload(event) {
      this.isLoading = true;
      event.preventDefault();
    },
  },
  async mounted() {
    window.addEventListener("beforeunload", this.handleBeforeUnload);
    await this.initUser();
    this.isLoading = false;
  },
  beforeUnmount() {
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
  },
  components: { Loading },
};
</script>
