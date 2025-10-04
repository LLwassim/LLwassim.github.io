import { cn } from "@/lib/utils";
import { X, Check } from "lucide-react";

interface ComparisonRow {
  label: string;
  before: string | boolean;
  after: string | boolean;
}

interface ComparisonTableProps {
  title?: string;
  rows: ComparisonRow[];
  beforeLabel?: string;
  afterLabel?: string;
}

export function ComparisonTable({
  title,
  rows,
  beforeLabel = "Before",
  afterLabel = "After",
}: ComparisonTableProps) {
  return (
    <div className="my-8 scroll-fade-in">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <div className="glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-semibold">Metric</th>
                <th className="text-left p-4 font-semibold text-red-600 dark:text-red-400">
                  {beforeLabel}
                </th>
                <th className="text-left p-4 font-semibold text-green-600 dark:text-green-400">
                  {afterLabel}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={index}
                  className={cn(
                    "border-b border-border last:border-0",
                    "hover:bg-primary/5 transition-colors"
                  )}
                >
                  <td className="p-4 font-medium">{row.label}</td>
                  <td className="p-4 text-muted-foreground">
                    {typeof row.before === "boolean" ? (
                      row.before ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <X className="w-5 h-5 text-red-500" />
                      )
                    ) : (
                      row.before
                    )}
                  </td>
                  <td className="p-4 font-semibold">
                    {typeof row.after === "boolean" ? (
                      row.after ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <X className="w-5 h-5 text-red-500" />
                      )
                    ) : (
                      row.after
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

