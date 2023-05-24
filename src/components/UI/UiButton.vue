<template>
  <button
    :class="['flex', classes]"
    :style="{ color, backgroundColor }"
    :type="type"
    :disabled="isDisabled"
    @click="handleClick"
  >
    <div v-if="isLoading" class="loading">
      <fa :icon="['fas', 'spinner']" />
    </div>
    <template v-else>
      <slot name="icon" />
      <slot />
    </template>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "button",
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: "contained",
      validator(value) {
        return ["text", "contained", "outlined"].includes(value);
      },
    },
    color: {
      type: String,
    },
    backgroundColor: {
      type: String,
    },
    size: {
      type: String,
      default: "medium",
      validator: (value) => {
        return ["small", "medium", "large"].includes(value);
      },
    },
  },
  methods: {
    handleClick() {
      this.$emit("click");
    },
  },
  computed: {
    classes() {
      return [`button--size-${this.size}`, `button--variant-${this.variant}`];
    },
  },
};
</script>

<style scoped>
button {
  align-items: center;
  justify-content: center;
  width: 100%;
  font-weight: 600;
  border: none;
  outline: none;
  pointer-events: all;
  user-select: none;
}

button:disabled {
  opacity: 0.6;
  pointer-events: none;
}

.button--variant-text {
  color: #385185;
  background: transparent;
}
.button--variant-text:active {
  opacity: 0.6;
}

.button--variant-contained {
  color: #fff;
  background: var(--primary-button-color);
}
.button--variant-contained:hover {
  background: var(--primary-button-hover-color) !important;
}

.button--variant-outlined {
}

.button--size-small {
  font-size: 13px;
  line-height: 17px;
  padding: 4px 10px;
  border-radius: 6px;
}
.button--size-medium {
  font-size: 14px;
  line-height: 18px;
  padding: 7px 16px;
  border-radius: 8px;
}
.button--size-large {
  font-size: 15px;
  line-height: 19px;
  padding: 8px 22px;
  border-radius: 10px;
}

.loading {
  animation: spinner 1s infinite linear;
}

@keyframes spinner {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
