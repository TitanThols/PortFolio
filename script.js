// DOM Elements
const menu = document.querySelector("#menu");
const nav = document.querySelector(".links");  
const form = document.querySelector("#contactForm");
const navbar = document.querySelector("#nav");

// Mobile menu toggle
menu.addEventListener('click', () => {
  menu.classList.toggle("bx-x");
  nav.classList.toggle("active");
});

// Close mobile menu when clicking on links
const navLinks = document.querySelectorAll('.links a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove("bx-x");
    nav.classList.remove("active");
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !menu.contains(e.target)) {
    menu.classList.remove("bx-x");
    nav.classList.remove("active");
  }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(15,15,15,0.95)';
  } else {
    navbar.style.background = 'rgba(15,15,15,0.8)';
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Form submission with better UX
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(form);
  const data = {
    name: formData.get('fullName'),
    email: formData.get('email'),
    message: formData.get('message')
  };
  
  // Disable submit button and show loading
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  
  try {
    // Simulate form submission (replace with your actual endpoint)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Success feedback
    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    form.reset();
    
  } catch (error) {
    // Error feedback
    showNotification('Oops! Something went wrong. Please try again.', 'error');
    console.error('Form submission error:', error);
    
  } finally {
    // Reset button
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
});

// Notification system
function showNotification(message, type = 'success') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notif => notif.remove());
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class='bx ${type === 'success' ? 'bx-check-circle' : 'bx-error-circle'}'></i>
      <span>${message}</span>
      <i class='bx bx-x notification-close'></i>
    </div>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === 'success' ? '#4CAF50' : '#f44336'};
    color: white;
    padding: 1em 1.5em;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    z-index: 10000;
    animation: slideIn 0.3s ease;
    max-width: 300px;
  `;
  
  // Add animation keyframes if not already present
  if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
      .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5em;
      }
      .notification-close {
        margin-left: auto;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.2s;
      }
      .notification-close:hover {
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(notification);
  
  // Close button functionality
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  });
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Apply animation to sections
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('#about, #experience, #contact');
  
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
  });
  
  // Animate skill items
  const skills = document.querySelectorAll('.skill');
  skills.forEach((skill, index) => {
    skill.style.opacity = '0';
    skill.style.transform = 'translateX(-20px)';
    skill.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    observer.observe(skill);
  });
  
  // Animate club cards
  const clubCards = document.querySelectorAll('.club-card');
  clubCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
    observer.observe(card);
  });
});

// Typing animation for home section
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
  const homeTexts = document.querySelectorAll('#home .info-box h1 span');
  if (homeTexts.length > 0) {
    setTimeout(() => typeWriter(homeTexts[0], "Hi, I'm Tholkappian"), 500);
    setTimeout(() => typeWriter(homeTexts[1], "B.Tech Student"), 2000);
    setTimeout(() => typeWriter(homeTexts[2], "IIIT SriCity"), 3500);
  }
});

// Add loading animation
document.addEventListener('DOMContentLoaded', () => {
  // Remove loading screen if exists
  const loader = document.querySelector('.loader');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 500);
    }, 1000);
  }
});

// Add scroll to top button
function addScrollToTop() {
  const scrollBtn = document.createElement('button');
  scrollBtn.innerHTML = '<i class="bx bx-up-arrow-alt"></i>';
  scrollBtn.className = 'scroll-to-top';
  scrollBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #DFBD69, #926F34);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.5em;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  `;
  
  document.body.appendChild(scrollBtn);
  
  // Show/hide based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.style.opacity = '1';
      scrollBtn.style.visibility = 'visible';
    } else {
      scrollBtn.style.opacity = '0';
      scrollBtn.style.visibility = 'hidden';
    }
  });
  
  // Scroll to top functionality
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Hover effect
  scrollBtn.addEventListener('mouseenter', () => {
    scrollBtn.style.transform = 'scale(1.1)';
  });
  
  scrollBtn.addEventListener('mouseleave', () => {
    scrollBtn.style.transform = 'scale(1)';
  });
}

// Initialize scroll to top button
addScrollToTop();

// Form validation with real-time feedback
function addFormValidation() {
  const inputs = form.querySelectorAll('input, textarea');
  
  inputs.forEach(input => {
    // Real-time validation
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearError);
  });
  
  function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing error
    clearError(e);
    
    let isValid = true;
    let errorMessage = '';
    
    // Validation rules
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    } else if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    } else if (field.name === 'fullName' && value && value.length < 2) {
      isValid = false;
      errorMessage = 'Name must be at least 2 characters long';
    } else if (field.name === 'message' && value && value.length < 10) {
      isValid = false;
      errorMessage = 'Message must be at least 10 characters long';
    }
    
    if (!isValid) {
      showFieldError(field, errorMessage);
    }
    
    return isValid;
  }
  
  function clearError(e) {
    const field = e.target;
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
      errorElement.remove();
    }
    field.style.borderColor = 'rgba(255,255,255,0.1)';
  }
  
  function showFieldError(field, message) {
    const errorElement = document.createElement('span');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
      color: #f44336;
      font-size: 0.9em;
      margin-top: 0.5em;
      display: block;
    `;
    
    field.style.borderColor = '#f44336';
    field.parentNode.appendChild(errorElement);
  }
}

// Initialize form validation
addFormValidation();

// Performance optimization: Lazy load images
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();