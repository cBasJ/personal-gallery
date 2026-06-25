import {
  education,
  experiences,
  profile,
  projects,
  skillGroups,
  type Education,
  type Experience,
  type Project,
} from "./profile";

export type Language = "zh" | "en";

type Profile = typeof profile;
type SkillGroup = (typeof skillGroups)[number];

export type LocalizedContent = {
  profile: Profile;
  projects: Project[];
  experiences: Experience[];
  education: Education[];
  skillGroups: SkillGroup[];
  ui: {
    brandHome: string;
    closeAssistant: string;
    closeDetails: string;
    closePreview: string;
    contactHeading: string;
    contactMe: string;
    downloadResume: string;
    enterPortfolio: string;
    gallery: string;
    heroActions: string;
    hrAssistant: string;
    hrGreeting: string;
    hrInput: string;
    hrPlaceholder: string;
    hrPrompts: string[];
    insightDialog: string;
    insightLabels: {
      contribution: string;
      engineering: string;
      features: string;
    };
    language: string;
    lightbox: string;
    mainContent: string;
    nav: Array<{ href: string; label: string }>;
    nextImage: string;
    nextProject: string;
    portraitAlt: string;
    previousImage: string;
    previousProject: string;
    profileHeading: string;
    projectCountLabel: string;
    projectGallery: string;
    projectList: string;
    projectNav: string;
    resumePathLabel: string;
    selectedWork: string;
    selectedWorkTitle: string;
    sendQuestion: string;
    skillTags: string;
    viewAll: string;
    welcome: string;
    welcomeSubtitle: string;
  };
};

