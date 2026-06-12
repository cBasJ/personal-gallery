export type Project = {
  title: string;
  role: string;
  period: string;
  summary: string;
  impact: string;
  tags: string[];
  link?: {
    label: string;
    url: string;
  };
  featured?: boolean;
  caseStudy?: {
    context: string;
    contribution: string[];
    features: string[];
    engineering: string[];
    architecture: string[];
    gallery: Array<{
      src: string;
      alt: string;
      caption: string;
    }>;
  };
};

export type Experience = {
  company: string;
  title: string;
  period: string;
  summary: string;
  highlights: string[];
};

export type Education = {
  school: string;
  degree: string;
  period: string;
  highlights: string[];
};

export const profile = {
  name: "张人予",
  englishName: "Renyu Zhang",
  initials: "RZ",
  title: "产品经理（实习） / 项目管理 / 前端开发 / 全栈",
  location: "四川成都 / 法国斯特拉斯堡",
  email: "zhangrenyufr@163.com",
  phone: "183 0285 7593",
  linkedin: "",
  photoUrl: "/profile/renyu-zhang.jpg",
  resumeUrl: "/renyu-zhang-resume.pdf",
  headline: "具备扎实计算机科学基础，关注从需求分析到系统实现的完整交付。",
  intro:
    "法国斯特拉斯堡大学计算机科学本科生，系统学习算法、数据库、软件工程与产品设计相关课程。曾参与多人在线桌游开发和 GameRun 游戏平台设计，兼具前端实现、产品原型、交互流程、用户测试与团队协作经验。",
  availability: "计算机科学本科 · 斯特拉斯堡大学",
  metrics: [
    { label: "核心项目", value: "4" },
    { label: "语言能力", value: "中 / 英 / 法" },
    { label: "重点方向", value: "产品 + 项目管理 + 前端/全栈" },
  ],
  strengths: [
    "关注产品经理（实习）、项目管理、前端开发/全栈与跨团队协作方向",
    "具备 Figma 原型、交互流程和用户测试迭代经验",
    "能独立完成从需求分析、原型设计到系统交付的流程",
    "具备中英法三语沟通能力和跨文化协作经验",
  ],
};

