<template>
  <div class="login__container flex flex-col">
    <div class="auth-form flex">
      <router-link to="/" class="logo">
        <div class="logo-text">
          <logo :colorLogo="'#262626'" />
        </div>
      </router-link>
      <form id="loginForm" action="POST" class="auth-form__container">
        <ui-input
          :name="'username'"
          :placeholder="'Số điện thoại, tên người dùng hoặc email'"
        />
        <ui-input
          :name="'password'"
          :placeholder="'Mật khẩu'"
          :type="'password'"
        />
        <button class="auth-button" type="submit">Đăng nhập</button>
        <div class="seperate">
          <span class="seperate-text">HOẶC</span>
        </div>
        <button type="button" class="login-facebook">
          <div class="facebook-logo">
            <img src="@/assets/images/facebookIcon.png" alt="Logo Facebook" />
          </div>
          <span>Đăng nhập bằng Facebook</span>
        </button>
      </form>
      <router-link to="/" class="fogot-password">
        <span>Quên mật khẩu?</span>
      </router-link>
    </div>
    <div class="auth-switch">
      <span class="auth-switch__text">Bạn chưa có tài khoản ư?</span>
      <router-link to="/" class="auth-switch__link">Đăng ký</router-link>
    </div>
    <div class="app-download">
      <p>Tải ứng dụng.</p>
      <div class="app-list">
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

export default {
  components: { Logo, UiInput },
};
</script>

<style scoped>
img {
  width: 20px;
}

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

.auth-input {
}
</style>
