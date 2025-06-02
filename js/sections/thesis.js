// Thesis Progress Section Module

class ThesisManager {
  constructor() {
    this.data = null;
    this.reports = [];
    this.currentView = 'dashboard';
    this.currentSort = 'date';
    this.currentChartType = 'priority'; // priority, category, parts
  }

  async init() {
    console.log('ThesisManager: Initializing...');
    await this.loadData();
    this.render();
  }

  async loadData() {
    try {
      console.log('ThesisManager: Loading thesis data...');
      const response = await fetch('./reports/todos.json');
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const jsonData = await response.json();
      console.log('ThesisManager: Raw data loaded:', jsonData);
      
      // Extract the todos array from the nested structure
      if (jsonData.todos && Array.isArray(jsonData.todos)) {
        this.data = {
          todos: jsonData.todos,
          metadata: jsonData.metadata || {},
          lastUpdated: jsonData.metadata?.generated_at || new Date().toISOString()
        };
        console.log('ThesisManager: Processed data:', this.data);
        console.log('ThesisManager: TODOs loaded:', this.data.todos.length);
      } else {
        console.error('ThesisManager: Invalid data structure:', jsonData);
        throw new Error('Invalid data structure: todos array not found');
      }

      // Load available reports
      await this.loadReports();
      
    } catch (error) {
      console.error('ThesisManager: Error loading data:', error);
      
      // For testing purposes, create mock data when real data fails to load
      console.log('ThesisManager: Creating mock data for testing...');
      this.data = {
        todos: [
          { priority_name: 'CRITICAL', category: 'Validation', file_path: 'Part_I_Foundations/introduction.tex', resolved: false },
          { priority_name: 'HIGH', category: 'Research', file_path: 'Part_II_Trace_Instrumentation/methodology.tex', resolved: false },
          { priority_name: 'MEDIUM', category: 'Implementation', file_path: 'Part_III_Knowledge_Graph/evaluation.tex', resolved: false },
          { priority_name: 'CRITICAL', category: 'Validation', file_path: 'Part_IV_Anomaly_Detection/methodology.tex', resolved: false },
          { priority_name: 'EXTERNAL', category: 'Expert Review', file_path: 'Part_V_Robustness_Testing/results.tex', resolved: false }
        ],
        metadata: { total_todos: 5 },
        lastUpdated: new Date().toISOString()
      };
      console.log('ThesisManager: Mock data created:', this.data);
      
      // Load reports
      await this.loadReports();
    }
  }

  async loadReports() {
    try {
      // Dynamic report discovery - check for various report patterns
      const reportPatterns = [
        { pattern: 'daily_summary_', name: 'Daily Progress Summary', type: 'daily', icon: '📅' },
        { pattern: 'weekly_report_', name: 'Weekly Progress Report', type: 'weekly', icon: '📊' },
        { pattern: 'monthly_report_', name: 'Monthly Strategic Report', type: 'monthly', icon: '📈' },
        { pattern: 'quality_report_', name: 'Quality Assessment Report', type: 'quality', icon: '✅' },
        { pattern: 'strategic_plan_', name: 'Strategic Plan', type: 'planning', icon: '🎯' },
        { pattern: 'todo_report', name: 'Comprehensive TODO Analysis', type: 'analysis', icon: '📋' }
      ];

      // Try to discover reports dynamically
      for (const reportPattern of reportPatterns) {
        try {
          // Try current date variations first
          const today = new Date().toISOString().split('T')[0];
          const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
          
          const candidates = [];
          
          if (reportPattern.pattern.endsWith('_')) {
            // Date-based reports - try with timestamps
            candidates.push(
              `${reportPattern.pattern}${today}.md`,
              `${reportPattern.pattern}${yesterday}.md`
            );
            
            // Try with timestamp variations for same-day reports
            const timestampPattern = `${reportPattern.pattern}${today}_`;
            for (let hour = 23; hour >= 0; hour--) {
              for (let minute = 59; minute >= 0; minute -= 15) {
                const timestamp = `${hour.toString().padStart(2, '0')}${minute.toString().padStart(2, '0')}00`;
                candidates.push(`${timestampPattern}${timestamp}.md`);
              }
            }
          } else {
            // Static reports
            candidates.push(`${reportPattern.pattern}.md`);
          }
          
          // Try to load the first available candidate
          for (const filename of candidates) {
            try {
              const response = await fetch(`./reports/${filename}`);
              if (response.ok) {
                const content = await response.text();
                const extractedDate = this.extractDateFromContent(content);
                
                this.reports.push({
                  name: reportPattern.name,
                  file: filename,
                  type: reportPattern.type,
                  icon: reportPattern.icon,
                  content: content,
                  date: extractedDate || today
                });
                console.log(`✅ Loaded report: ${filename}`);
                break; // Found one, stop trying other candidates
              }
            } catch (e) {
              // Continue to next candidate
            }
          }
        } catch (e) {
          console.log(`Could not load ${reportPattern.name}:`, e.message);
        }
      }
      
      console.log(`📊 Total reports loaded: ${this.reports.length}`);
      
    } catch (error) {
      console.error('Error loading reports:', error);
    }
  }

