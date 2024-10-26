import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/views/Login.vue'
import Signup from '@/views/Signup.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/', name:'Login', component:Login},
    {path: '/login', name:'Login', component:Login},
    {path: '/signup', name:'Signup', component:Signup},
  ]
})

export default router