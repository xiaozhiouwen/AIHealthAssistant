package com.example.healthassistant.controller;

import com.example.healthassistant.service.ApiAvailabilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/status")
public class ApiStatusController {

    @Autowired
    private ApiAvailabilityService apiAvailabilityService;

    /**
     * 获取所有 API 的状态
     */
    @GetMapping("/api-availability")
    public Map<String, ApiAvailabilityService.ApiStatus> getApiStatus() {
        return apiAvailabilityService.checkAllApis();
    }

    /**
     * 获取通义千问 API 的状态
     */
    @GetMapping("/qwen")
    public ApiAvailabilityService.ApiStatus getQwenStatus() {
        return apiAvailabilityService.checkQwenApi();
    }

    /**
     * 获取豆包 API 的状态
     */
    @GetMapping("/doubao")
    public ApiAvailabilityService.ApiStatus getDoubaoStatus() {
        return apiAvailabilityService.checkDoubaoApi();
    }
}