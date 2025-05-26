/**
 * About Section Manager
 * Handles photo gallery navigation and about section functionality
 */
class AboutManager {
  constructor() {
    this.currentPhotoIndex = 0;
    this.data = {
      text: [
        "Hi there! 👋 I'm **Zekun**, and I work as an **AI Research Scientist at Holistic AI** where I spend my days making sure AI systems behave themselves - think of me as an AI babysitter! 🤖 I also work with **OECD.AI** on policy research, contribute to the **EU AI Code of Practice**, teach at **UCL**, and work freelance with **SeeTalent** developing personality analysis tools.",
        "Education-wise, I'm a proud **UCL Computer Science** graduate with both my **undergraduate and master's degrees** under my belt. Currently, I'm pursuing my **PhD part-time** at the same department, diving deep into **responsible Agentic AI systems** - because someone needs to make sure these AI agents play nice! It's the perpetual student life, but honestly, who doesn't love discovering new things? 🎓",
        "When I'm not buried in research, I run an **online art studio** where I collect and resell **jewelry, artwork, shoes, and designer goods**. Turns out creativity and technology make perfect dance partners! 🎨✨"
      ],
      photos: [
        { src: "images/1.jpg", alt: "Zekun Wu - Professional Photo 1" },
        { src: "images/2.jpg", alt: "Zekun Wu - Professional Photo 2" },
        { src: "images/3.jpg", alt: "Zekun Wu - Professional Photo 3" },
        { src: "images/4.jpg", alt: "Zekun Wu - Professional Photo 4" }
      ]
    };
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.render();
      this.setupPhotoNavigation();
      this.setupAutoSlide();
    });
  }

  render() {
    const container = document.querySelector('#about .about-content');
    if (!container) return;

    container.innerHTML = `
      <div class="about-text">
        ${this.data.text.map(paragraph => `<p>${this.formatText(paragraph)}</p>`).join('')}
      </div>
      <div class="photo-gallery">
        <div class="photo-container">
          <div class="photo-wrapper">
            ${this.data.photos.map((photo, index) => `
              <img src="${photo.src}" alt="${photo.alt}" class="gallery-photo ${index === 0 ? 'active' : ''}" data-index="${index}">
            `).join('')}
          </div>
          <div class="photo-navigation">
            <button class="nav-btn prev-btn" aria-label="Previous photo">
              <i class="fas fa-chevron-left"></i>
            </button>
            <button class="nav-btn next-btn" aria-label="Next photo">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
          <div class="photo-indicators">
            ${this.data.photos.map((_, index) => `
              <button class="indicator ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="Go to photo ${index + 1}"></button>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  formatText(text) {
    // Convert **text** to <strong>text</strong>
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  }

  setupPhotoNavigation() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.previousPhoto());
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.nextPhoto());
    }

    indicators.forEach(indicator => {
      indicator.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index);
        this.goToPhoto(index);
      });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (this.isInViewport(document.querySelector('.photo-gallery'))) {
        if (e.key === 'ArrowLeft') {
          this.previousPhoto();
        } else if (e.key === 'ArrowRight') {
          this.nextPhoto();
        }
      }
    });

    // Touch/swipe support
    this.setupTouchNavigation();
  }

  setupTouchNavigation() {
    const photoWrapper = document.querySelector('.photo-wrapper');
    if (!photoWrapper) return;

    let startX = 0;
    let endX = 0;

    photoWrapper.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    photoWrapper.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      this.handleSwipe();
    });

    photoWrapper.addEventListener('mousedown', (e) => {
      startX = e.clientX;
      photoWrapper.addEventListener('mouseup', this.handleMouseUp);
    });
  }

  handleMouseUp = (e) => {
    const photoWrapper = document.querySelector('.photo-wrapper');
    endX = e.clientX;
    this.handleSwipe();
    photoWrapper.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleSwipe() {
    const threshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        this.nextPhoto();
      } else {
        this.previousPhoto();
      }
    }
  }

  setupAutoSlide() {
    // Auto-advance photos every 5 seconds when not hovered
    let autoSlideInterval;
    const photoGallery = document.querySelector('.photo-gallery');

    const startAutoSlide = () => {
      autoSlideInterval = setInterval(() => {
        this.nextPhoto();
      }, 5000);
    };

    const stopAutoSlide = () => {
      clearInterval(autoSlideInterval);
    };

    if (photoGallery) {
      photoGallery.addEventListener('mouseenter', stopAutoSlide);
      photoGallery.addEventListener('mouseleave', startAutoSlide);
      
      // Start auto-slide initially
      startAutoSlide();
    }
  }

  previousPhoto() {
    this.currentPhotoIndex = this.currentPhotoIndex === 0 
      ? this.data.photos.length - 1 
      : this.currentPhotoIndex - 1;
    this.updatePhoto();
  }

  nextPhoto() {
    this.currentPhotoIndex = (this.currentPhotoIndex + 1) % this.data.photos.length;
    this.updatePhoto();
  }

  goToPhoto(index) {
    this.currentPhotoIndex = index;
    this.updatePhoto();
  }

  updatePhoto() {
    const photos = document.querySelectorAll('.gallery-photo');
    const indicators = document.querySelectorAll('.indicator');

    // Update photos
    photos.forEach((photo, index) => {
      photo.classList.toggle('active', index === this.currentPhotoIndex);
    });

    // Update indicators
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === this.currentPhotoIndex);
    });
  }

  isInViewport(element) {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}

// Initialize and export globally
const aboutManager = new AboutManager();
window.aboutManager = aboutManager;

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AboutManager;
} 