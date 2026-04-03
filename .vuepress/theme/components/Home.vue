<template>
  <main class="home" :aria-labelledby="data.heroText !== null ? 'main-title' : undefined">
    <header class="hero">
      <img
        v-if="data.heroImage"
        :src="$withBase(data.heroImage)"
        :alt="data.heroAlt || 'hero'"
        class="hero-image"
      />
      <h1 v-if="data.heroText !== null" id="main-title" class="hero-title">
        {{ data.heroText || $title || 'Hello' }}
      </h1>
      <p v-if="data.tagline !== null" class="description">
        {{ data.tagline || $description || 'Welcome to your VuePress site' }}
      </p>
      <p v-if="data.actionText && data.actionLink" class="action">
        <NavLink class="action-button" :item="actionLink" />
      </p>
    </header>

    <div v-if="data.banner && data.banner.content" class="banner">
      <a :href="data.banner.link" class="banner-link">
        {{ data.banner.content }}
      </a>
    </div>

    <div v-if="data.features && data.features.length" class="features">
      <div
        v-for="(feature, index) in data.features"
        :key="index"
        class="feature"
        @click="handleFeatureClick(feature)"
      >
        <div class="feature-icon">{{ feature.icon || '📝' }}</div>
        <h2 class="feature-title">{{ feature.title }}</h2>
        <p class="feature-details">{{ feature.details }}</p>
      </div>
    </div>

    <div class="hot-section">
      <h2 class="section-title">🔥 热门推荐</h2>
      <div class="hot-cards">
        <div
          v-for="(item, index) in hotItems"
          :key="index"
          class="hot-card"
          @click="navigateTo(item.link)"
        >
          <div class="hot-card-icon">{{ item.icon }}</div>
          <h3 class="hot-card-title">{{ item.title }}</h3>
          <p class="hot-card-desc">{{ item.desc }}</p>
          <span class="hot-card-link">查看详情 →</span>
        </div>
      </div>
    </div>

    <div class="why-section">
      <h2 class="section-title">🎯 为什么选择本站？</h2>
      <p class="why-desc">
        本站完全免费开放核心内容，拒绝标题党和水文，每篇文章都是干货实战。<br/>
        如果你想快速入门 AI，利用 AI 提高效率赚钱，这里就是最好的起点。
      </p>
    </div>

    <Content class="theme-default-content custom" />

    <div class="footer" v-if="data.footer">
      {{ data.footer }}
    </div>
  </main>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue'

export default {
  name: 'Home',

  components: { NavLink },

  computed: {
    data() {
      return this.$page.frontmatter
    },

    actionLink() {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      }
    },

    hotItems() {
      return [
        {
          icon: '💻',
          title: 'Vibe Coding 教程',
          desc: '零基础学会用 AI 编程，每天 10 分钟，一周做出可上线项目。',
          link: '/_00-vibe-coding-简介/'
        },
        {
          icon: '🤖',
          title: 'DeepSeek 完全指南',
          desc: '从注册到使用，从提问到本地部署，一文看懂 DeepSeek 所有玩法。',
          link: '/ai/#关于deepseek'
        },
        {
          icon: '👑',
          title: '会员专区',
          desc: '加入会员解锁全部付费教程，独家 AI 变现项目，一对一答疑。',
          link: '/member/'
        }
      ]
    }
  },

  methods: {
    handleFeatureClick(feature) {
      if (feature.link) {
        this.$router.push(feature.link)
      }
    },

    navigateTo(link) {
      if (link.startsWith('http')) {
        window.open(link, '_blank')
      } else {
        this.$router.push(link)
      }
    }
  }
}
</script>

