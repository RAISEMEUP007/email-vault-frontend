<template>
  <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" @click="handleOutsideClick">

    <div class="flex flex-col bg-white rounded-lg p-6 w-full max-w-874px h-full max-h-467px" @click.stop>
      <h2 class="text-lg font-bold mb-4">Privacy and Policy</h2>
      <div class="whitespace-pre-wrap overflow-auto max-h-96 p-4 border rounded custom-scrollbar">
        {{ terms }}
      </div>
      <div class="flex items-end justify-end mt-4">
        <EVPurpleButton @click="close" size="medium">OK</EVPurpleButton>
      </div>
    </div>
  </div>
</template>

<script>
import EVPurpleButton from '@/components/common/EVPurpleButton.vue';

export default {
  components: {
    EVPurpleButton,
  },
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      terms: 'sdsd', 
    };
  },
  created() {
    this.loadTerms();
  },
  methods: {
    close() {
      this.$emit('close');
    },
    async loadTerms() {
      try {
        const response = await fetch('/privacy-and-policy.txt');
        if (!response.ok) throw new Error('Network response was not ok');
        this.terms = await response.text();
      } catch (error) {
        console.error('Error fetching terms:', error);
      }
    },
    handleOutsideClick(event) {
      const modal = this.$el.querySelector('.bg-white');
      if (!modal.contains(event.target)) {
        this.close();
      }
    },
  },
}
</script>
