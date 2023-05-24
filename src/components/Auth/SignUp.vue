<template>
  <div class="auth__container auth-signup flex flex-col">
    <div class="auth-form flex">
      <router-link to="/" class="logo">
        <div class="logo-text">
          <logo colorLogo="#262626" />
        </div>
      </router-link>
      <h2 class="subtitle">Đăng ký để xem ảnh và video từ bạn bè.</h2>
      <form
        id="signupForm"
        class="auth-form__container"
        @submit.prevent="submitSignupForm"
      >
        <ui-button variant="contained" class="signup-button">
          <template #icon>
            <div class="facebook-logo">
              <fa :icon="['fab', 'square-facebook']" style="color: #ffffff" />
            </div>
          </template>
          <span>Đăng nhập bằng Facebook</span>
        </ui-button>
        <div class="separator flex">
          <div class="separator-line"></div>
          <span class="separator-text">HOẶC</span>
          <div class="separator-line"></div>
        </div>
        <div class="auth-inputs flex">
          <ui-input
            name="email"
            placeholder="Số di động hoặc email"
            v-model:propValue="email"
            :checkValue="true"
          />
          <ui-input
            name="fullname"
            placeholder="Tên đầy đủ"
            v-model:propValue="fullname"
          />
          <ui-input
            name="username"
            placeholder="Tên người dùng"
            v-model:propValue="username"
          />
          <ui-input
            name="password"
            placeholder="Mật khẩu"
            type="password"
            v-model:propValue="password"
          />
        </div>
        <p class="moreinfo">
          <span
            >Những người dùng dịch vụ của chúng tôi có thể đã tải thông tin liên
            hệ của bạn lên Instagram.
            <router-link to="/" class="auth-link">Tìm hiểu thêm</router-link>
          </span>
        </p>
        <p class="moreinfo">
          <span
            >Bằng cách đăng ký, bạn đồng ý với
            <router-link to="/" class="auth-link">Điều khoản</router-link>
            ,
            <router-link to="/" class="auth-link"
              >Chính sách quyền riêng tư</router-link
            >
            và
            <router-link to="/" class="auth-link"
              >Chính sách cookie</router-link
            >
            của chúng tôi.
          </span>
        </p>
        <ui-button
          type="submit"
          class="auth-button"
          :disabled="isDisable"
          :isLoading="loading"
          >Đăng ký</ui-button
        >
        <p v-if="authError" class="auth-error">{{ authError }}</p>
      </form>
    </div>
    <div class="auth-switch">
      <span class="auth-switch__text">Bạn có tài khoản? </span>
      <router-link to="/" class="auth-switch__link">Đăng nhập</router-link>
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
import { useAuth } from "@/composables/useAuth";

export default {
  data() {
    return {
      username: "",
      password: "",
      fullname: "",
      email: "",
      authError: null,
      loading: false,
    };
  },
  computed: {
    isDisable() {
      return !(
        this.username != "" &&
        this.fullname != "" &&
        this.email != "" &&
        this.password.length >= 8
      );
    },
  },
  methods: {
    async submitSignupForm() {
      const { authError, signUp } = useAuth();

      this.loading = true;
      await signUp(this.email, this.password, this.fullname, this.username);

      this.authError = authError;
      this.loading = false;
    },
  },
  components: { Logo, UiInput, UiButton },
};
</script>
