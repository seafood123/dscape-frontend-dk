import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
// import Login from "@/views/common/Login.vue";
// import SignUp from "@/views/common/SignUp.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/common/Login.vue"),
  },
  {
    path: "/signUp",
    name: "SignUp",
    component: () => import("@/views/common/SignUp.vue"),
  },
];

const router = createRouter({
  history: createWebHistory("dev"),
  routes,
});

export default router;
