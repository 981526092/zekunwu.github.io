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