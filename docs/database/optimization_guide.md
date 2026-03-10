# 数据库结构优化说明

## 概述
本次数据库优化旨在提升健康助手应用的数据存储效率、查询性能和扩展性，同时更好地支持应用的核心功能。

## 主要优化内容

### 1. 用户表优化 (user_profile)
**新增字段：**
- `email`: 邮箱地址（唯一约束）
- `phone`: 手机号码
- `avatar_url`: 用户头像URL
- `last_login_time`: 最后登录时间
- `is_active`: 账户激活状态

**改进：**
- 添加多个索引提升查询性能
- 使用更精确的数据类型（如DECIMAL替代DOUBLE）
- 增加字段长度限制和约束

### 2. 饮食记录表优化 (diet_record)
**新增字段：**
- `record_time`: 具体记录时间
- `image_url`: 食物图片URL
- `actual_*`: 实际摄入营养成分（考虑重量因素）
- 微量元素：水份、钠、钙、铁、维生素C等
- `satisfaction_level`: 满意度评分
- `location`: 用餐地点
- `notes`: 备注信息

**改进：**
- 添加时间戳自动管理
- 更详细的营养成分追踪
- 支持多媒体内容存储

### 3. 食材表优化 (ingredient)
**新增字段：**
- 详细的营养成分数据（维生素、矿物质等）
- `glycemic_index`: 血糖指数
- `allergen_info`: 过敏原信息
- `processing_method`: 加工方式
- `storage_requirements`: 储存要求
- `cooking_tips`: 烹饪小贴士
- `availability_score`: 可获得性评分

**改进：**
- 更全面的营养信息覆盖
- 支持食材的多维度属性
- 添加创建者信息追踪

### 4. 食谱表优化 (recipe)
**新增字段：**
- `image_url` 和 `video_url`: 多媒体内容
- 详细的时间分解（准备时间、烹饪时间等）
- `equipment_needed`: 所需厨具
- `tips_and_tricks`: 烹饪技巧
- 评分和流行度系统
- `health_score`: 健康评分
- 成本估算功能

**改进：**
- 更好的搜索和推荐支持
- 社交化功能支持
- 商业化扩展能力

## 性能优化措施

### 索引优化
- 为常用查询字段添加索引
- 复合索引优化多条件查询
- 唯一索引保证数据完整性

### 数据类型优化
- 使用DECIMAL确保数值精度
- 合理设置VARCHAR长度
- 使用适当的整数类型

### 查询优化
- 创建有用的视图简化复杂查询
- 存储过程封装常用业务逻辑
- 规范化的表结构减少数据冗余

## 迁移指南

### 1. 准备工作
```bash
# 备份现有数据库
mysqldump -u username -p database_name > backup_before_migration.sql
```

### 2. 执行迁移
```sql
-- 1. 执行结构优化脚本
SOURCE docs/database/schema_optimization.sql;

-- 2. 执行数据迁移脚本  
SOURCE docs/database/data_migration.sql;
```

### 3. 验证结果
```sql
-- 检查表结构
DESCRIBE user_profile;
DESCRIBE diet_record;
DESCRIBE ingredient;
DESCRIBE recipe;

-- 验证数据完整性
SELECT COUNT(*) FROM user_profile;
SELECT COUNT(*) FROM diet_record;
```

## 应用层适配

### 需要更新的代码模块：

1. **UserService**: 适应新的用户字段
2. **DietRecordService**: 处理扩展的营养数据
3. **IngredientService**: 支持更详细的食材信息
4. **RecipeService**: 利用增强的食谱功能

### API接口变更：
- 用户注册/登录接口可能需要调整
- 饮食记录接口支持更多字段
- 食材查询接口返回更丰富信息
- 食谱推荐算法可以利用新字段

## 后续维护建议

1. **定期监控**: 关注慢查询日志和性能指标
2. **索引优化**: 根据实际查询模式调整索引
3. **数据归档**: 对历史数据进行分区或归档
4. **备份策略**: 建立完善的备份和恢复机制

## 版本控制
- 当前版本: 2.0
- 兼容性: 向下兼容大部分现有功能
- 迁移风险: 中等（需要数据迁移）

---
*文档最后更新: 2026-03-02*