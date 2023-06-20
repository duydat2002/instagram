import DefaultLayout from "../layouts/DefaultLayout.vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import AuthLayout from "../layouts/AuthLayout.vue";

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
    path: "/p/:id",
    name: "Post",
    component: () => import("../components/Post/Post.vue"),
    meta: { layout: DashboardLayout, from: "", requiresAuth: true },
    beforeEnter: (to, from, next) => {
      // console.log("from", from);
      // console.log("to", to);

      if (from.name == "Posts") {
        // to.meta.layout = DashboardLayout;
        to.meta.from = "Posts";
      } else if (from.name == "Home") {
        // to.meta.layout = DashboardLayout;
        to.meta.from = "Home";
      }
      next();
    },
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
    redirect: { name: "Posts" },
    component: () => import("../views/Profile/index.vue"),
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
        component: () => import("../views/Profile/posts.vue"),
      },
      {
        path: "saved",
        name: "Saved",
        component: () => import("../views/Profile/saved.vue"),
      },
      {
        path: "tagged",
        name: "Tagged",
        component: () => import("../views/Profile/tagged.vue"),
      },
      {
        path: "followers",
        name: "Followers",
        component: () => import("../components/Popup/FollowsPopup.vue"),
        children: [
          {
            path: "mutualOnly",
            name: "MutualFollowers",
            component: () => import("../components/Popup/FollowsPopup.vue"),
          },
          {
            path: "mutualFirst",
            name: "MutualFirstFollowers",
            component: () => import("../components/Popup/FollowsPopup.vue"),
          },
        ],
      },
      {
        path: "following",
        name: "Following",
        component: () => import("../components/Popup/FollowsPopup.vue"),
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
  store.dispatch("loading/startLoading");

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
  store.dispatch("loading/stopLoading");
});

export default router;
