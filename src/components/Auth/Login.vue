<template>
  <div class="auth__container auth-login flex flex-col">
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
        <div class="auth-inputs flex">
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
        </div>
        <ui-button
          type="submit"
          primary
          class="auth-button"
          :disabled="isDisable"
          :isLoading="loading"
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
        <p v-if="authError" class="auth-error">{{ authError }}</p>
      </form>
      <router-link to="/" class="auth-link">
        <span>Quên mật khẩu?</span>
      </router-link>
    </div>
    <div class="auth-switch">
      <span class="auth-switch__text">Bạn chưa có tài khoản ư? </span>
      <router-link to="/accounts/signup" class="auth-switch__link"
        >Đăng ký</router-link
      >
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

import { mapMutations } from "vuex";
import { useAuth } from "@/composables/useAuth";

export default {
  data() {
    return {
      username: "",
      password: "",
      authError: null,
      loading: false,
    };
  },
  computed: {
    isDisable() {
      return !(this.username != "" && this.password.length >= 8);
    },
  },
  methods: {
    ...mapMutations("user", ["setCurrentUser"]),
    async submitLoginForm() {
      const { getUserInLogin } = useAuth();

      this.loading = true;

      const user = await getUserInLogin(this.username, this.password);

      if (user) {
        this.setCurrentUser(user);
        this.authError = null;
        this.$router.push("/");
      } else {
        this.authError =
          "Rất tiếc, mật khẩu của bạn không đúng. Vui lòng kiểm tra lại mật khẩu.";
      }

      this.loading = false;
    },
  },
  components: { Logo, UiInput, UiButton },
};
</script>
