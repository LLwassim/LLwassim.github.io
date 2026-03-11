/**
 * Motion Design Tokens
 * Centralized animation configuration for consistency
 */

export const motion = {
  // Duration tokens (in ms for JS, seconds for CSS)
  duration: {
    instant: 100,
    fast: 200,
    normal: 300,
    slow: 500,
    slower: 800,
    heroEntrance: 900,
    pageTransition: 600,
  },

  // Easing functions
  easing: {
    // CSS easings
    css: {
      smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      elastic: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    },
    // GSAP easings
    gsap: {
      smooth: "power2.inOut",
      bounce: "back.out(1.7)",
      elastic: "elastic.out(1, 0.3)",
      sharp: "power3.out",
      expo: "expo.out",
    },
  },

  // Stagger delays
  stagger: {
    fast: 50,
    normal: 100,
    slow: 150,
    cards: 200,
  },

  // Scroll-driven animation config
  scroll: {
    triggerStart: "top 80%",
    triggerEnd: "bottom 20%",
    scrubSmooth: 1.2,
    pinSpacing: true,
  },

  // Responsive breakpoints for motion
  breakpoint: {
    reducedMotion: "(prefers-reduced-motion: reduce)",
    mobile: 768,
    tablet: 1024,
    desktop: 1440,
  },

  // Performance thresholds
  performance: {
    maxAnimatingElements: 20,
    cpuIdleThreshold: 2, // Max % CPU usage when idle
    longTaskThreshold: 50, // ms
  },
} as const;

/**
 * Check if reduced motion is preferred
 */
export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia(motion.breakpoint.reducedMotion).matches;
};

/**
 * Get duration value based on motion preference
 */
export const getMotionDuration = (duration: number): number => {
  return prefersReducedMotion() ? 0 : duration;
};

/**
 * CSS Custom Properties for animations
 * These are injected into :root
 */
export const cssMotionVars = `
  --motion-duration-instant: ${motion.duration.instant}ms;
  --motion-duration-fast: ${motion.duration.fast}ms;
  --motion-duration-normal: ${motion.duration.normal}ms;
  --motion-duration-slow: ${motion.duration.slow}ms;
  --motion-duration-slower: ${motion.duration.slower}ms;
  --motion-easing-smooth: ${motion.easing.css.smooth};
  --motion-easing-bounce: ${motion.easing.css.bounce};
  --motion-easing-elastic: ${motion.easing.css.elastic};
  --motion-easing-sharp: ${motion.easing.css.sharp};
`;
