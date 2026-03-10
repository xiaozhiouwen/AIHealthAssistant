package com.example.healthassistant.model;

public enum MealType {
    BREAKFAST("早餐"),
    LUNCH("午餐"),
    DINNER("晚餐"),
    SNACK("加餐");

    private final String displayName;

    MealType(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
