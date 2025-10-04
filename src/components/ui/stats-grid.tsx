import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface Stat {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
}

interface StatsGridProps {
  stats: Stat[];
  columns?: 2 | 3 | 4;
}

export function StatsGrid({ stats, columns = 3 }: StatsGridProps) {
  return (
    <div
      className={cn(
        "grid gap-4 my-8",
        columns === 2 && "grid-cols-1 md:grid-cols-2",
        columns === 3 && "grid-cols-1 md:grid-cols-3",
        columns === 4 && "grid-cols-2 md:grid-cols-4"
      )}
    >
      {stats.map((stat, index) => (
        <div
          key={index}
          className="glass rounded-lg p-6 scroll-rise"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="text-sm text-muted-foreground mb-2">{stat.label}</div>
          <div className="text-3xl font-bold text-primary mb-2">
            {stat.value}
          </div>
          {stat.change && (
            <div className="flex items-center gap-1 text-sm">
              {stat.trend === "up" && (
                <TrendingUp className="w-4 h-4 text-green-500" />
              )}
              {stat.trend === "down" && (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              {stat.trend === "neutral" && (
                <Minus className="w-4 h-4 text-muted-foreground" />
              )}
              <span
                className={cn(
                  stat.trend === "up" && "text-green-600 dark:text-green-400",
                  stat.trend === "down" && "text-red-600 dark:text-red-400",
                  stat.trend === "neutral" && "text-muted-foreground"
                )}
              >
                {stat.change}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

