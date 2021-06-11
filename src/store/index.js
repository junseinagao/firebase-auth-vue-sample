import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      uid: "",
      displayName: "",
      photoURL: "",
    },
  },
  mutations: {
    setUser(state, user) {
      state.user.uid = user.uid
      state.user.displayName = user.displayName
      state.user.photoURL = user.photoURL
    },
  },
  actions: {
    signIn(context, user) {
      console.log("in sign in action", user)
      if (user) {
        const { uid, displayName, photoURL } = user
        context.commit("setUser", { uid, displayName, photoURL })
      } else {
        context.commit("setUser", { uid: "", displayName: "", photoURL: "" })
      }
    },
    signOut(context) {
      context.commit("setUser", { uid: "", displayName: "", photoURL: "" })
    },
  },
  getters: {
    user(state) {
      return state.user
    },
    isSignedIn(state, getters) {
      return getters.user.uid
    },
  },
})
