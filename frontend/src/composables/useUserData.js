// src/composables/useUserData.js
import { ref } from 'vue';
import { healthApi } from '../api/healthApi';
import { useUserStore } from '../stores/userStore';

export function useUserData() {
    const userStore = useUserStore();
    const healthTips = ref([]);

    const loadUserData = async () => {
        try {
            userStore.setLoading(true);
            userStore.clearError();

            // 获取个性化健康提示
            const tipsResponse = await healthApi.getPersonalizedTips(userStore.userData.userId);
            healthTips.value = [tipsResponse];

        } catch (err) {
            userStore.setError(err.message || '加载数据失败');
            console.error('加载数据失败:', err);
        } finally {
            userStore.setLoading(false);
        }
    };

    return {
        healthTips,
        loadUserData
    };
}
