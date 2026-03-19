import { useEffect, useMemo, useState } from "react"
import { articles as localArticles, projects as localProjects } from "../data/content"
import NeuralHero from "./components/NeuralHero"

function App() {
  const [theme, setTheme] = useState("light")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [projects, setProjects] = useState(localProjects)
  const [articles, setArticles] = useState(localArticles)
  const [activeSection, setActiveSection] = useState("hero")

  const [formStatus, setFormStatus] = useState("")
  const [formStatusType, setFormStatusType] = useState("success")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [secretCode, setSecretCode] = useState("")
  const [secretMessage, setSecretMessage] = useState("")
  const [secretMessageColor, setSecretMessageColor] = useState("inherit")
  const [showInitialLoader, setShowInitialLoader] = useState(true)

  const currentYear = useMemo(() => new Date().getFullYear(), [])
  const achievements = useMemo(
    () => [
      {
        title: "MODEL-X National Hackathon",
        meta: "Dec 2025 - Jan 2026",
        detail:
          "Selected for Round 2 and previously won Round 1 by building a predictive AI model for dementia-risk intelligence.",
      },
      {
        title: "EcoSpark 2025 - Top 10 Finalist",
        meta: "Sep 2025",
        detail:
          "Recognized in the Innovative Idea Challenge 2025 for an impact-focused solution to a real-world societal problem.",
      },
      {
        title: "GCE A/L Academic Distinction",
        meta: "2022",
        detail:
          "4A passes (Combined Mathematics, Physics, Chemistry, General English), Z-score 2.5793, Island Rank 157, District Rank 23.",
      },
      {
        title: "All Island 3rd Place - Western Brass Band",
        meta: "2020",
        detail:
          "Secured national 3rd place as part of the percussion team representing Rippon Girls' College.",
      },
    ],
    [],
  )

  const socialLinks = [
    {
      id: "github",
      href: "https://github.com/rash200319",
      ariaLabel: "GitHub",
      external: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      ),
    },
    {
      id: "linkedin",
      href: "https://www.linkedin.com/in/paboda-munasingha-307a99323?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      ariaLabel: "LinkedIn",
      external: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      ),
    },
    {
      id: "twitter",
      href: "https://x.com/RPaboda33562",
      ariaLabel: "Twitter",
      external: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
        </svg>
      ),
    },
    {
      id: "email",
      href: "mailto:pabodarashmi668@gmail.com",
      ariaLabel: "Email",
      external: false,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      ),
    },
  ]

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const resolvedTheme = savedTheme || (systemPrefersDark ? "dark" : "light")
    setTheme(resolvedTheme)
    document.documentElement.setAttribute("data-theme", resolvedTheme)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialLoader(false)
    }, 1800)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.body.style.overflow = showInitialLoader ? "hidden" : ""

    return () => {
      document.body.style.overflow = ""
    }
  }, [showInitialLoader])

  useEffect(() => {
    const onScroll = () => {
      const sections = ["hero", "about", "projects", "achievements", "articles", "contact"]
      let current = "hero"
      sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId)
        if (!section) return
        const rect = section.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          current = sectionId
        }
      })
      setActiveSection(current)
    }

    window.addEventListener("scroll", onScroll)
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch("/api/content")
        if (!response.ok) return
        const data = await response.json()
        if (Array.isArray(data.projects)) setProjects(data.projects)
        if (Array.isArray(data.articles)) setArticles(data.articles)
      } catch {
        setProjects(localProjects)
        setArticles(localArticles)
      }
    }

    loadContent()
  }, [])

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark"
    setTheme(next)
    document.documentElement.setAttribute("data-theme", next)
    localStorage.setItem("theme", next)
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (!element) return
    const offset = 80
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    })

    setMobileMenuOpen(false)
  }

  const checkSecretCode = () => {
    const code = secretCode.trim()

    if (code === "034872") {
      setSecretMessage("✅ Correct! Redirecting to hidden page...")
      setSecretMessageColor("#4ade80")
      setTimeout(() => {
        window.location.href = "/page2.html"
      }, 1500)
      return
    }

    if (code.length === 6) {
      setSecretMessage("❌ Incorrect code. Try again!")
      setSecretMessageColor("#f87171")
      setTimeout(() => {
        setSecretMessage("")
        setSecretCode("")
      }, 2000)
      return
    }

    setSecretMessage("Please enter a 6-digit code")
    setSecretMessageColor("#fbbf24")
  }

  const validateForm = (name, email, message) => {
    if (!name || !email || !message) {
      setFormStatus("Please fill in all fields.")
      setFormStatusType("error")
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setFormStatus("Please enter a valid email address.")
      setFormStatusType("error")
      return false
    }

    return true
  }

  const handleContactSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const name = String(formData.get("name") || "").trim()
    const email = String(formData.get("email") || "").trim()
    const message = String(formData.get("message") || "").trim()

    if (!validateForm(name, email, message)) return

    setIsSubmitting(true)

    try {
      const response = await fetch("https://formspree.io/f/xwvvpqbk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      })

      if (!response.ok) {
        throw new Error("Form submission failed")
      }

      e.currentTarget.reset()
      setFormStatus("Thank you for your message! I'll get back to you soon.")
      setFormStatusType("success")

      setTimeout(() => {
        setFormStatus("")
      }, 5000)
    } catch {
      setFormStatus("Something went wrong. Please try again later or email me directly at pabodarashmi668@gmail.com")
      setFormStatusType("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {showInitialLoader ? (
        <div className="cyber-loader" role="status" aria-live="polite" aria-label="Loading portfolio">
          <div className="cyber-loader__grid"></div>
          <div className="cyber-loader__content">
            <p className="cyber-loader__label">SYSTEM BOOT</p>
            <h2 className="cyber-loader__title glitch" data-text="Initializing Portfolio Interface...">
              Initializing Portfolio Interface...
            </h2>
            <div className="cyber-loader__bar">
              <span></span>
            </div>
          </div>
        </div>
      ) : null}

      <nav id="navbar">
        <div className="nav-container">
          <button className="nav-brand" onClick={() => scrollToSection("hero")}>
            {"<RashmiPaboda />"}
          </button>

          <div className={`nav-menu ${mobileMenuOpen ? "active" : ""}`} id="navMenu">
            {[
              ["hero", "Home"],
              ["about", "About"],
              ["projects", "Projects"],
              ["achievements", "Achievements"],
              ["articles", "Articles"],
              ["contact", "Contact"],
            ].map(([id, label]) => (
              <button
                key={id}
                className={`nav-link ${activeSection === id ? "active" : ""}`}
                onClick={() => scrollToSection(id)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="nav-actions">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
              <svg className="moon-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
              <svg className="sun-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            </button>
            <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen((value) => !value)}>
              <span className="hamburger"></span>
            </button>
          </div>
        </div>
      </nav>

      <aside className="social-sidebar" aria-label="Social media links">
        {socialLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            className="social-circle"
            aria-label={link.ariaLabel}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
          >
            {link.icon}
          </a>
        ))}
      </aside>

      <section id="hero" className="hero-section">
        <NeuralHero name="Rashmi Paboda" />
      </section>

      <section id="about" className="about-section">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <p className="section-description">
            A passionate Computer Science and Engineering student dedicated to creating elegant solutions to complex problems.
          </p>

          <div className="about-grid">
            <div className="card">
              <h3 className="card-title">Education</h3>
              <p className="card-text">
                Bachelor&apos;s in Computer Science & Engineering
                <br />
                <span className="text-small">Expected Graduation: 2028</span>
              </p>
            </div>

            <div className="card">
              <h3 className="card-title">Skills</h3>
              <p className="card-text">JavaScript, TypeScript, Python, React, Node.js, SQL, Git, Algorithms & Data Structures</p>
            </div>

            <div className="card">
              <h3 className="card-title">Experience</h3>
              <p className="card-text">Personal projects building full-stack applications</p>
            </div>
          </div>

          <div className="cv-card">
            <div>
              <h3 className="cv-title">Download My CV</h3>
              <p className="cv-text">Get a complete overview of my education, experience, and skills in PDF format.</p>
            </div>
            <a href="/cv.pdf" download className="btn btn-primary">Download CV</a>
          </div>
        </div>
      </section>

      <section id="projects" className="projects-section">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-description">
            A collection of my recent work showcasing various technologies and problem-solving approaches.
          </p>
          <div className="projects-grid">
            {projects.map((project) => (
              <div className="project-card" key={project.title}>
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                </div>
                <div className="project-tags">
                  {project.technologies.map((tech) => (
                    <span className="badge" key={`${project.title}-${tech}`}>{tech}</span>
                  ))}
                </div>
                <div className="project-stats">
                  <div className="stat"><span>★</span><span>{project.stars}</span></div>
                  <div className="stat"><span>⑂</span><span>{project.forks}</span></div>
                </div>
                <div className="project-footer">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">Code</a>
                  {project.demo ? (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Demo</a>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: "48px" }}>
            <a href="https://github.com/rash200319" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              View All Projects on GitHub
            </a>
          </div>
        </div>
      </section>

      <section id="achievements" className="achievements-section">
        <div className="container">
          <h2 className="section-title">Achievements & Certifications</h2>
          <p className="section-description">Highlights extracted from my CV including academic distinctions, competitions, and key recognitions.</p>

          <div className="achievements-grid">
            {achievements.map((achievement) => (
              <article className="achievement-card" key={achievement.title}>
                <div className="achievement-meta">{achievement.meta}</div>
                <h3 className="achievement-title">{achievement.title}</h3>
                <p className="achievement-text">{achievement.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="articles" className="articles-section">
        <div className="container">
          <h2 className="section-title">Technical Articles</h2>
          <p className="section-description">
            Sharing my learnings and insights on software development, algorithms, and computer science fundamentals.
          </p>

          <div className="articles-grid">
            {articles.map((article) => {
              const date = new Date(article.date)
              const formattedDate = date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })

              return (
                <div className="article-card" key={article.title}>
                  <div className="article-header">
                    <span className="badge">{article.category}</span>
                    <div className="article-meta">
                      <div className="meta-item"><span>{formattedDate}</span></div>
                      <div className="meta-item"><span>{article.readTime}</span></div>
                    </div>
                  </div>
                  <a href={article.url} className="article-title-link">
                    <h3 className="article-title">{article.title}</h3>
                  </a>
                  <p className="article-description">{article.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-description">Have a question or want to work together? Feel free to reach out!</p>

          <div className="contact-container">
            <div className="contact-form-container">
              <div className="card">
                <form id="contact-form" onSubmit={handleContactSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" rows="5" required></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary" id="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
                {formStatus ? (
                  <div className="form-status" style={{ color: formStatusType === "error" ? "#ef4444" : "#10b981" }}>
                    {formStatus}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="contact-info">
              <div className="card" style={{ marginBottom: "24px" }}>
                <div className="card-header">
                  <h3 className="card-title">Connect With Me</h3>
                  <p className="card-description">Find me on these platforms</p>
                </div>
                <div className="connect-links">
                  <a href="mailto:pabodarashmi668@gmail.com" className="connect-link">
                    <div>
                      <div className="connect-title">Email</div>
                      <div className="connect-text">pabodarashmi668@gmail.com</div>
                    </div>
                  </a>
                  <a href="https://github.com/rash200319" target="_blank" rel="noopener noreferrer" className="connect-link">
                    <div>
                      <div className="connect-title">GitHub</div>
                      <div className="connect-text">@rash200319</div>
                    </div>
                  </a>
                  <a href="https://leetcode.com/u/Rashmipaboda/" target="_blank" rel="noopener noreferrer" className="connect-link">
                    <div>
                      <div className="connect-title">LeetCode</div>
                      <div className="connect-text">Rashmipaboda</div>
                    </div>
                  </a>
                  <a href="https://www.behance.net/rashmipaboda" target="_blank" rel="noopener noreferrer" className="connect-link">
                    <div>
                      <div className="connect-title">Behance</div>
                      <div className="connect-text">rashmipaboda</div>
                    </div>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/paboda-munasingha-307a99323?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="connect-link"
                  >
                    <div>
                      <div className="connect-title">LinkedIn</div>
                      <div className="connect-text">paboda-munasingha</div>
                    </div>
                  </a>
                  <a href="https://x.com/RPaboda33562" target="_blank" rel="noopener noreferrer" className="connect-link">
                    <div>
                      <div className="connect-title">Twitter</div>
                      <div className="connect-text">rashmi paboda</div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="card">
                <p className="opportunity-text">
                  Open to internship opportunities, collaborations, and interesting projects. Let&apos;s build something amazing together!
                </p>
              </div>
            </div>
          </div>

          <footer className="footer">
            <p>
              © {currentYear} Rashmi Paboda. Built with React, Node.js, and JavaScript.
              <span style={{ opacity: 0.1, cursor: "pointer", userSelect: "none" }} onClick={() => (window.location.href = "/secret.html")}>.
              </span>
            </p>
          </footer>
        </div>
      </section>
    </>
  )
}

export default App
