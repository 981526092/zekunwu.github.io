/**
 * Navigation Manager
 * Handles mobile menu, smooth scrolling, and active section highlighting
 */
class NavigationManager {
  constructor() {
    this.navbar = null;
    this.hamburger = null;
    this.navMenu = null;
    this.navLinks = [];
    this.sections = [];
    this.scrollProgress = null;
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.setupElements();
      this.setupEventListeners();
      this.createScrollProgress();
      this.updateActiveSection();
    });
  }

  setupElements() {
    this.navbar = document.querySelector('.navbar');
    this.hamburger = document.querySelector('.hamburger');
    this.navMenu = document.querySelector('.nav-menu');
    this.navLinks = document.querySelectorAll('.nav-menu a');
    this.sections = document.querySelectorAll('section[id]');
  }

  createScrollProgress() {
    if (!this.navbar) return;
    
    this.scrollProgress = document.createElement('div');
    this.scrollProgress.className = 'scroll-progress';
    this.navbar.appendChild(this.scrollProgress);
  }

  setupEventListeners() {
    // Mobile menu toggle
    if (this.hamburger) {
      this.hamburger.addEventListener('click', () => this.toggleMobileMenu());
    }

    // Smooth scrolling for navigation links
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => this.handleNavClick(e));
    });

    // Scroll events
    window.addEventListener('scroll', () => {
      this.updateScrollProgress();
      this.updateActiveSection();
      this.updateNavbarStyle();
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.navbar.contains(e.target)) {
        this.closeMobileMenu();
      }
    });
  }

  toggleMobileMenu() {
    if (!this.hamburger || !this.navMenu) return;
    
    this.hamburger.classList.toggle('active');
    this.navMenu.classList.toggle('active');
  }

  closeMobileMenu() {
    if (!this.hamburger || !this.navMenu) return;
    
    this.hamburger.classList.remove('active');
    this.navMenu.classList.remove('active');
  }

  handleNavClick(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 70; // Account for navbar height
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    
    this.closeMobileMenu();
  }

  updateScrollProgress() {
    if (!this.scrollProgress) return;
    
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    this.scrollProgress.style.width = `${Math.min(scrollPercent, 100)}%`;
  }

  updateActiveSection() {
    const scrollPos = window.scrollY + 100; // Offset for navbar
    
    this.sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        this.setActiveLink(sectionId);
      }
    });
  }

  setActiveLink(activeId) {
    this.navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${activeId}`) {
        link.classList.add('active');
      }
    });
  }

  updateNavbarStyle() {
    if (!this.navbar) return;
    
    if (window.scrollY > 50) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }
  }
}

// Initialize and export globally
const navigationManager = new NavigationManager();
window.navigationManager = navigationManager;

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NavigationManager;
} 