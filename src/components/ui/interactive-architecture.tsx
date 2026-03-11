"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Service {
  id: string;
  name: string;
  description: string;
  tech: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
}

interface InteractiveArchitectureProps {
  services: Service[];
}

export function InteractiveArchitecture({ services }: InteractiveArchitectureProps) {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const selected = services.find(s => s.id === selectedService);

  return (
    <div className="my-8">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {services.map((service) => (
          <motion.button
            key={service.id}
            onClick={() => setSelectedService(
              selectedService === service.id ? null : service.id
            )}
            className={`
              p-4 rounded-lg border-2 transition-all text-left
              ${selectedService === service.id
                ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20"
                : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
              }
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <h3 className="font-semibold text-white mb-1">{service.name}</h3>
            <p className="text-xs text-gray-400 line-clamp-2">
              {service.description}
            </p>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-6 rounded-lg border border-blue-500/50 bg-gradient-to-br from-blue-900/20 to-purple-900/20"
          >
            <h3 className="text-2xl font-bold text-white mb-3">{selected.name}</h3>
            <p className="text-gray-300 mb-4">{selected.description}</p>
            
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-400 mb-2">Technology Stack</h4>
              <div className="flex flex-wrap gap-2">
                {selected.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-gray-800 text-gray-300 border border-gray-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {selected.metrics && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {selected.metrics.map((metric, i) => (
                  <div key={i} className="p-3 rounded bg-gray-800/50 border border-gray-700">
                    <div className="text-2xl font-bold text-blue-400">{metric.value}</div>
                    <div className="text-xs text-gray-400">{metric.label}</div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

