/**
 * Contact Section Manager
 * Handles contact section animations and interactions
 */
class ContactManager {
  constructor() {
    this.data = {
      contactInfo: [
        {
          icon: "fas fa-map-marker-alt",
          title: "Location & Timezone",
          details: [
            "London, UK",
            "GMT (London Time)"
          ]
        },
        {
          icon: "fas fa-building",
          title: "Affiliations",
          details: [
            "Holistic AI",
            "University College London"
          ]
        },
        {
          icon: "fas fa-clock",
          title: "Availability",
          details: [
            "Open to collaborations",
            "Research partnerships welcome"
          ]
        }
      ],
      contactLinks: [
        {
          icon: "fas fa-envelope",
          label: "Holistic AI Email",
          href: "mailto:zekun.wu@holisticai.com",
          type: "email"
        },
        {
          icon: "fas fa-envelope",
          label: "UCL Email",
          href: "mailto:zekun.wu.19@ucl.ac.uk",
          type: "email"
        },
        {
          icon: "fab fa-linkedin",
          label: "LinkedIn",
          href: "https://linkedin.com/in/zekun-wu-1190091a3",
          type: "external"
        },
        {
          icon: "fas fa-graduation-cap",
          label: "Google Scholar",
          href: "https://scholar.google.com/citations?user=xurQ_DgAAAAJ",
          type: "external"
        }
      ]
    };
    this.init();
  }

  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.render();
        this.setupContactAnimations();
        this.setupLinkInteractions();
        this.setupEmailCopyFunctionality();
      });
    } else {
      this.render();
      this.setupContactAnimations();
      this.setupLinkInteractions();
      this.setupEmailCopyFunctionality();
    }
  }

  render() {
    const container = document.querySelector('#contact .contact-content');
    if (!container) return;

    container.innerHTML = `
      <div class="contact-info">
        ${this.data.contactInfo.map(info => `
          <div class="contact-item">
            <i class="${info.icon}"></i>
            <div>
              <h3>${info.title}</h3>
              ${info.details.map(detail => `<p>${detail}</p>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
      <div class="contact-links">
        ${this.data.contactLinks.map(link => `
          <a href="${link.href}" class="contact-link" ${link.type === 'external' ? 'target="_blank"' : ''}>
            <i class="${link.icon}"></i>
            <span>${link.label}</span>
          </a>
        `).join('')}
      </div>
    `;
  }

  setupContactAnimations() {
    const contactItems = document.querySelectorAll('.contact-item, .contact-link');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate-in');
          }, index * 100);
        }
      });
    }, {
      threshold: 0.3
    });

    contactItems.forEach((item, index) => {
      // Add initial styles for animation
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      
      observer.observe(item);
    });
  }

  setupLinkInteractions() {
    const contactLinks = document.querySelectorAll('.contact-link');
    
    contactLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-3px)';
        link.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
        
        const icon = link.querySelector('i');
        if (icon) {
          icon.style.transform = 'scale(1.2)';
        }
      });
      
      link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0)';
        link.style.boxShadow = '';
        
        const icon = link.querySelector('i');
        if (icon) {
          icon.style.transform = 'scale(1)';
        }
      });
    });

    // Add hover effects to contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        const icon = item.querySelector('i');
        if (icon) {
          icon.style.transform = 'rotate(10deg) scale(1.1)';
          icon.style.color = 'var(--primary-color, #007bff)';
        }
      });
      
      item.addEventListener('mouseleave', () => {
        const icon = item.querySelector('i');
        if (icon) {
          icon.style.transform = 'rotate(0deg) scale(1)';
          icon.style.color = '';
        }
      });
    });
  }

  setupEmailCopyFunctionality() {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
      // Add copy functionality on right-click
      link.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        const email = link.href.replace('mailto:', '');
        this.copyToClipboard(email);
        this.showCopyNotification(link, 'Email copied to clipboard!');
      });
      
      // Add double-click to copy
      link.addEventListener('dblclick', (e) => {
        e.preventDefault();
        const email = link.href.replace('mailto:', '');
        this.copyToClipboard(email);
        this.showCopyNotification(link, 'Email copied to clipboard!');
      });
    });
  }

  copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text);
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
      } catch (err) {
        console.error('Unable to copy to clipboard', err);
      }
      document.body.removeChild(textArea);
    }
  }

  showCopyNotification(element, message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
      position: absolute;
      background: var(--primary-color, #007bff);
      color: white;
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 12px;
      z-index: 1000;
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    `;
    
    const rect = element.getBoundingClientRect();
    notification.style.left = rect.left + 'px';
    notification.style.top = (rect.top - 40) + 'px';
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.opacity = '1';
    }, 10);
    
    // Remove after 2 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => {
        if (notification.parentNode) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 2000);
  }
}

// Initialize and export globally
const contactManager = new ContactManager();
window.contactManager = contactManager;

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ContactManager;
} 