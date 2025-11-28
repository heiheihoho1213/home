---
id: '1'
title: '🎮 从 NES 到现代 Web —— 像素风组件库 Pixel UI  React 版本，欢迎大家一起参与这个项目'
slug: 'Pixel-UI-React'
date: '2025-11-19'
readTime: '3 min'
excerpt: '掘金作者 @猫闷台817 的 Pixel U Vue3 版上线了，现在我与他合作的 React 版也来了...'
tags: ['REACT', 'GITHUB', 'UI/UX']
---

还记得几个月前，掘金作者 ***@猫闷台817*** 的 Vue3 版上线了，地址是这个：<https://github.com/maomentai817/pixel-ui> 。现在我与他合作的 React 版也来了，github 地址：<https://github.com/maomentai817/pixel-ui-react>

***

![image.png](/img/posts/Pixel-UI-React/1.jpeg)

### 1️⃣ 项目初衷

红白机、GameBoy 游戏，那种块状像素 UI 总让人心驰神往。现在虽然是现代 Web 时代，但像素风 UI 的美学依然令人着迷。

现有的 8-bit 风组件库 *NES.css* 是一个 CSS 框架, 它只需要 CSS，不依赖于任何 JavaScript, 核心绘制逻辑都是基于 *box-shadow* 实现, 但在不同浏览器环境, 浏览器缩放时，*box-shadow* 的浮点偏移值经过缩放后无法精准对齐物理像素网格，导致渲染出现间隙。子像素定位、像素舍入误差和 *box-shadow* 本身不适合精细拼接渲染等原因造成了一些困扰

![QQ\_1747188289846.png](/img/posts/Pixel-UI-React/2.jpeg)

[NES.css](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fnostalgic-css%2FNES.css "https://github.com/nostalgic-css/NES.css")

于是就有了基于 Vue 3 / React + TypeScript + UnoCSS + CSS Houdini 打造的一款组件库 —— 让**像素风重回前端视野**。

Vue3 项目地址👇\
📦 [pixel-ui](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fmaomentai817%2Fpixel-ui "https://github.com/maomentai817/pixel-ui")

React 项目地址👇\
📦 [pixel-ui-react](https://github.com/maomentai817/pixel-ui-react)

组件库首页👇\
📎 [Home](https://maomentai817.github.io/pixel-ui-react)

***

### 2️⃣ 技术选型

| 技术栈               | 用途                       |
| ----------------- | ------------------------ |
| React19 + *Hooks* | 组件化开发核心                  |
| TypeScript        | 类型系统增强开发体验               |
| UnoCSS            | 原子化 CSS，灵活配置样式类          |
| CSS Houdini       | 自定义 Paint Worklet 渲染像素边框 |
| Dumi              | 组件展示 + 文档系统              |
| Vitest            | 测试组件逻辑与渲染                |
| pnpm + Monorepo     | 高效构建与多包管理                |

***

### 3️⃣ 项目目前进度

已迁移上线组件：

*   ✅ Button 按钮
*   ✅ Icon 图标
*   ✅ Overlay 遮罩层
*   ✅ Text 文本
*   ✅ ConfigProvider 全局配置
*   ✅ Input 输入框
*   ✅ Popconfirm 气泡确认框
*   ✅ Tooltip 文字提示

已发布 npm，可供下载。

> 更过规划见 vue 版：<https://juejin.cn/post/7503846429081944101>

***

### 4️⃣ 效果预览

![image.png](/img/posts/Pixel-UI-React/3.jpeg)

![image.png](/img/posts/Pixel-UI-React/4.jpeg)

![image.png](/img/posts/Pixel-UI-React/5.jpeg)

欢迎大家：

*   🌟 点个 Star
*   🐛 提 Issue，有什么好的点子和想法都可以提
*   🤝 提 PR，增强完善功能
*   📢 分享给像素控朋友！

> 项目地址：<https://github.com/maomentai817/pixel-ui-react>
