(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/components/NeoCard.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NeoCard",
    ()=>NeoCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react@19.2.0/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
;
const NeoCard = ({ children, className = '', hoverEffect = false, color = 'bg-white' })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
_c = NeoCard;
var _c;
__turbopack_context__.k.register(_c, "NeoCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Reveal.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Reveal",
    ()=>Reveal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react@19.2.0/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react@19.2.0/node_modules/react/index.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
const Reveal = ({ children, className = '', delay = 0 })=>{
    _s();
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Reveal.useEffect": ()=>{
            // Fallback if IntersectionObserver is not supported
            if (!('IntersectionObserver' in window)) {
                setIsVisible(true);
                return;
            }
            const observer = new IntersectionObserver({
                "Reveal.useEffect": ([entry])=>{
                    if (entry.isIntersecting) {
                        setTimeout({
                            "Reveal.useEffect": ()=>{
                                setIsVisible(true);
                            }
                        }["Reveal.useEffect"], delay);
                        if (ref.current) observer.unobserve(ref.current);
                    }
                }
            }["Reveal.useEffect"], {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            if (ref.current) {
                observer.observe(ref.current);
            }
            return ({
                "Reveal.useEffect": ()=>{
                    // Safely disconnect
                    observer.disconnect();
                }
            })["Reveal.useEffect"];
        }
    }["Reveal.useEffect"], [
        delay
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: `transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/Reveal.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Reveal, "7N8EcRPlcY6o9kzg5IgMZgWhyLI=");
_c = Reveal;
var _c;
__turbopack_context__.k.register(_c, "Reveal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/projects.ts [client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/blogPosts.ts [client] (ecmascript)", ((__turbopack_context__) => {
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
        date: '2023年10月24日',
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
        date: '2023年11月02日',
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
        date: '2023年12月15日',
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/galleryImages.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GALLERY_IMAGES_EN",
    ()=>GALLERY_IMAGES_EN,
    "GALLERY_IMAGES_ZH",
    ()=>GALLERY_IMAGES_ZH
]);
const GALLERY_IMAGES_EN = Array.from({
    length: 9
}).map(_c = (_, i)=>({
        id: `img-${i}`,
        src: `https://picsum.photos/1200/1200?random=${i + 10}`,
        alt: `Abstract composition ${i + 1}`,
        category: i % 2 === 0 ? '3D RENDER' : 'PHOTOGRAPHY',
        title: i % 2 === 0 ? `Render Experiment #${i + 1}` : `Urban Study #${i + 1}`,
        description: i % 2 === 0 ? 'An exploration of procedural generation using Blender geometry nodes. The texture work focuses on imperfection and realism within a digital construct.' : 'Captured on 35mm film in Tokyo. This shot emphasizes the interplay between brutalist architecture and organic city life.'
    }));
_c1 = GALLERY_IMAGES_EN;
const GALLERY_IMAGES_ZH = Array.from({
    length: 9
}).map(_c2 = (_, i)=>({
        id: `img-${i}`,
        src: `https://picsum.photos/1200/1200?random=${i + 10}`,
        alt: `抽象构图 ${i + 1}`,
        category: i % 2 === 0 ? '3D 渲染' : '摄影',
        title: i % 2 === 0 ? `渲染实验 #${i + 1}` : `城市研究 #${i + 1}`,
        description: i % 2 === 0 ? '使用 Blender 几何节点探索程序化生成。纹理工作专注于数字构造中的不完美和真实感。' : '在东京用 35mm 胶片拍摄。这张照片强调了粗野主义建筑与有机城市生活之间的相互作用。'
    }));
_c3 = GALLERY_IMAGES_ZH;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "GALLERY_IMAGES_EN$Array.from({ length: 9 }).map");
__turbopack_context__.k.register(_c1, "GALLERY_IMAGES_EN");
__turbopack_context__.k.register(_c2, "GALLERY_IMAGES_ZH$Array.from({ length: 9 }).map");
__turbopack_context__.k.register(_c3, "GALLERY_IMAGES_ZH");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/content.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CONTENT",
    ()=>CONTENT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$projects$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/projects.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$blogPosts$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/blogPosts.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$galleryImages$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/galleryImages.ts [client] (ecmascript)");
