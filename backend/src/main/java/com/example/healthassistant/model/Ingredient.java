package com.example.healthassistant.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "ingredient", indexes = {
    @Index(name = "idx_name", columnList = "name", unique = true),
    @Index(name = "idx_category", columnList = "category"),
    @Index(name = "idx_calories", columnList = "calories_per_100g"),
    @Index(name = "idx_is_healthy", columnList = "is_healthy")
})
@Data
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true, length = 100)
    private String name; // 食材名称
    
    @Column(length = 50)
    private String category; // 分类：vegetable/meat/grain/dairy/fruit/nut/spice
    
    @Column(name = "calories_per_100g")
    private Double caloriesPer100g; // 每100g卡路里
    
    @Column(name = "protein_per_100g")
    private Double proteinPer100g; // 每100g蛋白质(g)
    
    @Column(name = "carbs_per_100g")
    private Double carbsPer100g; // 每100g碳水化合物(g)
    
    @Column(name = "fat_per_100g")
    private Double fatPer100g; // 每100g脂肪(g)
    
    @Column(name = "fiber_per_100g")
    private Double fiberPer100g; // 每100g膳食纤维(g)
    
    @Column(length = 50)
    private String season; // 适宜季节：spring/summer/autumn/winter/all_year
    
    @Column(name = "is_healthy")
    private Boolean isHealthy = true; // 是否健康食材
    
    @Column(name = "health_benefits", length = 500)
    private String healthBenefits; // 健康益处
    
    @Column(name = "water_content_per_100g")
    private Double waterContentPer100g; // 每100g水分含量(g)
    
    @Column(name = "sodium_per_100g")
    private Double sodiumPer100g; // 每100g钠含量(mg)
    
    @Column(name = "calcium_per_100g")
    private Double calciumPer100g; // 每100g钙含量(mg)
    
    @Column(name = "iron_per_100g")
    private Double ironPer100g; // 每100g铁含量(mg)
    
    @Column(name = "vitamin_c_per_100g")
    private Double vitaminCPer100g; // 每100g维生素C含量(mg)
    
    @Column(name = "vitamin_a_per_100g")
    private Double vitaminAPer100g; // 每100g维生素A含量(μg)
    
    @Column(name = "cholesterol_per_100g")
    private Double cholesterolPer100g; // 每100g胆固醇含量(mg)
    
    @Column(name = "sugar_per_100g")
    private Double sugarPer100g; // 每100g糖含量(g)
    
    @Column(name = "saturated_fat_per_100g")
    private Double saturatedFatPer100g; // 每100g饱和脂肪(g)
    
    @Column(name = "unsaturated_fat_per_100g")
    private Double unsaturatedFatPer100g; // 每100g不饱和脂肪(g)
    
    @Column(name = "glycemic_index")
    private Integer glycemicIndex; // 血糖指数(0-100)
    
    @Column(name = "allergen_info", length = 200)
    private String allergenInfo; // 过敏原信息
    
    @Column(name = "processing_method", length = 100)
    private String processingMethod; // 加工方式
    
    @Column(name = "storage_requirements", length = 200)
    private String storageRequirements; // 储存要求
    
    @Column(name = "cooking_tips", length = 500)
    private String cookingTips; // 烹饪小贴士
    
    @Column(name = "availability_score")
    private Integer availabilityScore; // 可获得性评分(1-10)
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @Column(name = "created_by", length = 50)
    private String createdBy; // 创建者
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
