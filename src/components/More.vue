<template>
  <div class="more-container">
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
      <router-link to="/">
        <div class="tab flex">
          <div class="tab-icon">
            <moon-icon />
          </div>
          <div class="tab-title">
            <span>Chuyển chế độ</span>
          </div>
        </div>
      </router-link>
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
    </div>
  </div>
</template>

<script>
import SettingIcon from "@/components/SVG/SettingIcon.vue";
import ClockIcon from "@/components/SVG/ClockIcon.vue";
import BookmarkIcon from "@/components/SVG/BookmarkIcon.vue";
import MoonIcon from "@/components/SVG/MoonIcon.vue";
import ReportIcon from "@/components/SVG/BookmarkIcon.vue";

import { auth } from "@/firebase/init";
import { signOut } from "firebase/auth";

export default {
  methods: {
    async handleLogout() {
      await signOut(auth);
      setTimeout(() => {
        this.$router.push("/accounts/login");
      }, 3000);
    },
  },
  components: { SettingIcon, ClockIcon, BookmarkIcon, MoonIcon, ReportIcon },
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
  background: var(--more-modal-color);
  border-radius: 15px;
  z-index: 1000;
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

.separator {
  width: 100%;
  background: #5555554d;
}

.separator-big {
  height: 6px;
}

.separator-small {
  height: 1px;
}

.switch-account-tab,
.logout-tab {
  padding: 8px;
  width: 100%;
}

@media (min-width: 768px) and (max-width: 1263px) {
  .more-container {
    left: 100%;
  }
}
</style>
