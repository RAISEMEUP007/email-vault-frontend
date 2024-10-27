<template>
  <div class="flex h-full items-center justify-center min-h-screen bg-gray-200">
    <div class="flex w-full max-w-1512px h-full max-h-982px">
      <div class="w-1/2 pt-24 pb-32 bg-white flex justify-center">
        <form @submit.prevent="handleSubmit" class="px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
          <h2 class="tracking-wide text-4xl font-black mt-20 mb-4 ml-4">Sign In</h2>    
          <p class="mt-0.5 mb-5 text-sm pr-2">
            Welcome to Email Vault, please enter your login credentials below to start using the application.
          </p>
          <div class="mb-8 ml-4 pr-1">
            <label class="block text-evGray text-sm font-bold mb-2" for="email">Email</label>
            <input
              v-model="email"
              type="email"
              id="email"
              placeholder="Enter your email"
              class="ev-input"
              required
            />
          </div>
          <div class="mb-2 ml-4 pr-1 relative">
            <label class="block text-evGray text-sm font-bold mb-2" for="password">Password</label>
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              id="password"
              placeholder="Enter your password"
              class="ev-input     "
              required
            />
            <button type="button" @click="togglePasswordVisibility" class="absolute inset-y-12 right-0 pr-3 flex items-center">
              <font-awesome-icon 
                :icon="showPassword ? ['far', 'eye-slash'] : ['far', 'eye']" 
                class="text-evPurple"
              />
            </button>
          </div>  

          <!-- Forgot Password link -->
          <div class="mb-4 text-right">
            <router-link to="/forgot-password" class="text-evPurple hover:text-evPurpleAlt text-xs">Forgot password ?</router-link>
          </div>
          
          <div class="flex items-end justify-end mt-7">
            <button
              type="submit"
              class="bg-evPurple hover:bg-evPurpleAlt text-white text-sm py-2 px-11 rounded focus:outline-none focus:shadow-outline shadow-md shadow-neutral-700"
            >
              Sign In
            </button>
          </div>

          <div class="mt-4 text-center border-t shadow-zinc-400 mt-11 pt-5">
            <span>Don't have an account? </span><router-link to="/signup" class="text-evPurple hover:text-evPurpleAlt text-sm">Create Account</router-link>
          </div>
        </form>
      </div>

      <!-- Right Section: Description -->
      <Description widthClass="w-1/2"/>
    </div>
  </div>
</template>

<script>
import Description from '@/components/registration/Description.vue'

export default {
  components: {
    Description
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
      this.email = ''; // Clear the email when done
      this.password = ''; // Clear the password when done
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>