<template>
  <div class="main" :class="{ 'active-overlay': stopScroll }">
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
import { mapGetters, mapMutations, mapActions } from "vuex";
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
    ...mapGetters("modal", ["stopScroll"]),
  },
  methods: {
    ...mapActions("user", ["initCurrentUser"]),
    ...mapMutations("modal", ["setScrollPosition"]),
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
    stopScroll(active) {
      this.setScrollPosition(document.documentElement.scrollTop);
      if (active) {
        document.documentElement.style.overflow = "hidden";
      } else {
        document.documentElement.style.overflow = "visible";
      }
    },
    $route() {
      // console.log(this.$route);
    },
  },
  beforeUnmount() {
    // window.removeEventListener("beforeunload", this.handleBeforeUnload);
  },
  components: { Loading },
};
</script>

<style scoped>
.main {
  background: var(--primary-bg-color);
}

.active-overlay {
  overflow-y: scroll;
}
</style>
