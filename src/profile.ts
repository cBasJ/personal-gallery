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
  title: "产品经理（实习） / 项目管理",
  location: "四川成都 / 法国斯特拉斯堡",
  email: "89cBas979@gmail.com",
  phone: "183 0285 7593",
  linkedin: "",
  github: "https://github.com/cBasJ",
  photoUrl: "/profile/renyu-zhang.jpg",
  resumeUrl: "/renyu-zhang-resume.pdf",
  headline: "具备扎实计算机科学基础，关注从需求分析到系统实现的完整交付。",
  intro:
    "法国斯特拉斯堡大学计算机科学本科生，系统学习算法、数据库、软件工程与产品设计相关课程。曾参与多人在线桌游开发和 GameRun 游戏平台设计，兼具前端实现、产品原型、交互流程、用户测试与团队协作经验。",
  availability: "计算机科学本科 · 斯特拉斯堡大学",
  metrics: [
    { label: "核心项目", value: "3" },
    { label: "语言能力", value: "中 / 英 / 法" },
    { label: "重点方向", value: "产品 + 项目管理" },
  ],
  strengths: [
    "关注产品经理（实习）、项目管理与跨团队协作方向",
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
          src: "/projects/domino/loading.png",
          alt: "Dominators loading screen with domino-themed background and progress bar",
          caption: "启动加载页：品牌视觉、背景骨牌和加载状态。",
        },
        {
          src: "/projects/domino/main-menu.png",
          alt: "Dominators login screen with login form and guest play option",
          caption: "登录页面：包含登录和游客游玩入口。",
        },
        {
          src: "/projects/domino/mode-selection.png",
          alt: "Dominators mode selection screen",
          caption: "模式选择：离线、在线。",
        },
        {
          src: "/projects/domino/game-table.png",
          alt: "Domino game table interface showing board, players, boneyard and hand",
          caption: "游戏桌面：棋盘、玩家状态、牌库、手牌与回合计时。",
        },
        {
          src: "/projects/domino/create-room.png",
          alt: "Domino create room screen with team mode, lobby visibility and scoring controls",
          caption: "创建房间：队伍、可见性、游戏类型、目标分数和 Joker 配置。",
        },
        {
          src: "/projects/domino/waiting-room-latest.png",
          alt: "Domino profile page with player information",
          caption: "个人信息 profile 页面。",
        },
        {
          src: "/projects/domino/rules-modal.png",
          alt: "Domino rules modal with tabs for basic rules, blocking, all fives and joker",
          caption: "规则弹窗：基础规则、Blocking、All Fives 与 Joker 分页说明。",
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
      label: "查看 Figma",
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
          src: "/projects/gamerun/wireframes-overview.png",
          alt: "GameRun low fidelity wireframes overview",
          caption: "低保真线框：登录、Dashboard、Store、Library、Random Game 和 Settings。",
        },
        {
          src: "/projects/gamerun/prototype-flow.png",
          alt: "GameRun Figma prototype flow map",
          caption: "原型交互流：注册、导航、购买和设置路径串联。",
        },
        {
          src: "/projects/gamerun/component-system.png",
          alt: "GameRun Figma component system with cards, filters and buttons",
          caption: "组件实例：游戏卡片、筛选器、按钮和反馈提示。",
        },
        {
          src: "/projects/gamerun/brand-visual.png",
          alt: "GameRun visual identity with a golden gaming logo on a dark fantasy background",
          caption: "视觉方向：深色游戏氛围、强对比背景与 GameRun 品牌入口。",
        },
        {
          src: "/projects/gamerun/dashboard-screen.png",
          alt: "GameRun store high fidelity prototype",
          caption: "Store：游戏发现、卡片浏览、购物车与购买入口。",
        },
        {
          src: "/projects/gamerun/store-screen.png",
          alt: "GameRun library high fidelity prototype",
          caption: "Library：已拥有游戏的筛选、排序和快速访问。",
        },
        {
          src: "/projects/gamerun/library-screen.png",
          alt: "GameRun payment page with payment methods and current purchase details",
          caption: "支付页面：支付方式选择和当前购买项目信息。",
        },
        {
          src: "/projects/gamerun/filter-system.png",
          alt: "GameRun filter and sort modal with genre, status, playtime and sort controls",
          caption: "筛选系统：明确分类、安装状态、游玩时长和排序规则，降低查找成本。",
        },
        {
          src: "/projects/gamerun/register-feedback.png",
          alt: "GameRun registered success screen after sign up",
          caption: "注册反馈：增加成功确认页，减少用户对注册结果的不确定感。",
        },
        {
          src: "/projects/gamerun/payment-confirmation.png",
          alt: "GameRun payment successful screen showing confirmed order and download actions",
          caption: "购买反馈：支付成功、订单确认、游戏下载入口和收据状态清晰呈现。",
        },
      ],
    },
  },
  {
    title: "Jardin d'Asie 信息整理与系统维护",
    role: "行政与信息支持",
    period: "2024",
    summary:
      "负责餐厅菜单及业务相关信息的结构化整理、内容规范化与线上系统日常维护。",
    impact:
      "确保信息清晰、准确、便于使用，并在多任务环境中协助团队完成资料整理、信息协调和流程支持。",
    tags: ["Information Management", "Operations", "Content Maintenance"],
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