export const projects: Project[] = [
  {
    title: "多人 Domino 桌游开发项目",
    role: "前端设计与开发",
    period: "2026",
    summary:
      "Université de Strasbourg L3 Projet Intégrateur 团队项目，把传统 Domino 桌游实现为支持联网多人、AI 对局、房间系统和多模式规则的完整客户端应用。",
    impact:
      "负责前端体验设计与实现，覆盖创建房间、等待大厅、游戏桌面、玩家状态、移动端适配、拖拽交互和实时同步反馈等核心流程。",
    tags: ["React", "TypeScript", "Tailwind CSS", "Socket.IO", "Vite", "Docker"],
    link: {
      label: "访问项目",
      url: "https://pi-domino.duckdns.org/",
    },
    featured: true,
    caseStudy: {
      context:
        "项目由 DOMINATORS 团队完成，整体系统包含 React Web / Electron Desktop、NestJS API、PostgreSQL、Prisma、Nginx、Traefik、Docker Compose 与 GitLab CI。游戏支持 Blocking、All Fives、Joker 特殊牌、1v1 AI、2-4 人在线对局、开放/私有房间和 2v2 / FFA 模式。",
      contribution: [
        "梳理多人对局关键流程，设计主菜单、模式选择、创建房间、等待房间、游戏桌面与结束页的信息结构",
        "实现房间创建表单：玩家人数、队伍模式、房间可见性、游戏模式、目标分数与 Joker 开关",
        "参与游戏桌面前端开发，处理牌面展示、玩家座位、分数条、回合状态、牌库、移动历史与断线状态反馈",
        "配合后端完成 Socket.IO 事件接入，包括创建房间、加入游戏房间、gameUpdated、gameEnded 与 reconnectDenied",
      ],
      features: [
        "支持 Blocking 与 All Fives 两种规则，All Fives 可在双牌开局后扩展四向布局",
        "支持 Joker wildcard 机制，并在共享 game-core 中限制 Joker 与 double 的特殊摆放规则",
        "支持 2 人与 4 人对局，4 人局包含 Teams 2v2 与 Free-for-all 配置",
        "移动端与桌面端共享一套响应式棋盘，根据容器尺寸调整骨牌尺寸和布局缩放",
      ],
      engineering: [
        "使用 React Router 区分 Web 与 Electron file:// 场景，Web 保持 BrowserRouter，桌面打包使用 HashRouter",
        "封装 useGameDragDrop，使用 pointer capture、拖拽阈值和 elementFromPoint 兼容鼠标与触控放置",
        "GameBoard 通过 ResizeObserver 计算容器尺寸，并围绕 spinner 计算左右链与 north/south 分支位置",
        "共享 packages/game-core 提供 validateMove、getNewEnds、canPlayerPlay、scoring 与 AI 逻辑，前后端复用规则",
        "Playwright E2E 覆盖主菜单、认证页、模式选择、保护路由、规则页和 404 页面",
      ],
      architecture: [
        "React 18 + TypeScript + Tailwind CSS + Vite 前端",
        "Socket.IO 实时房间与对局事件",
        "NestJS + Prisma + PostgreSQL 后端与数据层",
        "Nginx 静态文件与 /api 反向代理，Traefik 负责 HTTPS 与 Let’s Encrypt",
        "pnpm workspace + Turborepo + Docker Compose + GitLab CI",
      ],
      gallery: [
        {
          src: "/projects/domino/loading.webp",
          alt: "Dominators loading screen with domino-themed background and progress bar",
          caption: "启动加载页：品牌视觉、背景骨牌和加载状态。",
        },
        {
          src: "/projects/domino/main-menu.webp",
          alt: "Dominators login screen with login form and guest play option",
          caption: "登录页面：包含登录和游客游玩入口。",
        },
        {
          src: "/projects/domino/mode-selection.webp",
          alt: "Dominators mode selection screen",
          caption: "模式选择：离线、在线。",
        },
        {
          src: "/projects/domino/game-table.webp",
          alt: "Domino game table interface showing board, players, boneyard and hand",
          caption: "游戏桌面：棋盘、玩家状态、牌库、手牌与回合计时。",
        },
        {
          src: "/projects/domino/create-room.webp",
          alt: "Domino create room screen with team mode, lobby visibility and scoring controls",
          caption: "创建房间：队伍、可见性、游戏类型、目标分数和 Joker 配置。",
        },
        {
          src: "/projects/domino/waiting-room-latest.webp",
          alt: "Domino profile page with player information",
          caption: "个人信息 profile 页面。",
        },
        {
          src: "/projects/domino/rules-modal.webp",
          alt: "Domino rules modal with tabs for basic rules, blocking, all fives and joker",
          caption: "规则弹窗：基础规则、Blocking、All Fives 与 Joker 分页说明。",
        },
      ],
    },
  },
  {
    title: "神秘旅途 MJWeb 联机桌游",
    role: "全栈开发 / 实时游戏系统",
    period: "进行中",
    summary:
      "基于 official v1.0 规则实现 4-6 人多人联机隐藏身份航海桌游，覆盖角色选择、隐藏身份、宝藏、船体、事件、对峙与多阵营胜利判定。",
    impact:
      "正在推进 React + TypeScript + Vite 客户端与 Node.js + Express + Socket.IO 服务端，采用服务端权威 GameState，客户端只提交行动意图，降低多人同步和作弊风险。",
    tags: ["进行中", "React", "TypeScript", "Vite", "Node.js", "Express", "Socket.IO"],
    caseStudy: {
      context:
        "《神秘旅途》是一款 4-6 人多人联机隐藏身份航海桌游。玩家选择公开角色登船，系统随后发放隐藏身份与隐藏任务。整局游戏围绕船体耐久、宝藏真假、甲板对峙、事件响应、鬼魂阶段和多阵营胜利条件展开。本项目是 v1.0 规则的 Web 联机测试版实现。",
      contribution: [
        "梳理 README 中的 official v1.0 规则，把玩家人数、身份配比、回合阶段、船体系统、宝藏补给和胜利条件拆成可实现模块",
        "参与 React + TypeScript 前端交互实现，面向多人房间、角色选择、行动提交、状态展示和回合反馈设计页面流程",
        "参与 Node.js + Express + Socket.IO 服务端联机逻辑，围绕权威 GameState 处理房间同步、行动意图和状态广播",
        "规划本地多人测试方式，使用多个浏览器上下文验证房间加入、行动结算和实时同步稳定性",
      ],
      features: [
        "支持 4-6 人身份配置，好人、破坏者与中立身份拥有不同胜利路径",
        "公开角色与隐藏身份分离，角色决定生命值和技能，身份决定阵营与最终判定",
        "船体系统包含甲板、引擎、货舱，分别影响沉船、摸牌惩罚和宝藏损失",
        "第 2 回合后引入事件和甲板对峙，第 5 回合后允许好人宣称夺宝，第 10 回合进行最终判定",
        "死亡玩家进入鬼魂状态，身份不公开但仍可在鬼魂阶段影响局势",
      ],
      engineering: [
        "前端使用 React + TypeScript + Vite，承担房间 UI、状态呈现和玩家行动入口",
        "服务端使用 Node.js + Express + Socket.IO 保存权威 GameState，客户端只发送行动意图",
        "通过 WebSocket 广播同步回合、玩家、手牌可见性、船体、宝藏数量和阶段变化",
        "部署方案采用前后端分离：Vercel 承载客户端，Render Web Service 承载服务端，并通过 VITE_SERVER_URL 配置后端地址",
      ],
      architecture: [
        "React + TypeScript + Vite 客户端",
        "Node.js + Express API",
        "Socket.IO 实时房间同步",
        "服务端权威 GameState",
        "Vercel 前端 + Render 后端部署",
      ],
      gallery: [
        {
          src: "/projects/mjweb/system-overview.svg",
          alt: "MJWeb hidden identity voyage game system overview diagram",
          caption: "系统概览：玩家行动意图经 Socket.IO 进入服务端，由权威 GameState 统一结算并广播。",
        },
      ],
    },
  },
  {
    title: "GameRun 游戏平台设计",
    role: "产品原型 / 交互设计 / 项目协作",
    period: "2025",
    summary:
      "面向桌面端游戏分发与管理场景，完成 GameRun 平台的需求定义、低保真 wireframe、高保真原型、交互流与用户测试迭代。",
    impact:
      "围绕注册登录、Dashboard、游戏库、Store、购买流程、个性化设置和 Random Game 功能建立清晰导航；基于测试反馈补强筛选器、加入购物车、注册成功和付款确认等关键反馈。",
    tags: ["Figma", "UX Research", "Wireframe", "Prototype", "User Testing", "Project Management"],
    link: {
      label: "访问 Figma",
      url: "https://www.figma.com/design/Gib1ZppALL1b99Fhogr3Tz/IHM-CC2?node-id=0-1&t=t9l65Qeh0U1E12Qo-1",
    },
    caseStudy: {
      context:
        "GameRun 是 UE Interface Homme-Machine 课程中的游戏平台设计项目，目标是为现代视频游戏平台设计一套兼顾沉浸感、可用性和效率的桌面端界面。项目从 personas 和任务分析出发，覆盖发现游戏、购买游戏、管理游戏库、个性化主题与快速选择随机游戏等场景。",
      contribution: [
        "参与定义两个核心用户画像：追求沉浸与视觉体验的 Digital Native，以及重视效率和路径清晰度的 Joueur Efficient",
        "梳理平台核心任务：注册登录、浏览推荐、搜索与筛选、购买、管理游戏库、个性化界面和 Random Game",
        "独立完成整个项目的 Figma prototype 原型设计和交互设计，覆盖 Store、Library、Filter、Purchase、Settings、Random Game 等核心流程",
        "参与 Figma 交互流搭建，并根据测试反馈调整注册成功、购物车、过滤器和购买确认流程",
      ],
      features: [
        "Dashboard 汇总推荐游戏、最近游玩、成就和快捷入口",
        "Store 支持游戏卡片、价格展示、分类浏览、加入购物车与购买流程",
        "Library 提供已拥有游戏的筛选、排序和快速启动能力",
        "Settings 支持主题、背景、界面尺寸、动效和可访问性选项",
        "Random Game 用于减少选择疲劳，帮助用户快速发现并启动游戏",
      ],
      engineering: [
        "采用 WIMP 桌面交互模型，保持侧边导航、搜索栏、卡片和弹窗的一致行为",
        "通过深色背景、冷暖对比和高亮按钮建立游戏氛围，同时保留清晰信息层级",
        "强化系统可见性与即时反馈：注册成功页、购物车提示、支付成功页和明确的筛选状态",
        "用户测试覆盖创建账户、在 Store 找游戏和模拟购买 3 个关键任务，并据此迭代交互细节",
      ],
      architecture: [
        "需求分析与 personas",
        "低保真 wireframes",
        "Figma 高保真原型",
        "交互流程图",
        "用户测试与可用性迭代",
      ],
      gallery: [
        {
          src: "/projects/gamerun/wireframes-overview.webp",
          alt: "GameRun low fidelity wireframes overview",
          caption: "低保真线框：登录、Dashboard、Store、Library、Random Game 和 Settings。",
        },
        {
          src: "/projects/gamerun/prototype-flow.webp",
          alt: "GameRun Figma prototype flow map",
          caption: "原型交互流：注册、导航、购买和设置路径串联。",
        },
        {
          src: "/projects/gamerun/component-system.webp",
          alt: "GameRun Figma component system with cards, filters and buttons",
          caption: "组件实例：游戏卡片、筛选器、按钮和反馈提示。",
        },
        {
          src: "/projects/gamerun/brand-visual.webp",
          alt: "GameRun visual identity with a golden gaming logo on a dark fantasy background",
          caption: "视觉方向：深色游戏氛围、强对比背景与 GameRun 品牌入口。",
        },
        {
          src: "/projects/gamerun/dashboard-screen.webp",
          alt: "GameRun store high fidelity prototype",
          caption: "Store：游戏发现、卡片浏览、购物车与购买入口。",
        },
        {
          src: "/projects/gamerun/store-screen.webp",
          alt: "GameRun library high fidelity prototype",
          caption: "Library：已拥有游戏的筛选、排序和快速访问。",
        },
        {
          src: "/projects/gamerun/library-screen.webp",
          alt: "GameRun payment page with payment methods and current purchase details",
          caption: "支付页面：支付方式选择和当前购买项目信息。",
        },
        {
          src: "/projects/gamerun/filter-system.webp",
          alt: "GameRun filter and sort modal with genre, status, playtime and sort controls",
          caption: "筛选系统：明确分类、安装状态、游玩时长和排序规则，降低查找成本。",
        },
        {
          src: "/projects/gamerun/register-feedback.webp",
          alt: "GameRun registered success screen after sign up",
          caption: "注册反馈：增加成功确认页，减少用户对注册结果的不确定感。",
        },
        {
          src: "/projects/gamerun/payment-confirmation.webp",
          alt: "GameRun payment successful screen showing confirmed order and download actions",
          caption: "购买反馈：支付成功、订单确认、游戏下载入口和收据状态清晰呈现。",
        },
      ],
    },
  },
  {
    title: "Jardin d'Asie 信息整理与系统维护",
    role: "信息整理 / 内容维护 / 运营支持",
    period: "2024",
    summary:
      "围绕餐厅官网、线上菜单和 Google 商家资料，完成业务信息整理、菜单内容规范化、营业信息维护与日常运营支持。",
    impact:
      "提升客户获取菜单、营业时间、地址、联系方式和预订入口的效率，保证线上信息清晰、准确、便于维护。",
    tags: ["Information Management", "Operations", "Content Maintenance", "Google Business"],
    link: {
      label: "访问网站",
      url: "https://jardin-dasie.eatbu.com/",
    },
    caseStudy: {
      context:
        "Jardin d'Asie 是位于法国 Haguenau 的亚洲餐厅。项目重点不是重新开发系统，而是在现有网站和线上平台基础上，把菜单、营业时间、公告、地址电话、预订入口和 Google 商家信息整理成更稳定、清晰、可持续维护的线上资料体系。",
      contribution: [
        "整理餐厅菜单与业务信息，统一菜品名称、分类、价格和展示顺序，减少顾客查找成本",
        "协助维护官网首页公告、营业时间、菜单入口和预订入口，保证关键信息在客户访问时清楚可见",
        "核对 Google Maps 商家资料中的地址、电话、营业时间、菜单链接和服务类型，提升外部平台信息一致性",
        "在日常运营中处理信息更新、资料归档和跨语言内容校对，支持团队快速响应菜单或营业状态变化",
      ],
      features: [
        "官网首页突出品牌、营业公告、菜单入口和预约入口",
        "侧边菜单集中展示 PDF 菜单，方便顾客从首页直接访问菜品信息",
        "菜单 PDF 按饮品、菜品类别和价格结构组织，便于阅读、打印和长期维护",
        "Google Maps 商家资料承接搜索流量，展示评分、地址、电话、菜单链接和营业时间",
      ],
      engineering: [
        "采用结构化信息整理方法，将菜品、价格、营业状态、联系方式和外部链接分成可核对字段",
        "保持官网、菜单 PDF 与 Google 商家资料之间的信息一致，避免用户在不同入口看到冲突内容",
        "关注多语言场景下的表达准确性，保证法语客户能快速理解公告、菜单和营业信息",
        "以维护效率为目标，把经常变动的信息集中到首页公告、菜单文件和商家资料等关键触点",
      ],
      architecture: [
        "餐厅官网内容维护",
        "PDF 菜单信息整理",
        "Google Maps 商家资料核对",
        "营业时间与公告更新",
        "运营资料归档与校对",
      ],
      gallery: [
        {
          src: "/projects/jardin/homepage-notice.webp",
          alt: "Jardin d'Asie website homepage with restaurant brand, opening notice, menu and reservation entries",
          caption: "官网首页：品牌展示、营业公告、菜单入口和预约入口集中呈现。",
        },
        {
          src: "/projects/jardin/menu-panel.webp",
          alt: "Jardin d'Asie website side menu panel with menu PDF entries",
          caption: "菜单入口：侧边栏展示菜单 PDF，用户可从首页快速打开菜单。",
        },
        {
          src: "/projects/jardin/menu-pdf.webp",
          alt: "Jardin d'Asie menu PDF with drink categories and prices",
          caption: "菜单 PDF：按品类和价格整理，保持版式统一、信息清晰。",
        },
        {
          src: "/projects/jardin/google-profile.webp",
          alt: "Jardin d'Asie Google Maps business profile with address, hours, phone and menu link",
          caption: "Google 商家资料：核对地址、营业时间、电话、菜单链接和服务类型。",
        },
      ],
    },
  },
];

