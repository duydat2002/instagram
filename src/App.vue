<template>
  <div
    :class="{ 'active-overlay': activeOverlay }"
    :style="{
      background: 'var(--primary-bg-color)',
      top: `${-scrollPosition}px`,
    }"
  >
    <loading />

    <div v-if="isLoadingOnReload" id="splash-screen">
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
import { useUser } from "@/composables/useUser";

export default {
  data() {
    return {
      isLoadingOnReload: true,
    };
  },
  computed: {
    ...mapGetters("user", ["currentUser"]),
    ...mapGetters("modal", ["activeOverlay", "scrollPosition"]),
  },
  methods: {
    ...mapActions("user", ["initCurrentUser"]),
    handleBeforeUnload(event) {
      this.isLoadingOnReload = true;
      event.preventDefault();
    },
  },
  async beforeMount() {
    // window.addEventListener("beforeunload", this.handleBeforeUnload);
    await this.initCurrentUser();
    this.isLoadingOnReload = false;

    const { watchUserChange } = useUser();
    if (this.currentUser) {
      watchUserChange(this.currentUser.id);
    }
  },
  watch: {
    $route() {
      console.log(this.$route);
    },
  },
  beforeUnmount() {
    // window.removeEventListener("beforeunload", this.handleBeforeUnload);
  },
  components: { Loading },
};
</script>

<style scoped>
.active-overlay {
  position: fixed;
  left: 0;
  right: 0;
  overflow-y: scroll;
}
</style>
