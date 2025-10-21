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

window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 100 ? 'rgba(15,15,15,0.95)' : 'rgba(15,15,15,0.8)';
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Message sent successfully!');
    form.reset();
  } catch (error) {
    alert('Something went wrong. Please try again.');
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('#about, #experience, #contact');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
  });
});

const scrollBtn = document.createElement('button');
scrollBtn.innerHTML = '<i class="bx bx-up-arrow-alt"></i>';
scrollBtn.style.cssText = 'position:fixed;bottom:30px;right:30px;width:50px;height:50px;background:linear-gradient(135deg,#DFBD69,#926F34);color:white;border:none;border-radius:50%;font-size:1.5em;cursor:pointer;opacity:0;visibility:hidden;transition:all 0.3s;z-index:1000;box-shadow:0 4px 15px rgba(0,0,0,0.3)';
document.body.appendChild(scrollBtn);

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn.style.opacity = '1';
    scrollBtn.style.visibility = 'visible';
  } else {
    scrollBtn.style.opacity = '0';
    scrollBtn.style.visibility = 'hidden';
  }
});

scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
