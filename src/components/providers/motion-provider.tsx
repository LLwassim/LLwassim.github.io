"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import { monitorPerformance, canHandleAnimations } from "@/lib/gsap";

interface MotionContextType {
  reducedMotion: boolean;
  canAnimate: boolean;
  viewTransitionsSupported: boolean;
}

const MotionContext = createContext<MotionContextType>({
  reducedMotion: false,
  canAnimate: true,
  viewTransitionsSupported: false,
});

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [canAnimate, setCanAnimate] = useState(true);
  const [viewTransitionsSupported, setViewTransitionsSupported] =
    useState(false);

  useEffect(() => {
    // Check reduced motion preference
    setReducedMotion(prefersReducedMotion());

    // Check if device can handle animations
    setCanAnimate(canHandleAnimations());

    // Check View Transitions API support
    setViewTransitionsSupported("startViewTransition" in document);

    // Monitor performance in development
    if (process.env.NODE_ENV === "development") {
      monitorPerformance();
    }

    // Listen for preference changes
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      setCanAnimate(!e.matches && canHandleAnimations());
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <MotionContext.Provider
      value={{ reducedMotion, canAnimate, viewTransitionsSupported }}
    >
      {children}
    </MotionContext.Provider>
  );
}

export const useMotion = () => useContext(MotionContext);


