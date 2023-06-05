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
          link="/"
          title="Trang chủ"
          tooltip="Trang chủ"
          tab="Home"
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
          title="Tìm kiếm"
          tooltip="Tìm kiếm"
          tab="Search"
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
          link="/explore"
          title="Khám phá"
          tooltip="Khám phá"
          tab="Explore"
          :currentTab="currentTab"
          @changeTab="handleChangeTab($event)"
        >
          <template #icon="slotProps">
            <compass-icon :active="slotProps.active" />
          </template>
        </sidebar-left-tab>
        <sidebar-left-tab
          link="/reels"
          title="Reels"
          tooltip="Reels"
          tab="Reels"
          :currentTab="currentTab"
          @changeTab="handleChangeTab"
        >
          <template #icon="slotProps">
            <reel-icon :active="slotProps.active" />
          </template>
        </sidebar-left-tab>
        <sidebar-left-tab
          link="/message"
          title="Tin nhắn"
          tooltip="Tin nhắn"
          tab="Inbox"
          :currentTab="currentTab"
          @changeTab="handleChangeTab"
        >
          <template #icon="slotProps">
            <message-icon :active="slotProps.active" />
          </template>
        </sidebar-left-tab>
        <sidebar-left-tab
          :isDiv="true"
          title="Thông báo"
          tooltip="Thông báo"
          tab="Notification"
          :currentTab="currentTab"
          @changeTab="handleChangeTab"
        >
          <template #icon="slotProps">
            <heart-icon :active="slotProps.active" />
          </template>
        </sidebar-left-tab>
        <sidebar-left-tab
          :isDiv="true"
          title="Tạo"
          tooltip="Tạo"
          tab="Create"
          :currentTab="currentTab"
          @changeTab="handleChangeTab"
          @click="isShowModalCreatePost = true"
        >
          <template #icon="slotProps">
            <plus-icon :active="slotProps.active" />
          </template>
          <template #child>
            <modal
              hasClose
              :isShow="isShowModalCreatePost"
              :handleClickOutside="
                () => {
                  isShowModalCreatePost = false;
                }
              "
            >
              <modal-create-post></modal-create-post>
            </modal>
          </template>
        </sidebar-left-tab>
        <sidebar-left-tab
          :link="`/${currentUser?.username}`"
          title="Trang cá nhân"
          tooltip="Trang cá nhân"
          tab="Profile"
          :currentTab="currentTab"
          @changeTab="handleChangeTab"
        >
          <template #icon="slotProps">
            <div :class="['user-avatar', { active: slotProps.active }]">
              <img :src="currentUser?.avatar" alt="" />
            </div>
          </template>
        </sidebar-left-tab>
        <sidebar-left-tab
          v-click-outside="handleMoreClickOutside"
          style="position: relative"
          :isDiv="true"
          title="Xem thêm"
          tooltip="Xem thêm"
          tab="More"
          :currentTab="currentTab"
          @changeTab="handleChangeTab"
          @click="handleMoreClick"
        >
          <template #icon="slotProps">
            <bar-icon :active="slotProps.active" />
          </template>
          <template #child>
            <!-- Modals sidebar -->
            <div
              ref="moreModal"
              :class="['more-modal', { active: moreActive }]"
            >
              <more
                :themeTabActive="themeTabActive"
                @changeTabActive="changeTabActive"
              ></more>
            </div>
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
import More from "../More.vue";
import Modal from "@/components/Modal/Modal.vue";
import ModalCreatePost from "@/components/Modal/ModalCreatePost.vue";

import { mapGetters } from "vuex";

export default {
  data() {
    return {
      previousTab: "",
      currentTab: "Home",
      isNarrow: false,
      searchActive: false,
      moreActive: false,
      themeTabActive: false,
      isShowModalCreatePost: false,
    };
  },
  computed: {
    ...mapGetters("user", ["currentUser"]),
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
          this.$refs.searchModal.contains(event.target)
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
    handleMoreClick(event) {
      if (
        event.target != this.$refs.moreModal &&
        !this.$refs.moreModal.contains(event.target)
      ) {
        this.moreActive = !this.moreActive;
      }
    },
    handleMoreClickOutside() {
      if (this.moreActive == true) {
        this.moreActive = false;
        this.themeTabActive = false;
        // this.currentTab = this.previousTab;
      }
    },
    changeTabActive(value) {
      this.themeTabActive = value;
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
    More,
    Modal,
    ModalCreatePost,
  },
};
</script>

<style scoped>
.sidebar-left {
  position: fixed;
  top: 0;
  left: 0;
  width: var(--nav-medium-width);
  height: 100vh;
  background: var(--primary-bg-color);
  border-right: 1px solid var(--border-color);
  transition: all 0.3s;
  z-index: 100;
}

.sidebar-nav {
  position: relative;
  padding: 8px 12px 20px;
  background: var(--primary-bg-color);
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
  background: var(--primary-bg-color);
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

.more-modal {
  display: none;
}

.more-modal.active {
  display: block;
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
