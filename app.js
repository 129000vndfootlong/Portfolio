const projects = [
  {
    title: "SupportSense",
    category: "ml",
    tag: "Machine Learning",
    summary: "Customer support ticket prioritizer trained on ~618k labeled reviews.",
    detail: "Group project (Group 7): a Flask web app that scores and prioritizes incoming support tickets. Compares three models — a custom Logistic Regression with Adam optimizer, a custom Multinomial Naive Bayes, and scikit-learn's LinearSVC — trained on combined Amazon/IMDB review data using TF-IDF. The app supports CSV upload, confidence scores, donut charts, and keyword highlighting.",
    stack: "Python · scikit-learn · Flask · TF-IDF"
  },
  {
    title: "Full Stack Capstone",
    category: "web",
    tag: "Web · In progress",
    summary: "Django REST backend paired with a React frontend and MongoDB.",
    detail: "Ongoing capstone project combining a Django backend with a React frontend and MongoDB for storage. Current focus is on building out the backend API endpoints that the frontend consumes.",
    stack: "Django · React · MongoDB"
  },
  {
    title: "Bookshop API",
    category: "web",
    tag: "Web · Backend",
    summary: "Node.js/Express book review API with JWT authentication.",
    detail: "IBM Full Stack Developer capstone: a Node.js and Express backend for a book review service, with JWT-based authentication for registered users. Debugged automated grader feedback and pushed the corrected implementation to GitHub.",
    stack: "Node.js · Express · JWT"
  },
  {
    title: "Sepsis Risk Model",
    category: "ml",
    tag: "AI in Healthcare",
    summary: "Tree-Augmented Naive Bayes network for sepsis mortality prediction.",
    detail: "AIH301m assignment: a Tree-Augmented Naive Bayesian Network (TAN) pipeline built with pgmpy to predict sepsis mortality risk from synthetic EHR data, delivered with a Vietnamese-language supporting document.",
    stack: "Python · pgmpy · Bayesian networks"
  },
  {
    title: "Diabetes Risk Predictor",
    category: "ml",
    tag: "AI in Healthcare",
    summary: "Logistic Regression and Random Forest models on CDC health data.",
    detail: "AIH301m ML pipeline assignment using the CDC Health Indicators (diabetes) dataset, comparing Logistic Regression and Random Forest classifiers. Delivered as a Vietnamese-language Word report alongside exported .pkl model files.",
    stack: "Python · scikit-learn · pandas"
  },
  {
    title: "Cloud Deployment Labs",
    category: "cloud",
    tag: "Cloud & DevOps",
    summary: "Container orchestration practice on Docker, Kubernetes, and IBM Cloud.",
    detail: "A series of hands-on labs covering the IBM Container Registry, horizontal pod autoscaling (HPA), a guestbook deployment, and rollout history management — working through real IBM Cloud Shell environment issues along the way.",
    stack: "Docker · Kubernetes · IBM Cloud"
  }
];

const listEl = document.getElementById("projectList");
const filterRow = document.getElementById("filterRow");

function renderProjects(filter) {
  listEl.innerHTML = "";
  const items = filter === "all" ? projects : projects.filter(p => p.category === filter);

  items.forEach(p => {
    const row = document.createElement("div");
    row.className = "project-row";
    row.innerHTML = `
      <div class="project-head">
        <span class="project-title">${p.title}</span>
        <span class="project-tags">${p.tag}</span>
      </div>
      <p class="project-summary">${p.summary}</p>
      <div class="project-detail">
        <div class="project-detail-inner">
          ${p.detail}
          <span class="stack">${p.stack}</span>
        </div>
      </div>
    `;
    row.addEventListener("click", () => row.classList.toggle("open"));
    listEl.appendChild(row);
  });
}

filterRow.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;
  filterRow.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderProjects(btn.dataset.filter);
});

renderProjects("all");

// Mobile nav toggle
const sidebar = document.getElementById("sidebar");
const navToggle = document.getElementById("navToggle");
navToggle.addEventListener("click", () => {
  const isOpen = sidebar.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen);
});
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => sidebar.classList.remove("open"));
});

// Active nav link on scroll
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove("active"));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add("active");
    }
  });
}, { rootMargin: "-40% 0px -50% 0px" });
sections.forEach(s => observer.observe(s));