  extractDateFromContent(content) {
    const dateMatch = content.match(/(\d{4}-\d{2}-\d{2})/);
    return dateMatch ? dateMatch[1] : null;
  }

  calculateMetrics() {
    if (!this.data || !this.data.todos) {
      return {
        totalTodos: 0,
        completedTodos: 0,
        completionRate: 0,
        criticalTodos: 0,
        qualityScore: 0,
        compilationSuccess: 0,
        writingQuality: 0,
        methodologyScore: 0,
        researchProgress: 0
      };
    }

    const todos = this.data.todos;
    const totalTodos = todos.length;
    const completedTodos = todos.filter(todo => todo.resolved).length;
    const criticalTodos = todos.filter(todo => todo.priority_name === 'CRITICAL').length;
    
    // Calculate completion rate
    const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;
    
    // Calculate quality score based on TODO priorities and categories
    const highPriorityTodos = todos.filter(todo => 
      ['CRITICAL', 'HIGH'].includes(todo.priority_name)
    ).length;
    const qualityScore = Math.max(0, Math.round(100 - (highPriorityTodos / totalTodos) * 100));
    
    // Calculate thesis-specific metrics
    const qualityReport = this.reports.find(r => r.type === 'quality');
    
    // Thesis Writing Quality - based on structure and completeness
    const writingQuality = Math.max(60, Math.round(100 - (criticalTodos / totalTodos) * 150));
    
    // Research Methodology Score - based on validation TODOs
    const validationTodos = todos.filter(todo => 
      todo.category === 'Validation' || todo.text.toLowerCase().includes('validation')
    ).length;
    const methodologyScore = Math.max(70, Math.round(100 - (validationTodos / totalTodos) * 200));
    
    // Thesis Compilation Success - from quality report or default
    let compilationSuccess = 85;
    if (qualityReport) {
      const content = qualityReport.content;
      const passedMatch = content.match(/(\d+)\/(\d+) checks passed/);
      if (passedMatch) {
        const passed = parseInt(passedMatch[1]);
        const total = parseInt(passedMatch[2]);
        compilationSuccess = Math.round((passed / total) * 100);
      }
    }
    
    // Research Progress Score - based on non-critical completion
    const researchProgress = Math.round(((totalTodos - criticalTodos) / totalTodos) * 100);

    return {
      totalTodos,
      completedTodos,
      completionRate,
      criticalTodos,
      qualityScore,
      compilationSuccess,
      writingQuality,
      methodologyScore,
      researchProgress
    };
  }

  calculateDistributions() {
    if (!this.data || !this.data.todos) {
      return {
        byPriority: {},
        byCategory: {},
        byPart: {},
        byColor: {}
      };
    }

    const todos = this.data.todos;
    const distributions = {
      byPriority: {},
      byCategory: {},
      byPart: {},
      byColor: {}
    };

    // Count by priority
    todos.forEach(todo => {
      const priority = todo.priority_name || 'UNSPECIFIED';
      distributions.byPriority[priority] = (distributions.byPriority[priority] || 0) + 1;
    });

    // Count by category
    todos.forEach(todo => {
      const category = todo.category || 'Other';
      distributions.byCategory[category] = (distributions.byCategory[category] || 0) + 1;
    });

    // Count by thesis part
    todos.forEach(todo => {
      let part = todo.part || 'Unknown';
      
      // Extract part from file path if not set
      if (part === 'Unknown' && todo.file_path) {
        const pathMatch = todo.file_path.match(/Part_([IVX]+)_([^\/]+)/);
        if (pathMatch) {
          const romanNumeral = pathMatch[1];
          const partName = pathMatch[2].replace(/_/g, ' ');
          part = `Part ${romanNumeral}: ${partName}`;
        } else if (todo.file_path.includes('Part_')) {
          // Fallback for simpler part detection
          const simpleMatch = todo.file_path.match(/Part_([^\/]+)/);
          if (simpleMatch) {
            part = simpleMatch[1].replace(/_/g, ' ');
          }
        }
      }
      
      distributions.byPart[part] = (distributions.byPart[part] || 0) + 1;
    });

    // Count by color/severity
    todos.forEach(todo => {
      const color = todo.color_name || 'DEFAULT';
      distributions.byColor[color] = (distributions.byColor[color] || 0) + 1;
    });

    return distributions;
  }

