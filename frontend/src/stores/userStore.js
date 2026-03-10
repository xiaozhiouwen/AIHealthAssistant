// src/stores/userStore.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useUserStore = defineStore('user', () => {
    // 状态
    const userData = ref({
        userId: '',
        name: '',
        goal: '',
        currentWeight: 0,
        targetWeight: 0
    });

    const isLoggedIn = ref(false);
    const loading = ref(false);
    const errorMessage = ref('');
    const isInitialized = ref(false); // 新增：标记store是否已初始化

    // 初始化store状态
    const initializeStore = () => {
        if (isInitialized.value) return;
        
        console.log('初始化用户store');
        
        // 从localStorage恢复状态
        const storedLoginStatus = localStorage.getItem('isLoggedIn') === 'true';
        const storedUserData = localStorage.getItem('userProfile');
        
        if (storedLoginStatus && storedUserData) {
            try {
                const userDataObj = JSON.parse(storedUserData);
                console.log('从localStorage恢复用户数据:', userDataObj);
                userData.value = userDataObj;
                isLoggedIn.value = true;
            } catch (e) {
                console.error('恢复用户状态失败:', e);
                // 清除损坏的数据
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userProfile');
            }
        }
        
        isInitialized.value = true;
        console.log('用户store初始化完成');
    };

    // 动作
    const setUserData = (data) => {
        console.log('设置用户数据:', data);
        userData.value = { ...userData.value, ...data };
        isLoggedIn.value = true;
        isInitialized.value = true;
        // 保存到localStorage
        localStorage.setItem('userProfile', JSON.stringify(userData.value));
        localStorage.setItem('isLoggedIn', 'true');
        console.log('保存到localStorage完成');
    };

    const logout = () => {
        console.log('执行退出登录');
        
        // 清除本地状态
        userData.value = {
            userId: '',
            name: '',
            goal: '',
            currentWeight: 0,
            targetWeight: 0
        };
        isLoggedIn.value = false;
        isInitialized.value = false;
        errorMessage.value = '';
        
        // 清除localStorage
        localStorage.removeItem('userProfile');
        localStorage.removeItem('isLoggedIn');
        
        console.log('用户已注销，localStorage已清除');
    };

    const setLoading = (status) => {
        loading.value = status;
    };

    const setError = (message) => {
        errorMessage.value = message;
    };

    const clearError = () => {
        errorMessage.value = '';
    };

    // 计算属性
    const isAuthenticated = computed(() => {
        return isLoggedIn.value && userData.value.userId;
    });

    return {
        userData,
        isLoggedIn,
        loading,
        errorMessage,
        isInitialized,
        isAuthenticated,
        initializeStore,
        setUserData,
        logout,
        setLoading,
        setError,
        clearError
    };
});
