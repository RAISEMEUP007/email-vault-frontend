<template>
  <div :class="['pt-24 pb-32 gradient-bg', widthClass]">
    <div class="p-8 flex flex-col row items-center justify-center text-white">
      <img src="@/assets/img/1.png" alt="Welcome Image" class="mt-5 rounded shadow-md" />
      <div class="max-w-sm">
        <h1 class="text-center tracking-wide text-4xl font-black mt-14 mb-10">Email Vault</h1>
        <p class="text-center text-xl">
          Our email journaling solution grants you security, compliance, and peace of mind.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Description',
  props: {
    widthClass: {
      type: String,
      default: '',
    },
  },
};
</script>