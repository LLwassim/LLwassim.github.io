"use client";

import Image from "next/image";
import Link from "next/link";
import { experiences } from "@/data/experiences";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink, MapPin, Calendar, Award } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function ExperienceCard({
  exp,
  index,
}: {
  exp: (typeof experiences)[0];
  index: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative pl-0 md:pl-20 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Timeline dot with pulse for current role */}
      <div className="absolute left-6 top-8 hidden md:block">
        <div
          className={`size-4 rounded-full border-4 border-background bg-primary ${
            exp.current ? "animate-pulse" : ""
          }`}
        />
        {exp.current && (
          <div className="absolute inset-0 size-4 rounded-full bg-primary animate-ping opacity-75" />
        )}
      </div>

      <Card className="group glass hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/30">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            {/* Company Logo */}
            <div className="flex-shrink-0">
              {exp.logo && (
                <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-background border-2 group-hover:border-primary/50 transition-colors">
                  <Image
                    src={exp.logo}
                    alt={exp.company}
                    fill
                    className="object-contain p-2"
                  />
                </div>
              )}
            </div>

            <div className="flex-1 space-y-3">
              {/* Date and Location */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                {exp.location && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    <span>{exp.location}</span>
                  </div>
                )}
                {exp.current && (
                  <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
                    Current Role
                  </Badge>
                )}
              </div>

              {/* Company and Title */}
              <div>
                <CardTitle className="text-2xl mb-1 group-hover:text-primary transition-colors">
                  {exp.website ? (
                    <Link
                      href={exp.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 hover:underline"
                    >
                      {exp.company}
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  ) : (
                    exp.company
                  )}
                </CardTitle>

                <CardDescription className="text-lg font-semibold text-foreground/90">
                  {exp.position}
                </CardDescription>
              </div>

              {/* Special Badge for City National Bank Award */}
              {exp.id === "city-national-bank" && (
                <div className="flex items-center gap-2 text-sm bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2 w-fit">
                  <Award className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <span className="font-medium text-amber-600 dark:text-amber-400">
                    Excellence in Tech Innovation Award 2023
                  </span>
                </div>
              )}

              {/* Special Badge for Lasaria Acquisition */}
              {exp.id === "lasaria" && (
                <div className="flex items-center gap-2 text-sm bg-blue-500/10 border border-blue-500/20 rounded-lg px-3 py-2 w-fit">
                  <Award className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium text-blue-600 dark:text-blue-400">
                    Company Acquired January 2025
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">
            {exp.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {exp.technologies.map((tech, i) => (
              <Badge
                key={tech}
                variant="secondary"
                className="transition-all hover:scale-105 hover:bg-primary/20"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function ExperienceTimeline() {
  return (
    <div className="relative space-y-8">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block" />

      {experiences.map((exp, index) => (
        <ExperienceCard key={exp.id} exp={exp} index={index} />
      ))}
    </div>
  );
}
