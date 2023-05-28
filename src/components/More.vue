<template>
  <div :class="['more-container', { active: tabActive }]">
    <div class="main-tabs">
      <div class="action-tabs flex flex-col">
        <router-link to="/">
          <div class="tab flex">
            <div class="tab-icon">
              <setting-icon />
            </div>
            <div class="tab-title">
              <span>Cài đặt</span>
            </div>
          </div>
        </router-link>
        <router-link to="/">
          <div class="tab flex">
            <div class="tab-icon">
              <clock-icon />
            </div>
            <div class="tab-title">
              <span>Hoạt động của bạn</span>
            </div>
          </div>
        </router-link>
        <router-link to="/">
          <div class="tab flex">
            <div class="tab-icon">
              <bookmark-icon />
            </div>
            <div class="tab-title">
              <span>Đã lưu</span>
            </div>
          </div>
        </router-link>
        <div class="tab flex" @click="openThemeTab">
          <div class="tab-icon">
            <moon-icon v-if="theme != 'light'" />
            <sun-icon v-else />
          </div>
          <div class="tab-title">
            <span>Chuyển chế độ</span>
          </div>
        </div>
        <router-link to="/">
          <div class="tab flex">
            <div class="tab-icon">
              <report-icon />
            </div>
            <div class="tab-title">
              <span>Báo cáo sự cố</span>
            </div>
          </div>
        </router-link>
      </div>
      <div class="separator separator-big"></div>
      <div class="switch-account-tab">
        <router-link to="/">
          <div class="tab flex">
            <div class="tab-title">
              <span>Chuyển tài khoản</span>
            </div>
          </div>
        </router-link>
      </div>
      <div class="separator separator-small"></div>
      <div class="logout-tab" @click="handleLogout">
        <div class="tab flex">
          <div class="tab-title">
            <span>Đăng xuất</span>
          </div>
        </div>
        <modal :isShow="logoutModalShow">
          <modal-logout />
        </modal>
      </div>
    </div>
    <div class="switch-theme-tabs">
      <div class="tab theme-tab flex">
        <div class="tab-icon back" @click="closeThemeTab">
          <fa :icon="['fas', 'chevron-left']" />
        </div>
        <div class="tab-title">
          <span>Chuyển chế độ</span>
        </div>
        <div class="tab-icon mode">
          <moon-icon v-if="theme != 'light'" />
          <sun-icon v-else />
        </div>
      </div>
      <div class="separator separator-small"></div>
      <div class="tab switch-tab flex">
        <div class="tab-title">
          <span>Chế độ tối</span>
        </div>
        <div class="tab-icon right">
          <ui-switch-button :activeDarkMode="theme"></ui-switch-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SettingIcon from "@/components/SVG/SettingIcon.vue";
import ClockIcon from "@/components/SVG/ClockIcon.vue";
import BookmarkIcon from "@/components/SVG/BookmarkIcon.vue";
import MoonIcon from "@/components/SVG/MoonIcon.vue";
import SunIcon from "@/components/SVG/SunIcon.vue";
import ReportIcon from "@/components/SVG/BookmarkIcon.vue";
import Modal from "@/components/Modal/Modal.vue";
import ModalLogout from "@/components/Modal/ModalLogout.vue";
import UiSwitchButton from "./UI/UiSwitchButton.vue";

import { auth } from "@/firebase/init";
import { signOut } from "firebase/auth";
import { mapGetters, mapMutations } from "vuex";

export default {
  props: {
    themeTabActive: Boolean,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("modal", ["logoutModalShow"]),
    ...mapGetters("theme", ["theme"]),
    tabActive: {
      get() {
        return this.themeTabActive;
      },
      set(value) {
        this.$emit("changeTabActive", value);
      },
    },
  },
  methods: {
    ...mapMutations("modal", ["setLogoutModalShow"]),
    async handleLogout() {
      this.setLogoutModalShow(true);
      await signOut(auth);
      setTimeout(() => {
        this.setLogoutModalShow(false);
        this.$router.push("/accounts/login");
      }, 3000);
    },
    openThemeTab() {
      this.tabActive = true;
    },
    closeThemeTab() {
      this.tabActive = false;
    },
  },
  components: {
    SettingIcon,
    ClockIcon,
    BookmarkIcon,
    MoonIcon,
    SunIcon,
    ReportIcon,
    Modal,
    ModalLogout,
    UiSwitchButton,
  },
};
</script>

<style scoped>
a {
  width: 100%;
}

.more-container {
  position: absolute;
  bottom: 100%;
  left: 0;
  width: var(--more-modal-width);
  max-height: 405px;
  background: var(--modal-color);
  border-radius: 15px;
  z-index: 1000;
  overflow: hidden;
  transition: all 0.2s;
}

.action-tabs {
  padding: 8px;
}

.tab {
  width: 100%;
  padding: 16px;
  color: #fff;
  align-items: center;
  transition: all 0.2s;
  border-radius: 8px;
  cursor: pointer;
}

.tab:hover {
  background: var(--hover-color);
}

.tab:active {
  opacity: 0.5;
}

.tab-icon {
  height: 18px;
  margin-right: 12px;
}

.tab-title {
  font-size: 14px;
  line-height: 18px;
}

.switch-account-tab,
.logout-tab {
  padding: 8px;
  width: 100%;
}

.more-container.active {
  max-height: 120px;
}

.main-tabs {
  transition: transform 0.2s cubic-bezier(0.08, 0.52, 0.52, 1);
}

.more-container.active .main-tabs {
  transform: translateX(-100%);
}

.switch-theme-tabs {
  padding: 8px;
  position: absolute;
  top: 0;
  left: 100%;
  transition: left 0.2s cubic-bezier(0.08, 0.52, 0.52, 1);
}

.more-container.active .switch-theme-tabs {
  left: 0;
  width: 100%;
}

.switch-theme-tabs .theme-tab {
  cursor: default;
}
.switch-theme-tabs .theme-tab:hover {
  background: inherit;
}
.switch-theme-tabs .theme-tab:active {
  opacity: 1;
}

.theme-tab .tab-icon.back {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  width: 20px;
  font-size: 12px;
  color: var(--secondary-text-color);
  cursor: pointer;
  margin-left: -8px;
  margin-right: 8px;
}

.theme-tab .tab-title {
  font-size: 16px;
  color: var(--primary-text-color);
  font-weight: 600;
  flex-grow: 1;
}

.switch-theme-tabs .tab-icon {
  margin-right: 0;
}

.switch-tab .tab-title {
  font-size: 14px;
  font-weight: 400;
  flex-grow: 1;
}

@media (max-width: 1263px) {
  .more-container {
    left: 100%;
  }
}
</style>
