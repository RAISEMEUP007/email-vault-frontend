<template>
  <div class="flex h-full items-center justify-center min-h-screen bg-gray-200 p-2">
    <div class="flex w-full max-w-1512px h-full max-h-982px">
      <div class="w-1/2 pt-24 pb-32 bg-white flex justify-center">
        <form @submit.prevent="handleSubmit" class="pt-6 pb-8 mb-4 w-full max-w-md">
          <h2 class="tracking-wide text-4xl font-black mt-20 mb-4">Sign In</h2>
          <p class="mt-0.5 mb-5 text-sm pr-2">
            Welcome to Email Vault, please enter your login credentials below to start using the application.
          </p>
          
          <div class="mb-8 pr-1">
            <label class="block text-evGray text-sm font-bold mb-1.5" for="email">Email</label>
            <input v-model="email" type="email" id="email" placeholder="Enter your email" class="ev-input" required />
          </div>
          <div class="mb-2 pr-1 relative">
            <label class="block text-evGray text-sm font-bold mb-1.5" for="password">Password</label>
            <input v-model="password" :type="showPassword ? 'text' : 'password'" id="password" placeholder="Enter your password" class="ev-input" required />
            <button type="button" @click="togglePasswordVisibility" class="absolute mt-0.5 inset-y-11 right-0 pr-3 flex items-center">
              <font-awesome-icon :icon="showPassword ? ['far', 'eye-slash'] : ['far', 'eye']" class="text-evPurple text-lg" />
            </button>
          </div>
          <div class="mb-4 text-right">
            <router-link to="/forgot-password" class="text-evPurple hover:text-evPurpleAlt text-xs">Forgot password?</router-link>
          </div>
          <div class="flex items-end justify-end mt-7">
            <EVPurpleButton type="submit" size="medium">Sign In</EVPurpleButton>
          </div>
          <div class="mt-4 text-center border-t shadow-zinc-500 mt-12 pt-5">
            <span class="font-sm">Don't have an account? </span>
            <router-link to="/signup" class="text-evPurple hover:text-evPurpleAlt text-sm">Create Account</router-link>
          </div>
        </form>
      </div>
      
      <Description widthClass="w-1/2" />
    </div>
  </div>
</template>

<script>
import EVPurpleButton from '@/components/common/EVPurpleButton.vue';
import Description from '@/components/registration/Description.vue';

export default {
  components: {
    EVPurpleButton,
    Description,
  },
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
    };
  },
  methods: {
    handleSubmit() {
      console.log(`Email: ${this.email}, Password: ${this.password}`);
      this.email = '';
      this.password = '';
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>