const englishProjects: Project[] = [
  {
    ...projects[0],
    title: "Multiplayer Domino Board Game",
    role: "Frontend Design & Development",
    summary:
      "A Universite de Strasbourg L3 Projet Integrateur team project that turns traditional Domino into a complete multiplayer web app with online rooms, AI matches, multiple rule modes, and responsive play.",
    impact:
      "Led frontend experience design and implementation across room creation, lobby flow, game table, player states, mobile adaptation, drag-and-drop interaction, and real-time sync feedback.",
    link: projects[0].link ? { ...projects[0].link, label: "Visit Project" } : undefined,
    caseStudy: projects[0].caseStudy
      ? {
          ...projects[0].caseStudy,
          context:
            "Built by the DOMINATORS team, the system combines React Web / Electron Desktop, NestJS API, PostgreSQL, Prisma, Nginx, Traefik, Docker Compose, and GitLab CI. The game supports Blocking, All Fives, Joker wildcard rules, 1v1 AI, 2-4 player online matches, public/private rooms, and 2v2 / free-for-all modes.",
          contribution: [
            "Mapped the key multiplayer flow and designed the information structure for the main menu, mode selection, room creation, waiting lobby, game table, and end screen.",
            "Implemented the room creation form covering player count, team mode, room visibility, game mode, target score, and Joker settings.",
            "Contributed to the game table UI, including domino display, player seats, score bar, turn status, boneyard, move history, and disconnect feedback.",
            "Integrated Socket.IO events with the backend, including room creation, game room joins, gameUpdated, gameEnded, and reconnectDenied.",
          ],
          features: [
            "Supports Blocking and All Fives rules, with four-direction expansion after a double spinner opening in All Fives.",
            "Supports a Joker wildcard mechanic with shared game-core validation for special Joker and double placement rules.",
            "Supports 2-player and 4-player matches, including Teams 2v2 and Free-for-all configurations.",
            "Uses one responsive board across desktop and mobile, adjusting tile size and board scale based on container dimensions.",
          ],
          engineering: [
            "Uses React Router differently for web and Electron file:// scenarios: BrowserRouter on web and HashRouter in desktop builds.",
            "Encapsulated useGameDragDrop with pointer capture, drag thresholds, and elementFromPoint for mouse and touch placement.",
            "GameBoard uses ResizeObserver to compute container size and position left/right chains plus north/south branches around the spinner.",
            "Shared packages/game-core provides validateMove, getNewEnds, canPlayerPlay, scoring, and AI logic reused across frontend and backend.",
            "Playwright E2E covers the main menu, auth pages, mode selection, protected routes, rules page, and 404 page.",
          ],
          architecture: [
            "React 18 + TypeScript + Tailwind CSS + Vite frontend",
            "Socket.IO real-time rooms and match events",
            "NestJS + Prisma + PostgreSQL backend and data layer",
            "Nginx static hosting and /api reverse proxy, with Traefik for HTTPS and Let's Encrypt",
            "pnpm workspace + Turborepo + Docker Compose + GitLab CI",
          ],
          gallery: projects[0].caseStudy.gallery.map((image, index) => ({
            ...image,
            caption:
              [
                "Loading screen with Domino branding, background tiles, and progress state.",
                "Login screen with account access and guest play entry.",
                "Mode selection for offline and online play.",
                "Game table with board, player states, boneyard, hand, and turn timer.",
                "Room creation settings for teams, visibility, game type, target score, and Joker.",
                "Profile page showing player information.",
                "Rules modal with tabs for basics, Blocking, All Fives, and Joker.",
              ][index] ?? image.caption,
          })),
        }
      : undefined,
  },
  {
    ...projects[1],
    title: "Mystery Journey MJWeb Online Board Game",
    role: "Full-stack Development / Real-time Game System",
    period: "In progress",
    summary:
      "A 4-6 player online hidden-identity board game based on official v1.0 rules, covering role selection, hidden identities, treasure, ship health, events, confrontations, and multi-faction win conditions.",
    impact:
      "Building a React + TypeScript + Vite client and Node.js + Express + Socket.IO server around an authoritative server-side GameState, where clients submit only action intentions to reduce sync issues and cheating risks.",
    tags: ["In progress", "React", "TypeScript", "Vite", "Node.js", "Express", "Socket.IO"],
    caseStudy: projects[1].caseStudy
      ? {
          ...projects[1].caseStudy,
          context:
            "Mystery Journey is a 4-6 player online hidden-identity voyage board game. Players choose public roles, then receive hidden identities and missions. The game revolves around ship durability, real/fake treasure, deck confrontations, event responses, ghost phases, and multi-faction victory conditions. This project implements a web-based online test version of the v1.0 rules.",
          contribution: [
            "Translated official v1.0 rules from the README into implementable modules for player count, identity distribution, turn phases, ship systems, treasure supply, and victory conditions.",
            "Worked on the React + TypeScript frontend flow for multiplayer rooms, role selection, action submission, state display, and turn feedback.",
            "Worked on Node.js + Express + Socket.IO server logic around authoritative GameState, room sync, action intentions, and state broadcasting.",
            "Planned local multiplayer testing with multiple browser contexts to verify room joins, action resolution, and real-time synchronization.",
          ],
          features: [
            "Supports 4-6 player identity setup, where good, saboteur, and neutral roles follow different victory paths.",
            "Separates public roles from hidden identities: roles define health and skills, while identities define faction and final judgment.",
            "Ship systems include deck, engine, and cargo hold, affecting sinking, card draw penalties, and treasure loss.",
            "Introduces events and deck confrontations after round 2, good-side treasure claims after round 5, and final judgment in round 10.",
            "Dead players enter a ghost state, keeping identities hidden while still influencing the game during ghost phases.",
          ],
          engineering: [
            "Frontend uses React + TypeScript + Vite for room UI, state presentation, and player action entry.",
            "Server uses Node.js + Express + Socket.IO to maintain authoritative GameState, while clients submit only action intentions.",
            "WebSocket broadcasts synchronize turns, players, hand visibility, ship state, treasure count, and phase changes.",
            "Deployment is split between a Vercel frontend and Render Web Service backend, configured through VITE_SERVER_URL.",
          ],
          architecture: [
            "React + TypeScript + Vite client",
            "Node.js + Express API",
            "Socket.IO real-time room synchronization",
            "Authoritative server-side GameState",
            "Vercel frontend + Render backend deployment",
          ],
          gallery: projects[1].caseStudy.gallery.map((image, index) => ({
            ...image,
            caption:
              [
                "Current test interface with Fog Night Train setup parameters, room creation, and rule configuration.",
                "System overview: player action intentions go through Socket.IO to the server, where authoritative GameState resolves and broadcasts updates.",
              ][index] ?? image.caption,
          })),
        }
      : undefined,
  },
  {
    ...projects[2],
    title: "GameRun Gaming Platform Design",
    role: "Product Prototyping / Interaction Design / Project Collaboration",
    summary:
      "A desktop game distribution and management platform design project covering requirement definition, low-fidelity wireframes, high-fidelity prototypes, interaction flows, and usability test iteration.",
    impact:
      "Built clear navigation across registration, dashboard, library, store, purchase flow, personalization settings, and Random Game. User testing led to stronger feedback for filters, cart actions, registration success, and payment confirmation.",
    link: projects[2].link ? { ...projects[2].link, label: "Open Figma" } : undefined,
    caseStudy: projects[2].caseStudy
      ? {
          ...projects[2].caseStudy,
          context:
            "GameRun is a platform design project for the UE Interface Homme-Machine course. The goal was to design a desktop interface for a modern video game platform that balances immersion, usability, and efficiency. The project starts from personas and task analysis, then covers game discovery, purchase, library management, theme customization, and quick random game selection.",
          contribution: [
            "Helped define two core personas: a digital native seeking immersive visual experience and an efficiency-driven player who values clear paths.",
            "Mapped core platform tasks: registration, recommendations, search and filtering, purchase, library management, interface personalization, and Random Game.",
            "Independently built the Figma prototype and interaction design across Store, Library, Filter, Purchase, Settings, and Random Game flows.",
            "Built Figma interaction flows and iterated registration success, cart, filters, and purchase confirmation based on test feedback.",
          ],
          features: [
            "Dashboard summarizes recommended games, recent plays, achievements, and quick entries.",
            "Store supports game cards, price display, category browsing, add-to-cart, and purchase flow.",
            "Library provides filtering, sorting, and quick launch for owned games.",
            "Settings supports theme, background, interface size, motion, and accessibility options.",
            "Random Game reduces choice fatigue and helps users quickly discover and launch a game.",
          ],
          engineering: [
            "Uses a WIMP desktop interaction model with consistent behavior for side navigation, search, cards, and dialogs.",
            "Combines dark backgrounds, warm/cool contrast, and highlighted actions to create a gaming atmosphere while preserving hierarchy.",
            "Strengthens system visibility and instant feedback through registration success, cart hints, payment success, and clear filter states.",
            "Usability testing covered account creation, store game discovery, and simulated purchase tasks, then informed interaction refinements.",
          ],
          architecture: [
            "Requirement analysis and personas",
            "Low-fidelity wireframes",
            "Figma high-fidelity prototype",
            "Interaction flow map",
            "User testing and usability iteration",
          ],
          gallery: projects[2].caseStudy.gallery.map((image, index) => ({
            ...image,
            caption:
              [
                "Low-fidelity wireframes for login, Dashboard, Store, Library, Random Game, and Settings.",
                "Prototype flow connecting registration, navigation, purchase, and settings paths.",
                "Component examples for game cards, filters, buttons, and feedback states.",
                "Visual direction with dark gaming atmosphere, strong contrast, and GameRun brand entry.",
                "Store experience for game discovery, card browsing, cart, and purchase entry.",
                "Library experience for filtering, sorting, and quick access to owned games.",
                "Payment page with method selection and current purchase details.",
                "Filtering system with clear genre, installation status, playtime, and sorting controls.",
                "Registration feedback with a success confirmation page.",
                "Purchase feedback with payment success, order confirmation, download entry, and receipt status.",
              ][index] ?? image.caption,
          })),
        }
      : undefined,
  },
  {
    ...projects[3],
    title: "Jardin d'Asie Information Management & System Maintenance",
    role: "Information Management / Content Maintenance / Operations Support",
    summary:
      "Organized business information around the restaurant website, online menu, and Google Business Profile, including menu normalization, opening information, and daily operations support.",
    impact:
      "Improved how customers access menus, opening hours, address, contact details, and reservation entry points, while keeping online information clear, accurate, and maintainable.",
    link: projects[3].link ? { ...projects[3].link, label: "Visit Website" } : undefined,
    caseStudy: projects[3].caseStudy
      ? {
          ...projects[3].caseStudy,
          context:
            "Jardin d'Asie is an Asian restaurant in Haguenau, France. The project focused on improving the stability and clarity of information across the existing website and online platforms, organizing menu items, opening hours, notices, address, phone number, reservation links, and Google Business information into a maintainable digital information system.",
          contribution: [
            "Organized menu and business information, unifying item names, categories, prices, and display order to reduce customer search friction.",
            "Helped maintain website notices, opening hours, menu entry points, and reservation entry points so key information stays visible.",
            "Checked Google Maps business information including address, phone number, opening hours, menu links, and service types.",
            "Handled updates, archives, and multilingual content checks in daily operations to support fast responses to menu or status changes.",
          ],
          features: [
            "Homepage highlights the brand, opening notices, menu access, and reservation entry.",
            "Side menu centralizes PDF menu entries so customers can quickly reach menu information from the homepage.",
            "Menu PDFs are organized by drinks, food categories, and price structure for reading, printing, and long-term maintenance.",
            "Google Maps business profile supports search traffic with rating, address, phone number, menu link, and opening hours.",
          ],
          engineering: [
            "Used a structured information approach to split dishes, prices, opening state, contact details, and external links into checkable fields.",
            "Maintained consistency across the website, menu PDFs, and Google Business profile to avoid conflicting information.",
            "Considered multilingual accuracy so French-speaking customers can quickly understand notices, menus, and opening information.",
            "Focused on maintenance efficiency by centralizing frequently changing information in key touchpoints such as notices, menu files, and business profiles.",
          ],
          architecture: [
            "Restaurant website content maintenance",
            "PDF menu information organization",
            "Google Maps business profile checks",
            "Opening hours and notice updates",
            "Operations archive and proofreading",
          ],
          gallery: projects[3].caseStudy.gallery.map((image, index) => ({
            ...image,
            caption:
              [
                "Website homepage with brand, opening notice, menu entry, and reservation entry.",
                "Menu entry panel showing PDF menu links for quick homepage access.",
                "Menu PDF organized by category and price with consistent layout.",
                "Google Business profile checks for address, opening hours, phone number, menu link, and service type.",
              ][index] ?? image.caption,
          })),
        }
      : undefined,
  },
];

