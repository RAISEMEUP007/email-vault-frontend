<template>
  <div class="flex h-full items-center justify-center min-h-screen bg-gray-200 p-2">
    <div class="flex w-full max-w-1512px h-full max-h-982px">
      <div class="w-1/2 pt-24 pb-32 bg-white flex justify-center">
        <form @submit.prevent="handleSubmit" class="px-20 pt-6 pb-8 mb-4 w-full">
          <h2 class="tracking-wide text-4xl font-black mt-20 mb-4">Multi-Factor Authentication</h2>
          <p class="mt-0.5 mb-5 text-sm pr-2">
            Please enter the confirmation code you see on your authentication app.
          </p>

          <!-- 6-letter 2FA Input -->
          <div class="mb-6 flex justify-between">
            <template v-for="index in 6" :key="index">
              <input
                v-model="code[index - 1]"
                @keyup="handleKeyup(index - 1)"
                type="text"
                class="w-88px h-88px text-5xl text-center border border-gray-300 rounded focus:ring focus:ring-evPurple focus:border-evPurple"
                maxlength="1"
                :ref="'input' + (index - 1)"
              />
            </template>
          </div>

          <div class="mb-4">
            <router-link class="text-evPurple hover:text-evPurpleAlt font-bold underline">Use Recovery Code</router-link>
          </div>

          <div class="flex items-end justify-end mt-7">
            <EVPurpleButton type="submit" size="medium">Verify</EVPurpleButton>
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
      code: ['', '', '', '', '', ''],
    };
  },

  methods: {
    handleSubmit() {
      const verificationCode = this.code.join('');
      console.log(`Verification Code: ${verificationCode}`);
      this.code = ['', '', '', '', '', ''];
    },

    handleKeyup(index) {
      if (this.code[index] && index < 5) {
        this.$refs['input' + (index + 1)].focus();
      } 
      else if (!this.code[index] && index > 0 && event.key === 'Backspace') {
        this.$refs['input' + (index - 1)].focus();
      }
    },
  },
};
</script>