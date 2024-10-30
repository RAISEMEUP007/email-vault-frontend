<template>
  <div class="flex flex-col h-full items-center justify-center min-h-screen bg-gray-200 p-2">
    <div class="flex-1 flex w-full max-w-1512px h-full max-h-982px">
      <div class="w-1/2 pt-6 pb-5 bg-white flex flex-col items-center">
        <form @submit.prevent="handleSubmit" class="flex-1 pt-36 px-1 w-full max-w-md">
          <h2 class="tracking-wide text-4xl font-black mt-4 mb-6">Add Billing Method</h2>
          <p class="mt-0.5 mb-4 text-sm pr-2">Please enter your billing details below</p>

          <!-- Name -->
          <div class="mb-3 pr-1">
            <label class="block text-evGray text-sm mb-1" for="firstName">
              Name on card<span class="text-evPurple text-base ml-1">*</span>
            </label>
            <input v-model="formStore.billingMethod.name" type="text" id="firstName" placeholder="Ex. Adam" class="ev-input focus:ring-1 focus:ring-purple-800" maxlength="100" required />
          </div>

          <!-- Card Number -->
          <div class="mb-3 pr-1 relative">
            <label class="block text-evGray text-sm mb-1" for="cardNumber">
              Card Number<span class="text-evPurple text-base ml-1">*</span>
            </label>
            <div class="absolute left-1 top-9">
              <img :src="currentCardIcon" alt="Card Icon" class="text-evPurple" style="height: 24px;" />
            </div>
            <input :value="formattedCardNumber" @input="updateCardNumber" type="text" id="cardNumber" placeholder="#### #### #### ####" class="ev-input focus:ring-1 focus:ring-purple-800 pl-10" maxlength="19" required @blur="validateCardNumber" />
            <div v-if="cardError" class="text-evError text-xs mt-1 font-semibold">{{ cardError }}</div>
          </div>

          <!-- Expiration Date -->
          <div class="flex mb-3 pr-1">
            <div class="w-1/2 pr-1">
              <label class="block text-evGray text-sm mb-1" for="expirationDate">
                Expiration Date<span class="text-evPurple text-base ml-1">*</span>
              </label>
              <input v-model="formStore.billingMethod.expirationDate" type="text" id="expirationDate" placeholder="MM/YY" class="ev-input focus:ring-1 focus:ring-purple-800" maxlength="5" required @blur="validateExpirationDate" />
              <div v-if="expirationError" class="text-evError text-xs mt-1 font-semibold">{{ expirationError }}</div>
            </div>
            <div class="w-1/2 pl-1">
              <label class="block text-evGray text-sm mb-1" for="cvv">
                CVV<span class="text-evPurple text-base ml-1">*</span>
              </label>
              <input v-model="formStore.billingMethod.cvv" type="text" id="cvv" placeholder="123" class="ev-input focus:ring-1 focus:ring-purple-800" maxlength="4" required @blur="validateCVV" />
              <div v-if="cvvError" class="text-evError text-xs mt-1 font-semibold">{{ cvvError }}</div>
            </div>
          </div>

          <div class="mb-3 mt-6 pr-1 flex items-start">
            <font-awesome-icon :icon="['fas', 'circle-info']" class="text-evPurple text-base mt-0.5" />
            <span class="text-evTextColor text-sm ml-2">
              Your credit card will not be charged for 30 days. Cancel anytime in the next 30 days free of charge.
            </span>
          </div>

          <div class="flex items-end justify-end mt-8 pb-11 border-b">
            <EVOutlineButton type="button" size="medium" class="mr-3" @click="handleBackClick">Back</EVOutlineButton>
            <EVPurpleButton type="submit" size="medium" :disabled="!isFormValid">Sign Up</EVPurpleButton>
          </div>
        </form>
        <FooterText />
      </div>
      <Description widthClass="w-1/2" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import EVPurpleButton from '@/components/common/EVPurpleButton.vue';
