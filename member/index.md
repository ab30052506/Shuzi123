# 👑 会员专区

加入会员，解锁全部独家付费教程，更快掌握 AI 赚钱技能。

---

## 会员套餐

<div class="pricing-container">

<div class="pricing-card">
  <h3>免费版</h3>
  <div class="price">￥0</div>
  <ul>
    <li>✅ 全部基础教程</li>
    <li>✅ AI 工具导航</li>
    <li>❌ 独家付费教程</li>
    <li>❌ 社群答疑</li>
    <li>❌ AI 变现项目</li>
  </ul>
  <button class="btn disabled">当前套餐</button>
</div>

<div class="pricing-card recommended">
  <div class="recommended-badge">最受欢迎</div>
  <h3>进阶会员</h3>
  <div class="price">￥99<span>/年</span></div>
  <ul>
    <li>✅ 全部基础教程</li>
    <li>✅ AI 工具导航</li>
    <li>✅ 全部付费教程</li>
    <li>✅ 社群答疑</li>
    <li>❌ 一对一点评</li>
  </ul>
  <button class="btn primary" onclick="window.open('https://wx.zsxq.com/dweb2/index/topics/你的知识星球ID', '_blank')">立即加入</button>
  <p class="tip">适合绝大多数学习者</p>
</div>

<div class="pricing-card">
  <h3>VIP 尊享</h3>
  <div class="price">￥299<span>/一次性</span></div>
  <ul>
    <li>✅ 进阶会员全部内容</li>
    <li>✅ 1 小时 1 对 1 咨询</li>
    <li>✅ 项目一对一点评</li>
    <li>✅ 终身更新</li>
  </ul>
  <button class="btn primary" onclick="window.open('https://wx.zsxq.com/dweb2/index/topics/你的知识星球ID', '_blank')">立即购买</button>
  <p class="tip">想要快速解决问题</p>
</div>

</div>

---

## 会员专享内容

### 已经更新（持续新增）：

- [ ] 《AI 副业赚钱 10 种方法》
- [ ] 《DeepSeek 提问技巧高级篇》
- [ ] 《AI 短视频批量制作全流程》
- [ ] 《Prompt 工程师作品集》
- [ ] 《个人知识库搭建手把手》
- [ ] 更多内容持续更新...

---

## 常见问题

**Q: 付费内容会降价吗？**
A: 随着内容增加，价格会逐步上涨，早买早享受。

**Q: 购买后可以退款吗？**
A: 知识产品一经购买，不支持退款，请理解。

**Q: 怎么加入会员？**
A: 点击上面的按钮，跳转到知识星球付费加入即可。

**Q: 有社群吗？**
A: 知识星球内可以提问交流，所有会员都在一起。

---

<style>
.pricing-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin: 30px 0;
}
.pricing-card {
  border: 2px solid #eaecef;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  position: relative;
  transition: all 0.3s;
}
.pricing-card.recommended {
  border-color: #3eaf7c;
  transform: scale(1.05);
}
.pricing-card:hover {
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}
.recommended-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #3eaf7c;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
}
.pricing-card h3 {
  margin: 10px 0;
  font-size: 24px;
}
.price {
  font-size: 36px;
  font-weight: bold;
  color: #3eaf7c;
  margin: 16px 0;
}
.price span {
  font-size: 16px;
  color: #999;
}
.pricing-card ul {
  list-style: none;
  padding: 0;
  margin: 24px 0;
  text-align: left;
}
.pricing-card li {
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}
.btn {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}
.btn.primary {
  background: #3eaf7c;
  color: white;
}
.btn.primary:hover {
  background: #36996c;
}
.btn.disabled {
  background: #eaecef;
  color: #999;
  cursor: not-allowed;
}
.tip {
  margin: 8px 0 0 0;
  font-size: 12px;
  color: #999;
}
@media (max-width: 768px) {
  .pricing-card.recommended {
    transform: none;
  }
}
</style>
