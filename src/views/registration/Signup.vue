<template>
  <div class="flex flex-col h-full items-center justify-center min-h-screen bg-gray-200 p-2">
    <div class="flex-1 flex w-full max-w-1512px h-full max-h-982px">
      <div class="w-1/2 pt-6 pb-5 bg-white flex flex-col items-center">
        <form @submit.prevent="handleSubmit" class="flex-1 pt-16 px-1 w-full max-w-md">
          <h2 class="tracking-wide text-4xl font-black mt-4 mb-6">Create Account</h2>
          <p class="mt-0.5 mb-4 text-sm pr-2">
            Welcome to Email Vault, please enter your details below to create an account.
          </p>
          
          <!-- First Name -->
          <div class="mb-2.5 pr-1">
            <label class="block text-evGray text-sm mb-1" for="firstName">First Name<span class="text-evPurple text-base ml-1">*</span></label>
            <input v-model="firstName" type="text" id="firstName" placeholder="Enter your first name" class="ev-input focus:ring-1 focus:ring-purple-800" maxlength="100" required />
          </div>

          <!-- Last Name -->
          <div class="mb-2.5 pr-1">
            <label class="block text-evGray text-sm mb-1" for="lastName">Last Name<span class="text-evPurple text-base ml-1">*</span></label>
            <input v-model="lastName" type="text" id="lastName" placeholder="Enter your last name" class="ev-input focus:ring-1 focus:ring-purple-800" maxlength="100" required />
          </div>

          <!-- Company Name -->
          <div class="mb-2.5 pr-1">
            <label class="block text-evGray text-sm mb-1" for="companyName">Company Name<span class="text-evPurple text-base ml-1">*</span></label>
            <input v-model="companyName" type="text" id="companyName" placeholder="Enter your company name" class="ev-input focus:ring-1 focus:ring-purple-800" maxlength="100" required />
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
              :class="{'border-red-500': !isEmailValid && isBlurred && email !== ''}"
              maxlength="100"
              required
            />
            <p v-if="!isEmailValid && isBlurred && email !== ''" class="text-evError text-xs mt-1 font-semibold">
              Invalid email format
            </p>
          </div>

          <div class="mb-2.5 pr-1 relative">
            <div class="flex flex-row items-center justify-between">
              <label class="block text-evGray text-sm mb-1" for="password">
                Password<span class="text-evPurple text-base ml-1">*</span>
              </label>

              <!-- Progress Bar -->
              <div class="h-1 rounded flex">
                  <div
                      :class="['h-full w-9 ml-1 rounded', progressClass1, 'transition-all duration-300']"
                  ></div>
                  <div
                      :class="['h-full w-9 ml-1 rounded', progressClass2, 'transition-all duration-300']"
                  ></div>
                  <div
                      :class="['h-full w-9 ml-1 rounded', progressClass3, 'transition-all duration-300']"
                  ></div>
              </div>

            </div>
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              id="password"
              placeholder="Enter your password"
              class="ev-input pr-8 focus:ring-1 focus:ring-purple-800"
              maxlength="100"
              required
              @input="validatePassword"
              @blur="Blurpassword"
            />

            <button type="button" @click="togglePasswordVisibility" class="absolute top-38px right-0 pr-3 flex items-center">
              <font-awesome-icon :icon="showPassword ? ['far', 'eye-slash'] : ['far', 'eye']" class="text-evPurple text-lg" />
            </button>

            <!-- Tooltip for Password Validation -->
            <div v-if="passwordFeedback" class="absolute bg-white border p-3 rounded shadow-lg text-xs mt-1 w-72 left-full top-0">
              <p class="mt-1 mb-2 text-xs pr-2 font-bold">
                Please fulfill the below requirements:
              </p>
              <p class="flex items-center font-semibold mt-2.5 justify-between">
                <span :class="validLength ? 'text-evSuccess' : 'text-evError'">At least 8 characters</span>
                <font-awesome-icon :icon="validLength ? ['fas', 'circle-check'] : ['fas', 'circle-xmark']" :class="{'text-evSuccess': validLength, 'text-evError': !validLength}" />
              </p>

              <p class="flex items-center font-semibold mt-2 justify-between">
                <span :class="validUppercase ? 'text-evSuccess' : 'text-evError'">At least 1 uppercase letter</span>
                <font-awesome-icon :icon="validUppercase ? ['fas', 'circle-check'] : ['fas', 'circle-xmark']" :class="{'text-evSuccess': validUppercase, 'text-evError': !validUppercase}" />
              </p>

              <p class="flex items-center font-semibold mt-2 justify-between">
                <span :class="validLowercase ? 'text-evSuccess' : 'text-evError'">At least 1 lowercase letter</span>
                <font-awesome-icon :icon="validLowercase ? ['fas', 'circle-check'] : ['fas', 'circle-xmark']" :class="{'text-evSuccess': validLowercase, 'text-evError': !validLowercase}" />
              </p>

              <p class="flex items-center font-semibold mt-2 justify-between">
                <span :class="validNumber ? 'text-evSuccess' : 'text-evError'">At least 1 number</span>
                <font-awesome-icon :icon="validNumber ? ['fas', 'circle-check'] : ['fas', 'circle-xmark']" :class="{'text-evSuccess': validNumber, 'text-evError': !validNumber}" />
              </p>

              <p class="flex items-center font-semibold mt-2 justify-between">
                <span :class="validSpecial ? 'text-evSuccess' : 'text-evError'">At least 1 special character</span>
                <font-awesome-icon :icon="validSpecial ? ['fas', 'circle-check'] : ['fas', 'circle-xmark']" :class="{'text-evSuccess': validSpecial, 'text-evError': !validSpecial}" />
              </p>
            </div>
          </div>


          <!-- Referral Code -->
          <div class="mb-5 pr-1">
            <label class="block text-evGray text-sm mb-1" for="referralCode">Referral Code</label>
            <input v-model="referralCode" type="text" id="referralCode" placeholder="Enter referral code" class="ev-input focus:ring-1 focus:ring-purple-800" maxlength="12"/>
          </div>

          <!-- Checkbox for Terms and Conditions -->
          <div class="mb-3 pr-1 flex items-start">
            <button type="button" @click="agreedToTerms = !agreedToTerms" class="mr-2">
              <font-awesome-icon :icon="agreedToTerms ? ['fas', 'square-check'] : ['far', 'square']" class="text-evPurple text-lg" />
            </button>
            <span class="text-evTextColor text-sm">
              I agree to the 
              <button type="button" @click="openTermsModal" class="text-evPurple hover:text-evPurpleAlt text-sm underline">Terms and Conditions</button>
              and 
              <button type="button" @click="openPrivacyModal" class="text-evPurple hover:text-evPurpleAlt text-sm underline">Privacy Policy</button>
            </span>
          </div>

          <div class="flex items-end justify-end mt-7">
            <EVPurpleButton type="submit" size="medium" :disabled="!isFormValid">Continue</EVPurpleButton>
          </div>

          <div class="text-center border-t mb-6 mt-4 pt-4">
            <span class="text-sm text-evGray">Ready to Partner with us as an MSP? </span>
            <router-link to="" class="text-evPurple hover:text-evPurpleAlt text-sm font-semibold">Sign Up here</router-link>
          </div>

          <div class="text-center mb-6">
            <span class="text-sm">Already have an account? </span>
            <router-link to="/signin" class="text-evPurple hover:text-evPurpleAlt text-sm font-semibold">Sign In</router-link>
          </div>
        </form>
        <FooterText />
      </div>

      <Description widthClass="w-1/2" />
    </div>

    <TermsAndConditionsModal :isVisible="isTermsModalVisible" @close="closeTermsModal" />
    <PrivacyAndPolicyModal :isVisible="isPrivacyModalVisible" @close="closePrivacyModal" />
  </div>
