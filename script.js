function toggleTheme() {
  const html = document.documentElement
  const currentTheme = html.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  html.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)
}

// Initialize theme from localStorage or system preference
function initTheme() {
  const savedTheme = localStorage.getItem("theme")
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme)
  } else if (systemPrefersDark) {
    document.documentElement.setAttribute("data-theme", "dark")
  }
}

// Call initTheme immediately
initTheme()

// Projects data
const projects = [
  {
    title: "rash200319.github.io",
    description:
      "My personal portfolio website showcasing projects, skills, and experience. Features AI code reviewer integration.",
    technologies: ["HTML", "JavaScript", "CSS"],
    github: "https://github.com/rash200319/rash200319.github.io",
    demo: "https://rash200319.github.io",
    stars: 0,
    forks: 0,
  },
  {
    title: "Solar System Project",
    description:
      "Real-time, physics-inspired visualization of stellar evolution for educational and illustrative purposes.",
    technologies: ["JavaScript", "Physics Engine", "WebGL"],
    github: "https://github.com/rash200319/solar_system_project",
    demo: "https://solar-system-project-theta.vercel.app/",
    stars: 0,
    forks: 0,
  },
  {
    title: "Maternal Care AI Model - BioFusion Hackathon Winner - 2026",
    description:
      "Predicts complications during pregnancy using health metrics, medical history, and environmental factors.",
    technologies: ["Python", "Machine Learning", "TensorFlow"],
    github: "https://github.com/rash200319/two_stage_preeclampsia_AI_model.git",
    stars: 0,
    forks: 0,
  },
  {
    title: "AI Code Reviewer",
    description:
      "Automated code review tool using AI to analyze code quality, identify bugs, and suggest improvements.",
    technologies: ["Python", "AI/ML", "NLP"],
    github: "https://github.com/rash200319/AI_code_reviewer",
    stars: 0,
    forks: 0,
  },
  {
    title: "National Risk Intelligence Platform",
    description: "Platform for analyzing and visualizing national-level risk data and intelligence.",
    technologies: ["Python", "Data Analysis", "Visualization"],
    github: "https://github.com/rash200319/National-Risk-Intelligence-Platform",
    stars: 0,
    forks: 0,
  },
  {
    title: "Dementia Predictor AI Model",
    description: "Machine learning model for early detection and prediction of dementia using health indicators.",
    technologies: ["Python", "Machine Learning", "Healthcare AI"],
    github: "https://github.com/rash200319/Dementia-Predictor-AI-model",
    stars: 0,
    forks: 0,
  },
  {
    title: "Go Networking Deep Dive",
    description: "Learning Go by building networking tools from scratch, including a mini Redis implementation.",
    technologies: ["Go", "Networking", "Redis"],
    github: "https://github.com/rash200319/Go-Networking-DeepDive",
    stars: 0,
    forks: 0,
  },
  {
    title: "Heart Disease Predictor",
    description: "Machine learning model for predicting heart disease risk using patient health data and analysis.",
    technologies: ["Python", "Jupyter", "Scikit-learn"],
    github: "https://github.com/rash200319/heart-disease-predictor",
    stars: 0,
    forks: 0,
  },
]

