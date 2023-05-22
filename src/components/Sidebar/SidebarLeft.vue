<template>
  <div :class="['sidebar-left', { narrow: isNarrow }]">
    <div class="sidebar-nav">
      <router-link to="/" class="logo">
        <div class="logo-text">
          <logo />
        </div>
        <div class="logo-icon">
          <instagram-icon />
        </div>
      </router-link>
      <div class="sidebar-left__tabs flex flex-col">
        <sidebar-left-tab
          :link="'/'"
          :title="'Trang chủ'"
          :tooltip="'Trang chủ'"
          :tab="'Home'"
          :currentTab="currentTab"
          @changeTab="handleChangeTab"
        >
          <template #icon="slotProps">
            <home-icon :active="slotProps.active" />
          </template>
        </sidebar-left-tab>
        <sidebar-left-tab
          v-click-outside="handleSearchClickOutside"
          :isDiv="true"
          :title="'Tìm kiếm'"
          :tooltip="'Tìm kiếm'"
          :tab="'Search'"
          :currentTab="currentTab"
          @changeTab="handleChangeTab"
          @click="handleSearchClick"
        >
          <template #icon="slotProps">
            <search-icon :active="slotProps.active" />
          </template>
          <template #child>
            <!-- Modals sidebar -->
            <div
              ref="searchModal"
              :class="['search-modal', { active: searchActive }]"
            >
              <search></search>
            </div>
          </template>
        </sidebar-left-tab>
        <sidebar-left-tab
          :link="'/explore'"
          :title="'Khám phá'"
          :tooltip="'Khám phá'"
          :tab="'Explore'"
          :currentTab="currentTab"
          @changeTab="handleChangeTab($event)"
        >
          <template #icon="slotProps">
            <compass-icon :active="slotProps.active" />
          </template>
        </sidebar-left-tab>
        <sidebar-left-tab
          :link="'/reels'"
          :title="'Reels'"
          :tooltip="'Reels'"
          :tab="'Reels'"
          :currentTab="currentTab"
          @changeTab="handleChangeTab"
        >
          <template #icon="slotProps">
            <reel-icon :active="slotProps.active" />
          </template>
        </sidebar-left-tab>
        <sidebar-left-tab
          :link="'/message'"
          :title="'Tin nhắn'"
          :tooltip="'Tin nhắn'"
          :tab="'Inbox'"
          :currentTab="currentTab"
          @changeTab="handleChangeTab"
        >
          <template #icon="slotProps">
            <message-icon :active="slotProps.active" />
          </template>
        </sidebar-left-tab>
        <sidebar-left-tab
          :isDiv="true"
          :title="'Thông báo'"
          :tooltip="'Thông báo'"
          :tab="'Notification'"
          :currentTab="currentTab"
          @changeTab="handleChangeTab"
        >
          <template #icon="slotProps">
            <heart-icon :active="slotProps.active" />
          </template>
        </sidebar-left-tab>
        <sidebar-left-tab
          :isDiv="true"
          :title="'Tạo'"
          :tooltip="'Tạo'"
          :tab="'Create'"
          :currentTab="currentTab"
          @changeTab="handleChangeTab"
        >
          <template #icon="slotProps">
            <plus-icon :active="slotProps.active" />
          </template>
        </sidebar-left-tab>
        <sidebar-left-tab
          :link="'/cac'"
          :title="'Trang cá nhân'"
          :tooltip="'Trang cá nhân'"
          :tab="'Profile'"
          :currentTab="currentTab"
          @changeTab="handleChangeTab"
        >
          <template #icon="slotProps">
            <div :class="['user-avatar', { active: slotProps.active }]">
              <img src="@\assets\images\defaultAvatar.jpg" alt="" />
            </div>
          </template>
        </sidebar-left-tab>
        <sidebar-left-tab
          :isDiv="true"
          :title="'Xem thêm'"
          :tooltip="'Xem thêm'"
          :tab="'More'"
          :currentTab="currentTab"
          @changeTab="handleChangeTab"
        >
          <template #icon="slotProps">
            <bar-icon :active="slotProps.active" />
          </template>
        </sidebar-left-tab>
      </div>
    </div>
  </div>
</template>

