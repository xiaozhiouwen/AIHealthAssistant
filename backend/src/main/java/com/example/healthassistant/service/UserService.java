package com.example.healthassistant.service;

import com.example.healthassistant.dto.UserProfileDto;
import com.example.healthassistant.model.UserProfile;
import com.example.healthassistant.dto.LoginRequestDto;

public interface UserService {
    UserProfile createOrUpdateUserProfile(UserProfileDto profileDto);
    UserProfile getUserProfile(String userId);
    UserProfile login(LoginRequestDto loginRequest);
    UserProfile register(String username, String password);
    boolean validatePassword(String rawPassword, String encodedPassword);
    boolean deleteUser(String userId);
    boolean updateUsername(String userId, String newUsername);
    boolean updatePassword(String userId, String oldPassword, String newPassword);
    boolean resetPassword(String username, String email, String newPassword);
}
