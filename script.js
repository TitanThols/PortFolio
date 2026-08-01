// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Navbar logic
const menu = document.querySelector("#menu");
const nav = document.querySelector(".links");  
const form = document.querySelector("#contactForm");
const navbar = document.querySelector("#nav");

menu.addEventListener('click', () => {
  menu.classList.toggle("bx-x");
  nav.classList.toggle("active");
});

const navLinks = document.querySelectorAll('.links a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove("bx-x");
    nav.classList.remove("active");
  });
});

document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !menu.contains(e.target)) {
    menu.classList.remove("bx-x");
    nav.classList.remove("active");
  }
});

// Scroll effect for navbar
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navHeight = navbar.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Form submission handler
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  
  submitBtn.innerHTML = 'Sending... <i class="bx bx-loader-alt bx-spin"></i>';
  submitBtn.disabled = true;
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
    alert('Message sent successfully!');
    form.reset();
  } catch (error) {
    alert('Something went wrong. Please try again.');
  } finally {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
});


// EXTRA ANIMATIONS INITIALIZATION

// 1. Typed.js
var typed = new Typed('.typing', {
  strings: ['B.Tech CSE Student', 'Full-Stack Developer', 'Tech Enthusiast'],
  typeSpeed: 50,
  backSpeed: 30,
  backDelay: 2000,
  loop: true
});

// 2. VanillaTilt
VanillaTilt.init(document.querySelectorAll(".glass-card"), {
  max: 5,
  speed: 400,
  glare: true,
  "max-glare": 0.1,
});

// 3. Particles.js Configuration
particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 80,
      "density": { "enable": true, "value_area": 800 }
    },
    "color": { "value": ["#00f0ff", "#7000ff", "#ffffff"] },
    "shape": { "type": "circle" },
    "opacity": {
      "value": 0.5,
      "random": true,
      "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": { "enable": true, "speed": 2, "size_min": 0.1, "sync": false }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.2,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 1,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": { "enable": true, "mode": "grab" },
      "onclick": { "enable": true, "mode": "push" },
      "resize": true
    },
    "modes": {
      "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } },
      "push": { "particles_nb": 4 }
    }
  },
  "retina_detect": true
});

// GSAP ANIMATIONS

// 1. Initial Load Animations (Hero Section)
const tl = gsap.timeline();

tl.from("#nav", {
  y: -100,
  opacity: 0,
  duration: 0.8,
  ease: "power3.out"
})
.from(".hero-title span", {
  y: 50,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: "power3.out"
}, "-=0.4")
.from(".hero-subtitle, .hero-tagline", {
  y: 30,
  opacity: 0,
  duration: 0.6,
  stagger: 0.2,
  ease: "power3.out"
}, "-=0.4")
.from(".home-link-btn", {
  y: 20,
  opacity: 0,
  duration: 0.5,
  stagger: 0.1,
  ease: "power2.out"
}, "-=0.2")
.from(".btn-box .btn", {
  y: 20,
  opacity: 0,
  duration: 0.5,
  stagger: 0.1,
  ease: "power2.out"
}, "-=0.3")
.from(".home-img-wrapper", {
  scale: 0.8,
  opacity: 0,
  duration: 1,
  ease: "back.out(1.7)"
}, "-=1");


// 2. Scroll Animations for Sections

// Section Titles
gsap.utils.toArray(".section-title").forEach(title => {
  gsap.from(title, {
    scrollTrigger: {
      trigger: title,
      start: "top 85%",
      toggleActions: "play none none reverse"
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  });
});

// About Section Text & Image
gsap.from(".about-img-wrapper", {
  scrollTrigger: {
    trigger: "#about",
    start: "top 75%",
    toggleActions: "play none none reverse"
  },
  x: -100,
  opacity: 0,
  duration: 1,
  ease: "power3.out"
});

gsap.from(".about-desc", {
  scrollTrigger: {
    trigger: "#about",
    start: "top 75%",
    toggleActions: "play none none reverse"
  },
  x: 100,
  opacity: 0,
  duration: 1,
  ease: "power3.out"
});

// Skills Tags
gsap.from(".skill-group", {
  scrollTrigger: {
    trigger: ".skills-grid",
    start: "top 85%",
    toggleActions: "play none none reverse"
  },
  y: 30,
  opacity: 0,
  duration: 0.6,
  stagger: 0.2,
  ease: "power2.out"
});

// Education Cards
gsap.from(".edu-card", {
  scrollTrigger: {
    trigger: ".edu-grid",
    start: "top 80%",
    toggleActions: "play none none reverse"
  },
  y: 50,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: "back.out(1.5)"
});

// Experience Timeline Items
gsap.from(".timeline-item", {
  scrollTrigger: {
    trigger: ".timeline",
    start: "top 80%",
    toggleActions: "play none none reverse"
  },
  x: -50,
  opacity: 0,
  duration: 0.8,
  stagger: 0.3,
  ease: "power3.out"
});

// Project Cards
gsap.from(".project-card", {
  scrollTrigger: {
    trigger: ".projects-grid",
    start: "top 80%",
    toggleActions: "play none none reverse"
  },
  y: 50,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: "power3.out"
});

// Contact Form
gsap.from(".contact-container", {
  scrollTrigger: {
    trigger: "#contact",
    start: "top 80%",
    toggleActions: "play none none reverse"
  },
  scale: 0.9,
  opacity: 0,
  duration: 0.8,
  ease: "power3.out"
});
