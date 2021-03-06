import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Rating from '@/views/Rating'
import NotFound from '@/views/NotFound'
import UserAdd from '@/views/Admin/UserAdd'
import RatedResume from "../views/RatedResume"
import ResumeList from "../views/ResumeList"
import store from '../store/index'

Vue.use(VueRouter)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}

const isAdmin = (to, from, next) => {
  if (store.getters.isAdmin) {
    next()
    return
  }
  next('/')
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/rating',
    name: 'Rating',
    props: true,
    component: Rating,
    beforeEnter: ifAuthenticated

  },
  {
    path: '/rated-resume',
    name: 'RatedResume',
    component: RatedResume,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/admin',
    name: 'Admin',
    component: UserAdd,
    beforeEnter: isAdmin
  },
  {
    path: '/resumes/:spec',
    name: 'ResumeList',
    props: true,
    component: ResumeList,
    meta: { transition: 'fade-in-right' },
    beforeEnter: ifAuthenticated
  },
  {
    path: '*',
    component: NotFound
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
