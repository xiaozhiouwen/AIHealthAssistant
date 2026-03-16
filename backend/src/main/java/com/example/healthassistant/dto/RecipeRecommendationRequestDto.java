package com.example.healthassistant.dto;

import lombok.Data;

import java.util.List;

@Data
public class RecipeRecommendationRequestDto {
    private String userId;
    private String mealType; // 早餐/午餐/晚餐/加餐
    private String cuisineType; // 居家做/外食/食堂
    private String occasion; // 一人食/多人餐
}
