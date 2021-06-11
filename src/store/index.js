import Vue from "vue"
import Vuex from "vuex"
import firebase from "firebase"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {
      uid: "",
      displayName: "",
      photoURL: "",
    },
  },
  mutations: {
    setUser(state, user) {
      const { uid, displayName, photoURL } = user
      state.user.uid = uid
      state.user.displayName = displayName
      state.user.photoURL = photoURL
    },
  },
  actions: {
    signInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
    },
    signOut(context) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          context.commit("setUser", { uid: "", displayName: "", photoURL: "" })
        })
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

export default store