;
;
;
const CONTENT = {
    en: {
        projects: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$projects$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["PROJECTS_EN"],
        blog: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$blogPosts$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["BLOG_POSTS_EN"],
        gallery: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$galleryImages$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["GALLERY_IMAGES_EN"]
    },
    zh: {
        projects: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$projects$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["PROJECTS_ZH"],
        blog: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$blogPosts$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["BLOG_POSTS_ZH"],
        gallery: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$galleryImages$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["GALLERY_IMAGES_ZH"]
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/contexts/LanguageContext.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageProvider",
    ()=>LanguageProvider,
    "useLanguage",
    ()=>useLanguage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react@19.2.0/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react@19.2.0/node_modules/react/index.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
const LanguageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const LanguageProvider = ({ children })=>{
    _s();
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('en');
    const toggleLanguage = ()=>{
        setLanguage((prev)=>prev === 'en' ? 'zh' : 'en');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
        value: {
            language,
            setLanguage,
            toggleLanguage
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/contexts/LanguageContext.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(LanguageProvider, "fVUtOCD1O58HgvMjnE8lxRQa0QA=");
_c = LanguageProvider;
const useLanguage = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useContext"])(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
_s1(useLanguage, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "LanguageProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/translations.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TRANSLATIONS",
    ()=>TRANSLATIONS
]);
const TRANSLATIONS = {
    en: {
        // Navbar
        nav_work: 'Work',
        nav_blog: 'Blog',
        nav_gallery: 'Gallery',
        // Home
        hero_badge: 'Hello, I\'m heiheihoho, a Full Stack Developer. 👨🏻‍💻',
        hero_title_1: 'ByteCoder',
        hero_title_2: 'Code Change the World',
        hero_desc: 'I build high-impact digital experiences with a focus on raw aesthetics and performance.',
        hero_contact: 'Contact Me',
        hero_view_works: 'View Works',
        projects_title: 'Selected Works',
        projects_total: 'Total',
        project_visit: 'Visit Project',
        // Blog
        blog_title: 'Daily Logs',
        blog_back: '← Back to Overview',
        blog_read_time: 'read',
        blog_no_results: 'No logs found with tag',
        // Gallery
        gallery_title: 'Gallery',
        gallery_subtitle: 'A collection of pixels and vertices.',
        gallery_filter_all: 'All',
        gallery_filter_3d: '3D',
        gallery_filter_photo: 'Photo',
        gallery_expand: 'Click to Expand',
        gallery_id: 'ID',
        // Footer
        footer_copyright: '© 2024 DESIGN_ENGINEER'
    },
    zh: {
        // Navbar
        nav_work: '作品',
        nav_blog: '日志',
        nav_gallery: '画廊',
        // Home
        hero_badge: '你好，我是 heiheihoho，一个全栈开发者。👨🏻‍💻',
        hero_title_1: 'ByteCoder',
        hero_title_2: '编码改变世界',
        hero_desc: '专注于数字化体验的深度打磨，以去繁就简的设计逻辑诠释原始美感，呈现 “形神兼备” 的高品质产品体验。',
        hero_contact: '联系我',
        hero_view_works: '查看作品',
        projects_title: '精选作品',
        projects_total: '共计',
        project_visit: '访问项目',
        // Blog
        blog_title: '日常日志',
        blog_back: '← 返回列表',
        blog_read_time: '阅读',
        blog_no_results: '未找到相关标签的文章',
        // Gallery
        gallery_title: '画廊',
        gallery_subtitle: '像素与顶点的集合。',
        gallery_filter_all: '全部',
        gallery_filter_3d: '3D 渲染',
        gallery_filter_photo: '摄影',
        gallery_expand: '点击查看详情',
        gallery_id: '编号',
        // Footer
        footer_copyright: '© 2024 设计工程师'
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/pages/gallery.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Gallery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react@19.2.0/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react@19.2.0/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2d$dom$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-dom@19.2.0_react@19.2.0/node_modules/react-dom/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NeoCard$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/NeoCard.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Reveal$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Reveal.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$content$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/content.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$LanguageContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/LanguageContext.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$translations$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/translations.ts [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
function Gallery() {
    _s();
    const { language } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$LanguageContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useLanguage"])();
    const t = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$translations$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["TRANSLATIONS"][language];
    const images = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$content$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CONTENT"][language].gallery;
    const [activeFilter, setActiveFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('ALL');
    const [selectedImage, setSelectedImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Gallery.useEffect": ()=>{
            setActiveFilter(language === 'en' ? 'ALL' : '全部');
        }
    }["Gallery.useEffect"], [
        language
    ]);
    const filteredImages = images.filter((img)=>{
        if (activeFilter === 'ALL' || activeFilter === '全部') return true;
        return img.category === activeFilter;
    });
    const getButtonClass = (filter)=>`
    px-4 py-2 font-bold uppercase text-sm border-2 border-black transition-colors duration-200
    ${activeFilter === filter ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}
  `;
    const modal = selectedImage && typeof document !== 'undefined' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2d$dom$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 h-[100vh] z-[100] bg-[transparent] backdrop-blur-sm flex items-center justify-center p-4",
        onClick: ()=>setSelectedImage(null),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-5xl w-full max-h-[90vh] flex flex-col md:flex-row bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(255,255,255,0.5)] overflow-hidden animate-scale-up",
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full md:w-2/3 bg-black flex items-center justify-center p-0 md:border-r-4 border-black h-[50vh] md:h-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: selectedImage.src,
                        alt: selectedImage.alt,
                        className: "w-full h-full object-contain"
                    }, void 0, false, {
                        fileName: "[project]/pages/gallery.tsx",
                        lineNumber: 44,
                        columnNumber: 17
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/pages/gallery.tsx",
                    lineNumber: 43,
                    columnNumber: 15
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full md:w-1/3 p-6 md:p-8 flex flex-col overflow-y-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-start mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "bg-yellow-300 border-2 border-black px-2 py-1 font-bold text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
                                    children: selectedImage.category
                                }, void 0, false, {
                                    fileName: "[project]/pages/gallery.tsx",
                                    lineNumber: 49,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSelectedImage(null),
                                    className: "p-2 hover:bg-red-500 hover:text-white border-2 border-transparent hover:border-black transition-colors",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        strokeWidth: 3,
                                        stroke: "currentColor",
                                        className: "w-6 h-6",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            d: "M6 18L18 6M6 6l12 12"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/gallery.tsx",
                                            lineNumber: 57,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/gallery.tsx",
                                        lineNumber: 56,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/pages/gallery.tsx",
                                    lineNumber: 52,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/gallery.tsx",
                            lineNumber: 48,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl font-black uppercase mb-4 leading-none",
                            children: selectedImage.title
                        }, void 0, false, {
                            fileName: "[project]/pages/gallery.tsx",
                            lineNumber: 62,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-1 w-20 bg-black mb-6"
                        }, void 0, false, {
                            fileName: "[project]/pages/gallery.tsx",
                            lineNumber: 64,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-medium text-lg text-gray-700 leading-relaxed mb-8",
                            children: selectedImage.description
                        }, void 0, false, {
                            fileName: "[project]/pages/gallery.tsx",
                            lineNumber: 66,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-auto pt-6 border-t-2 border-gray-200",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-bold uppercase text-gray-400",
                                children: [
                                    t.gallery_id,
                                    ": ",
                                    selectedImage.id
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/gallery.tsx",
                                lineNumber: 69,
                                columnNumber: 19
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/pages/gallery.tsx",
                            lineNumber: 68,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/gallery.tsx",
                    lineNumber: 47,
                    columnNumber: 15
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/pages/gallery.tsx",
            lineNumber: 39,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/pages/gallery.tsx",
        lineNumber: 35,
        columnNumber: 11
    }, this), document.body) : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Reveal$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Reveal"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4 border-b-2 border-black pb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-6xl font-black uppercase leading-none mb-2",
                                            children: t.gallery_title
                                        }, void 0, false, {
                                            fileName: "[project]/pages/gallery.tsx",
                                            lineNumber: 86,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-medium text-xl",
                                            children: t.gallery_subtitle
                                        }, void 0, false, {
                                            fileName: "[project]/pages/gallery.tsx",
                                            lineNumber: 87,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/gallery.tsx",
                                    lineNumber: 85,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setActiveFilter(language === 'en' ? 'ALL' : '全部'),
                                            className: getButtonClass(language === 'en' ? 'ALL' : '全部'),
                                            children: t.gallery_filter_all
                                        }, void 0, false, {
                                            fileName: "[project]/pages/gallery.tsx",
                                            lineNumber: 90,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setActiveFilter(language === 'en' ? '3D RENDER' : '3D 渲染'),
                                            className: getButtonClass(language === 'en' ? '3D RENDER' : '3D 渲染'),
                                            children: t.gallery_filter_3d
                                        }, void 0, false, {
                                            fileName: "[project]/pages/gallery.tsx",
                                            lineNumber: 96,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setActiveFilter(language === 'en' ? 'PHOTOGRAPHY' : '摄影'),
                                            className: getButtonClass(language === 'en' ? 'PHOTOGRAPHY' : '摄影'),
                                            children: t.gallery_filter_photo
                                        }, void 0, false, {
                                            fileName: "[project]/pages/gallery.tsx",
                                            lineNumber: 102,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/gallery.tsx",
                                    lineNumber: 89,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/gallery.tsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/pages/gallery.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[50vh]",
                        children: [
                            filteredImages.map((img, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Reveal$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Reveal"], {
                                    delay: index * 50,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NeoCard$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["NeoCard"], {
                                        className: "bg-white group overflow-hidden h-full cursor-pointer",
                                        hoverEffect: true,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            onClick: ()=>setSelectedImage(img),
                                            className: "relative aspect-square",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: img.src,
                                                    alt: img.alt,
                                                    className: "w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/gallery.tsx",
                                                    lineNumber: 117,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "bg-white border-2 border-black text-black px-2 py-1 font-bold text-xs self-start uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-2",
                                                            children: img.category
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/gallery.tsx",
                                                            lineNumber: 119,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-white font-bold uppercase drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]",
                                                            children: t.gallery_expand
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/gallery.tsx",
                                                            lineNumber: 122,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/gallery.tsx",
                                                    lineNumber: 118,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/gallery.tsx",
                                            lineNumber: 116,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/gallery.tsx",
                                        lineNumber: 115,
                                        columnNumber: 15
                                    }, this)
                                }, img.id, false, {
                                    fileName: "[project]/pages/gallery.tsx",
                                    lineNumber: 114,
                                    columnNumber: 13
                                }, this)),
                            filteredImages.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "col-span-full flex items-center justify-center py-20 text-gray-500 font-bold uppercase border-2 border-dashed border-gray-300",
                                children: "No images found in this category."
                            }, void 0, false, {
                                fileName: "[project]/pages/gallery.tsx",
                                lineNumber: 130,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/gallery.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/gallery.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this),
            modal
        ]
    }, void 0, true);
}
_s(Gallery, "WpNoZeHZWAg+qMKdDUAAh5LsJuk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$LanguageContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useLanguage"]
    ];
});
_c = Gallery;
var _c;
__turbopack_context__.k.register(_c, "Gallery");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/gallery.tsx [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/gallery";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/pages/gallery.tsx [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/pages/gallery\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/gallery.tsx [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__c3d74de7._.js.map