/**
 * Publications Section Manager
 * Handles publication grid animations and interactions
 */
class PublicationsManager {
  constructor() {
    this.data = {
      publications: [
        {
          title: "JobFair: A Framework for Benchmarking Gender Hiring Bias in Large Language Models",
          venue: "EMNLP 2024 (Findings)",
          role: "First Co-author",
          link: "https://arxiv.org/abs/2406.15484"
        },
        {
          title: "From Text to Emoji: How PEFT-Driven Personality Manipulation Unleashes the Emoji Potential in LLMs",
          venue: "NAACL 2025 (Findings) & NeurIPS 2024 Behavioral ML Workshop",
          role: "Corresponding Author",
          link: "https://arxiv.org/abs/2409.10245"
        },
        {
          title: "SAGED: A Holistic Bias-Benchmarking Pipeline for Language Models with Customisable Fairness Calibration",
          venue: "COLING 2025 Oral Main",
          role: "Corresponding Author",
          link: "https://arxiv.org/abs/2409.11149"
        },
        {
          title: "HyPA-RAG: A Hybrid Parameter Adaptive Retrieval-Augmented Generation System for AI Legal and Policy Applications",
          venue: "NAACL 2025 Industry Track & EMNLP 2024 Workshop",
          role: "Corresponding and Second Author",
          link: "https://www.arxiv.org/abs/2409.09046"
        },
        {
          title: "Towards Auditing Large Language Models: Improving Text-based Stereotype Detection",
          venue: "NeurIPS 2023 SoLaR Workshop",
          role: "First Co-author",
          link: "https://arxiv.org/abs/2404.01768"
        },
        {
          title: "Bias Amplification: Language Models as Increasingly Biased Media",
          venue: "Submitted to ACL ARR 2025 May",
          role: "Corresponding and Second Author",
          link: "https://arxiv.org/abs/2410.15234"
        }
      ],
      scholarLink: "https://scholar.google.com/citations?user=xurQ_DgAAAAJ"
    };
    this.init();
  }

  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.render();
        this.setupPublicationAnimations();
        this.setupLinkInteractions();
        this.setupFilterFunctionality();
      });
    } else {
      this.render();
      this.setupPublicationAnimations();
      this.setupLinkInteractions();
      this.setupFilterFunctionality();
    }
  }

  render() {
    const container = document.querySelector('#publications .publications-content');
    if (!container) return;

    container.innerHTML = `
      <div class="publications-grid">
        ${this.data.publications.map(pub => `
          <div class="publication-item">
            <h3>${pub.title}</h3>
            <p class="publication-venue">${pub.venue}</p>
            <p class="publication-role">${pub.role}</p>
            <a href="${pub.link}" class="publication-link" target="_blank">
              <i class="fas fa-external-link-alt"></i> View Paper
            </a>
          </div>
        `).join('')}
      </div>
      <div class="publications-footer">
        <a href="${this.data.scholarLink}" class="btn btn-primary" target="_blank">
          <i class="fas fa-graduation-cap"></i> View All Publications on Google Scholar
        </a>
      </div>
    `;
  }

  setupPublicationAnimations() {
    const publicationItems = document.querySelectorAll('.publication-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate-in');
          }, index * 150);
        }
      });
    }, {
      threshold: 0.2
    });

    publicationItems.forEach((item, index) => {
      // Add initial styles for animation
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      
      observer.observe(item);
    });
  }

  setupLinkInteractions() {
    const publicationLinks = document.querySelectorAll('.publication-link');
    
    publicationLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateX(5px)';
        link.style.color = 'var(--primary-color, #007bff)';
      });
      
      link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateX(0)';
        link.style.color = '';
      });
    });

    // Add hover effects to publication items
    const publicationItems = document.querySelectorAll('.publication-item');
    publicationItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px)';
        item.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
      });
      
      item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
        item.style.boxShadow = '';
      });
    });
  }

  setupFilterFunctionality() {
    // Future enhancement: Add filtering by venue, year, or role
    // This could include search functionality or category filters
    console.log('Publications filter functionality ready for future enhancement');
  }

  // Method to add new publications dynamically
  addPublication(publication) {
    this.data.publications.unshift(publication);
    this.render();
  }

  // Method to filter publications by criteria
  filterPublications(criteria) {
    const filtered = this.data.publications.filter(pub => {
      return pub.venue.toLowerCase().includes(criteria.toLowerCase()) ||
             pub.title.toLowerCase().includes(criteria.toLowerCase()) ||
             pub.role.toLowerCase().includes(criteria.toLowerCase());
    });
    
    return filtered;
  }
}

// Initialize and export globally
const publicationsManager = new PublicationsManager();
window.publicationsManager = publicationsManager;

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PublicationsManager;
} 