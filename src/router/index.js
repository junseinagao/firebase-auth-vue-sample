import Vue from "vue"
import VueRouter from "vue-router"
import BeforeSignIn from "@/views/BeforeSignIn.vue"
import AfterSignIn from "@/views/AfterSignIn.vue"
import store from "@/store"

Vue.use(VueRouter)

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
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

const isSignedIn = () => {
  return store.getters.isSignedIn
}

router.beforeEach((to, from, next) => {
  if (to.name !== "BeforeSignIn" && !isSignedIn()) {
    next("/BeforeSignIn")
  } else {
    next()
  }
})

export default router
