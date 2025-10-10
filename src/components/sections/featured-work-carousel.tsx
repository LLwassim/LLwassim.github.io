"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Code2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/motion";
import { allCaseStudies } from "contentlayer/generated";
import type { CaseStudy } from "contentlayer/generated";

// Company name mapping based on case study slugs
const companyMap: Record<string, string> = {
  "lennar-ai-pricing": "Lennar",
  "based-music": "Based Music LLC",
  "city-national-innovation": "City National Bank",
};

// Transform Contentlayer case studies to work items
const workItems = allCaseStudies
  .map((study) => ({
    id: study.slug,
    title: study.title.split(" - ")[0].trim(), // Extract main title before dash
    company: companyMap[study.slug] || study.title.split(" ")[0], // Get company from map or first word
    role: Array.isArray(study.role) ? study.role[0] : study.role, // Take first role
    timeline: study.timeline,
    summary: study.summary,
    outcomes: study.outcomes.slice(0, 3), // Show first 3 outcomes
    stack: study.stack,
    category: study.category,
    image: study.image,
    link: study.url,
    featured: study.featured,
    order: study.order || 0,
  }))
  .sort((a, b) => a.order - b.order); // Sort by order field

// Category definitions
const categories = ["All", "Systems", "Mobile", "Platform"] as const;

// Professional display names for categories
const categoryDisplayNames: Record<string, string> = {
  All: "All Projects",
  Systems: "Enterprise Systems",
  Mobile: "Mobile Applications",
  Platform: "Platform Engineering",
  AI: "AI & Machine Learning", // Hidden from filters but used in data
  Data: "Data Engineering", // Hidden from filters but used in data
  MusicTech: "Music Technology", // Hidden from filters but used in data
};

/**
 * Ethereal ambient background for featured work section
 * Floating particles, gradient orbs, subtle movement
 */
