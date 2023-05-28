<template>
  <input type="checkbox" id="switch" v-model="checked" />
  <label class="circle" for="switch"></label>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  props: {
    activeDarkMode: String,
  },
  computed: {
    checked: {
      get() {
        return this.activeDarkMode == "dark";
      },
      set(value) {
        let theme = value ? "dark" : "light";
        this.setTheme(theme);
        this.$emit("update:activeDarkMode", theme);
      },
    },
  },
  methods: {
    ...mapMutations("theme", ["setTheme"]),
  },
};
</script>

<style scoped>
#switch {
  visibility: hidden;
}

.circle {
  position: relative;
  display: inline-block;
  width: 26px;
  height: 16px;
  background: var(--border-color);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.15s cubic-bezier(0.17, 0.17, 0, 1);
}

.circle::after {
  content: "";
  position: absolute;
  top: 1px;
  left: 1px;
  width: 14px;
  height: 14px;
  border-radius: 14px;
  background: #fff;
  transition: all 0.15s cubic-bezier(0.17, 0.17, 0, 1);
}

#switch:checked + .circle {
  background: var(--primary-button-color);
}

#switch:checked + .circle::after {
  left: calc(100% - 1px);
  transform: translateX(-100%);
}
</style>
