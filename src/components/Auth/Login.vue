<template>
  <div class="login__container flex flex-col">
    <div class="auth-form flex">
      <router-link to="/" class="logo">
        <div class="logo-text">
          <logo colorLogo="#262626" />
        </div>
      </router-link>
      <form
        id="loginForm"
        class="auth-form__container"
        @submit.prevent="submitLoginForm"
      >
        <ui-input
          style="margin-bottom: 8px"
          name="username"
          placeholder="Số điện thoại, tên người dùng hoặc email"
          v-model:propValue="username"
        />
        <ui-input
          name="password"
          placeholder="Mật khẩu"
          type="password"
          v-model:propValue="password"
        />
        <ui-button type="submit" class="auth-button" :disabled="isDisable"
          >Đăng nhập</ui-button
        >
        <div class="separator flex">
          <div class="separator-line"></div>
          <span class="separator-text">HOẶC</span>
          <div class="separator-line"></div>
        </div>
        <ui-button variant="text">
          <template #icon>
            <div class="facebook-logo">
              <img src="@/assets/images/facebookIcon.png" alt="Logo Facebook" />
            </div>
          </template>
          <span>Đăng nhập bằng Facebook</span>
        </ui-button>
      </form>
      <router-link to="/" class="fogot-password">
        <span>Quên mật khẩu?</span>
      </router-link>
    </div>
    <div class="auth-switch">
      <span class="auth-switch__text">Bạn chưa có tài khoản ư? </span>
      <router-link to="/" class="auth-switch__link">Đăng ký</router-link>
    </div>
    <div class="app-download">
      <p>Tải ứng dụng.</p>
      <div class="app-list flex">
        <router-link to="/" class="app-item">
          <img
            src="@/assets/images/downloadOnGooglePlay.png"
            alt="Download on Google Play"
          />
        </router-link>
        <router-link to="/" class="app-item">
          <img
            src="@/assets/images/downloadOnMicrosoft.png"
            alt="Download on Microsoft"
          />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "@/components/SVG/Logo";
import UiInput from "@/components/UI/UiInput";
import UiButton from "../UI/UiButton";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  computed: {
    isDisable() {
      return !(this.username != "" && this.password.length >= 8);
    },
  },
  methods: {
    submitLoginForm() {},
  },
  components: { Logo, UiInput, UiButton },
};
</script>

<style scoped>
.login__container {
  margin: 0 auto;
  max-width: 350px;
  margin-top: 40px;
  margin-bottom: 45px;
}

.auth-form__container {
  width: 100%;
}

.auth-form {
  padding: 20px 40px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-color);
  border-radius: 1px;
}

.logo {
  width: 175px;
  margin-top: 25px;
  margin-bottom: 40px;
}

.auth-button {
  margin-top: 15px;
}

.separator {
  width: 100%;
  margin: 24px 0;
  align-items: center;
}

.separator-line {
  flex: 1 0;
  height: 1px;
  background: var(--separator-color);
}

.separator-text {
  padding: 0 18px;
  position: absolute;
  left: 50%;
  color: var(--secondary-text-color);
  background: #fff;
  font-size: 13px;
  font-weight: 600;
  text-transform: capitalize;
  transform: translateX(-50%);
}

.facebook-logo {
  width: 16px;
  height: 16px;
  margin-right: 8px;
}

.fogot-password {
  margin-top: 12px;
  font-size: 12px;
  color: var(--link-color);
}

.fogot-password:active {
  opacity: 0.5;
}

.auth-switch {
  margin: 10px 0;
  padding: 25px 0;
  font-size: 14px;
  border: 1px solid var(--border-color);
  border-radius: 1px;
  text-align: center;
}

.auth-switch__link {
  color: var(--primary-button-color);
  font-weight: 600;
}
.auth-switch__link:active {
  opacity: 0.5;
}

.app-download {
  margin-top: 10px;
  text-align: center;
}

.app-download > p {
  margin: 10px;
  font-size: 14px;
}

.app-list {
  margin: 10px 0;
  gap: 8px;
  align-items: center;
  justify-content: center;
}

.app-item {
  height: 40px;
}

.app-item > img {
  max-height: 100%;
}
</style>
