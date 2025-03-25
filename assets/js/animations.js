// Initialize Particles.js with optimized settings
particlesJS('particles-js', {
  particles: {
    number: {
      value: 50, // Reduced for better performance
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: '#ffffff'
    },
    shape: {
      type: 'circle'
    },
    opacity: {
      value: 0.5,
      random: false,
      animation: {
        enable: true,
        speed: 0.5, // Reduced for smoother animation
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 2,
      random: true
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#ffffff',
      opacity: 0.2, // Reduced for better visibility
      width: 1
    },
    move: {
      enable: true,
      speed: 1, // Reduced for smoother movement
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false
    }
  },
  interactivity: {
    detect_on: 'window', // Changed to window for better mobile support
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
    }
  },
  retina_detect: true
});

// Initialize GSAP ScrollTrigger with error handling
try {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  
  // Animate sections on scroll with debouncing
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.classList.add('section-reveal');
    
    ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => requestAnimationFrame(() => section.classList.add('active')),
      onLeave: () => section.classList.remove('active'),
      onEnterBack: () => requestAnimationFrame(() => section.classList.add('active')),
      onLeaveBack: () => section.classList.remove('active')
    });
  });
} catch (error) {
  console.warn('GSAP animation error:', error);
}

// Add floating animation to profile image if it exists
const profileImage = document.querySelector('.user-details img');
if (profileImage) {
  profileImage.classList.add('floating-element', 'gpu-accelerated');
}

// Optimize Anime.js animations with error handling
try {
  // Skill items animation with intersection observer
  const skillItems = document.querySelectorAll('.skill-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        anime({
          targets: entry.target,
          scale: [0, 1],
          opacity: [0, 1],
          duration: 800,
          easing: 'easeOutElastic(1, .5)',
          loop: false
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  skillItems.forEach(item => observer.observe(item));
  
  // Social grid animation
  anime({
    targets: '.social-grid a',
    translateY: [-30, 0],
    opacity: [0, 1],
    delay: anime.stagger(50),
    duration: 600,
    easing: 'easeOutCubic',
    loop: false
  });
} catch (error) {
  console.warn('Anime.js animation error:', error);
}

// Optimized 3D title rotation with throttling
const title = document.querySelector('.title-wrapper');
if (title) {
  let ticking = false;
  let lastKnownX = 0;
  let lastKnownY = 0;
  
  const updateTitleRotation = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const rotationY = ((lastKnownX - centerX) / centerX) * 10; // Reduced rotation
        const rotationX = ((lastKnownY - centerY) / centerY) * 10;
        
        title.style.transform = `perspective(1000px) rotateX(${-rotationX}deg) rotateY(${rotationY}deg) translateZ(0)`;
        ticking = false;
      });
      ticking = true;
    }
  };
  
  document.addEventListener('mousemove', (e) => {
    lastKnownX = e.clientX;
    lastKnownY = e.clientY;
    updateTitleRotation();
  }, { passive: true });
}

// Optimized ripple effect with cleanup
const addRippleEffect = (element) => {
  element.addEventListener('click', function(e) {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
    `;
    
    this.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  }, { passive: true });
};

document.querySelectorAll('.project-link, .resume-btn').forEach(addRippleEffect);

// Smooth scroll with error handling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      try {
        gsap.to(window, {
          duration: 0.8,
          scrollTo: {
            y: target,
            offsetY: 50,
            autoKill: true
          },
          ease: 'power2.out'
        });
      } catch (error) {
        // Fallback smooth scroll
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
}); 