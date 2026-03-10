package com.example.healthassistant.repository;

import com.example.healthassistant.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    List<Recipe> findByTagsContaining(String tag);
    List<Recipe> findByMealType(String mealType);
}