// Articles data
const articles = [
  {
    title: "Building a 3D Solar System with Three.js",
    slug: "3d-solar-system",
    description:
      "A step-by-step guide to creating an interactive 3D solar system visualization using Three.js and WebGL. Learn about 3D graphics, animations, and the math behind planetary motion.",
    excerpt:
      "Learn how to create an interactive 3D model of our solar system with realistic orbits and planet textures using Three.js and WebGL...",
    date: "2026-01-14",
    readTime: "10 min read",
    category: "Web Development",
    tags: ["Three.js", "WebGL", "3D Graphics", "JavaScript"],
    featuredImage:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc3774?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    url: "articles/3d-solar-system.html",
  },
  {
    title: "Understanding Big O Notation: A Comprehensive Guide",
    slug: "big-o-notation",
    description:
      "A deep dive into time and space complexity analysis, with practical examples and visual explanations.",
    excerpt:
      "Master the fundamentals of algorithm analysis with this comprehensive guide to Big O notation, complete with real-world examples and visual aids...",
    date: "2026-01-10",
    readTime: "8 min read",
    category: "Algorithms",
    tags: ["Algorithms", "Data Structures", "Computer Science"],
    featuredImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    url: "articles/bigOnotation.html",
  },
{
  title: "Redis: Overview and Comparison with MongoDB",
  slug: "redis-vs-mongodb",
  description:
    "An in-depth overview of Redis, its core features, use cases, and how it compares with MongoDB in real-world systems.",
  excerpt:
    "Redis is an ultra-fast in-memory data store widely used for caching and real-time systems. This article explores how Redis works, where it shines, and why it complements MongoDB rather than replacing it...",
  date: "2025-12-20",
  readTime: "15 min read",
  category: "Databases",
  tags: ["Redis", "NoSQL", "Databases", "System Design"],
  featuredImage:
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  url: "articles/redisvsmongodb.html",
},

  {
    title: "Building Scalable REST APIs with Node.js",
    slug: "nodejs-rest-apis",
    description:
      "Best practices for designing and implementing RESTful APIs that can handle high traffic and scale effectively.",
    excerpt:
      "Learn how to build robust and scalable REST APIs using Node.js, Express, and modern JavaScript features...",
    date: "2026-01-05",
    readTime: "10 min read",
    category: "Backend",
    tags: ["Node.js", "Express", "REST API", "Backend"],
    featuredImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    url: "articles/restapi.html",
  },
  {
    title: "React Performance Optimization Techniques",
    slug: "react-performance",
    description: "Practical strategies to improve React application performance, from memoization to code splitting.",
    excerpt:
      "Discover advanced techniques to optimize your React applications for better performance and user experience...",
    date: "2025-12-28",
    readTime: "12 min read",
    category: "Frontend",
    tags: ["React", "Performance", "Frontend", "JavaScript"],
    featuredImage:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    url: "articles/react.html",
  },
  {
    title: "Introduction to Machine Learning with Python",
    slug: "machine-learning-python",
    description:
      "Getting started with ML basics, covering supervised learning, model training, and evaluation metrics.",
    excerpt: "Begin your machine learning journey with Python, scikit-learn, and hands-on examples...",
    date: "2025-12-20",
    readTime: "15 min read",
    category: "Machine Learning",
    tags: ["Machine Learning", "Python", "AI", "Data Science"],
    featuredImage:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    url: "articles/ml.html",
  },
  {
    title: "Database Design Principles: SQL vs NoSQL",
    slug: "sql-vs-nosql",
    description: "Comparing relational and non-relational databases, when to use each, and key design considerations.",
    excerpt:
      "Understand the differences between SQL and NoSQL databases and learn when to choose one over the other...",
    date: "2025-12-15",
    readTime: "9 min read",
    category: "Database",
    tags: ["SQL", "NoSQL", "Database Design", "Backend"],
    featuredImage:
      "https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    url: "articles/sqldiscuss.html",
  },
  {
    title: "Clean Code Practices Every Developer Should Know",
    slug: "clean-code-practices",
    description:
      "Essential coding principles and patterns that make your code more maintainable, readable, and professional.",
    excerpt: "Learn the fundamental principles of writing clean, maintainable code that stands the test of time...",
    date: "2025-12-10",
    readTime: "7 min read",
    category: "Best Practices",
    tags: ["Clean Code", "Best Practices", "Software Engineering"],
    featuredImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    url: "articles/cleancode.html",
  },
  {
    title: "Smart Clean Water Distribution Platform",
    slug: "Smart Clean Water Distribution Platform",
    description: "A conceptual IoT-based platform designed to address global water access challenges.",
    excerpt:
      "The system proposes using sensors, automated filtration, and data analytics to monitor and distribute clean water more efficiently in underserved areas.",
    date: "2026-01-16",
    readTime: "10 min read",
    category: "IoT-based water management",
    tags: ["IOT", "Water management", "Software Engineering"],
    featuredImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    url: "articles/article.html",
  },
    {
    title: "Version Control",
    slug: "Version Control Tools",
    description: "Version control is a system used to track and manage changes made to software code over time. It helps developers collaborate efficiently, maintain different versions of a project, and restore previous versions when needed.",
    excerpt:
      "",
    date: "2026-03-15",
    readTime: "5 min read",
    category: "Software Engineering",
    tags: ["version control", "Git", "Software Engineering"],
    featuredImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    url: "articles/version_control.html",
  },
]

// Render projects
function renderProjects() {
  const grid = document.getElementById("projectsGrid")
  grid.innerHTML = projects
    .map(
      (project) => `
    <div class="project-card">
      <div class="project-header">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
      </div>
      <div class="project-tags">
        ${project.technologies.map((tech) => `<span class="badge">${tech}</span>`).join("")}
      </div>
      <div class="project-stats">
        <div class="stat">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <span>${project.stars}</span>
        </div>
        <div class="stat">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="6" y1="3" x2="6" y2="15"></line>
            <circle cx="18" cy="6" r="3"></circle>
            <circle cx="6" cy="18" r="3"></circle>
            <path d="M18 9a9 9 0 0 1-9 9"></path>
          </svg>
          <span>${project.forks}</span>
        </div>
      </div>
      <div class="project-footer">
        <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
          Code
        </a>
        ${
          project.demo
            ? `
          <a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
            Demo
          </a>
        `
            : ""
        }
      </div>
    </div>
  `,
    )
    .join("")
}

