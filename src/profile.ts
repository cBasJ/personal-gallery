export type Project = {
  title: string;
  role: string;
  period: string;
  summary: string;
  impact: string;
  tags: string[];
};

export type Experience = {
  company: string;
  title: string;
  period: string;
  summary: string;
  highlights: string[];
};

export const profile = {
  name: "你的名字",
  initials: "YN",
  title: "产品 / 设计 / 工程复合型人才",
  location: "城市，国家",
  email: "your.email@example.com",
  phone: "+86 000 0000 0000",
  linkedin: "https://linkedin.com/in/your-profile",
  github: "https://github.com/your-name",
  headline: "把复杂问题拆清楚，并交付可落地的高质量产品体验。",
  intro:
    "这里写 2-3 句个人简介：你的专业方向、擅长的问题类型、代表性行业经验，以及你希望给招聘方留下的第一印象。",
  availability: "开放全职 / 合作机会",
  metrics: [
    { label: "年专业经验", value: "5+" },
    { label: "核心项目", value: "18" },
    { label: "覆盖领域", value: "B2B / AI / 数据" },
  ],
  strengths: [
    "从 0 到 1 搭建产品与系统",
    "跨职能沟通与项目推进",
    "数据驱动的体验优化",
    "高质量文档与交付节奏",
  ],
};

export const projects: Project[] = [
  {
    title: "智能运营工作台",
    role: "产品负责人 / 前端实现",
    period: "2025",
    summary:
      "为业务团队设计并落地统一工作台，整合任务、数据看板与审批流程，减少跨系统切换成本。",
    impact: "上线后核心流程处理时间下降 32%，团队每周节省约 12 小时重复操作。",
    tags: ["React", "TypeScript", "Dashboard", "Workflow"],
  },
  {
    title: "客户洞察分析平台",
    role: "数据产品设计",
    period: "2024",
    summary:
      "搭建客户分层、行为分析与线索评分模块，帮助销售与运营团队更快识别高价值机会。",
    impact: "关键客户触达转化率提升 18%，沉淀 6 个可复用分析模型。",
    tags: ["Analytics", "B2B", "Data Visualization"],
  },
  {
    title: "品牌官网与内容系统",
    role: "体验设计 / 技术交付",
    period: "2023",
    summary:
      "重构官网信息架构和组件系统，使内容发布、案例展示和 SEO 基础能力更稳定。",
    impact: "自然搜索流量提升 41%，市场团队页面上线周期从数天缩短到数小时。",
    tags: ["Design System", "CMS", "SEO"],
  },
];

export const experiences: Experience[] = [
  {
    company: "公司名称 A",
    title: "高级产品经理",
    period: "2023 - 至今",
    summary:
      "负责核心业务系统的产品规划、需求分析、跨团队推进与关键功能验收。",
    highlights: [
      "主导 3 条业务线的流程梳理和产品迭代路线图",
      "与设计、工程、运营团队协作完成从调研到上线的闭环",
      "建立指标看板与复盘机制，持续优化转化和效率",
    ],
  },
  {
    company: "公司名称 B",
    title: "产品设计师 / 前端工程师",
    period: "2020 - 2023",
    summary:
      "参与企业级产品体验设计、前端组件建设与复杂页面的信息架构优化。",
    highlights: [
      "搭建一套基础组件规范，提升多项目交付一致性",
      "独立完成多个业务模块的原型、交互与前端开发",
      "通过可用性测试推动关键页面转化提升",
    ],
  },
];

export const skillGroups = [
  {
    title: "产品与策略",
    skills: ["需求分析", "路线图规划", "用户研究", "业务建模"],
  },
  {
    title: "设计与体验",
    skills: ["信息架构", "交互设计", "设计系统", "可用性测试"],
  },
  {
    title: "技术与交付",
    skills: ["React", "TypeScript", "数据可视化", "API 协作"],
  },
];
