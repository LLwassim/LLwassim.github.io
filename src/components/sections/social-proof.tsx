"use client";

import Image from "next/image";
import { Award, Building2, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const companies = [
  { name: "Lennar", current: true },
  { name: "Based Music", current: true },
  { name: "City National Bank", current: false },
  { name: "Allstate", current: false },
  { name: "The Home Depot", current: false },
];

const testimonials = [
  {
    quote:
      "Wassim's technical leadership on our AI pricing platform has been transformative. His ability to bridge complex technical solutions with business outcomes is exceptional.",
    author: "Scott Spradley",
    role: "CTO, Lennar",
    company: "Lennar",
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
  {
    icon: Users,
    title: "10,000+ Users",
    description: "Based Music Platform",
    color: "from-purple-500 to-pink-500",
  },
];

export function SocialProof() {
  return (
    <section className="py-16 sm:py-20 lg:py-28 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Companies */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-semibold mb-8 scroll-fade-in">
            Trusted by Industry Leaders
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {companies.map((company, index) => (
              <div
                key={company.name}
                className={cn(
                  "relative transition-all duration-300 scroll-scale",
                  company.current
                    ? "text-foreground"
                    : "text-muted-foreground opacity-60"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-xl md:text-2xl font-bold hover:text-primary transition-colors">
                  {company.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
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

        {/* Testimonial */}
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.author}
            className="max-w-3xl mx-auto text-center scroll-fade-in"
          >
            <blockquote className="relative">
              <div className="text-6xl text-primary/20 absolute -top-4 -left-4">
                "
              </div>
              <p className="text-lg md:text-xl text-muted-foreground italic mb-6 relative z-10">
                {testimonial.quote}
              </p>
              <footer className="flex items-center justify-center gap-2 text-sm">
                <span className="font-semibold">{testimonial.author}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">
                  {testimonial.role}
                </span>
              </footer>
            </blockquote>
          </div>
        ))}
      </div>
    </section>
  );
}
