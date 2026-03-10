# AI健康助手项目文档

## 项目概述
AI健康助手是一个智能化的健康管理平台，提供饮食记录、营养分析、健康建议等功能。

## 技术栈
- **后端**: Spring Boot 3.x, Java 21
- **前端**: Vue 3, Vite
- **数据库**: MySQL 8.0
- **AI服务**: 豆包AI API

## 目录结构
```
AIHealthAssistant/
├── docs/                    # 项目文档
├── backend/                # 后端服务 (原HealthAssistant)
├── frontend/               # 前端应用 (原healthassistantfrontend)
├── .gitignore             # Git忽略文件
└── README.md              # 项目根说明
```

## 快速开始
### 后端启动
```bash
cd backend
./mvnw spring-boot:run
```

### 前端启动
```bash
cd frontend
npm install
npm run dev
```

## 功能模块
- 🍽️ 饮食日记管理
- 🤖 AI营养分析
- 👤 用户个人中心
- 📊 健康数据统计
- 💡 个性化健康建议

## 开发规范
- 遵循RESTful API设计原则
- 前端采用组件化开发
- 代码提交前进行格式化检查