</template>

<script>
import EVPurpleButton from '@/components/common/EVPurpleButton.vue';
import TermsAndConditionsModal from '@/components/common/TermsAndConditionsModal.vue';
import PrivacyAndPolicyModal from '@/components/common/TermsAndConditionsModal.vue';
import Description from '@/components/registration/Description.vue';
import FooterText from '@/components/registration/FooterText.vue';

export default {
  components: {
    EVPurpleButton,
    Description,
    FooterText,
    TermsAndConditionsModal,
    PrivacyAndPolicyModal,
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
      agreedToTerms: false,
      validLength: false,
      validUppercase: false,
      validLowercase: false,
      validNumber: false,
      validSpecial: false,
      passwordFeedback: false,
      isTermsModalVisible: false,
      isPrivacyModalVisible: false,
    };
  },
  
  computed: {
    isFormValid() {
      return (
        this.firstName &&
        this.lastName &&
        this.companyName &&
        this.isEmailValid &&
        this.password &&
        this.agreedToTerms &&
        this.validLength &&
        this.validUppercase &&
        this.validLowercase &&
        this.validNumber &&
        this.validSpecial
      );
    },
    strength() {
      let score = 0;
      if (this.password.length >= 8) score += 20; // Length
      if (/[A-Z]/.test(this.password)) score += 20; // Uppercase
      if (/[a-z]/.test(this.password)) score += 20; // Lowercase
      if (/\d/.test(this.password)) score += 20; // Number
      if (/[@$!%*?&]/.test(this.password)) score += 20; // Special character

      return score;
    },
    progressClass1() {
      if (this.strength == 0) return 'bg-transparent'
      if (this.strength <= 40) return 'bg-evError';
      if (this.strength <= 80) return 'bg-evWarning';
      return 'bg-evSuccess';
    },
    progressClass2() {
      if (this.strength == 0) return 'bg-transparent'
      if (this.strength <= 40) return 'bg-evLight';
      if (this.strength <= 80) return 'bg-evWarning';
      return 'bg-evSuccess';
    },
    progressClass3() {
      if (this.strength == 0) return 'bg-transparent'
      if (this.strength <= 40) return 'bg-evLight';
      if (this.strength <= 80) return 'bg-evLight';
      return 'bg-evSuccess';
    },
  },
  
  methods: {
    handleSubmit() {
      // Your submit logic here
      console.log('Form submitted with:', {
        firstName: this.firstName,
        lastName: this.lastName,
        companyName: this.companyName,
        email: this.email,
        password: this.password,
        referralCode: this.referralCode,
      });
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

    validatePassword() {
      const passwordPattern = {
        length: /.{8,}/,
        uppercase: /[A-Z]/,
        lowercase: /[a-z]/,
        number: /[0-9]/,
        special: /[!@#$%^&*(),.?":{}|<>]/, // Adjust special characters as needed
      };

      this.validLength = passwordPattern.length.test(this.password);
      this.validUppercase = passwordPattern.uppercase.test(this.password);
      this.validLowercase = passwordPattern.lowercase.test(this.password);
      this.validNumber = passwordPattern.number.test(this.password);
      this.validSpecial = passwordPattern.special.test(this.password);
      
      // Show the feedback tooltip if the password is being typed
      this.passwordFeedback = this.password.length > 0;
    },
    Blurpassword() {
      this.passwordFeedback = false
    },
    openTermsModal() {
      this.isTermsModalVisible = true;
    },
    closeTermsModal() {
      this.isTermsModalVisible = false;
    },
    openPrivacyModal() {
      this.isPrivacyModalVisible = true;
    },
    closePrivacyModal() {
      this.isPrivacyModalVisible = false;
    },
  },
};
</script>