<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4">
      <div class="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 class="text-3xl font-bold mb-4">Welcome Back, {{ userName }}!</h1>
        <p class="text-gray-700 mb-6">
          We're glad to see you again. You can continue managing your emails securely.
        </p>
        <p class="text-gray-600 mb-6">
          Here are some options to get you started:
        </p>
        <ul class="list-disc list-inside mb-6">
          <li>Access your emails</li>
          <li>Update your profile</li>
          <li>Check notifications</li>
        </ul>
        
        <EVOutlineButton type="button" size="medium" class="mr-3" @click="signOut">Sign out</EVOutlineButton>
        
        <router-link to="/profile" class=""><EVPurpleButton type="button" size="medium">View Profile</EVPurpleButton></router-link>

      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed } from 'vue';
  import EVPurpleButton from '@/components/common/EVPurpleButton.vue';
  import EVOutlineButton from '@/components/common/EVOutlineButton.vue';
  import { useRouter } from 'vue-router';

  export default defineComponent({
    name: 'WelcomeBackPage',
    components: {
        EVPurpleButton,
        EVOutlineButton,
    },
    setup() {
      const router = useRouter();
      const userName = '';
      const signOut = () => {
        router.push('/signin');
      }; 
      return {
        userName,
        signOut
      };
    },
    
  });
  </script>
  
  <style scoped>
  /* Optional scoped styles for additional styling */
  h1 {
    font-size: 2.5rem; /* Adjusts the heading size */
  }
  </style>
  