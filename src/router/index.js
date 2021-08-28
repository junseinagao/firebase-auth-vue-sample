import Vue from "vue"
import VueRouter from "vue-router"
import BeforeSignIn from "@/views/BeforeSignIn.vue"
import AfterSignIn from "@/views/AfterSignIn.vue"
import firebase from "firebase"

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

const isSignedIn = async () => {
  // Promise を使って、onAuthStateChanged が完了するまで待つ
  return await new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          unsubscribe()
          resolve(true)
        } else {
          unsubscribe()
          resolve(false)
        }
      },
      (error) => {
        unsubscribe()
        reject(error)
      }
    )
  })
}

// Vue Router のグローバルガードで、ログインしてない場合は、BeforeSignInにしか行けなくする。

router.beforeEach(async (to, from, next) => {
  const auth = await isSignedIn()
  if (to.name !== "BeforeSignIn" && !auth) {
    next("/BeforeSignIn")
  } else {
    next()
  }
})

export default router
