<template>
  <div>
    <loading v-if="isLoading" :progress="progress" />

    <div v-if="isLoadingReload" id="splash-screen">
      <div class="logo">
        <img src="" alt="Instagram" />
      </div>
      <div class="credit">
        <img src="" alt="Credit" />
      </div>
    </div>

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
      isLoadingReload: true,
    };
  },
  computed: {
    ...mapGetters(["user", "isLoading", "progress"]),
  },
  methods: {
    ...mapActions(["initUser"]),
    handleBeforeUnload(event) {
      this.isLoadingReload = true;
      event.preventDefault();
    },
  },
  async mounted() {
    window.addEventListener("beforeunload", this.handleBeforeUnload);
    await this.initUser();
    this.isLoadingReload = false;
  },
  beforeUnmount() {
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
  },
  components: { Loading },
};
</script>
