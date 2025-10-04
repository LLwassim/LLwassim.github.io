"use client";

import { siteConfig } from "@/config/site";
import { ArrowDown } from "lucide-react";

export function Hero() {
  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center px-4 py-20 text-center">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/50 to-background" />

      <div className="max-w-3xl space-y-6">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          Wassim
          <br />
          LaCorchy
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground">
          An Interactive Experience of{" "}
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:underline"
          >
            My Software Portfolio
          </a>
        </p>

        <button
          onClick={scrollToProjects}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Continue
          <ArrowDown className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
