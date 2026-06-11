import {
  ArrowUpRight,
  BriefcaseBusiness,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";
import heroImage from "./assets/hero-workspace.png";
import { experiences, profile, projects, skillGroups } from "./profile";

const navItems = [
  { href: "#work", label: "项目" },
  { href: "#experience", label: "经历" },
  { href: "#skills", label: "能力" },
  { href: "#contact", label: "联系" },
];

function App() {
  return (
    <main>
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

      <section className="hero" id="top">
        <img src={heroImage} alt="" className="hero-image" />
        <div className="hero-overlay" />
        <div className="hero-content">
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
            <a className="button secondary" href="#work">
              <ArrowUpRight size={18} aria-hidden="true" />
              查看项目
            </a>
          </div>
        </div>
      </section>

      <section className="summary-band" aria-label="个人摘要">
        <div className="summary-inner">
          {profile.metrics.map((metric) => (
            <div className="metric" key={metric.label}>
              <span>{metric.value}</span>
              <p>{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section intro-grid">
        <div>
          <p className="section-kicker">Profile</p>
          <h2>清晰判断，稳定交付，关注真正产生结果的细节。</h2>
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

      <section className="section" id="work">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Selected Work</p>
            <h2>精选项目</h2>
          </div>
          <a className="text-link" href={profile.github}>
            查看更多
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <div className="project-topline">
                <span>{project.period}</span>
                <span>{project.role}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <strong>{project.impact}</strong>
              <div className="tag-list" aria-label={`${project.title} 技术标签`}>
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section experience-section" id="experience">
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

      <section className="section" id="skills">
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

      <section className="contact" id="contact">
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
          <a href={profile.linkedin}>
            <Linkedin size={18} aria-hidden="true" />
            LinkedIn
          </a>
          <a href={profile.github}>
            <Github size={18} aria-hidden="true" />
            GitHub
          </a>
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
