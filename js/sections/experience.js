/**
 * Experience Section Manager
 * Handles timeline animations and interactions
 */
class ExperienceManager {
  constructor() {
    this.data = {
      experiences: [
        {
          date: "2023.05 - Present",
          title: "AI Research Scientist",
          company: "Holistic AI, London, UK",
          employmentType: "Full Time",
          responsibilities: [
            "Lead architect of the Agent Graph project for auditing multi-agent AI systems",
            "Developed Agentic AI Safety tools for auditing, monitoring, redteaming and benchmarking",
            "Supervised 20+ projects across Holistic AI, Stanford, Oxford, UCL, and UC Berkeley",
            "Delivered AI audits for 10+ clients including Unilever, Michelin, Writer AI",
            "Main Organizer of the Holistic AI x UCL Hackathon for 100+ participants"
          ]
        },
        {
          date: "2024.08 - Present",
          title: "AI Policy Researcher",
          company: "OECD.AI, Remote",
          employmentType: "Part Time",
          responsibilities: [
            "Conducting R&D on a Policy Research RAG System, AIR",
            "Leading automated validation and enhancement of the OECD.AI Catalogue of Tools & Metrics"
          ]
        },
        {
          date: "2024.09 - Present",
          title: "Drafting Committee Member",
          company: "EU AI Office GP AI Code of Practice, Remote",
          employmentType: "Part Time",
          responsibilities: [
            "Drafting the inaugural EU General-Purpose AI Code of Practice",
            "Contributing to Working Group 2 on systemic risk and EU AI Act compliance"
          ]
        },
        {
          date: "2024.09 - 2025.01",
          title: "Postgraduate Teaching Assistant",
          company: "University College London, London, UK",
          employmentType: "Part Time",
          responsibilities: [
            "Teaching Assistant for COMP0173 \"AI for Sustainable Development\"",
            "Guest lecturer for COMP0195 \"Accountable, Transparent, and Responsible AI\""
          ]
        },
        {
          date: "2023.12 - Present",
          title: "Founder Engineer",
          company: "SeeTalent, London, UK",
          employmentType: "Freelance",
          responsibilities: [
            "Partnered with UCL and Goldsmiths psychologists to develop Agent-based psychometric analysis tools"
          ]
        }
      ]
    };
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.render();
      this.setupTimelineAnimations();
      this.setupInteractions();
    });
  }

  render() {
    const container = document.querySelector('#experience .experience-content');
    if (!container) return;

    container.innerHTML = `
      <div class="timeline">
        ${this.data.experiences.map(exp => `
          <div class="timeline-item">
            <div class="timeline-date">${exp.date}</div>
            <div class="timeline-content">
              <h3>
                ${exp.title}
                ${exp.employmentType ? `<span class="employment-tag employment-tag-${exp.employmentType.toLowerCase().replace(' ', '-')}">${exp.employmentType}</span>` : ''}
              </h3>
              <h4>${exp.company}</h4>
              <ul>
                ${exp.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
              </ul>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  setupTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate-in');
          }, index * 200);
        }
      });
    }, {
      threshold: 0.2
    });

    timelineItems.forEach((item, index) => {
      // Add initial styles for animation
      item.style.opacity = '0';
      item.style.transform = 'translateX(-50px)';
      item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      
      // Alternate animation direction for visual interest
      if (index % 2 === 1) {
        item.style.transform = 'translateX(50px)';
      }
      
      observer.observe(item);
    });
  }

  setupInteractions() {
    // Hover effects disabled to prevent rectangle appearance on mouse hover
    /*
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.02)';
        item.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
      });
      
      item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
        item.style.boxShadow = 'none';
      });
    });
    */
  }
}

// Initialize and export globally
const experienceManager = new ExperienceManager();
window.experienceManager = experienceManager;

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ExperienceManager;
} 