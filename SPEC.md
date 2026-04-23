# HW流量分析知识库 - 项目设计规范

## 1. 概念与愿景

一个专为护网行动（HW）设计的流量分析知识库，帮助安全工程师快速识别和分析网络攻击流量。界面采用深色科技风格，营造专业的网络安全分析氛围，让分析人员在长时间工作中保持舒适的视觉体验。

## 2. 设计语言

### 美学方向
- **风格**: Cyberpunk/Security Operations Center (SOC) 暗色科技风格
- **氛围**: 专业、紧张、高效的军事化安全分析台

### 色彩系统
```css
--bg-primary: #111827;      /* 主背景 - 深灰蓝 */
--bg-secondary: #1f2937;     /* 次级背景 - 稍浅灰 */
--bg-card: #1f2937;          /* 卡片背景 */
--border: #374151;           /* 边框色 */
--text-primary: #f9fafb;     /* 主文字 - 亮白 */
--text-secondary: #9ca3af;   /* 次级文字 - 灰色 */
--accent-green: #10b981;     /* 成功/正常 - 翠绿 */
--accent-red: #ef4444;       /* 危险/攻击 - 红色 */
--accent-yellow: #f59e0b;   /* 警告/可疑 - 橙黄 */
--accent-blue: #3b82f6;     /* 信息/链接 - 蓝色 */
--accent-purple: #8b5cf6;    /* 强调/高亮 - 紫色 */
```

### 字体
- **主字体**: `Inter`, system-ui, sans-serif
- **代码字体**: `JetBrains Mono`, `Fira Code`, monospace
- **等宽字体用于命令**: font-mono

### 空间系统
- 基础单位: 4px
- 间距: 8px, 16px, 24px, 32px, 48px
- 卡片内边距: 24px
- 页面边距: 24px (移动端 16px)

### 动效哲学
- **淡入**: opacity 0→1, 600ms ease-out, 卡片错开50ms
- **悬停上浮**: translateY(0→-4px), 200ms ease
- **边框发光**: box-shadow添加accent色光晕

### 图标
- **库**: Lucide Icons
- **尺寸**: 20px (small), 24px (medium), 32px (large)
- **颜色**: 继承文字颜色或使用accent色

## 3. 布局与结构

### 整体架构
```
┌─────────────────────────────────────────┐
│  Header: Logo + 导航 + 搜索             │
├─────────────────────────────────────────┤
│                                         │
│  Hero Section: 标题 + 简介              │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  知识模块 Grid (响应式)                  │
│  ┌────────┐ ┌────────┐ ┌────────┐       │
│  │ 模块1  │ │ 模块2  │ │ 模块3  │       │
│  └────────┘ └────────┘ └────────┘       │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  内容详情区                              │
│  - 左侧: 目录导航                        │
│  - 右侧: 内容主体                        │
│                                         │
├─────────────────────────────────────────┤
│  Footer: 版权 + 更新日期                 │
└─────────────────────────────────────────┘
```

### 页面结构
1. **首页**: 知识库概览 + 快速入口
2. **流量特征原理**: 各类攻击流量特征详解
3. **流量分析方法**: 分析方法和工具使用
4. **Wireshark筛选**: 筛选命令速查表

### 响应式断点
- mobile: < 640px (单列)
- tablet: 640px - 1024px (双列)
- desktop: > 1024px (四列网格)

## 4. 功能与交互

### 首页功能
- 展示四大核心模块卡片
- 每个卡片悬停显示简介
- 点击进入对应详情页

### 流量特征模块
- 按协议分类: HTTP/HTTPS, DNS, TCP, UDP, ICMP
- 按攻击类型分类: SQL注入, XSS, CSRF,  webshell, 反弹shell, 隧道流量
- 每个特征包含: 原理说明 + 流量特征 + 典型案例 + 筛查命令

### 流量分析方法
- 被动分析 vs 主动分析
- 流量采样技术
- 异常检测方法
- 关联分析方法

### Wireshark筛选命令
- 按场景分类
- 命令语法高亮
- 一键复制功能
- 应用场景说明

### 交互细节
- **卡片悬停**: 上浮4px + 边框发光 + 阴影增强
- **按钮点击**: scale(0.98) + 背景变亮
- **复制成功**: 按钮短暂变绿 + 提示"已复制"
- **滚动**: 平滑滚动，导航固定时添加顶部偏移

## 5. 组件清单

### Header
- Logo + 标题
- 导航链接 (流量特征 | 分析方法 | 筛选命令)
- 移动端: 汉堡菜单

### 模块卡片 (ModuleCard)
- 图标 (Lucide)
- 标题
- 描述文字
- 悬停状态: 上浮 + 边框高亮

### 内容卡片 (ContentCard)
- 标题
- 内容区域(支持代码块)
- 标签 (可选)
- 底部操作栏

### 代码块 (CodeBlock)
- 语法高亮 (使用 Prism.js 或 highlight.js)
- 复制按钮
- 语言标签
- 边框样式: border border-gray-700 rounded-lg

### 命令项 (CommandItem)
- 命令代码
- 应用场景描述
- 复制按钮
- 分类标签

### 目录导航 (TOC)
- 固定在左侧
- 当前章节高亮
- 点击跳转

### 标签 (Badge)
- 状态: normal, warning, danger, info
- 颜色对应accent色

### 翻页导航
- 上一页/下一页
- 当前页指示

## 6. 技术方案

### 技术栈
- **运行时**: Node.js
- **模板引擎**: EJS (或纯HTML)
- **样式**: Tailwind CSS (CDN)
- **图标**: Lucide Icons (CDN)
- **代码高亮**: Prism.js (CDN)

### 项目结构
```
/workspace
├── index.html          # 首页
├── theory.html         # 流量特征原理
├── methods.html        # 流量分析方法
├── filters.html        # Wireshark筛选命令
├── css/
│   └── style.css       # 自定义样式
├── js/
│   └── main.js         # 交互逻辑
└── SPEC.md
```

### CDN资源
```html
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- Lucide Icons -->
<script src="https://unpkg.com/lucide@latest"></script>

<!-- Prism.js for code highlighting -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-bash.min.js"></script>
```

## 7. 内容大纲

### 流量特征原理
1. **HTTP/HTTPS协议特征**
   - 请求方法分布
   - User-Agent特征
   - URL路径模式
   - 响应状态码
   - 异常请求特征

2. **DNS协议特征**
   - DNS查询类型
   - 异常DNS行为
   - DNS隧道特征
   - DGA域名识别

3. **TCP协议特征**
   - 连接状态
   - 重传机制
   - 窗口大小
   - TTL分析

4. **常见攻击流量特征**
   - SQL注入流量
   - XSS攻击流量
   - WebShell流量
   - 反弹Shell流量
   - 横向移动流量
   - 隧道流量特征

### 流量分析方法
1. **基础分析方法**
   - 流量捕获技术
   - 协议分析
   - 统计特征分析

2. **高级分析技术**
   - 行为分析
   - 异常检测
   - 关联分析
   - 威胁情报关联

### Wireshark筛选命令
1. **基础筛选**
   - ip.addr, ip.src, ip.dst
   - tcp.port, udp.port
   - http.request.method

2. **协议筛选**
   - http, dns, tls, ssh
   - tcp, udp, icmp

3. **高级筛选**
   - 表达式组合
   - 正则匹配
   - 字节偏移筛选

4. **应用场景**
   - 筛查Web攻击
   - 发现后门通信
   - 分析隧道流量
   - 溯源攻击路径
