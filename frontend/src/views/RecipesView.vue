<template>
  <div class="recipes-layout">
    <!-- 页面头部 -->
    <div class="page-header">
      <h1>🥗 健康食谱</h1>
      <div class="stats-bar">
        <span class="stat-item">探索营养美味，或让 AI 为您量身定制</span>
      </div>
    </div>
  
    <!-- 标签切换 -->
    <div class="tabs-container">
      <button 
        class="tab-btn" 
        :class="{ active: activeTab === 'all' }"
        @click="activeTab = 'all'">
        📋 推荐食谱
      </button>
      <button 
        class="tab-btn" 
        :class="{ active: activeTab === 'my' }"
        @click="activeTab = 'my'">
        ❤️ 我的食谱
        <span v-if="myRecipes.length > 0" class="count-badge">{{ myRecipes.length }}</span>
      </button>
    </div>

    <!-- AI智能推荐 - 只在推荐食谱标签下显示 -->
    <div v-if="activeTab === 'all'" class="card ai-recommendation-card">
      <div class="ai-header">
        <div class="ai-icon">🤖</div>
        <div class="ai-title-group">
          <h2>AI个性化食谱推荐</h2>
          <p class="ai-subtitle">根据您的健康档案和今日营养摄入，智能生成下一餐建议</p>
        </div>
      </div>
      
      <div class="ai-controls">
        <div class="meal-selector-wrapper">
          <label class="selector-label">
            <span class="label-icon">🍽️</span>
            <span>为哪一餐推荐？</span>
          </label>
          <div class="meal-options">
            <button 
              v-for="meal in mealOptions" 
              :key="meal.value"
              class="fitness-btn"
              :class="{ active: aiMealType === meal.value }"
              @click="aiMealType = meal.value"
            >
              <span class="meal-icon">{{ meal.icon }}</span>
              <span class="meal-name">{{ meal.label }}</span>
            </button>
          </div>
        </div>
        
        <button @click="getAIRecommendations" :disabled="aiLoading" class="btn ai-btn">
          <span class="btn-icon">{{ aiLoading ? '🧠' : '✨' }}</span>
          <span class="btn-text">{{ aiLoading ? 'AI思考中...' : '开始智能推荐' }}</span>
        </button>
      </div>
      
      <div class="ai-features">
        <div class="feature-item">
          <span class="feature-icon">📊</span>
          <span class="feature-text">分析营养摄入</span>
        </div>
        <div class="feature-item">
          <span class="feature-icon">🎯</span>
          <span class="feature-text">匹配健康目标</span>
        </div>
        <div class="feature-item">
          <span class="feature-icon">⚡</span>
          <span class="feature-text">实时智能生成</span>
        </div>
      </div>
      
      <!-- AI 推荐结果展示区域 -->
      <div v-if="aiRecommendations.length > 0" class="ai-results">
        <div class="ai-results-header">
          <h3>✨ AI 为您推荐以下食谱：</h3>
        </div>
        <div class="ai-recipes-grid">
          <div 
            class="card recipe-card ai-recommended" 
            v-for="recipe in aiRecommendations" 
            :key="recipe.id"
          >
            <div class="recipe-image">
              <img v-if="recipe.image" :src="recipe.image" :alt="recipe.name" class="recipe-img" />
              <div v-else class="image-placeholder">{{ getEmojiForRecipe(recipe.name) }}</div>
            </div>
            
            <div class="recipe-content">
              <h3 class="recipe-title">{{ recipe.name }}</h3>
              <p class="recipe-description">{{ recipe.description }}</p>
              
              <div class="recipe-tags">
                <span class="tag meal-type">{{ getMealTypeLabel(recipe.mealType) }}</span>
                <span class="tag calories">{{ recipe.calories }} kcal</span>
                <span class="tag ai-tag">🤖 AI 推荐</span>
              </div>
              
              <div class="recipe-meta">
                <div class="meta-item">
                  <span class="meta-label">蛋白质</span>
                  <span class="meta-value">{{ recipe.protein }}g</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">碳水</span>
                  <span class="meta-value">{{ recipe.carbs }}g</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">脂肪</span>
                  <span class="meta-value">{{ recipe.fat }}g</span>
                </div>
              </div>
              
              <div class="recipe-actions">
                <button class="btn detail-btn" @click.stop="viewRecipeDetails(recipe)">
                  📖 查看详情
                </button>
                <button class="btn add-btn" @click.stop="addToMyRecipes(recipe)">
                  ➕ 添加
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 食谱筛选 - 只在全部食谱标签下显示 -->
    <div v-if="activeTab === 'all'" class="card filter-card">
      <h2>🔍 筛选条件</h2>
      <div class="filters">
        <div class="filter-group">
          <label>餐别类型</label>
          <div class="filter-options">
            <button 
              v-for="mealType in mealTypes" 
              :key="mealType.value"
              class="fitness-btn"
              :class="{ active: selectedMealType === mealType.value }"
              @click="selectedMealType = mealType.value"
            >
              {{ mealType.label }}
            </button>
          </div>
        </div>
        
        <div class="filter-group">
          <label>热量范围</label>
          <div class="filter-options">
            <button 
              v-for="range in calorieRanges" 
              :key="range.value"
              class="fitness-btn"
              :class="{ active: selectedCalorieRange === range.value }"
              @click="selectedCalorieRange = range.value"
            >
              {{ range.label }}
            </button>
          </div>
        </div>
        
        <div class="filter-group">
          <label>操作</label>
          <div class="filter-options">
            <button 
              class="btn reset-btn"
              @click="resetFilters"
            >
              🔄 重置筛选
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 食谱列表 -->
    <div class="recipes-container">
      <!-- 我的食谱 -->
      <div v-if="activeTab === 'my'">
        <div class="section-header">
          <h2>❤️ 我的食谱</h2>
          <div class="results-info">
            <div class="results-count">
              已收藏 {{ myRecipes.length }} 个食谱
            </div>
          </div>
        </div>

        <div v-if="myRecipes.length === 0" class="empty-state">
          <div class="empty-icon">📝</div>
          <h3>还没有收藏任何食谱</h3>
          <p>点击食谱卡片上的"➕ 添加"按钮，将喜欢的食谱加入收藏夹</p>
          <button class="btn ai-btn" style="margin-top: 1.5rem;" @click="activeTab = 'all'">
            去浏览食谱
          </button>
        </div>

        <div v-else class="my-recipes-carousel">
          <button 
            class="carousel-nav prev" 
            @click="prevMyRecipePage"
            :disabled="myRecipeCurrentPage === 1"
          >
            ‹
          </button>
          
          <div class="carousel-container">
            <div 
              class="carousel-track" 
              :style="{ transform: `translateX(-${(myRecipeCurrentPage - 1) * 100}%)` }"
            >
              <div 
                class="carousel-slide" 
                v-for="recipe in myRecipes" 
                :key="recipe.id"
              >
                <div class="card recipe-card my-recipe-card" @click="viewRecipeDetails(recipe)">
                  <div class="recipe-image">
                    <img v-if="recipe.image" :src="recipe.image" :alt="recipe.name" class="recipe-img" />
                    <div v-else class="image-placeholder">{{ getEmojiForRecipe(recipe.name) }}</div>
                  </div>
                  
                  <div class="recipe-content">
                    <h3 class="recipe-title">{{ recipe.name }}</h3>
                    <p class="recipe-description">{{ recipe.description }}</p>
                    
                    <div class="recipe-tags">
                      <span class="tag meal-type">{{ getMealTypeLabel(recipe.mealType) }}</span>
                      <span class="tag calories">{{ recipe.calories }} kcal</span>
                      <span class="tag my-tag">❤️ 已收藏</span>
                    </div>
                    
                    <div class="recipe-meta">
                      <div class="meta-item">
                        <span class="meta-label">蛋白质</span>
                        <span class="meta-value">{{ recipe.protein }}g</span>
                      </div>
                      <div class="meta-item">
                        <span class="meta-label">碳水</span>
                        <span class="meta-value">{{ recipe.carbs }}g</span>
                      </div>
                      <div class="meta-item">
                        <span class="meta-label">脂肪</span>
                        <span class="meta-value">{{ recipe.fat }}g</span>
                      </div>
                    </div>
                    
                    <div class="recipe-actions">
                      <button class="btn detail-btn" @click.stop="viewRecipeDetails(recipe)">
                        📖 查看详情
                      </button>
                      <button class="btn remove-btn" @click.stop="removeFromMyRecipes(recipe)">
                        🗑️ 移除
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <button 
            class="carousel-nav next" 
            @click="nextMyRecipePage"
            :disabled="myRecipeCurrentPage >= myRecipes.length"
          >
            ›
          </button>
        </div>
        
        <!-- 分页指示器 -->
        <div v-if="myRecipes.length > 1" class="carousel-dots">
          <span 
            v-for="index in myRecipes.length" 
            :key="index"
            class="dot"
            :class="{ 'active': myRecipeCurrentPage === index }"
            @click="myRecipeCurrentPage = index"
          ></span>
        </div>
      </div>

      <!-- 全部食谱 -->
      <div v-else>
        <div class="section-header">
          <h2>📋 推荐食谱</h2>
          <div class="results-info">
            <div class="results-count">
              找到 {{ filteredRecipes.length }} 个食谱
            </div>
            <div v-if="selectedMealType || selectedCalorieRange" class="active-filters">
              <span v-if="selectedMealType">餐别：{{ getActiveFilterLabel(selectedMealType, mealTypes) }}</span>
              <span v-if="selectedCalorieRange">热量：{{ getActiveFilterLabel(selectedCalorieRange, calorieRanges) }}</span>
            </div>
          </div>
        </div>

      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>正在加载食谱...</p>
      </div>

      <div v-else-if="filteredRecipes.length === 0" class="empty-state">
        <div class="empty-icon">🍽️</div>
        <h3>暂无匹配的食谱</h3>
        <p>请尝试调整筛选条件</p>
      </div>

      <div v-else class="recipes-grid">
        <div 
          class="card recipe-card" 
          v-for="recipe in paginatedRecipes" 
          :key="recipe.id"
          @click="viewRecipeDetails(recipe)"
          :class="{ 'ai-recommended-card': recipe.isAiRecommended }"
        >
          <div class="recipe-image">
            <img v-if="recipe.image" :src="recipe.image" :alt="recipe.name || recipe.recipeName" class="recipe-img" />
            <div v-else class="image-placeholder">{{ getEmojiForRecipe(recipe.name || recipe.recipeName) }}</div>
          </div>
          
          <div class="recipe-content">
            <h3 class="recipe-title">{{ recipe.name || recipe.recipeName }}</h3>
            <p class="recipe-description">{{ recipe.description }}</p>
            
            <div class="recipe-tags">
              <span class="tag meal-type">{{ getMealTypeLabel(recipe.mealType || aiMealType) }}</span>
              <span class="tag calories">{{ recipe.calories }} kcal</span>
              <span v-if="recipe.isAiRecommended" class="tag ai-tag">🤖 AI 推荐</span>
            </div>
            
            <div class="recipe-meta">
              <div class="meta-item">
                <span class="meta-label">蛋白质</span>
                <span class="meta-value">{{ recipe.protein }}g</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">碳水</span>
                <span class="meta-value">{{ recipe.carbs }}g</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">脂肪</span>
                <span class="meta-value">{{ recipe.fat }}g</span>
              </div>
            </div>
            
            <button class="btn detail-btn">
              📖 查看详情
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>

    <!-- 分页组件 -->
    <div v-if="totalPages > 1" class="pagination-container">
      <div class="pagination-info">
        显示 {{ currentPage }} / {{ totalPages }} 页
      </div>
      <div class="pagination-controls">
        <button 
          class="btn pagination-btn" 
          :disabled="currentPage === 1"
          @click="prevPage">
          ← 上一页
        </button>
        <span class="page-indicator">{{ currentPage }} / {{ totalPages }}</span>
        <button 
          class="btn pagination-btn" 
          :disabled="currentPage === totalPages"
          @click="nextPage">
          下一页 →
        </button>
      </div>
    </div>

    <!-- 食谱详情模态框 -->
    <div v-if="showDetailModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>{{ selectedRecipe?.recipeName }}</h2>
          <button class="close-btn" @click="closeModal">×</button>
        </div>
        <div class="modal-body">
          <p class="modal-description">{{ selectedRecipe?.description }}</p>
          
          <div class="modal-nutrition">
            <div class="nutrient-item"><span>热量</span><strong>{{ selectedRecipe.calories }}</strong> kcal</div>
            <div class="nutrient-item"><span>蛋白</span><strong>{{ selectedRecipe.protein }}</strong> g</div>
            <div class="nutrient-item"><span>碳水</span><strong>{{ selectedRecipe.carbs }}</strong> g</div>
            <div class="nutrient-item"><span>脂肪</span><strong>{{ selectedRecipe.fat }}</strong> g</div>
          </div>

          <div v-if="selectedRecipe.ingredients" class="modal-section">
            <h3>所需食材</h3>
            <ul class="ingredients-list">
              <li v-for="(item, index) in selectedRecipe.ingredients" :key="index">{{ item }}</li>
            </ul>
          </div>

          <div v-if="selectedRecipe.instructions" class="modal-section">
            <h3>制作步骤</h3>
            <ol class="instructions-list">
              <li v-for="(step, index) in selectedRecipe.instructions" :key="index">{{ step }}</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRecipes } from '../composables/useRecipes';
