const axios = require('axios');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

// WordPress 配置
const WORDPRESS_URL = process.env.WORDPRESS_URL || 'https://ai.yidu123.cn';
const WORDPRESS_USERNAME = process.env.WORDPRESS_USERNAME || 'admin';
const WORDPRESS_APP_PASSWORD = process.env.WORDPRESS_APP_PASSWORD;

if (!WORDPRESS_APP_PASSWORD) {
  console.error('❌ 请设置 WORDPRESS_APP_PASSWORD 环境变量');
  process.exit(1);
}

// 创建 axios 实例，带基本认证
const wpApi = axios.create({
  baseURL: `${WORDPRESS_URL.replace(/\/$/, '')}/wp-json/wp/v2`,
  auth: {
    username: WORDPRESS_USERNAME,
    password: WORDPRESS_APP_PASSWORD.replace(/\s/g, '') // 移除空格
  }
});

// 工具函数：去除文件扩展名
function removeExt(filename) {
  return filename.replace(/\.md$/, '');
}

// 工具函数：转换中文分类别名
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u4e00-\u9fa5\-]+/g, '')
    .replace(/\-+/g, '-')
    .trim();
}

// 获取或创建分类
async function getOrCreateCategory(categoryName) {
  const slug = slugify(categoryName);
  
  try {
    // 先搜索分类是否存在
    const res = await wpApi.get('/categories', {
      params: { search: categoryName, per_page: 100 }
    });
    
    const found = res.data.find(cat => cat.name === categoryName || cat.slug === slug);
    if (found) {
      console.log(`✅ 分类已存在: ${categoryName} (ID: ${found.id})`);
      return found.id;
    }
    
    // 分类不存在，创建新分类
    const createRes = await wpApi.post('/categories', {
      name: categoryName,
      slug: slug
    });
    
    console.log(`🆕 创建新分类: ${categoryName} (ID: ${createRes.data.id})`);
    return createRes.data.id;
  } catch (error) {
    console.error(`❌ 处理分类失败 ${categoryName}:`, error.response?.data || error.message);
    throw error;
  }
}

// 根据路径提取分类数组
function extractCategoriesFromPath(filePath, rootDir) {
  const relativePath = path.relative(rootDir, filePath);
  const dirname = path.dirname(relativePath);
  
  if (dirname === '.') {
    return [];
  }
  
  // 如果文件在子目录下，目录路径就是分类层级
  // 例如 AI/article.md → ["AI"]
  // AI/OpenAI/article.md → ["AI", "OpenAI"] (WordPress 支持父分类)
  const parts = dirname.split(path.sep).filter(Boolean);
  return parts;
}

// 查找已存在的文章（根据 slug 匹配）
async function findPostBySlug(slug) {
  try {
    const res = await wpApi.get('/posts', {
      params: { slug, per_page: 1 }
    });
    if (res.data.length > 0) {
      return res.data[0].id;
    }
    return null;
  } catch (error) {
    console.error(`❌ 查找文章失败 ${slug}:`, error.response?.data || error.message);
    return null;
  }
}

// 创建或更新文章
async function createOrUpdatePost(title, contentHtml, categories, postSlug, frontmatter) {
  const categoryIds = await Promise.all(
    categories.map(cat => getOrCreateCategory(cat))
  );
  
  const existingPostId = await findPostBySlug(postSlug);
  
  const postData = {
    title: title,
    slug: postSlug,
    content: contentHtml,
    categories: categoryIds,
    status: frontmatter.status || 'publish'
  };
  
  // 添加标签
  if (frontmatter.tags) {
    postData.tags = frontmatter.tags;
  }
  
  // 添加日期
  if (frontmatter.date) {
    postData.date = frontmatter.date;
  }
  
  // 添加特色图片
  if (frontmatter.featured_media) {
    postData.featured_media = frontmatter.featured_media;
  }
  
  try {
    if (existingPostId) {
      // 更新文章
      await wpApi.post(`/posts/${existingPostId}`, postData);
      console.log(`✏️  更新文章: ${title} (ID: ${existingPostId})`);
      return { id: existingPostId, action: 'updated' };
    } else {
      // 创建新文章
      const res = await wpApi.post('/posts', postData);
      console.log(`✨ 创建新文章: ${title} (ID: ${res.data.id})`);
      return { id: res.data.id, action: 'created' };
    }
  } catch (error) {
    console.error(`❌ 发布文章失败 ${title}:`, error.response?.data || error.message);
    throw error;
  }
}

