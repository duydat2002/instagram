<template>
  <div>
    <component
      :is="currentComponent"
      :to="link"
      :class="['tab__wrapper', { actived: activeTab }]"
      @click="$emit('changeTab', tab)"
      ref="tabRef"
    >
      <div class="tab flex">
        <div class="tab__icon">
          <slot name="icon" :active="activeTab" />
        </div>
        <div class="tab__title">
          <span>{{ title }}</span>
        </div>
      </div>
      <div class="tab__tooltip">
        <div class="tab__tooltip-content">{{ tooltip }}</div>
      </div>
    </component>
    <slot name="child" />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    isDiv: Boolean,
    link: String,
    title: String,
    tooltip: String,
    tab: String,
    currentTab: String,
  },
  computed: {
    currentComponent() {
      if (this.isDiv) return "div";
      else return "router-link";
    },
    activeTab() {
      return this.currentTab === this.tab;
    },
  },
};
</script>

<style scoped>
.tab__wrapper {
  position: relative;
  cursor: pointer;
}

.tab {
  padding: 12px;
  margin: 4px 0;
  border-radius: 8px;
  flex-wrap: nowrap;
  transition: all 0.3s;
}

.tab:hover {
  background: rgba(255, 255, 255, 0.1);
}

.tab__icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  transition: all 0.3s;
}

.tab:hover .tab__icon {
  scale: 1.05;
}

.tab__title {
  padding-left: 16px;
  min-width: max-content;
  color: var(--primary-text-color);
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
}

.tab__wrapper.actived .tab__title {
  font-weight: 700;
}

.tab__tooltip {
  margin-left: 18px;
  display: flex;
  align-items: center;
  position: absolute;
  left: 100%;
  top: 0;
  bottom: 0;
  width: max-content;
}

.tab__tooltip-content {
  padding: 8px 12px;
  color: #f5f5f5;
  background: #262626;
  border-radius: 8px;
}

.tab__tooltip-content::after {
  content: "";
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  right: 100%;
  transform: translate(15px, -50%) rotateZ(45deg);
  background: #262626;
  border-radius: 2px;
  z-index: -1;
}
</style>