<script>
import HomeIcon from "../SVG/HomeIcon.vue";
import SearchIcon from "../SVG/SearchIcon.vue";
import CompassIcon from "../SVG/CompassIcon.vue";
import ReelIcon from "../SVG/ReelIcon.vue";
import MessageIcon from "../SVG/MessageIcon.vue";
import HeartIcon from "../SVG/HeartIcon.vue";
import PlusIcon from "../SVG/PlusIcon.vue";
import BarIcon from "../SVG/BarIcon.vue";
import InstagramIcon from "../SVG/InstagramIcon.vue";
import logo from "../SVG/Logo.vue";
import SidebarLeftTab from "./SidebarLeftTab.vue";
import Search from "../Search.vue";
export default {
  data() {
    return {
      previousTab: "",
      currentTab: "Home",
      isNarrow: false,
      searchActive: false,
    };
  },
  methods: {
    handleChangeTab(tab) {
      // this.previousTab = this.currentTab;
      this.currentTab = tab;
      // console.log(this.previousTab, this.currentTab);
    },
    handleSearchClick(event) {
      if (
        !(
          event.target == this.$refs.searchModal ||
          event.target.contains(this.$refs.searchModal)
        )
      ) {
        this.isNarrow = !this.isNarrow;
        this.searchActive = !this.searchActive;
      }
    },
    handleSearchClickOutside() {
      if (this.searchActive == true) {
        this.isNarrow = false;
        this.searchActive = false;
        // this.currentTab = this.previousTab;
      }
    },
  },
  watch: {
    $route() {
      this.currentTab = this.$route.name;
    },
  },
  components: {
    logo,
    InstagramIcon,
    SidebarLeftTab,
    HomeIcon,
    SearchIcon,
    CompassIcon,
    ReelIcon,
    MessageIcon,
    HeartIcon,
    PlusIcon,
    BarIcon,
    Search,
  },
};
</script>

<style scoped>
.sidebar-left {
  position: relative;
  width: var(--nav-medium-width);
  height: 100vh;
  background: var(--bg-color);
  border-right: 1px solid var(--separator-color);
  transition: all 0.3s;
  z-index: 100;
}

.sidebar-nav {
  position: relative;
  padding: 8px 12px 20px;
  background: var(--bg-color);
  z-index: 100;
}

.sidebar-left.narrow .sidebar-nav {
  width: var(--nav-narrow-width);
}

.sidebar-left.narrow >>> .tab__title {
  display: none;
}

.sidebar-left >>> .tab__tooltip {
  opacity: 0;
  transform: scale(0.3);
  visibility: hidden;
  transition: all 0.1s 0s;
  pointer-events: none;
  z-index: 100;
}

.sidebar-left.narrow >>> .tab__wrapper:hover .tab__tooltip {
  opacity: 1;
  transform: scale(1);
  visibility: visible;
  transition: all 0.3s cubic-bezier(0.09, 0.8, 0.52, 1.34) 0.5s;
}

.logo {
  display: flex;
  align-items: center;
  height: 92px;
}

.logo-text {
  padding: 12px;
  display: flex;
  align-items: center;
  width: 103px;
  box-sizing: content-box;
}

.sidebar-left.narrow .logo-text {
  display: none;
}

.logo-icon {
  display: none;
  padding: 12px;
  margin: 4px 0;
  border-radius: 8px;
}

.logo-icon:hover {
  background: rgba(255, 255, 255, 0.1);
}

.sidebar-left.narrow .logo-icon {
  display: flex;
  align-items: center;
}

.user-avatar {
  border-radius: 100%;
  overflow: hidden;
  height: 100%;
  width: 100%;
}

.user-avatar.active {
  outline: 2px solid #fff;
}

.user-avatar > img {
  vertical-align: unset;
}

/* Seatch Modal */
.search-modal {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 400px;
  background: var(--bg-color);
  opacity: 0;
  visibility: hidden;
  transform: translateX(-100px);
  transition: all 0.3s cubic-bezier(0.15, 0.81, 0.24, 0.91);
  z-index: 10;
}

.search-modal.active {
  opacity: 1;
  visibility: visible;
  transform: translateX(var(--nav-narrow-width));
}

@media screen and (max-width: 1264px) {
  .sidebar-left {
    width: var(--nav-narrow-width);
  }

  .sidebar-left >>> .tab__title {
    display: none;
  }

  .logo-text {
    display: none;
  }

  .logo-icon {
    display: flex;
    align-items: center;
  }
}
</style>