// Render articles
function renderArticles() {
  const grid = document.getElementById("articlesGrid")
  grid.innerHTML = articles
    .map((article) => {
      const date = new Date(article.date)
      const formattedDate = date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })

      return `
      <div class="article-card">
        <div class="article-header">
          <span class="badge">${article.category}</span>
          <div class="article-meta">
            <div class="meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>${formattedDate}</span>
            </div>
            <div class="meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>${article.readTime}</span>
            </div>
          </div>
        </div>
        <a href="${article.url || "#"}" class="article-title-link">
          <h3 class="article-title">${article.title}</h3>
        </a>
        <p class="article-description">${article.description}</p>
      </div>
    `
    })
    .join("")
}

// Smooth scroll to section
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    const offset = 80
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    })
  }

  // Close mobile menu if open
  const navMenu = document.getElementById("navMenu")
  navMenu.classList.remove("active")
}

// Toggle mobile menu
function toggleMobileMenu() {
  const navMenu = document.getElementById("navMenu")
  navMenu.classList.toggle("active")
}

// Active nav link on scroll
function updateActiveNav() {
  const sections = ["hero", "about", "projects", "articles", "contact"]
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""
  sections.forEach((sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const rect = section.getBoundingClientRect()
      if (rect.top <= 100 && rect.bottom >= 100) {
        current = sectionId
      }
    }
  })

  navLinks.forEach((link, index) => {
    link.classList.remove("active")
    if (sections[index] === current) {
      link.classList.add("active")
    }
  })
}

// Contact form submission
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form")
  if (!contactForm) return

  // Form validation
  function validateForm(name, email, message) {
    if (!name || !email || !message) {
      showStatus("Please fill in all fields.", "error")
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      showStatus("Please enter a valid email address.", "error")
      return false
    }

    return true
  }

  // Show status message
  function showStatus(message, type = "success") {
    const status = document.getElementById("form-status")
    if (!status) return

    status.textContent = message
    status.style.color = type === "error" ? "#ef4444" : "#10b981"
    status.style.display = "block"

    // Auto-hide success messages after 5 seconds
    if (type === "success") {
      setTimeout(() => {
        status.style.display = "none"
      }, 5000)
    }
  }

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const form = e.target
    const formData = new FormData(form)
    const name = formData.get("name").trim()
    const email = formData.get("email").trim()
    const message = formData.get("message").trim()
    const submitBtn = document.getElementById("submit-btn")

    // Validate form
    if (!validateForm(name, email, message)) {
      return
    }

    // Disable submit button to prevent multiple submissions
    submitBtn.disabled = true
    submitBtn.textContent = "Sending..."

    try {
      const response = await fetch("https://formspree.io/f/xwvvpqbk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
        }),
      })

      if (response.ok) {
        // Show success message
        showStatus("Thank you for your message! I'll get back to you soon.", "success")

        // Reset form
        form.reset()
      } else {
        throw new Error("Form submission failed")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      showStatus(
        "Something went wrong. Please try again later or email me directly at pabodarashmi668@gmail.com",
        "error",
      )
    } finally {
      // Re-enable submit button
      submitBtn.disabled = false
      submitBtn.textContent = "Send Message"
    }
  })
})

// Set current year in footer
document.getElementById("currentYear").textContent = new Date().getFullYear()

// Secret Code Checker
function checkSecretCode() {
  const input = document.getElementById('secretCode');
  const message = document.getElementById('codeMessage');
  const code = input.value.trim();
  
  if (code === '034872') {
    message.textContent = '✅ Correct! Redirecting to hidden page...';
    message.style.color = '#4ade80';
    setTimeout(() => {
      window.location.href = 'page2.html';
    }, 1500);
  } else if (code.length === 6) {
    message.textContent = '❌ Incorrect code. Try again!';
    message.style.color = '#f87171';
    setTimeout(() => {
      message.textContent = '';
      input.value = '';
    }, 2000);
  } else {
    message.textContent = 'Please enter a 6-digit code';
    message.style.color = '#fbbf24';
  }
}

// Allow Enter key to submit code
document.addEventListener('DOMContentLoaded', function() {
  const secretInput = document.getElementById('secretCode');
  if (secretInput) {
    secretInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        checkSecretCode();
      }
    });
  }
});

// Initialize
window.addEventListener("scroll", updateActiveNav)
renderProjects()
renderArticles()
updateActiveNav()