// 扫描目录下所有 md 文件
function scanMdFiles(dir) {
  const files = [];
  
  function scan(currentDir) {
    const items = fs.readdirSync(currentDir);
    items.forEach(item => {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scan(fullPath);
      } else if (item.endsWith('.md') && !item.startsWith('.')) {
        files.push(fullPath);
      }
    });
  }
  
  scan(dir);
  return files;
}

// 处理单个文件
async function processFile(filePath, rootDir) {
  console.log(`\n📄 处理: ${path.relative(rootDir, filePath)}`);
  
  const content = fs.readFileSync(filePath, 'utf8');
  const { data: frontmatter, content: markdownContent } = matter(content);
  
  // 从 frontmatter 或文件名获取标题
  const title = frontmatter.title || path.basename(filePath, '.md');
  
  // 从文件路径提取分类
  const pathCategories = extractCategoriesFromPath(filePath, rootDir);
  const frontmatterCategories = frontmatter.categories || frontmatter.category || [];
  
  // 合并分类：frontmatter 分类 + 路径分类
  let allCategories = [
    ...(Array.isArray(frontmatterCategories) ? frontmatterCategories : [frontmatterCategories]),
    ...pathCategories
  ];
  
  // 去重
  allCategories = [...new Set(allCategories)];
  
  console.log(`   标题: ${title}`);
  console.log(`   分类: ${allCategories.join(', ')}`);
  
  // Markdown 转 HTML
  const htmlContent = marked(markdownContent);
  
  // 生成文章 slug
  const postSlug = frontmatter.slug || slugify(title);
  
  // 创建/更新文章
  return await createOrUpdatePost(title, htmlContent, allCategories, postSlug, frontmatter);
}

// 获取 diff：对比上次 commit 找出变更的文件
function getChangedFiles(rootDir) {
  const { execSync } = require('child_process');
  
  try {
    // 获取上次 commit 之后变更的文件
    const diffOutput = execSync('git diff --name-only HEAD^ HEAD', { cwd: rootDir }).toString().trim();
    
    if (!diffOutput) {
      return null; // 没有变更文件，同步全部
    }
    
    const changedFiles = diffOutput.split('\n')
      .map(line => line.trim())
      .filter(line => line.endsWith('.md'))
      .map(line => path.join(rootDir, line));
    
    console.log(`\n🔍 检测到 ${changedFiles.length} 个变更的 Markdown 文件`);
    return changedFiles;
  } catch (error) {
    console.log('⚠️  无法获取文件变更，将同步所有 Markdown 文件');
    return null;
  }
}

// 主函数
async function main() {
  console.log('🚀 开始同步文章到 WordPress');
  console.log(`📍 WordPress 地址: ${WORDPRESS_URL}`);
  console.log(`👤 用户名: ${WORDPRESS_USERNAME}`);
  
  const rootDir = path.resolve(process.cwd());
  
  // 获取变更文件
  const changedFiles = getChangedFiles(rootDir);
  
  let filesToProcess;
  if (changedFiles && changedFiles.length > 0) {
    filesToProcess = changedFiles;
  } else {
    // 如果没有变更文件，扫描根目录所有 md 文件（排除 node_modules 和 .github）
    console.log('\n🔍 扫描所有 Markdown 文件...');
    filesToProcess = scanMdFiles(rootDir).filter(file => 
      !file.includes('node_modules') && 
      !file.includes('.github') &&
      !file.includes('.vuepress')
    );
  }
  
  console.log(`\n📊 需要处理 ${filesToProcess.length} 篇文章`);
  
  const results = {
    created: 0,
    updated: 0,
    failed: 0,
    errors: []
  };
  
  for (const file of filesToProcess) {
    try {
      const result = await processFile(file, rootDir);
      if (result.action === 'created') {
        results.created++;
      } else {
        results.updated++;
      }
    } catch (error) {
      results.failed++;
      results.errors.push({ file: path.relative(rootDir, file), error: error.message });
    }
  }
  
  console.log('\n🎉 同步完成！');
  console.log(`✅ 新建: ${results.created}`);
  console.log(`🔄 更新: ${results.updated}`);
  console.log(`❌ 失败: ${results.failed}`);
  
  if (results.errors.length > 0) {
    console.log('\n❌ 错误详情:');
    results.errors.forEach(err => {
      console.log(`   - ${err.file}: ${err.error}`);
    });
    process.exit(1);
  }
}

// 运行
main().catch(error => {
  console.error('💥 同步失败:', error);
  process.exit(1);
});
