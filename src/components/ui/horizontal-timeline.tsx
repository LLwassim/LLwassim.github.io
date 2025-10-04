"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, ExternalLink, Award } from "lucide-react";
import { Badge } from "./badge";

interface TimelineItem {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string[];
  logo?: string;
  website?: string;
  current?: boolean;
  award?: string;
}

interface HorizontalTimelineProps {
  items: TimelineItem[];
}

export function HorizontalTimeline({ items }: HorizontalTimelineProps) {
  return (
    <div className="w-full space-y-8">
      {/* Vertical Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />

        {/* Timeline items */}
        <div className="space-y-12">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-16 md:pl-24"
            >
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-6 top-8">
                <div
                  className={`w-6 h-6 rounded-full border-4 border-background ${
                    item.current ? "bg-primary animate-pulse" : "bg-primary/50"
                  }`}
                />
                {item.current && (
                  <div className="absolute inset-0 w-6 h-6 rounded-full bg-primary animate-ping opacity-75" />
                )}
              </div>

              {/* Content card */}
              <div className="glass rounded-xl p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border-2 hover:border-primary/30">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Logo */}
                  {item.logo && (
                    <div className="flex-shrink-0">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-background border-2 border-primary/20">
                        <Image
                          src={item.logo}
                          alt={item.company}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                    </div>
                  )}

                  {/* Details */}
                  <div className="flex-1 space-y-4">
                    {/* Header */}
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          <span className="font-medium">
                            {item.startDate} - {item.endDate}
                          </span>
                        </div>
                        {item.location && (
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4" />
                            <span>{item.location}</span>
                          </div>
                        )}
                        {item.current && (
                          <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
                            Current Role
                          </Badge>
                        )}
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-1">
                        {item.website ? (
                          <Link
                            href={item.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 hover:text-primary transition-colors"
                          >
                            {item.company}
                            <ExternalLink className="h-5 w-5" />
                          </Link>
                        ) : (
                          item.company
                        )}
                      </h3>
                      <p className="text-lg font-semibold text-foreground/90">
                        {item.position}
                      </p>

                      {/* Award badge */}
                      {item.award && (
                        <div className="flex items-center gap-2 mt-3 text-sm bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2 w-fit">
                          <Award className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                          <span className="font-medium text-amber-600 dark:text-amber-400">
                            {item.award}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="transition-all hover:scale-105 hover:bg-primary/20"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