import { useUserStore } from '../stores/userStore';
import axios from 'axios';

const { recipes: staticRecipes } = useRecipes();
const loading = ref(false);
const userStore = useUserStore();

// 食谱图片映射
const recipeImageMap = {
  // 家常炒菜
  '番茄炒蛋': 'https://n.sinaimg.cn/sinakd10023/607/w844h563/20220127/7ae0-a305faa3e87b948f0bc3fe7cd327ced2.png',
  '西红柿炒鸡蛋': 'https://n.sinaimg.cn/sinakd10023/607/w844h563/20220127/7ae0-a305faa3e87b948f0bc3fe7cd327ced2.png',
  '青椒肉丝': 'https://ts1.tc.mm.bing.net/th/id/R-C.f9d64c41c2e7d5d867a1ddcc297fe30b?rik=A5L8AiFLdeYyww&riu=http%3a%2f%2fn.sinaimg.cn%2fsinakd10023%2f607%2fw844h563%2f20220127%2f7ae0-a305faa3e87b948f0bc3fe7cd327ced2.png',
  '红烧排骨': 'https://cp1.douguo.com/upload/caiku/c/8/7/yuan_c854014dd9b8110019e2f19d6f4a2b37.jpg',
  '糖醋排骨': 'https://cp1.douguo.com/upload/caiku/c/8/7/yuan_c854014dd9b8110019e2f19d6f4a2b37.jpg',
  '宫保鸡丁': 'https://cp1.douguo.com/upload/caiku/5/f/1/yuan_5f1e0e0e0e0e0e0e0e0e0e0e0e0e0e0e.jpg',
  '鱼香肉丝': 'https://cp1.douguo.com/upload/caiku/6/7/1/yuan_671e0e0e0e0e0e0e0e0e0e0e0e0e0e0e.jpg',
  '麻婆豆腐': 'https://cp1.douguo.com/upload/caiku/1/5/9/yuan_159e0e0e0e0e0e0e0e0e0e0e0e0e0e0e.jpg',
  '回锅肉': 'https://cp1.douguo.com/upload/caiku/3/4/5/yuan_345e0e0e0e0e0e0e0e0e0e0e0e0e0e0e.jpg',
  '糖醋里脊': 'https://cp1.douguo.com/upload/caiku/4/5/6/yuan_456e0e0e0e0e0e0e0e0e0e0e0e0e0e0e.jpg',
  '酸辣土豆丝': 'https://cp1.douguo.com/upload/caiku/7/8/9/yuan_789e0e0e0e0e0e0e0e0e0e0e0e0e0e0e.jpg',
  '葱油拌面': 'https://cp1.douguo.com/upload/caiku/8/9/0/yuan_890e0e0e0e0e0e0e0e0e0e0e0e0e0e0e.jpg',
  
  // 汤类
  '蔬菜豆腐汤': 'https://ts1.tc.mm.bing.net/th/id/R-C.8e6c5e3b5b5b5b5b5b5b5b5b5b5b5b5b?rik=xxx',
  '紫菜蛋花汤': 'https://ts1.tc.mm.bing.net/th/id/R-C.8e6c5e3b5b5b5b5b5b5b5b5b5b5b5b5b?rik=xxx',
  '西红柿鸡蛋汤': 'https://ts1.tc.mm.bing.net/th/id/R-C.8e6c5e3b5b5b5b5b5b5b5b5b5b5b5b5b?rik=xxx',
  
  // 健康餐
  '鸡胸肉沙拉': 'https://ts1.tc.mm.bing.net/th/id/R-C.1a2b3c4d5e6f7g8h9i0j?rik=salad',
  '蔬菜沙拉': 'https://ts1.tc.mm.bing.net/th/id/R-C.1a2b3c4d5e6f7g8h9i0j?rik=salad',
  '水果沙拉': 'https://ts1.tc.mm.bing.net/th/id/R-C.1a2b3c4d5e6f7g8h9i0j?rik=salad',
  '糙米饭套餐': 'https://ts1.tc.mm.bing.net/th/id/R-C.2b3c4d5e6f7g8h9i0j1k?rik=brownrice',
  '清蒸鱼': 'https://ts1.tc.mm.bing.net/th/id/R-C.3c4d5e6f7g8h9i0j1k2l?rik=fish',
  '全麦蔬菜蛋卷': 'https://ts1.tc.mm.bing.net/th/id/R-C.5d6e7f8g9h0i1j2k3l4m?rik=eggroll',
  '全麦牛油果鸡蛋卷饼': 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400',
  '燕麦坚果酸奶碗': 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=400',
  '菠菜豆腐蒸蛋': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
  
  // 其他常见菜
  '红烧肉': 'https://cp1.douguo.com/upload/caiku/a/b/c/yuan_abc123456789.jpg',
  '水煮牛肉': 'https://cp1.douguo.com/upload/caiku/2/3/4/yuan_234e0e0e0e0e0e0e0e0e0e0e0e0e0e0e.jpg',
  '清炒时蔬': 'https://ts1.tc.mm.bing.net/th/id/R-C.4d5e6f7g8h9i0j1k2l3m?rik=vegetable',
  '炒青菜': 'https://ts1.tc.mm.bing.net/th/id/R-C.4d5e6f7g8h9i0j1k2l3m?rik=vegetable'
};

