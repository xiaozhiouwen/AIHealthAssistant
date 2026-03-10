# AI健康助手 🏥

一个基于AI技术的智能健康管理平台，帮助用户记录饮食、分析营养、获得个性化健康建议。

## ️ 运行环境

| 环境 | 版本要求 |
|------|---------|
| JDK | 21+ |
| Node.js | 18+ |
| MySQL | 8.0+ |
| Maven | 3.8+ |

## � 运行步骤

### 1. 数据库配置
编辑 `backend/src/main/resources/application.properties`：
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/health_assistant?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=Asia/Shanghai&allowPublicKeyRetrieval=true&useUnicode=true&characterEncoding=UTF-8
spring.datasource.username=root
spring.datasource.password=你的数据库密码
```

### 2. 启动后端
```bash
cd backend
./mvnw spring-boot:run
```

### 3. 启动前端
```bash
cd frontend
npm install
npm run dev
```

### 4. 访问应用
打开浏览器访问：`http://localhost:5173`

## 👤 测试账号

| 账号 | 密码 |
|------|------|
| testuser | 123456 |

## 📄 许可证

MIT License
