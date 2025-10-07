"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollProgressProps {
  className?: string;
  height?: number;
  gradient?: boolean;
}

export function ScrollProgress({
  className,
  height = 3,
  gradient = true,
}: ScrollProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const currentProgress =
        scrollHeight > 0 ? (scrollPosition / scrollHeight) * 100 : 0;
      setProgress(currentProgress);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-transparent",
        className
      )}
      style={{ height: `${height}px` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    >
      <div
        className={cn(
          "h-full origin-left transition-transform duration-100 ease-out",
          gradient
            ? "bg-gradient-to-r from-[var(--gradient-1)] via-[var(--gradient-2)] to-[var(--gradient-3)]"
            : "bg-primary"
        )}
        style={{
          transform: `scaleX(${progress / 100})`,
          transformOrigin: "left center",
        }}
      />
    </div>
  );
}


