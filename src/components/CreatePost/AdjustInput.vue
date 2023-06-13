<template>
  <div class="adjust-item">
    <div class="item-label flex">
      <span class="item-name">{{ title }}</span>
      <span v-if="inputValue != 0" class="item-reset" @click="handleReset"
        >Đặt lại</span
      >
    </div>
    <div class="item-input flex">
      <input
        class="input"
        :style="Inputstyle"
        type="range"
        :min="min"
        :max="max"
        step="1"
        v-model="inputValue"
      />
      <span class="value">{{ inputValue }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
    },
    min: {
      type: Number,
      default: -100,
    },
    max: {
      type: Number,
      default: 100,
    },
    default: {
      type: Number,
    },
  },
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("update:value", value);
      },
    },
    Inputstyle() {
      if (this.min < 0) {
        if (this.inputValue > 0) {
          return {
            backgroundImage: `linear-gradient(to right, var(--track-color) 0%, var(--track-color) 50%, var(--active-track-color) 50%, var(--active-track-color) ${
              50 + this.inputValue / 2
            }%, var(--track-color) ${
              50 + this.inputValue / 2
            }%, var(--track-color) 100%)`,
          };
        } else {
          return {
            backgroundImage: `linear-gradient(to right, var(--track-color) 0%, var(--track-color) ${
              50 + this.inputValue / 2
            }%, var(--active-track-color) ${
              50 + this.inputValue / 2
            }%, var(--active-track-color) 50%, var(--track-color) 50%, var(--track-color) 100%)`,
          };
        }
      } else {
        return {
          backgroundImage: `linear-gradient(to right, var(--active-track-color) 0%, var(--active-track-color) ${this.inputValue}%, var(--track-color) ${this.inputValue}%, var(--track-color) 100%)`,
        };
      }
    },
  },
  methods: {
    handleReset() {
      this.$emit("update:value", 0);
    },
  },
};
</script>

<style scoped>
.item-label {
  padding: 14px 0;
  justify-content: space-between;
  text-transform: capitalize;
}

.item-name {
  font-size: 16px;
  cursor: pointer;
}

.item-reset {
  color: var(--primary-button-color);
  font-weight: 600;
  cursor: pointer;
  display: none;
}
.adjust-item:hover .item-reset {
  display: block;
}

.item-reset:hover {
  color: var(--link-color);
}

.item-input {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.item-input .input {
  flex-grow: 1;
  appearance: none;
  height: 2px;
  background: rgb(var(--separator-modal-color));
}

.item-input .input::-webkit-slider-thumb {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  height: 20px;
  width: 20px;
  background: var(--thumb-color) !important;
  border-radius: 50%;
  cursor: pointer;
}
.item-input .input::-moz-range-thumb {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  height: 20px;
  width: 20px;
  background: var(--thumb-color) !important;
  border-radius: 50%;
  cursor: pointer;
}
.item-input .input::-ms-thumb {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  height: 20px;
  width: 20px;
  background: var(--thumb-color) !important;
  border-radius: 50%;
  cursor: pointer;
}

.item-input .value {
  font-size: 12px;
  margin-left: 8px;
  width: 24px;
}
</style>
