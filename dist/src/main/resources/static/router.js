import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'
import VueRouter from 'https://cdn.jsdelivr.net/npm/vue-router@3.1.6/dist/vue-router.esm.browser.js'
Vue.use(VueRouter)
import { store } from './store.js'

/**
 * kommer skapa dessa komponenter i /views
 */
import home from './views/home.js'
import owners from './views/owners.js'
import ownerDetails from './views/ownerDetails.js'
import login from './views/login.js'
import register from './views/register.js'

export const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      name:"home",
      path: '/', 
      component: home,
      // beforeEnter: (to, from, next) => {
      //   setTimeout(() => {
      //     store.state.user && next()
      //   }, 0);
      // }
    },
    {
      name:"login",
      path: '/login', 
      component: login
    },
    {
      name:"register",
      path: '/register', 
      component: register
    },
    {
      name: "owners",
      /**
       * you can send URL queries with the syntax:
       * /owners?owner=2&name=Ralf, where each query
       * is a variable with the same name as the query,
       * with the corresponding value.
       * 
       * We can access these queries with 
       * this.$route.query, which is an object on the 
       * specific route containing the query variables
       */
      path: '/owners', 
      component: owners
    },
    {
      name: "ownerDetails",
      // this will create a variable with the 
      // same name as after the ':'.

      // URL parameters are divided by '/'
      path: '/owners/:id', 
      component: ownerDetails
    }
  ]
});