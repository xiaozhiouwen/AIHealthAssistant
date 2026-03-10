<!-- src/components/dashboard/HealthTips.vue -->
<template>
  <section class="tips-section">
    <h3>健康小贴士</h3>
    <div class="tip-card" v-for="(tip, index) in tips" :key="index">
      <h4>{{ tip.healthGoal || '健康建议' }}</h4>
      <p>{{ tip.tip || '均衡饮食是健康的基础，注意荤素搭配，每天摄入12种以上食物。' }}</p>
    </div>
  </section>
</template>

<script setup>
defineProps({
  tips: {
    type: Array,
    default: () => []
  }
});
</script>

<style scoped>
.tips-section {
  margin-bottom: 2rem;
}

.tips-section h3 {
  color: #333;
  margin-bottom: 1rem;
}

.tip-card {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 1rem;
}

.tip-card h4 {
  color: #333;
  margin-bottom: 0.5rem;
}

.tip-card p {
  color: #666;
  line-height: 1.6;
}
</style>
