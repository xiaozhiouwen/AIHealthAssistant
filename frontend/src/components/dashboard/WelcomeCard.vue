<!-- src/components/dashboard/WelcomeCard.vue -->
<template>
  <section class="welcome-section">
    <h2>{{ greeting }}, {{ userStore.userData.userId }}！</h2>
    <p v-if="userStore.userData.goal">今日健康目标：{{ userStore.userData.goal }}</p>
    <p v-else>开始您的健康之旅吧！</p>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from '../../stores/userStore';

const userStore = useUserStore();

// 根据时间显示不同的问候语
const greeting = computed(() => {
  const hour = new Date().getHours();
  if (hour < 12) {
    return '早上好';
  } else if (hour < 18) {
    return '下午好';
  } else {
    return '晚上好';
  }
});
</script>

<style scoped>
.welcome-section {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
  text-align: center;
}

.welcome-section h2 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.welcome-section p {
  color: #666;
  font-size: 1.1rem;
}
</style>