const englishExperiences: Experience[] = [
  {
    company: "Chengdu Market Supervision Administration, Shuyuan Office",
    title: "Data Management Assistant",
    period: "2024",
    summary:
      "Supported market complaint and business data collection, structured organization, system entry, maintenance, and basic statistical analysis.",
    highlights: [
      "Built standardized data entry rules to keep information complete and consistently formatted.",
      "Classified, cross-checked, and maintained records to identify and correct data anomalies.",
      "Assisted periodic data updates and version management to keep data accurate and consistent across departments.",
      "Aggregated data from multiple sources and produced reports to support operational analysis and management decisions.",
      "Followed sensitive data confidentiality standards with no information security incidents while handling complaints and business records.",
    ],
  },
  {
    company: "Jardin d'Asie",
    title: "Administrative & Information Support",
    period: "2024",
    summary:
      "Managed business information, online content maintenance, and daily administrative coordination to improve information flow and team handoff.",
    highlights: [
      "Organized menu and business information with unified content structure and expression.",
      "Helped update online system content and daily information to keep data timely and consistent.",
      "Supported information coordination, document organization, and process assistance across the team.",
    ],
  },
];

const englishEducation: Education[] = [
  {
    school: "University of Electronic Science and Technology of China / ESIGELEC",
    degree: "Software Engineering (Master's)",
    period: "Expected 2028",
    highlights: [
      "Graduate study and engineering practice in software engineering.",
      "Sino-French dual-school background with continued training in computer science, system design, and engineering projects.",
    ],
  },
  {
    school: "University of Strasbourg, France",
    degree: "Computer Science (Bachelor's)",
    period: "Undergraduate",
    highlights: [
      "Studied core courses including algorithms, databases, and software engineering.",
      "Built a solid computer science foundation with practical engineering ability.",
    ],
  },
];

