import { experiences } from "@/data/experiences";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";

export const metadata = {
  title: "Experience",
};

export default function ExperiencePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-12 md:py-20">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-12">
          Professional Experience
        </h1>
        <ExperienceTimeline />
      </main>
      <Footer />
    </div>
  );
}
