"use client";

import { useRef, useMemo } from "react";
import Image from "next/image";
import { Award, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { RecommendationsRotator } from "@/components/ui/recommendations-rotator";

const companies = [
  {
    name: "Lennar",
    logo: "/images/lennar-logo-png_seeklogo-316733.png",
    current: true,
    width: 110,
    height: 50,
  },
  {
    name: "City National Bank",
    logo: "/images/City-National-Bank-logo.png",
    current: false,
    width: 180,
    height: 50,
  },
  {
    name: "The Home Depot",
    logo: "/images/home-depot-logo.png",
    current: false,
    width: 80,
    height: 30,
  },
  {
    name: "Allstate",
    logo: "/images/allstate-logo.svg",
    current: false,
    width: 150,
    height: 60,
  },
];

// All recommendations including CTO testimonial
// To edit: Simply add/remove/modify objects in this array
const recommendations = [
  {
    quote:
      "Wassim’s technical leadership on our AI pricing platform has been transformative. He bridges complex technical challenges with clear business outcomes.",
    author: "Scott Spradley",
    title: "CTO, Lennar",
  },
  {
    quote:
      "As my professor and mentor, Wassim made advanced JavaScript and React concepts click. His clarity and real-world examples turned theory into instinct.",
    author: "Angelo Bechtold",
    title: "Full-Stack AI Engineer (reported to Wassim)",
  },
  {
    quote:
      "Wassim’s mentorship directly helped me land a higher-paying role. From résumé reviews to interview prep, his tailored guidance and genuine investment made all the difference.",
    author: "Maryam Safi",
    title: "QA Automation Engineer",
  },
  {
    quote:
      "He’s proactive, quick to master new tools, and turns ideas into production-ready automation with rare ownership and follow-through.",
    author: "B. Tamim",
    title: "SDET & Mentor",
  },
];

const achievements = [
  {
    icon: Award,
    title: "Excellence in Tech Innovation",
    description: "City National Bank 2023",
    color: "from-yellow-500 to-amber-500",
  },
  {
    icon: Building2,
    title: "$36M+ Revenue Impact",
    description: "Lennar AI Platform",
    color: "from-green-500 to-emerald-500",
  },
];

export function SocialProof() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = prefersReducedMotion();

  // Duplicate companies for seamless loop
  const carouselItems = useMemo(() => {
    return Array.from({ length: 4 }, () => companies).flat();
  }, []);

  // GSAP infinite carousel animation
  useGSAP(
    () => {
      if (shouldReduceMotion || !carouselRef.current) return;

      const carousel = carouselRef.current;
      const items = carousel.querySelectorAll(".logo-item");

      if (items.length === 0) return;

      // Calculate total width
      const gap = 64; // 16 * 4 = 64px (gap-16)
      const itemWidth = (items[0] as HTMLElement).offsetWidth + gap;
      const totalWidth = itemWidth * companies.length;

      // Set initial position
      gsap.set(carousel, { x: 0 });

      // Create infinite loop
      gsap.to(carousel, {
        x: -totalWidth,
        duration: 20, // 20 seconds for smooth, slow movement
        ease: "none",
        repeat: -1,
        modifiers: {
          x: (x) => {
            const xValue = parseFloat(x);
            return `${xValue % totalWidth}px`;
          },
        },
      });
    },
    { dependencies: [shouldReduceMotion], scope: carouselRef }
  );

  return (
    <section className="py-16 sm:py-20 lg:py-28 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Companies Carousel */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-semibold mb-8 scroll-fade-in">
            Trusted by Industry Leaders
          </h3>
          <div className="relative overflow-hidden">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            {/* Carousel container */}
            <div className="overflow-hidden py-8">
              <div
                ref={carouselRef}
                className="flex gap-16 items-center"
                style={{ width: "fit-content" }}
              >
                {carouselItems.map((company, index) => (
                  <div
                    key={`${company.name}-${index}`}
                    className={cn(
                      "logo-item flex-shrink-0 transition-opacity duration-300",
                      company.current
                        ? "opacity-100"
                        : "opacity-70 hover:opacity-100"
                    )}
                  >
                    <Image
                      src={company.logo}
                      alt={`${company.name} logo`}
                      width={company.width}
                      height={company.height}
                      className="object-contain"
                      style={{
                        height: "auto",
                        width: "auto",
                        maxWidth: company.width,
                        maxHeight: company.height,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16 max-w-3xl mx-auto">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div
                key={achievement.title}
                className="glass rounded-2xl p-6 hover:shadow-lg transition-all duration-300 scroll-rise"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div
                  className={cn(
                    "inline-flex p-3 rounded-lg mb-4",
                    `bg-gradient-to-br ${achievement.color}`
                  )}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-2">
                  {achievement.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {achievement.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Rotating Recommendations Carousel */}
        <div className="max-w-3xl mx-auto scroll-fade-in">
          <RecommendationsRotator
            recommendations={recommendations}
            interval={7000}
          />
        </div>
      </div>
    </section>
  );
}
