<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="text-center">
      <h1 class="text-9xl font-extrabold text-gray-800">404</h1>
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">Oops! Page not found</h2>
      <p class="text-gray-600 mb-8">The page you're looking for does not exist.</p>
      <router-link to="/" class="px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-500">Go Login</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style scoped>
/* You can add additional styles here if necessary */
</style>
