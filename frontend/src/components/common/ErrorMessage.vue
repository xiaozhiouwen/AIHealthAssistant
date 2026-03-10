<!-- src/components/common/ErrorMessage.vue -->
<template>
  <div v-if="message" class="error-message">
    {{ message }}
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: ''
  }
});
</script>

<style scoped>
.error-message {
  background: #f8d7da;
  color: #721c24;
  padding: 0.75rem;
  margin: 1rem;
  border-radius: 5px;
  text-align: center;
}
</style>
