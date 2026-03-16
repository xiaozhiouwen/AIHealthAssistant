<!-- src/components/dashboard/QuickActions.vue -->
<template>
  <section class="quick-actions">
    <h3>快捷操作</h3>
    <div class="action-buttons">
      <button class="action-btn" @click="$router.push('/diary')">
        记录今日饮食
      </button>
      <button class="action-btn">
        查看营养分析
      </button>
      <button class="action-btn" @click="$router.push('/recipes')">
        获取新食谱
      </button>
    </div>
  </section>
</template>

<style scoped>
.quick-actions {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.quick-actions h3 {
  color: #333;
  margin-bottom: 1.5rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.action-btn {
  flex: 1;
  min-width: 150px;
  background: #667eea;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
  text-align: center;
}

.action-btn:hover {
  background: #5a6fd8;
}

@media (max-width: 768px) {
  .action-buttons {
    flex-direction: column;
  }
}
</style>
