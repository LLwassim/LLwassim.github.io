/**
 * GSAP Configuration and Utilities
 * Centralized GSAP setup with performance optimizations
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "./motion";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // Configure GSAP defaults
  gsap.config({
    force3D: true,
    nullTargetWarn: false,
  });

  // Set default ease
  gsap.defaults({
    ease: motion.easing.gsap.smooth,
    duration: motion.duration.normal / 1000,
  });
}

/**
 * Lenis scroll integration with ScrollTrigger
 */
export const setupLenisScrollTrigger = (lenis: any) => {
  if (typeof window === "undefined") return;

  // Update ScrollTrigger on Lenis scroll
  lenis.on("scroll", ScrollTrigger.update);

  // Add Lenis's requestAnimationFrame method to gsap ticker
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  // Remove default lag smoothing
  gsap.ticker.lagSmoothing(0);

  // Setup scrollerProxy for ScrollTrigger
  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value?: number) {
      if (arguments.length) {
        lenis.scroll = value!;
      }
      return lenis.scroll;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: "transform",
  });

  // Refresh ScrollTrigger
  ScrollTrigger.refresh();
};

/**
 * Kill all GSAP animations and ScrollTriggers
 * Used for cleanup on route changes
 */
export const killAllAnimations = () => {
  if (typeof window === "undefined") return;

  // Kill all tweens
  gsap.killTweensOf("*");

  // Kill all ScrollTriggers
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  // Clear all delayed calls
  gsap.globalTimeline.clear();
};

/**
 * Performance monitor for GSAP animations
 */
export const monitorPerformance = () => {
  if (typeof window === "undefined" || process.env.NODE_ENV !== "development")
    return;

  let lastTime = performance.now();
  let frames = 0;

  gsap.ticker.add(() => {
    frames++;
    const currentTime = performance.now();

    if (currentTime >= lastTime + 1000) {
      const fps = Math.round((frames * 1000) / (currentTime - lastTime));

      if (fps < 50) {
        console.warn(`[GSAP Performance] Low FPS detected: ${fps}`);
      }

      frames = 0;
      lastTime = currentTime;
    }
  });
};

/**
 * Check if device can handle animations
 */
export const canHandleAnimations = (): boolean => {
  if (typeof window === "undefined") return true;

  // Check for reduced motion preference
  if (window.matchMedia(motion.breakpoint.reducedMotion).matches) {
    return false;
  }

  // Check device memory (if available)
  const memory = (navigator as any).deviceMemory;
  if (memory && memory < 4) {
    return false;
  }

  // Check connection speed
  const connection = (navigator as any).connection;
  if (connection && connection.saveData) {
    return false;
  }

  return true;
};

/**
 * GSAP Timeline factory with performance defaults
 */
export const createTimeline = (options = {}) => {
  return gsap.timeline({
    defaults: {
      ease: motion.easing.gsap.smooth,
      duration: motion.duration.normal / 1000,
    },
    ...options,
  });
};

/**
 * Safe GSAP selector that handles SSR
 */
export const safeGsapSelect = (selector: string): Element[] => {
  if (typeof document === "undefined") return [];
  return gsap.utils.toArray(selector) as Element[];
};
