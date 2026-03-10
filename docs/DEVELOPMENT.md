# 开发环境搭建指南

## 环境要求
- JDK 21+
- Node.js 18+
- MySQL 8.0+
- Maven 3.8+

## 后端环境配置
1. 安装MySQL并创建数据库
2. 配置application.properties数据库连接
3. 设置豆包AI API密钥环境变量

## 前端环境配置
1. 安装依赖：`npm install`
2. 启动开发服务器：`npm run dev`
3. 构建生产版本：`npm run build`

## 常见问题
- 端口冲突：后端默认8080，前端默认5173
- 数据库连接：确保MySQL服务正常运行
- AI服务：需要有效的豆包API密钥