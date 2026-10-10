import type { Project } from "./profile";

const gallery = [
  { src: "/projects/shengji/lobby.png", alt: "Changwan Shengji WeChat Canvas client lobby", caption: "微信小游戏大厅：单机练习与四人好友房入口。" },
  { src: "/projects/shengji/table.png", alt: "Changwan Shengji WeChat Canvas client card table", caption: "埋底界面：主牌星标、拖拉机标记与八张底牌选择。" },
  { src: "/projects/shengji/selection.png", alt: "Changwan Shengji tractor card selection", caption: "触摸选牌：连对识别、组合选择与手牌排布。" },
  { src: "/projects/shengji/result.png", alt: "Changwan Shengji round result", caption: "单局结算：展示抓分与升级结果，支持继续对局。" },
];

export const shengjiZh: Project = {
  title: "畅玩升级 · 微信小游戏",
  role: "全栈开发 / 游戏交互设计",
  period: "2026 · 开发中",
  summary: "将四人双副升级（拖拉机）移植为微信小游戏，以 Canvas 构建草地牌桌与触摸交互，支持单机练习和四人联网好友房。",
  impact: "贯通规则引擎、微信客户端与实时后端，围绕选牌、亮主、埋底、跟牌和结算设计完整对局流程，并适配横屏、安全区、语音报牌与断线恢复。",
  tags: ["微信小游戏", "Canvas", "TypeScript", "Fastify", "WebSocket", "SQLite"],
  caseStudy: {
    context: "畅玩升级把传统四人双副升级的规则与移动端操作结合起来。微信客户端复用现有纯规则引擎与牌局状态机，通过 Canvas 绘制界面，并接入微信触摸、音频、存储与网络 API。当前为开发版本，采用游客身份；正式微信登录、HTTPS/WSS 服务、真机兼容性和发布审核仍需完成。",
    cover: { src: gallery[1].src, alt: gallery[1].alt },
    contribution: [
      "实现微信 Canvas 客户端，组织大厅、单机练习、好友房、牌桌与结算流程",
      "设计触摸选牌、对子与拖拉机识别、主牌星标和埋底反馈，适配横屏与微信胶囊安全区",
      "复用纯规则引擎与 TypeScript 牌局状态机，贯通亮主、反主、强制跟牌、扣底与升级结算",
      "接入微信音频、网络与存储适配层，并通过模拟 wx API 的客户端测试验证单机与联机流程",
    ],
    features: [
      "支持单机练习与四人好友房，涵盖创建、加入、准备和完整对局",
      "提供触摸选牌、对子连选、拖拉机提示与托管操作",
      "结合草地牌桌、卡通头像、统一牌面、语音报牌与游戏音效",
      "联机支持私有手牌视图、断线重连、超时托管与结算保存",
    ],
    engineering: [
      "Canvas 界面与微信 API 适配层分离，复用 JavaScript 纯规则引擎与 TypeScript 单机状态机",
      "Fastify + WebSocket 服务端负责发牌、判牌与结算，客户端提交操作并接收个人视图",
      "SQLite 持久化房间快照、请求去重结果和每局结算，支持刷新与服务重启后的状态恢复",
      "构建脚本生成微信小游戏包；模拟 wx API 的 Canvas 测试覆盖完整单机局、选牌、屏幕适配和四客户端真实 WebSocket 联机",
    ],
    architecture: ["Canvas + 微信触摸 / 音频 / 存储 / 网络 API", "共享 JavaScript 规则引擎 + TypeScript 牌局状态机", "Node.js + Fastify + WebSocket", "SQLite 快照与结算持久化", "小游戏构建脚本 + Playwright 客户端验证"],
    gallery: gallery.map(image => ({ ...image, caption: image.caption + "（微信客户端在模拟 wx API 环境中运行的截图）" })),
  },
};

export const shengjiEn: Project = {
  ...shengjiZh,
  title: "Changwan Shengji · WeChat Mini Game",
  role: "Full-stack Development / Game Interaction Design",
  period: "2026 · In development",
  summary: "A WeChat Mini Game adaptation of Shengji (Tractor), a four-player, two-deck partnership card game, with a Canvas grass-table interface, touch controls, solo practice, and online friend rooms.",
  impact: "Connected the shared rules engine, WeChat client, and real-time backend into a complete flow for bidding, burying cards, following tricks, and scoring, with landscape layouts, safe-area handling, voice announcements, and reconnection.",
  tags: ["WeChat Mini Game", "Canvas", "TypeScript", "Fastify", "WebSocket", "SQLite"],
  caseStudy: {
    ...shengjiZh.caseStudy!,
    context: "Changwan Shengji brings traditional four-player Tractor rules to a mobile game interface. The WeChat client reuses a shared rules engine and game state machine, draws its UI with Canvas, and integrates WeChat touch, audio, storage, and networking APIs. This is a development build using guest identities; production WeChat login, HTTPS/WSS hosting, device compatibility checks, and release review remain pending.",
    contribution: [
      "Implemented the WeChat Canvas client across the lobby, solo practice, friend rooms, table, and results flow.",
      "Designed touch selection, pair and tractor recognition, trump markers, and burying feedback with landscape and WeChat menu safe-area support.",
      "Reused the pure rules engine and TypeScript game state machine for bidding, counter-bidding, mandatory following, bottom scoring, and level progression.",
      "Integrated WeChat audio, network, and storage adapters and verified solo and multiplayer flows in a simulated wx API environment.",
    ],
    features: [
      "Solo practice and four-player friend rooms with creation, joining, readiness, and complete matches.",
      "Touch selection, linked pair selection, tractor hints, and autoplay controls.",
      "Grass-table visuals, cartoon avatars, consistent card art, voice announcements, and sound effects.",
      "Online private hand views, reconnection, timeout autoplay, and saved results.",
    ],
    engineering: [
      "Separates the Canvas UI from WeChat API adapters while sharing a pure JavaScript rules engine and TypeScript solo state machine.",
      "A Fastify + WebSocket authoritative server deals, validates, and scores; clients submit actions and receive individual views.",
      "SQLite persists room snapshots, request deduplication results, and round outcomes for recovery after refreshes and server restarts.",
      "Build scripts generate the WeChat game package. Canvas tests with simulated wx APIs cover a full solo round, selection, screen resizing, and four clients over real WebSocket connections.",
    ],
    architecture: ["Canvas + WeChat touch / audio / storage / networking APIs", "Shared JavaScript rules engine + TypeScript game state machine", "Node.js + Fastify + WebSocket", "SQLite snapshot and result persistence", "Mini Game build scripts + Playwright client verification"],
    gallery: gallery.map((image, index) => ({ ...image, caption: ["Mini Game lobby with solo practice and friend-room entry points.", "Burying interface with trump markers, tractor hints, and eight-card selection.", "Touch selection with consecutive-pair recognition and hand layout.", "Round results showing scoring and level progression."][index] + " (WeChat client running with simulated wx APIs.)" })),
  },
};