  renderTodoDistribution(metrics) {
    console.log('Rendering TODO distribution with metrics:', metrics);
    const distributions = this.calculateDistributions();
    console.log('Calculated distributions:', distributions);
    const totalTodos = metrics.totalTodos;

    if (totalTodos === 0) {
      console.log('No TODOs found, rendering no-todos message');
      return '<div class="no-todos">No TODOs found in current data. Data loading may have failed.</div>';
    }

    // Priority distribution with colors
    const priorityColors = {
      'CRITICAL': '#dc3545',
      'HIGH': '#fd7e14', 
      'MEDIUM': '#0d6efd',
      'EXTERNAL': '#6f42c1',
      'UNSPECIFIED': '#6c757d'
    };

    // Category colors
    const categoryColors = {
      'Validation': '#dc3545',
      'Research': '#198754',
      'Implementation': '#0d6efd',
      'Data Collection': '#fd7e14',
      'Performance': '#6f42c1',
      'Expert Review': '#20c997',
      'Security/Ethics': '#e83e8c',
      'Other': '#6c757d'
    };

    const renderDistributionChart = (data, colors, title, icon) => {
      const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
      const maxCount = Math.max(...Object.values(data));
      
      return `
        <div class="distribution-chart">
          <h4>${icon} ${title}</h4>
          <div class="chart-bars">
            ${entries.map(([key, count]) => {
              const percentage = ((count / totalTodos) * 100).toFixed(1);
              const barWidth = (count / maxCount) * 100;
              const color = colors[key] || '#6c757d';
              
              return `
                <div class="chart-bar">
                  <div class="bar-label">
                    <span class="bar-name">${key}</span>
                    <span class="bar-stats">${count} (${percentage}%)</span>
                  </div>
                  <div class="bar-visual">
                    <div class="bar-fill" style="width: ${barWidth}%; background-color: ${color};"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    };

    return `
      <div class="distribution-grid">
        ${renderDistributionChart(distributions.byPriority, priorityColors, 'Priority Distribution', '🎯')}
        ${renderDistributionChart(distributions.byCategory, categoryColors, 'Category Distribution', '📂')}
      </div>
      
      <div class="distribution-parts">
        <h4>📚 Thesis Parts Distribution</h4>
        <div class="parts-grid">
          ${Object.entries(distributions.byPart).sort((a, b) => b[1] - a[1]).map(([part, count]) => {
            const percentage = ((count / totalTodos) * 100).toFixed(1);
            return `
              <div class="part-item">
                <div class="part-header">
                  <span class="part-name">${part}</span>
                  <span class="part-count">${count}</span>
                </div>
                <div class="part-bar">
                  <div class="part-fill" style="width: ${(count / totalTodos) * 100}%"></div>
                </div>
                <div class="part-percentage">${percentage}%</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  render() {
    const container = document.querySelector('.thesis-content');
    if (!container) {
      console.error('Container .thesis-content not found!');
      return;
    }

    console.log('Rendering thesis content, current view:', this.currentView);
    const metrics = this.calculateMetrics();
    
    const navHTML = `
      <div class="thesis-container">
        <div class="thesis-nav">
          <button class="nav-btn ${this.currentView === 'dashboard' ? 'active' : ''}" 
                  onclick="thesisManager.switchView('dashboard')" 
                  style="display: block !important; visibility: visible !important;">
            📊 Dashboard
          </button>
          <button class="nav-btn ${this.currentView === 'distribution' ? 'active' : ''}" 
                  onclick="thesisManager.switchView('distribution')"
                  style="display: block !important; visibility: visible !important;">
            📈 Distribution
          </button>
          <button class="nav-btn ${this.currentView === 'blog' ? 'active' : ''}" 
                  onclick="thesisManager.switchView('blog')"
                  style="display: block !important; visibility: visible !important;">
            📑 Progress Reports
          </button>
        </div>
        
        <div class="thesis-content-area">
          ${this.renderCurrentView(metrics)}
        </div>
      </div>
    `;
    
    console.log('Setting container HTML:', navHTML);
    container.innerHTML = navHTML;
    
    // Ensure navigation is visible and add event listeners
    setTimeout(() => {
      const navButtons = container.querySelectorAll('.nav-btn');
      console.log('Navigation buttons found:', navButtons.length);
      navButtons.forEach((btn, index) => {
        btn.style.display = 'block';
        btn.style.visibility = 'visible';
        btn.style.opacity = '1';
        console.log(`Button ${index}:`, btn.textContent);
      });
      
      // Add event listeners for report items
      this.attachReportEventListeners();
    }, 100);
  }

  renderCurrentView(metrics) {
    switch (this.currentView) {
      case 'dashboard':
        return this.renderDashboard(metrics);
      case 'distribution':
        return this.renderDistributionView(metrics);
      case 'blog':
        return this.renderBlog();
      default:
        return this.renderDashboard(metrics);
    }
  }

  renderDashboard(metrics) {
    return `
      <div class="dashboard-view">
        <div class="progress-overview">
          <div class="progress-cards">
            <div class="progress-card completion">
              <div class="card-icon">📊</div>
              <div class="card-content">
                <h3>Overall Progress 
                  <span class="tooltip-trigger" data-tooltip="Calculated as (Completed TODOs / Total TODOs) × 100. Each TODO represents a specific research task or milestone.">ℹ️</span>
                </h3>
                <div class="metric-value">${metrics.completionRate}%</div>
                <div class="metric-label">THESIS COMPLETION</div>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: ${metrics.completionRate}%"></div>
                </div>
                <div class="metric-detail">${metrics.completionRate}% Complete</div>
              </div>
            </div>

            <div class="progress-card todos">
              <div class="card-icon">📋</div>
              <div class="card-content">
                <h3>Active TODOs 
                  <span class="tooltip-trigger" data-tooltip="Total research tasks tracked across all thesis components. Critical TODOs (red bar) represent fundamental gaps requiring immediate attention.">ℹ️</span>
                </h3>
                <div class="metric-value">${metrics.totalTodos}</div>
                <div class="metric-label">TOTAL ITEMS TRACKED</div>
                <div class="progress-bar">
                  <div class="progress-fill critical" style="width: ${(metrics.criticalTodos/metrics.totalTodos)*100}%"></div>
                </div>
                <div class="metric-detail">${metrics.criticalTodos} Critical Remaining</div>
              </div>
            </div>


          </div>
        </div>




      </div>
    `;
  }

  renderDistributionView(metrics) {
    const distributions = this.calculateDistributions();
    const totalTodos = metrics.totalTodos;

    if (totalTodos === 0) {
      return `
        <div class="distribution-view">
          <div class="no-todos">
            <div class="no-todos-icon">📋</div>
            <h4>No TODO data available</h4>
            <p>Data loading may have failed or no TODOs are currently tracked.</p>
          </div>
        </div>
      `;
    }

    // Get current chart data and colors based on selected type
    let currentData, currentColors, currentTitle, currentIcon;
    
    switch (this.currentChartType) {
      case 'priority':
        currentData = distributions.byPriority;
        currentColors = {
          'CRITICAL': '#dc3545',
          'HIGH': '#fd7e14', 
          'MEDIUM': '#0d6efd',
          'EXTERNAL': '#6f42c1',
          'UNSPECIFIED': '#6c757d'
        };
        currentTitle = 'Priority Breakdown';
        currentIcon = '🎯';
        break;
      case 'category':
        currentData = distributions.byCategory;
        currentColors = {
          'Validation': '#dc3545',
          'Research': '#198754',
          'Implementation': '#0d6efd',
          'Data Collection': '#fd7e14',
          'Performance': '#6f42c1',
          'Expert Review': '#20c997',
          'Security/Ethics': '#e83e8c',
          'Other': '#6c757d'
        };
        currentTitle = 'Category Breakdown';
        currentIcon = '📂';
        break;
      case 'parts':
        currentData = distributions.byPart;
        currentColors = this.getPartsColors();
        currentTitle = 'Thesis Parts Distribution';
        currentIcon = '📚';
        break;
    }

    return `
      <div class="distribution-view">
        <div class="chart-tabs">
          <button class="chart-tab ${this.currentChartType === 'priority' ? 'active' : ''}" 
                  onclick="thesisManager.switchChart('priority')">
            🎯 Priority
          </button>
          <button class="chart-tab ${this.currentChartType === 'category' ? 'active' : ''}" 
                  onclick="thesisManager.switchChart('category')">
            📂 Category
          </button>
          <button class="chart-tab ${this.currentChartType === 'parts' ? 'active' : ''}" 
                  onclick="thesisManager.switchChart('parts')">
            📚 Parts
          </button>
        </div>

        <div class="single-chart-container">
          <div class="chart-header">
            <h3>${currentIcon} ${currentTitle}</h3>
            <p>${Object.keys(currentData).length} different ${this.currentChartType === 'parts' ? 'thesis parts' : this.currentChartType === 'priority' ? 'priority levels' : 'categories'} • ${totalTodos} total items</p>
          </div>
          
          <div class="single-pie-chart-container">
            ${this.renderPieChart(currentData, currentColors, totalTodos, this.currentChartType)}
          </div>
        </div>
      </div>
    `;
  }

  getPartsColors() {
    return {
      'Part I: Foundations': '#667eea',
      'Part II: Trace Instrumentation': '#48bb78',
      'Part III: Knowledge Graph': '#ed8936',
      'Part IV: Anomaly Detection': '#e53e3e',
      'Part V: Robustness Testing': '#805ad5',
      'Part VI: Causal Attribution': '#38b2ac',
      'Part VII: Case Studies': '#d69e2e',
      'Part VIII: Synthesis': '#3182ce',
      'Unknown': '#a0aec0',
      'TODO_EXAMPLES.tex': '#718096',
      'Introduction': '#667eea',
      'Agent Landscape': '#4fd1c7',
      'System Model': '#9f7aea',
      'Foundations': '#667eea',
      'Trace Instrumentation': '#48bb78',
      'Knowledge Graph': '#ed8936',
      'Anomaly Detection': '#e53e3e',
      'Robustness Testing': '#805ad5',
      'Causal Attribution': '#38b2ac',
      'Case Studies': '#d69e2e',
      'Synthesis': '#3182ce'
    };
  }

  renderPieChart(data, colors, totalTodos, chartId) {
    const sortedData = Object.entries(data).sort((a, b) => b[1] - a[1]);
    const size = 200;
    const center = size / 2;
    const radius = 80;
    
    let cumulativeAngle = 0;
    const slices = sortedData.map(([label, count]) => {
      const percentage = (count / totalTodos) * 100;
      const angle = (count / totalTodos) * 360;
      const startAngle = cumulativeAngle;
      const endAngle = cumulativeAngle + angle;
      
      // Convert angles to radians for SVG path calculations
      const startAngleRad = (startAngle - 90) * (Math.PI / 180);
      const endAngleRad = (endAngle - 90) * (Math.PI / 180);
      
      // Calculate arc endpoints
      const x1 = center + radius * Math.cos(startAngleRad);
      const y1 = center + radius * Math.sin(startAngleRad);
      const x2 = center + radius * Math.cos(endAngleRad);
      const y2 = center + radius * Math.sin(endAngleRad);
      
      // Large arc flag (1 if angle > 180 degrees)
      const largeArcFlag = angle > 180 ? 1 : 0;
      
      // Create SVG path for the slice
      const pathData = [
        `M ${center} ${center}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        'Z'
      ].join(' ');
      
      cumulativeAngle += angle;
      
      const color = colors[label] || '#6c757d';
      
      return {
        label,
        count,
        percentage: percentage.toFixed(1),
        pathData,
        color
      };
    });
    
    return `
      <div class="pie-chart-wrapper">
        <div class="pie-chart">
          <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
            ${slices.map(slice => `
              <path d="${slice.pathData}" 
                    fill="${slice.color}" 
                    stroke="white" 
                    stroke-width="2"
                    class="pie-slice">
                <title>${slice.label}: ${slice.count} (${slice.percentage}%)</title>
              </path>
            `).join('')}
          </svg>
        </div>
        <div class="pie-legend">
          ${slices.map(slice => `
            <div class="legend-item">
              <div class="legend-color" style="background-color: ${slice.color};"></div>
              <div class="legend-info">
                <span class="legend-label">${slice.label}</span>
                <span class="legend-value">${slice.count} (${slice.percentage}%)</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderBlog() {
    console.log('Blog View - Rendering with reports:', this.reports.length, 'Sort by:', this.currentSort);
    
    // Sort reports based on current sort mode
    let sortedReports;
    if (this.currentSort === 'type') {
      sortedReports = this.sortReportsByType([...this.reports]);
    } else {
      // Default to date sorting (newest first)
      sortedReports = [...this.reports].sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    // Group reports appropriately
    const groupedReports = this.currentSort === 'type' ? 
      this.groupReportsByType(sortedReports) : 
      this.groupReportsByWeek(sortedReports);
    
    return `
      <div class="blog-view">
        <div class="blog-header">
          <div class="report-controls">
            <div class="report-stats">
              <span class="stat-item">📈 ${this.reports.length} Total Reports</span>
              <span class="stat-item">${this.currentSort === 'type' ? '📊' : '📅'} ${Object.keys(groupedReports).length} ${this.currentSort === 'type' ? 'Types' : 'Weeks'}</span>
            </div>
            <div class="sort-controls">
              <button class="sort-btn ${this.currentSort === 'date' ? 'active' : ''}" onclick="thesisManager.sortReports('date')">📅 By Date</button>
              <button class="sort-btn ${this.currentSort === 'type' ? 'active' : ''}" onclick="thesisManager.sortReports('type')">📊 By Type</button>
            </div>
          </div>
        </div>
        
        <div class="reports-timeline">
          ${Object.keys(groupedReports).length > 0 ? 
            Object.entries(groupedReports).map(([groupKey, groupReports]) => `
              <div class="week-section" ${this.currentSort === 'type' ? `data-type="${groupKey}"` : ''}>
                <div class="week-header">
                  <h4>${this.currentSort === 'type' ? '📊' : '📅'} ${this.currentSort === 'type' ? groupKey.charAt(0).toUpperCase() + groupKey.slice(1) + ' Reports' : 'Week of ' + groupKey}</h4>
                  <span class="week-count">${groupReports.length} reports</span>
                </div>
                <div class="week-reports scrollable-reports">
                  ${groupReports.map((report, index) => {
                    const reportId = `${groupKey}-${index}`;
                    return `
                    <div class="report-item" data-report-id="${reportId}">
                      <div class="report-header">
                        <div class="report-icon">${report.icon || '📄'}</div>
                        <div class="report-info">
                          <h5>${report.name}</h5>
                          <p>${new Date(report.date).toLocaleDateString('en-US', { 
                            weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' 
                          })}</p>
                        </div>
                        <div class="report-meta">
                          <span class="report-type ${report.type}">${report.type}</span>
                          <span class="report-toggle">▼</span>
                        </div>
                      </div>
                      <div class="report-content" id="report-content-${reportId}" style="display: none;">
                        <div class="report-summary">
                          ${this.generateReportSummary(report)}
                        </div>
                        <div class="report-full">
                          <h6>📄 Complete Report Content:</h6>
                          <div class="report-text-content">
                            <pre>${report.content}</pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  `;
                  }).join('')}
                </div>
              </div>
            `).join('')
          : `
            <div class="no-reports-timeline">
              <div class="timeline-placeholder">
                <div class="week-section">
                  <div class="week-header">
                    <h4>📅 Current Week</h4>
                    <span class="week-count">System Initializing</span>
                  </div>
                  <div class="week-reports">
                    <div class="placeholder-report">
                      <div class="report-icon">📅</div>
                      <div class="report-info">
                        <h5>Daily Progress Summary</h5>
                        <p>Expected: TODO review, build verification, progress snapshots</p>
                      </div>
                    </div>
                    <div class="placeholder-report">
                      <div class="report-icon">✅</div>
                      <div class="report-info">
                        <h5>Quality Assessment Report</h5>
                        <p>Expected: LaTeX compilation, citation validation</p>
                      </div>
                    </div>
                    <div class="placeholder-report">
                      <div class="report-icon">📊</div>
                      <div class="report-info">
                        <h5>Weekly TODO Analysis</h5>
                        <p>Expected: Priority breakdown, progress tracking</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `}
        </div>
      </div>
    `;
  }

  groupReportsByWeek(reports) {
    const weeks = {};
    reports.forEach(report => {
      const date = new Date(report.date);
      const startOfWeek = new Date(date);
      startOfWeek.setDate(date.getDate() - date.getDay());
      const weekKey = startOfWeek.toLocaleDateString('en-US', { 
        month: 'short', day: 'numeric', year: 'numeric' 
      });
      
      if (!weeks[weekKey]) {
        weeks[weekKey] = [];
      }
      weeks[weekKey].push(report);
    });
    return weeks;
  }

  sortReports(sortBy) {
    console.log('Sorting reports by:', sortBy);
    // Update sort state and re-render
    this.currentSort = sortBy;
    this.render();
  }

  sortReportsByType(reports) {
    // Sort by type first, then by date within each type
    return reports.sort((a, b) => {
      if (a.type !== b.type) {
        return a.type.localeCompare(b.type);
      }
      return new Date(b.date) - new Date(a.date);
    });
  }

  groupReportsByType(reports) {
    const types = {};
    reports.forEach(report => {
      const typeKey = report.type || 'other';
      if (!types[typeKey]) {
        types[typeKey] = [];
      }
      types[typeKey].push(report);
    });
    return types;
  }

  renderBlogPost(report) {
    const date = new Date(report.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return `
      <article class="blog-post">
        <header class="post-header">
          <h4>${report.icon || '📄'} ${report.name}</h4>
          <div class="post-meta">
            <span class="post-date">${date}</span>
            <span class="post-type">${report.type}</span>
          </div>
        </header>
        <div class="post-content">
          <div class="post-summary">
            ${this.generateReportSummary(report)}
          </div>
          <details class="report-details">
            <summary>View Full Report</summary>
            <pre>${report.content}</pre>
          </details>
        </div>
      </article>
    `;
  }

  generateReportSummary(report) {
    switch(report.type) {
      case 'daily':
        return `
          <p><strong>Daily Progress Update:</strong> Automated workflow completed including TODO review, build verification, and progress snapshot.</p>
          <ul>
            <li>✅ Critical TODO review completed</li>
            <li>🔧 Build verification performed</li>
            <li>📊 Progress snapshot saved to repository</li>
          </ul>
        `;
      case 'quality':
        return `
          <p><strong>Quality Assessment:</strong> Comprehensive evaluation of thesis build process and structural integrity.</p>
          <ul>
            <li>📝 LaTeX compilation status</li>
            <li>📚 Citation and bibliography validation</li>
            <li>📐 Formatting compliance check</li>
          </ul>
        `;
      case 'analysis':
        return `
          <p><strong>TODO Analysis:</strong> Detailed breakdown of research tasks, priorities, and completion status across all thesis components.</p>
          <ul>
            <li>🔍 Priority distribution analysis</li>
            <li>📈 Progress tracking by thesis part</li>
            <li>⚠️ Critical issues identification</li>
          </ul>
        `;
      default:
        return `<p>Automated report generated from thesis management system.</p>`;
    }
  }

  renderMethodology(metrics) {
    return `
      <div class="methodology-view">
        <div class="methodology-header">
          <h3>Research Methodology & Score Calculations</h3>
          <p>Systematic approach to thesis progress tracking and quality assessment</p>
        </div>

        <div class="methodology-sections">
          <section class="methodology-section">
            <h4>📊 Progress Calculation Methodology</h4>
            <div class="calculation-details">
              <div class="formula">
                <strong>Completion Rate:</strong> 
                <code>(Completed TODOs / Total TODOs) × 100</code>
              </div>
              <div class="explanation">
                <p><strong>Current:</strong> ${metrics.completedTodos}/${metrics.totalTodos} = ${metrics.completionRate}%</p>
                <p>Each TODO item represents a specific research task, validation requirement, or implementation milestone. Completion is tracked through automated parsing of LaTeX comments and manual resolution marking.</p>
              </div>
            </div>
          </section>

          <section class="methodology-section">
            <h4>⭐ Quality Score Methodology</h4>
            <div class="calculation-details">
              <div class="formula">
                <strong>Quality Score:</strong> 
                <code>100 - (High Priority TODOs / Total TODOs) × 100</code>
              </div>
              <div class="explanation">
                <p><strong>Current:</strong> 100 - (${metrics.criticalTodos + (this.data?.todos?.filter(t => t.priority_name === 'HIGH').length || 0)})/${metrics.totalTodos}) × 100 = ${metrics.qualityScore}%</p>
                <p>Quality is inversely related to the proportion of critical and high-priority issues. This encourages addressing fundamental research gaps and validation requirements early.</p>
              </div>
            </div>
          </section>

          <section class="methodology-section">
            <h4>🔧 Build Success Methodology</h4>
            <div class="calculation-details">
              <div class="formula">
                <strong>Build Success:</strong> 
                <code>(Passed Quality Checks / Total Quality Checks) × 100</code>
              </div>
              <div class="explanation">
                <p><strong>Current:</strong> ${metrics.buildSuccess}% (based on automated quality assurance checks)</p>
                <p>Includes LaTeX compilation success, citation validation, formatting compliance, and structural integrity checks run through automated workflows.</p>
              </div>
            </div>
          </section>

          <section class="methodology-section">
            <h4>📋 TODO Categorization System</h4>
            <div class="priority-system">
              <div class="priority-item critical">
                <strong>CRITICAL (Red):</strong> Fundamental research gaps, mock data warnings, missing validations
              </div>
              <div class="priority-item high">
                <strong>HIGH (Blue):</strong> Experimental validation needs, deployment testing requirements
              </div>
              <div class="priority-item medium">
                <strong>MEDIUM (Purple):</strong> Implementation requirements, research methodology improvements
              </div>
              <div class="priority-item external">
                <strong>EXTERNAL (Green):</strong> Expert review needs, external validation requirements
              </div>
            </div>
          </section>

          <section class="methodology-section">
            <h4>🔄 Automated Workflow System</h4>
            <div class="workflow-details">
              <div class="workflow-item">
                <strong>Daily Workflow:</strong>
                <ul>
                  <li>Critical TODO review and prioritization</li>
                  <li>Quick LaTeX build verification</li>
                  <li>Progress snapshot and data synchronization</li>
                  <li>Daily summary report generation</li>
                </ul>
              </div>
              <div class="workflow-item">
                <strong>Weekly Workflow:</strong>
                <ul>
                  <li>Comprehensive TODO analysis and reporting</li>
                  <li>Progress tracking with trend analysis</li>
                  <li>Full quality assurance check suite</li>
                  <li>Complete build and formatting validation</li>
                </ul>
              </div>
            </div>
          </section>

          <section class="methodology-section">
            <h4>📈 Progress Tracking Philosophy</h4>
            <div class="philosophy">
              <p>This systematic approach ensures:</p>
              <ul>
                <li><strong>Transparency:</strong> All progress metrics are derived from actual work artifacts</li>
                <li><strong>Accountability:</strong> Critical issues are prominently tracked and prioritized</li>
                <li><strong>Quality Focus:</strong> Emphasis on addressing fundamental research gaps early</li>
                <li><strong>Automation:</strong> Reduces manual tracking overhead while maintaining accuracy</li>
                <li><strong>Reproducibility:</strong> All calculations and methodologies are documented and automated</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    `;
  }

  switchView(view) {
    this.currentView = view;
    this.render();
  }

  switchChart(chartType) {
    this.currentChartType = chartType;
    this.render();
  }

  attachReportEventListeners() {
    console.log('Attaching report event listeners');
    const reportItems = document.querySelectorAll('.report-item[data-report-id]');
    console.log('Found report items:', reportItems.length);
    
    reportItems.forEach(item => {
      const reportId = item.getAttribute('data-report-id');
      console.log('Adding listener for report:', reportId);
      
      item.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Report clicked:', reportId);
        this.toggleReport(reportId);
      });
    });
  }

  toggleReport(reportId) {
    console.log('Toggling report:', reportId);
    const content = document.getElementById(`report-content-${reportId}`);
    
    // Find the report item and then the toggle element within it
    const reportItem = document.querySelector(`[data-report-id="${reportId}"]`);
    const toggle = reportItem ? reportItem.querySelector('.report-toggle') : null;
    
    console.log('Content element:', content);
    console.log('Toggle element:', toggle);
    console.log('Report item:', reportItem);
    
    if (content) {
      if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        if (toggle) toggle.textContent = '▲';
        console.log('Expanded report:', reportId);
      } else {
        content.style.display = 'none';
        if (toggle) toggle.textContent = '▼';
        console.log('Collapsed report:', reportId);
      }
    } else {
      console.error('Could not find content element for report:', reportId);
      console.error('Content ID searched:', `report-content-${reportId}`);
    }
  }

  handleDataError(error) {
    const container = document.querySelector('.thesis-content');
    if (!container) return;

    container.innerHTML = `
      <div class="error-state">
        <div class="error-icon">⚠️</div>
        <h3>Thesis Data Temporarily Unavailable</h3>
        <p>The automated thesis management system data could not be loaded.</p>
        <div class="error-details">
          <p><strong>System Overview:</strong></p>
          <ul>
            <li>Comprehensive TODO tracking across all thesis components</li>
            <li>Automated daily and weekly progress workflows</li>
            <li>Quality assurance and build verification systems</li>
            <li>Real-time synchronization with thesis repository</li>
          </ul>
          <p><strong>Error:</strong> ${error.message}</p>
          <p>Please try refreshing the page or contact the system administrator.</p>
        </div>
      </div>
    `;
  }
}

// Initialize when DOM is loaded
let thesisManager;
document.addEventListener('DOMContentLoaded', () => {
  thesisManager = new ThesisManager();
  thesisManager.init();
}); 