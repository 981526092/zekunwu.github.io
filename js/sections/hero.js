/**
 * Hero Section Manager
 * Handles hero content rendering and animations
 */
class HeroManager {
  constructor() {
    this.data = {
      name: "Zekun Wu",
      title: "Responsible AI for a Sustainable World",
      description: "Specializing in Safety, Auditing, and Governance of Agentic AI",
      image: {
        src: "image.jpeg",
        alt: "Zekun Wu"
      },
      buttons: [
        {
          text: "Get In Touch",
          href: "#contact",
          class: "btn btn-primary"
        },
        {
          text: "Download CV",
          href: "CV-15.pdf",
          class: "btn btn-primary",
          icon: "fas fa-download",
          target: "_blank"
        },
        {
          text: "Chat with AI Me",
          href: "https://chatgpt.com/g/g-6834cbaa5a208191843ad1592b575e95-zekun-wu",
          class: "btn btn-primary",
          icon: "fas fa-robot",
          target: "_blank"
        }
      ],
      socialLinks: [
        {
          href: "https://linkedin.com/in/zekun-wu-1190091a3",
          icon: "fab fa-linkedin",
          target: "_blank"
        },
        {
          href: "https://scholar.google.com/citations?user=xurQ_DgAAAAJ",
          icon: "fas fa-graduation-cap",
          target: "_blank"
        },
        {
          href: "mailto:zekun.wu@holisticai.com",
          icon: "fas fa-envelope"
        }
      ]
    };
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.render();
      this.setupTypingAnimation();
    });
  }

  render() {
    const container = document.querySelector('#home .hero-content');
    if (!container) return;

    container.innerHTML = `
      <div class="hero-image">
        <img src="${this.data.image.src}" alt="${this.data.image.alt}" class="profile-photo" />
      </div>
      <h1 class="hero-title">${this.data.name}</h1>
      <h2 class="hero-subtitle">${this.data.title}</h2>
      <p class="hero-description">${this.data.description}</p>
      <div class="hero-buttons">
        ${this.data.buttons.map(button => `
          <a href="${button.href}" class="${button.class}" ${button.target ? `target="${button.target}"` : ''}>
            ${button.icon ? `<i class="${button.icon}"></i> ` : ''}${button.text}
          </a>
        `).join('')}
      </div>
      <div class="social-links">
        ${this.data.socialLinks.map(link => `
          <a href="${link.href}" ${link.target ? `target="${link.target}"` : ''}>
            <i class="${link.icon}"></i>
          </a>
        `).join('')}
      </div>
    `;

    // Append canvas for plexus animation
    const plexusCanvas = document.createElement('canvas');
    plexusCanvas.id = 'hero-plexus-canvas';
    // Ensure it's appended to .hero, not .hero-content, to be a true background element for the section
    const heroSection = document.getElementById('home'); // Assuming 'home' is the ID of the .hero section
    if (heroSection) {
      heroSection.appendChild(plexusCanvas);
    } else {
      // Fallback if .hero section itself is not easily queryable by ID 'home'
      // This might need adjustment based on actual DOM structure or if .hero is the direct parent
      container.parentElement.appendChild(plexusCanvas); 
    }
  }

  /**
   * Typing animation for hero subtitle
   * @param {Element} element - Target element
   * @param {string} text - Text to type
   * @param {number} speed - Typing speed in milliseconds
   */
  typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    const type = () => {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    };
    
    setTimeout(type, 1000); // Start after 1 second
  }

  setupTypingAnimation() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
      const originalText = subtitle.textContent;
      this.typeWriter(subtitle, originalText, 80);
    }
  }
}

// Initialize and export globally
const heroManager = new HeroManager();
window.heroManager = heroManager;

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HeroManager;
} 