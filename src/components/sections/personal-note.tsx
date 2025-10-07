"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { MagneticCTA } from "@/components/animations/magnetic-cta";

export function PersonalNote() {
  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-primary/5 via-background to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let's Build Something Amazing Together
          </h2>

          <p className="text-lg text-muted-foreground mb-6">
            I'm a Principal Software Engineer and AI Solutions Architect
            passionate about building products that make a real impact. Whether
            it's driving $36M+ in revenue at Lennar or creating the future of
            music discovery with Based Music, I bring technical excellence and
            business acumen to every project.
          </p>

          <p className="text-lg text-muted-foreground mb-8">
            Currently based in New York, I'm always interested in discussing new
            opportunities, innovative projects, or just having a great
            conversation about technology and startups.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <MagneticCTA>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 glass rounded-lg font-medium hover:shadow-lg transition-all duration-300 group"
              >
                Learn more about me
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </MagneticCTA>

            <MagneticCTA>
              <a
                href="mailto:wassimlacorchy@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--gradient-1)] to-[var(--gradient-2)] text-white rounded-lg font-medium hover:shadow-xl transition-all duration-300 group"
              >
                <Mail className="w-4 h-4" />
                Get in touch
              </a>
            </MagneticCTA>
          </div>

          {/* Availability status */}
          <div className="mt-12 inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-muted-foreground">
              Available for select opportunities
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
