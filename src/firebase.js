import Vue from "vue"
import firebase from "firebase"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDcSXTfTQ6rsYu6NS467aCDctg2b7niP0w",
  authDomain: "webexpert-demo-project.firebaseapp.com",
  projectId: "webexpert-demo-project",
  storageBucket: "webexpert-demo-project.appspot.com",
  messagingSenderId: "321948403209",
  appId: "1:321948403209:web:2e2689356ff070564e1ad8",
}

firebase.initializeApp(firebaseConfig)

/**
 * Vue.observable を使って、firebase.auth()をVueアプリ全体に共有する。
 * this.$authがアプリ全体でアクセスできる様になる。
 * @example
 * computed() を通じて firebase.auth().currentUser.displayにアクセスする例。任意のコンポーネントで以下の様に記述できる。
 * ```vue
 * computed: {
 *  user() {
 *    reutrn this.$auth.currentUser
 *  }
 * }
 * ```
 */

const initialUserState = {
  uid: "",
  displayName: "",
  photoURL: "",
}
const $auth = Vue.observable({
  currentUser: { ...initialUserState },
})
firebase.auth().onAuthStateChanged((user) => {
  let state
  if (user) {
    const { uid, displayName, photoURL } = user
    state = {
      uid,
      displayName,
      photoURL,
    }
  } else {
    state = initialUserState
  }
  Object.assign($auth.currentUser, state)
})
Vue.prototype.$auth = $auth
