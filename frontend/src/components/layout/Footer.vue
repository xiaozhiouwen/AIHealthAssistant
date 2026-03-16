<!-- src/components/layout/Footer.vue -->
<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h4>AI健康助手</h4>
        <p class="footer-description">智能健康管理，让生活更美好</p>
      </div>
      <div class="footer-links">
        <a href="#" class="footer-link">隐私政策</a>
        <span class="divider">|</span>
        <a href="#" class="footer-link">使用条款</a>
        <span class="divider">|</span>
        <a href="#" class="footer-link">联系我们</a>
      </div>
      <div class="footer-copyright">
        <p>Copyright &copy; 2026 AI健康助手. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

* {
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Inter', 'Segoe UI', Roboto, sans-serif;
}

.footer {
  background: #f5f5f7;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  padding: 32px 48px;
  width: 100%;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.footer-section {
  text-align: center;
}

.footer-section h4 {
  margin: 0 0 8px 0;
  font-size: 17px;
  font-weight: 600;
  color: #1d1d1f;
  letter-spacing: -0.3px;
}

.footer-description {
  margin: 0;
  font-size: 14px;
  color: #86868b;
  letter-spacing: -0.1px;
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}

.footer-link {
  color: #424245;
  text-decoration: none;
  font-size: 12px;
  font-weight: 400;
  transition: color 0.3s ease;
  letter-spacing: -0.1px;
}

.footer-link:hover {
  color: #007aff;
}

.divider {
  color: #d1d1d6;
  font-size: 12px;
}

.footer-copyright {
  text-align: center;
}

.footer-copyright p {
  margin: 0;
  font-size: 12px;
  color: #86868b;
  letter-spacing: -0.1px;
}

@media (max-width: 768px) {
  .footer {
    padding: 24px 20px;
  }

  .footer-content {
    gap: 20px;
  }

  .footer-section h4 {
    font-size: 15px;
  }

  .footer-description {
    font-size: 13px;
  }

  .footer-links {
    gap: 12px;
  }

  .footer-link {
    font-size: 11px;
  }

  .divider {
    display: none;
  }

  .footer-links {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
