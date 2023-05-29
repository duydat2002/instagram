import DefaultLayout from "../layouts/DefaultLayout.vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import AuthLayout from "../layouts/AuthLayout.vue";
import PostTabsLayout from "../layouts/PostTabsLayout.vue";

import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/index";
import { auth } from "@/firebase/init";
import { useUser } from "@/composables/useUser";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
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
    component: () => import("../views/Reels.vue"),
    meta: { layout: DefaultLayout, requiresAuth: true },
  },
  {
    path: "/message",
    name: "Inbox",
    component: () => import("../views/Inbox.vue"),
    meta: { layout: DashboardLayout, requiresAuth: true },
  },
  {
    path: "/stories/:id",
    name: "Stories",
    component: () => import("../views/Stories.vue"),
    meta: { layout: DefaultLayout, requiresAuth: true },
  },
  {
    path: "/:username",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    meta: { layout: DashboardLayout },
    beforeEnter: (to, from, next) => {
      const { getUserWithUsername } = useUser();
      getUserWithUsername(to.params.username).then((user) => {
        if (!user) {
          next({
            name: "NotFound",
            params: { pathMatch: to.path.substring(1).split("/") },
            query: to.query,
            hash: to.hash,
          });
        } else {
          store.commit("user/setUser", user);
          next();
        }
      });
    },
    children: [
      {
        path: "",
        name: "Posts",
        component: () => import("../views/PostTabs/Posts.vue"),
        meta: { nestedLayout: PostTabsLayout },
      },
      {
        path: "saved",
        name: "SavedPosts",
        component: () => import("../views/PostTabs/SavedPosts.vue"),
        meta: { nestedLayout: PostTabsLayout },
      },
      {
        path: "tagged",
        name: "TaggedPosts",
        component: () => import("../views/PostTabs/TaggedPosts.vue"),
        meta: { nestedLayout: PostTabsLayout },
      },
    ],
  },
  {
    path: "/accounts/login",
    name: "Login",
    component: () => import("../components/Auth/Login.vue"),
    meta: { layout: AuthLayout },
  },
  {
    path: "/accounts/signup",
    name: "SignUp",
    component: () => import("../components/Auth/SignUp.vue"),
    meta: { layout: AuthLayout },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
    meta: { layout: DashboardLayout },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

const authPath = ["/accounts/login", "/accounts/signup"];

router.beforeEach(async (to, from, next) => {
  store.commit("splash/setIsLoading", true);
  store.commit("splash/setProgress", 0);

  const requiresAuth = to.meta.requiresAuth;
  const user = auth.currentUser;

  if (requiresAuth && !user) {
    next("/accounts/login");
  } else {
    if (authPath.includes(to.path) && user) {
      next("/");
    } else {
      next();
    }
  }
});

router.afterEach(() => {
  store.commit("splash/setProgress", 100);
  setTimeout(() => {
    store.commit("splash/setIsLoading", false);
  }, 3000);
});

export default router;
