module.exports = [
"[externals]/react-markdown [external] (react-markdown, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("react-markdown");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/remark-gfm [external] (remark-gfm, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("remark-gfm");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/components/NeoButton.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NeoButton",
    ()=>NeoButton
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
;
const NeoButton = ({ children, variant = 'primary', fullWidth = false, className = '', ...props })=>{
    const baseStyles = "relative font-bold uppercase tracking-wider border-2 border-black transition-all duration-75 active:top-[4px] active:left-[4px] active:shadow-none";
    let colorStyles = "";
    let shadowStyles = "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]";
    switch(variant){
        case 'primary':
            colorStyles = "bg-white text-black hover:bg-yellow-200";
            break;
        case 'secondary':
            colorStyles = "bg-white text-black hover:bg-gray-100";
            break;
        case 'black':
            colorStyles = "bg-black text-white hover:bg-gray-900";
            shadowStyles = "shadow-[4px_4px_0px_0px_rgba(100,100,100,1)]";
            break;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
        className: `
        ${baseStyles} 
        ${colorStyles} 
        ${shadowStyles}
        py-3 px-6 
        ${fullWidth ? 'w-full' : ''} 
        ${className}
      `,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/NeoButton.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/components/NeoCard.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NeoCard",
    ()=>NeoCard
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
;
const NeoCard = ({ children, className = '', hoverEffect = false, color = 'bg-white' })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: `
      border-2 border-black 
      ${color}
      shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
      ${hoverEffect ? 'transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]' : ''}
      ${className}
    `,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/NeoCard.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/components/Reveal.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Reveal",
    ()=>Reveal
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
const Reveal = ({ children, className = '', delay = 0 })=>{
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const ref = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        // Fallback if IntersectionObserver is not supported
        if (!('IntersectionObserver' in window)) {
            setIsVisible(true);
            return;
        }
        const observer = new IntersectionObserver(([entry])=>{
            if (entry.isIntersecting) {
                setTimeout(()=>{
                    setIsVisible(true);
                }, delay);
                if (ref.current) observer.unobserve(ref.current);
            }
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        if (ref.current) {
            observer.observe(ref.current);
        }
        return ()=>{
            // Safely disconnect
            observer.disconnect();
        };
    }, [
        delay
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        ref: ref,
        className: `transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/Reveal.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/data/projects.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PROJECTS_EN",
    ()=>PROJECTS_EN,
    "PROJECTS_ZH",
    ()=>PROJECTS_ZH
]);
const PROJECTS_EN = [
    {
        id: '1',
        title: 'Neon Voxel Engine',
        description: 'A WebGL based voxel rendering engine built for high performance in browser environments.',
        link: '#',
        image: 'https://picsum.photos/800/600?random=1',
        tags: [
            'WebGL',
            'Rust',
            'WASM'
        ],
        category: 'Frontend Tools'
    },
    {
        id: '2',
        title: 'Brutalist UI Kit',
        description: 'An open-source React component library focusing on neo-brutalist design trends.',
        link: '#',
        image: 'https://picsum.photos/800/600?random=2',
        tags: [
            'React',
            'Tailwind',
            'NPM'
        ],
        category: 'Frontend Tools'
    },
    {
        id: '3',
        title: 'Crypto Dashboard',
        description: 'Real-time cryptocurrency tracking dashboard with predictive analytics powered by Gemini.',
        link: '#',
        image: 'https://picsum.photos/800/600?random=3',
        tags: [
            'Next.js',
            'API',
            'Finance'
        ],
        category: 'AI Applications'
    },
    {
        id: '4',
        title: 'Retro Terminal',
        description: 'A browser-based terminal emulator that connects to remote linux instances via WebSocket.',
        link: '#',
        image: 'https://picsum.photos/800/600?random=4',
        tags: [
            'Socket.io',
            'Node',
            'XTerm'
        ],
        category: 'System Tools'
    }
];
const PROJECTS_ZH = [
    {
        id: '1',
        title: '霓虹体素引擎',
        description: '一个基于 WebGL 的体素渲染引擎，专为浏览器环境的高性能表现而构建。',
        link: '#',
        image: 'https://picsum.photos/800/600?random=1',
        tags: [
            'WebGL',
            'Rust',
            'WASM'
        ],
        category: '前端工具'
    },
    {
        id: '2',
        title: '粗野主义 UI 套件',
        description: '一个开源的 React 组件库，专注于新粗野主义设计趋势。',
        link: '#',
        image: 'https://picsum.photos/800/600?random=2',
        tags: [
            'React',
            'Tailwind',
            'NPM'
        ],
        category: '前端工具'
    },
    {
        id: '3',
        title: '加密货币仪表盘',
        description: '由 Gemini 驱动的具有预测分析功能的实时加密货币追踪仪表盘。',
        link: '#',
        image: 'https://picsum.photos/800/600?random=3',
        tags: [
            'Next.js',
            'API',
            '金融'
        ],
        category: 'AI 应用'
    },
    {
        id: '4',
        title: '复古终端',
        description: '一个基于浏览器的终端模拟器，通过 WebSocket 连接到远程 Linux 实例。',
        link: '#',
        image: 'https://picsum.photos/800/600?random=4',
        tags: [
            'Socket.io',
            'Node',
            'XTerm'
        ],
        category: '系统工具'
    }
];
}),
"[project]/data/blogPosts.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BLOG_POSTS_EN",
    ()=>BLOG_POSTS_EN,
    "BLOG_POSTS_ZH",
    ()=>BLOG_POSTS_ZH
]);
const BLOG_POSTS_EN = [
    {
        id: '1',
        title: 'The Return of Brutalism',
        date: 'Oct 24, 2023',
        readTime: '5 min',
        excerpt: 'Why modern web design is shifting back to raw, unpolished aesthetics and what it means for UX.',
        tags: [
            'DESIGN',
            'TRENDS',
            'UI/UX'
        ],
        content: `
# The Return of Brutalism

Web design is cyclical. After years of soft shadows, rounded corners, and frosted glass (looking at you, Apple), we are seeing a resurgence of **brutalism**.

## What is Neo-Brutalism?

It's not just about being ugly on purpose. It's about:
- High contrast
- Honest layout structures
- Default browser fonts (or weird ones)
- Visible borders

### Why now?
Users are tired of the "corporate memphis" art style. They want websites that feel authentic, raw, and perhaps a bit chaotic.

> "Design is not just what it looks like and feels like. Design is how it works." - Steve Jobs (but he probably wouldn't like this site).

## Conclusion
Embrace the ugly. Make it bold. Make it fast.
    `
    },
    {
        id: '2',
        title: 'Optimizing React for Voxel Engines',
        date: 'Nov 02, 2023',
        readTime: '8 min',
        excerpt: 'Deep dive into managing state and WebGL context when building high-performance 3D applications.',
        tags: [
            'REACT',
            'WEBGL',
            'PERFORMANCE'
        ],
        content: `
# Optimizing React for Voxels

React is great, but it's slow if you try to render 10,000 divs. Here is how I built the voxel engine on the homepage.

## The Loop
Do not use \`useEffect\` for your render loop. Use \`requestAnimationFrame\` outside of the React render cycle.

\`\`\`javascript
const loop = () => {
  renderScene();
  requestAnimationFrame(loop);
}
\`\`\`

## State Management
Avoid Redux for high-frequency updates (like mouse position in 3D space). Use Refs.

1. Mutable refs for position
2. React state for UI overlays only

Keep your frame budget under 16ms!
    `
    },
    {
        id: '3',
        title: 'Why I Switched to Tailwind',
        date: 'Dec 15, 2023',
        readTime: '4 min',
        excerpt: 'A controversial take on why utility classes are superior to semantic CSS for rapid prototyping.',
        tags: [
            'CSS',
            'TAILWIND',
            'OPINION'
        ],
        content: `
# Tailwind CSS Supremacy

I used to hate utility classes. "It clutters the HTML!" I screamed. Then I tried it.

## The Velocity
The speed at which you can build a layout like this one is unmatched.

- Flexbox is easy
- Spacing is consistent
- Dark mode is a toggle

## Maintenance
It is actually easier to maintain. You don't have a 5000 line CSS file where you are afraid to delete a class named \`.wrapper-inner-container\`.

**Try it.** You won't go back.
    `
    }
];
const BLOG_POSTS_ZH = [
    {
        id: '1',
        title: '粗野主义的回归',
        date: '2023-10-24',
        readTime: '5 分钟',
        excerpt: '为什么现代网页设计正在回归原始、未修饰的美学，以及这对用户体验意味着什么。',
        tags: [
            '设计',
            '趋势',
            'UI/UX'
        ],
        content: `
# 粗野主义的回归

网页设计是周期性的。经过多年的柔和阴影、圆角和毛玻璃效果（看着你呢，Apple），我们看到了**粗野主义**的复苏。

## 什么是新粗野主义？

它不仅仅是为了丑而丑。它是关于：
- 高对比度
- 诚实的布局结构
- 默认的浏览器字体（或奇怪的字体）
- 可见的边框

### 为什么是现在？
用户厌倦了“企业孟菲斯”艺术风格。他们想要感觉真实、原始，甚至有点混乱的网站。

> “设计不仅仅是外观和感觉。设计是其工作原理。” - 史蒂夫·乔布斯（但他可能不会喜欢这个网站）。

## 结论
拥抱丑陋。大胆一点。快一点。
    `
    },
    {
        id: '2',
        title: '为体素引擎优化 React',
        date: '2023-11-02',
        readTime: '8 分钟',
        excerpt: '深入探讨在构建高性能 3D 应用程序时如何管理状态和 WebGL 上下文。',
        tags: [
            'REACT',
            'WEBGL',
            '性能'
        ],
        content: `
# 为体素优化 React

React 很棒，但如果你试图渲染 10,000 个 div，它就很慢。以下是我如何在主页上构建体素引擎的。

## 循环
不要使用 \`useEffect\` 进行渲染循环。在 React 渲染周期之外使用 \`requestAnimationFrame\`。

\`\`\`javascript
const loop = () => {
  renderScene();
  requestAnimationFrame(loop);
}
\`\`\`

## 状态管理
避免对高频更新（如 3D 空间中的鼠标位置）使用 Redux。使用 Refs。

1. 用于位置的可变 refs
2. 仅用于 UI 覆盖的 React 状态

保持你的帧预算在 16ms 以内！
    `
    },
    {
        id: '3',
        title: '为什么我切换到 Tailwind',
        date: '2023-12-15',
        readTime: '4 分钟',
        excerpt: '一个有争议的观点：为什么原子类在快速原型设计方面优于语义 CSS。',
        tags: [
            'CSS',
            'TAILWIND',
            '观点'
        ],
        content: `
# Tailwind CSS 霸权

我曾经讨厌原子类。“它让 HTML 变得混乱！”我尖叫道。然后我尝试了它。

## 速度
构建像这样一个布局的速度是无与伦比的。

- Flexbox 很简单
- 间距是一致的
- 暗黑模式只是一个开关

## 维护
它实际上更容易维护。你不会有一个 5000 行的 CSS 文件，在那里你不敢删除名为 \`.wrapper-inner-container\` 的类。

**试一试。** 你回不去的。
    `
    }
];
}),
"[project]/data/galleryImages.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GALLERY_IMAGES_EN",
    ()=>GALLERY_IMAGES_EN,
    "GALLERY_IMAGES_ZH",
    ()=>GALLERY_IMAGES_ZH
]);
const GALLERY_IMAGES_EN = Array.from({
    length: 9
}).map((_, i)=>({
        id: `img-${i}`,
        src: `https://picsum.photos/1200/1200?random=${i + 10}`,
        alt: `Abstract composition ${i + 1}`,
        category: i % 2 === 0 ? '3D RENDER' : 'PHOTOGRAPHY',
        title: i % 2 === 0 ? `Render Experiment #${i + 1}` : `Urban Study #${i + 1}`,
        description: i % 2 === 0 ? 'An exploration of procedural generation using Blender geometry nodes. The texture work focuses on imperfection and realism within a digital construct.' : 'Captured on 35mm film in Tokyo. This shot emphasizes the interplay between brutalist architecture and organic city life.'
    }));
const GALLERY_IMAGES_ZH = Array.from({
    length: 9
}).map((_, i)=>({
        id: `img-${i}`,
        src: `https://picsum.photos/1200/1200?random=${i + 10}`,
        alt: `抽象构图 ${i + 1}`,
        category: i % 2 === 0 ? '3D 渲染' : '摄影',
        title: i % 2 === 0 ? `渲染实验 #${i + 1}` : `城市研究 #${i + 1}`,
        description: i % 2 === 0 ? '使用 Blender 几何节点探索程序化生成。纹理工作专注于数字构造中的不完美和真实感。' : '在东京用 35mm 胶片拍摄。这张照片强调了粗野主义建筑与有机城市生活之间的相互作用。'
    }));
}),
"[project]/data/content.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CONTENT",
    ()=>CONTENT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$projects$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/projects.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$blogPosts$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/blogPosts.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$galleryImages$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/galleryImages.ts [ssr] (ecmascript)");
