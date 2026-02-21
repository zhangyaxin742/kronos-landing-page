# KRONOS Landing Page - Product Requirements Document

## Product Overview
KRONOS is an AI life coach for the unreasonably ambitious. This document outlines requirements for the marketing landing page that will convert high performers into users through direct, confrontational messaging and clear value communication.

**Core Value Proposition:** AI accountability partner that calls you out on your bullshit, tracks your progress toward moonshot goals, and won't let you settle for mediocrity.

---

## Design System & Visual Identity

### Core Aesthetic Principles
- **Monochrome Foundation**: Black and white color scheme with strategic accent colors
- **Premium Feel**: Glassmorphism, subtle shadows, smooth transitions
- **Typography**: Clean, modern sans-serif (Inter, SF Pro, or Geist)
- **Spacing**: Generous whitespace, breathing room between sections
- **No Cheap Elements**: Avoid stock photos, generic icons, or template-like components

### Color Palette
```
Primary Black: #000000 / rgb(0, 0, 0)
Primary White: #FFFFFF / rgb(255, 255, 255)
Gray Scale: 
  - #F5F5F5 (backgrounds)
  - #E5E5E5 (borders)
  - #999999 (secondary text)
  - #333333 (body text)
Accent Colors (for timeblock previews only):
  - Blue: rgba(59, 130, 246, 0.15)
  - Green: rgba(34, 197, 94, 0.15)
  - Purple: rgba(168, 85, 247, 0.15)
  - Yellow: rgba(234, 179, 8, 0.15)
  - Orange: rgba(249, 115, 22, 0.15)
  - Red: rgba(239, 68, 68, 0.15)
```

### Glassmorphism Specifications
```css
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
```

---

## User Stories

### US-LP-001: Hero Section Experience
**As a** visitor landing on the page  
**I want to** immediately understand what KRONOS does and see visual proof of its elegance  
**So that** I'm compelled to sign up

**Acceptance Criteria:**
- Hero section occupies full viewport height on desktop
- Primary headline communicates value proposition in ≤8 words
- Subheadline provides context in ≤15 words
- CTA button prominent, high contrast, with hover state
- Animated preview of the app dashboard visible (mockup or video)
- Scroll indicator present at bottom of hero section

### US-LP-002: Feature Showcase
**As a** potential user  
**I want to** understand KRONOS's core capabilities at a glance  
**So that** I can determine if it meets my needs

**Acceptance Criteria:**
- Three primary features displayed in grid or row layout
- Each feature includes: icon, title (≤4 words), description (≤20 words)
- Hover states provide subtle visual feedback
- Features section uses glassmorphism cards on dark background

### US-LP-003: Visual Product Demo
**As a** visitor evaluating the product  
**I want to** see the actual interface in action  
**So that** I understand the user experience

**Acceptance Criteria:**
- Full-width section showing dashboard mockup or video demo
- Mockup displays: timeblocks, color coding, clean calendar layout
- Image/video optimized for web performance (<500KB)
- Caption or annotation highlights key UI elements

### US-LP-004: Call-to-Action Conversion
**As a** interested visitor  
**I want to** easily sign up or download the app  
**So that** I can start using KRONOS

**Acceptance Criteria:**
- Primary CTA button appears in hero and footer
- Button text: "Get Started" or "Download App"
- Button styling: solid black on white background (or inverse)
- Hover state includes smooth transition (0.2s ease)
- Click leads to sign-up flow or app store links

### US-LP-005: Responsive Mobile Experience
**As a** mobile visitor  
**I want to** navigate and understand the product on my device  
**So that** I have an optimal experience regardless of screen size

**Acceptance Criteria:**
- Fully responsive design: 320px → 1920px+ widths
- Mobile navigation collapses to hamburger menu
- Typography scales appropriately across breakpoints
- Touch targets minimum 44x44px
- Images/videos load optimized versions per device

---

## Technical Architecture

### Technology Stack
```
Framework: Next.js 14+ (App Router)
Styling: Tailwind CSS + Custom CSS for glassmorphism
Animations: Framer Motion
Hosting: Vercel
Analytics: Vercel Analytics or Plausible
```

### Performance Requirements
- Lighthouse Performance Score: ≥95
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Cumulative Layout Shift: <0.1
- Time to Interactive: <3.5s

### SEO Requirements
- Semantic HTML5 structure
- Open Graph meta tags
- Twitter Card meta tags
- Schema.org structured data (WebApplication)
- Sitemap.xml and robots.txt
- Title: "KRONOS - Premium Timeblocking & Productivity"
- Meta description: ≤155 characters

