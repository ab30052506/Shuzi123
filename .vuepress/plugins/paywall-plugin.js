const paywallPlugin = (md, options = {}) => {
  const memberLink = options.memberLink || '/member/'
  
  const paywallHtml = `
<div class="paywall-container">
  <div class="paywall-card">
    <div class="paywall-icon">🔒</div>
    <h3 class="paywall-title">本文剩余内容为会员专属</h3>
    <p class="paywall-desc">加入会员即可阅读全文，解锁全部付费教程和 AI 变现干货</p>
    <div class="paywall-benefits">
      <div class="benefit-item">✅ 全部付费教程</div>
      <div class="benefit-item">✅ AI 变现项目</div>
      <div class="benefit-item">✅ 社群答疑</div>
    </div>
    <a href="${memberLink}" class="paywall-btn">立即加入会员</a>
    <p class="paywall-tip">已有会员？在知识星球查看全文</p>
  </div>
</div>
<style>
.paywall-container{margin:40px 0;display:flex;justify-content:center}
.paywall-card{background:linear-gradient(135deg,#f8fffe 0%,#f0fff4 100%);border:2px solid #3eaf7c;border-radius:16px;padding:40px 30px;text-align:center;max-width:500px;width:100%;box-shadow:0 4px 20px rgba(62,175,124,0.15);position:relative;overflow:hidden}
.paywall-card::before{content:'';position:absolute;top:-50%;right:-50%;width:100%;height:100%;background:radial-gradient(circle,rgba(62,175,124,0.1) 0%,transparent 70%);pointer-events:none}
.paywall-icon{font-size:48px;margin-bottom:16px;animation:pulse 2s ease-in-out infinite}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}
.paywall-title{font-size:24px;font-weight:bold;color:#2c3e50;margin:0 0 12px 0}
.paywall-desc{font-size:15px;color:#666;margin:0 0 20px 0;line-height:1.6}
.paywall-benefits{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-bottom:24px}
.benefit-item{background:white;padding:8px 16px;border-radius:20px;font-size:14px;color:#3eaf7c;border:1px solid #3eaf7c}
.paywall-btn{display:inline-block;background:#3eaf7c;color:white;font-size:18px;font-weight:bold;padding:14px 40px;border-radius:30px;text-decoration:none;transition:all 0.3s ease;box-shadow:0 4px 15px rgba(62,175,124,0.3)}
.paywall-btn:hover{background:#36996c;transform:translateY(-2px);box-shadow:0 6px 20px rgba(62,175,124,0.4)}
.paywall-tip{font-size:13px;color:#999;margin:16px 0 0 0}
@media(max-width:768px){.paywall-card{padding:30px 20px;margin:0 10px}.paywall-title{font-size:20px}.paywall-btn{padding:12px 30px;font-size:16px}.paywall-benefits{flex-direction:column;align-items:center}}
</style>
`

  const blockRule = (state, startLine, endLine, silent) => {
    const content = state.src.slice(state.bMarks[startLine], state.eMarks[startLine])
    
    if (content.trim() === '::: paid') {
      if (silent) return true
      
      let nextLine = startLine + 1
      let foundEnd = false
      
      while (nextLine < endLine) {
        const lineContent = state.src.slice(state.bMarks[nextLine], state.eMarks[nextLine])
        if (lineContent.trim() === ':::') {
          foundEnd = true
          break
        }
        nextLine++
      }
      
      if (foundEnd) {
        const token = state.push('paywall_block', '', 0)
        token.map = [startLine, nextLine + 1]
        token.content = paywallHtml
        state.line = nextLine + 1
        return true
      }
    }
    
    return false
  }

  const blockRenderer = (tokens, idx) => {
    return tokens[idx].content
  }

  md.block.ruler.before('paragraph', 'paywall_block', blockRule)
  md.renderer.rules.paywall_block = blockRenderer

  const commentRule = (state) => {
    const pattern = /<!--\s*paid-content-start\s*-->[\s\S]*?<!--\s*paid-content-end\s*-->/g
    
    state.src = state.src.replace(pattern, paywallHtml)
    
    return true
  }

  md.core.ruler.before('normalize', 'paywall_comment', commentRule)
}

module.exports = paywallPlugin
