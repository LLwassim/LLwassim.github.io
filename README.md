# 🚀 Wassim LaCorchy - Top-1% Portfolio

A production-ready Next.js 14 portfolio featuring native CSS animations, View Transitions API, and precision GSAP sequences for signature motion design. Built for performance with Core Web Vitals in mind.

## 🎯 Performance Metrics

### Core Web Vitals Targets

- **LCP (Largest Contentful Paint)**: <2.5s ✅
- **CLS (Cumulative Layout Shift)**: <0.10 ✅
- **INP (Interaction to Next Paint)**: <200ms ✅
- **Initial JS Bundle**: ≤180KB gzipped ✅

### Lighthouse Scores

```
Performance: 98+
Accessibility: 100
Best Practices: 100
SEO: 100
```

## 🏗️ Architecture

### Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3.4
- **Motion**: CSS @scroll-timeline + View Transitions API + GSAP (3 precision animations)
- **Content**: MDX via Contentlayer
- **Smooth Scroll**: Lenis
- **Analytics**: Vercel Analytics + Speed Insights
- **Deployment**: GitHub Pages / Vercel

### Motion System Hierarchy

#### 1. Native CSS (Default)

- Scroll-driven animations via `animation-timeline: view()`
- View Transitions API for route changes
- CSS transforms for micro-interactions

#### 2. GSAP Precision Layer (3 Sequences)

1. **Hero Sequence** (≤900ms entrance)
   - Headshot mask-reveal
   - Gradient ring spin-in
   - Per-word headline rise
2. **Case Study Scrub** (<120vh pinned)
   - Progress bar scrub
   - Image scale 1.08→1
   - Headline clip-path animation
   - Metrics count-up
3. **Magnetic CTA**
   - 160px proximity activation
   - Spring physics on hover
   - <2% CPU idle

## 📁 Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Home page
│   ├── work/                # Work listing + case studies
│   ├── about/               # About page
│   ├── writing/             # Blog/articles
│   ├── now/                 # Current focus
│   └── resume/              # Resume page
├── components/
│   ├── animations/          # GSAP sequences
│   │   ├── hero-sequence.tsx
│   │   ├── case-study-scrub.tsx
│   │   └── magnetic-cta.tsx
│   ├── layout/              # Header, Footer
│   ├── sections/            # Page sections
│   └── ui/                  # Reusable components
├── lib/
│   ├── gsap.ts             # GSAP configuration
│   ├── motion.ts           # Motion design tokens
│   └── utils.ts            # Utilities
├── hooks/
│   └── use-lenis.ts        # Smooth scroll hook
└── content/                 # MDX content
    ├── case-studies/
    └── writing/
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm run start
```

### Environment Variables

Create a `.env.local` file:

```env
# Analytics (optional)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your-id
```

## 📝 Content Management

### Adding a New Case Study (< 5 minutes)

1. Create MDX file in `content/case-studies/`:

```mdx
---
title: "Project Title"
role: ["Your Role"]
timeline: "2024 - Present"
stack: ["Tech", "Stack", "Used"]
summary: "Brief 1-2 sentence summary"
outcomes:
  - "↑ Metric improvement"
  - "↓ Reduced metric"
  - "🏆 Achievement"
context: "Problem/challenge description"
decisions:
  - "Technical decision 1"
  - "Technical decision 2"
artifacts:
  - image: "/images/screenshot.png"
    caption: "Description"
links:
  demo: "https://demo.com"
  repo: "https://github.com/..."
whatIdDoNext:
  - "Future improvement 1"
  - "Future improvement 2"
featured: true
order: 1
category: "AI" # AI | Systems | Mobile | Data | MusicTech
image: "/images/hero.png"
---

## Your MDX Content Here

