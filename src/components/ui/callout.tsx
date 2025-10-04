import { cn } from "@/lib/utils";
import {
  AlertCircle,
  CheckCircle,
  Info,
  Lightbulb,
  TrendingUp,
} from "lucide-react";

type CalloutType = "info" | "success" | "warning" | "insight" | "metric";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const calloutConfig = {
  info: {
    icon: Info,
    className:
      "bg-blue-500/10 border-blue-500/20 text-blue-900 dark:text-blue-100",
    iconClassName: "text-blue-500",
  },
  success: {
    icon: CheckCircle,
    className:
      "bg-green-500/10 border-green-500/20 text-green-900 dark:text-green-100",
    iconClassName: "text-green-500",
  },
  warning: {
    icon: AlertCircle,
    className:
      "bg-yellow-500/10 border-yellow-500/20 text-yellow-900 dark:text-yellow-100",
    iconClassName: "text-yellow-500",
  },
  insight: {
    icon: Lightbulb,
    className:
      "bg-purple-500/10 border-purple-500/20 text-purple-900 dark:text-purple-100",
    iconClassName: "text-purple-500",
  },
  metric: {
    icon: TrendingUp,
    className: "bg-primary/10 border-primary/20",
    iconClassName: "text-primary",
  },
};

export function Callout({
  type = "info",
  title,
  children,
  className,
}: CalloutProps) {
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "my-6 rounded-lg border p-4 scroll-fade-in",
        config.className,
        className
      )}
    >
      <div className="flex gap-3">
        <Icon
          className={cn("w-5 h-5 mt-0.5 flex-shrink-0", config.iconClassName)}
        />
        <div className="flex-1">
          {title && <div className="font-semibold mb-1">{title}</div>}
          <div className="text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}

