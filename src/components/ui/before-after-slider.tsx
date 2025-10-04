"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// New format
interface BeforeAfterData {
  title: string;
  metrics: string[];
}

// Old format (backward compatibility)
interface Comparison {
  label: string;
  before: string;
  after: string;
  improvement: string;
}

interface BeforeAfterSliderProps {
  // New format props
  before?: BeforeAfterData;
  after?: BeforeAfterData;
  // Old format props
  comparisons?: Comparison[];
}

export function BeforeAfterSlider({
  before,
  after,
  comparisons,
}: BeforeAfterSliderProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // If using old format with comparisons array
  if (comparisons) {
    return (
      <div className="my-8 space-y-4">
        {comparisons.map((comparison, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg border border-border bg-card/50 backdrop-blur-sm"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="p-6">
              <h4 className="text-lg font-semibold mb-4">{comparison.label}</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Before */}
                <motion.div
                  className="space-y-3"
                  animate={{
                    scale: hoveredIndex === index ? 0.98 : 1,
                    opacity: hoveredIndex === index ? 0.7 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-sm font-bold text-red-500 uppercase tracking-wider">
                      Before
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-red-400">
                    {comparison.before}
                  </div>
                </motion.div>

                {/* After */}
                <motion.div
                  className="space-y-3"
                  animate={{
                    scale: hoveredIndex === index ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-sm font-bold text-green-500 uppercase tracking-wider">
                      After
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-green-400">
                    {comparison.after}
                  </div>
                </motion.div>
              </div>

              {/* Improvement badge */}
              <div className="mt-4 pt-4 border-t border-border">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
                  <span className="text-sm font-medium text-primary">
                    {comparison.improvement}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // New format with before/after objects
  if (!before || !after) {
    return null;
  }

  const isHovered = hoveredIndex === 0;

  return (
    <div className="my-8">
      <div
        className="relative overflow-hidden rounded-lg border border-border bg-card/50 backdrop-blur-sm"
        onMouseEnter={() => setHoveredIndex(0)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Before */}
            <motion.div
              className="space-y-4"
              animate={{
                scale: isHovered ? 0.98 : 1,
                opacity: isHovered ? 0.7 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <h4 className="text-sm font-bold text-red-500 uppercase tracking-wider">
                  {before.title}
                </h4>
              </div>
              <div className="space-y-2">
                {before.metrics.map((metric, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="text-red-400 mt-1">•</span>
                    <span>{metric}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* After */}
            <motion.div
              className="space-y-4"
              animate={{
                scale: isHovered ? 1.02 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <h4 className="text-sm font-bold text-green-500 uppercase tracking-wider">
                  {after.title}
                </h4>
              </div>
              <div className="space-y-2">
                {after.metrics.map((metric, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 text-sm text-foreground font-medium"
                  >
                    <span className="text-green-400 mt-1">✓</span>
                    <span>{metric}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Progress indicator */}
          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>Performance Improvement</span>
              <span className="text-green-400 font-semibold">87%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                initial={{ width: 0 }}
                animate={{ width: isHovered ? "87%" : "70%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
