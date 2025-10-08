"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/motion";

interface Recommendation {
  quote: string;
  author: string;
  title: string;
}

interface RecommendationsRotatorProps {
  recommendations: Recommendation[];
  interval?: number; // milliseconds between rotations (default: 7000)
  className?: string;
}

/**
 * Premium auto-rotating recommendations component
 *
 * Features:
 * - Smooth cross-fade transitions between quotes
 * - Auto-pause on hover for accessibility
 * - Progress dots indicator
 * - Respects prefers-reduced-motion
 * - ARIA-live announcements for screen readers
 *
 * Usage:
 * <RecommendationsRotator recommendations={[
 *   { quote: "...", author: "Name", title: "Title" }
 * ]} />
 */
export function RecommendationsRotator({
  recommendations,
  interval = 7000,
  className,
}: RecommendationsRotatorProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = prefersReducedMotion();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotation logic
  useEffect(() => {
    if (shouldReduceMotion || isPaused || recommendations.length <= 1) {
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % recommendations.length);
    }, interval);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPaused, shouldReduceMotion, recommendations.length, interval]);

  const currentRecommendation = recommendations[currentIndex];

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Quote container with fixed height to prevent layout shift */}
      <div
        className="relative min-h-[280px] sm:min-h-[260px]"
        aria-live="polite"
        aria-atomic="true"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
          >
            <blockquote className="relative max-w-4xl mx-auto">
              {/* Opening quote mark */}
              <div className="text-6xl sm:text-7xl text-primary/20 leading-none select-none text-left">
                "
              </div>

              {/* Quote text */}
              <p className="text-lg sm:text-xl text-muted-foreground italic leading-relaxed px-4 relative text-left">
                {currentRecommendation.quote}
              </p>

              {/* Closing quote mark */}
              <div className="text-6xl sm:text-7xl text-primary/20 leading-none text-right select-none mb-4">
                "
              </div>

              {/* Author info */}
              <footer className="flex flex-col gap-1 text-sm text-center">
                <span className="font-semibold text-foreground">
                  — {currentRecommendation.author}
                </span>
                <span className="text-muted-foreground">
                  {currentRecommendation.title}
                </span>
              </footer>
            </blockquote>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress dots - only show if multiple recommendations and motion enabled */}
      {!shouldReduceMotion && recommendations.length > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          {recommendations.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "bg-primary w-6"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
              aria-label={`Go to recommendation ${index + 1}`}
              aria-current={index === currentIndex ? "true" : "false"}
            />
          ))}
        </div>
      )}
    </div>
  );
}
