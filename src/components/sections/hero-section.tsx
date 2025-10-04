"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Github, Linkedin, Download } from "lucide-react";
import { HeroSequence } from "@/components/animations/hero-sequence";
import { MagneticCTA } from "@/components/animations/magnetic-cta";
import { HeroBackground } from "@/components/ui/hero-background";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const scrollToWork = () => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />

      {/* Advanced animated background */}
      <HeroBackground />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02] z-[1]"
        style={{
          backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px),
                           linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container relative z-10 text-center">
        {/* Profile photo with gradient ring */}
        <div className="hero-photo relative inline-block mb-8 hero-element">
          <div className="hero-ring absolute inset-0 rounded-full bg-gradient-to-r from-[var(--gradient-1)] via-[var(--gradient-2)] to-[var(--gradient-3)] p-[3px] animate-spin-slow">
            <div className="h-full w-full rounded-full bg-background" />
          </div>
          <Image
            src="/images/WassimLaCorchyHeadShot.jpg"
            alt="Wassim LaCorchy"
            width={180}
            height={180}
            className="relative rounded-full object-cover"
            priority
          />
        </div>

        {/* Headline with advanced animations */}
        <div className="relative hero-element mb-6">
          {/* Sparkle particles around text */}
          <div className="absolute inset-0 overflow-visible">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-sparkle"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${20 + (i % 3) * 30}%`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>

          <h1 className="relative text-5xl md:text-7xl font-bold">
            {/* Glowing background text */}
            <span className="absolute inset-0 blur-xl opacity-50 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-flow">
              AI & Systems Architect
            </span>

            {/* Main animated gradient text */}
            <span className="relative inline-block bg-gradient-to-r from-blue-400 via-purple-500 via-pink-500 to-cyan-400 bg-clip-text text-transparent animate-gradient-flow bg-[length:200%_auto]">
              <span className="inline-block hover:scale-110 transition-transform duration-300">
                AI
              </span>
              <span className="inline-block mx-2">&</span>
              <span className="inline-block hover:scale-110 transition-transform duration-300">
                Systems
              </span>
              <span className="inline-block mx-2"></span>
              <span className="inline-block hover:scale-110 transition-transform duration-300">
                Architect
              </span>
            </span>

            {/* Holographic shimmer overlay */}
            <span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 animate-shimmer"
              style={{
                backgroundSize: "200% 100%",
                WebkitMaskImage:
                  "linear-gradient(90deg, transparent, black 30%, black 70%, transparent)",
                maskImage:
                  "linear-gradient(90deg, transparent, black 30%, black 70%, transparent)",
              }}
            >
              AI & Systems Architect
            </span>
          </h1>

          {/* Underline effect */}
          <div className="relative mt-2 h-1 mx-auto max-w-3xl overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-flow bg-[length:200%_auto]" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer" />
          </div>
        </div>

        {/* Subtitle */}
        <p className="hero-subtitle text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto hero-element">
          Building fast, reliable, human-centered products
        </p>

        {/* Metrics row */}
        <div className="hero-metrics flex flex-wrap justify-center gap-4 mb-8 hero-element">
          <div className="glass px-4 py-2 rounded-full border border-primary/20">
            <span className="font-semibold bg-gradient-to-r from-[var(--gradient-1)] to-[var(--gradient-2)] bg-clip-text text-transparent">
              Principal SWE
            </span>{" "}
            at Lennar
          </div>
          <div className="glass px-4 py-2 rounded-full border border-purple-500/20">
            <span className="font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Co-Founder
            </span>{" "}
            Based Music
          </div>
          <div className="glass px-4 py-2 rounded-full border border-emerald-500/20">
            <span className="font-semibold bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent">
              $36M+
            </span>{" "}
            Revenue Impact
          </div>
        </div>

        {/* CTAs */}
        <div className="hero-cta flex flex-wrap justify-center gap-4 mb-12 hero-element">
          <MagneticCTA className="group relative">
            <Link
              href="#work"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[var(--gradient-1)] to-[var(--gradient-2)] text-white rounded-lg font-medium hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              View Work
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </Link>
          </MagneticCTA>

          <MagneticCTA>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 glass rounded-lg font-medium hover:shadow-lg transition-all duration-300 group"
            >
              <Download className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              Download Resume
            </a>
          </MagneticCTA>
        </div>

        {/* Social links */}
        <div className="hero-cta flex justify-center gap-6 hero-element">
          <a
            href="https://github.com/LLwassim"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 glass rounded-full hover:shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="GitHub Profile"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/wassimlacorchy/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 glass rounded-full hover:shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10">
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
