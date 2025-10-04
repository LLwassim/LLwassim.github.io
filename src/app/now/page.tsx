import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Briefcase, Code2, Rocket, BookOpen } from "lucide-react";

export const metadata = {
  title: "Now",
  description: "What I'm currently working on and focused on.",
};

const currentFocus = [
  {
    icon: Briefcase,
    title: "Leading AI Initiatives at Lennar",
    description:
      "Managing a team of 9 engineers building GenAI documentation assistant and multi-agent HR platform. Recently shipped AI pricing platform with $36M+ revenue impact.",
    status: "Ongoing",
  },
  {
    icon: Rocket,
    title: "Building Based Music",
    description:
      "Growing our music discovery platform to 10,000+ users. Currently focused on scaling infrastructure and implementing new AI-powered features.",
    status: "Active",
  },
  {
    icon: Code2,
    title: "Learning & Experimentation",
    description:
      "Exploring advanced LangGraph patterns, MCP (Model Context Protocol), and modern React patterns with Server Components.",
    status: "Learning",
  },
  {
    icon: BookOpen,
    title: "Content Creation",
    description:
      "Planning to share insights on building production AI systems, team leadership, and architectural decision-making.",
    status: "Planning",
  },
];

export default function NowPage() {
  const lastUpdated = "October 2024";

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-24">
        <div className="container py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              What I'm Doing Now
            </h1>
            <p className="text-xl text-muted-foreground mb-2">
              My current focus and projects
            </p>
            <p className="text-sm text-muted-foreground mb-12">
              Last updated: {lastUpdated}
            </p>

            <div className="space-y-6">
              {currentFocus.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="glass rounded-xl p-6 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h2 className="text-xl font-semibold">
                            {item.title}
                          </h2>
                          <span className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary">
                            {item.status}
                          </span>
                        </div>
                        <p className="text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Availability */}
            <div className="mt-12 glass rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4">Availability</h2>
              <div className="flex items-start gap-3">
                <span className="relative flex h-3 w-3 mt-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <div>
                  <p className="font-semibold mb-2">
                    Open to select opportunities
                  </p>
                  <p className="text-muted-foreground">
                    While I'm currently focused on my work at Lennar and Based
                    Music, I'm always interested in discussing innovative
                    projects, consulting opportunities, or advisory roles in
                    AI/systems architecture.
                  </p>
                  <p className="text-muted-foreground mt-2">
                    Best way to reach me:{" "}
                    <a
                      href="mailto:wassimlacorchy@gmail.com"
                      className="text-primary hover:underline"
                    >
                      wassimlacorchy@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center text-sm text-muted-foreground">
              <p>
                Inspired by{" "}
                <a
                  href="https://nownownow.com/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  the /now movement
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

