import { createRouter, createWebHistory } from 'vue-router'

import Signin from '@/views/registration/Signin.vue'
import Signup from '@/views/registration/Signup.vue'
import NotFound from '@/views/errors/NotFound.vue';

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
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router