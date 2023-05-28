import Home from "../views/Home.vue";
// import Explore from "../views/Explore.vue";
import Reels from "../views/Reels.vue";
import Inbox from "../views/Inbox.vue";
import Stories from "../views/Stories.vue";
import Profile from "../views/Profile.vue";
import Login from "../components/Auth/Login.vue";
import SignUp from "../components/Auth/SignUp.vue";
import Posts from "../views/PostTabs/Posts.vue";
import SavedPosts from "../views/PostTabs/SavedPosts.vue";
import TaggedPosts from "../views/PostTabs/TaggedPosts.vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import AuthLayout from "../layouts/AuthLayout.vue";
import PostTabsLayout from "../layouts/PostTabsLayout.vue";

import { createRouter, createWebHistory } from "vue-router";
import { auth } from "@/firebase/init";
import store from "@/store/index";

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
    component: () => import("../views/Explore.vue"),
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
    meta: { layout: DashboardLayout },
    children: [
      {
        path: "",
        name: "Posts",
        component: Posts,
        meta: { nestedLayout: PostTabsLayout },
      },
      {
        path: "saved",
        name: "SavedPosts",
        component: SavedPosts,
        meta: { nestedLayout: PostTabsLayout },
      },
      {
        path: "tagged",
        name: "TaggedPosts",
        component: TaggedPosts,
        meta: { nestedLayout: PostTabsLayout },
      },
    ],
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

router.beforeEach(async (to, from, next) => {
  store.commit("splash/setIsLoading", true);
  store.commit("splash/setProgress", 0);

  const requiresAuth = to.meta.requiresAuth;
  const user = auth.currentUser;

  console.log(user);

  if (requiresAuth && !user) {
    next("/accounts/login");
  } else {
    next();
  }
});

router.afterEach(() => {
  store.commit("splash/setProgress", 100);
  setTimeout(() => {
    store.commit("splash/setIsLoading", false);
  }, 3000);
});

export default router;
