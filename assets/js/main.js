// Particles.js Configuration
particlesJS('particles-js', {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: '#00ff9d'
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#00ff9d'
      }
    },
    opacity: {
      value: 0.5,
      random: true,
      animation: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      animation: {
        enable: true,
        speed: 2,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#00ff9d',
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: true,
      attract: {
        enable: true,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'repulse'
      },
      onclick: {
        enable: true,
        mode: 'push'
      },
      resize: true
    },
    modes: {
      repulse: {
        distance: 100,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: true
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[data-scroll]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll <= 0) {
    header.classList.remove('scroll-up');
    return;
  }
  
  if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
    // Scroll Down
    header.classList.remove('scroll-up');
    header.classList.add('scroll-down');
  } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
    // Scroll Up
    header.classList.remove('scroll-down');
    header.classList.add('scroll-up');
  }
  lastScroll = currentScroll;
});

// Footer visibility
const footer = document.querySelector('.footer');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const currentScrollTop = window.pageYOffset;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  
  // Show footer when near bottom
  if (currentScrollTop + windowHeight > documentHeight - 100) {
    footer.classList.remove('hide');
  } else {
    footer.classList.add('hide');
  }
  
  lastScrollTop = currentScrollTop;
});

// Intersection Observer for fade-in effects
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe sections for fade-in effect
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(section);
});

// Fix mobile menu
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const headerLinks = document.querySelector('.header-links');

if (mobileMenuButton) {
  mobileMenuButton.addEventListener('click', () => {
    headerLinks.classList.toggle('active');
  });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!headerLinks.contains(e.target) && !mobileMenuButton.contains(e.target)) {
    headerLinks.classList.remove('active');
  }
});

// Fix project cards hover effect
document.querySelectorAll('.contents').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-5px)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
  });
});

// Fix image loading
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('load', () => {
    img.style.opacity = '1';
  });
  
  img.addEventListener('error', () => {
    img.src = 'assets/img/placeholder.jpg';
  });
});

// Fix smooth scroll behavior
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

// Scroll animations with parallax effect
const sections = document.querySelectorAll('section');
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

sections.forEach(section => {
  observer.observe(section);
});

// Parallax effect on scroll
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.parallax');
  parallaxElements.forEach(element => {
    const speed = element.dataset.speed || 0.5;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Enhanced hover effects for social icons
document.querySelectorAll('.header-icons a').forEach(icon => {
  icon.addEventListener('mouseover', function() {
    this.style.transform = 'translateY(-5px) scale(1.1) rotateY(180deg)';
    this.style.textShadow = '0 0 10px #00ff9d';
  });
  
  icon.addEventListener('mouseout', function() {
    this.style.transform = 'translateY(0) scale(1) rotateY(0)';
    this.style.textShadow = 'none';
  });
});

// 3D tilt effect for cards
document.querySelectorAll('.contents').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  });
});

// Typing effect with cursor
const siteTitle = document.querySelector('.site-title');
const text = siteTitle.textContent;
siteTitle.textContent = '';
let i = 0;
let cursor = true;

function typeWriter() {
  if (i < text.length) {
    siteTitle.textContent += text.charAt(i);
    i++;
    setTimeout(typeWriter, 100);
  } else {
    setInterval(() => {
      siteTitle.textContent = text + (cursor ? '|' : '');
      cursor = !cursor;
    }, 500);
  }
}

// Start typing effect when page loads
window.addEventListener('load', typeWriter);

// Add parallax class to elements
document.querySelectorAll('section').forEach(section => {
  section.classList.add('parallax');
  section.dataset.speed = '0.5';
});

// Add mouse trail effect
const trail = document.createElement('div');
trail.className = 'mouse-trail';
document.body.appendChild(trail);

document.addEventListener('mousemove', (e) => {
  trail.style.left = e.pageX + 'px';
  trail.style.top = e.pageY + 'px';
});

// Handle subscription form
document.getElementById('subscribeForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  
  // Here you would typically send this data to your backend
  // For now, we'll just show a success message
  alert(`Thank you for subscribing, ${name}! We'll keep you updated at ${email}`);
  
  // Clear the form
  this.reset();
});

// Copy UPI ID function
function copyUPI() {
  const upiId = 'prithvishxshukla@oksbi';
  navigator.clipboard.writeText(upiId).then(() => {
    const message = document.querySelector('.upi-copy-message');
    message.textContent = 'UPI ID copied!';
    message.style.color = '#4682B4';
    setTimeout(() => {
      message.textContent = 'Click to copy UPI ID';
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy UPI ID:', err);
  });
}