---

## Page Structure & Sections

### 1. Navigation Bar
**Position:** Fixed top  
**Height:** 64px desktop, 56px mobile  
**Background:** `rgba(255, 255, 255, 0.8)` with `backdrop-filter: blur(10px)`

**Components:**
- Logo (left): "KRONOS" in custom typography, weight 700, letter-spacing: -0.02em
- Navigation links (center, desktop only): "Features", "About" (optional based on scope)
- CTA Button (right): "Get Started" - solid black bg, white text, 16px padding, border-radius: 8px

### 2. Hero Section
**Height:** 100vh  
**Background:** White with subtle gradient overlay

**Components:**
- Main headline: H1, 56px-72px, weight 800, line-height: 1.1
  - Primary: "Always seek the asymmetric outcome."
  - Alternative: "For the unreasonably ambitious."
- Subheadline: 20px-24px, weight 400, color: #666666
  - "AI life coach that won't let you settle. Set moonshot goals. Get confronted when you fall short. Unfuck your life."
- CTA button: Same styling as nav, 18px text, 20px padding
- Dashboard mockup/video: Below headline, width 80% max-width 1200px
  - Show KRONOS interface: AI chat + timeblocks + goal tracking
  - Subtle shadow: `0 20px 60px rgba(0, 0, 0, 0.15)`

### 3. Features Section
**Background:** #000000 (black) or very dark gray (#0A0A0A)  
**Padding:** 120px vertical

**Layout:** 3-column grid on desktop, stacked on mobile

**Feature Cards:**
```jsx
// Feature 1: AI Coaching
{
  icon: <svg/>, // Brain or target icon
  title: "Brutal Honesty",
  description: "AI coach that confronts you when you're off track. 'You say you want X, but your screentime is 100hrs/week. What is going on?'"
}

// Feature 2: Moonshot Planning
{
  icon: <svg/>, // Rocket icon
  title: "Moonshot Goals",
  description: "Set 10 unreasonable goals for 12 months. Get detailed execution plans and daily check-ins."
}

// Feature 3: Timeblocking
{
  icon: <svg/>, // Calendar icon
  title: "Smart Execution",
  description: "AI-integrated timeblocking. Drag, drop, track. Your coach knows when you're slipping."
}
```

**Card Styling:**
- Glassmorphism on dark background
- `background: rgba(255, 255, 255, 0.03)`
- `border: 1px solid rgba(255, 255, 255, 0.08)`
- Hover: `rgba(255, 255, 255, 0.06)` with 0.3s transition
- Padding: 48px
- Border-radius: 16px

### 4. Product Showcase
**Background:** White  
**Padding:** 120px vertical

**Components:**
- Section title: "See It In Action" - 40px, weight 700
- Full-width mockup or video embed (16:9 aspect ratio)
- Optional: Split view showing before/after or multiple features
- Caption below image: 16px, #666666, italic

### 5. Final CTA Section
**Background:** Black  
**Padding:** 100px vertical  
**Text Color:** White

**Components:**
- Headline: "Ready to master your time?" - 48px, weight 700
- CTA button: White bg, black text (inverse of primary button)
- Hover state: Slight scale (1.05) and shadow

### 6. Footer
**Background:** Black  
**Padding:** 60px vertical  
**Border-top:** 1px solid rgba(255, 255, 255, 0.1)

**Components:**
- Logo and tagline
- Links: Privacy Policy, Terms of Service
- Social links (optional): GitHub, Twitter/X
- Copyright: "© 2024 KRONOS. All rights reserved."

---

## Component Specifications

### Button Component
```jsx
// Primary Button
.btn-primary {
  background: #000000;
  color: #FFFFFF;
  padding: 16px 32px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: #1A1A1A;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

// Secondary Button (Inverse)
.btn-secondary {
  background: #FFFFFF;
  color: #000000;
  border: 1px solid #000000;
}
```

### Typography System
```css
H1: 56px-72px, weight 800, line-height 1.1
H2: 40px-48px, weight 700, line-height 1.2
H3: 28px-32px, weight 600, line-height 1.3
Body Large: 20px-24px, weight 400, line-height 1.6
Body: 16px-18px, weight 400, line-height 1.6
Small: 14px, weight 400, line-height 1.5

Font Family: Inter, SF Pro Display, or Geist
```

