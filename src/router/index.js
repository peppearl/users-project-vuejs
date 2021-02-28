import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import User from '../components/User.vue'
import EditUser from '../components/EditUser.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/users',
    name: 'Users',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Users.vue')
  },
  {
    path: '/users/:id',
    name: 'User',
    component: User
  },
  {
    path: '/users/edit/:id',
    name: 'Edit User',
    component: EditUser
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
