<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-1512px max-h-982px screen-2xl flex">

      <!-- Left Section: Form -->
      <div class="w-1/2">
        <form @submit.prevent="handleSubmit" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 class="text-center text-2xl font-bold mb-5">Login</h2>
          
          <!-- Email Input Field -->
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
            <input
              v-model="email"
              type="email"
              id="email"
              placeholder="Enter your email"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          
          <!-- Password Input Field -->
          <div class="mb-4 relative">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              id="password"
              placeholder="Enter your password"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
              required
            />
            <button type="button" @click="togglePasswordVisibility" class="absolute inset-y-0 right-0 pr-3 flex items-center">
              <font-awesome-icon 
                :icon="showPassword ? ['far', 'eye-slash'] : ['far', 'eye']" 
                class="text-blue-500 shadow-lg"
              />
            </button>
          </div>

          <!-- Forgot Password link -->
          <div class="mb-4 text-right">
            <router-link to="/forgot-password" class="text-blue-500 hover:text-blue-700 text-sm">Forgot Password?</router-link>
          </div>
          
          <div class="flex items-center justify-between">
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>

          <!-- Create Account link -->
          <div class="mt-4 text-center">
            <router-link to="/signup" class="text-blue-500 hover:text-blue-700 text-sm">Create Account</router-link>
          </div>
        </form>
      </div>

      <!-- Right Section: Description -->
      <div class="w-1/2 pt-24 pb-40" style="background-color: #5F1660;">
        <div class="p-8 flex flex-col row items-center justify-center text-white">
          <img src="@/assets/img/1.png" alt="Welcome Image" class="mt-5 rounded shadow-md" />
          <div class="max-w-sm">
            <h1 class="text-center text-4xl font-bold mt-14 mb-10">Email Vault</h1>
            <p class="text-center text-lg">
              Our email journaling solution grants you security, compliance, and peace of mind.
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
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