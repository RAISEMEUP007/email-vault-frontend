import { createRouter, createWebHistory } from 'vue-router'

import Signin from '@/views/registration/Signin.vue'
import Signup from '@/views/registration/Signup.vue'

const routes = [
  {
    path: '/',
    redirect: '/signin'
  },
  {
    path: '/signin',
    name: 'Signin', 
    component: Signin
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router