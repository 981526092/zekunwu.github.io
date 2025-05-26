// Main Application Entry Point

class App {
  constructor() {
    this.version = '1.0.0';
    this.modules = {};
    this.init();
  }

  init() {
    console.log(`🚀 Zekun Wu Portfolio v${this.version} initialized`);
    
    // Register modules
    this.registerModules();
    
    // Setup global event listeners
    this.setupGlobalEvents();
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
    } else {
      this.onDOMReady();
    }
  }

  registerModules() {
    // Register all available modules
    this.modules = {
      utils: window.Utils,
      navigation: window.navigationManager,
      animation: window.animationManager,
      hero: window.heroManager,
      blog: window.blogManager,
      about: window.aboutManager,
      experience: window.experienceManager,
      education: window.educationManager,
      publications: window.publicationsManager,
      contact: window.contactManager
    };
  }

  onDOMReady() {
    console.log('📄 DOM ready - initializing components');
    
    // Add any additional initialization here
    this.setupKeyboardNavigation();
    this.setupAccessibility();
  }

  setupGlobalEvents() {
    // Global error handling
    window.addEventListener('error', (e) => {
      console.error('Global error:', e.error);
    });

    // Performance monitoring
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      console.log(`⚡ Page loaded in ${Math.round(loadTime)}ms`);
    });
  }

  setupKeyboardNavigation() {
    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
      // ESC key to close mobile menu
      if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        if (hamburger && navMenu) {
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
        }
      }
    });
  }

  setupAccessibility() {
    // Add focus indicators for keyboard navigation
    const accessibilityStyle = document.createElement('style');
    accessibilityStyle.textContent = `
      .nav-link:focus,
      .btn:focus,
      .tab-button:focus {
        outline: 2px solid #667eea;
        outline-offset: 2px;
      }
      
      @media (prefers-reduced-motion: reduce) {
        * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `;
    document.head.appendChild(accessibilityStyle);
  }

  // Public API methods
  getModule(name) {
    return this.modules[name];
  }

  addModule(name, module) {
    this.modules[name] = module;
  }
}

// Initialize the application
const app = new App();

// Export for global access
window.app = app; 