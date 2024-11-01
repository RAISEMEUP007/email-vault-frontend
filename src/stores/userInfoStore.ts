// src/stores/userInfoStore.ts

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

// Define an interface for User Information
export interface UserInfo {
  id: string;
  name: string;
  email: string;
  // Add more user-specific fields as needed
}

export const useUserInfoStore = defineStore('userInfo', () => {
  // State variables
  const userInfo = ref<UserInfo | null>(null);

  // Computed property for checking if the user is authenticated
  const isAuthenticated = computed(() => {
    return userInfo.value !== null;
  });

  // Action to set user information
  const setUserInfo = (info: UserInfo) => {
    userInfo.value = info;
  };

  // Action to clear user information (logout)
  const clearUserInfo = () => {
    userInfo.value = null;
  };

  return {
    userInfo,
    isAuthenticated,
    setUserInfo,
    clearUserInfo,
  };
});