import EVOutlineButton from '@/components/common/EVOutlineButton.vue';
import Description from '@/components/registration/Description.vue';
import FooterText from '@/components/registration/FooterText.vue';
import visaIcon from '@/assets/icons/visa.ico';
import mastercardIcon from '@/assets/icons/mastercard.ico';
import americanIcon from '@/assets/icons/american.ico';
import creditCardIcon from '@/assets/icons/credit-card.ico';
import { useRouter } from 'vue-router';
import { useFormStore, type BillingMethod } from '@/stores/useFormStore';
import axiosInstance from '@/utils/axios';

export default defineComponent({
  components: {
    EVPurpleButton,
    Description,
    FooterText,
    EVOutlineButton,
  },

  setup() {
    const router = useRouter();
    const formStore = useFormStore(); 
    
    const cardError = ref<string>('');
    const expirationError = ref<string>('');
    const cvvError = ref<string>('');

    // Check if form values are set; if not, navigate to signup
    const checkFormValues = () => {
      if (!formStore.firstName || !formStore.lastName || !formStore.companyName || !formStore.email || !formStore.password) {
        router.push('/signup');
      }
    };

    // Execute the check when the component is mounted
    onMounted(() => {
      checkFormValues();
    });
    
    const isFormValid = computed(() => {
      return formStore.billingMethod.name && formStore.billingMethod.cardNumber && !cardError.value && formStore.billingMethod.expirationDate && !expirationError.value && formStore.billingMethod.cvv && !cvvError.value;
    });

    // Computed properties
    const currentCardIcon = computed(() => {
      const cardNum = formStore.billingMethod.cardNumber.replace(/\s/g, ''); // Remove spaces
      const firstFourDigits = cardNum.slice(0, 4); // Get the first four digits

      if (firstFourDigits.startsWith('4')) {
        return visaIcon; // Visa
      } else if (['51', '52', '53', '54', '55'].some(prefix => firstFourDigits.startsWith(prefix))) {
        return mastercardIcon; // MasterCard
      } else if (['34', '37'].some(prefix => firstFourDigits.startsWith(prefix))) {
        return americanIcon; // American Express
      }

      return creditCardIcon; // Default icon
    });

    const formattedCardNumber = computed(() => {
      return formStore.billingMethod.cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
    });

    const handleSubmit = async () => {
      if (!isFormValid.value) {
        console.error('Form is invalid');
        return;
      }

      try {
        const response = await axiosInstance.post('/api/signup', {
          formStore
        });
      } catch (error) {
      }
    };


    const updateCardNumber = (event: Event) => {
      const input = (event.target as HTMLInputElement).value.replace(/\D/g, '');
      formStore.billingMethod.cardNumber = input.slice(0, 16);
    };

    const validateCardNumber = () => {
      const cardNum = formStore.billingMethod.cardNumber.replace(/\s/g, '');
      if (!/^\d{16}$/.test(cardNum)) {
        cardError.value = 'Invalid card number. Must be 16 digits.';
      } else {
        cardError.value = '';
      }
    };

    const validateExpirationDate = () => {
      const billingMethod: BillingMethod = formStore.billingMethod;

      if (billingMethod) {
        const [monthStr, yearStr] = billingMethod.expirationDate.split('/');

        const month = parseInt(monthStr);
        const year = parseInt(yearStr);

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100; // Get the last two digits of the current year.
        const currentMonth = currentDate.getMonth() + 1; // Months are zero-based in JavaScript.

        if (
          !month ||
          !year ||
          month < 1 || 
          month > 12 ||
          year < currentYear ||
          (year === currentYear && month < currentMonth)
        ) {
          expirationError.value = 'Invalid expiration date.';
        } else {
          expirationError.value = '';
        }
      } else {
        expirationError.value = 'Billing information not provided.';
      }
    };

    const validateCVV = () => {
      if (!/^\d{3,4}$/.test(formStore.billingMethod.cvv)) {
        cvvError.value = 'CVV must be 3 or 4 digits.';
      } else {
        cvvError.value = '';
      }
    };

    const handleBackClick = () => {
      router.push('/signup');
    };

    return {
      formStore,
      cardError,
      expirationError,
      cvvError,
      isFormValid,
      currentCardIcon,
      formattedCardNumber,
      handleSubmit,
      updateCardNumber,
      validateCardNumber,
      validateExpirationDate,
      validateCVV,
      handleBackClick,
    };
  },
});
</script>
