"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { MagneticCTA } from "@/components/animations/magnetic-cta";
import { GlobalNetworkBackground } from "@/components/ui/global-network-background";
import { ContactFormModal } from "./ContactFormModal";
import { buildCalendlyUrl } from "@/lib/urls";

export function PersonalNote() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden">
      {/* Animated Global Network Background */}
      <GlobalNetworkBackground />

      {/* Content with backdrop */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Let's Build Something Amazing Together
            </h2>

            <p className="text-lg text-muted-foreground mb-6">
              I'm a Principal Software Engineer and AI Solutions Architect
              passionate about building products that make a real impact.
              Whether it's driving $36M+ in revenue at Lennar or creating the
              future of music discovery with Based Music, I bring technical
              excellence and business acumen to every project.
            </p>

            <p className="text-lg text-muted-foreground mb-8">
              Currently based in New York, I'm always interested in discussing
              new opportunities, innovative projects, or just having a great
              conversation about technology and startups.
            </p>

            <div className="flex flex-col items-center gap-4">
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
                    href={buildCalendlyUrl("footer_cta")}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-analytics="cta_book_call_bottom"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--gradient-1)] to-[var(--gradient-2)] text-white rounded-lg font-medium hover:shadow-xl transition-all duration-300 group"
                  >
                    <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Book a Call
                  </a>
                </MagneticCTA>
              </div>

              {/* Secondary link to open contact form */}
              <button
                onClick={() => setIsModalOpen(true)}
                data-analytics="cta_open_contact_form"
                className="text-sm text-muted-foreground hover:text-primary underline-offset-4 hover:underline transition-all"
              >
                Prefer to write? Send a message instead.
              </button>
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
      </div>

      {/* Contact Form Modal */}
      <ContactFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