;
;
;
const CONTENT = {
    en: {
        projects: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$projects$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["PROJECTS_EN"],
        blog: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$blogPosts$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["BLOG_POSTS_EN"],
        gallery: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$galleryImages$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["GALLERY_IMAGES_EN"]
    },
    zh: {
        projects: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$projects$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["PROJECTS_ZH"],
        blog: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$blogPosts$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["BLOG_POSTS_ZH"],
        gallery: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$galleryImages$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["GALLERY_IMAGES_ZH"]
    }
};
}),
"[externals]/gray-matter [external] (gray-matter, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("gray-matter", () => require("gray-matter"));

module.exports = mod;
}),
"[project]/lib/posts.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAllPosts",
    ()=>getAllPosts,
    "getPostBySlug",
    ()=>getPostBySlug,
    "getPostSlugs",
    ()=>getPostSlugs
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$gray$2d$matter__$5b$external$5d$__$28$gray$2d$matter$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/gray-matter [external] (gray-matter, cjs)");
;
;
;
const postsDirectory = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'posts');
function getPostSlugs(lang) {
    const langDir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(postsDirectory, lang);
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(langDir)) {
        return [];
    }
    return __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readdirSync(langDir).filter((file)=>file.endsWith('.md')).map((file)=>file.replace(/\.md$/, ''));
}
function getPostBySlug(slug, lang) {
    const langDir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(postsDirectory, lang);
    const fullPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(langDir, `${slug}.md`);
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(fullPath)) {
        return null;
    }
    const fileContents = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(fullPath, 'utf8');
    const { data, content } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$gray$2d$matter__$5b$external$5d$__$28$gray$2d$matter$2c$__cjs$29$__["default"])(fileContents);
    return {
        id: data.id,
        title: data.title,
        date: data.date,
        readTime: data.readTime,
        excerpt: data.excerpt,
        tags: data.tags || [],
        content: content.trim()
    };
}
function getAllPosts(lang) {
    const slugs = getPostSlugs(lang);
    const posts = slugs.map((slug)=>getPostBySlug(slug, lang)).filter((post)=>post !== null).sort((a, b)=>{
        // Sort by date descending
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    return posts;
}
}),
"[project]/pages/blog.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>Blog,
    "getStaticProps",
    ()=>getStaticProps
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$4_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.4_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$4_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.4_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$markdown__$5b$external$5d$__$28$react$2d$markdown$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/react-markdown [external] (react-markdown, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$remark$2d$gfm__$5b$external$5d$__$28$remark$2d$gfm$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/remark-gfm [external] (remark-gfm, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NeoButton$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/NeoButton.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NeoCard$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/NeoCard.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Reveal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Reveal.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$content$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/content.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$posts$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/posts.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$LanguageContext$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/LanguageContext.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$translations$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/translations.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$markdown__$5b$external$5d$__$28$react$2d$markdown$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$remark$2d$gfm__$5b$external$5d$__$28$remark$2d$gfm$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$markdown__$5b$external$5d$__$28$react$2d$markdown$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$remark$2d$gfm__$5b$external$5d$__$28$remark$2d$gfm$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
;
;
;
;
function Blog({ content }) {
    const { language } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$LanguageContext$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["useLanguage"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$4_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const t = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$translations$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["TRANSLATIONS"][language];
    const posts = content[language].blog;
    const meta = {
        en: {
            title: 'Journal | Heiheihoho\'s Portfolio',
            description: 'Long-form thoughts on design trends, voxel engines, and Tailwind experiments.'
        },
        zh: {
            title: '博客 | Heiheihoho\'s 文章',
            description: '记录工作心得、技术分享与生活感悟的长文笔记。'
        }
    }[language];
    const canonical = `https://neo-brutalism.example.com${router.asPath}`;
    const [selectedPost, setSelectedPost] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [selectedTag, setSelectedTag] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('ALL');
    const allTags = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>{
        const tags = new Set();
        // 按照 date 倒序
        posts.toSorted((a, b)=>new Date(b.date).getTime() - new Date(a.date).getTime()).forEach((post)=>post.tags.forEach((tag)=>tags.add(tag)));
        return [
            'ALL',
            ...Array.from(tags)
        ];
    }, [
        posts
    ]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (selectedTag !== 'ALL' && !allTags.includes(selectedTag)) {
            setSelectedTag('ALL');
        }
    }, [
        language,
        allTags,
        selectedTag
    ]);
    const filteredPosts = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>{
        const base = selectedTag === 'ALL' ? posts : posts.filter((post)=>post.tags.includes(selectedTag));
        return [
            ...base
        ].sort((a, b)=>new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [
        selectedTag,
        posts
    ]);
    if (selectedPost) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "animate-fade-in-up",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$4_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                            children: [
                                selectedPost.title,
                                " | ",
                                meta.title
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/blog.tsx",
                            lineNumber: 66,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                            name: "description",
                            content: selectedPost.excerpt
                        }, void 0, false, {
                            fileName: "[project]/pages/blog.tsx",
                            lineNumber: 67,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("link", {
                            rel: "canonical",
                            href: canonical
                        }, void 0, false, {
                            fileName: "[project]/pages/blog.tsx",
                            lineNumber: 68,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                            property: "og:type",
                            content: "article"
                        }, void 0, false, {
                            fileName: "[project]/pages/blog.tsx",
                            lineNumber: 69,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                            property: "og:title",
                            content: selectedPost.title
                        }, void 0, false, {
                            fileName: "[project]/pages/blog.tsx",
                            lineNumber: 70,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                            property: "og:description",
                            content: selectedPost.excerpt
                        }, void 0, false, {
                            fileName: "[project]/pages/blog.tsx",
                            lineNumber: 71,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                            property: "og:url",
                            content: canonical
                        }, void 0, false, {
                            fileName: "[project]/pages/blog.tsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                            property: "og:image",
                            content: "https://picsum.photos/1200/630?blog"
                        }, void 0, false, {
                            fileName: "[project]/pages/blog.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                            name: "twitter:card",
                            content: "summary_large_image"
                        }, void 0, false, {
                            fileName: "[project]/pages/blog.tsx",
                            lineNumber: 74,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                            name: "twitter:title",
                            content: selectedPost.title
                        }, void 0, false, {
                            fileName: "[project]/pages/blog.tsx",
                            lineNumber: 75,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                            name: "twitter:description",
                            content: selectedPost.excerpt
                        }, void 0, false, {
                            fileName: "[project]/pages/blog.tsx",
                            lineNumber: 76,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                            name: "twitter:image",
                            content: "https://picsum.photos/1200/630?blog"
                        }, void 0, false, {
                            fileName: "[project]/pages/blog.tsx",
                            lineNumber: 77,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/blog.tsx",
                    lineNumber: 65,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NeoButton$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["NeoButton"], {
                    onClick: ()=>setSelectedPost(null),
                    variant: "secondary",
                    className: "mb-8",
                    children: t.blog_back
                }, void 0, false, {
                    fileName: "[project]/pages/blog.tsx",
                    lineNumber: 79,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NeoCard$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["NeoCard"], {
                    className: "p-8 md:p-12 bg-white",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "border-b-4 border-black pb-6 mb-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center gap-4 mb-4 text-sm font-bold uppercase tracking-wider text-gray-500",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            children: selectedPost.date
                                        }, void 0, false, {
                                            fileName: "[project]/pages/blog.tsx",
                                            lineNumber: 85,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            children: "•"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/blog.tsx",
                                            lineNumber: 86,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            children: [
                                                selectedPost.readTime,
                                                " ",
                                                t.blog_read_time
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/blog.tsx",
                                            lineNumber: 87,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "hidden sm:inline",
                                            children: "•"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/blog.tsx",
                                            lineNumber: 90,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "flex gap-2",
                                            children: selectedPost.tags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: "bg-yellow-200 border border-black px-1.5 py-0.5 text-[10px] text-black",
                                                    children: tag
                                                }, tag, false, {
                                                    fileName: "[project]/pages/blog.tsx",
                                                    lineNumber: 93,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/pages/blog.tsx",
                                            lineNumber: 91,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/blog.tsx",
                                    lineNumber: 84,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                    className: "text-4xl md:text-6xl font-black uppercase leading-none",
                                    children: selectedPost.title
                                }, void 0, false, {
                                    fileName: "[project]/pages/blog.tsx",
                                    lineNumber: 99,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/blog.tsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "prose prose-xl prose-black max-w-none font-medium markdown-content",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$markdown__$5b$external$5d$__$28$react$2d$markdown$2c$__esm_import$29$__["default"], {
                                remarkPlugins: [
                                    __TURBOPACK__imported__module__$5b$externals$5d2f$remark$2d$gfm__$5b$external$5d$__$28$remark$2d$gfm$2c$__esm_import$29$__["default"]
                                ],
                                components: {
                                    h1: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                            className: "text-4xl font-bold mt-8 mb-4",
                                            children: children
                                        }, void 0, false, {
                                            fileName: "[project]/pages/blog.tsx",
                                            lineNumber: 106,
                                            columnNumber: 39
                                        }, void 0),
                                    h2: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                            className: "text-2xl font-bold mt-6 mb-3 border-l-4 border-yellow-400 pl-4",
                                            children: children
                                        }, void 0, false, {
                                            fileName: "[project]/pages/blog.tsx",
                                            lineNumber: 107,
                                            columnNumber: 39
                                        }, void 0),
                                    h3: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                            className: "text-xl font-bold mt-4 mb-2",
                                            children: children
                                        }, void 0, false, {
                                            fileName: "[project]/pages/blog.tsx",
                                            lineNumber: 108,
                                            columnNumber: 39
                                        }, void 0),
                                    p: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                            className: "mb-4 text-lg leading-relaxed",
                                            children: children
                                        }, void 0, false, {
                                            fileName: "[project]/pages/blog.tsx",
                                            lineNumber: 109,
                                            columnNumber: 38
                                        }, void 0),
                                    blockquote: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("blockquote", {
                                            className: "bg-gray-100 p-4 border-l-4 border-black italic my-4",
                                            children: children
                                        }, void 0, false, {
                                            fileName: "[project]/pages/blog.tsx",
                                            lineNumber: 110,
                                            columnNumber: 47
                                        }, void 0),
                                    ul: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                                            className: "ml-4 list-disc mb-4",
                                            children: children
                                        }, void 0, false, {
                                            fileName: "[project]/pages/blog.tsx",
                                            lineNumber: 111,
                                            columnNumber: 39
                                        }, void 0),
                                    ol: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ol", {
                                            className: "ml-4 list-decimal mb-4",
                                            children: children
                                        }, void 0, false, {
                                            fileName: "[project]/pages/blog.tsx",
                                            lineNumber: 112,
                                            columnNumber: 39
                                        }, void 0),
                                    li: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                            className: "font-bold mb-2",
                                            children: children
                                        }, void 0, false, {
                                            fileName: "[project]/pages/blog.tsx",
                                            lineNumber: 113,
                                            columnNumber: 39
                                        }, void 0),
                                    code: ({ inline, className, children, ...props })=>{
                                        if (inline) {
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("code", {
                                                className: "bg-gray-100 px-1 py-0.5 rounded border border-black text-sm font-mono",
                                                ...props,
                                                children: children
                                            }, void 0, false, {
                                                fileName: "[project]/pages/blog.tsx",
                                                lineNumber: 116,
                                                columnNumber: 28
                                            }, void 0);
                                        }
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("pre", {
                                            className: "bg-black text-white p-4 border-4 border-black my-4 overflow-x-auto",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("code", {
                                                className: "text-sm font-mono",
                                                ...props,
                                                children: children
                                            }, void 0, false, {
                                                fileName: "[project]/pages/blog.tsx",
                                                lineNumber: 120,
                                                columnNumber: 23
                                            }, void 0)
                                        }, void 0, false, {
                                            fileName: "[project]/pages/blog.tsx",
                                            lineNumber: 119,
                                            columnNumber: 21
                                        }, void 0);
                                    },
                                    a: ({ href, children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                            href: href,
                                            className: "text-blue-600 hover:underline font-bold",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            children: children
                                        }, void 0, false, {
                                            fileName: "[project]/pages/blog.tsx",
                                            lineNumber: 124,
                                            columnNumber: 44
                                        }, void 0),
                                    strong: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                            className: "font-black",
                                            children: children
                                        }, void 0, false, {
                                            fileName: "[project]/pages/blog.tsx",
                                            lineNumber: 125,
                                            columnNumber: 43
                                        }, void 0),
                                    em: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("em", {
                                            className: "italic",
                                            children: children
                                        }, void 0, false, {
                                            fileName: "[project]/pages/blog.tsx",
                                            lineNumber: 126,
                                            columnNumber: 39
                                        }, void 0)
                                },
                                children: selectedPost.content
                            }, void 0, false, {
                                fileName: "[project]/pages/blog.tsx",
                                lineNumber: 103,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/pages/blog.tsx",
                            lineNumber: 102,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/blog.tsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/pages/blog.tsx",
            lineNumber: 64,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "max-w-4xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$4_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                        children: meta.title
                    }, void 0, false, {
                        fileName: "[project]/pages/blog.tsx",
                        lineNumber: 140,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: meta.description
                    }, void 0, false, {
                        fileName: "[project]/pages/blog.tsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("link", {
                        rel: "canonical",
                        href: canonical
                    }, void 0, false, {
                        fileName: "[project]/pages/blog.tsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:type",
                        content: "website"
                    }, void 0, false, {
                        fileName: "[project]/pages/blog.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:title",
                        content: meta.title
                    }, void 0, false, {
                        fileName: "[project]/pages/blog.tsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:description",
                        content: meta.description
                    }, void 0, false, {
                        fileName: "[project]/pages/blog.tsx",
                        lineNumber: 145,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:url",
                        content: canonical
                    }, void 0, false, {
                        fileName: "[project]/pages/blog.tsx",
                        lineNumber: 146,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:image",
                        content: "https://picsum.photos/1200/630?blog"
                    }, void 0, false, {
                        fileName: "[project]/pages/blog.tsx",
                        lineNumber: 147,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "twitter:card",
                        content: "summary_large_image"
                    }, void 0, false, {
                        fileName: "[project]/pages/blog.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "twitter:title",
                        content: meta.title
                    }, void 0, false, {
                        fileName: "[project]/pages/blog.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "twitter:description",
                        content: meta.description
                    }, void 0, false, {
                        fileName: "[project]/pages/blog.tsx",
                        lineNumber: 150,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "twitter:image",
                        content: "https://picsum.photos/1200/630?blog"
                    }, void 0, false, {
                        fileName: "[project]/pages/blog.tsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/blog.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Reveal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["Reveal"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "mb-8 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                            className: "text-6xl font-black uppercase mb-4",
                            children: t.blog_title
                        }, void 0, false, {
                            fileName: "[project]/pages/blog.tsx",
                            lineNumber: 155,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "h-2 bg-black w-24 mx-auto mb-8"
                        }, void 0, false, {
                            fileName: "[project]/pages/blog.tsx",
                            lineNumber: 156,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap justify-center gap-2",
                            children: allTags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSelectedTag(tag),
                                    className: `
                  px-3 py-1 font-bold uppercase text-xs border-2 border-black transition-all duration-200
                  ${selectedTag === tag ? 'bg-black text-white shadow-[4px_4px_0px_0px_rgba(100,100,100,1)] translate-x-[-2px] translate-y-[-2px]' : 'bg-white text-black hover:bg-yellow-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px]'}
                `,
                                    children: tag
                                }, tag, false, {
                                    fileName: "[project]/pages/blog.tsx",
                                    lineNumber: 160,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/pages/blog.tsx",
                            lineNumber: 158,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/blog.tsx",
                    lineNumber: 154,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/blog.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "space-y-6 min-h-[50vh]",
                children: filteredPosts.length > 0 ? filteredPosts.map((post, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Reveal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["Reveal"], {
                        delay: index * 100,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NeoCard$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["NeoCard"], {
                            className: "group cursor-pointer bg-white",
                            hoverEffect: true,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                onClick: ()=>setSelectedPost(post),
                                className: "p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "flex-grow",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap gap-2 mb-3 items-center text-xs font-bold uppercase tracking-wider text-gray-500",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: "bg-black text-white px-2 py-0.5",
                                                        children: post.date
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/blog.tsx",
                                                        lineNumber: 185,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: "py-0.5",
                                                        children: post.readTime
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/blog.tsx",
                                                        lineNumber: 186,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "hidden md:block w-1 h-1 bg-gray-400 rounded-full mx-1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/blog.tsx",
                                                        lineNumber: 187,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "flex gap-2",
                                                        children: post.tags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: "bg-gray-100 border border-black px-1.5 py-0.5 text-[10px] text-black group-hover:bg-yellow-200 transition-colors",
                                                                children: tag
                                                            }, tag, false, {
                                                                fileName: "[project]/pages/blog.tsx",
                                                                lineNumber: 190,
                                                                columnNumber: 27
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/blog.tsx",
                                                        lineNumber: 188,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/blog.tsx",
                                                lineNumber: 184,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                                className: "text-2xl md:text-3xl font-black uppercase mb-3 group-hover:text-blue-600 transition-colors",
                                                children: post.title
                                            }, void 0, false, {
                                                fileName: "[project]/pages/blog.tsx",
                                                lineNumber: 196,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "text-gray-600 font-medium md:w-3/4",
                                                children: post.excerpt
                                            }, void 0, false, {
                                                fileName: "[project]/pages/blog.tsx",
                                                lineNumber: 199,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/blog.tsx",
                                        lineNumber: 183,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "flex-shrink-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "w-12 h-12 border-2 border-black flex items-center justify-center bg-yellow-300 group-hover:bg-yellow-400 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                                                xmlns: "http://www.w3.org/2000/svg",
                                                fill: "none",
                                                viewBox: "0 0 24 24",
                                                strokeWidth: 3,
                                                stroke: "currentColor",
                                                className: "w-6 h-6",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    d: "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/blog.tsx",
                                                    lineNumber: 204,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/pages/blog.tsx",
                                                lineNumber: 203,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/pages/blog.tsx",
                                            lineNumber: 202,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/blog.tsx",
                                        lineNumber: 201,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/blog.tsx",
                                lineNumber: 182,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/pages/blog.tsx",
                            lineNumber: 181,
                            columnNumber: 15
                        }, this)
                    }, post.id, false, {
                        fileName: "[project]/pages/blog.tsx",
                        lineNumber: 180,
                        columnNumber: 13
                    }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Reveal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["Reveal"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "text-center py-20 border-2 border-dashed border-gray-400 text-gray-500 font-bold uppercase",
                        children: [
                            t.blog_no_results,
                            ' "',
                            selectedTag,
                            '"'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/blog.tsx",
                        lineNumber: 214,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/pages/blog.tsx",
                    lineNumber: 213,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/blog.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/blog.tsx",
        lineNumber: 138,
        columnNumber: 5
    }, this);
}
const getStaticProps = async ()=>{
    // Read markdown posts
    const blogPostsEn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$posts$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["getAllPosts"])('en');
    const blogPostsZh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$posts$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["getAllPosts"])('zh');
    // Merge with existing content (projects, gallery)
    const content = {
        en: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$content$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CONTENT"].en,
            blog: blogPostsEn
        },
        zh: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$content$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CONTENT"].zh,
            blog: blogPostsZh
        }
    };
    return {
        props: {
            content
        }
    };
};
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f24b9387._.js.map