"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, Database, Cloud, Server, Cpu, Layers } from "lucide-react";

interface DiagramNode {
  id: string;
  label: string;
  icon?: "database" | "cloud" | "server" | "cpu" | "layers";
  color?: string;
}

interface DiagramConnection {
  from: string;
  to: string;
  label?: string;
}

interface ArchitectureDiagramProps {
  title?: string;
  nodes: DiagramNode[];
  connections?: DiagramConnection[];
  className?: string;
}

const iconMap = {
  database: Database,
  cloud: Cloud,
  server: Server,
  cpu: Cpu,
  layers: Layers,
};

export function ArchitectureDiagram({
  title,
  nodes,
  connections = [],
  className,
}: ArchitectureDiagramProps) {
  return (
    <div className={cn("my-8 scroll-fade-in", className)}>
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <div className="glass rounded-xl p-8 overflow-x-auto">
        <div className="flex flex-wrap items-center justify-center gap-4 min-w-max">
          {nodes.map((node, index) => {
            const Icon = node.icon ? iconMap[node.icon] : Server;
            const hasConnection =
              index < nodes.length - 1 &&
              connections.some((c) => c.from === node.id);

            return (
              <div key={node.id} className="flex items-center gap-4">
                {/* Node */}
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={cn(
                      "relative p-4 rounded-lg border-2 bg-background transition-all hover:scale-105",
                      node.color || "border-primary/50"
                    )}
                  >
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-center max-w-[100px]">
                    {node.label}
                  </span>
                </div>

                {/* Connection Arrow */}
                {hasConnection && (
                  <div className="flex flex-col items-center">
                    <ArrowRight className="w-6 h-6 text-muted-foreground" />
                    {connections.find((c) => c.from === node.id)?.label && (
                      <span className="text-xs text-muted-foreground mt-1">
                        {connections.find((c) => c.from === node.id)?.label}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

