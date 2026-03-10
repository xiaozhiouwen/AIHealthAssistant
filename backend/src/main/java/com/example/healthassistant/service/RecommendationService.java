package com.example.healthassistant.service;

import com.example.healthassistant.model.Recipe;

import java.util.List;
import java.util.Map;

public interface RecommendationService {

    /**
     * 根据用户ID和餐别类型，获取AI生成的食谱推荐。
     *
     * @param userId 用户ID
     * @param mealType 餐别 (e.g., LUNCH, DINNER)
     * @return 包含食谱推荐的Map
     */
    Map<String, Object> getRecipeRecommendations(String userId, String mealType);

}
