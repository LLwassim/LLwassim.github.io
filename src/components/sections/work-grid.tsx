"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Code2, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkItem {
  id: string;
  title: string;
  company: string;
  role: string;
  timeline: string;
  summary: string;
  outcomes: string[];
  stack: string[];
  category: "AI" | "Systems" | "Mobile" | "Data" | "MusicTech";
  image: string;
  link: string;
  featured?: boolean;
}

// Sample work items - in production, these would come from MDX
const workItems: WorkItem[] = [
  {
    id: "lennar-ai-pricing",
    title: "AI-Driven Pricing Platform",
    company: "Lennar",
    role: "Principal Software Engineer",
    timeline: "Feb 2025 - Present",
    summary:
      "Led architecture of flagship AI pricing platform driving $36M+ annual revenue uplift.",
    outcomes: [
      "↑ $36M+ revenue impact",
      "↓ Decision time: days → minutes",
      "↑ 100% adoption",
    ],
    stack: ["Next.js", "AWS", "DBT", "Snowflake", "GPT-4o"],
    category: "AI",
    image: "/images/lennar-logo-png_seeklogo-316733.png",
    link: "/work/lennar-ai-pricing",
    featured: true,
  },
  {
    id: "based-music",
    title: "Based Music Platform",
    company: "Based Music LLC",
    role: "Co-Founder",
    timeline: "Sep 2024 - Present",
    summary:
      "Built cross-platform music discovery app with AI recommendations and real-time features.",
    outcomes: [
      "↓ Load time: 900ms → 120ms",
      "↑ 10K+ users",
      "↑ 45% engagement",
    ],
    stack: ["React Native", "AWS Lambda", "TensorFlow", "WebSockets"],
    category: "MusicTech",
    image: "/images/basedmusic.png",
    link: "/work/based-music",
    featured: true,
  },
  {
    id: "city-national-innovation",
    title: "Mortgage Processing Platform",
    company: "City National Bank",
    role: "Lead SDE",
    timeline: "2021 - 2024",
    summary:
      "Excellence Award winner. Cut approval times from 45 days to 9 through microservices.",
    outcomes: ["↓ 45 days → 9 days", "↑ 20% throughput", "🏆 Innovation Award"],
    stack: ["Microservices", "Jenkins", "Redis", "AWS"],
    category: "Systems",
    image: "/images/City-National-Bank-logo.png",
    link: "/work/city-national-innovation",
    featured: false,
  },
];

const categories = [
  "All",
  "AI",
  "Systems",
  "Mobile",
  "Data",
  "MusicTech",
] as const;

export function WorkGrid() {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof categories)[number]>("All");

  // Properly handle "All" filter to return original array sorted by featured status
  const filteredItems = useMemo(() => {
    const items =
      selectedCategory === "All"
        ? [...workItems]
        : workItems.filter((item) => item.category === selectedCategory);

    // Sort by featured first, maintains deterministic order
    return items.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [selectedCategory]);

  return (
    <section id="work" className="py-16 sm:py-20 lg:py-28 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 scroll-rise">
            Featured Work
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto scroll-fade-in">
            High-impact projects driving business value through technical
            excellence
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                selectedCategory === category
                  ? "bg-hero text-white shadow-lg scale-105"
                  : "glass hover:shadow-md hover:scale-105"
              )}
              aria-pressed={selectedCategory === category}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Work grid - normalized layout */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item, index) => (
            <Link
              key={item.id}
              href={item.link}
              className={cn(
                "group relative glass rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
                "scroll-fade-in",
                item.featured && "lg:col-span-2"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Image with consistent aspect ratio */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content with consistent padding */}
              <div className="p-5 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors truncate">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {item.company} • {item.role}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 flex-shrink-0 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>

                {/* Summary */}
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {item.summary}
                </p>

                {/* Outcomes */}
                <div className="space-y-1.5">
                  {item.outcomes.slice(0, 3).map((outcome, i) => (
                    <div key={i} className="text-sm font-medium">
                      {outcome}
                    </div>
                  ))}
                </div>

                {/* Stack */}
                <div className="flex flex-wrap gap-2">
                  {item.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs rounded-lg bg-primary/10 text-primary font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {item.stack.length > 4 && (
                    <span className="px-2.5 py-1 text-xs rounded-lg bg-muted text-muted-foreground font-medium">
                      +{item.stack.length - 4}
                    </span>
                  )}
                </div>

                {/* Timeline */}
                <div className="flex items-center gap-4 pt-4 border-t border-border/50 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.timeline}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5" />
                    {item.category}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-16">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-6 py-3 glass rounded-xl font-medium hover:shadow-lg transition-all duration-300 group"
          >
            View all projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
