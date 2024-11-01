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
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonClasses() {
      const baseClasses = 'rounded focus:outline-none focus:ring transition duration-200 ease-in-out';
      
      const sizeClasses = {
        small: 'py-1 px-10 text-xs',
        medium: 'py-2 px-11 text-sm',
        large: 'py-3 px-12 text-lg',
      };

      const disabledClasses = this.disabled 
        ? 'bg-evPurpleDisable cursor-not-allowed text-white'
        : 'bg-evPurple hover:bg-evPurpleAlt text-white evPurpleButtonShadow';

      return `${baseClasses} ${sizeClasses[this.size]} ${disabledClasses}`;
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
.evPurpleButtonShadow{
  box-shadow: 0px 4px 4px 0px #00000040;
}
</style>