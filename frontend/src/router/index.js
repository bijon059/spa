import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from "@/views/Login";
import {useIndexStore} from "@/stores/index";
function is_logged_in() {
  const store = useIndexStore();
  return store.isLoggedIn;
}

const routes = [
  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path: '/',
    name: 'home',
    beforeEnter: (to, from, next) => {
      if (!is_logged_in()) {
        next({name:'login',}) // go to wherever I'm going
      } else {
        next()
      }
    },
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    },
    beforeEnter: (to, from, next) => {
      if (!is_logged_in()) {
        next({name:'login',}) // go to wherever I'm going
      } else {
        next()
      }
    },
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkExactActiveClass: "active",
  routes
})

export default router
