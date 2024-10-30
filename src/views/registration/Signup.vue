<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useFormStore } from '@/stores/useFormStore';
import EVPurpleButton from '@/components/common/EVPurpleButton.vue';
import TermsAndConditionsModal from '@/components/common/TermsAndConditionsModal.vue';
import PrivacyAndPolicyModal from '@/components/common/PrivacyAndPolicyModal.vue';
import Description from '@/components/registration/Description.vue';
import FooterText from '@/components/registration/FooterText.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    EVPurpleButton,
    Description,
    FooterText,
    TermsAndConditionsModal,
    PrivacyAndPolicyModal,
  },

  setup() {
    const router = useRouter();
    const formStore = useFormStore(); 

    const showPassword = ref<boolean>(false);
    const agreedToTerms = ref<boolean>(false);
    const passwordFeedback = ref<boolean>(false);
    const isEmailValid = ref<boolean>(true);
    const isBlurred = ref<boolean>(false);

    // Password validation flags
    const validLength = ref<boolean>(false);
    const validUppercase = ref<boolean>(false);
    const validLowercase = ref<boolean>(false);
    const validNumber = ref<boolean>(false);
    const validSpecial = ref<boolean>(false);
    const isTermsModalVisible = ref<boolean>(false);
    const isPrivacyModalVisible = ref<boolean>(false);

    const isFormValid = computed(() => {
      return (
        formStore.firstName &&
        formStore.lastName &&
        formStore.companyName &&
        isEmailValid.value &&
        formStore.password &&
        agreedToTerms.value &&
        validatePasswordStrength()
      );
    });

    const validatePasswordStrength = () => {
      const password = formStore.password;
      return (
        (password.length >= 8) &&
        (/[A-Z]/.test(password)) &&
        (/[a-z]/.test(password)) &&
        (/\d/.test(password)) &&
        (/[@$!%*?&]/.test(password))
      );
    };

    const strength = computed(() => {
      let score = 0;
      const password = formStore.password;
      if (password.length >= 8) score += 20;
      if (/[A-Z]/.test(password)) score += 20;
      if (/[a-z]/.test(password)) score += 20;
      if (/\d/.test(password)) score += 20;
      if (/[@$!%*?&]/.test(password)) score += 20;

      return score;
    });

    const progressClass1 = computed(() => {
      if (strength.value === 0) return 'bg-transparent';
      if (strength.value <= 40) return 'bg-evError';
      if (strength.value <= 80) return 'bg-evWarning';
      return 'bg-evSuccess';
    });

    const progressClass2 = computed(() => {
      if (strength.value === 0) return 'bg-transparent';
      if (strength.value <= 40) return 'bg-evLight';
      if (strength.value <= 80) return 'bg-evWarning';
      return 'bg-evSuccess';
    });

    const progressClass3 = computed(() => {
      if (strength.value === 0) return 'bg-transparent';
      if (strength.value <= 40) return 'bg-evLight';
      if (strength.value <= 80) return 'bg-evLight';
      return 'bg-evSuccess';
    });

    const handleSubmit = () => {
      router.push('/addbillingmethod');
    };

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const validateEmail = () => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isEmailValid.value = emailPattern.test(formStore.email);
    };

    const handleBlur = () => {
      isBlurred.value = true;
      validateEmail();
    };

    const validatePassword = () => {
      const password = formStore.password;

      passwordFeedback.value = password.length > 0;

      validLength.value = password.length >= 8;
      validUppercase.value = /[A-Z]/.test(password);
      validLowercase.value = /[a-z]/.test(password);
      validNumber.value = /\d/.test(password);
      validSpecial.value = /[@$!%*?&]/.test(password);
    };

    const openTermsModal = () => {
      isTermsModalVisible.value = true;
    };

    const closeTermsModal = () => {
      isTermsModalVisible.value = false;
    };

    const openPrivacyModal = () => {
      isPrivacyModalVisible.value = true;
    };

    const closePrivacyModal = () => {
      isPrivacyModalVisible.value = false;
    };

    return {
      formStore,
      showPassword,
      agreedToTerms,
      passwordFeedback,
      isEmailValid,
      isBlurred,
      validLength,
      validUppercase,
      validLowercase,
      validNumber,
      validSpecial,
      isTermsModalVisible,
      isPrivacyModalVisible,
      isFormValid,
      handleSubmit,
      togglePasswordVisibility,
      validateEmail,
      handleBlur,
      validatePassword,
      openTermsModal,
      closeTermsModal,
      openPrivacyModal,
      closePrivacyModal,
      strength,
      progressClass1,
      progressClass2,
      progressClass3,
    };
  },
});
</script>

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
            <input v-model="formStore.firstName" type="text" id="firstName" placeholder="Enter your first name" class="ev-input focus:ring-1 focus:ring-purple-800" maxlength="100" required />
          </div>

          <!-- Last Name -->
          <div class="mb-2.5 pr-1">
            <label class="block text-evGray text-sm mb-1" for="lastName">Last Name<span class="text-evPurple text-base ml-1">*</span></label>
            <input v-model="formStore.lastName" type="text" id="lastName" placeholder="Enter your last name" class="ev-input focus:ring-1 focus:ring-purple-800" maxlength="100" required />
          </div>

          <!-- Company Name -->
          <div class="mb-2.5 pr-1">
            <label class="block text-evGray text-sm mb-1" for="companyName">Company Name<span class="text-evPurple text-base ml-1">*</span></label>
            <input v-model="formStore.companyName" type="text" id="companyName" placeholder="Enter your company name" class="ev-input focus:ring-1 focus:ring-purple-800" maxlength="100" required />
          </div>

          <!-- Email -->
          <div class="mb-2.5 pr-1">
            <label class="block text-evGray text-sm mb-1" for="email">Email<span class="text-evPurple text-base ml-1">*</span></label>
            <input
              v-model="formStore.email"
              type="email"
              id="email"
              placeholder="Enter your email"
              class="ev-input focus:ring-1 focus:ring-purple-800"
              @blur="handleBlur"
              @focus="isBlurred = true"
              :class="{'border-red-500': !isEmailValid && isBlurred && formStore.email !== ''}"
              maxlength="100"
              required
            />
            <p v-if="!isEmailValid && isBlurred && formStore.email !== ''" class="text-evError text-xs mt-1 font-semibold">
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
              v-model="formStore.password"
              :type="showPassword ? 'text' : 'password'"
              id="password"
              placeholder="Enter your password"
              class="ev-input pr-8 focus:ring-1 focus:ring-purple-800"
              maxlength="100"
              required
              @input="validatePassword"
              @blur="passwordFeedback=false"
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
            <input v-model="formStore.referralCode" type="text" id="referralCode" placeholder="Enter referral code" class="ev-input focus:ring-1 focus:ring-purple-800" maxlength="12"/>
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