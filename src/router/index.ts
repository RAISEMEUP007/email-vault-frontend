import { createRouter, createWebHistory } from 'vue-router'

import Signin from '@/views/registration/Signin.vue'
import Signup from '@/views/registration/Signup.vue'
import VerifyCode from '@/views/registration/VerifyCode.vue'
import EmailVerification from '@/views/registration/EmailVerification.vue'
import NotFound from '@/views/errors/NotFound.vue';
import AddBillingMethod from '@/views/registration/AddBillingMethod.vue';
import WelcomeBack from '@/views/registration/WelcomeBack.vue';

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
    path: '/verifycode',
    name: 'VerifyCode',
    component: VerifyCode
  },
  {
    path: '/emailverification',
    name: 'EmailVerification',
    component: EmailVerification
  },
  {
    path: '/addbillingmethod',
    name: 'AddBillingMethod',
    component: AddBillingMethod
  },
  {
    path: '/welcomeback',
    name: 'WelcomeBack',
    component: WelcomeBack,
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