export const experiences: Experience[] = [
  {
    company: "成都市市场监督管理局书院所",
    title: "数据管理助理",
    period: "2024",
    summary:
      "参与市场投诉及相关业务数据的采集、结构化整理、系统录入、维护与基础统计分析。",
    highlights: [
      "建立规范的数据录入标准，确保信息完整、格式统一",
      "对录入数据进行系统性分类、交叉核查与持续维护，识别并纠正数据异常",
      "协助完成周期性数据更新与版本管理，保障系统数据准确性与跨部门一致性",
      "汇总多来源业务数据并产出数据报告，为业务研判与管理决策提供支持",
      "严格执行敏感数据保密规范，处理公民投诉与市场主体信息时无信息安全事故发生",
    ],
  },
  {
    company: "亚洲花园餐厅 Jardin d'Asie",
    title: "行政与信息支持",
    period: "2024",
    summary:
      "负责业务信息整理、线上内容维护和日常行政协作，提升信息传递与工作衔接效率。",
    highlights: [
      "整理菜单及业务信息，统一内容结构和表达规范",
      "协助线上系统内容更新与日常信息维护，保证系统数据及时一致",
      "配合团队完成信息协调、资料整理与流程支持",
    ],
  },
];

export const education: Education[] = [
  {
    school: "法国 · 斯特拉斯堡大学",
    degree: "计算机科学（本科）",
    period: "本科阶段",
    highlights: [
      "系统学习算法、数据库、软件工程等核心课程",
      "具备扎实的计算机理论基础与工程实践能力",
    ],
  },
];

export const skillGroups = [
  {
    title: "编程与工程",
    skills: ["C", "Python", "Java", "C#", "React", "TypeScript", "Vite", "Docker"],
  },
  {
    title: "数据库与系统",
    skills: ["Oracle", "SQL", "PL-SQL", "E-R 建模", "触发器", "索引优化"],
  },
  {
    title: "设计与协作",
    skills: ["Figma", "交互原型", "需求分析", "团队协作", "跨文化沟通"],
  },
  {
    title: "语言能力",
    skills: ["中文：母语", "英语：流利 / IELTS 6.0", "法语：B2"],
  },
];
