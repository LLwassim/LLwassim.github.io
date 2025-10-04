"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

export function MermaidDiagram({ chart, className = "" }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: "dark",
      themeVariables: {
        primaryColor: "#3b82f6",
        primaryTextColor: "#e5e7eb",
        primaryBorderColor: "#6366f1",
        lineColor: "#8b5cf6",
        secondaryColor: "#10b981",
        tertiaryColor: "#f59e0b",
        background: "#1f2937",
        mainBkg: "#111827",
        secondBkg: "#1f2937",
        clusterBkg: "#374151",
        clusterBorder: "#6b7280",
        textColor: "#e5e7eb",
        fontSize: "14px",
      },
    });

    const renderChart = async () => {
      try {
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(id, chart);
        setSvg(svg);
      } catch (error) {
        console.error("Error rendering mermaid diagram:", error);
      }
    };

    renderChart();
  }, [chart]);

  return (
    <div
      ref={ref}
      className={`mermaid-diagram overflow-x-auto p-6 bg-gray-900/50 rounded-lg border border-gray-800 ${className}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

