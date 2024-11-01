<template>
  <div class="flex h-full items-center justify-center min-h-screen bg-gray-200 p-2">
    <div class="flex w-full max-w-1512px h-full max-h-982px">
      <div class="w-1/2 pt-24 pb-5 bg-white flex flex-col items-center">
        <form @submit.prevent="handleSubmit" class="flex-1 pt-6 w-full max-w-md">
          <h2 class="tracking-wide text-4xl font-black mt-20 mb-4">Sign In</h2>
          <p class="mb-4 text-sm pr-2 text-evTextColor">
            Welcome to Email Vault, please enter your login credentials below to start using the application.
          </p>

          <div class="mb-8 pr-1">
            <label class="block text-evGray text-sm mb-1.5" for="email">Email</label>
            <input
              v-model="email"
              type="email"
              id="email"
              placeholder="Enter your email"
              class="ev-input focus:ring-1 focus:ring-purple-800"
              @blur="handleBlur"
              @focus="isBlurred = true"
              :class="{'border-red-500': !isEmailValid && isBlurred && email !== ''}"
              maxlength="100"
              required
            />
            <p v-if="!isEmailValid && isBlurred && email !== ''" class="text-red-600 text-xs mt-1 font-semibold">
              Invalid email format
            </p>
          </div>

          <div class="mb-2 pr-1 relative">
            <label class="block text-evGray text-sm mb-1.5" for="password">Password</label>
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              id="password"
              placeholder="Enter your password"
              class="ev-input pr-8 focus:ring-1 focus:ring-purple-800"
              maxlength="100"
              required
            />
            <button type="button" @click="togglePasswordVisibility" class="absolute top-9 right-0 pr-3 flex items-center">
              <font-awesome-icon :icon="showPassword ? ['far', 'eye-slash'] : ['far', 'eye']" class="text-evPurple text-lg" />
            </button>
          </div>

          <div class="mb-4 text-right">
            <router-link to="/forgot-password" class="text-evPurple hover:text-evPurpleAlt text-xs font-semibold">Forgot password?</router-link>
          </div>

          <div class="flex items-end justify-end mt-7">
            <EVPurpleButton type="submit" size="medium">Sign In</EVPurpleButton>
          </div>

          <div class="text-center border-t mt-12 pt-5">
            <span class="text-sm text-evTextColor">Don't have an account? </span>
            <router-link to="/signup" class="text-evPurple hover:text-evPurpleAlt text-sm font-semibold">Create Account</router-link>
          </div>
        </form>

        <FooterText />
      </div>

      <Description widthClass="w-1/2" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import EVPurpleButton from '@/components/common/EVPurpleButton.vue';
import Description from '@/components/registration/Description.vue';
import FooterText from '@/components/registration/FooterText.vue';
import axiosInstance from '@/utils/axios'; // Assuming you have set this up
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    EVPurpleButton,
    Description,
    FooterText,
  },

  setup() {
    const router = useRouter();
    const email = ref('');
    const password = ref('');
    const showPassword = ref(false);
    const isEmailValid = ref(true);
    const isBlurred = ref(false);

    const handleSubmit = async () => {
      if (!isEmailValid.value) {
        console.error('Form is invalid');
        return;
      }

      try {
        const response = await axiosInstance.post('/signin', { // Note that this should be '/signin' when actually creating the sign-in API.
          email: email.value,
          password: password.value,
        });

        console.log('Sign-in successful:', response.data);
        router.push("/welcomeback");
      } catch (error) {
        console.error('Error signing in:', error);
      }

      // Clear form fields after a submit attempt
      email.value = '';
      password.value = '';
    };

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const validateEmail = () => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isEmailValid.value = emailPattern.test(email.value);
    };

    const handleBlur = () => {
      isBlurred.value = true;
      validateEmail();
    };

    return {
      email,
      password,
      showPassword,
      isEmailValid,
      isBlurred,
      handleSubmit,
      togglePasswordVisibility,
      handleBlur,
    };
  },
});
</script>
