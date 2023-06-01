<template>
  <button
    :class="['flex', classes]"
    :style="{ color, backgroundColor }"
    :type="type"
    :disabled="isDisabled"
  >
    <div v-if="isLoading" class="loading">
      <fa :icon="['fas', 'spinner']" />
    </div>
    <div class="content flex" :style="{ opacity: isLoading ? 0 : 1 }">
      <slot name="icon" />
      <slot />
    </div>
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
  computed: {
    classes() {
      return [`button--size-${this.size}`, `button--variant-${this.variant}`];
    },
  },
};
</script>

<style scoped>
button {
  position: relative;
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

button[primary] {
  color: #fff;
  background: var(--primary-button-color);
}

button[primary]:hover {
  background: var(--primary-button-hover-color);
}

button[primary] .loading svg {
  color: #fff;
  fill: #fff;
}

button[secondary] {
  color: #000;
  background: var(--secondary-button-color);
}

button[secondary]:hover {
  background: var(--secondary-button-hover-color);
}

.button--variant-text {
  color: #385185;
  background: transparent;
}
.button--variant-text:active {
  opacity: 0.6;
}

.button--variant-contained {
}
.button--variant-contained:hover {
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

.content {
  width: 100%;
  align-items: center;
  justify-content: center;
}
</style>
