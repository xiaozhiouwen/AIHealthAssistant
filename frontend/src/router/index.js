// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '../views/DashboardView.vue';
import RecipesView from '../views/RecipesView.vue';
import DiaryView from '../views/DiaryView.vue';
import ProfileView from '../views/ProfileView.vue';
import AIConsultView from '../views/AIConsultView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
// 添加FitnessView导入
import FitnessView from '../views/FitnessView.vue';
// 添加MentalHealthView导入
import MentalHealthView from '../views/MentalHealthView.vue';
import { useUserStore } from '../stores/userStore';

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: LoginView,
        meta: { requiresGuest: true }
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterView,
        meta: { requiresGuest: true }
    },
    {
        path: '/',
        name: 'Dashboard',
        component: DashboardView,
        meta: { requiresAuth: true }
    },
    {
        path: '/recipes',
        name: 'Recipes',
        component: RecipesView,
        meta: { requiresAuth: true }
    },
    {
        path: '/diary',
        name: 'Diary',
        component: DiaryView,
        meta: { requiresAuth: true }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: ProfileView,
        meta: { requiresAuth: true }
    },
    {
        path: '/ai-consult',
        name: 'AIConsult',
        component: AIConsultView,
        meta: { requiresAuth: true }
    },
    // 添加FitnessView路由
    {
        path: '/fitness',
        name: 'Fitness',
        component: FitnessView,
        meta: { requiresAuth: true }
    },
    // 添加MentalHealthView路由
    {
        path: '/mental-health',
        name: 'MentalHealth',
        component: MentalHealthView,
        meta: { requiresAuth: true }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// 添加路由守卫
router.beforeEach((to, from, next) => {
    const userStore = useUserStore();

    console.log('路由守卫 - 当前路径:', to.path);
    console.log('路由守卫 - 登录状态:', userStore.isLoggedIn);
    console.log('路由守卫 - localStorage登录状态:', localStorage.getItem('isLoggedIn'));

    // 检查localStorage中的登录状态
    const storedLoginStatus = localStorage.getItem('isLoggedIn') === 'true';
    const storedUserData = localStorage.getItem('userProfile');

    // 如果store中没有登录状态但localStorage中有，则恢复状态
    if (!userStore.isLoggedIn && storedLoginStatus && storedUserData) {
        try {
            const userData = JSON.parse(storedUserData);
            console.log('从localStorage恢复用户数据:', userData);
            userStore.setUserData(userData);
        } catch (e) {
            console.error('恢复用户状态失败:', e);
            // 清除损坏的数据
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userProfile');
        }
    }

    // 检查是否需要认证
    if (to.meta.requiresAuth && !userStore.isLoggedIn) {
        console.log('需要认证但未登录，重定向到登录页');
        next('/login');
    }
    // 检查是否是游客页面（登录/注册页）
    else if (to.meta.requiresGuest && userStore.isLoggedIn) {
        console.log('已登录用户访问游客页面，重定向到首页');
        next('/');
    }
    // 其他情况正常放行
    else {
        console.log('路由正常通行');
        next();
    }
});

export default router;