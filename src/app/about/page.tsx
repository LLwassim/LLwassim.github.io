import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Mail, MapPin, Phone, Award, Briefcase, Code2 } from "lucide-react";
import Image from "next/image";
import { MagneticCTA } from "@/components/animations/magnetic-cta";

export const metadata = {
  title: "About",
  description:
    "Learn more about Wassim LaCorchy - Principal Software Engineer, AI Solutions Architect, and startup co-founder driving innovation in software development.",
};

const skills = [
  "TypeScript & Python",
  "LangGraph & MCP",
  "RAG & Eval Harnesses",
  "AWS & Azure Cloud",
  "Next.js & React Native",
  "Node.js & FastAPI",
  "DevOps & CI/CD",
  "Event-Driven Systems",
];

const certifications = [
  {
    title: "AWS Solutions Architect - Professional",
    issuer: "Amazon Web Services",
  },
  {
    title: "Professional Scrum Master I",
    issuer: "Scrum.org",
  },
  {
    title: "PMI Certified PM",
    issuer: "Project Management Institute",
  },
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-24">
        <div className="container py-12">
          {/* Hero */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--gradient-1)] via-[var(--gradient-2)] to-[var(--gradient-3)] p-[3px] animate-spin-slow">
                <div className="h-full w-full rounded-full bg-background" />
              </div>
              <Image
                src="/images/WassimLaCorchyHeadShot.jpg"
                alt="Wassim LaCorchy"
                width={200}
                height={200}
                className="relative rounded-full"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
            <p className="text-xl text-muted-foreground">
              Principal Software Engineer & AI Solutions Architect
            </p>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Bio */}
            <section className="glass rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-primary" />
                Who I Am
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  I recently served as Principal Software Engineer - Applied AI
                  at Lennar, where I co-led architecture for The Lennar
                  Machine dynamic AI pricing platform and helped deliver a 1%
                  pricing uplift (~$36M annualized). I also led a 9-engineer
                  team building Lennar Connect&apos;s GenAI platform for governed,
                  enterprise-grade automation.
                </p>
                <p>
                  Before Lennar, I was a Senior Solutions Architect at AWS
                  ProServe, contributing to AI investigation systems at Amazon
                  scale and leading enterprise programs from discovery to
                  production.
                </p>
                <p>
                  I&apos;m also Co-Founder at Lasaria, where I deliver production
                  LLM agents with robust evaluation loops and telemetry across
                  quality, latency, and cost.
                </p>
              </div>
            </section>

            {/* Skills */}
            <section className="glass rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Code2 className="w-6 h-6 text-primary" />
                Core Competencies
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="px-4 py-2 rounded-lg bg-primary/10 text-center hover:bg-primary/20 transition-colors"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </section>

            {/* Certifications */}
            <section className="glass rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Award className="w-6 h-6 text-primary" />
                Certifications & Recognition
              </h2>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-lg bg-primary/5"
                  >
                    <Award className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <div className="font-semibold">{cert.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {cert.issuer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Contact */}
            <section className="glass rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
              <div className="space-y-4">
                <a
                  href="mailto:wassimlacorchy@gmail.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  wassimlacorchy@gmail.com
                </a>
                <a
                  href="tel:+15716038538"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  (571) 603-8538
                </a>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5" />
                  New York, NY 10016
                </div>
              </div>
              <div className="mt-6">
                <MagneticCTA>
                  <a
                    href="mailto:wassimlacorchy@gmail.com"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--gradient-1)] to-[var(--gradient-2)] text-white rounded-lg font-medium hover:shadow-xl transition-all"
                  >
                    <Mail className="w-4 h-4" />
                    Send me a message
                  </a>
                </MagneticCTA>
              </div>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

