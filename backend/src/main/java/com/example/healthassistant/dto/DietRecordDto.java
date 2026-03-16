package com.example.healthassistant.dto;

import lombok.Data;

import java.util.List;

@Data
public class DietRecordDto {
    private String userId;
    private String mealType; // 早餐/午餐/晚餐/加餐
    private String foodDescription;
    private List<String> consumedIngredients;
    private Double calories;
    private Double protein;
    private Double carbs;
    private Double fat;
    private Double fiber;
}
