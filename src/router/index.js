import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Explore from "../views/Explore.vue";
import Reels from "../views/Reels.vue";
import Inbox from "../views/Inbox.vue";
import Stories from "../views/Stories.vue";
import Profile from "../views/Profile.vue";
import Login from "../components/Auth/Login.vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import AuthLayout from "../layouts/AuthLayout.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { layout: DashboardLayout },
  },
  {
    path: "/explore",
    name: "Explore",
    component: Explore,
    meta: { layout: DashboardLayout },
  },
  {
    path: "/reels",
    name: "Reels",
    component: Reels,
    meta: { layout: DefaultLayout },
  },
  {
    path: "/message",
    name: "Inbox",
    component: Inbox,
    meta: { layout: DashboardLayout },
  },
  {
    path: "/stories/:id",
    name: "Stories",
    component: Stories,
    meta: { layout: DefaultLayout },
  },
  {
    path: "/:id",
    name: "Profile",
    component: Profile,
    meta: { layout: DashboardLayout },
  },
  {
    path: "/accounts/login",
    name: "Login",
    component: Login,
    meta: { layout: AuthLayout },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active",
});

export default router;
