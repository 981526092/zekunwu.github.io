// Animation System

class AnimationManager {
  constructor() {
    this.observers = new Map();
    // Wait for Utils to be available
    if (typeof window.Utils !== 'undefined') {
      this.init();
    } else {
      // Fallback: wait a bit and try again
      setTimeout(() => this.init(), 100);
    }
  }

  init() {
    this.setupScrollAnimations();
    this.setupLoadingAnimation();
    this.setupParallaxEffect();
    this.setupCounterAnimations();
    this.setupClickRippleEffect();
    this.setupCustomCursor();
    this.setupCardTiltEffect();
    this.setupBackgroundSpotlight();
    this.setupPlexusBackground();
    this.setupHeroBackgroundExtras();
  }

  setupScrollAnimations() {
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

    this.observers.set('scroll', observer);

    document.addEventListener('DOMContentLoaded', () => {
      const animateElements = document.querySelectorAll(
        '.timeline-item, .education-item, .publication-item, .stat, .recent-blog-item'
      );
      
      animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
      });
    });
  }

  setupLoadingAnimation() {
    window.addEventListener('load', () => {
      document.body.classList.add('loaded');
    });
  }

  setupParallaxEffect() {
    const throttle = window.Utils ? window.Utils.throttle : this.fallbackThrottle;
    const parallaxHandler = throttle(() => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('.hero');
      if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    }, 16);

    window.addEventListener('scroll', parallaxHandler);
  }

  animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
      start += increment;
      if (start < target) {
        element.textContent = Math.floor(start) + '+';
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target + '+';
      }
    };
    
    updateCounter();
  }

  setupCounterAnimations() {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statNumber = entry.target.querySelector('h3');
          const targetValue = parseInt(statNumber.textContent);
          this.animateCounter(statNumber, targetValue);
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    this.observers.set('stats', statsObserver);

    document.addEventListener('DOMContentLoaded', () => {
      const stats = document.querySelectorAll('.stat');
      stats.forEach(stat => statsObserver.observe(stat));
    });
  }

  setupClickRippleEffect() {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      return; // Skip if reduced motion is preferred
    }

    const createRipple = (event) => {
      const element = event.currentTarget;

      // Check if the element is a string (from direct call) or an event target
      const targetElement = typeof element === 'string' ? document.querySelector(element) : element;

      if (!targetElement) return;

      const ripple = document.createElement('span');
      ripple.classList.add('ripple-effect');

      const rect = targetElement.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';

      // Adjusted to handle clicks on child elements correctly
      const x = event.clientX - rect.left - (size / 2);
      const y = event.clientY - rect.top - (size / 2);
      
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';

      targetElement.appendChild(ripple);

      ripple.addEventListener('animationend', () => {
        ripple.remove();
      });
    };

    // Debounce or throttle if attaching to many elements or if performance issues arise
    // For now, direct attachment.
    document.addEventListener('DOMContentLoaded', () => {
      const rippleTargets = document.querySelectorAll(
        '.btn, .card, .news-item, .publication-item, .education-item, .contact-item, .filter-btn, .tab-button, .nav-link' // Added .nav-link
      );
      rippleTargets.forEach(target => {
        target.addEventListener('click', createRipple);
      });
    });
  }

  setupCustomCursor() {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      return; // Skip if reduced motion is preferred
    }

    document.body.classList.add('custom-cursor-active');

    const cursorDot = document.createElement('div');
    cursorDot.id = 'custom-cursor-dot';
    document.body.appendChild(cursorDot);

    const cursorOutline = document.createElement('div');
    cursorOutline.id = 'custom-cursor-outline';
    // SVG for the reticle
    cursorOutline.innerHTML = `
      <svg width="100%" height="100%" viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet">
        <circle class="reticle-circle" cx="25" cy="25" r="20" fill="none" />
        <!-- Ticks -->
        <line class="reticle-tick" id="tick-n" x1="25" y1="5" x2="25" y2="10" /> <!-- North -->
        <line class="reticle-tick" id="tick-e" x1="45" y1="25" x2="40" y2="25" /> <!-- East -->
        <line class="reticle-tick" id="tick-s" x1="25" y1="45" x2="25" y2="40" /> <!-- South -->
        <line class="reticle-tick" id="tick-w" x1="5" y1="25" x2="10" y2="25" />  <!-- West -->
        <!-- Optional Sonar Ping element, initially hidden -->
        <circle class="reticle-ping" cx="25" cy="25" r="0" fill="none" />
        <circle class="reticle-ping-echo" cx="25" cy="25" r="0" fill="none" /> <!-- Echo Ping -->
      </svg>
    `;
    document.body.appendChild(cursorOutline);

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    const updateCursor = () => {
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';

      // Apply a slight delay/easing to the outline
      const dx = mouseX - outlineX;
      const dy = mouseY - outlineY;
      outlineX += dx * 0.2; // Adjust easing factor (0.1 to 0.5 is usually good)
      outlineY += dy * 0.2;

      cursorOutline.style.left = outlineX + 'px';
      cursorOutline.style.top = outlineY + 'px';

      requestAnimationFrame(updateCursor);
    };

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    requestAnimationFrame(updateCursor);

    const interactiveElements = document.querySelectorAll(
      'a, button, .btn, [role="button"], input[type="button"], input[type="submit"], .news-item, .publication-item, .education-item, .contact-item, .filter-btn, .tab-button, .nav-link'
    );
    const textInputElements = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], textarea');

    const reticlePingElement = cursorOutline.querySelector('.reticle-ping');
    const reticlePingEchoElement = cursorOutline.querySelector('.reticle-ping-echo');
    let pingTimeout, echoPingTimeout;

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorDot.classList.add('interactive');
        cursorOutline.classList.add('interactive');
        
        if (reticlePingElement) {
          reticlePingElement.classList.remove('pinging');
          void reticlePingElement.offsetWidth;
          reticlePingElement.classList.add('pinging');
          clearTimeout(pingTimeout);
          pingTimeout = setTimeout(() => {
            reticlePingElement.classList.remove('pinging');
          }, 700); // Main ping duration
        }

        if (reticlePingEchoElement) {
          reticlePingEchoElement.classList.remove('pinging');
          void reticlePingEchoElement.offsetWidth;
          reticlePingEchoElement.classList.add('pinging');
          clearTimeout(echoPingTimeout);
          // Echo animation is 0.8s + 0.1s delay = 0.9s total from hover start
          echoPingTimeout = setTimeout(() => {
            reticlePingEchoElement.classList.remove('pinging');
          }, 900); 
        }
      });
      el.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('interactive');
        cursorOutline.classList.remove('interactive');
      });
    });

    textInputElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorDot.classList.add('text-input');
        cursorOutline.classList.add('text-input');
      });
      el.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('text-input');
        cursorOutline.classList.remove('text-input');
      });
    });

     // Hide cursor when mouse leaves the window
     document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    });

  }

  setupCardTiltEffect() {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      return; // Skip if reduced motion is preferred
    }

    document.addEventListener('DOMContentLoaded', () => {
      const tiltElements = document.querySelectorAll(
        '.card, .news-item, .publication-item, .education-item, .contact-item' // Add other selectors if needed
      );

      tiltElements.forEach(element => {
        // Store original transform to combine with hover effect
        const originalTransform = getComputedStyle(element).transform;
        let baseTransform = originalTransform === 'none' ? '' : originalTransform;

        // If a hover effect already has a scale/translateY, try to preserve it.
        // This is a simplified approach. A more robust solution might involve
        // parsing the transform string or using separate elements for hover vs tilt.
        let baseScale = 1.00; // Default scale for cards
        let baseTranslateY = 0;
        // Check if .card:hover has specific transform values we want to maintain as a base
        // For simplicity, we'll assume the hover effect is translateY(-10px) scale(1.02) as per current CSS for .card:hover
        // This part is tricky because JS cannot easily get :hover styles directly before hover.
        // We will apply the tilt and let CSS handle the hover:transform separately if possible or combine them.
        // Let's assume the base hover effect (translateY(-10px) scale(1.02)) is a good default.

        element.addEventListener('mousemove', (e) => {
          const rect = element.getBoundingClientRect();
          const x = e.clientX - rect.left; // x position within the element.
          const y = e.clientY - rect.top;  // y position within the element.

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const deltaX = (x - centerX) / centerX; // -1 to 1
          const deltaY = (y - centerY) / centerY; // -1 to 1

          const maxRotation = 7; // Max rotation in degrees

          const rotateX = deltaY * -maxRotation; // Invert Y for natural feel
          const rotateY = deltaX * maxRotation;
          
          // Combine with base hover effect if element is hovered
          // For .card, hover is: transform: translateY(-10px) scale(1.02);
          // We need to apply this ONLY if the element would normally be hovered.
          // A simpler way is to apply tilt, and if CSS has a hover transform, it might conflict or combine.
          // The cleanest way is often to have the JS *only* control the tilt part.

          // Let current CSS hover handle its own transform, JS adds tilt.
          // The transition on .card should make this smooth.
          element.style.transform = `perspective(1000px) translateY(-5px) scale(1.01) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        element.addEventListener('mouseleave', () => {
          // Reset to its original computed style or a defined base hover if that was captured
          // For now, just remove the JS-applied transform, relying on CSS for base and hover states.
          element.style.transform = ''; // This will revert to CSS defined transforms (base or hover)
        });
      });
    });
  }

  setupBackgroundSpotlight() {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      return; // Skip if reduced motion is preferred
    }
    
    document.body.classList.add('spotlight-active');

    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;
    let rafId;

    const updateSpotlight = () => {
      document.documentElement.style.setProperty('--mouse-x', lastX + 'px');
      document.documentElement.style.setProperty('--mouse-y', lastY + 'px');
      rafId = null; // Allow next frame to be requested
    };

    document.addEventListener('mousemove', (e) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (!rafId) { // Only request a new frame if one isn't already pending
        rafId = requestAnimationFrame(updateSpotlight);
      }
    });

    // Initialize with center position
    if (!rafId) {
       rafId = requestAnimationFrame(updateSpotlight); 
    }
  }

  setupPlexusBackground() {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      console.log("Plexus animation skipped due to reduced motion preference.");
      return; 
    }

    document.addEventListener('DOMContentLoaded', () => {
      // Canvas element should have been added by hero.js by now
      const plexusCanvas = document.getElementById('hero-plexus-canvas');
      if (plexusCanvas && typeof PlexusAnimation !== 'undefined') {
        const plexus = new PlexusAnimation('hero-plexus-canvas');
        plexus.init();
        // Store instance if we need to control it later (e.g., stop on demand)
        // this.plexusInstance = plexus;
      } else if (typeof PlexusAnimation === 'undefined') {
        console.error("PlexusAnimation class is not defined. Ensure plexusAnimation.js is loaded.");
      } else if (!plexusCanvas) {
        console.error("Plexus canvas (#hero-plexus-canvas) not found for initialization.");
      }
    });
  }

  setupHeroBackgroundExtras() {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      return;
    }

    document.addEventListener('DOMContentLoaded', () => {
      const heroSection = document.getElementById('home');
      if (!heroSection) return;

      const shapesContainer = document.createElement('div');
      shapesContainer.className = 'hero-bg-shapes-container';
      
      const shapesData = [
        { type: 'circle', size: 200, initialX: '15%', initialY: '20%', id: 'bg-shape-1' },
        { type: 'soft-poly', size: 250, initialX: '80%', initialY: '30%', id: 'bg-shape-2' },
        { type: 'circle', size: 150, initialX: '60%', initialY: '75%', id: 'bg-shape-3' },
      ];

      shapesData.forEach(data => {
        const shape = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        shape.setAttribute('class', 'hero-bg-shape');
        shape.setAttribute('id', data.id);
        shape.style.width = data.size + 'px';
        shape.style.height = data.size + 'px';
        shape.style.left = data.initialX;
        shape.style.top = data.initialY;
        // Viewbox should be relative to size, e.g., "0 0 100 100" and use path coords in that range
        shape.setAttribute('viewBox', '0 0 100 100');
        shape.setAttribute('preserveAspectRatio', 'xMidYMid meet');

        let pathData = '';
        if (data.type === 'circle') {
          pathData = 'M 50,50 m -45,0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0'; // Circle path r=45 at center 50,50
        } else if (data.type === 'soft-poly') {
          // Simple rounded hexagon-like shape
          pathData = 'M 30 15 Q 15 15 15 30 L 15 70 Q 15 85 30 85 L 70 85 Q 85 85 85 70 L 85 30 Q 85 15 70 15 Z';
        }

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathData);
        shape.appendChild(path);
        shapesContainer.appendChild(shape);
      });
      heroSection.appendChild(shapesContainer);
    });
  }

  // Fallback throttle function
  fallbackThrottle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

const animationManager = new AnimationManager();
window.animationManager = animationManager; 