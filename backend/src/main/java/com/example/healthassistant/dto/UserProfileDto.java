package com.example.healthassistant.dto;

import lombok.Data;

import java.util.List;

public class UserProfileDto {
    private String userId;
    private Integer height;
    private Double weight;
    private Integer age;
    private String gender;
    private List<String> dietaryRestrictions;
    private List<String> tastePreferences;
    private String activityLevel;
    private String healthGoal;
    
    // 手动添加getter/setter方法
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    
    public Integer getHeight() { return height; }
    public void setHeight(Integer height) { this.height = height; }
    
    public Double getWeight() { return weight; }
    public void setWeight(Double weight) { this.weight = weight; }
    
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
    
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    
    public List<String> getDietaryRestrictions() { return dietaryRestrictions; }
    public void setDietaryRestrictions(List<String> dietaryRestrictions) { this.dietaryRestrictions = dietaryRestrictions; }
    
    public List<String> getTastePreferences() { return tastePreferences; }
    public void setTastePreferences(List<String> tastePreferences) { this.tastePreferences = tastePreferences; }
    
    public String getActivityLevel() { return activityLevel; }
    public void setActivityLevel(String activityLevel) { this.activityLevel = activityLevel; }
    
    public String getHealthGoal() { return healthGoal; }
    public void setHealthGoal(String healthGoal) { this.healthGoal = healthGoal; }
}