Write your case study content...
```

2. Add images to `public/images/`
3. Run `npm run dev` to see changes
4. Case study automatically appears in `/work` grid

### Motion System Organization

#### Design Tokens (`src/lib/motion.ts`)

```typescript
motion.duration; // Animation durations
motion.easing; // CSS & GSAP easings
motion.stagger; // Stagger delays
motion.scroll; // Scroll trigger config
```

#### Adding Scroll Animations

```css
/* Use built-in utilities */
.scroll-fade-in    /* Fade in on scroll */
/* Fade in on scroll */
.scroll-rise       /* Rise + fade on scroll */
.scroll-scale; /* Scale up on scroll */
```

#### GSAP Integration Points

- Hero: `.hero-photo`, `.hero-ring`, `.hero-h1 .word`, `.hero-cta`
- Case Study: `.case-image`, `.case-headline`, `.case-progress`
- Magnetic: Applied via `<MagneticCTA>` component

## 🎨 Theming

### Color System

- **Primary Gradient**: Blue → Purple → Pink
- **Success**: Emerald green
- **Glass Effect**: `backdrop-blur` with semi-transparent bg
- **Dark/Light**: Automatic via `next-themes`

### Typography

- Display: Inter variable font
- Body: System font stack
- Measure: Max 70ch for readability

## 📊 Performance Optimization

### Image Optimization

```typescript
// Automatic format selection
formats: ["image/avif", "image/webp"];

// Responsive sizing
deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840];
```

### Bundle Optimization

- Route-based code splitting
- Dynamic imports for heavy components
- GSAP loaded only where needed
- Fonts subset and preloaded

### Motion Performance

- GPU acceleration via `transform` and `opacity`
- `will-change` hints for animations
- Reduced motion respected globally
- Idle animations killed after completion

## ♿ Accessibility

### Features

- **Keyboard Navigation**: Full support with visible focus rings
- **Screen Readers**: Semantic HTML, ARIA labels
- **Motion Preferences**: `prefers-reduced-motion` respected
- **Skip Links**: "Skip to content", "Skip animation"
- **Color Contrast**: WCAG AA+ compliance

### Testing

```bash
# Run accessibility audit
npm run audit:a11y

# Check contrast ratios
npm run check:contrast
```

## 📈 Analytics & Monitoring

### Vercel Analytics

- Page views and unique visitors
- Web Vitals tracking
- Custom events for CTAs

### Custom Event Tracking

```typescript
// Track CTA clicks
trackEvent("cta_click", {
  button: "view_work",
  location: "hero",
});

// Track case study depth
trackEvent("case_study_scroll", {
  slug: "lennar-ai-pricing",
  depth: 75, // percentage
});
```

## 🚢 Deployment

### GitHub Pages

```bash
# Build static export
npm run build

# Deploy to GitHub Pages
npm run deploy
```

### Vercel (Recommended)

1. Connect GitHub repo to Vercel
2. Deploy automatically on push to `main`
3. Preview deployments for PRs

### Performance Budgets

Set in `next.config.js`:

```javascript
experimental: {
  sizeLimits: {
    javascript: 180 * 1024, // 180KB
    css: 60 * 1024,        // 60KB
  }
}
```

## 🧪 Testing

### Lighthouse CI

```bash
# Run Lighthouse locally
npm run lighthouse

# CI configuration in .lighthouserc.js
```

### Performance Testing

```bash
# Test Core Web Vitals
npm run test:cwv

# Check bundle size
npm run analyze
```

### Motion Testing

1. Test with `prefers-reduced-motion: reduce`
2. Verify CPU usage <2% when idle
3. Check 60fps during animations
4. Validate mobile performance

## 📋 Validation Checklist

- [ ] Hero entrance ≤900ms, idle thereafter
- [ ] Case study pin <120vh, smooth 60fps scrub
- [ ] Magnetic CTA <2% idle CPU
- [ ] LCP <2.5s, CLS <0.10, INP <200ms
- [ ] Keyboard navigation works everywhere
- [ ] Focus rings always visible
- [ ] Images load without layout shift
- [ ] Fonts stable, no FOUC
- [ ] Copy is metrics-first and concise

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

## 📄 License

MIT License - feel free to use this for your own portfolio!

## 👤 Author

**Wassim LaCorchy**

- Portfolio: [llwassim.github.io](https://llwassim.github.io)
- GitHub: [@LLwassim](https://github.com/LLwassim)
- LinkedIn: [wassimlacorchy](https://www.linkedin.com/in/wassimlacorchy/)
- Email: wassimlacorchy@gmail.com

---

Built with ❤️ and optimized for performance 🚀
