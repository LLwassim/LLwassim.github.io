import Image from "next/image";
import Link from "next/link";
import { Callout } from "./ui/callout";
import { StatsGrid } from "./ui/stats-grid";
import { ArchitectureDiagram } from "./ui/architecture-diagram";
import { ComparisonTable } from "./ui/comparison-table";
import { Timeline } from "./ui/timeline";
import { MermaidDiagram } from "./ui/mermaid-diagram";
import { InteractiveMetrics } from "./ui/interactive-metrics";
import { InteractiveArchitecture } from "./ui/interactive-architecture";
import { AnimatedTimeline } from "./ui/animated-timeline";
import { BeforeAfterSlider } from "./ui/before-after-slider";

const components = {
  Image,
  Callout,
  StatsGrid,
  ArchitectureDiagram,
  ComparisonTable,
  Timeline,
  MermaidDiagram,
  InteractiveMetrics,
  InteractiveArchitecture,
  AnimatedTimeline,
  BeforeAfterSlider,
  a: ({ href, children, ...props }: any) => {
    const isExternal = href?.startsWith("http");
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  },
};

export default components;
