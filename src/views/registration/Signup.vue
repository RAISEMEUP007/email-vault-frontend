<template>
  <div class="flex h-full items-center justify-center min-h-screen bg-gray-200 p-2">
    <div class="flex w-full max-w-1512px h-full max-h-982px">
      <div class="w-1/2 pt-6 pb-5 bg-white flex flex-col items-center">
        <form @submit.prevent="handleSubmit" class="flex-1 pt-16 w-full max-w-md">
          <h2 class="tracking-wide text-4xl font-black mt-4 mb-6">Create Account</h2>
          <p class="mt-0.5 mb-4 text-sm pr-2">
            Welcome to Email Vault, please enter your details below to create an account.
          </p>

          <!-- First Name -->
          <div class="mb-2.5 pr-1">
            <label class="block text-evGray text-sm mb-1" for="firstName">First Name<span class="text-evPurple text-base ml-1">*</span></label>
            <input v-model="firstName" type="text" id="firstName" placeholder="Enter your first name" class="ev-input focus:ring-1 focus:ring-purple-800" required />
          </div>

          <!-- Last Name -->
          <div class="mb-2.5 pr-1">
            <label class="block text-evGray text-sm mb-1" for="lastName">Last Name<span class="text-evPurple text-base ml-1">*</span></label>
            <input v-model="lastName" type="text" id="lastName" placeholder="Enter your last name" class="ev-input focus:ring-1 focus:ring-purple-800" required />
          </div>

          <!-- Company Name -->
          <div class="mb-2.5 pr-1">
            <label class="block text-evGray text-sm mb-1" for="companyName">Company Name<span class="text-evPurple text-base ml-1">*</span></label>
            <input v-model="companyName" type="text" id="companyName" placeholder="Enter your company name" class="ev-input focus:ring-1 focus:ring-purple-800" required />
          </div>

          <!-- Email -->
          <div class="mb-2.5 pr-1">
            <label class="block text-evGray text-sm mb-1" for="email">Email<span class="text-evPurple text-base ml-1">*</span></label>
            <input
              v-model="email"
              type="email"
              id="email"
              placeholder="Enter your email"
              class="ev-input focus:ring-1 focus:ring-purple-800"
              @blur="handleBlur"
              @focus="isBlurred = true"
              :class="{
                'border-red-500': !isEmailValid && isBlurred && email !== '',
                'border-green-500': isEmailValid && isBlurred
              }"
              maxlength="100"
              required
            />
            <p v-if="!isEmailValid && isBlurred && email !== ''" class="text-red-600 text-xs mt-1 font-semibold">
              Invalid email format
            </p>
          </div>

          <!-- Password -->
          <div class="mb-2.5 pr-1 relative">
            <label class="block text-evGray text-sm mb-1" for="password">Password<span class="text-evPurple text-base ml-1">*</span></label>
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              id="password"
              placeholder="Enter your password"
              class="ev-input focus:ring-1 focus:ring-purple-800"
              maxlength="100"
              required
            />
            <button type="button" @click="togglePasswordVisibility" class="absolute mt-0.5 inset-y-11 right-0 pr-3 flex items-center">
              <font-awesome-icon :icon="showPassword ? ['far', 'eye-slash'] : ['far', 'eye']" class="text-evPurple text-lg" />
            </button>
          </div>

          <!-- Referral Code -->
          <div class="mb-4 pr-1">
            <label class="block text-evGray text-sm mb-1" for="referralCode">Referral Code</label>
            <input v-model="referralCode" type="text" id="referralCode" placeholder="Enter referral code" class="ev-input focus:ring-1 focus:ring-purple-800" />
          </div>

          <!-- Checkbox for Terms and Conditions -->
          <div class="mb-3 pr-1 flex items-start">
            <button type="button" @click="agreedToTerms = !agreedToTerms" class="mr-2">
              <font-awesome-icon 
                :icon="agreedToTerms ? ['fas', 'square-check'] : ['far', 'square']" 
                class="text-evPurple text-lg" 
              />
            </button>
            <span class="text-evTextColor text-sm">
              I agree to the 
              <router-link to="" class="text-evPurple hover:text-evPurpleAlt text-sm underline">Terms and Conditions </router-link> and 
              <router-link to="" class="text-evPurple hover:text-evPurpleAlt text-sm underline">Privacy Policy</router-link>
            </span>
          </div>

          <div class="flex items-end justify-end mt-7">
            <EVPurpleButton 
              type="submit" 
              size="medium" 
              :disabled="!agreedToTerms" 
            >
              Continue
            </EVPurpleButton>
          </div>
          <div class="text-center border-t shadow-zinc-500 mb-6 mt-4 pt-4">
            <span class="text-sm text-evGray">Ready to Partner with us as an MSP? </span>
            <router-link to="" class="text-evPurple hover:text-evPurpleAlt text-sm font-semibold">Sign Up here</router-link>
          </div>
          <div class="text-center">
            <span class="text-sm">Already have an account? </span>
            <router-link to="/signin" class="text-evPurple hover:text-evPurpleAlt text-sm font-semibold">Sign In</router-link>
          </div>
        </form>
        <FooterText />
      </div>
      <Description widthClass="w-1/2" />
    </div>
  </div>
</template>

<script>
import EVPurpleButton from '@/components/common/EVPurpleButton.vue';
import Description from '@/components/registration/Description.vue';
import FooterText from '@/components/registration/FooterText.vue';

export default {
  components: {
    EVPurpleButton,
    Description,
    FooterText,
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      companyName: '',
      email: '',
      password: '',
      referralCode: '',
      isEmailValid: true,
      isBlurred: false,
      showPassword: false,
      agreedToTerms: false, // Added new property for checkbox
    };
  },
  methods: {
    handleSubmit() {
      // Your submit logic here
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    validateEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.isEmailValid = emailPattern.test(this.email);
    },
    handleBlur() {
      this.isBlurred = true;
      this.validateEmail();
    },
  },
};
</script>