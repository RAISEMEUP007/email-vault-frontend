<template>
  <div class="flex h-full items-center justify-center min-h-screen bg-gray-200 p-2">
    <div class="flex w-full max-w-1512px h-full max-h-982px">
      <div class="w-1/2 pt-24 pb-5 bg-white flex flex-col items-center justify-start p-2">
        <div class="flex-1 flex flex-col items-center justify-start">
          <div class="p-1 pt-6 pb-8 mb-4 w-full max-w-md">
            <h2 class="tracking-wide text-4xl font-black mt-20 mb-4">Email Verification</h2>
            <p class="mt-0.5 mb-5 text-lg pr-2">
              We’re almost set! A confirmation email was sent to <span class="font-semibold">“sarah.davis@nextgenlabs.com”.</span>
            </p>
            <p class="mt-0.5 mb-5 text-lg pr-2">
              To activate your account, just click on the link in the email. If you can’t locate it, please have a look in your spam folder.
            </p>
            <div class="mt-4 text-center border-t mt-12 pt-6">
              <span class="font-sm">Haven’t received any email? </span>
              <router-link class="text-evPurple hover:text-evPurpleAlt text-sm font-semibold">Resend Email</router-link>
            </div>
          </div>
          <div class="mt-4 text-center mt-12 max-w-lg">
            <span class="font-sm">Did you enter the wrong email address? Please reach out to us for assistance at </span>
            <router-link class="text-evPurple hover:text-evPurpleAlt text-sm font-semibold">support@emailvault.app</router-link>
          </div>
        </div>
        <FooterText/>
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
      code: ['', '', '', '', '', ''],
    };
  },

  methods: {
  },
};
</script>