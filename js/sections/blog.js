/**
 * Blog Section Manager
 * Handles tab switching between blog posts and news updates
 */
class BlogManager {
  constructor() {
    this.data = {
      allItems: [
        {
          date: 'March 2025',
          title: 'Holistic AI\'s Claude 3.7 Security Audit Featured in Fortune\'s "Eye on AI"',
          excerpt: 'Our comprehensive jailbreaking and red teaming audit of Anthropic\'s Claude 3.7 Sonnet achieved groundbreaking results: 100% jailbreaking resistance and 0% unsafe responses, setting the benchmark for AI security in 2025. Featured as AI research engineer explaining that "the key danger lies not in compromising systems at the network level but in users coercing models into generating unsafe content."',
          link: 'https://www.linkedin.com/posts/holisticai_exclusive-is-claude-37-sonnet-jailbreak-activity-7304872673107472384-Qzya',
          source: {
            favicon: 'https://www.google.com/s2/favicons?domain=fortune.com&sz=16',
            name: 'Fortune'
          },
          additionalLinks: [
            {
              title: 'Fortune Article',
              url: 'https://fortune.com/2025/03/06/exclusive-anthropics-claude-3-7-sonnet-is-the-most-secure-model-yet-an-independent-audit-suggests/'
            }
          ],
          tag: 'article'
        },
        {
          date: 'February 2025',
          title: 'Two Research Projects Accepted at NAACL 2025 Conference',
          excerpt: 'Thrilled to contribute to two groundbreaking research projects accepted at the prestigious NAACL 2025 conference: HyPA-RAG system for AI legal applications and PEFT-driven personality manipulation in LLMs. Both projects represent significant milestones in advancing NLP and AI governance, with applications ranging from legal policy compliance to expressive AI systems.',
          link: 'https://www.linkedin.com/posts/holisticai_2025-annual-conference-of-the-nations-of-activity-7296234310804590592-deVx',
          source: {
            favicon: 'https://www.google.com/s2/favicons?domain=2025.naacl.org&sz=16',
            name: 'NAACL 2025'
          },
          additionalLinks: [
            {
              title: 'HyPA-RAG Paper (NAACL 2025)',
              url: 'https://aclanthology.org/2025.naacl-industry.79/'
            },
            {
              title: 'PEFT Emoji Paper (NAACL 2025)',
              url: 'https://aclanthology.org/2025.findings-naacl.265/'
            },
            {
              title: 'NAACL 2025 Conference',
              url: 'https://2025.naacl.org/'
            }
          ],
          tag: 'paper'
        },
        {
          date: 'January 2025',
          title: 'SAGED: Holistic Bias-Benchmarking Pipeline Presented at COLING 2025',
          excerpt: 'Thrilled to have presented SAGED at COLING 2025 in Abu Dhabi! SAGED is a first-of-its-kind modular bias benchmarking pipeline for large language models, addressing key limitations in existing benchmarks such as contamination, narrow evaluation scopes, and absence of fairness baselines. The framework provides end-to-end bias evaluation with counterfactual branching, advanced metrics, and baseline calibration for building fairer AI systems.',
          link: 'https://aclanthology.org/2025.coling-main.202/',
          source: {
            favicon: 'https://www.google.com/s2/favicons?domain=aclanthology.org&sz=16',
            name: 'COLING 2025'
          },
          tag: 'paper'
        },
        {
          date: 'January 2025',
          title: 'The Future of AI is Here: Meet LLM Agents',
          excerpt: 'Large Language Models (LLMs) are powerful, but they\'re not perfect. They often need human help to turn their outputs into actions. Enter LLM agents—designed to take autonomy to the next level and tackle real-world tasks with minimal intervention. Exploring multimodality, tool use, memory, reflection, and community interaction capabilities that make them game-changers, while addressing the challenges of bias, sustainability, and ethical concerns on the path to AGI.',
          link: 'https://www.holisticai.com/blog/llm-agents-use-cases-risks',
          source: {
            favicon: 'https://www.google.com/s2/favicons?domain=holisticai.com&sz=16',
            name: 'Holistic AI'
          },
          tag: 'blog'
        },
        {
          date: 'December 2024',
          title: 'Four Research Papers Presented at NeurIPS 2024 Workshops',
          excerpt: 'Excited to share that our team presented four research papers at NeurIPS 2024 across various workshops on December 14th and 15th, reflecting our dedication to advancing responsible and explainable AI research. Our contributions spanned stereotype detection, hallucination mitigation, personality manipulation in LLMs, and bias evaluation in metric models, with presentations by team members including myself, Xin Guan, Theo King, and Archish Arun.',
          link: 'https://www.linkedin.com/posts/holisticai_neurips2024-airesearch-responsibleai-ugcPost-7274530016791535616-NNqM',
          source: {
            favicon: 'https://www.google.com/s2/favicons?domain=neurips.cc&sz=16',
            name: 'NeurIPS 2024'
          },
          additionalLinks: [
            {
              title: 'HEARTS Paper - Stereotype Detection Framework (SoLaR & SafeGenAI Workshops)',
              url: 'https://arxiv.org/abs/2409.10245'
            },
            {
              title: 'THaMES Paper - Hallucination Mitigation Tool (Socially Responsible Language Modeling Research Workshop)',
              url: 'https://arxiv.org/abs/2409.11579'
            },
            {
              title: 'PEFT Emoji Paper - Personality Manipulation (Behavioral Machine Learning Workshop)',
              url: 'https://arxiv.org/abs/2409.11353'
            },
            {
              title: 'Bias Evaluation Paper - Metric Model Assessment (EvalEval Workshop)',
              url: 'https://arxiv.org/abs/2410.11059'
            }
          ],
          tag: 'paper'
        },
        {
          date: 'November 2024',
          title: 'Holistic AI x UCL AI Society Hackathon: Shaping the Future of Responsible AI',
          excerpt: 'Successfully hosted the Holistic AI x UCL AI Society Hackathon - a phenomenal two-day event where participants tackled the biggest challenges in AI, combining technical innovation with ethical considerations. Featured expert panels on bias detection, climate AI, data transparency, and AI governance, alongside hands-on tracks focusing on multi-objective optimization for AI trustworthiness and stereotype classification in text.',
          link: 'https://www.linkedin.com/posts/holisticai_holisticai-uclai-hackathon-activity-7268198263445499904--Fjr',
          source: {
            favicon: 'https://www.google.com/s2/favicons?domain=holisticai.com&sz=16',
            name: 'Holistic AI'
          },
          additionalLinks: [
            {
              title: 'Hackathon Website',
              url: 'https://hackathon.holisticai.com'
            },
            {
              title: 'GitHub Repository',
              url: 'https://github.com/holistic-ai/hai-ucl-hackathon/tree/main'
            }
          ],
          tag: 'event'
        },
        {
          date: 'November 2024',
          title: 'Two Research Papers Presented at EMNLP 2024 Conference',
          excerpt: 'Thrilled to present two groundbreaking research papers at the Empirical Methods in Natural Language Processing (EMNLP 2024) conference. Our work addresses critical challenges in AI bias and legal applications: JobFair framework for benchmarking gender hiring bias in LLMs, and HyPA-RAG system for AI legal and policy applications. These contributions advance responsible AI research in collaboration with UCL, UC Berkeley, and Emory University.',
          link: 'https://www.linkedin.com/posts/holisticai_jobfair-a-framework-for-benchmarking-gender-activity-7264351705151033345-uhkF',
          source: {
            favicon: 'https://www.google.com/s2/favicons?domain=aclanthology.org&sz=16',
            name: 'EMNLP 2024'
          },
          additionalLinks: [
            {
              title: 'JobFair Paper - Gender Hiring Bias Framework (EMNLP 2024 Findings)',
              url: 'https://aclanthology.org/2024.findings-emnlp.184/'
            },
            {
              title: 'HyPA-RAG Paper - AI Legal Applications (EMNLP 2024 Workshop)',
              url: 'https://aclanthology.org/2024.customnlp4u-1.18/'
            }
          ],
          tag: 'paper'
        },
        {
          date: 'October 2024',
          title: 'Bias Detection in Large Language Models Webinar',
          excerpt: 'Presented comprehensive insights on AI bias detection and management in large language models, exploring how bias manifests in humans, decision algorithms, and generative models. Covered practical approaches to identifying unfair associations and stereotypes in AI systems, emphasizing the importance of building fair and responsible AI technologies that align with ethical principles and promote inclusivity.',
          link: 'https://www.linkedin.com/posts/holisticai_ai-aibias-responsibleai-ugcPost-7265738328514187266-6Ovz',
          source: {
            favicon: 'https://www.google.com/s2/favicons?domain=holisticai.com&sz=16',
            name: 'Holistic AI'
          },
          additionalLinks: [
            {
              title: 'Event Page',
              url: 'https://www.holisticai.com/events/bias-detection-in-large-language-models'
            }
          ],
          tag: 'event'
        },
        {
          date: 'September 2024',
          title: 'Selected for EU AI Act GPAI Code of Practice Working Groups',
          excerpt: 'Honored to represent Holistic AI in the Assessment and Mitigation working groups for the EU AI Act GPAI Code of Practice. Contributing expertise in AI governance, AI ethics, AI assurance, and LLM auditing to shape the implementation of the EU AI Act. This selection recognizes Holistic AI\'s pioneering work in the field of AI governance and our commitment to responsible AI development across Europe.',
          link: 'https://www.linkedin.com/posts/emre-kazim-phd-21784b21_euaiact-gpai-gpaicodeofpractice-activity-7255558671525416962--CNl',
          source: {
            favicon: 'https://www.google.com/s2/favicons?domain=europa.eu&sz=16',
            name: 'EU AI Act'
          },
          additionalLinks: [
            {
              title: 'EU AI Code of Practice Official Page',
              url: 'https://digital-strategy.ec.europa.eu/en/policies/ai-code-practice'
            }
          ],
          tag: 'event'
        },
        {
          date: 'August 2024',
          title: 'Assessing Biases in LLMs: From Basic Tasks to Hiring Decisions',
          excerpt: 'Comprehensive exploration of bias detection in large language models, covering causes of bias, assessment methodologies, and practical benchmarks. Detailed analysis of BBQ, BOLD, and our custom JobFair benchmark for evaluating gender hiring bias in LLMs. Research demonstrates how embedded biases in AI models occur during training phases and provides frameworks for identifying taste-based bias in recruitment applications, highlighting the importance of robust evaluation methods for building fair AI systems.',
          link: 'https://www.holisticai.com/blog/assessing-biases-in-llms',
          source: {
            favicon: 'https://www.google.com/s2/favicons?domain=holisticai.com&sz=16',
            name: 'Holistic AI'
          },
          tag: 'blog'
        },
        {
          date: 'July 2024',
          title: 'An Overview of Data Contamination: The Causes, Risks, Signs, and Defenses',
          excerpt: 'In-depth analysis of data contamination in large language models, exploring how test set leakage into training data leads to artificially inflated benchmark scores. Comprehensive coverage of detection methods including matching-based and comparison-based approaches, mitigation strategies from dynamic benchmarks to machine unlearning, and the critical importance of maintaining data integrity for accurate AI evaluation. Essential reading for understanding one of the most subtle yet significant challenges in LLM development and deployment.',
          link: 'https://www.holisticai.com/blog/overview-of-data-contamination',
          source: {
            favicon: 'https://www.google.com/s2/favicons?domain=holisticai.com&sz=16',
            name: 'Holistic AI'
          },
          tag: 'blog'
        },
        {
          date: 'May 2024',
          title: 'UCL Academic Excellence Award for AI for Sustainable Development MSc',
          excerpt: 'Honored to receive the £3000 top student award for exceptional academic performance in the UCL Artificial Intelligence for Sustainable Development MSc programme. Recognized alongside fellow student Henning Heyen for demonstrating incredible strength and discipline across various courses, producing publication-worthy data science analyses, and exploring the ethical dimensions of AI and sustainability. The award, generously funded by Carbon Re, acknowledges outstanding academic excellence and critical thinking in responsible AI research.',
          link: 'https://www.ucl.ac.uk/computer-science/news/2024/may/top-students-ai-sustainable-development-msc-win-award-academic-excellence',
          source: {
            favicon: 'https://www.google.com/s2/favicons?domain=ucl.ac.uk&sz=16',
            name: 'UCL Computer Science'
          },
          tag: 'article'
        },
        {
          date: 'March 2024',
          title: 'Featured in UCL Computer Science Student Experiences',
          excerpt: 'Honored to be featured as a graduate spotlight in UCL Computer Science\'s student experiences section, sharing insights about my journey from Computer Science BSc to AI for Sustainable Development MSc. Discussed my research on text-based stereotype detection and bias benchmarking in Large Language Models, the transition from academia to industry at Holistic AI, and the invaluable professional network cultivated through UCL\'s interdisciplinary approach to responsible AI education.',
          link: 'https://www.ucl.ac.uk/computer-science/study/postgraduate-taught/student-experiences/zekun-wu',
          source: {
            favicon: 'https://www.google.com/s2/favicons?domain=ucl.ac.uk&sz=16',
            name: 'UCL Computer Science'
          },
          tag: 'article'
        },
        {
          date: 'February 2024',
          title: 'UNESCO Global Forum on the Ethics of AI 2024 Presentation',
          excerpt: 'Presented research on LLM stereotypes at the IRCAI - International Research Center on Artificial Intelligence under the auspices of UNESCO Global Forum on the Ethics of AI 2024. Shared Holistic AI\'s work on employing explainable AI techniques and energy-efficient classifiers to make the audit process transparent and sustainable, meeting ethical standards while improving predictive performance in stereotype detection and bias mitigation.',
          link: 'https://www.youtube.com/watch?v=fBxdDVTEoOo',
          source: {
            favicon: 'https://www.google.com/s2/favicons?domain=unesco.org&sz=16',
            name: 'UNESCO IRCAI'
          },
          tag: 'event'
        },
      ]
    };
    this.currentFilter = 'all';
    this.sortItemsByDate();
    this.init();
  }

