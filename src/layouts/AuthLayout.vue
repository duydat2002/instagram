<template>
  <router-view></router-view>
  <Footer />
</template>

<script>
import Footer from "@/components/Footer.vue";
export default {
  components: { Footer },
};
</script>

<style>
.auth__container {
  margin: 0 auto;
  max-width: 350px;
  margin-top: 12px;
  margin-bottom: 45px;
  text-align: center;
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

.auth__container .logo {
  width: 175px;
  margin-top: 25px;
}

.auth-login .logo {
  margin-bottom: 40px;
}

.auth-signup .logo {
  margin-bottom: 15px;
}

.auth-button {
  margin-top: 15px;
}

.auth__container .separator {
  width: 100%;
  margin: 24px 0;
  align-items: center;
}

.auth__container .separator-line {
  flex: 1 0;
  height: 1px;
  background: var(--separator-color);
}

.auth__container .separator-text {
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

.auth__container .facebook-logo {
  width: 16px;
  height: 16px;
  margin-right: 8px;
}

.auth-link {
  display: inline;
  font-size: 12px;
  color: var(--link-color);
}

.auth-link:active {
  opacity: 0.5;
}

.auth-inputs {
  gap: 8px;
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

.moreinfo {
  font-size: 12px;
  color: var(--secondary-text-color);
  margin: 15px 0;
}

.auth__container .subtitle {
  font-size: 17px;
  line-height: 20px;
  font-weight: 600;
  margin-bottom: 18px;
  color: var(--secondary-text-color);
}

.auth-signup .signup-button {
  align-items: baseline;
}

.signup-button .facebook-logo svg {
  height: auto !important;
}

.auth-error {
  font-size: 14px;
  color: var(--error-color);
  margin: 32px 0;
}
</style>
