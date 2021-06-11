import Vue from "vue";
import VueRouter from "vue-router";
import BeforeSignIn from "@/views/BeforeSignIn.vue";
import AfterSignIn from "@/views/AfterSignIn.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/BeforeSignIn",
  },
  {
    path: "/BeforeSignIn",
    name: "BeforeSignIn",
    component: BeforeSignIn,
  },
  {
    path: "/AfterSignIn",
    name: "AfterSignIn",
    component: AfterSignIn,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