### Animation Specifications
```javascript
// Framer Motion Variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
}

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
}
```

---

## Development Guidelines

### File Structure
```
/landing-page
├── /app
│   ├── page.tsx (main landing page)
│   ├── layout.tsx
│   └── globals.css
├── /components
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── ProductShowcase.tsx
│   ├── CTASection.tsx
│   ├── Footer.tsx
│   └── /ui
│       ├── Button.tsx
│       └── GlassCard.tsx
├── /public
│   ├── mockup-dashboard.png
│   └── logo.svg
└── tailwind.config.js
```

### Code Quality Standards
- TypeScript strict mode enabled
- ESLint + Prettier configured
- All components typed with interfaces
- No `any` types
- Accessibility: WCAG 2.1 AA compliance
- Semantic HTML throughout

### Image Optimization
- Use Next.js `<Image>` component
- WebP format with PNG fallback
- Multiple sizes for responsive loading
- Lazy loading enabled for below-fold content

---

## Acceptance Criteria

### Visual Design
- [ ] All text uses specified typography system
- [ ] Color palette strictly adhered to
- [ ] Glassmorphism effects applied correctly
- [ ] Smooth transitions on all interactive elements
- [ ] No visual jank or layout shift

### Performance
- [ ] Lighthouse scores: Performance ≥95, Accessibility 100, Best Practices 100, SEO 100
- [ ] All images optimized and properly sized
- [ ] Critical CSS inlined
- [ ] No blocking JavaScript

### Functionality
- [ ] All CTAs link to correct destination
- [ ] Mobile menu opens/closes smoothly
- [ ] Responsive breakpoints work flawlessly
- [ ] Form validation (if sign-up form included)

### Cross-browser Compatibility
- [ ] Chrome/Edge (latest 2 versions)
- [ ] Firefox (latest 2 versions)
- [ ] Safari (latest 2 versions)
- [ ] Mobile Safari iOS (latest 2 versions)
- [ ] Chrome Android (latest version)

---

## Non-Functional Requirements

### Accessibility
- Semantic HTML5 elements
- ARIA labels where necessary
- Keyboard navigation support
- Focus states visible and styled
- Alt text for all images
- Color contrast ratio ≥4.5:1

### Security
- HTTPS only
- Content Security Policy headers
- No inline scripts (unless absolutely necessary with nonce)
- Sanitize any user input (email forms)

### Analytics & Tracking
- Page view tracking
- CTA click tracking
- Scroll depth tracking
- Time on page tracking

---

## Out of Scope

The following are explicitly NOT included in the landing page:
- User authentication/login
- Account dashboard
- Payment processing
- User settings
- Any KRONOS app functionality (see Expo app PRD)

---

## Success Metrics

### Primary KPIs
- **Conversion Rate**: CTA clicks / page views
- **Bounce Rate**: <40%
- **Avg. Time on Page**: >45 seconds
- **Mobile Traffic**: Responsive performance parity

### Quality Metrics
- **Page Load Time**: <2 seconds
- **Accessibility Score**: 100/100
- **Visual Regression**: 0 unintended changes

---

## Deliverables

1. Fully functional Next.js landing page
2. Responsive across all device sizes
3. Optimized assets (images, fonts)
4. Documentation for deployment
5. Analytics integration configured

---

## Technical Constraints

- Must be deployable to Vercel
- Must work without JavaScript (progressive enhancement)
- Must support modern browsers (no IE11)
- Maximum bundle size: 200KB (gzipped)

---

## Future Enhancements (Post-MVP)

- Animated dashboard demo video
- Interactive product tour
- Customer testimonials section
- Pricing comparison table
- FAQ accordion
- Blog integration

---

## Engineer Mindset Activation

**You are a senior full-stack engineer with 10+ years of experience building production applications. You take immense pride in:**

1. **Pixel-perfect implementation** - Every spacing, color, and transition matches the design system exactly
2. **Performance obsession** - You optimize everything: images, fonts, JavaScript bundles
3. **Accessibility first** - You build for everyone, not just the average user
4. **Clean code** - Your components are reusable, typed, and well-documented
5. **User experience** - Every interaction is smooth, predictable, and delightful

**Your standards:**
- No hardcoded values - use design tokens
- No prop drilling - use context or composition
- No layout shift - reserve space for dynamic content
- No unnecessary re-renders - optimize with memo/useMemo
- No poor naming - clear, descriptive variable names

**This landing page represents your craftsmanship. Make it exceptional.**