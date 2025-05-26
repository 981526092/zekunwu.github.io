/**
 * Education Section Manager
 * Handles education grid animations and achievement interactions
 */
class EducationManager {
  constructor() {
    console.log('EducationManager: Constructor called');
    this.data = {
      education: [
        {
          icon: "fas fa-graduation-cap",
          degree: "PhD in Computer Science (Part-Time)",
          institution: "University College London",
          date: "2024.01 - Present",
          description: "Researching \"Sustainable and Responsible Agentic AI\" to address emerging sustainability and ethical challenges in Agentic AI. This research is co-supervised by Dr. María Pérez-Ortiz, Dr. Adriano Koshiyama, and Dr. Sahan Bulathwela.",
          achievements: [
            "Reviewer for ICLR 2025 Main Conference, ACL ARR 2024/2025, COLM 2025",
            "Program Committee for NeurIPS 2023/2024 (SoLaR Workshop), ICML 2024 (TiFA Workshop), EMNLP 2024 (CustomNLP4U Workshop)"
          ]
        },
        {
          icon: "fas fa-medal",
          degree: "MSc in AI for Sustainable Development",
          institution: "University College London",
          date: "2022.09 - 2023.09",
          description: "Achieved the highest overall grade in the program (81.8%), placed on Dean's List (5%), graduating with Distinction.",
          achievements: [
            "£3000 Carbon Re Prize for Academic Excellence",
            "Featured as Outstanding Graduate on UCL website"
          ]
        },
        {
          icon: "fas fa-laptop-code",
          degree: "BSc in Computer Science",
          institution: "University College London",
          date: "2019.09 - 2022.09",
          description: "Ranked 93rd globally in 2020 ULTRA Coding Competition. BSc thesis supervised by Professor John Shawe-Taylor.",
          achievements: [
            "UCL Summer School Grade A (85.65%)",
            "Downstream AI Art Project collaboration"
          ]
        }
      ]
    };
    console.log('EducationManager: Data initialized', this.data);
    this.init();
  }

  init() {
    console.log('EducationManager: Init called, document.readyState =', document.readyState);
    if (document.readyState === 'loading') {
      console.log('EducationManager: Adding DOMContentLoaded listener');
      document.addEventListener('DOMContentLoaded', () => {
        console.log('EducationManager: DOMContentLoaded fired');
        this.render();
        this.setupEducationAnimations();
        this.setupAchievementInteractions();
      });
    } else {
      console.log('EducationManager: DOM already ready, rendering immediately');
      this.render();
      this.setupEducationAnimations();
      this.setupAchievementInteractions();
    }
  }

  render() {
    console.log('EducationManager: Render called');
    const container = document.querySelector('#education .education-content');
    console.log('EducationManager: Container found:', container);
    if (!container) {
      console.error('EducationManager: Container not found!');
      return;
    }

    console.log('EducationManager: About to set innerHTML');
    container.innerHTML = `
      <div class="education-grid">
        ${this.data.education.map(edu => `
          <div class="education-item">
            <div class="education-icon">
              <i class="${edu.icon}"></i>
            </div>
            <div class="education-content">
              <h3>${edu.degree}</h3>
              <h4>${edu.institution}</h4>
              <p class="education-date">${edu.date}</p>
              <p>${edu.description}</p>
              <div class="achievements">
                ${edu.achievements.map(achievement => `
                  <span class="achievement">${achievement}</span>
                `).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    console.log('EducationManager: innerHTML set successfully');
  }

  setupEducationAnimations() {
    const educationItems = document.querySelectorAll('.education-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate-in');
          }, index * 300);
        }
      });
    }, {
      threshold: 0.3
    });

    educationItems.forEach((item, index) => {
      // Add initial styles for animation
      item.style.opacity = '0';
      item.style.transform = 'translateY(30px)';
      item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      
      observer.observe(item);
    });
  }

  setupAchievementInteractions() {
    const achievements = document.querySelectorAll('.achievement');
    
    achievements.forEach(achievement => {
      achievement.addEventListener('mouseenter', () => {
        achievement.style.transform = 'scale(1.05)';
        achievement.style.backgroundColor = 'var(--primary-color, #007bff)';
        achievement.style.color = 'white';
      });
      
      achievement.addEventListener('mouseleave', () => {
        achievement.style.transform = 'scale(1)';
        achievement.style.backgroundColor = '';
        achievement.style.color = '';
      });
    });

    // Add hover effects to education icons
    const educationIcons = document.querySelectorAll('.education-icon');
    educationIcons.forEach(icon => {
      icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'rotate(10deg) scale(1.1)';
      });
      
      icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'rotate(0deg) scale(1)';
      });
    });
  }
}

// Initialize and export globally
const educationManager = new EducationManager();
window.educationManager = educationManager;

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EducationManager;
} 