import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CreatePin from '../views/CreatePin.vue'
import Image from '../views/Image.vue'
import Profile from '../views/Profile.vue' // ✅ this line imports the Profile view

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/create', name: 'Create', component: CreatePin },
  { path: '/image', name: 'Image', component: Image },
  { path: '/profile', name: 'Profile', component: Profile } // ✅ this line registers the route
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
