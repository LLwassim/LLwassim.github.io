"use client";

import Image from "next/image";
import { siteConfig } from "@/config/site";
import { ArrowDown, Award, Building2, Code2, Sparkles } from "lucide-react";

export function Hero() {
  const scrollToContent = () => {
    const element = document.getElementById("experience");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-4 py-20 text-center overflow-hidden">
      {/* Additional decorative elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-blue-500 rounded-full animate-ping" />
      <div className="absolute top-40 right-20 w-2 h-2 bg-purple-500 rounded-full animate-ping animation-delay-2000" />
      <div className="absolute bottom-40 left-20 w-2 h-2 bg-pink-500 rounded-full animate-ping animation-delay-4000" />
      <div className="absolute bottom-20 right-10 w-2 h-2 bg-yellow-500 rounded-full animate-ping animation-delay-6000" />

      <div className="max-w-5xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 relative z-10">
        {/* Profile Image with enhanced effects */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Animated rings */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient bg-300% opacity-75 blur-2xl" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-spin [animation-duration:3s] opacity-20 blur-xl" />

            {/* Profile image */}
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white/20 dark:border-slate-800/50 shadow-2xl ring-4 ring-primary/30 backdrop-blur-sm">
              <Image
                src="/images/WassimLaCorchyHeadShot.jpg"
                alt="Wassim LaCorchy"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Sparkle effect */}
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Name with animated gradient */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent animate-gradient bg-300%">
            Wassim LaCorchy
          </h1>

          <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
            <div className="group flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all hover:scale-105 backdrop-blur-sm">
              <Building2 className="h-4 w-4 text-blue-600 dark:text-blue-400 group-hover:animate-bounce" />
              <span className="font-medium bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Principal Engineer @ Lennar
              </span>
            </div>
            <div className="group flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all hover:scale-105 backdrop-blur-sm">
              <Code2 className="h-4 w-4 text-purple-600 dark:text-purple-400 group-hover:animate-bounce" />
              <span className="font-medium bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Co-Founder @ Based Music
              </span>
            </div>
            <div className="group flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 hover:border-green-500/40 transition-all hover:scale-105 backdrop-blur-sm">
              <Award className="h-4 w-4 text-green-600 dark:text-green-400 group-hover:rotate-12 transition-transform" />
              <span className="font-medium bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                Excellence in Tech Innovation 2023
              </span>
            </div>
          </div>
        </div>

        {/* Description with glass effect */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <p className="text-xl md:text-2xl font-semibold text-foreground">
            Leading Enterprise AI Systems & Cloud Architecture
          </p>

          <div className="glass rounded-2xl p-6 shadow-xl">
            <p className="text-lg md:text-xl text-foreground/90 leading-relaxed">
              Architecting AI-driven platforms generating{" "}
              <span className="font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                $36M+ annual revenue uplift
              </span>{" "}
              at Lennar. Building scalable cloud infrastructure across fintech,
              insurance, and music tech.
              <span className="block mt-3 text-base text-muted-foreground">
                6+ years experience • AWS Solutions Architect Professional • New
                York, NY
              </span>
            </p>
          </div>
        </div>

        {/* Enhanced CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 pt-6">
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 rounded-full px-8 py-4 text-lg font-medium overflow-hidden transition-all hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 animate-gradient bg-300% transition-opacity" />
            <span className="relative text-white">Connect on LinkedIn</span>
            <svg
              className="relative w-5 h-5 text-white transition-transform group-hover:translate-x-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 rounded-full border-2 border-foreground/20 hover:border-foreground/40 px-8 py-4 text-lg font-medium backdrop-blur-sm transition-all hover:scale-105 glass"
          >
            <span className="relative">View GitHub</span>
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:rotate-12"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToContent}
          className="inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-all mt-12 group"
        >
          <span className="text-sm font-medium">See Experience</span>
          <div className="relative">
            <ArrowDown className="h-5 w-5 animate-bounce group-hover:translate-y-1 transition-transform" />
            <div className="absolute inset-0 blur-md bg-primary/50 animate-pulse" />
          </div>
        </button>
      </div>
    </section>
  );
}
