"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Code2, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { allCaseStudies } from "contentlayer/generated";

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
                "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap",
                selectedCategory === category
                  ? "bg-hero text-white shadow-lg scale-105"
                  : "glass hover:shadow-md hover:scale-105"
              )}
              aria-pressed={selectedCategory === category}
            >
              {categoryDisplayNames[category] || category}
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
                    {categoryDisplayNames[item.category] || item.category}
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