const englishSkillGroups: SkillGroup[] = [
  {
    title: "Programming & Engineering",
    skills: ["C", "Python", "Java", "C#", "React", "TypeScript", "Vite", "Docker"],
  },
  {
    title: "Database & Systems",
    skills: ["Oracle", "SQL", "PL-SQL", "E-R Modeling", "Triggers", "Index Optimization"],
  },
  {
    title: "Design & Collaboration",
    skills: ["Figma", "Interactive Prototypes", "Requirement Analysis", "Teamwork", "Cross-cultural Communication"],
  },
  {
    title: "Languages",
    skills: ["Chinese: Native", "English: Fluent / IELTS 6.0", "French: B2"],
  },
];

const englishProfile: Profile = {
  ...profile,
  name: "Renyu Zhang",
  title: "Product Management Intern / Project Management / Frontend / Full-stack",
  location: "Chengdu, China / Strasbourg, France",
  resumeUrl: "/renyu-zhang-resume-en.pdf",
  headline:
    "Computer science and software engineering background, focused on turning ideas into clear product flows and shipped systems.",
  intro:
    "Software Engineering master's student with a computer science background from the University of Strasbourg. Experienced in multiplayer web games, product prototyping, interaction flows, user testing, frontend implementation, and team collaboration.",
  availability: "Software Engineering Master's · UESTC / ESIGELEC",
  metrics: [
    { label: "Core Projects", value: "4" },
    { label: "Languages", value: "CN / EN / FR" },
    { label: "Focus", value: "Product + PM + Frontend/Full-stack" },
  ],
  strengths: [
    "Focused on product management internships, project management, frontend/full-stack work, and cross-team collaboration.",
    "Experienced with Figma prototypes, interaction flows, and user-testing based iteration.",
    "Able to move from requirement analysis and product design to system delivery.",
    "Comfortable communicating in Chinese, English, and French across multicultural teams.",
  ],
};

