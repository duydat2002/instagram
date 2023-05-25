import Home from "../views/Home.vue";
import Explore from "../views/Explore.vue";
import Reels from "../views/Reels.vue";
import Inbox from "../views/Inbox.vue";
import Stories from "../views/Stories.vue";
import Profile from "../views/Profile.vue";
import Login from "../components/Auth/Login.vue";
import SignUp from "../components/Auth/SignUp.vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import AuthLayout from "../layouts/AuthLayout.vue";

import { createRouter, createWebHistory } from "vue-router";
import { auth } from "@/firebase/init";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { layout: DashboardLayout, requiresAuth: true },
  },
  {
    path: "/explore",
    name: "Explore",
    component: Explore,
    meta: { layout: DashboardLayout, requiresAuth: true },
  },
  {
    path: "/reels",
    name: "Reels",
    component: Reels,
    meta: { layout: DefaultLayout, requiresAuth: true },
  },
  {
    path: "/message",
    name: "Inbox",
    component: Inbox,
    meta: { layout: DashboardLayout, requiresAuth: true },
  },
  {
    path: "/stories/:id",
    name: "Stories",
    component: Stories,
    meta: { layout: DefaultLayout, requiresAuth: true },
  },
  {
    path: "/:id",
    name: "Profile",
    component: Profile,
    meta: { layout: DashboardLayout, requiresAuth: true },
  },
  {
    path: "/accounts/login",
    name: "Login",
    component: Login,
    meta: { layout: AuthLayout },
  },
  {
    path: "/accounts/signup",
    name: "SignUp",
    component: SignUp,
    meta: { layout: AuthLayout },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth;
  const user = auth.currentUser;

  if (requiresAuth && user == null) {
    next("/accounts/login");
  } else {
    next();
  }
});

export default router;
