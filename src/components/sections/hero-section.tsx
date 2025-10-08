"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Github, Linkedin, Download } from "lucide-react";
import { HeroSequence } from "@/components/animations/hero-sequence";
import { MagneticCTA } from "@/components/animations/magnetic-cta";
import { HeroBackground } from "@/components/ui/hero-background";
import { HeroTitle } from "@/components/ui/hero-title";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const scrollToWork = () => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Soft off-white background in light mode, dark background in dark mode */}
      <div className="absolute inset-0 bg-[#fafafa] dark:bg-background" />

      {/* Clean gradient for dark mode only */}
      <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-background dark:via-background dark:to-primary/5" />

      {/* Advanced animated background */}
      <HeroBackground />

      {/* Grid pattern - subtle animation in light mode */}
      <div className="absolute inset-0 z-[1]">
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.015] animate-pulse"
          style={{
            backgroundImage: `linear-gradient(to right, hsl(217 91% 60% / 0.3) 1px, transparent 1px),
                             linear-gradient(to bottom, hsl(217 91% 60% / 0.3) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
            animationDuration: "4s",
          }}
        />
      </div>

      <div className="container relative z-10 text-center px-4">
        {/* Profile photo with gradient ring and subtle shadow in light mode - smaller on mobile */}
        <div className="hero-photo relative inline-block mb-6 sm:mb-8 hero-element">
          {/* Soft glow behind photo in light mode for depth */}
          <div className="absolute inset-0 rounded-full bg-primary/5 blur-2xl scale-110 dark:opacity-0" />

          <div className="hero-ring absolute inset-0 rounded-full bg-gradient-to-r from-[var(--gradient-1)] via-[var(--gradient-2)] to-[var(--gradient-3)] p-[3px] animate-spin-slow shadow-xl shadow-primary/10 dark:shadow-primary/5">
            <div className="h-full w-full rounded-full bg-background" />
          </div>
          <Image
            src="/images/WassimLaCorchyHeadShot.jpg"
            alt="Wassim LaCorchy"
            width={180}
            height={180}
            className="relative rounded-full object-cover shadow-2xl shadow-black/10 dark:shadow-black/50 w-32 h-32 sm:w-44 sm:h-44"
            priority
          />
        </div>

        {/* Headline - premium animated title */}
        <div className="relative hero-element mb-6">
          <HeroTitle className="hero-h1" />
        </div>

        {/* Subtitle */}
        <p className="hero-subtitle text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto hero-element">
          Building fast, reliable, human-centered products
        </p>

        {/* Metrics row */}
        <div className="hero-metrics flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 hero-element">
          <div className="glass px-5 py-2.5 rounded-full border border-primary/20 shadow-sm hover:shadow-md transition-shadow">
            <span className="font-semibold bg-hero bg-clip-text text-transparent">
              Principal SWE
            </span>{" "}
            at Lennar
          </div>
          <div className="glass px-5 py-2.5 rounded-full border border-primary/20 shadow-sm hover:shadow-md transition-shadow">
            <span className="font-semibold bg-hero bg-clip-text text-transparent">
              Co-Founder
            </span>{" "}
            Based Music
          </div>
          <div className="glass px-5 py-2.5 rounded-full border border-emerald-500/20 shadow-sm hover:shadow-md transition-shadow">
            <span className="font-semibold bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent">
              $36M+
            </span>{" "}
            Revenue Impact
          </div>
        </div>

        {/* CTAs - Download Resume first on mobile, View Work first on desktop */}
        <div className="hero-cta flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 hero-element max-w-md sm:max-w-none mx-auto">
          {/* Download Resume - first on mobile */}
          <MagneticCTA className="order-1 sm:order-2">
            <a
              href="/XDevCalibiri.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 glass rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
            >
              <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              View Resume
            </a>
          </MagneticCTA>

          {/* View Work - second on mobile, first on desktop - with bouncing arrow */}
          <MagneticCTA className="order-2 sm:order-1">
            <Link
              href="#work"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-hero text-white rounded-xl font-medium shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 w-full sm:w-auto"
            >
              View Work
              <ArrowDown className="w-4 h-4 animate-bounce group-hover:animate-none group-hover:translate-y-1 transition-transform" />
            </Link>
          </MagneticCTA>
        </div>

        {/* Social links */}
        <div className="hero-cta flex justify-center gap-6 hero-element">
          <a
            href="https://github.com/LLwassim"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 glass rounded-full shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="GitHub Profile"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/wassimlacorchy/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 glass rounded-full shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Scroll indicator - hidden on mobile, visible on larger screens */}
      <div className="hidden sm:flex absolute bottom-8 left-0 right-0 justify-center z-10">
        <button
          onClick={scrollToWork}
          className="p-2 animate-bounce hover:scale-110 transition-transform"
          aria-label="Scroll to work section"
        >
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </button>
      </div>

      {/* Initialize hero animation */}
      <HeroSequence />
    </section>
  );
}