<style lang="stylus">
.home
  padding $navbarHeight 2rem 0
  max-width 1200px
  margin 0 auto

  .hero
    text-align center
    padding 4rem 2rem 2rem

    .hero-image
      max-width 120px
      height auto
      margin-bottom 1.5rem
      animation float 3s ease-in-out infinite

    @keyframes float
      0%, 100%
        transform translateY(0)
      50%
        transform translateY(-10px)

    .hero-title
      font-size 2.5rem
      font-weight 700
      color #2c3e50
      margin 0 0 1rem
      background linear-gradient(135deg, #3eaf7c, #36996c)
      -webkit-background-clip text
      -webkit-text-fill-color transparent
      background-clip text

    .description
      font-size 1.2rem
      color #666
      max-width 800px
      margin 0 auto 2rem
      line-height 1.8

    .action
      margin-top 2rem

    .action-button
      display inline-block
      font-size 1.1rem
      font-weight 600
      color #fff
      background linear-gradient(135deg, #3eaf7c, #36996c)
      padding 0.8rem 2rem
      border-radius 50px
      transition all 0.3s ease
      box-shadow 0 4px 15px rgba(62, 175, 124, 0.3)
      text-decoration none

      &:hover
        transform translateY(-2px)
        box-shadow 0 6px 20px rgba(62, 175, 124, 0.4)

  .banner
    text-align center
    margin 2rem auto
    max-width 800px

    .banner-link
      display inline-block
      background linear-gradient(135deg, #fff5f5, #fff)
      border 1px solid #ffcdd2
      color #e53935
      padding 0.8rem 1.5rem
      border-radius 8px
      text-decoration none
      font-size 0.95rem
      transition all 0.3s ease

      &:hover
        background #ffebee
        transform translateY(-2px)

  .features
    display grid
    grid-template-columns repeat(auto-fit, minmax(300px, 1fr))
    gap 1.5rem
    padding 2rem 0
    max-width 1100px
    margin 0 auto

    .feature
      background #fff
      border 1px solid #eaecef
      border-radius 12px
      padding 1.5rem
      cursor pointer
      transition all 0.3s ease

      &:hover
        transform translateY(-4px)
        box-shadow 0 8px 25px rgba(0, 0, 0, 0.1)
        border-color #3eaf7c

      .feature-icon
        font-size 2rem
        margin-bottom 0.8rem

      .feature-title
        font-size 1.2rem
        font-weight 600
        color #2c3e50
        margin 0 0 0.5rem

      .feature-details
        font-size 0.95rem
        color #666
        margin 0
        line-height 1.6

  .hot-section
    padding 3rem 0

    .section-title
      text-align center
      font-size 1.8rem
      color #2c3e50
      margin-bottom 2rem

    .hot-cards
      display grid
      grid-template-columns repeat(auto-fit, minmax(300px, 1fr))
      gap 1.5rem
      max-width 1100px
      margin 0 auto

      .hot-card
        background linear-gradient(135deg, #f8fffe, #fff)
        border 2px solid #e0f2e9
        border-radius 16px
        padding 2rem
        cursor pointer
        transition all 0.3s ease
        text-align center

        &:hover
          transform translateY(-6px)
          box-shadow 0 12px 30px rgba(62, 175, 124, 0.15)
          border-color #3eaf7c

        .hot-card-icon
          font-size 3rem
          margin-bottom 1rem

        .hot-card-title
          font-size 1.3rem
          font-weight 600
          color #2c3e50
          margin 0 0 0.8rem

        .hot-card-desc
          font-size 0.95rem
          color #666
          margin 0 0 1rem
          line-height 1.6

        .hot-card-link
          color #3eaf7c
          font-size 0.9rem
          font-weight 500

  .why-section
    text-align center
    padding 2rem 0 4rem

    .section-title
      font-size 1.8rem
      color #2c3e50
      margin-bottom 1.5rem

    .why-desc
      font-size 1.1rem
      color #666
      max-width 800px
      margin 0 auto
      line-height 1.8

  .footer
    padding 2rem
    text-align center
    color #999
    border-top 1px solid #eaecef

@media (max-width: $MQMobile)
  .home
    padding-left 1.5rem
    padding-right 1.5rem

    .hero
      padding 3rem 1rem 1.5rem

      .hero-title
        font-size 1.8rem

      .description
        font-size 1rem

    .features
      grid-template-columns 1fr

    .hot-cards
      grid-template-columns 1fr

    .hot-card
      padding 1.5rem
</style>
