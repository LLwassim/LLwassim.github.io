"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

interface Milestone {
  phase: string;
  date?: string;
  duration?: string; // Backward compatibility
  title: string;
  description: string;
  achievements?: string[];
  outcomes?: string[]; // Backward compatibility
}

interface AnimatedTimelineProps {
  milestones: Milestone[];
}

export function AnimatedTimeline({ milestones }: AnimatedTimelineProps) {
  // Handle undefined or empty milestones
  if (!milestones || milestones.length === 0) {
    return null;
  }

  return (
    <div className="my-12">
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/30 to-transparent" />

        <div className="space-y-12">
          {milestones.map((milestone, index) => (
            <TimelineItem key={index} milestone={milestone} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TimelineItem({
  milestone,
  index,
}: {
  milestone: Milestone;
  index: number;
}) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative flex gap-6"
    >
      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
        className="flex-shrink-0"
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center border-4 border-background shadow-lg">
          <span className="text-xs font-bold text-primary-foreground">
            {index + 1}
          </span>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 text-xs font-bold rounded-full bg-primary/10 text-primary border border-primary/30 uppercase tracking-wider">
            {milestone.phase}
          </span>
          <span className="text-sm text-muted-foreground font-medium">
            {milestone.date || milestone.duration}
          </span>
        </div>

        <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          {milestone.title}
        </h3>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          {milestone.description}
        </p>

        <div className="space-y-2">
          {(milestone.achievements || milestone.outcomes || []).map(
            (achievement, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1 + 0.3 + i * 0.05,
                }}
                className="flex items-start gap-3 group"
              >
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center mt-0.5 group-hover:bg-green-500/20 transition-colors">
                  <span className="text-green-500 text-sm">✓</span>
                </div>
                <span className="text-sm text-foreground/80 leading-relaxed">
                  {achievement}
                </span>
              </motion.div>
            )
          )}
        </div>
      </div>
    </motion.div>
  );
}
