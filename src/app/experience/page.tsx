import { experiences } from "@/data/experiences";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { HorizontalTimeline } from "@/components/ui/horizontal-timeline";
import { TrendingUp, Award, Briefcase } from "lucide-react";

export const metadata = {
  title: "Experience - Wassim LaCorchy",
  description:
    "7+ years of software engineering experience across Fortune 500 companies and startups",
};

export default function ExperiencePage() {
  // Transform experiences data to include award field
  const timelineItems = experiences.map((exp) => ({
    ...exp,
    award:
      exp.id === "city-national-bank"
        ? "Excellence in Tech Innovation Award 2023"
        : exp.id === "lasaria"
        ? "Company Acquired January 2025"
        : undefined,
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 py-16 sm:py-20 lg:py-28">
        {/* Hero Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Professional Experience
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              7+ years building scalable systems across fintech, insurance, real
              estate, and music tech. Leading AI initiatives and cloud
              architecture at enterprise scale.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-blue-400" />
                  <span className="text-xs font-medium text-blue-400">
                    Experience
                  </span>
                </div>
                <div className="text-2xl font-bold text-white">7+ Years</div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <Briefcase className="h-4 w-4 text-purple-400" />
                  <span className="text-xs font-medium text-purple-400">
                    Companies
                  </span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {experiences.length}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="h-4 w-4 text-green-400" />
                  <span className="text-xs font-medium text-green-400">
                    Current
                  </span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {experiences.filter((exp) => exp.current).length} Roles
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <HorizontalTimeline items={timelineItems} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
