"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

interface Metric {
  label: string;
  value: string;
  change: string;
  description: string;
  icon?: string;
}

interface InteractiveMetricsProps {
  metrics: Metric[];
}

function MetricCard({ metric, index }: { metric: Metric; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      setTimeout(() => setIsVisible(true), index * 100);
    }
  }, [inView, index]);

  return (
    <div
      ref={ref}
      className={`
        group relative p-6 rounded-lg border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-800
        hover:border-blue-500/50 transition-all duration-500
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10">
        {metric.icon && (
          <div className="text-3xl mb-3">{metric.icon}</div>
        )}
        
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-4xl font-bold text-white">{metric.value}</span>
          <span className={`text-sm font-medium px-2 py-1 rounded ${
            metric.change.startsWith("↑") 
              ? "text-green-400 bg-green-400/10" 
              : metric.change.startsWith("↓")
              ? "text-blue-400 bg-blue-400/10"
              : "text-yellow-400 bg-yellow-400/10"
          }`}>
            {metric.change}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-300 mb-1">
          {metric.label}
        </h3>
        
        <p className="text-sm text-gray-400">
          {metric.description}
        </p>
      </div>
    </div>
  );
}

export function InteractiveMetrics({ metrics }: InteractiveMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
      {metrics.map((metric, index) => (
        <MetricCard key={index} metric={metric} index={index} />
      ))}
    </div>
  );
}

