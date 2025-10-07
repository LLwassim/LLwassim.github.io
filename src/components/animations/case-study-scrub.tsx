"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion as motionConfig } from "@/lib/motion";
import { useMotion } from "@/components/providers/motion-provider";
import { cn } from "@/lib/utils";

interface CaseStudyScrubProps {
  children: React.ReactNode;
  className?: string;
  metrics?: Array<{ value: string; label: string; prefix?: string }>;
}

/**
 * GSAP Case Study Scrub #2
 * Pinned section with scroll-driven animation (<120vh)
 * - Pin the case-study hero
 * - Scrub progress bar
 * - Image scale 1.08→1
 * - Headline clip-path open
 * - Metrics count up on first view
 */
export function CaseStudyScrub({
  children,
  className,
  metrics = [],
}: CaseStudyScrubProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasCountedRef = useRef(false);
  const { reducedMotion, canAnimate } = useMotion();

  useEffect(() => {
    if (!canAnimate || reducedMotion || !containerRef.current) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;

    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=120%", // Constrained to 120vh
        scrub: motionConfig.scroll.scrubSmooth,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Update progress bar
          const progress = self.progress * 100;
          gsap.set(".case-progress-bar", {
            scaleX: progress / 100,
            transformOrigin: "left center",
          });
        },
        onEnter: () => {
          // Count up metrics on first view
          if (!hasCountedRef.current && metrics.length > 0) {
            hasCountedRef.current = true;

            metrics.forEach((metric, index) => {
              const element = container.querySelector(`.metric-value-${index}`);
              if (element) {
                const value = parseFloat(metric.value.replace(/[^0-9.-]/g, ""));
                if (!isNaN(value)) {
                  gsap.fromTo(
                    element,
                    { textContent: 0 },
                    {
                      textContent: value,
                      duration: 1.2,
                      ease: motionConfig.easing.gsap.sharp,
                      snap: { textContent: 1 },
                      onUpdate: function () {
                        const current = Math.round(
                          this.targets()[0].textContent
                        );
                        element.textContent = metric.prefix
                          ? `${metric.prefix}${current}`
                          : current.toString();
                      },
                    }
                  );
                }
              }
            });
          }
        },
      },
    });

    timelineRef.current = tl;

    // Image scale animation (1.08 → 1)
    tl.fromTo(
      ".case-image",
      { scale: 1.08, opacity: 0.8 },
      { scale: 1, opacity: 1, ease: "none" }
    );

    // Headline clip-path animation
    tl.fromTo(
      ".case-headline",
      { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
      { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", ease: "none" },
      0
    );

    // Subtitle fade
    tl.fromTo(
      ".case-subtitle",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, ease: "none" },
      0.3
    );

    // Skip animation button handler
    const skipButton = container.querySelector(".skip-animation");
    if (skipButton) {
      skipButton.addEventListener("click", () => {
        if (timelineRef.current) {
          const st = timelineRef.current.scrollTrigger;
          if (st) {
            window.scrollTo({
              top: st.end,
              behavior: "smooth",
            });
          }
        }
      });
    }

    // Cleanup
    return () => {
      if (timelineRef.current) {
        timelineRef.current.scrollTrigger?.kill();
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  }, [canAnimate, reducedMotion, metrics]);

  if (reducedMotion) {
    // Return content without animations
    return (
      <div className={cn("case-study-content", className)}>{children}</div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("case-study-scrub relative", className)}
    >
      {/* Progress bar */}
      <div className="case-progress fixed top-0 left-0 right-0 h-1 bg-muted z-50">
        <div className="case-progress-bar h-full bg-gradient-to-r from-[var(--gradient-1)] via-[var(--gradient-2)] to-[var(--gradient-3)]" />
      </div>

      {/* Skip button for accessibility */}
      <button
        className="skip-animation skip-link"
        aria-label="Skip animation and continue scrolling"
      >
        Skip animation
      </button>

      {children}
    </div>
  );
}


