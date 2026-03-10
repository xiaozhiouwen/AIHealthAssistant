# AI健康助手 Logo 使用指南

## Logo 文件说明

### 主要Logo文件
- **完整版Logo**: `src/assets/images/logo.svg`
  - 尺寸: 200x200px
  - 特点: 包含所有设计元素，适合首页和主要展示位置
  
- **简化版Logo**: `src/assets/images/logo-simple.svg`
  - 尺寸: 100x100px
  - 特点: 简化设计，适合小尺寸显示和移动端

## 设计理念

### 视觉元素
1. **颜色方案**:
   - 主色调: QQ蓝 (#667eea → #764ba2 渐变)
   - 健康元素: 红色心形 (#ff6b6b → #ff8e8e)
   - AI元素: 青色大脑 (#4ecdc4 → #44a08d)

2. **核心图标**:
   - 💗 心脏形状 - 代表健康关怀
   - 🧠 大脑轮廓 - 代表AI智能
   - ⚡ 连接元素 - 体现AI与健康的结合
   - 🔵 数据点阵 - 展现科技感

3. **文字标识**:
   - 中文: AI健康助手
   - 英文: Health Assistant

## 在项目中的使用

### 1. Header组件使用
```vue
<img 
  src="@/assets/images/logo.svg" 
  alt="AI健康助手 Logo" 
  class="logo"
  @error="handleLogoError"
/>
```

### 2. 登录/注册页面使用
```vue
<img 
  src="@/assets/images/logo.svg" 
  alt="AI健康助手 Logo" 
  class="logo-image"
  @error="handleLogoError"
/>
```

### 3. 移动端适配
```css
/* 大屏幕 */
.logo {
  width: 50px;
  height: 50px;
}

/* 小屏幕 */
@media (max-width: 480px) {
  .logo {
    width: 40px;
    height: 40px;
  }
}
```

## 错误处理机制

所有Logo引用都包含错误处理：
```javascript
const handleLogoError = (event) => {
  // 显示备用图标
  event.target.style.display = 'none';
  const fallback = document.createElement('div');
  fallback.className = 'logo-fallback';
  fallback.innerHTML = '🏥';
  event.target.parentElement.appendChild(fallback);
};
```

## 样式定制

### 自定义尺寸
```css
.logo-custom {
  width: 30px;
  height: 30px;
}
```

### 添加动画效果
```css
.logo-animated {
  transition: transform 0.3s ease;
}

.logo-animated:hover {
  transform: scale(1.1) rotate(5deg);
}
```

## 维护建议

1. **定期检查**: 确保Logo在各浏览器中正常显示
2. **备份文件**: 保留SVG源文件以防意外修改
3. **性能优化**: SVG文件已优化，如需进一步压缩可使用在线工具
4. **一致性**: 保持Logo在各页面的显示风格统一

## 版权声明

此Logo为AI健康助手项目专用设计，未经授权不得用于其他商业用途。