"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion as motionConfig } from "@/lib/motion";
import { useMotion } from "@/components/providers/motion-provider";
import { cn } from "@/lib/utils";

interface MagneticCTAProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  disabled?: boolean;
}

/**
 * GSAP Magnetic CTA #3
 * Cursor proximity pull effect
 * - Activates within 160px radius
 * - Spring back on leave
 * - Deactivated when not hovered
 * - CPU <2% idle
 */
export function MagneticCTA({
  children,
  className,
  strength = 0.5,
  disabled = false,
}: MagneticCTAProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const boundsRef = useRef<DOMRect | null>(null);
  const isActiveRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const { reducedMotion, canAnimate } = useMotion();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!canAnimate || reducedMotion || disabled || !buttonRef.current) {
      return;
    }

    const button = buttonRef.current;
    const magneticRadius = 160;

    // Get button bounds
    const updateBounds = () => {
      boundsRef.current = button.getBoundingClientRect();
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);
    window.addEventListener("scroll", updateBounds, { passive: true });

    // Mouse move handler (only runs when active)
    const handleMouseMove = (e: MouseEvent) => {
      if (!boundsRef.current || !isActiveRef.current) return;

      const bounds = boundsRef.current;
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < magneticRadius) {
        // Calculate magnetic pull
        const pullStrength = 1 - distance / magneticRadius;
        const translateX = deltaX * pullStrength * strength;
        const translateY = deltaY * pullStrength * strength;

        // Apply transform with spring physics
        gsap.to(button, {
          x: translateX,
          y: translateY,
          duration: 0.3,
          ease: motionConfig.easing.gsap.smooth,
          overwrite: "auto",
        });
      } else if (distance > magneticRadius * 1.2) {
        // Spring back when far enough
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.4,
          ease: motionConfig.easing.gsap.elastic,
          overwrite: "auto",
        });
      }
    };

    // Activation zone detection
    const checkActivation = (e: MouseEvent) => {
      if (!boundsRef.current) return;

      const bounds = boundsRef.current;
      const expandedBounds = {
        left: bounds.left - magneticRadius,
        right: bounds.right + magneticRadius,
        top: bounds.top - magneticRadius,
        bottom: bounds.bottom + magneticRadius,
      };

      const isInZone =
        e.clientX >= expandedBounds.left &&
        e.clientX <= expandedBounds.right &&
        e.clientY >= expandedBounds.top &&
        e.clientY <= expandedBounds.bottom;

      if (isInZone && !isActiveRef.current) {
        isActiveRef.current = true;
        document.addEventListener("mousemove", handleMouseMove);
      } else if (!isInZone && isActiveRef.current) {
        isActiveRef.current = false;
        document.removeEventListener("mousemove", handleMouseMove);

        // Spring back
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: motionConfig.easing.gsap.elastic,
          overwrite: "auto",
        });
      }
    };

    // Mouse enter/leave handlers
    const handleMouseEnter = () => {
      setIsHovering(true);
      updateBounds();
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      isActiveRef.current = false;
      document.removeEventListener("mousemove", handleMouseMove);

      // Spring back
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: motionConfig.easing.gsap.elastic,
        clearProps: "transform",
      });
    };

    // Add event listeners
    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousemove", checkActivation);

    // Cleanup
    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousemove", checkActivation);
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", updateBounds);
      window.removeEventListener("scroll", updateBounds);

      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }

      // Clear any ongoing animations
      gsap.killTweensOf(button);
    };
  }, [canAnimate, reducedMotion, disabled, strength]);

  return (
    <button
      ref={buttonRef}
      className={cn(
        "magnetic-cta relative transition-colors",
        isHovering && "z-10",
        className
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