// 获取食谱图片
const getRecipeImage = (recipeName) => {
  if (!recipeName) return null;
  // 精确匹配
  if (recipeImageMap[recipeName]) {
    return recipeImageMap[recipeName];
  }
  // 模糊匹配
  for (const key of Object.keys(recipeImageMap)) {
    if (recipeName.includes(key) || key.includes(recipeName)) {
      return recipeImageMap[key];
    }
  }
  // 如果没有找到匹配的图片，返回 null
  return null;
};

// 添加食谱到我的食谱
const addToMyRecipes = (recipe) => {
  // 检查是否已存在
  const exists = myRecipes.value.some(r => r.id === recipe.id || r.name === recipe.name);
  if (exists) {
    alert(`「${recipe.name}」已经在您的食谱中了！`);
    return;
  }
  
  myRecipes.value.push({
    ...recipe,
    addedAt: new Date().toISOString()
  });
  
  // 显示成功提示
  alert(`已将「${recipe.name}」添加到您的食谱！\n\n💡 小贴士：实际项目中可以保存到后端数据库`);
  console.log('我的食谱列表:', myRecipes.value);
  
  // 保存到 localStorage
  saveMyRecipesToStorage();
};

// 从我的食谱中移除
const removeFromMyRecipes = (recipe) => {
  const index = myRecipes.value.findIndex(r => r.id === recipe.id || r.name === recipe.name);
  if (index !== -1) {
    myRecipes.value.splice(index, 1);
    alert(`已将「${recipe.name}」从您的食谱中移除`);
    console.log('移除后的食谱列表:', myRecipes.value);
    
    // 保存到 localStorage
    saveMyRecipesToStorage();
  }
};

