const typedEl = document.getElementById("typedText");
const rolePhrases = [
  "Data Analytics",
  "MERN Stack",
  "Data Science",
  "Real-world Applications"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typingEffect() {
  if (!typedEl) return;

  const currentPhrase = rolePhrases[phraseIndex];

  if (isDeleting) {
    charIndex -= 1;
  } else {
    charIndex += 1;
  }

  typedEl.textContent = currentPhrase.slice(0, charIndex);

  let speed = isDeleting ? 45 : 95;

  if (!isDeleting && charIndex === currentPhrase.length) {
    speed = 1400;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % rolePhrases.length;
    speed = 350;
  }

  setTimeout(typingEffect, speed);
}

typingEffect();

const header = document.getElementById("header");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
  });
});

const sections = [...document.querySelectorAll("main section")];

function updateActiveNav() {
  const trigger = window.scrollY + 170;
  sections.forEach((section) => {
    const start = section.offsetTop;
    const end = start + section.offsetHeight;
    const id = section.getAttribute("id");
    const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

    if (trigger >= start && trigger < end) {
      navLinks.forEach((item) => item.classList.remove("active"));
      if (navLink) {
        navLink.classList.add("active");
      }
    }
  });
}

const progressBar = document.getElementById("scrollProgress");

function updateScrollEffects() {
  const scrollTop = window.scrollY;
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;

  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }

  if (header) {
    header.classList.toggle("scrolled", scrollTop > 24);
  }
  updateActiveNav();
}

window.addEventListener("scroll", updateScrollEffects);
window.addEventListener("load", updateScrollEffects);

const revealEls = document.querySelectorAll(".reveal");
const skillCards = document.querySelectorAll(".skill-card");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("in-view");

      if (entry.target.classList.contains("skill-card")) {
        const fill = entry.target.querySelector(".progress-fill");
        const level = entry.target.getAttribute("data-level") || "0";
        if (fill) {
          fill.style.width = `${level}%`;
        }
      }

      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => observer.observe(el));
skillCards.forEach((card) => observer.observe(card));

const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

function updateThemeIcon(theme) {
  if (!themeToggle) return;
  const icon = themeToggle.querySelector("i");
  if (!icon) return;
  icon.className = theme === "dark" ? "bx bx-moon" : "bx bx-sun";
}

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light" || savedTheme === "dark") {
  root.setAttribute("data-theme", savedTheme);
}
updateThemeIcon(root.getAttribute("data-theme"));

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    const nextTheme = current === "dark" ? "light" : "dark";

    root.setAttribute("data-theme", nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme);
    updateThemeIcon(nextTheme);
  });
}

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    projectCards.forEach((card) => {
      const category = card.getAttribute("data-category");
      const show = filter === "all" || filter === category;
      card.style.display = show ? "block" : "none";
    });
  });
});

const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}
