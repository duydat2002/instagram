<template>
  <div
    :class="[
      'input-wrapper flex',
      { 'active-label': inputValue != '' },
      { focus: isFocus },
    ]"
  >
    <div class="input-main">
      <input
        class="input"
        :id="id"
        :type="inputType"
        :name="name"
        v-model="inputValue"
        @focus="focusInput"
        @blur="blurInput"
      />
      <span class="placeholder">{{ placeholder }}</span>
    </div>
    <div v-if="checkValue != null && inputValue != ''" class="check">
      <fa
        v-if="checkValue"
        :icon="['far', 'circle-check']"
        style="color: #b4b4b4; height: 22px"
      />
      <fa
        v-else
        :icon="['far', 'circle-xmark']"
        style="color: #ee2d3e; height: 22px"
      />
    </div>
    <div
      v-if="type == 'password' && inputValue != ''"
      class="switch-password"
      @click="togglePasswordVisibility"
    >
      <span>{{ showPassword ? "Ẩn" : "Hiển thị" }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "text",
    },
    id: String,
    name: {
      type: String,
      required: true,
    },
    propValue: [String, Number],
    placeholder: String,
    checkValue: {
      type: [Boolean, null],
      default: null,
    },
  },
  data() {
    return {
      inputType: this.type,
      showPassword: false,
      isFocus: false,
    };
  },
  computed: {
    inputValue: {
      get() {
        return this.propValue;
      },
      set(value) {
        this.$emit("update:propValue", value);
      },
    },
  },
  methods: {
    togglePasswordVisibility() {
      this.inputType = this.showPassword ? "password" : "text";
      this.showPassword = !this.showPassword;
    },
    focusInput() {
      this.isFocus = true;
    },
    blurInput() {
      this.isFocus = false;
    },
  },
};
</script>

<style scoped>
.input-wrapper {
  align-items: center;
  position: relative;
  width: 100%;
  height: 36px;
  background: var(--secondary-bg-color);
  border: 1px solid var(--border-color);
  border-radius: 3px;
}

.input-wrapper.focus {
  border-color: var(--border-dark-color);
}

.input-main {
  flex: 1 0;
}

.input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  line-height: 18px;
  background: var(--secondary-bg-color);
  overflow: hidden;
  text-overflow: ellipsis;
  transition: ease-out 0.1s;
}

.active-label .input {
  font-size: 12px;
  padding: 14px 8px 2px;
}

.placeholder {
  position: absolute;
  left: 8px;
  top: 50%;
  font-size: 12px;
  color: var(--secondary-text-color);
  transform: translateY(-50%);
  transform-origin: top left;
  pointer-events: none;
  transition: ease-out 0.1s;
}

.active-label .placeholder {
  transform: translateY(-100%) scale(calc(10 / 12));
}

.switch-password {
  margin-right: 8px;
  font-size: 14px;
  line-height: 18px;
  font-weight: 600;
  color: #262626;
  user-select: none;
  cursor: pointer;
}

.switch-password:hover {
  opacity: 0.5;
}

.check {
  margin-right: 8px;
}

.input-wrapper.focus .check {
  display: none;
}
</style>
