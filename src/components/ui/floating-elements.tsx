"use client";

import { Code2, Database, Cloud, Cpu, Boxes, Zap } from "lucide-react";

const icons = [
  { Icon: Code2, delay: "0s", position: "top-20 left-10" },
  { Icon: Database, delay: "2s", position: "top-40 right-20" },
  { Icon: Cloud, delay: "4s", position: "bottom-40 left-20" },
  { Icon: Cpu, delay: "6s", position: "bottom-20 right-10" },
  { Icon: Boxes, delay: "3s", position: "top-1/3 right-40" },
  { Icon: Zap, delay: "5s", position: "bottom-1/3 left-40" },
];

export function FloatingElements() {
  return (
    <div className="fixed inset-0 -z-40 overflow-hidden pointer-events-none">
      {icons.map(({ Icon, delay, position }, index) => (
        <div
          key={index}
          className={`absolute ${position} opacity-10 dark:opacity-20`}
          style={{
            animationDelay: delay,
          }}
        >
          <div className="animate-float">
            <Icon className="w-16 h-16 text-primary" />
          </div>
        </div>
      ))}
    </div>
  );
}
