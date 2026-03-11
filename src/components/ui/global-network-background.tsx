"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * GlobalNetworkBackground
 *
 * An animated SVG background depicting a global network of connections.
 * Features flowing glowing lines across abstract continents with subtle
 * ambient movement. Inspired by Apple/Vercel/Stripe aesthetics.
 *
 * Performance:
 * - GPU-accelerated animations (transform, opacity only)
 * - Respects prefers-reduced-motion
 * - Lightweight SVG-only implementation
 * - Seamless 25-second loop
 */
export function GlobalNetworkBackground() {
  const svgRef = useRef<SVGSVGElement>(null);
  const shouldReduceMotion = prefersReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion || !svgRef.current) return;

    const svg = svgRef.current;

    // Select all connection lines and glows
    const connections = svg.querySelectorAll(".connection-line");
    const glows = svg.querySelectorAll(".connection-glow");
    const nodes = svg.querySelectorAll(".network-node");

    // Main timeline - 25 second loop
    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: "none" },
    });

    // Animate each connection line drawing in
    connections.forEach((line, i) => {
      tl.fromTo(
        line,
        {
          strokeDashoffset: 1000,
        },
        {
          strokeDashoffset: 0,
          duration: 2.5,
          ease: "power2.inOut",
        },
        i * 0.5 // Stagger start times
      );
    });

    // Animate glows flowing along the lines
    glows.forEach((glow, i) => {
      tl.fromTo(
        glow,
        {
          opacity: 0,
          strokeDashoffset: 1000,
        },
        {
          opacity: 1,
          strokeDashoffset: -1000,
          duration: 3,
          ease: "sine.inOut",
          repeat: -1,
          repeatDelay: 2,
        },
        i * 0.8
      );
    });

    // Pulse network nodes
    nodes.forEach((node, i) => {
      tl.to(
        node,
        {
          scale: 1.3,
          opacity: 0.3,
          duration: 1.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        },
        i * 0.6
      );
    });

    // Subtle rotation for depth
    tl.to(
      svg,
      {
        rotation: 2,
        duration: 25,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      },
      0
    );

    return () => {
      tl.kill();
    };
  }, [shouldReduceMotion]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Radial gradient background for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />

      {/* Animated SVG Network */}
      <svg
        ref={svgRef}
        viewBox="0 0 1200 800"
        className="w-full h-full opacity-40"
        style={{ transform: "scale(1.1)" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradient for connection lines */}
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              stopColor="hsl(217, 91%, 60%)"
              stopOpacity="0.2"
            />
            <stop
              offset="50%"
              stopColor="hsl(280, 85%, 65%)"
              stopOpacity="0.4"
            />
            <stop
              offset="100%"
              stopColor="hsl(330, 81%, 60%)"
              stopOpacity="0.2"
            />
          </linearGradient>

          {/* Gradient for glowing effect */}
          <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(217, 91%, 60%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(280, 85%, 65%)" stopOpacity="1" />
            <stop
              offset="100%"
              stopColor="hsl(330, 81%, 60%)"
              stopOpacity="0"
            />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Abstract continent shapes (simplified) */}
        <g className="continents" opacity="0.1">
          {/* North America */}
          <path
            d="M 150 200 Q 200 180 250 200 L 280 250 Q 270 300 250 320 L 180 310 Q 160 260 150 200 Z"
            fill="hsl(217, 91%, 60%)"
          />

          {/* Europe */}
          <path
            d="M 480 180 Q 520 170 550 190 L 560 230 Q 540 250 510 240 L 480 210 Z"
            fill="hsl(217, 91%, 60%)"
          />

          {/* Asia */}
          <path
            d="M 750 150 Q 850 140 920 180 L 950 250 Q 930 320 880 340 L 800 320 Q 760 260 750 150 Z"
            fill="hsl(217, 91%, 60%)"
          />

          {/* South America */}
          <path
            d="M 280 400 Q 320 380 340 420 L 330 520 Q 310 560 280 540 L 270 460 Z"
            fill="hsl(217, 91%, 60%)"
          />

          {/* Africa */}
          <path
            d="M 520 300 Q 560 290 580 330 L 590 450 Q 570 490 540 480 L 520 380 Z"
            fill="hsl(217, 91%, 60%)"
          />

          {/* Australia */}
          <path
            d="M 850 500 Q 900 490 930 520 L 920 560 Q 890 570 860 550 Z"
            fill="hsl(217, 91%, 60%)"
          />
        </g>

        {/* Network connection lines (with dashes for animation) */}
        <g className="connections">
          {/* North America to Europe */}
          <path
            className="connection-line"
            d="M 250 240 Q 350 150 480 200"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            strokeDasharray="1000"
            strokeDashoffset="1000"
            filter="url(#glow)"
          />
          <path
            className="connection-glow"
            d="M 250 240 Q 350 150 480 200"
            fill="none"
            stroke="url(#glowGradient)"
            strokeWidth="4"
            strokeDasharray="100"
            strokeLinecap="round"
            filter="url(#glow)"
          />

          {/* Europe to Asia */}
          <path
            className="connection-line"
            d="M 550 210 Q 650 180 800 200"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            strokeDasharray="1000"
            strokeDashoffset="1000"
            filter="url(#glow)"
          />
          <path
            className="connection-glow"
            d="M 550 210 Q 650 180 800 200"
            fill="none"
            stroke="url(#glowGradient)"
            strokeWidth="4"
            strokeDasharray="100"
            strokeLinecap="round"
            filter="url(#glow)"
          />

          {/* Asia to Australia */}
          <path
            className="connection-line"
            d="M 880 320 Q 900 400 900 520"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            strokeDasharray="1000"
            strokeDashoffset="1000"
            filter="url(#glow)"
          />
          <path
            className="connection-glow"
            d="M 880 320 Q 900 400 900 520"
            fill="none"
            stroke="url(#glowGradient)"
            strokeWidth="4"
            strokeDasharray="100"
            strokeLinecap="round"
            filter="url(#glow)"
          />

          {/* North America to South America */}
          <path
            className="connection-line"
            d="M 250 320 Q 280 360 300 420"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            strokeDasharray="1000"
            strokeDashoffset="1000"
            filter="url(#glow)"
          />
          <path
            className="connection-glow"
            d="M 250 320 Q 280 360 300 420"
            fill="none"
            stroke="url(#glowGradient)"
            strokeWidth="4"
            strokeDasharray="100"
            strokeLinecap="round"
            filter="url(#glow)"
          />

          {/* Europe to Africa */}
          <path
            className="connection-line"
            d="M 520 240 Q 540 270 550 330"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            strokeDasharray="1000"
            strokeDashoffset="1000"
            filter="url(#glow)"
          />
          <path
            className="connection-glow"
            d="M 520 240 Q 540 270 550 330"
            fill="none"
            stroke="url(#glowGradient)"
            strokeWidth="4"
            strokeDasharray="100"
            strokeLinecap="round"
            filter="url(#glow)"
          />

          {/* Cross-continent arc: North America to Asia */}
          <path
            className="connection-line"
            d="M 280 220 Q 500 100 800 180"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            strokeDasharray="1000"
            strokeDashoffset="1000"
            filter="url(#glow)"
          />
          <path
            className="connection-glow"
            d="M 280 220 Q 500 100 800 180"
            fill="none"
            stroke="url(#glowGradient)"
            strokeWidth="4"
            strokeDasharray="100"
            strokeLinecap="round"
            filter="url(#glow)"
          />

          {/* Cross-continent arc: South America to Africa */}
          <path
            className="connection-line"
            d="M 330 460 Q 420 440 540 420"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            strokeDasharray="1000"
            strokeDashoffset="1000"
            filter="url(#glow)"
          />
          <path
            className="connection-glow"
            d="M 330 460 Q 420 440 540 420"
            fill="none"
            stroke="url(#glowGradient)"
            strokeWidth="4"
            strokeDasharray="100"
            strokeLinecap="round"
            filter="url(#glow)"
          />

          {/* Cross-continent arc: Africa to Asia */}
          <path
            className="connection-line"
            d="M 580 380 Q 680 340 820 280"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            strokeDasharray="1000"
            strokeDashoffset="1000"
            filter="url(#glow)"
          />
          <path
            className="connection-glow"
            d="M 580 380 Q 680 340 820 280"
            fill="none"
            stroke="url(#glowGradient)"
            strokeWidth="4"
            strokeDasharray="100"
            strokeLinecap="round"
            filter="url(#glow)"
          />
        </g>

        {/* Network nodes (connection points) */}
        <g className="nodes">
          <circle
            className="network-node"
            cx="250"
            cy="240"
            r="4"
            fill="hsl(217, 91%, 60%)"
            opacity="0.8"
            filter="url(#glow)"
          />
          <circle
            className="network-node"
            cx="480"
            cy="200"
            r="4"
            fill="hsl(280, 85%, 65%)"
            opacity="0.8"
            filter="url(#glow)"
          />
          <circle
            className="network-node"
            cx="800"
            cy="200"
            r="4"
            fill="hsl(330, 81%, 60%)"
            opacity="0.8"
            filter="url(#glow)"
          />
          <circle
            className="network-node"
            cx="900"
            cy="520"
            r="4"
            fill="hsl(217, 91%, 60%)"
            opacity="0.8"
            filter="url(#glow)"
          />
          <circle
            className="network-node"
            cx="300"
            cy="420"
            r="4"
            fill="hsl(280, 85%, 65%)"
            opacity="0.8"
            filter="url(#glow)"
          />
          <circle
            className="network-node"
            cx="550"
            cy="330"
            r="4"
            fill="hsl(330, 81%, 60%)"
            opacity="0.8"
            filter="url(#glow)"
          />
        </g>
      </svg>

      {/* Additional ambient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/20 pointer-events-none" />
    </div>
  );
}
