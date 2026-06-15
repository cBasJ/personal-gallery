import { useEffect, useRef, useState } from "react";
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
  Network,
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
  const projectRailRef = useRef<HTMLDivElement>(null);
  const caseStudyRef = useRef<HTMLDivElement>(null);
  const preloadedImagesRef = useRef<HTMLImageElement[]>([]);
  const [welcomeReady, setWelcomeReady] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<{
    projectIndex: number;
    galleryIndex: number;
  } | null>(null);
  const activeProject = projects[activeProjectIndex];
  const activeCaseStudy = activeProject.caseStudy;
  const activeGallery = activeCaseStudy?.gallery[activeGalleryIndex];
  const activeCover = activeCaseStudy?.gallery[0] ?? activeGallery;
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
  const lightboxProject = lightboxImage ? projects[lightboxImage.projectIndex] : null;
  const lightboxGallery = lightboxProject?.caseStudy?.gallery ?? [];
  const currentLightboxImage =
    lightboxImage && lightboxGallery.length > 0
      ? lightboxGallery[lightboxImage.galleryIndex]
      : null;

  const handleProjectSelect = (index: number) => {
    setActiveProjectIndex(index);
    setActiveGalleryIndex(0);
  };

  const handleCaseStudySwitch = (index: number) => {
    setActiveProjectIndex(index);
    setActiveGalleryIndex(0);
    window.setTimeout(() => {
      caseStudyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
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
        ".project-card, .strength-item, .skill-card, .education-card, .timeline-item > div:last-child, .detail-group, .architecture-list",
      );
      const cleanups = spotlitItems.map((item) => {
        const updateSpotlight = (event: PointerEvent) => {
          const rect = item.getBoundingClientRect();
          item.style.setProperty("--mx", `${event.clientX - rect.left}px`);
          item.style.setProperty("--my", `${event.clientY - rect.top}px`);
        };

        item.addEventListener("pointermove", updateSpotlight);
        return () => item.removeEventListener("pointermove", updateSpotlight);
      });

      return () => cleanups.forEach((cleanup) => cleanup());
    },
    { scope: appRef },
  );

  useGSAP(
    () => {
      if (!caseStudyRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const elements = caseStudyRef.current.querySelectorAll<HTMLElement>(
        ".case-study-heading, .detail-group, .case-study-media figure, .gallery-tabs, .architecture-list",
      );

      gsap.fromTo(
        elements,
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          duration: 0.54,
          ease: "power3.out",
          stagger: 0.055,
          y: 0,
        },
      );
    },
    { dependencies: [activeProjectIndex], scope: caseStudyRef },
  );

  useGSAP(
    () => {
      if (!caseStudyRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const image = caseStudyRef.current.querySelector<HTMLElement>(".gallery-preview img");
      const caption = caseStudyRef.current.querySelector<HTMLElement>(".case-study-media figcaption");
      if (!image) return;

      gsap.fromTo(
        [image, caption].filter(Boolean),
        { autoAlpha: 0, scale: 1.025 },
        { autoAlpha: 1, duration: 0.42, ease: "power2.out", scale: 1 },
      );
    },
    { dependencies: [activeGalleryIndex, activeProjectIndex], scope: caseStudyRef },
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

  const openLightbox = () => {
    if (!activeGallery) return;
    setLightboxImage({
      projectIndex: activeProjectIndex,
      galleryIndex: activeGalleryIndex,
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
            <a href={item.href} key={item.href}>
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

      <section className="section project-section" id="work" data-reveal>
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
                    <section className="project-insight-group" key={label}>
                      <h3>
                        <Icon size={16} aria-hidden="true" />
                        {label}
                      </h3>
                      <ul>
                        {items.slice(0, 3).map((item, index) => (
                          <li key={item}>
                            <span>{String(index + 1).padStart(2, "0")}</span>
                            <p>{item}</p>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
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
                const cover = project.caseStudy?.gallery[0];
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

        {activeCaseStudy ? (
          <div
            className="case-study"
            ref={caseStudyRef}
            aria-label={`${activeProject.title} 详情`}
            data-reveal
          >
            <div className="case-study-switcher" aria-label="快速切换项目">
              {projects.map((project, index) => (
                <button
                  className={index === activeProjectIndex ? "is-active" : ""}
                  key={project.title}
                  type="button"
                  onClick={() => handleCaseStudySwitch(index)}
                  aria-label={`切换到${project.title}`}
                  title={project.title}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <div className="case-study-copy">
              <div className="case-study-heading">
                <p className="section-kicker">Case Study</p>
                <h3>{activeProject.title}</h3>
                <p>{activeCaseStudy.context}</p>
                {activeProject.link ? (
                  <a className="case-study-link" href={activeProject.link.url}>
                    {activeProject.link.label}
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </a>
                ) : null}
              </div>

              <div className="case-study-groups">
                <div className="detail-group">
                  <div className="detail-title">
                    <Layers3 size={18} aria-hidden="true" />
                    我的职责
                  </div>
                  <ul>
                    {activeCaseStudy.contribution.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-group">
                  <div className="detail-title">
                    <GalleryHorizontalEnd size={18} aria-hidden="true" />
                    产品功能
                  </div>
                  <ul>
                    {activeCaseStudy.features.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-group">
                  <div className="detail-title">
                    <Code2 size={18} aria-hidden="true" />
                    工程亮点
                  </div>
                  <ul>
                    {activeCaseStudy.engineering.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="case-study-media">
              {activeGallery ? (
                <figure>
                  <button
                    className="gallery-preview"
                    type="button"
                    onClick={openLightbox}
                  >
                    <img
                      src={activeGallery.src}
                      alt={activeGallery.alt}
                      decoding="async"
                    />
                    <span>点击放大</span>
                  </button>
                  <figcaption>{activeGallery.caption}</figcaption>
                </figure>
              ) : null}

              <div className="gallery-tabs" aria-label="项目截图">
                {activeCaseStudy.gallery.map((image, index) => (
                  <button
                    className={index === activeGalleryIndex ? "is-active" : ""}
                    key={image.src}
                    type="button"
                    onClick={() => setActiveGalleryIndex(index)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <div className="architecture-list">
                <div className="detail-title">
                  <Network size={18} aria-hidden="true" />
                  技术架构
                </div>
                <div>
                  {activeCaseStudy.architecture.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </section>

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
