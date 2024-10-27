<template>
  <button
    :type="type"
    :class="buttonClasses"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'EVPurpleButton',
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
  },
  computed: {
    buttonClasses() {
      const baseClasses = 'bg-evPurple hover:bg-evPurpleAlt text-white rounded focus:outline-none focus:ring transition duration-200 ease-in-out';
      const sizeClasses = {
        small: 'py-1 px-10 text-xs',
        medium: 'py-2 px-11 text-sm',
        large: 'py-3 px-12 text-lg',
      };
      return `${baseClasses} ${sizeClasses[this.size]}`;
    },
  },
};
</script>