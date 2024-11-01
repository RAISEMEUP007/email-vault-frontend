<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'EVOutlineButton',
  props: {
    type: {
      type: String,
      default: 'button',
    },
    size: {
      type: String,
      default: 'medium',
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonClasses() {
      const baseClasses = 'rounded focus:outline-none focus:ring transition duration-200 ease-in-out h-9';

      const sizeClasses = {
        small: 'py-1 px-10 text-xs',
        medium: 'py-2 px-11 text-sm',
        large: 'py-3 px-12 text-lg',
      };
      
      const disabledClasses = this.disabled
        ? 'border-gray-400 text-gray-400 cursor-not-allowed'
        : 'border-black text-black hover:bg-gray-700 hover:text-white transition-colors';

      return `${baseClasses} ${sizeClasses[this.size]} border ${disabledClasses}`;
    },
  },
  methods: {
    handleClick(event) {
      if (!this.disabled) {
        this.$emit('click', event);
      }
    },
  },
};
</script>

<style scoped>
/* Add any additional styles you'd like here */
</style>
