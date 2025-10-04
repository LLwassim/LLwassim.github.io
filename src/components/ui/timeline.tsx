import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface TimelineItem {
  title: string;
  description: string;
  date?: string;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn("my-8", className)}>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="relative flex gap-4 scroll-rise"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Timeline line */}
            {index < items.length - 1 && (
              <div className="absolute left-[15px] top-8 bottom-0 w-[2px] bg-gradient-to-b from-primary/50 to-transparent" />
            )}

            {/* Dot */}
            <div className="relative flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                <Check className="w-4 h-4 text-primary" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 glass rounded-lg p-4 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h4 className="font-semibold">{item.title}</h4>
                {item.date && (
                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                    {item.date}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