function EtherealBackground() {
  const shouldReduceMotion = prefersReducedMotion();
  const [isMounted, setIsMounted] = useState(false);

  // Generate particle positions only on client-side to avoid hydration mismatch
  const particles = useMemo(() => {
    if (!isMounted) return [];
    return Array.from({ length: 30 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 8 + Math.random() * 10,
      delay: Math.random() * 5,
    }));
  }, [isMounted]);

  // Set mounted state after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-purple-500/5" />

      {/* Animated gradient orbs - large ethereal spheres */}
      {!shouldReduceMotion && (
        <>
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-transparent blur-3xl"
            style={{ top: "10%", left: "-10%" }}
            animate={{
              x: [0, 100, 0],
              y: [0, -80, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-transparent blur-3xl"
            style={{ top: "50%", right: "-5%" }}
            animate={{
              x: [0, -120, 0],
              y: [0, 100, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5,
            }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-transparent blur-3xl"
            style={{ bottom: "10%", left: "30%" }}
            animate={{
              x: [0, -60, 0],
              y: [0, -100, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 10,
            }}
          />
        </>
      )}

      {/* Floating particles */}
      {!shouldReduceMotion && isMounted && (
        <div className="absolute inset-0">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                y: [-20, -60, -20],
                x: [-10, 10, -10],
                opacity: [0, 0.8, 0],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: particle.delay,
              }}
            />
          ))}
        </div>
      )}

      {/* Ambient light rays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.1),transparent_50%)]" />
    </div>
  );
}

/**
 * Infinite looping carousel for featured work
 * Uses GSAP for smooth, continuous horizontal scroll
 */
export function FeaturedWorkCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof categories)[number]>("All");
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = prefersReducedMotion();

  // Filter items by category
  const filteredItems = useMemo(() => {
    let items: typeof workItems;

    if (selectedCategory === "All") {
      items = [...workItems];
    } else {
      // Filter items that match the selected category
      items = workItems.filter((item) => item.category === selectedCategory);
    }

    // Sort by featured status first, then by order
    return items.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return a.order - b.order;
    });
  }, [selectedCategory]);

  // Create seamless loop by duplicating items
  const carouselItems = useMemo(() => {
    // Duplicate enough times to ensure smooth infinite scroll
    const duplicates = 3;
    return Array.from({ length: duplicates }, () => filteredItems).flat();
  }, [filteredItems]);

  // GSAP infinite carousel animation
  useGSAP(
    () => {
      if (
        shouldReduceMotion ||
        !carouselRef.current ||
        carouselItems.length === 0
      )
        return;

      const carousel = carouselRef.current;
      const cards = carousel.querySelectorAll(".carousel-card");

      if (cards.length === 0) return;

      // Calculate total width of one set of items
      // Gap is 16px (gap-4) on mobile, 24px (gap-6) on sm+
      const gap = window.innerWidth >= 640 ? 24 : 16;
      const cardWidth = (cards[0] as HTMLElement).offsetWidth + gap;
      const totalWidth = cardWidth * filteredItems.length;

      // Set initial position
      gsap.set(carousel, { x: 0 });

      // Create infinite loop animation
      const tl = gsap.timeline({
        repeat: -1,
        paused: isPaused,
      });

      tl.to(carousel, {
        x: -totalWidth,
        duration: filteredItems.length * 8, // 8s per item
        ease: "none", // Linear for smooth loop
        modifiers: {
          x: (x) => {
            // Seamless loop reset
            const xValue = parseFloat(x);
            return `${xValue % totalWidth}px`;
          },
        },
      });

      return () => {
        tl.kill();
      };
    },
    {
      dependencies: [carouselItems, isPaused, shouldReduceMotion],
      scope: carouselRef,
    }
  );

  return (
    <section
      id="work"
      className="py-12 sm:py-20 md:py-28 lg:py-36 relative overflow-hidden"
    >
      {/* Ethereal background */}
      <EtherealBackground />

      <div className="relative z-10">
        {/* Section header */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4 sm:mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                Featured Work
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-hero bg-clip-text text-transparent px-4">
              Innovation in Motion
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              High-impact projects driving business value through technical
              excellence
            </p>
          </motion.div>
        </div>

        {/* Category filter */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-16">
          <motion.div
            className="flex flex-wrap justify-center gap-2 sm:gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap",
                  selectedCategory === category
                    ? "bg-hero text-white shadow-lg shadow-primary/25 scale-105"
                    : "glass hover:shadow-md hover:scale-105 hover:bg-primary/5"
                )}
                aria-pressed={selectedCategory === category}
              >
                {categoryDisplayNames[category] || category}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Infinite carousel */}
        <div
          className="relative"
          onMouseEnter={() => !shouldReduceMotion && setIsPaused(true)}
          onMouseLeave={() => !shouldReduceMotion && setIsPaused(false)}
        >
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Carousel container */}
          <div className="overflow-hidden">
            <div
              ref={carouselRef}
              className="flex gap-4 sm:gap-6 py-4"
              style={{
                width: "fit-content",
              }}
            >
              {carouselItems.map((item, index) => (
                <Link
                  key={`${item.id}-${index}`}
                  href={item.link}
                  className="carousel-card group relative glass rounded-2xl sm:rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 flex-shrink-0 w-[85vw] xs:w-[340px] sm:w-[400px] md:w-[480px] before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 dark:before:via-white/10 before:to-transparent before:animate-[carousel-shimmer_12s_ease-in-out_infinite] before:pointer-events-none before:z-10"
                >
                  {/* Featured badge */}
                  {item.featured && (
                    <div className="absolute top-6 right-6 z-20 px-3 py-1.5 rounded-full bg-hero text-white text-xs font-bold shadow-lg">
                      Featured
                    </div>
                  )}

                  {/* Image with parallax effect on hover */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-primary/20 to-purple-500/20">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 85vw, (max-width: 768px) 340px, (max-width: 1024px) 400px, 480px"
                        className="object-cover transition-all duration-700 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-8 space-y-4 sm:space-y-5">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                          {item.company} • {item.role}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-muted-foreground group-hover:text-primary group-hover:translate-x-2 transition-all duration-300" />
                    </div>

                    {/* Summary */}
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-3 sm:line-clamp-none">
                      {item.summary}
                    </p>

                    {/* Outcomes */}
                    <div className="space-y-1.5 sm:space-y-2">
                      {item.outcomes.map((outcome, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-xs sm:text-sm font-semibold"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          <span className="truncate">{outcome}</span>
                        </div>
                      ))}
                    </div>

                    {/* Stack */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-3 sm:pt-4 border-t border-border/50">
                      {item.stack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs rounded-lg bg-primary/10 text-primary font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                      {item.stack.length > 4 && (
                        <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs rounded-lg bg-muted text-muted-foreground font-semibold">
                          +{item.stack.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-3 sm:gap-4 pt-2 text-xs text-muted-foreground font-medium">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">{item.timeline}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Code2 className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">
                          {categoryDisplayNames[item.category] || item.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Pause hint */}
          {!shouldReduceMotion && (
            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p className="text-sm text-muted-foreground">
                Hover to pause • Scroll infinitely
              </p>
            </motion.div>
          )}
        </div>

        {/* View all link */}
        <div className="text-center mt-12 sm:mt-20">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 glass rounded-xl sm:rounded-2xl font-semibold hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group text-base sm:text-lg"
          >
            Explore All Projects
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
