<template>
  <div class="chart-container card">
    <h3 class="chart-title">{{ title }}</h3>
    <v-chart class="chart" :option="option" autoresize />
  </div>
</template>

<script setup>

defineProps({
  title: {
    type: String,
    required: true,
  },
  option: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.chart-container {
  padding: 20px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.chart-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

.chart {
  height: 350px;
}
</style>
