"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { createTimeline, safeGsapSelect } from "@/lib/gsap";
import { motion as motionConfig } from "@/lib/motion";
import { useMotion } from "@/components/providers/motion-provider";

/**
 * GSAP Hero Sequence #1
 * Quick entrance animation (≤900ms)
 * - Headshot mask-reveal
 * - Gradient ring spin-in
 * - Per-word headline rise
 * - Ends idle (no CPU churn)
 */
export function HeroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const { reducedMotion, canAnimate } = useMotion();

  useEffect(() => {
    if (!canAnimate || reducedMotion || !containerRef.current) {
      // Show content immediately if animations are disabled
      if (containerRef.current) {
        gsap.set(containerRef.current.querySelectorAll(".hero-element"), {
          opacity: 1,
          y: 0,
          scale: 1,
          clearProps: "all",
        });
      }
      return;
    }

    // Create timeline with 900ms total duration
    const tl = createTimeline({
      paused: true,
      onComplete: () => {
        // Clear properties after animation to prevent memory leaks
        tl.kill();
        timelineRef.current = null;
      },
    });

    timelineRef.current = tl;

    // Set initial states
    gsap.set(".hero-photo", { scale: 0.8, opacity: 0 });
    gsap.set(".hero-ring", { rotation: -180, scale: 0, opacity: 0 });
    gsap.set(".hero-h1 .word", { y: 30, opacity: 0 });
    gsap.set(".hero-subtitle", { y: 20, opacity: 0 });
    gsap.set(".hero-cta", { y: 20, opacity: 0 });
    gsap.set(".hero-metrics", { y: 15, opacity: 0 });

    // Animation sequence
    tl
      // Photo reveal with mask (0-0.3s)
      .to(".hero-photo", {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: motionConfig.easing.gsap.sharp,
        clearProps: "transform",
      })
      // Ring spin-in (0.1-0.4s)
      .to(
        ".hero-ring",
        {
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: motionConfig.easing.gsap.elastic,
        },
        "-=0.3"
      )
      // Headline per-word rise (0.3-0.6s)
      .to(
        ".hero-h1 .word",
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.03,
          ease: motionConfig.easing.gsap.sharp,
        },
        "-=0.2"
      )
      // Subtitle (0.5-0.7s)
      .to(
        ".hero-subtitle",
        {
          y: 0,
          opacity: 1,
          duration: 0.25,
          ease: motionConfig.easing.gsap.smooth,
        },
        "-=0.1"
      )
      // Metrics row (0.6-0.8s)
      .to(
        ".hero-metrics",
        {
          y: 0,
          opacity: 1,
          duration: 0.25,
          stagger: 0.05,
          ease: motionConfig.easing.gsap.smooth,
        },
        "-=0.1"
      )
      // CTAs (0.7-0.9s)
      .to(
        ".hero-cta",
        {
          y: 0,
          opacity: 1,
          duration: 0.25,
          stagger: 0.05,
          ease: motionConfig.easing.gsap.smooth,
        },
        "-=0.1"
      );

    // Play timeline
    tl.play();

    // Cleanup
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  }, [canAnimate, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className="hero-sequence-container"
      aria-hidden="true"
    />
  );
}

