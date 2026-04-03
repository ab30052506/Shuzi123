/**
 * 额外右侧边栏配置
 * 每个推广位的配置说明：
 * - title: 显示的标题
 * - icon: 图标路径（放在 .vuepress/public/icon/ 目录下）
 * - popoverTitle: 弹窗标题
 * - popoverUrl: 二维码图片路径（放在 .vuepress/public/ 目录下）
 * - popoverDesc: 弹窗描述文字
 */
export default [
  {
    title: "👑 加入会员",
    icon: "/icon/xingqiu.png",
    popoverTitle:
      '<span style="font-size:0.8rem;font-weight:bold;">扫码加入会员，解锁全部付费教程和 AI 变现干货</span>',
    popoverUrl: "/qrcode-member.jpg",
    popoverDesc: "会员专属内容持续更新",
  },
  {
    title: "📱 关注公众号",
    icon: "/icon/xiazai.png",
    popoverTitle:
      '<span style="font-size:0.8rem;font-weight:bold;">扫码关注公众号，获取更多 AI 干货和免费资料</span>',
    popoverUrl: "/qrcode-gzh.jpg",
    popoverDesc: "公众号: 你的公众号名称",
  },
  {
    title: "💬 交流群",
    icon: "/icon/weixin.png",
    popoverTitle:
      '<span style="font-size:0.8rem;font-weight:bold;">扫码加我微信，拉你进 AI 交流群</span>',
    popoverUrl: "/qrcode-weixin.jpg",
    popoverDesc: "一起交流 AI 赚钱",
  },
  {
    title: "❤️ 支持本站",
    icon: "/icon/dianzan.png",
    popoverTitle: ' <span style="font-size:0.8rem;font-weight:bold;">如果你觉得本站有用，欢迎赞赏支持</span>',
    popoverUrl: "/qrcode-zhanshang.jpg",
    popoverDesc: "感谢您的支持，我们会持续更新",
  },
];

/**
 * 广告位配置
 * 在 config.ts 的 themeConfig 中添加 adConfig 来覆盖默认配置
 * 
 * 示例配置：
 * adConfig: {
 *   show: true,           // 是否显示广告位
 *   image: '/ad-banner.jpg', // 广告图片（可选，不填则显示文字）
 *   title: '🔥 限时优惠',   // 广告标题
 *   desc: '加入会员立减 20 元', // 广告描述
 *   link: '/member/'      // 点击跳转链接
 * }
 */
