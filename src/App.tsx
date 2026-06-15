import { type MouseEvent, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  Code2,
  Download,
  GalleryHorizontalEnd,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  X,
} from "lucide-react";
import Antigravity from "./Antigravity";
import heroImage from "./assets/hero-workspace.webp";
import { education, experiences, profile, projects, skillGroups } from "./profile";
import SplitText from "./SplitText";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const navItems = [
  { href: "#work", label: "项目" },
  { href: "#experience", label: "经历" },
  { href: "#education", label: "教育" },
  { href: "#skills", label: "能力" },
  { href: "#contact", label: "联系" },
];

function App() {
  const appRef = useRef<HTMLElement>(null);
  const projectSectionRef = useRef<HTMLElement>(null);
  const projectRailRef = useRef<HTMLDivElement>(null);
  const insightCloseRef = useRef<HTMLButtonElement>(null);
  const preloadedImagesRef = useRef<HTMLImageElement[]>([]);
  const [welcomeReady, setWelcomeReady] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [activeInsightLabel, setActiveInsightLabel] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{
    projectIndex: number;
    galleryIndex: number;
  } | null>(null);
  const activeProject = projects[activeProjectIndex];
  const activeCaseStudy = activeProject.caseStudy;
  const activeCover = activeCaseStudy?.cover ?? activeCaseStudy?.gallery[0];
  const projectInsightGroups = activeCaseStudy
    ? [
        {
          icon: Layers3,
          items: activeCaseStudy.contribution,
          label: "我的职责",
        },
        {
          icon: GalleryHorizontalEnd,
          items: activeCaseStudy.features,
          label: "产品功能",
        },
        {
          icon: Code2,
          items: activeCaseStudy.engineering,
          label: "工程亮点",
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

  const handleProjectSelect = (index: number) => {
    setActiveProjectIndex(index);
    setActiveGalleryIndex(0);
    setActiveInsightLabel(null);
  };

  const scrollProjectRail = (direction: -1 | 1) => {
    const rail = projectRailRef.current;
    if (!rail) return;
    const isVertical = window.getComputedStyle(rail).flexDirection === "column";
    rail.scrollBy({
      behavior: "smooth",
      left: isVertical ? 0 : direction * rail.clientWidth * 0.72,
      top: isVertical ? direction * rail.clientHeight * 0.58 : 0,
    });
  };

  const enterPortfolio = () => {
    document.querySelector("#profile")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href !== "#work") return;
    event.preventDefault();
    window.history.pushState(null, "", href);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
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

          if (header.contains(document.activeElement) || currentScrollY < 80 || delta < -3) {
            showHeader();
          } else if (delta > 4 && currentScrollY > 120) {
            hideHeader();
          }

          previousScrollY = currentScrollY;
        };

        window.addEventListener("scroll", updateHeader, { passive: true });
        cleanupFns.push(() => window.removeEventListener("scroll", updateHeader));
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

      const projectCopyItems = gsap.utils.toArray<HTMLElement>(
        ".project-meta-line, .project-stage-copy h2, .project-stage-copy p, .project-stage-copy strong",
      );
      const projectInsightCards = gsap.utils.toArray<HTMLElement>(".project-insight-group");
      const projectLowerItems = gsap.utils.toArray<HTMLElement>(
        ".project-gallery-strip, .project-stage-actions",
      );
      const projectRailItems = gsap.utils.toArray<HTMLElement>(
        ".project-rail-heading, .project-count",
      );
      const projectCards = gsap.utils.toArray<HTMLElement>(".project-showcase .project-card");
      const cardFlyDirections = [
        { x: 170, y: -92 },
        { x: 210, y: 0 },
        { x: 170, y: 94 },
        { x: 96, y: 128 },
      ];

      gsap.set(projectCopyItems, { autoAlpha: 0, x: -72, y: 20 });
      gsap.set(projectInsightCards, { autoAlpha: 0 });
      gsap.set(projectLowerItems, { autoAlpha: 0 });
      gsap.set(projectRailItems, { autoAlpha: 0, x: 72, y: -28 });
      gsap.set(projectCards, {
        "--card-fly-x": (index: number) =>
          `${cardFlyDirections[index % cardFlyDirections.length].x}px`,
        "--card-fly-y": (index: number) =>
          `${cardFlyDirections[index % cardFlyDirections.length].y}px`,
        autoAlpha: 0,
      });
      gsap.set(".project-showcase-bg", { filter: "blur(10px) saturate(0.72)", scale: 1.1 });

      const flyProjectIn = () => {
        gsap.killTweensOf([
          ".project-showcase-bg",
          ".project-showcase",
          projectCopyItems,
          projectInsightCards,
          projectLowerItems,
          projectRailItems,
          projectCards,
        ]);

        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .to(
            ".project-showcase-bg",
            {
              clearProps: "filter,scale",
              duration: 1.15,
              filter: "blur(0px) saturate(0.9) contrast(1.04)",
              scale: 1.02,
            },
            0,
          )
          .fromTo(
            ".project-showcase",
            { clipPath: "inset(8% 0 8% 0 round 0px)" },
            { clipPath: "inset(0% 0 0% 0 round 0px)", duration: 0.78 },
            0,
          )
          .to(
            projectCopyItems,
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
            projectInsightCards,
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
            projectLowerItems,
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
            projectRailItems,
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

        gsap.killTweensOf([
          ".project-showcase-bg",
          ".project-showcase",
          projectCopyItems,
          projectInsightCards,
          projectLowerItems,
          projectRailItems,
          projectCards,
        ]);

        gsap
          .timeline({ defaults: { ease: "power2.in" } })
          .to(
            projectCopyItems,
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
            projectInsightCards,
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
            projectLowerItems,
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
            projectRailItems,
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
            ".project-showcase-bg",
            {
              duration: 0.54,
              filter: "blur(8px) saturate(0.7)",
              scale: 1.08,
            },
            0,
          );
      };

      ScrollTrigger.create({
        end: "top+=8% top",
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
  }, []);

  useEffect(() => {
    const projectSection = projectSectionRef.current;
    const nextSection = document.querySelector<HTMLElement>("#experience");
    if (!projectSection || !nextSection) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

      if (window.performance.now() < lockUntil || Math.abs(delta) < 2) return;

      const viewportHeight = window.innerHeight;
      const projectTop = projectSection.offsetTop;
      const projectHeight = projectSection.offsetHeight;
      const nextTop = nextSection.offsetTop;
      const projectDistance = currentScrollY - projectTop;

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

      if (delta > 0 && projectDistance > viewportHeight * 0.2) {
        settledOnProject = false;
        scrollToY(nextTop);
        return;
      }

      if (currentScrollY < projectTop - viewportHeight * 0.14 || projectDistance > projectHeight) {
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
        跳到主要内容
      </a>
      <header className="site-header" aria-label="主导航">
        <a className="brand" href="#top" aria-label={`${profile.name} 首页`}>
          <span>{profile.initials}</span>
          <strong>{profile.name}</strong>
        </a>
        <nav>
          {navItems.map((item) => (
            <a href={item.href} key={item.href} onClick={(event) => handleNavClick(event, item.href)}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <section className="welcome-screen" id="top" aria-label="欢迎界面">
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
            text="欢迎来到我的作品集"
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
            产品经理（实习） / 项目管理 / 前端开发 / 全栈
          </p>
          <div className={`welcome-actions ${welcomeReady ? "is-visible" : ""}`}>
            <button className="button primary" type="button" onClick={enterPortfolio}>
              进入作品集
              <ArrowUpRight size={18} aria-hidden="true" />
            </button>
            <a className="button secondary" href={profile.resumeUrl}>
              <Download size={18} aria-hidden="true" />
              下载简历
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
            <div className="hero-actions" aria-label="主要操作">
              <a className="button primary" href={`mailto:${profile.email}`}>
                <Mail size={18} aria-hidden="true" />
                联系我
              </a>
              <a className="button secondary" href={profile.resumeUrl}>
                <Download size={18} aria-hidden="true" />
                下载简历
              </a>
            </div>
          </div>

          <figure className="hero-portrait" data-reveal>
            <img
              src={profile.photoUrl}
              alt={`${profile.englishName} 证件照`}
              decoding="async"
            />
            <figcaption>
              <strong>{profile.englishName}</strong>
              <span>{profile.location}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="summary-band" aria-label="个人摘要" data-reveal>
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
          <h2>以扎实工程基础，把想法设计清楚并实现出来。</h2>
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
                  aria-label={`${activeProject.title} 的职责、功能和工程亮点`}
                >
                  {projectInsightGroups.map(({ icon: Icon, items, label }) => (
                    <button
                      className="project-insight-group"
                      key={label}
                      type="button"
                      onClick={() => setActiveInsightLabel(label)}
                      aria-label={`查看${label}完整信息`}
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
                <div className="project-gallery-strip" aria-label={`${activeProject.title} 相册`}>
                  <div className="project-gallery-label">
                    <span>Gallery</span>
                    <strong>项目相册</strong>
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
                        aria-label={`打开第 ${index + 1} 张项目图片：${image.caption}`}
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
                        查看全部 {activeCaseStudy.gallery.length}
                      </button>
                    ) : null}
                  </div>
                </div>
              ) : null}
              <div className="project-stage-actions">
                <div className="tag-list" aria-label={`${activeProject.title} 技术标签`}>
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

          <aside className="project-rail-panel" aria-label="项目列表">
            <div className="project-rail-heading">
              <div>
                <p className="section-kicker">Selected Work</p>
                <h2>精选项目</h2>
              </div>
              <div className="carousel-controls" aria-label="项目滑动控制">
                <button
                  type="button"
                  onClick={() => scrollProjectRail(-1)}
                  aria-label="浏览上一个项目"
                  title="浏览上一个项目"
                >
                  <ChevronLeft size={20} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollProjectRail(1)}
                  aria-label="浏览下一个项目"
                  title="浏览下一个项目"
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
                        <span className={project.period === "进行中" ? "status-pill" : undefined}>
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
            <p className="project-count">{projects.length} projects · 2024–2026</p>
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
              aria-label="关闭详情窗口"
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
          aria-label="项目图片预览"
          onClick={() => setLightboxImage(null)}
        >
          <div className="lightbox-panel" onClick={(event) => event.stopPropagation()}>
            <button
              className="lightbox-close"
              type="button"
              onClick={() => setLightboxImage(null)}
              aria-label="关闭图片预览"
            >
              <X size={22} aria-hidden="true" />
            </button>
            {lightboxGallery.length > 1 ? (
              <>
                <button
                  className="lightbox-nav previous"
                  type="button"
                  onClick={() => showLightboxImage(-1)}
                  aria-label="上一张图片"
                >
                  <ChevronLeft size={28} aria-hidden="true" />
                </button>
                <button
                  className="lightbox-nav next"
                  type="button"
                  onClick={() => showLightboxImage(1)}
                  aria-label="下一张图片"
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
            <h2>职业经历</h2>
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
            <h2>教育背景</h2>
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
            <h2>核心能力</h2>
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
          <h2>期待聊聊你的团队正在解决的问题。</h2>
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
    </main>
  );
}

export default App;
