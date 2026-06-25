import { type FormEvent, type MouseEvent, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Bot,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  Code2,
  Download,
  GalleryHorizontalEnd,
  Languages,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  SendHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import Antigravity from "./Antigravity";
import heroImage from "./assets/hero-workspace.webp";
import { contentByLanguage, languageOptions, type Language, type LocalizedContent } from "./i18n";
import SplitText from "./SplitText";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type HrChatMessage = {
  id: number;
  role: "bot" | "user";
  text: string;
};

const includesAny = (text: string, keywords: string[]) =>
  keywords.some((keyword) => text.includes(keyword));

const getInitialLanguage = (): Language => {
  if (typeof window === "undefined") return "zh";
  return window.localStorage.getItem("portfolio-language") === "en" ? "en" : "zh";
};

const buildHrAnswer = (
  rawQuestion: string,
  content: LocalizedContent,
  language: Language,
) => {
  const question = rawQuestion.trim();
  const compact = question.replace(/\s/g, "").toLowerCase();
  const { profile, projects, experiences, skillGroups, ui } = content;
  const joiner = language === "zh" ? "、" : ", ";
  const projectTitles = projects.map((project) => project.title).join(joiner);
  const skillSummary = skillGroups
    .map((group) => `${group.title}: ${group.skills.join(joiner)}`)
    .join(language === "zh" ? "；" : "; ");

  if (includesAny(compact, ["联系方式", "联系", "邮箱", "电话", "contact", "email", "phone"])) {
    return language === "zh"
      ? `可以通过邮箱 ${profile.email} 或电话 ${profile.phone} 联系 ${profile.name}。所在地/学习经历覆盖 ${profile.location}。`
      : `You can contact ${profile.name} by email at ${profile.email} or by phone at ${profile.phone}. Current location/background: ${profile.location}.`;
  }

  if (includesAny(compact, ["简历", "resume", "cv"])) {
    return language === "zh"
      ? `简历入口在页面顶部按钮中，${ui.resumePathLabel}是 ${profile.resumeUrl}。如果需要更详细项目材料，也可以通过 ${profile.email} 联系。`
      : `The resume button downloads ${profile.resumeUrl}. For more detailed project material, please contact ${profile.email}.`;
  }

  if (includesAny(compact, ["岗位", "方向", "求职", "应聘", "职位", "实习", "role", "position"])) {
    return language === "zh"
      ? `${profile.englishName} 关注 ${profile.title} 相关机会，尤其适合产品经理实习、项目管理、前端开发/全栈以及需要跨团队沟通的岗位。`
      : `${profile.englishName} is targeting roles around ${profile.title}, especially product management internships, project management, frontend/full-stack work, and cross-team collaboration.`;
  }

  if (includesAny(compact, ["项目", "作品", "案例", "portfolio", "project"])) {
    return language === "zh"
      ? `核心项目包括：${projectTitles}。其中 Domino 与神秘旅途偏实时多人游戏和工程实现，GameRun 偏产品原型/交互设计，Jardin d'Asie 偏信息整理与运营支持。`
      : `Core projects include: ${projectTitles}. Domino and Mystery Journey focus on real-time multiplayer systems, GameRun focuses on product and interaction design, and Jardin d'Asie focuses on information management and operations support.`;
  }

  if (includesAny(compact, ["domino", "多米诺"])) {
    return language === "zh"
      ? "Domino 项目是多人联机桌游开发，重点包括 React/TypeScript 前端、Socket.IO 实时同步、房间流程、响应式棋盘、拖拽交互和移动端适配。"
      : "The Domino project is a multiplayer board game implementation focusing on React/TypeScript frontend work, Socket.IO real-time sync, room flow, responsive board design, drag-and-drop interaction, and mobile adaptation.";
  }

  if (includesAny(compact, ["神秘", "雾夜", "mjweb", "列车", "旅途"])) {
    return language === "zh"
      ? "神秘旅途 / 雾夜列车项目是隐藏身份多人联机桌游，采用 React + TypeScript + Vite 客户端和 Node.js + Express + Socket.IO 服务端，核心思路是服务端权威 GameState。"
      : "Mystery Journey / Fog Night Train is a hidden-identity multiplayer board game using a React + TypeScript + Vite client and a Node.js + Express + Socket.IO server, centered on authoritative server-side GameState.";
  }

  if (includesAny(compact, ["gamerun", "游戏", "figma", "原型"])) {
    return language === "zh"
      ? "GameRun 是游戏平台产品设计项目，覆盖 personas、任务分析、低保真线框、高保真 Figma 原型、交互流和用户测试迭代。"
      : "GameRun is a gaming platform product design project covering personas, task analysis, low-fidelity wireframes, high-fidelity Figma prototypes, interaction flows, and usability iteration.";
  }

  if (includesAny(compact, ["jardin", "餐厅", "运营", "信息整理"])) {
    return language === "zh"
      ? "Jardin d'Asie 项目体现信息整理和运营支持能力，负责菜单、官网公告、营业时间、预约入口和 Google 商家资料的一致性维护。"
      : "Jardin d'Asie shows information management and operations support experience, including menu organization, website notices, opening hours, reservation entry points, and Google Business profile consistency.";
  }

  if (includesAny(compact, ["技能", "技术", "栈", "工具", "skill", "tech", "stack"])) {
    return skillSummary;
  }

  if (includesAny(compact, ["语言", "英语", "法语", "中文", "language"])) {
    return language === "zh"
      ? "语言能力：中文母语，英语流利 / IELTS 6.0，法语 B2；适合中英法多语言沟通和跨文化团队协作。"
      : "Language ability: Chinese native, English fluent / IELTS 6.0, French B2. Suitable for multilingual and cross-cultural collaboration.";
  }

  if (includesAny(compact, ["教育", "学校", "学历", "大学", "专业", "education", "degree"])) {
    return language === "zh"
      ? `${profile.englishName} 拥有计算机科学本科背景，正在软件工程研究生阶段学习，系统学习算法、数据库、软件工程与产品设计相关课程。`
      : `${profile.englishName} has a computer science undergraduate background and is now pursuing graduate study in software engineering, with coursework and practice across algorithms, databases, software engineering, and product design.`;
  }

  if (includesAny(compact, ["经验", "经历", "experience"])) {
    return language === "zh"
      ? `经历包括${experiences.map((item) => `${item.company}的${item.title}`).join("，")}，覆盖数据管理、信息整理、内容维护和运营支持。`
      : `Experience includes ${experiences.map((item) => `${item.title} at ${item.company}`).join("; ")}, covering data management, information organization, content maintenance, and operations support.`;
  }

  if (includesAny(compact, ["优势", "亮点", "为什么", "strength"])) {
    return profile.strengths.join("；");
  }

  if (includesAny(compact, ["到岗", "入职", "时间", "availability", "available"])) {
    return language === "zh"
      ? "网站没有公开具体到岗日期，建议通过邮箱确认；目前页面展示的方向是实习、项目协作、产品/前端/项目管理相关机会。"
      : "The site does not publish a specific start date. Please confirm by email. The displayed target areas are internships, project collaboration, product, frontend, and project management roles.";
  }

  return language === "zh"
    ? `这个问题网站没有完整公开。可以继续问“求职方向、核心项目、技术栈、语言能力、联系方式”，或直接通过 ${profile.email} 联系确认。`
    : `This question is not fully covered on the site. You can ask about target roles, core projects, tech stack, languages, or contact details, or email ${profile.email} directly.`;
};

function App() {
  const appRef = useRef<HTMLElement>(null);
  const projectSectionRef = useRef<HTMLElement>(null);
  const projectRailRef = useRef<HTMLDivElement>(null);
  const insightCloseRef = useRef<HTMLButtonElement>(null);
  const hrMessagesRef = useRef<HTMLDivElement>(null);
  const preloadedImagesRef = useRef<HTMLImageElement[]>([]);
  const projectSwitchTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const navSnapBypassUntilRef = useRef(0);
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [welcomeReady, setWelcomeReady] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [activeInsightLabel, setActiveInsightLabel] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{
    projectIndex: number;
    galleryIndex: number;
  } | null>(null);
  const [hrChatOpen, setHrChatOpen] = useState(false);
  const [hrInput, setHrInput] = useState("");
  const [hrMessages, setHrMessages] = useState<HrChatMessage[]>([
    {
      id: 1,
      role: "bot",
      text: contentByLanguage[getInitialLanguage()].ui.hrGreeting,
    },
  ]);
  const content = contentByLanguage[language];
  const { education, experiences, profile, projects, skillGroups, ui } = content;
  const activeProject = projects[activeProjectIndex];
  const activeCaseStudy = activeProject.caseStudy;
  const activeCover = activeCaseStudy?.cover ?? activeCaseStudy?.gallery[0];
  const projectInsightGroups = activeCaseStudy
    ? [
        {
          icon: Layers3,
          items: activeCaseStudy.contribution,
          label: ui.insightLabels.contribution,
        },
        {
          icon: GalleryHorizontalEnd,
          items: activeCaseStudy.features,
          label: ui.insightLabels.features,
        },
        {
          icon: Code2,
          items: activeCaseStudy.engineering,
          label: ui.insightLabels.engineering,
        },
      ]
    : [];
  const activeInsight = projectInsightGroups.find((group) => group.label === activeInsightLabel);
  const ActiveInsightIcon = activeInsight?.icon;
  const lightboxProject = lightboxImage ? projects[lightboxImage.projectIndex] : null;
  const lightboxGallery = lightboxProject?.caseStudy?.gallery ?? [];
  const currentLightboxImage =
    lightboxImage && lightboxGallery.length > 0
      ? lightboxGallery[lightboxImage.galleryIndex]
      : null;

  const getProjectDomTargets = () => {
    const root = projectSectionRef.current ?? document;
    const select = (selector: string) => Array.from(root.querySelectorAll<HTMLElement>(selector));

    return {
      bg: select(".project-showcase-bg"),
      copyItems: select(
        ".project-meta-line, .project-stage-copy > h2, .project-stage-copy > p, .project-stage-copy > strong",
      ),
      insightCards: select(".project-insight-group"),
      lowerItems: select(".project-gallery-strip, .project-stage-actions"),
      railItems: select(".project-rail-heading, .project-count"),
      projectCards: select(".project-showcase .project-card"),
      showcase: select(".project-showcase"),
    };
  };

  const animateProjectSwitchIn = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const { bg, copyItems, insightCards, lowerItems, projectCards } = getProjectDomTargets();
    const activeCard = projectCards.find((card) => card.classList.contains("is-active"));

    gsap.killTweensOf([...bg, ...copyItems, ...insightCards, ...lowerItems, activeCard].filter(Boolean));

    if (reduceMotion) {
      gsap.set([...bg, ...copyItems, ...insightCards, ...lowerItems], {
        autoAlpha: 1,
        clearProps: "filter,transform",
      });
      return;
    }

    gsap
      .timeline({ defaults: { ease: "power3.out" } })
      .fromTo(
        bg,
        { filter: "blur(12px) saturate(0.72)", scale: 1.075 },
        {
          clearProps: "filter,scale",
          duration: 0.72,
          filter: "blur(0px) saturate(0.92) contrast(1.04)",
          scale: 1.02,
        },
        0,
      )
      .fromTo(
        copyItems,
        { autoAlpha: 0, filter: "blur(6px)", x: -44, y: 16 },
        {
          autoAlpha: 1,
          clearProps: "filter,transform",
          duration: 0.52,
          filter: "blur(0px)",
          stagger: 0.045,
          x: 0,
          y: 0,
        },
        0.06,
      )
      .fromTo(
        insightCards,
        {
          autoAlpha: 0,
          rotate: (index) => [-2, 1, 2][index % 3],
          x: (index) => [-58, 0, 58][index % 3],
          y: (index) => [36, 58, 36][index % 3],
        },
        {
          autoAlpha: 1,
          clearProps: "transform",
          duration: 0.58,
          rotate: 0,
          stagger: 0.055,
          x: 0,
          y: 0,
        },
        0.16,
      )
      .fromTo(
        lowerItems,
        { autoAlpha: 0, filter: "blur(5px)", y: 34 },
        {
          autoAlpha: 1,
          clearProps: "filter,transform",
          duration: 0.5,
          filter: "blur(0px)",
          stagger: 0.06,
          y: 0,
        },
        0.24,
      )
      .fromTo(
        activeCard ?? [],
        { scale: 0.96 },
        { clearProps: "transform", duration: 0.46, scale: 1.06 },
        0.18,
      );
  };

  const handleProjectSelect = (index: number) => {
    if (index === activeProjectIndex) {
      projectSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const { bg, copyItems, insightCards, lowerItems } = getProjectDomTargets();

    projectSwitchTimelineRef.current?.kill();
    window.setTimeout(() => {
      projectSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);

    const applyNextProject = () => {
      setActiveProjectIndex(index);
      setActiveGalleryIndex(0);
      setActiveInsightLabel(null);
      window.requestAnimationFrame(() => animateProjectSwitchIn());
    };

    if (reduceMotion) {
      applyNextProject();
      return;
    }

    projectSwitchTimelineRef.current = gsap
      .timeline({
        defaults: { ease: "power2.in" },
        onComplete: applyNextProject,
      })
      .to(
        copyItems,
        {
          autoAlpha: 0,
          duration: 0.26,
          filter: "blur(5px)",
          stagger: 0.018,
          x: -58,
          y: -12,
        },
        0,
      )
      .to(
        insightCards,
        {
          autoAlpha: 0,
          duration: 0.28,
          rotate: (cardIndex) => [-3, 2, 3][cardIndex % 3],
          stagger: 0.026,
          x: (cardIndex) => [-86, 0, 86][cardIndex % 3],
          y: (cardIndex) => [28, 58, 28][cardIndex % 3],
        },
        0.04,
      )
      .to(
        lowerItems,
        {
          autoAlpha: 0,
          duration: 0.24,
          filter: "blur(4px)",
          stagger: 0.035,
          y: 42,
        },
        0.05,
      )
      .to(
        bg,
        {
          duration: 0.34,
          filter: "blur(10px) saturate(0.72)",
          scale: 1.065,
        },
        0,
      );
  };

  const scrollProjectRail = (direction: -1 | 1) => {
    const rail = projectRailRef.current;
    if (!rail) return;
    const isVertical = window.getComputedStyle(rail).flexDirection === "column";
    const cards = Array.from(rail.querySelectorAll<HTMLElement>(".project-card"));
    if (cards.length === 0) return;

    const currentPosition = isVertical ? rail.scrollTop : rail.scrollLeft;
    const maxPosition = isVertical
      ? rail.scrollHeight - rail.clientHeight
      : rail.scrollWidth - rail.clientWidth;
    let currentIndex = cards.reduce((closestIndex, card, index) => {
      const cardPosition = isVertical ? card.offsetTop : card.offsetLeft;
      const closestPosition = isVertical
        ? cards[closestIndex].offsetTop
        : cards[closestIndex].offsetLeft;

      return Math.abs(cardPosition - currentPosition) < Math.abs(closestPosition - currentPosition)
        ? index
        : closestIndex;
    }, 0);

    if (currentPosition <= 2) {
      currentIndex = 0;
    } else if (currentPosition >= maxPosition - 2) {
      currentIndex = cards.length - 1;
    }

    const targetIndex = Math.max(0, Math.min(cards.length - 1, currentIndex + direction));
    const targetCard = cards[targetIndex];

    rail.scrollTo({
      behavior: "smooth",
      left: isVertical ? 0 : targetCard.offsetLeft,
      top: isVertical ? targetCard.offsetTop : 0,
    });
  };

  const enterPortfolio = () => {
    document.querySelector("#profile")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    window.history.pushState(null, "", href);
    if (href !== "#work") {
      navSnapBypassUntilRef.current = window.performance.now() + 1400;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleLanguageChange = (nextLanguage: Language) => {
    if (nextLanguage === language) {
      setLanguageMenuOpen(false);
      return;
    }

    setLanguage(nextLanguage);
    setLanguageMenuOpen(false);
    setActiveInsightLabel(null);
    setLightboxImage(null);
    setHrInput("");
    window.localStorage.setItem("portfolio-language", nextLanguage);
  };

  const askHrQuestion = (rawQuestion: string) => {
    const question = rawQuestion.trim();
    if (!question) return;

    setHrMessages((messages) => {
      const baseId = Date.now() + messages.length;
      return [
        ...messages,
        { id: baseId, role: "user", text: question },
        { id: baseId + 1, role: "bot", text: buildHrAnswer(question, content, language) },
      ];
    });
    setHrInput("");
    setHrChatOpen(true);
  };

  const handleHrSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    askHrQuestion(hrInput);
  };

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const revealItems = gsap.utils.toArray<HTMLElement>("[data-reveal]");

      if (reduceMotion) {
        revealItems.forEach((item) => item.classList.add("is-visible"));
        return;
      }

      gsap.set(revealItems, { autoAlpha: 0, filter: "blur(8px)", y: 34 });

      ScrollTrigger.batch(revealItems, {
        once: true,
        start: "top 84%",
        onEnter: (elements) => {
          elements.forEach((item) => item.classList.add("is-visible"));
          gsap.to(elements, {
            autoAlpha: 1,
            clearProps: "filter",
            duration: 0.82,
            ease: "power3.out",
            filter: "blur(0px)",
            stagger: 0.08,
            y: 0,
          });
        },
      });

      gsap.from(".site-header", {
        autoAlpha: 0,
        duration: 0.72,
        ease: "power3.out",
        y: -22,
      });

      const cleanupFns: Array<() => void> = [];
      const header = document.querySelector<HTMLElement>(".site-header");
      if (header) {
        const headerTween = gsap.to(header, {
          autoAlpha: 0,
          duration: 0.22,
          ease: "power2.out",
          paused: true,
          yPercent: -115,
        });
        let previousScrollY = window.scrollY;
        let headerHidden = false;
        const showHeader = () => {
          if (!headerHidden) return;
          headerTween.reverse();
          headerHidden = false;
        };
        const hideHeader = () => {
          if (headerHidden) return;
          headerTween.play();
          headerHidden = true;
        };
        const updateHeader = () => {
          const currentScrollY = window.scrollY;
          const delta = currentScrollY - previousScrollY;
          const projectRect = projectSectionRef.current?.getBoundingClientRect();
          const projectIsActive =
            projectRect &&
            projectRect.top < window.innerHeight * 0.58 &&
            projectRect.bottom > window.innerHeight * 0.18;

          if (projectIsActive) {
            hideHeader();
            previousScrollY = currentScrollY;
            return;
          }

          if (header.contains(document.activeElement) || currentScrollY < 80 || delta < -3) {
            showHeader();
          } else if (delta > 4 && currentScrollY > 120) {
            hideHeader();
          }

          previousScrollY = currentScrollY;
        };

        window.addEventListener("scroll", updateHeader, { passive: true });
        window.addEventListener("resize", updateHeader);
        window.requestAnimationFrame(updateHeader);
        cleanupFns.push(() => window.removeEventListener("scroll", updateHeader));
        cleanupFns.push(() => window.removeEventListener("resize", updateHeader));
      }

      gsap.to(".hero-image", {
        ease: "none",
        scale: 1.07,
        yPercent: 8,
        scrollTrigger: {
          end: "bottom top",
          scrub: 0.8,
          start: "top top",
          trigger: ".hero",
        },
      });

      const cardFlyDirections = [
        { x: 170, y: -92 },
        { x: 210, y: 0 },
        { x: 170, y: 94 },
        { x: 96, y: 128 },
      ];
      const initialProjectTargets = getProjectDomTargets();

      gsap.set(initialProjectTargets.copyItems, { autoAlpha: 0, x: -72, y: 20 });
      gsap.set(initialProjectTargets.insightCards, { autoAlpha: 0 });
      gsap.set(initialProjectTargets.lowerItems, { autoAlpha: 0 });
      gsap.set(initialProjectTargets.railItems, { autoAlpha: 0, x: 72, y: -28 });
      gsap.set(initialProjectTargets.projectCards, {
        "--card-fly-x": (index: number) =>
          `${cardFlyDirections[index % cardFlyDirections.length].x}px`,
        "--card-fly-y": (index: number) =>
          `${cardFlyDirections[index % cardFlyDirections.length].y}px`,
        autoAlpha: 0,
      });
      gsap.set(".project-showcase-bg", { filter: "blur(10px) saturate(0.72)", scale: 1.1 });

      const flyProjectIn = () => {
        const {
          bg,
          copyItems,
          insightCards,
          lowerItems,
          projectCards,
          railItems,
          showcase,
        } = getProjectDomTargets();

        gsap.killTweensOf([
          ...bg,
          ...showcase,
          ...copyItems,
          ...insightCards,
          ...lowerItems,
          ...railItems,
          ...projectCards,
        ]);

        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .to(
            bg,
            {
              clearProps: "filter,scale",
              duration: 1.15,
              filter: "blur(0px) saturate(0.9) contrast(1.04)",
              scale: 1.02,
            },
            0,
          )
          .fromTo(
            showcase,
            { clipPath: "inset(8% 0 8% 0 round 0px)" },
            { clipPath: "inset(0% 0 0% 0 round 0px)", duration: 0.78 },
            0,
          )
          .to(
            copyItems,
            {
              autoAlpha: 1,
              duration: 0.68,
              stagger: 0.052,
              x: 0,
              y: 0,
            },
            0.12,
          )
          .fromTo(
            insightCards,
            {
              autoAlpha: 0,
              rotate: (index) => [-4, 2, 4][index % 3],
              x: (index) => [-128, 0, 128][index % 3],
              y: (index) => [18, 96, 18][index % 3],
            },
            {
              autoAlpha: 1,
              clearProps: "transform",
              duration: 0.82,
              rotate: 0,
              stagger: 0.07,
              x: 0,
              y: 0,
            },
            0.24,
          )
          .fromTo(
            lowerItems,
            {
              autoAlpha: 0,
              x: (index) => (index === 0 ? -86 : 86),
              y: 88,
            },
            {
              autoAlpha: 1,
              clearProps: "transform",
              duration: 0.72,
              stagger: 0.08,
              x: 0,
              y: 0,
            },
            0.34,
          )
          .to(
            railItems,
            {
              autoAlpha: 1,
              clearProps: "transform",
              duration: 0.72,
              stagger: 0.08,
              x: 0,
              y: 0,
            },
            0.2,
          )
          .to(
            projectCards,
            {
              "--card-fly-x": "0px",
              "--card-fly-y": "0px",
              autoAlpha: 1,
              duration: 0.82,
              stagger: 0.065,
            },
            0.32,
          );
      };

      const flyProjectOut = (direction: 1 | -1) => {
        const verticalLift = direction > 0 ? 120 : -120;
        const {
          bg,
          copyItems,
          insightCards,
          lowerItems,
          projectCards,
          railItems,
          showcase,
        } = getProjectDomTargets();

        gsap.killTweensOf([
          ...bg,
          ...showcase,
          ...copyItems,
          ...insightCards,
          ...lowerItems,
          ...railItems,
          ...projectCards,
        ]);

        gsap
          .timeline({ defaults: { ease: "power2.in" } })
          .to(
            copyItems,
            {
              autoAlpha: 0,
              duration: 0.42,
              stagger: 0.025,
              x: -116,
              y: -22,
            },
            0,
          )
          .to(
            insightCards,
            {
              autoAlpha: 0,
              duration: 0.46,
              rotate: (index) => [-5, 3, 5][index % 3],
              stagger: 0.035,
              x: (index) => [-170, 0, 170][index % 3],
              y: (index) => [verticalLift * 0.45, verticalLift, verticalLift * 0.45][index % 3],
            },
            0.04,
          )
          .to(
            lowerItems,
            {
              autoAlpha: 0,
              duration: 0.42,
              stagger: 0.04,
              x: (index) => (index === 0 ? -120 : 120),
              y: direction > 0 ? 150 : -100,
            },
            0.08,
          )
          .to(
            railItems,
            {
              autoAlpha: 0,
              duration: 0.38,
              stagger: 0.035,
              x: 114,
              y: direction > 0 ? -62 : 62,
            },
            0.02,
          )
          .to(
            projectCards,
            {
              "--card-fly-x": (index: number) =>
                `${cardFlyDirections[index % cardFlyDirections.length].x * 1.08}px`,
              "--card-fly-y": (index: number) =>
                `${cardFlyDirections[index % cardFlyDirections.length].y + verticalLift}px`,
              autoAlpha: 0,
              duration: 0.52,
              stagger: 0.04,
            },
            0.06,
          )
          .to(
            bg,
            {
              duration: 0.54,
              filter: "blur(8px) saturate(0.7)",
              scale: 1.08,
            },
            0,
          );
      };

      const isCompactViewport = () => window.matchMedia("(max-width: 680px)").matches;

      ScrollTrigger.create({
        end: () =>
          isCompactViewport()
            ? "bottom 18%"
            : `top+=${Math.round(window.innerHeight * 0.08)} top`,
        invalidateOnRefresh: true,
        onEnter: flyProjectIn,
        onEnterBack: flyProjectIn,
        onLeave: () => flyProjectOut(1),
        onLeaveBack: () => flyProjectOut(-1),
        start: "top 72%",
        trigger: ".project-section",
      });

      gsap.to(".welcome-background span", {
        duration: 5.6,
        ease: "sine.inOut",
        repeat: -1,
        rotate: "+=3",
        stagger: 0.35,
        x: "random(-14, 14, 1)",
        y: "random(-10, 10, 1)",
        yoyo: true,
      });

      const spotlitItems = gsap.utils.toArray<HTMLElement>(
        ".project-card, .strength-item, .skill-card, .education-card, .timeline-item > div:last-child",
      );
      const spotlightCleanups = spotlitItems.map((item) => {
        const updateSpotlight = (event: PointerEvent) => {
          const rect = item.getBoundingClientRect();
          item.style.setProperty("--mx", `${event.clientX - rect.left}px`);
          item.style.setProperty("--my", `${event.clientY - rect.top}px`);
        };

        item.addEventListener("pointermove", updateSpotlight);
        return () => item.removeEventListener("pointermove", updateSpotlight);
      });

      cleanupFns.push(...spotlightCleanups);

      return () => cleanupFns.forEach((cleanup) => cleanup());
    },
    { scope: appRef },
  );

  useEffect(() => {
    const welcomeTimer = window.setTimeout(() => {
      setWelcomeReady(true);
    }, 1800);

    return () => window.clearTimeout(welcomeTimer);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    setActiveInsightLabel(null);
    setHrMessages([
      {
        id: Date.now(),
        role: "bot",
        text: ui.hrGreeting,
      },
    ]);
  }, [language, ui.hrGreeting]);

  useEffect(() => {
    const messages = hrMessagesRef.current;
    if (!hrChatOpen || !messages) return;
    messages.scrollTo({ behavior: "smooth", top: messages.scrollHeight });
  }, [hrChatOpen, hrMessages]);

  useEffect(() => {
    const preloadImages = () => {
      const sources = new Set<string>([heroImage, profile.photoUrl]);

      projects.forEach((project) => {
        if (project.caseStudy?.cover) {
          sources.add(project.caseStudy.cover.src);
        }
        project.caseStudy?.gallery.forEach((image) => {
          sources.add(image.src);
        });
      });

      preloadedImagesRef.current = Array.from(sources).map((source) => {
        const image = new Image();
        image.decoding = "async";
        image.src = source;
        return image;
      });
    };

    const preloadTimer = window.setTimeout(preloadImages, 400);

    return () => {
      window.clearTimeout(preloadTimer);
      preloadedImagesRef.current = [];
    };
  }, [profile.photoUrl, projects]);

  useEffect(() => {
    const projectSection = projectSectionRef.current;
    const nextSection = document.querySelector<HTMLElement>("#experience");
    if (!projectSection || !nextSection) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCompactViewport = () => window.matchMedia("(max-width: 680px)").matches;
    let previousScrollY = window.scrollY;
    let lockUntil = 0;
    let settledOnProject = Math.abs(window.scrollY - projectSection.offsetTop) < 12;

    const scrollToY = (top: number) => {
      lockUntil = window.performance.now() + (reduceMotion ? 80 : 780);
      window.scrollTo({ behavior: reduceMotion ? "auto" : "smooth", top });
    };

    const handleProjectSnap = () => {
      if (activeInsightLabel || lightboxImage) return;

      const currentScrollY = window.scrollY;
      const delta = currentScrollY - previousScrollY;
      previousScrollY = currentScrollY;

      const viewportHeight = window.innerHeight;
      const projectTop = projectSection.offsetTop;
      const projectHeight = projectSection.offsetHeight;
      const nextTop = nextSection.offsetTop;
      const projectDistance = currentScrollY - projectTop;

      if (window.performance.now() < navSnapBypassUntilRef.current) {
        settledOnProject = Math.abs(projectDistance) < 14;
        return;
      }

      if (window.performance.now() < lockUntil || Math.abs(delta) < 2) return;

      if (!settledOnProject) {
        const enteringFromAbove =
          delta > 0 &&
          currentScrollY > projectTop - viewportHeight * 0.42 &&
          currentScrollY < projectTop + viewportHeight * 0.18;
        const enteringFromBelow =
          delta < 0 &&
          currentScrollY < projectTop + viewportHeight * 0.38 &&
          currentScrollY > projectTop - viewportHeight * 0.12;

        if (enteringFromAbove || enteringFromBelow) {
          settledOnProject = true;
          scrollToY(projectTop);
        }
        return;
      }

      if (Math.abs(projectDistance) < 14) return;

      const leaveThreshold = viewportHeight * (isCompactViewport() ? 0.36 : 0.2);
      if (delta > 0 && projectDistance > leaveThreshold) {
        settledOnProject = false;
        if (isCompactViewport()) return;
        scrollToY(nextTop);
        return;
      }

      const resetThreshold = viewportHeight * (isCompactViewport() ? 0.22 : 0.14);
      if (currentScrollY < projectTop - resetThreshold || projectDistance > projectHeight) {
        settledOnProject = false;
      }
    };

    window.addEventListener("scroll", handleProjectSnap, { passive: true });
    return () => window.removeEventListener("scroll", handleProjectSnap);
  }, [activeInsightLabel, lightboxImage]);

  useEffect(() => {
    if (!lightboxImage) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxImage(null);
      } else if (event.key === "ArrowLeft") {
        showLightboxImage(-1);
      } else if (event.key === "ArrowRight") {
        showLightboxImage(1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxImage, lightboxGallery.length]);

  useEffect(() => {
    if (!activeInsightLabel) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => insightCloseRef.current?.focus(), 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveInsightLabel(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeInsightLabel]);

  const openGalleryImage = (galleryIndex: number) => {
    setActiveGalleryIndex(galleryIndex);
    setActiveInsightLabel(null);
    setLightboxImage({
      projectIndex: activeProjectIndex,
      galleryIndex,
    });
  };

  const showLightboxImage = (direction: -1 | 1) => {
    if (!lightboxImage) return;
    const galleryLength = projects[lightboxImage.projectIndex].caseStudy?.gallery.length ?? 0;
    if (galleryLength === 0) return;
    const galleryIndex =
      (lightboxImage.galleryIndex + direction + galleryLength) % galleryLength;

    setActiveProjectIndex(lightboxImage.projectIndex);
    setActiveGalleryIndex(galleryIndex);
    setLightboxImage({ ...lightboxImage, galleryIndex });
  };

  return (
    <main className="app-shell" ref={appRef}>
      <a className="skip-link" href="#profile">
        {ui.mainContent}
      </a>
      <header className="site-header" aria-label={ui.brandHome}>
        <a className="brand" href="#top" aria-label={`${profile.name} ${ui.brandHome}`}>
          <span>{profile.initials}</span>
          <strong>{profile.name}</strong>
        </a>
        <nav>
          {ui.nav.map((item) => (
            <a href={item.href} key={item.href} onClick={(event) => handleNavClick(event, item.href)}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="language-switcher">
          <button
            className="language-button"
            type="button"
            onClick={() => setLanguageMenuOpen((open) => !open)}
            aria-expanded={languageMenuOpen}
            aria-label={ui.language}
          >
            <Languages size={16} aria-hidden="true" />
            <span>{languageOptions.find((option) => option.value === language)?.label}</span>
          </button>
          {languageMenuOpen ? (
            <div className="language-menu" role="menu" aria-label={ui.language}>
              {languageOptions.map((option) => (
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={language === option.value}
                  className={language === option.value ? "is-active" : undefined}
                  key={option.value}
                  onClick={() => handleLanguageChange(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </header>

      <section className="welcome-screen" id="top" aria-label={ui.welcome}>
        <div className="welcome-background" aria-hidden="true">
          <div className="antigravity-layer">
            <Antigravity
              count={300}
              magnetRadius={10}
              ringRadius={10}
              waveSpeed={0.4}
              waveAmplitude={1}
              particleSize={2}
              lerpSpeed={0.1}
              color="#b88a34"
              autoAnimate={false}
              particleVariance={1}
              rotationSpeed={0}
              depthFactor={1}
              pulseSpeed={3}
              particleShape="capsule"
              fieldStrength={10}
            />
          </div>
          <span />
          <span />
          <span />
        </div>
        <div className="welcome-inner">
          <p className="welcome-kicker">
            <Sparkles size={16} aria-hidden="true" />
            Portfolio 2026
          </p>
          <SplitText
            tag="h1"
            text={ui.welcome}
            className="welcome-title"
            delay={70}
            duration={0.72}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 64, rotateX: -72 }}
            to={{ opacity: 1, y: 0, rotateX: 0 }}
            rootMargin="0px"
            threshold={0.05}
            textAlign="center"
            onLetterAnimationComplete={() => setWelcomeReady(true)}
          />
          <p className={`welcome-subtitle ${welcomeReady ? "is-visible" : ""}`}>
            {ui.welcomeSubtitle}
          </p>
          <div className={`welcome-actions ${welcomeReady ? "is-visible" : ""}`}>
            <button className="button primary" type="button" onClick={enterPortfolio}>
              {ui.enterPortfolio}
              <ArrowUpRight size={18} aria-hidden="true" />
            </button>
            <a className="button secondary" href={profile.resumeUrl}>
              <Download size={18} aria-hidden="true" />
              {ui.downloadResume}
            </a>
          </div>
        </div>
      </section>

      <section className="hero" id="profile">
        <img src={heroImage} alt="" className="hero-image" decoding="async" />
        <div className="hero-overlay" />
        <div className="hero-inner">
          <div className="hero-content" data-reveal>
            <div className="eyebrow">
              <Sparkles size={16} aria-hidden="true" />
              {profile.availability}
            </div>
            <h1>{profile.name}</h1>
            <p className="hero-title">{profile.title}</p>
            <p className="hero-headline">{profile.headline}</p>
            <p className="hero-intro">{profile.intro}</p>
            <div className="hero-actions" aria-label={ui.heroActions}>
              <a className="button primary" href={`mailto:${profile.email}`}>
                <Mail size={18} aria-hidden="true" />
                {ui.contactMe}
              </a>
              <a className="button secondary" href={profile.resumeUrl}>
                <Download size={18} aria-hidden="true" />
                {ui.downloadResume}
              </a>
            </div>
          </div>

          <figure className="hero-portrait" data-reveal>
            <img
              src={profile.photoUrl}
              alt={`${profile.englishName} ${ui.portraitAlt}`}
              decoding="async"
            />
            <figcaption>
              <strong>{profile.englishName}</strong>
              <span>{profile.location}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="summary-band" aria-label="Profile summary" data-reveal>
        <div className="summary-inner">
          {profile.metrics.map((metric) => (
            <div className="metric" key={metric.label}>
              <span>{metric.value}</span>
              <p>{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section intro-grid" data-reveal>
        <div>
          <p className="section-kicker">Profile</p>
          <h2>{ui.profileHeading}</h2>
        </div>
        <div className="strengths">
          {profile.strengths.map((strength) => (
            <div className="strength-item" key={strength}>
              <span aria-hidden="true" />
              <p>{strength}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section project-section" id="work" data-reveal ref={projectSectionRef}>
        <div className="project-showcase">
          {activeCover ? (
            <img
              src={activeCover.src}
              alt=""
              className="project-showcase-bg"
              decoding="async"
              aria-hidden="true"
            />
          ) : null}
          <div className="project-stage">
            {activeCover ? (
              <img
                src={activeCover.src}
                alt={activeCover.alt}
                className="project-stage-image"
                decoding="async"
              />
            ) : null}
            <div className="project-stage-overlay" />
            <div className="project-stage-copy" key={activeProject.title}>
              <div className="project-meta-line">
                <span>{activeProject.role}</span>
                <span>{activeProject.period}</span>
              </div>
              <h2>{activeProject.title}</h2>
              <p>{activeProject.summary}</p>
              <strong>{activeProject.impact}</strong>
              {projectInsightGroups.length > 0 ? (
                <div
                  className="project-insight-panel"
                  aria-label={`${activeProject.title} ${ui.insightDialog}`}
                >
                  {projectInsightGroups.map(({ icon: Icon, items, label }) => (
                    <button
                      className="project-insight-group"
                      key={label}
                      type="button"
                      onClick={() => setActiveInsightLabel(label)}
                      aria-label={`${label} ${ui.insightDialog}`}
                    >
                      <span className="project-insight-title">
                        <Icon size={16} aria-hidden="true" />
                        <span>{label}</span>
                      </span>
                      <span className="project-insight-list">
                        {items.slice(0, 3).map((item, index) => (
                          <span className="project-insight-row" key={item}>
                            <span className="project-insight-index">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="project-insight-text">{item}</span>
                          </span>
                        ))}
                      </span>
                    </button>
                  ))}
                </div>
              ) : null}
              {activeCaseStudy?.gallery.length ? (
                <div className="project-gallery-strip" aria-label={`${activeProject.title} ${ui.projectGallery}`}>
                  <div className="project-gallery-label">
                    <span>{ui.gallery}</span>
                    <strong>{ui.projectGallery}</strong>
                  </div>
                  <div className="project-gallery-thumbs">
                    {activeCaseStudy.gallery.slice(0, 4).map((image, index) => (
                      <button
                        className={`project-gallery-thumb ${
                          index === activeGalleryIndex ? "is-active" : ""
                        }`}
                        key={image.src}
                        type="button"
                        onClick={() => openGalleryImage(index)}
                        aria-label={`${ui.lightbox} ${index + 1}: ${image.caption}`}
                      >
                        <img src={image.src} alt={image.alt} decoding="async" loading="lazy" />
                        <span>{String(index + 1).padStart(2, "0")}</span>
                      </button>
                    ))}
                    {activeCaseStudy.gallery.length > 4 ? (
                      <button
                        className="project-gallery-more"
                        type="button"
                        onClick={() => openGalleryImage(0)}
                      >
                        {ui.viewAll} {activeCaseStudy.gallery.length}
                      </button>
                    ) : null}
                  </div>
                </div>
              ) : null}
              <div className="project-stage-actions">
                <div className="tag-list" aria-label={`${activeProject.title} ${ui.skillTags}`}>
                  {activeProject.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                {activeProject.link ? (
                  <a className="project-link" href={activeProject.link.url}>
                    {activeProject.link.label}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            </div>
          </div>

          <aside className="project-rail-panel" aria-label={ui.projectList}>
            <div className="project-rail-heading">
              <div>
                <p className="section-kicker">{ui.selectedWork}</p>
                <h2>{ui.selectedWorkTitle}</h2>
              </div>
              <div className="carousel-controls" aria-label={ui.projectNav}>
                <button
                  type="button"
                  onClick={() => scrollProjectRail(-1)}
                  aria-label={ui.previousProject}
                  title={ui.previousProject}
                >
                  <ChevronLeft size={20} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollProjectRail(1)}
                  aria-label={ui.nextProject}
                  title={ui.nextProject}
                >
                  <ChevronRight size={20} aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="project-grid" ref={projectRailRef}>
              {projects.map((project, index) => {
                const cover = project.caseStudy?.cover ?? project.caseStudy?.gallery[0];
                return (
                  <article
                    className={`project-card ${index === activeProjectIndex ? "is-active" : ""}`}
                    key={project.title}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleProjectSelect(index)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        handleProjectSelect(index);
                      }
                    }}
                    aria-pressed={index === activeProjectIndex}
                  >
                    <div className="project-thumb">
                      {cover ? (
                        <img src={cover.src} alt={cover.alt} decoding="async" />
                      ) : null}
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <em>{project.period}</em>
                    </div>
                    <div className="project-card-body">
                      <div className="project-topline">
                        <span className={index === 1 ? "status-pill" : undefined}>
                          {project.period}
                        </span>
                        <span>{project.role}</span>
                      </div>
                      <h3>{project.title}</h3>
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </div>
                  </article>
                );
              })}
            </div>
            <p className="project-count">{projects.length} {ui.projectCountLabel}</p>
          </aside>
        </div>
      </section>

      {activeInsight && ActiveInsightIcon ? (
        <div
          className="insight-dialog-shell"
          role="dialog"
          aria-modal="true"
          aria-labelledby="insight-dialog-title"
          onClick={() => setActiveInsightLabel(null)}
        >
          <div className="insight-dialog" onClick={(event) => event.stopPropagation()}>
            <button
              className="insight-dialog-close"
              type="button"
              ref={insightCloseRef}
              onClick={() => setActiveInsightLabel(null)}
              aria-label={ui.closeDetails}
            >
              <X size={22} aria-hidden="true" />
            </button>
            <div className="insight-dialog-heading">
              <p>{activeProject.title}</p>
              <h2 id="insight-dialog-title">
                <ActiveInsightIcon size={20} aria-hidden="true" />
                {activeInsight.label}
              </h2>
            </div>
            <ol className="insight-dialog-list">
              {activeInsight.items.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      ) : null}

      {currentLightboxImage && lightboxImage ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={ui.lightbox}
          onClick={() => setLightboxImage(null)}
        >
          <div className="lightbox-panel" onClick={(event) => event.stopPropagation()}>
            <button
              className="lightbox-close"
              type="button"
              onClick={() => setLightboxImage(null)}
              aria-label={ui.closePreview}
            >
              <X size={22} aria-hidden="true" />
            </button>
            {lightboxGallery.length > 1 ? (
              <>
                <button
                  className="lightbox-nav previous"
                  type="button"
                  onClick={() => showLightboxImage(-1)}
                  aria-label={ui.previousImage}
                >
                  <ChevronLeft size={28} aria-hidden="true" />
                </button>
                <button
                  className="lightbox-nav next"
                  type="button"
                  onClick={() => showLightboxImage(1)}
                  aria-label={ui.nextImage}
                >
                  <ChevronRight size={28} aria-hidden="true" />
                </button>
              </>
            ) : null}
            <img
              src={currentLightboxImage.src}
              alt={currentLightboxImage.alt}
              decoding="async"
            />
            <div className="lightbox-meta">
              <p>{currentLightboxImage.caption}</p>
              <span>
                {lightboxImage.galleryIndex + 1} / {lightboxGallery.length}
              </span>
            </div>
          </div>
        </div>
      ) : null}

      <section className="section experience-section" id="experience" data-reveal>
        <div className="section-heading">
          <div>
            <p className="section-kicker">Experience</p>
            <h2>{ui.nav.find((item) => item.href === "#experience")?.label}</h2>
          </div>
        </div>
        <div className="timeline">
          {experiences.map((item) => (
            <article className="timeline-item" key={`${item.company}-${item.period}`}>
              <div className="timeline-marker" aria-hidden="true" />
              <div>
                <div className="timeline-head">
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.company}</p>
                  </div>
                  <span>{item.period}</span>
                </div>
                <p className="timeline-summary">{item.summary}</p>
                <ul>
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section education-section" id="education" data-reveal>
        <div className="section-heading">
          <div>
            <p className="section-kicker">Education</p>
            <h2>{ui.nav.find((item) => item.href === "#education")?.label}</h2>
          </div>
        </div>
        <div className="education-grid">
          {education.map((item) => (
            <article className="education-card" key={item.school}>
              <div>
                <span>{item.period}</span>
                <h3>{item.school}</h3>
                <p>{item.degree}</p>
              </div>
              <ul>
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="skills" data-reveal>
        <div className="section-heading">
          <div>
            <p className="section-kicker">Capabilities</p>
            <h2>{ui.nav.find((item) => item.href === "#skills")?.label}</h2>
          </div>
        </div>
        <div className="skill-grid">
          {skillGroups.map((group) => (
            <article className="skill-card" key={group.title}>
              <BriefcaseBusiness size={20} aria-hidden="true" />
              <h3>{group.title}</h3>
              <div>
                {group.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact" id="contact" data-reveal>
        <div>
          <p className="section-kicker">Contact</p>
          <h2>{ui.contactHeading}</h2>
        </div>
        <div className="contact-links">
          <a href={`mailto:${profile.email}`}>
            <Mail size={18} aria-hidden="true" />
            {profile.email}
          </a>
          <a href={`tel:${profile.phone.replaceAll(" ", "")}`}>
            <Phone size={18} aria-hidden="true" />
            {profile.phone}
          </a>
          {profile.linkedin ? (
            <a href={profile.linkedin}>
              <Linkedin size={18} aria-hidden="true" />
              LinkedIn
            </a>
          ) : null}
          <span>
            <MapPin size={18} aria-hidden="true" />
            {profile.location}
          </span>
        </div>
      </section>

      <aside
        className={`hr-assistant ${hrChatOpen ? "is-open" : ""}`}
        aria-label={ui.hrAssistant}
      >
        {hrChatOpen ? (
          <section className="hr-chat-panel" aria-live="polite">
            <header className="hr-chat-header">
              <div>
                <span aria-hidden="true">
                  <Bot size={20} />
                </span>
                <div>
                  <strong>HR AI</strong>
                  <p>Renyu Zhang · Portfolio Assistant</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setHrChatOpen(false)}
                aria-label={ui.closeAssistant}
              >
                <X size={18} aria-hidden="true" />
              </button>
            </header>

            <div className="hr-chat-messages" ref={hrMessagesRef}>
              {hrMessages.map((message) => (
                <div className={`hr-message is-${message.role}`} key={message.id}>
                  <p>{message.text}</p>
                </div>
              ))}
            </div>

            <div className="hr-chat-prompts" aria-label={ui.hrAssistant}>
              {ui.hrPrompts.map((question) => (
                <button type="button" key={question} onClick={() => askHrQuestion(question)}>
                  {question}
                </button>
              ))}
            </div>

            <form className="hr-chat-form" onSubmit={handleHrSubmit}>
              <input
                value={hrInput}
                onChange={(event) => setHrInput(event.target.value)}
                placeholder={ui.hrPlaceholder}
                aria-label={ui.hrInput}
              />
              <button type="submit" aria-label={ui.sendQuestion}>
                <SendHorizontal size={18} aria-hidden="true" />
              </button>
            </form>
          </section>
        ) : null}

        <button
          className="hr-chat-toggle"
          type="button"
          onClick={() => setHrChatOpen((open) => !open)}
          aria-label={hrChatOpen ? ui.closeAssistant : ui.hrAssistant}
        >
          {hrChatOpen ? (
            <X size={22} aria-hidden="true" />
          ) : (
            <MessageCircle size={22} aria-hidden="true" />
          )}
        </button>
      </aside>
    </main>
  );
}

export default App;