  sortItemsByDate() {
    this.data.allItems.sort((a, b) => {
      // Parse dates for comparison
      const dateA = this.parseDate(a.date);
      const dateB = this.parseDate(b.date);
      
      // Sort in descending order (newest first)
      return dateB - dateA;
    });
  }

  parseDate(dateString) {
    // Handle formats like "March 2025", "February 2025", etc.
    const [month, year] = dateString.split(' ');
    const monthNames = {
      'January': 0, 'February': 1, 'March': 2, 'April': 3,
      'May': 4, 'June': 5, 'July': 6, 'August': 7,
      'September': 8, 'October': 9, 'November': 10, 'December': 11
    };
    
    return new Date(parseInt(year), monthNames[month] || 0);
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.render();
      this.setupFilters();
      this.setupScrollIndicator();
      this.setupAnimations();
    });
  }

  render() {
    const container = document.querySelector('#blog .blog-content');
    if (!container) return;

    container.innerHTML = `
      <div class="unified-content">
        <div class="filter-controls">
          <button class="filter-btn active" data-filter="all">All</button>
          <button class="filter-btn article" data-filter="article">Articles</button>
          <button class="filter-btn paper" data-filter="paper">Papers</button>
          <button class="filter-btn blog" data-filter="blog">Blogs</button>
          <button class="filter-btn event" data-filter="event">Events</button>
        </div>
        <div class="scroll-indicator" id="scrollIndicator">
          <span>Scroll for more</span>
          <span class="arrow">→</span>
        </div>
        <div class="content-grid" id="contentGrid">
          ${this.data.allItems.map(item => `
            <div class="content-item ${item.tag}" data-tag="${item.tag}">
              <div class="content-type">${item.tag === 'article' ? 'Article' : item.tag === 'paper' ? 'Paper' : item.tag === 'blog' ? 'Blog' : 'Event'}</div>
              <div class="content-date">${item.date}</div>
              ${item.source ? `
                <div class="news-source">
                  <img src="${item.source.favicon}" alt="${item.source.name}" class="news-source-logo" />
                  <span class="news-source-text">${item.source.name}</span>
                </div>
              ` : ''}
              <h3>${item.title}</h3>
              <p>${item.excerpt}</p>
              ${item.additionalLinks ? `
                <div class="additional-links">
                  <h4>Related Resources:</h4>
                  <ul>
                    ${item.additionalLinks.map(link => `
                      <li><a href="${link.url}" target="_blank" class="additional-link">${link.title}</a></li>
                    `).join('')}
                  </ul>
                </div>
              ` : ''}
              ${item.link ? `<a href="${item.link}" class="content-link" target="_blank">Read More</a>` : ''}
            </div>
          `).join('')}
          <div class="linkedin-cta">
            <div class="cta-content">
              <h3>Want to see more updates?</h3>
              <p>Follow my latest research, insights, and professional updates on LinkedIn</p>
              <a href="https://www.linkedin.com/in/zekun-wu-1190091a3/recent-activity/all/" target="_blank" class="linkedin-link">
                <img src="https://www.google.com/s2/favicons?domain=linkedin.com&sz=16" alt="LinkedIn" class="linkedin-icon" />
                View More Posts on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Get filter value and apply filter
        const filterValue = btn.dataset.filter;
        this.currentFilter = filterValue;
        this.filterContent(filterValue);
      });
    });
  }

  filterContent(filter) {
    const contentItems = document.querySelectorAll('.content-item');
    const contentGrid = document.getElementById('contentGrid');
    
    contentItems.forEach(item => {
      const itemTag = item.dataset.tag;
      
      if (filter === 'all' || itemTag === filter) {
        item.classList.remove('filtered-out');
      } else {
        item.classList.add('filtered-out');
      }
    });

    // Reset scroll position and update scroll indicator
    if (contentGrid) {
      contentGrid.scrollLeft = 0;
      this.updateScrollIndicator();
    }
  }

  updateScrollIndicator() {
    const scrollIndicator = document.getElementById('scrollIndicator');
    const contentGrid = document.getElementById('contentGrid');
    
    if (!scrollIndicator || !contentGrid) return;

    // Check if there are visible items that require scrolling
    const visibleItems = document.querySelectorAll('.content-item:not(.filtered-out)');
    const { scrollWidth, clientWidth } = contentGrid;
    
    if (visibleItems.length <= 2 || scrollWidth <= clientWidth) {
      scrollIndicator.classList.add('hidden');
    } else {
      scrollIndicator.classList.remove('hidden');
    }
  }

  setupScrollIndicator() {
    const scrollIndicator = document.getElementById('scrollIndicator');
    const contentGrid = document.getElementById('contentGrid');
    
    if (!scrollIndicator || !contentGrid) return;

    // Handle scroll indicator click
    scrollIndicator.addEventListener('click', () => {
      const scrollAmount = contentGrid.clientWidth * 0.8;
      contentGrid.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });

    // Handle scroll events to show/hide indicator
    contentGrid.addEventListener('scroll', () => {
      const { scrollLeft, scrollWidth, clientWidth } = contentGrid;
      const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 10; // 10px tolerance
      
      if (isAtEnd) {
        scrollIndicator.classList.add('hidden');
      } else {
        scrollIndicator.classList.remove('hidden');
      }
    });

    // Initial check
    this.updateScrollIndicator();
  }

  setupAnimations() {
    const contentItems = document.querySelectorAll('.content-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100);
        }
      });
    }, {
      threshold: 0.1
    });

    contentItems.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(item);
    });
  }
}

// Initialize and export globally
const blogManager = new BlogManager();
window.blogManager = blogManager;

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BlogManager;
} 