export const contentByLanguage: Record<Language, LocalizedContent> = {
  zh: {
    profile,
    projects,
    experiences,
    education,
    skillGroups,
    ui: {
      brandHome: "首页",
      closeAssistant: "关闭 HR 问答助手",
      closeDetails: "关闭详情窗口",
      closePreview: "关闭图片预览",
      contactHeading: "期待聊聊你的团队正在解决的问题。",
      contactMe: "联系我",
      downloadResume: "下载简历",
      enterPortfolio: "进入作品集",
      gallery: "Gallery",
      heroActions: "主要操作",
      hrAssistant: "HR 自动问答助手",
      hrGreeting: "你好，我可以快速回答求职方向、项目经历、技术栈、语言能力和联系方式等 HR 常见问题。",
      hrInput: "输入 HR 问题",
      hrPlaceholder: "问一个 HR 常见问题",
      hrPrompts: ["求职方向？", "核心项目？", "技术栈？", "语言能力？"],
      insightDialog: "详情窗口",
      insightLabels: {
        contribution: "我的职责",
        engineering: "工程亮点",
        features: "产品功能",
      },
      language: "语言",
      lightbox: "项目图片预览",
      mainContent: "跳到主要内容",
      nav: [
        { href: "#work", label: "项目" },
        { href: "#experience", label: "经历" },
        { href: "#education", label: "教育" },
        { href: "#skills", label: "能力" },
        { href: "#contact", label: "联系" },
      ],
      nextImage: "下一张图片",
      nextProject: "浏览下一个项目",
      portraitAlt: "证件照",
      previousImage: "上一张图片",
      previousProject: "浏览上一个项目",
      profileHeading: "以扎实工程基础，把想法设计清楚并实现出来。",
      projectCountLabel: "projects · 2024–2026",
      projectGallery: "项目相册",
      projectList: "项目列表",
      projectNav: "项目滑动控制",
      resumePathLabel: "文件路径",
      selectedWork: "Selected Work",
      selectedWorkTitle: "精选项目",
      sendQuestion: "发送问题",
      skillTags: "技术标签",
      viewAll: "查看全部",
      welcome: "欢迎来到我的作品集",
      welcomeSubtitle: "产品经理（实习） / 项目管理 / 前端开发 / 全栈",
    },
  },
  en: {
    profile: englishProfile,
    projects: englishProjects,
    experiences: englishExperiences,
    education: englishEducation,
    skillGroups: englishSkillGroups,
    ui: {
      brandHome: "Home",
      closeAssistant: "Close HR assistant",
      closeDetails: "Close details",
      closePreview: "Close image preview",
      contactHeading: "Let's talk about the problems your team is solving.",
      contactMe: "Contact Me",
      downloadResume: "Download Resume",
      enterPortfolio: "Enter Portfolio",
      gallery: "Gallery",
      heroActions: "Primary actions",
      hrAssistant: "HR Assistant",
      hrGreeting: "Hi, I can quickly answer common HR questions about target roles, projects, tech stack, languages, and contact details.",
      hrInput: "Enter an HR question",
      hrPlaceholder: "Ask a common HR question",
      hrPrompts: ["Target role?", "Core projects?", "Tech stack?", "Languages?"],
      insightDialog: "Details dialog",
      insightLabels: {
        contribution: "My Role",
        engineering: "Engineering",
        features: "Product Features",
      },
      language: "Language",
      lightbox: "Project image preview",
      mainContent: "Skip to main content",
      nav: [
        { href: "#work", label: "Work" },
        { href: "#experience", label: "Experience" },
        { href: "#education", label: "Education" },
        { href: "#skills", label: "Skills" },
        { href: "#contact", label: "Contact" },
      ],
      nextImage: "Next image",
      nextProject: "Browse next project",
      portraitAlt: "portrait",
      previousImage: "Previous image",
      previousProject: "Browse previous project",
      profileHeading: "Grounded in engineering, I shape ideas clearly and build them into working systems.",
      projectCountLabel: "projects · 2024–2026",
      projectGallery: "Project Gallery",
      projectList: "Project list",
      projectNav: "Project carousel controls",
      resumePathLabel: "path",
      selectedWork: "Selected Work",
      selectedWorkTitle: "Selected Projects",
      sendQuestion: "Send question",
      skillTags: "tech tags",
      viewAll: "View all",
      welcome: "Welcome to my portfolio",
      welcomeSubtitle: "Product Management Intern / Project Management / Frontend / Full-stack",
    },
  },
};

export const languageOptions: Array<{ label: string; value: Language }> = [
  { label: "中文", value: "zh" },
  { label: "English", value: "en" },
];