// AI 推荐相关状态
const aiRecommendations = ref([]);
const aiAnalysis = ref('');
const aiLoading = ref(false);
const aiError = ref(null);
const aiMealType = ref('LUNCH'); // 默认推荐午餐

// 我的食谱
const myRecipes = ref([]);

// 我的食谱分页
const myRecipeCurrentPage = ref(1);

// 上一页
const prevMyRecipePage = () => {
  if (myRecipeCurrentPage.value > 1) {
    myRecipeCurrentPage.value--;
  }
};

// 下一页
const nextMyRecipePage = () => {
  if (myRecipeCurrentPage.value < myRecipes.value.length) {
    myRecipeCurrentPage.value++;
  }
};

// 标签页状态
const activeTab = ref('all'); // 'all' 或 'my'

// 监听标签切换，自动滚动
watch(activeTab, (newTab) => {
  if (newTab === 'my') {
    // 切换到我的食谱时滚动
    setTimeout(() => {
      const myRecipesSection = document.querySelector('.recipes-container');
      if (myRecipesSection) {
        myRecipesSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }, 100);
  } else if (newTab === 'all') {
    // 切换到推荐食谱时也滚动
    setTimeout(() => {
      const recipesSection = document.querySelector('.recipes-container');
      if (recipesSection) {
        recipesSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }, 100);
  }
});

// 餐别选项
const mealOptions = [
  { value: 'BREAKFAST', label: '早餐', icon: '🌅' },
  { value: 'LUNCH', label: '午餐', icon: '☀️' },
  { value: 'DINNER', label: '晚餐', icon: '🌙' },
  { value: 'SNACK', label: '加餐', icon: '🍎' }
];

// 筛选状态
const selectedMealType = ref('');
const selectedCalorieRange = ref('');

// 分页状态
const currentPage = ref(1);
const recipesPerPage = 6; // 每页显示 6 个食谱（推荐食谱）
const myRecipesPerPage = 3; // 我的食谱每页显示 3 个

// 模态框状态
const showDetailModal = ref(false);
const selectedRecipe = ref(null);

// 筛选选项
const mealTypes = [
  { value: '', label: '全部' },
  { value: '早餐', label: '🍳 早餐' },
  { value: '午餐', label: '🍚 午餐' },
  { value: '晚餐', label: '🍜 晚餐' },
  { value: '加餐', label: '🍎 加餐' }
];

const calorieRanges = [
  { value: '', label: '全部' },
  { value: 'low', label: '低热量 (<300kcal)' },
  { value: 'medium', label: '中等热量 (300-500kcal)' },
  { value: 'high', label: '高热量 (>500kcal)' }
];

// 过滤后的食谱
const filteredRecipes = computed(() => {
  let result = [...staticRecipes.value];
    
  // 按餐别筛选
  if (selectedMealType.value) {
    result = result.filter(recipe => recipe.mealType === selectedMealType.value);
  }
    
  // 按热量筛选
  if (selectedCalorieRange.value) {
    result = result.filter(recipe => {
      switch (selectedCalorieRange.value) {
        case 'low':
          return recipe.calories < 300;
        case 'medium':
          return recipe.calories >= 300 && recipe.calories <= 500;
        case 'high':
          return recipe.calories > 500;
        default:
          return true;
      }
    });
  }
    
  return result;
});

// 获取 AI 食谱推荐
const getAIRecommendations = async () => {
  if (!userStore.userData?.userId) {
    alert('请先登录以获取个性化推荐。');
    return;
  }

  aiLoading.value = true;
  aiError.value = null;
  
  try {
    const response = await axios.post('http://localhost:8080/api/ai/recommend-recipes', {
      userId: userStore.userData.userId,
      mealType: aiMealType.value,
    });

    if (response.data.recommendations) {
      // 保存 AI 分析结果
      if (response.data.analysis) {
        aiAnalysis.value = response.data.analysis;
      }
      
      // 对 AI 推荐结果进行处理，不添加图片，使用 emoji 图标
      const processedRecommendations = response.data.recommendations.map(r => {
        const recipeName = r.recipeName || r.name;
              
        return { 
          ...r, 
          id: `ai-${recipeName}-${Date.now()}`, // 生成唯一 ID
          name: recipeName,
          image: null, // AI 推荐不使用图片，使用 emoji 图标
          mealType: r.mealType || aiMealType.value === 'BREAKFAST' ? '早餐' : 
                    aiMealType.value === 'LUNCH' ? '午餐' : 
                    aiMealType.value === 'DINNER' ? '晚餐' : '加餐',
          isAiRecommended: true // 标记为 AI 推荐
        };
      });
      
      aiRecommendations.value = processedRecommendations;
      
      // 保存到 localStorage 以便刷新后仍然显示
      saveAiRecommendationsToStorage(processedRecommendations);
    } else {
      throw new Error(response.data.error || 'AI 未能返回有效的食谱推荐。');
    }

  } catch (err) {
    console.error('获取 AI 食谱推荐失败:', err);
    aiError.value = err.message || '获取 AI 推荐时发生未知错误。';
    alert(aiError.value);
  } finally {
    aiLoading.value = false;
  }
};

// 工具函数
const getMealTypeLabel = (mealType) => {
  return mealType;
};

const getEmojiForRecipe = (recipeName) => {
  if (!recipeName || typeof recipeName !== 'string') {
    return '\u{1F37D}';
  }
  
  const name = recipeName;
  // 根据食谱类型返回对应的图标
  if (name.includes('酸奶') || name.includes('燕麦')) return '\u{1F963}';
  if (name.includes('蛋卷') || name.includes('卷饼')) return '\u{1F32F}';
  if (name.includes('蒸蛋') || name.includes('蛋羹')) return '\u{1F373}';
  if (name.includes('沙拉')) return '\u{1F957}';
  if (name.includes('汤')) return '\u{1F372}';
  if (name.includes('饭') || name.includes('米饭')) return '\u{1F35A}';
  if (name.includes('面') || name.includes('面条')) return '\u{1F35C}';
  if (name.includes('粥')) return '\u{1F963}';
  if (name.includes('汉堡') || name.includes('三明治')) return '\u{1F96A}';
  if (name.includes('披萨')) return '\u{1F355}';
  if (name.includes('寿司') || name.includes('饭团')) return '\u{1F371}';
  if (name.includes('豆腐')) return '\u{1F9C8}';
  if (name.includes('鱼')) return '\u{1F41F}';
  if (name.includes('鸡') || name.includes('鸭')) return '\u{1F357}';
  if (name.includes('牛') || name.includes('猪') || name.includes('肉')) return '\u{1F969}';
  if (name.includes('虾') || name.includes('海鲜')) return '\u{1F990}';
  if (name.includes('蔬菜') || name.includes('青菜')) return '\u{1F96C}';
  if (name.includes('水果')) return '\u{1F34E}';
  if (name.includes('土豆') || name.includes('丝')) return '\u{1F954}';
  if (name.includes('番茄') || name.includes('西红柿')) return '\u{1F345}';
  if (name.includes('青椒') || name.includes('辣椒')) return '\u{1FAD1}';
  if (name.includes('牛油果')) return '\u{1F951}';
  if (name.includes('菠菜')) return '\u{1F96C}';
  if (name.includes('坚果')) return '\u{1F95C}';
  
  // 默认图标
  return '\u{1F37D}';
};

const viewRecipeDetails = (recipe) => {
  selectedRecipe.value = recipe;
  showDetailModal.value = true;
};

const closeModal = () => {
  showDetailModal.value = false;
  selectedRecipe.value = null;
};

const getActiveFilterLabel = (value, options) => {
  const option = options.find(opt => opt.value === value);
  return option ? option.label : value;
};

// 计算总页数 - 根据当前标签页决定
const totalPages = computed(() => {
  if (activeTab.value === 'my') {
    return Math.ceil(myRecipes.value.length / myRecipesPerPage);
  } else {
    return Math.ceil(filteredRecipes.value.length / recipesPerPage);
  }
});

// 获取当前页的食谱 - 根据当前标签页决定
const paginatedRecipes = computed(() => {
  if (activeTab.value === 'my') {
    const startIndex = (currentPage.value - 1) * myRecipesPerPage;
    const endIndex = startIndex + myRecipesPerPage;
    return myRecipes.value.slice(startIndex, endIndex);
  } else {
    const startIndex = (currentPage.value - 1) * recipesPerPage;
    const endIndex = startIndex + recipesPerPage;
    return filteredRecipes.value.slice(startIndex, endIndex);
  }
});

// 分页控制方法
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// 当筛选条件或标签页变化时，重置到第一页
watch([selectedMealType, selectedCalorieRange, activeTab], () => {
  currentPage.value = 1;
});

// 监听过滤结果和标签页变化，如果当前页超过总页数，则回到最后一页
watch([filteredRecipes, myRecipes, activeTab], () => {
  let total;
  if (activeTab.value === 'my') {
    total = Math.ceil(myRecipes.value.length / myRecipesPerPage);
  } else {
    total = Math.ceil(filteredRecipes.value.length / recipesPerPage);
  }
  if (currentPage.value > total && total > 0) {
    currentPage.value = total;
  }
});

const resetFilters = () => {
  selectedMealType.value = '';
  selectedCalorieRange.value = '';
};

// 保存我的食谱到 localStorage
const saveMyRecipesToStorage = () => {
  try {
    localStorage.setItem('myRecipes', JSON.stringify(myRecipes.value));
  } catch (e) {
    console.error('保存我的食谱失败:', e);
  }
};

// 从 localStorage 加载我的食谱
const loadMyRecipesFromStorage = () => {
  try {
    const stored = localStorage.getItem('myRecipes');
    if (stored) {
      myRecipes.value = JSON.parse(stored);
    }
  } catch (e) {
    console.error('加载我的食谱失败:', e);
  }
};

// 保存 AI 推荐到 localStorage
const saveAiRecommendationsToStorage = (recommendations) => {
  try {
    localStorage.setItem('aiRecommendations', JSON.stringify({
      data: recommendations,
      timestamp: Date.now()
    }));
  } catch (e) {
    console.error('保存 AI 推荐失败:', e);
  }
};

// 从 localStorage 加载 AI 推荐
const loadAiRecommendationsFromStorage = () => {
  try {
    const stored = localStorage.getItem('aiRecommendations');
    if (stored) {
      const { data, timestamp } = JSON.parse(stored);
      // 只加载 24 小时内的推荐
      const oneDay = 24 * 60 * 60 * 1000;
      if (Date.now() - timestamp < oneDay) {
        aiRecommendations.value = data;
        // 如果有分析也一并加载
        if (data.length > 0) {
          aiAnalysis.value = '已加载上次 AI 推荐结果（24 小时内）';
        }
      }
    }
  } catch (e) {
    console.error('加载 AI 推荐失败:', e);
  }
};

onMounted(() => {
  // 组件挂载时加载保存的 AI 推荐和我的食谱
  loadAiRecommendationsFromStorage();
  loadMyRecipesFromStorage();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

* {
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Inter', 'Segoe UI', Roboto, sans-serif;
}

.recipes-layout {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0;
  background: #ffffff;
  min-height: 100vh;
  position: relative;
}

.recipes-layout::before {
  content: '';
  position: fixed;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: 
    radial-gradient(ellipse at 30% 20%, rgba(0, 122, 255, 0.03) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 80%, rgba(88, 86, 214, 0.03) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
  animation: gradientShift 20s ease-in-out infinite;
}

@keyframes gradientShift {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-5%, -5%); }
}

.page-header {
  text-align: center;
  padding: 48px 24px 36px;
  position: relative;
  z-index: 1;
  background: linear-gradient(180deg, #fafafa 0%, #ffffff 100%);
}

.page-header h1 {
  color: #1d1d1f;
  margin-bottom: 12px;
  font-weight: 700;
  letter-spacing: -0.5px;
  font-size: 36px;
  line-height: 1.1;
  background: linear-gradient(135deg, #1d1d1f 0%, #424245 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stats-bar {
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
  font-size: 15px;
  color: #86868b;
  flex-wrap: wrap;
  margin-top: 16px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 6px;
  letter-spacing: -0.2px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 980px;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.stat-item:hover {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  transform: translateY(-2px);
}

.tabs-container {
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
  justify-content: center;
  padding: 0 32px;
  position: relative;
  z-index: 1;
}

.tab-btn {
  padding: 12px 24px;
  border: none;
  background: #f5f5f7;
  border-radius: 980px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
  font-size: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  letter-spacing: -0.2px;
  color: #1d1d1f;
  min-width: 140px;
}

.tab-btn:hover {
  background: #ebebf0;
  transform: translateY(-2px);
}

.tab-btn.active {
  background: #007aff;
  color: white;
  box-shadow: 0 4px 20px rgba(0, 122, 255, 0.3);
}

.tab-btn.active:hover {
  background: #0066d6;
  box-shadow: 0 8px 32px rgba(0, 122, 255, 0.4);
}

.count-badge {
  background: rgba(255, 255, 255, 0.25);
  padding: 2px 8px;
  border-radius: 980px;
  font-size: 13px;
  font-weight: 700;
}

.card {
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.02),
    0 8px 32px rgba(0, 0, 0, 0.04);
  padding: 24px;
  margin: 0 32px 20px;
  border: none;
  transition: all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
  position: relative;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 
    0 4px 16px rgba(0, 0, 0, 0.04),
    0 24px 64px rgba(0, 0, 0, 0.08);
}

.card h2 {
  color: #1d1d1f;
  margin-bottom: 20px;
  padding-bottom: 0;
  border-bottom: none;
  font-weight: 600;
  letter-spacing: -0.3px;
  font-size: 20px;
}

.ai-recommendation-card {
  background: linear-gradient(135deg, #007aff 0%, #5856d6 100%);
  color: white;
  margin: 0 32px 20px;
}

.ai-recommendation-card h2 {
  color: white;
  border-bottom: none;
}

.ai-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.ai-icon {
  font-size: 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  animation: iconFloat 3s ease-in-out infinite;
}

@keyframes iconFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

.ai-title-group {
  flex: 1;
}

.ai-title-group h2 {
  margin-bottom: 6px;
}

.ai-subtitle {
  font-size: 14px;
  opacity: 0.9;
  margin: 0;
  letter-spacing: -0.1px;
}

.ai-controls {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.meal-selector-wrapper {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 20px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.selector-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 16px;
  letter-spacing: -0.1px;
}

.label-icon {
  font-size: 1.1rem;
  animation: iconFloat 2.5s ease-in-out infinite;
}

.meal-options {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.btn {
  padding: 14px 24px;
  border: none;
  border-radius: 980px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  letter-spacing: -0.2px;
}

.fitness-btn {
  padding: 14px 20px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  font-size: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: white;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.fitness-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.fitness-btn.active {
  background: rgba(255, 255, 255, 0.95);
  color: #007aff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.meal-icon {
  font-size: 1.25rem;
  animation: iconFloat 2s ease-in-out infinite;
}

.meal-name {
  font-weight: 600;
  letter-spacing: -0.1px;
}

.ai-btn {
  background: rgba(255, 255, 255, 0.95);
  color: #007aff;
  align-self: center;
  padding: 16px 32px;
  border-radius: 980px;
  font-weight: 700;
}

.ai-btn:hover:not(:disabled) {
  background: white;
  transform: scale(1.02);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
}

.ai-btn:active:not(:disabled) {
  transform: scale(0.98);
}

.ai-btn:disabled {
  background: rgba(255, 255, 255, 0.5);
  color: rgba(0, 0, 0, 0.3);
  cursor: not-allowed;
}

.btn-icon {
  font-size: 1.1rem;
  animation: iconFloat 2s ease-in-out infinite;
}

.btn-text {
  font-size: 17px;
}

.ai-features {
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  opacity: 0.95;
  letter-spacing: -0.1px;
}

.feature-icon {
  font-size: 1.1rem;
  animation: iconFloat 2.5s ease-in-out infinite;
}

.ai-results {
  margin-top: 32px;
  padding-top: 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.ai-results-header {
  margin-bottom: 24px;
}

.ai-results-header h3 {
  color: white;
  font-size: 20px;
  margin: 0;
  font-weight: 600;
  letter-spacing: -0.2px;
}

.ai-recipes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.recipe-card {
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  margin: 0;
  padding: 0;
}

.recipe-card:hover {
  transform: translateY(-8px) scale(1.01);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
}

.recipe-card.ai-recommended {
  background: rgba(255, 255, 255, 0.98);
  border: none;
}

.recipe-card.ai-recommended-card {
  position: relative;
  border: 2px solid #007aff;
  animation: highlightPulse 2.5s infinite;
}

@keyframes highlightPulse {
  0%, 100% {
    box-shadow: 0 4px 16px rgba(0, 122, 255, 0.15);
  }
  50% {
    box-shadow: 0 8px 32px rgba(0, 122, 255, 0.25);
  }
}

.recipe-card.my-recipe-card {
  position: relative;
  border: 2px solid #ff3b30;
  margin: 0 auto;
  max-width: 500px;
}

.recipe-card.my-recipe-card:hover {
  box-shadow: 0 12px 40px rgba(255, 59, 48, 0.2);
}

/* 我的食谱轮播 */
.my-recipes-carousel {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 24px 0;
}

.carousel-container {
  flex: 1;
  overflow: hidden;
  border-radius: 20px;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.carousel-slide {
  flex: 0 0 100%;
  padding: 0 8px;
  box-sizing: border-box;
}

.carousel-nav {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #007aff 0%, #5856d6 100%);
  color: white;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
  flex-shrink: 0;
}

.carousel-nav:hover:not(:disabled) {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 122, 255, 0.4);
}

.carousel-nav:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 16px;
}

.carousel-dots .dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #d1d1d6;
  cursor: pointer;
  transition: all 0.3s ease;
}

.carousel-dots .dot.active {
  background: #007aff;
  width: 28px;
  border-radius: 5px;
}

.carousel-dots .dot:hover {
  background: #007aff;
}

.recipe-image {
  height: 200px;
  background: linear-gradient(135deg, #007aff 0%, #5856d6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin: 0;
}

.recipe-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.recipe-card:hover .recipe-img {
  transform: scale(1.05);
}

.image-placeholder {
  font-size: 4rem;
  color: white;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
}

.recipe-content {
  padding: 24px;
}

.recipe-title {
  color: #1d1d1f;
  font-size: 20px;
  margin: 0 0 12px 0;
  font-weight: 600;
  letter-spacing: -0.3px;
}

.recipe-description {
  color: #86868b;
  line-height: 1.5;
  margin-bottom: 16px;
  font-size: 15px;
  letter-spacing: -0.1px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.recipe-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.tag {
  padding: 6px 12px;
  border-radius: 980px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: -0.1px;
}

.tag.meal-type {
  background: rgba(0, 122, 255, 0.1);
  color: #007aff;
}

.tag.calories {
  background: rgba(255, 149, 0, 0.1);
  color: #ff9500;
}

.tag.ai-tag {
  background: linear-gradient(135deg, #007aff 0%, #5856d6 100%);
  color: white;
}

.my-tag {
  background: linear-gradient(135deg, #ff3b30 0%, #ff6b6b 100%);
  color: white;
}

.recipe-meta {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 20px;
  padding: 16px;
  background: #f5f5f7;
  border-radius: 12px;
}

.meta-item {
  text-align: center;
}

.meta-label {
  display: block;
  font-size: 12px;
  color: #86868b;
  margin-bottom: 4px;
  letter-spacing: -0.1px;
}

.meta-value {
  display: block;
  font-size: 18px;
  font-weight: 700;
  color: #1d1d1f;
  letter-spacing: -0.5px;
}

.recipe-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 16px;
}

.detail-btn {
  background: #007aff;
  color: white;
  border-radius: 980px;
  padding: 12px 20px;
  font-size: 15px;
}

.detail-btn:hover {
  background: #0066d6;
  transform: scale(1.02);
  box-shadow: 0 4px 16px rgba(0, 122, 255, 0.3);
}

.add-btn {
  background: #34c759;
  color: white;
  border-radius: 980px;
  padding: 12px 20px;
  font-size: 15px;
}

.add-btn:hover {
  background: #2db84e;
  transform: scale(1.02);
  box-shadow: 0 4px 16px rgba(52, 199, 89, 0.3);
}

.remove-btn {
  background: #ff3b30;
  color: white;
  border-radius: 980px;
  padding: 12px 20px;
  font-size: 15px;
}

.remove-btn:hover {
  background: #e5342d;
  transform: scale(1.02);
  box-shadow: 0 4px 16px rgba(255, 59, 48, 0.3);
}

.filter-card {
  margin: 0 48px 24px;
}

.filters {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.filter-group label {
  display: block;
  margin-bottom: 12px;
  font-weight: 600;
  color: #1d1d1f;
  font-size: 15px;
  letter-spacing: -0.1px;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filter-card .fitness-btn {
  padding: 10px 16px;
  background: #f5f5f7;
  color: #1d1d1f;
  border-radius: 980px;
  font-size: 14px;
  flex-direction: row;
  gap: 4px;
}

.filter-card .fitness-btn:hover {
  background: #ebebf0;
}

.filter-card .fitness-btn.active {
  background: #007aff;
  color: white;
}

.reset-btn {
  background: #f5f5f7;
  color: #1d1d1f;
  border-radius: 980px;
  padding: 10px 20px;
  font-size: 14px;
}

.reset-btn:hover {
  background: #ebebf0;
  transform: scale(1.02);
}

.recipes-container {
  margin: 0 48px;
  position: relative;
  z-index: 1;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 0;
}

.section-header h2 {
  color: #1d1d1f;
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.results-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.results-count {
  background: #f5f5f7;
  padding: 8px 16px;
  border-radius: 980px;
  font-weight: 600;
  font-size: 14px;
  color: #1d1d1f;
  letter-spacing: -0.1px;
}

.active-filters {
  display: flex;
  gap: 8px;
  font-size: 13px;
}

.active-filters span {
  background: rgba(0, 122, 255, 0.1);
  padding: 4px 12px;
  border-radius: 980px;
  font-weight: 500;
  color: #007aff;
}

.loading-state, .empty-state {
  text-align: center;
  padding: 80px 40px;
  background: #f5f5f7;
  border-radius: 24px;
  margin: 32px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 3px solid #f5f5f7;
  border-top: 3px solid #007aff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 24px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 24px;
  opacity: 0.5;
  animation: iconFloat 3s ease-in-out infinite;
}

.empty-state h3 {
  color: #1d1d1f;
  margin-bottom: 12px;
  font-size: 22px;
  font-weight: 600;
  letter-spacing: -0.3px;
}

.empty-state p {
  color: #86868b;
  margin: 0;
  font-size: 17px;
  letter-spacing: -0.2px;
}

.recipes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  padding: 0;
}

.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  padding: 0;
}

.pagination-info {
  color: #86868b;
  font-size: 15px;
  letter-spacing: -0.1px;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.pagination-btn {
  background: #007aff;
  color: white;
  padding: 12px 24px;
  font-size: 15px;
  border-radius: 980px;
}

.pagination-btn:hover:not(:disabled) {
  background: #0066d6;
  transform: scale(1.02);
  box-shadow: 0 4px 16px rgba(0, 122, 255, 0.3);
}

.pagination-btn:disabled {
  background: #d1d1d6;
  color: #86868b;
  cursor: not-allowed;
}

.page-indicator {
  color: #1d1d1f;
  font-weight: 600;
  min-width: 80px;
  text-align: center;
  font-size: 15px;
  letter-spacing: -0.1px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 24px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background: #ffffff;
  border-radius: 24px;
  max-width: 520px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 
    0 24px 80px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(0, 0, 0, 0.02);
  animation: slideUp 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to { 
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28px 32px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.modal-header h2 {
  margin: 0;
  color: #1d1d1f;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.3px;
}

.close-btn {
  background: #f5f5f7;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #86868b;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border-radius: 50%;
}

.close-btn:hover {
  color: #1d1d1f;
  background: #ebebf0;
}

.modal-body {
  padding: 28px 32px;
}

.modal-description {
  color: #424245;
  line-height: 1.6;
  margin-bottom: 24px;
  font-size: 17px;
  letter-spacing: -0.2px;
}

.modal-nutrition {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 24px;
  padding: 20px;
  background: #f5f5f7;
  border-radius: 16px;
}

.nutrient-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.nutrient-item span {
  color: #86868b;
  font-size: 15px;
  letter-spacing: -0.1px;
}

.nutrient-item strong {
  color: #1d1d1f;
  font-weight: 700;
  font-size: 18px;
  letter-spacing: -0.3px;
}

.modal-section {
  margin-bottom: 24px;
}

.modal-section h3 {
  color: #1d1d1f;
  font-size: 18px;
  margin-bottom: 16px;
  font-weight: 600;
  letter-spacing: -0.2px;
}

.ingredients-list, .instructions-list {
  padding-left: 24px;
  margin: 0;
}

.ingredients-list li, .instructions-list li {
  margin-bottom: 12px;
  color: #424245;
  line-height: 1.6;
  font-size: 15px;
  letter-spacing: -0.1px;
}

.modal-body::-webkit-scrollbar {
  width: 8px;
}

.modal-body::-webkit-scrollbar-track {
  background: transparent;
}

.modal-body::-webkit-scrollbar-thumb {
  background: #d1d1d6;
  border-radius: 4px;
}

@media (max-width: 1024px) {
  .main-container {
    grid-template-columns: 1fr;
    padding: 0 24px 60px;
  }
  
  .filters {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .page-header {
    padding: 60px 20px 40px;
  }
  
  .page-header h1 {
    font-size: 32px;
  }
  
  .stats-bar {
    flex-direction: column;
    gap: 8px;
  }
  
  .tabs-container {
    padding: 0 20px;
    flex-direction: column;
  }
  
  .tab-btn {
    width: 100%;
    justify-content: center;
  }
  
  .card {
    margin: 0 20px 20px;
    padding: 24px;
    border-radius: 20px;
  }
  
  .ai-recommendation-card {
    margin: 0 20px 20px;
  }
  
  .filter-card {
    margin: 0 20px 20px;
  }
  
  .recipes-container {
    margin: 0 20px;
  }
  
  .ai-header {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
  
  .ai-icon {
    width: 56px;
    height: 56px;
    font-size: 1.75rem;
  }
  
  .meal-options {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .ai-features {
    flex-direction: column;
    gap: 12px;
    align-items: center;
  }
  
  .section-header {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
  
  .results-info {
    align-items: center;
  }
  
  .recipes-grid {
    grid-template-columns: 1fr;
  }
  
  .recipe-meta {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .recipe-actions {
    grid-template-columns: 1fr;
  }
  
  .pagination-container {
    flex-direction: column;
    gap: 16px;
  }
  
  .pagination-controls {
    width: 100%;
    justify-content: space-between;
  }
  
  .my-recipes-carousel {
    gap: 8px;
    margin: 16px 0;
  }
  
  .carousel-nav {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
  
  .carousel-slide {
    padding: 0 4px;
  }
  
  .recipe-card.my-recipe-card {
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .page-header h1 {
    font-size: 28px;
  }
  
  .card {
    margin: 0 16px 16px;
    padding: 20px;
  }
  
  .ai-recommendation-card {
    margin: 0 16px 16px;
  }
  
  .filter-card {
    margin: 0 16px 16px;
  }
  
  .recipes-container {
    margin: 0 16px;
  }
  
  .meal-options {
    grid-template-columns: 1fr 1fr;
  }
  
  .recipe-meta {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  
  .modal-content {
    border-radius: 20px;
  }
  
  .modal-header {
    padding: 20px 24px;
  }
  
  .modal-body {
    padding: 20px 24px;
  }
  
  .modal-nutrition {
    grid-template-columns: 1fr;
  }
}
</style>