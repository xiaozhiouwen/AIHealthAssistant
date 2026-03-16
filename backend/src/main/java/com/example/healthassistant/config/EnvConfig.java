package com.example.healthassistant.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PropertiesLoaderUtils;

import jakarta.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;
import java.util.Properties;

/**
 * 环境变量配置类
 * 用于从 .env 文件中加载 API Key 等敏感配置
 */
@Configuration
public class EnvConfig {

    private static final Properties envProperties = new Properties();

    @PostConstruct
    public void init() {
        loadEnvFile();
    }

    /**
     * 加载 .env 文件
     * 智能尝试多个可能的位置
     */
    private void loadEnvFile() {
        // 尝试多个可能的位置
        String[] possiblePaths = {
            ".env",                              // 当前目录（最常见）
            "backend/.env",                      // 项目根目录下的 backend 文件夹
            "../backend/.env",                   // 从 backend 目录向上
            System.getProperty("user.dir") + "/.env",  // 用户工作目录
            System.getProperty("user.dir") + "/backend/.env"  // 用户工作目录的 backend 子目录
        };

        File envFile = null;
        for (String path : possiblePaths) {
            File testFile = new File(path);
            if (testFile.exists()) {
                envFile = testFile;
                break;
            }
        }

        if (envFile != null && envFile.exists()) {
            try {
                Properties props = PropertiesLoaderUtils.loadProperties(
                    new org.springframework.core.io.FileSystemResource(envFile)
                );
                
                // 将 .env 中的配置设置到系统属性中
                for (String key : props.stringPropertyNames()) {
                    String value = props.getProperty(key);
                    if (System.getProperty(key) == null) {
                        System.setProperty(key, value);
                    }
                }
            } catch (IOException e) {
                System.err.println("✗ 加载 .env 文件失败：" + e.getMessage());
                System.err.println("提示：请确保 backend/.env 文件存在并包含正确的配置");
            }
        } else {
            System.err.println("⚠ 未找到 .env 文件，请在 backend/ 目录下创建 .env 文件");
            System.err.println("提示：可以复制 backend/.env.example 作为模板");
        }
    }

    /**
     * 获取环境变量值
     * @param key 变量名
     * @return 变量值，如果不存在则返回 null
     */
    public static String getEnv(String key) {
        // 优先从系统环境变量获取
        String value = System.getenv(key);
        if (value != null && !value.isEmpty()) {
            return value;
        }
        
        // 其次从系统属性获取（由 .env 文件加载）
        value = System.getProperty(key);
        if (value != null && !value.isEmpty()) {
            return value;
        }
        
        // 最后从已加载的 .env properties 获取
        return envProperties.getProperty(key);
    }

    /**
     * 检查 API Key 是否已配置
     * @param key API Key 的名称
     * @return true 如果已配置且不为空
     */
    public static boolean isApiKeyConfigured(String key) {
        String value = getEnv(key);
        return value != null && !value.trim().isEmpty() && !value.contains("your_");
    }

    /**
     * 获取 Doubao API Key
     * @return API Key
     */
    public static String getDoubaoApiKey() {
        return getEnv("DOUBAO_API_KEY");
    }

    /**
     * 获取 Dashscope API Key
     * @return API Key
     */
    public static String getDashscopeApiKey() {
        return getEnv("DASHSCOPE_API_KEY");
    }

    /**
     * 验证所有必需的 API Key 是否已配置
     * @return true 如果所有必需的 Key 都已配置
     */
    public static boolean validateRequiredApiKeys() {
        boolean doubaoConfigured = isApiKeyConfigured("DOUBAO_API_KEY");
        boolean dashscopeConfigured = isApiKeyConfigured("DASHSCOPE_API_KEY");

        if (!doubaoConfigured) {
            System.err.println("⚠ 警告：DOUBAO_API_KEY 未配置，食物识别功能将使用本地模式");
        }
        if (!dashscopeConfigured) {
            System.err.println("⚠ 警告：DASHSCOPE_API_KEY 未配置，AI 咨询功能可能不可用");
        }

        return doubaoConfigured || dashscopeConfigured;
    }
}
