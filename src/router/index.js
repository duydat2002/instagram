import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Explore from "../views/Explore.vue";
import Reels from "../views/Reels.vue";
import Inbox from "../views/Inbox.vue";
import Stories from "../views/Stories.vue";
import Profile from "../views/Profile.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/explore",
    name: "Explore",
    component: Explore,
  },
  {
    path: "/reels",
    name: "Reels",
    component: Reels,
  },
  {
    path: "/message",
    name: "Inbox",
    component: Inbox,
  },
  {
    path: "/stories/:id",
    name: "Stories",
    component: Stories,
  },
  {
    path: "/:id",
    name: "Profile",
    component: Profile,
  },
  // {
  //   path: "/accounts/login",
  //   name: "Login",
  //   component: Login,
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active",
});

export default router;
