# Zekun Wu - Personal Website

A modern, responsive personal website showcasing AI research, publications, and professional experience.

## 🏗️ Architecture

This website is built with a modular architecture for improved scalability and maintainability.

### 📁 Project Structure

```
zekunwu.github.io/
├── index.html                 # Main HTML file
├── css/                       # Stylesheets
│   ├── base.css              # Global styles and resets
│   ├── components.css        # Reusable UI components
│   ├── responsive.css        # Responsive design rules
│   └── sections/             # Section-specific styles
│       ├── navbar.css
│       ├── hero.css
│       ├── recent-blog.css
│       ├── about.css
│       ├── experience.css
│       ├── education.css
│       ├── publications.css
│       ├── blog.css
│       └── contact.css
├── js/                       # JavaScript modules
│   ├── core/                 # Core functionality
│   │   ├── utils.js         # Utility functions
│   │   ├── animations.js    # Animation system
│   │   └── navigation.js    # Navigation management
│   ├── sections/            # Section-specific functionality
│   │   ├── hero.js         # Hero section features
│   │   ├── about.js        # About section features
│   │   └── blog.js         # Blog tab functionality
│   └── app.js              # Main application entry point
├── image.jpeg              # Profile photo
├── CV-15.pdf              # CV document
└── README.md              # This file
```

## 🚀 Features

### ✨ **Modern Design**

- Responsive layout that works on all devices
- Smooth animations and transitions
- Professional gradient color scheme
- Clean typography using Inter font

### 🧩 **Modular Architecture**

- **CSS Modules**: Each section has its own stylesheet
- **JavaScript Classes**: Object-oriented approach with proper separation of concerns
- **Component System**: Reusable UI components
- **Utility Functions**: Shared helper functions

### 📱 **Responsive Design**

- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly navigation
- Accessible keyboard navigation

### 🎯 **Core Sections**

- **Hero**: Profile photo, introduction, and call-to-action buttons
- **Recent Blog**: Featured blog posts on the homepage
- **About**: Professional summary with achievement statistics
- **Experience**: Timeline of professional roles
- **Education**: Academic background and achievements
- **Publications**: Research papers and publications
- **Blog & News**: Tabbed interface for blog posts and updates
- **Contact**: Professional contact information

## 🛠️ Technical Implementation

### **CSS Architecture**

- **Base Layer**: Global resets, typography, and foundational styles
- **Components Layer**: Reusable UI patterns (buttons, cards, grids)
- **Sections Layer**: Page-specific styling
- **Responsive Layer**: Media queries and adaptive design

### **JavaScript Architecture**

- **Utils Module**: Debounce, throttle, viewport detection, smooth scrolling
- **Animation Manager**: Scroll animations, parallax effects, counter animations
- **Navigation Manager**: Smooth scrolling, mobile menu, active link highlighting
- **Section Managers**: Specialized functionality for each section
- **App Controller**: Main application coordinator

### **Performance Features**

- Optimized loading with proper script ordering
- Throttled scroll events for smooth performance
- Intersection Observer for efficient animations
- Reduced motion support for accessibility

## 🎨 Design System

### **Colors**

- Primary Gradient: `#667eea` to `#764ba2`
- Text: `#2c3e50` (dark), `#6c757d` (muted)
- Background: `#f8fafc` (light), `white` (cards)

### **Typography**

- Font Family: Inter (Google Fonts)
- Weights: 300, 400, 500, 600, 700
- Responsive font scaling

### **Components**

- Buttons with hover effects
- Cards with shadow and hover animations
- Grid layouts with responsive breakpoints
- Tab interface for content organization

## 📧 Contact Information

- **Professional Email**: zekun.wu@holisticai.com
- **Academic Email**: zekun.wu.19@ucl.ac.uk
- **LinkedIn**: [Zekun Wu](https://www.linkedin.com/in/zekun-wu-a8b5b8195/)
- **Google Scholar**: [Research Profile](https://scholar.google.com/citations?user=your-id)
- **Location**: London, UK

## 🔧 Development

### **Adding New Sections**

1. Create CSS file in `css/sections/`
2. Create JS file in `js/sections/` (if needed)
3. Add links to `index.html`
4. Register module in `js/app.js`

### **Modifying Styles**

- Global changes: Edit `css/base.css` or `css/components.css`
- Section-specific: Edit respective file in `css/sections/`
- Responsive: Edit `css/responsive.css`

### **Adding Functionality**

- Utilities: Add to `js/core/utils.js`
- Animations: Extend `js/core/animations.js`
- Section-specific: Create new file in `js/sections/`

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ by Zekun Wu | AI Research Scientist
