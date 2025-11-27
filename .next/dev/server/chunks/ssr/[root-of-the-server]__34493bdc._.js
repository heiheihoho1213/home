module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/data/projects.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/data/blogPosts.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BLOG_POSTS_EN",
    ()=>BLOG_POSTS_EN
]);
const BLOG_POSTS_EN = [
    {
        id: '1',
        title: 'The Return of Brutalism',
        slug: '1-the-return-of-brutalism',
        date: 'Oct 24, 2023',
        readTime: '5 min',
        excerpt: 'Why modern web design is shifting back to raw, unpolished aesthetics and what it means for UX.',
        tags: [
            'DESIGN',
            'TRENDS',
            'UI/UX'
        ]
    }
];
}),
"[project]/data/galleryImages.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/data/content.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CONTENT",
    ()=>CONTENT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$projects$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/projects.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$blogPosts$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/blogPosts.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$galleryImages$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/galleryImages.ts [app-rsc] (ecmascript)");
;
;
;
const CONTENT = {
    en: {
        projects: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$projects$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PROJECTS_EN"],
        blog: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$blogPosts$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BLOG_POSTS_EN"],
        gallery: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$galleryImages$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GALLERY_IMAGES_EN"]
    },
    zh: {
        projects: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$projects$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PROJECTS_ZH"],
        blog: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$blogPosts$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BLOG_POSTS_EN"],
        gallery: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$galleryImages$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GALLERY_IMAGES_ZH"]
    }
};
}),
"[project]/app/gallery/GalleryClient.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$4_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.4_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$4_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/app/gallery/GalleryClient.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/gallery/GalleryClient.tsx <module evaluation>", "default");
}),
"[project]/app/gallery/GalleryClient.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$4_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.4_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$4_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/app/gallery/GalleryClient.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/gallery/GalleryClient.tsx", "default");
}),
"[project]/app/gallery/GalleryClient.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$gallery$2f$GalleryClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/app/gallery/GalleryClient.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$gallery$2f$GalleryClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/app/gallery/GalleryClient.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$gallery$2f$GalleryClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/app/gallery/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GalleryPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$4_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.4_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/content.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$gallery$2f$GalleryClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/gallery/GalleryClient.tsx [app-rsc] (ecmascript)");
;
;
;
async function GalleryPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$4_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$gallery$2f$GalleryClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
        content: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CONTENT"]
    }, void 0, false, {
        fileName: "[project]/app/gallery/page.tsx",
        lineNumber: 5,
        columnNumber: 10
    }, this);
}
}),
"[project]/app/gallery/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/gallery/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__34493bdc._.js.map