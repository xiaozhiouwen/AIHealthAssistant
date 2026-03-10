<!-- src/components/layout/Navigation.vue -->
<template>
  <nav class="navigation">
    <router-link
        to="/"
        class="nav-button bilibili-nav-button"
        :class="{ active: $route.name === 'Dashboard' }"
    >
      首页
    </router-link>
    <router-link
        to="/recipes"
        class="nav-button bilibili-nav-button"
        :class="{ active: $route.name === 'Recipes' }"
    >
      食谱推荐
    </router-link>
    <router-link
        to="/diary"
        class="nav-button bilibili-nav-button"
        :class="{ active: $route.name === 'Diary' }"
    >
      饮食日记
    </router-link>
    <router-link
        to="/profile"
        class="nav-button bilibili-nav-button"
        :class="{ active: $route.name === 'Profile' }"
    >
      个人档案
    </router-link>
    <router-link
        to="/ai-consult"
        class="nav-button bilibili-nav-button"
        :class="{ active: $route.name === 'AIConsult' }"
    >
      AI咨询
    </router-link>
    <router-link
        to="/fitness"
        class="nav-button bilibili-nav-button"
        :class="{ active: $route.name === 'Fitness' }"
    >
      健身记录
    </router-link>
    <router-link
        to="/mental-health"
        class="nav-button bilibili-nav-button"
        :class="{ active: $route.name === 'MentalHealth' }"
    >
      心理陪伴
    </router-link>
  </nav>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

* {
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Inter', 'Segoe UI', Roboto, sans-serif;
}

.navigation {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  padding: 0 48px;
  box-shadow: 
    0 1px 0 rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  position: fixed;
  top: 52px;
  left: 0;
  z-index: 999;
}

.nav-button {
  padding: 16px 20px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  margin: 0;
  text-decoration: none;
  color: #1d1d1f;
  border-radius: 0;
  position: relative;
  letter-spacing: -0.2px;
}

.nav-button::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: #007aff;
  transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  transform: translateX(-50%);
}

.nav-button:hover {
  color: #007aff;
}

.nav-button:hover::after {
  width: 100%;
}

.nav-button.active {
  color: #007aff;
}

.nav-button.active::after {
  width: 100%;
}

@media (max-width: 768px) {
  .navigation {
    padding: 0 20px;
    overflow-x: auto;
    justify-content: flex-start;
    -webkit-overflow-scrolling: touch;
    top: 48px;
  }

  .nav-button {
    white-space: nowrap;
    padding: 14px 16px;
    font-size: 13px;
  }
}

.navigation::-webkit-scrollbar {
  height: 0;
}

.navigation::-webkit-scrollbar-track {
  background: transparent;
}

.navigation::-webkit-scrollbar-thumb {
  background: transparent;
}
</style>