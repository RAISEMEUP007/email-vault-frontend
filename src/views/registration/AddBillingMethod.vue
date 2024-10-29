<template>
  <div class="flex flex-col h-full items-center justify-center min-h-screen bg-gray-200 p-2">
    <div class="flex-1 flex w-full max-w-1512px h-full max-h-982px">
      <div class="w-1/2 pt-6 pb-5 bg-white flex flex-col items-center">
        <form @submit.prevent="handleSubmit" class="flex-1 pt-36 px-1 w-full max-w-md">
          <h2 class="tracking-wide text-4xl font-black mt-4 mb-6">Add Billing Method</h2>
          <p class="mt-0.5 mb-4 text-sm pr-2">Please enter your billing details below</p>

          <!-- Name -->
          <div class="mb-3 pr-1">
            <label class="block text-evGray text-sm mb-1" for="firstName">Name on card<span class="text-evPurple text-base ml-1">*</span></label>
            <input v-model="name" type="text" id="firstName" placeholder="Ex. Adam" class="ev-input focus:ring-1 focus:ring-purple-800" maxlength="100" required />
          </div>

          <!-- Card Number -->
          <div class="mb-3 pr-1 relative">
            <label class="block text-evGray text-sm mb-1" for="cardNumber">Card Number<span class="text-evPurple text-base ml-1">*</span></label>
            <div class="absolute left-1 top-9">
              <img :src="currentCardIcon" alt="Card Icon" class="text-evPurple" style="height: 24px;" />
            </div>
            <input :value="formattedCardNumber" @input="updateCardNumber" type="text" id="cardNumber" placeholder="1234 5678 9012 3456" class="ev-input focus:ring-1 focus:ring-purple-800 pl-10" maxlength="19" required @blur="validateCardNumber" />
            <div v-if="cardError" class="text-evError text-xs mt-1 font-semibold">{{ cardError }}</div>
          </div>

          <!-- Expiration Date -->
          <div class="flex mb-3 pr-1">
            <div class="w-1/2 pr-1">
              <label class="block text-evGray text-sm mb-1" for="expirationDate">Expiration Date<span class="text-evPurple text-base ml-1">*</span></label>
              <input v-model="expirationDate" type="text" id="expirationDate" placeholder="MM/YY" class="ev-input focus:ring-1 focus:ring-purple-800" maxlength="5" required @blur="validateExpirationDate" />
              <div v-if="expirationError" class="text-evError text-xs mt-1 font-semibold">{{ expirationError }}</div>
            </div>
            <div class="w-1/2 pl-1">
              <label class="block text-evGray text-sm mb-1" for="cvv">CVV<span class="text-evPurple text-base ml-1">*</span></label>
              <input v-model="cvv" type="text" id="cvv" placeholder="123" class="ev-input focus:ring-1 focus:ring-purple-800" maxlength="4" required @blur="validateCVV" />
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

<script>
import EVPurpleButton from '@/components/common/EVPurpleButton.vue';
import EVOutlineButton from '@/components/common/EVOutlineButton.vue';
import Description from '@/components/registration/Description.vue';
import FooterText from '@/components/registration/FooterText.vue';
import visaIcon from '@/assets/icons/visa.ico';
import mastercardIcon from '@/assets/icons/mastercard.ico';
import americanIcon from '@/assets/icons/american.ico';
import creditCardIcon from '@/assets/icons/credit-card.ico';

export default {
  components: {
    EVPurpleButton,
    Description,
    FooterText,
    EVOutlineButton,
  },
  data() {
    return {
      name: '',
      cardNumber: '',
      expirationDate: '',
      cvv: '',
      cardError: '',
      expirationError: '',
      cvvError: '',
      agreedToTerms: false,
    };
  },
  computed: {
    currentCardIcon() {
    const cardNumber = this.cardNumber.replace(/\s/g, ''); // Remove spaces
    const firstFourDigits = cardNumber.slice(0, 4); // Get the first four digits

    // Use the first four digits to determine the card type
    if (firstFourDigits.startsWith('4')) {
      return visaIcon; // Visa
    } else if (firstFourDigits.startsWith('51') || firstFourDigits.startsWith('52') ||
               firstFourDigits.startsWith('53') || firstFourDigits.startsWith('54') ||
               firstFourDigits.startsWith('55')) {
      return mastercardIcon; // MasterCard
    } else if (firstFourDigits.startsWith('34') || firstFourDigits.startsWith('37')) {
      return americanIcon; // American Express
    }

    // Fallback icon if no card type matches
    return creditCardIcon; // Default icon
  },
    formattedCardNumber() {
      return this.cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
    },
    isFormValid() {
      return this.name && this.cardNumber && !this.cardError && this.expirationDate && !this.expirationError && this.cvv && !this.cvvError;
    },
  },
  methods: {
    handleSubmit() {
      console.log('Form submitted:', {
        name: this.name,
        cardNumber: this.cardNumber,
        expirationDate: this.expirationDate,
        cvv: this.cvv,
      });
    },
    updateCardNumber(event) {
      const input = event.target.value.replace(/\D/g, '');
      this.cardNumber = input.slice(0, 16);
    },
    validateCardNumber() {
      const cardNumber = this.cardNumber.replace(/\s/g, '');
      if (!/^\d{16}$/.test(cardNumber)) {
        this.cardError = 'Invalid card number. Must be 16 digits.';
      } else {
        this.cardError = '';
      }
    },
    validateExpirationDate() {
      const [month, year] = this.expirationDate.split('/');
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;

      if (!month || !year || month < 1 || month > 12 || year < currentYear || (year === currentYear && month < currentMonth)) {
        this.expirationError = 'Invalid expiration date.';
      } else {
        this.expirationError = '';
      }
    },
    validateCVV() {
      if (!/^\d{3,4}$/.test(this.cvv)) {
        this.cvvError = 'CVV must be 3 or 4 digits.';
      } else {
        this.cvvError = '';
      }
    },
    handleBackClick() {
      this.$router.push('/signup'); // Navigates to the /signup route
    }
  },
};
</script>
