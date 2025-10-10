"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMounted, setIsMounted] = useState(false);

  // Cursor tracking with smooth spring animation
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { damping: 20, stiffness: 100 });
  const smoothY = useSpring(cursorY, { damping: 20, stiffness: 100 });

  useEffect(() => {
    setIsMounted(true);

    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Particle system
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
    }

    const particles: Particle[] = [];
    const particleCount = 50;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        color: ["#3b82f6", "#8b5cf6", "#ec4899", "#06b6d4", "#10b981"][
          Math.floor(Math.random() * 5)
        ],
      });
    }

    let animationFrameId: number;

    const animate = () => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections between nearby particles
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(139, 92, 246, ${
              (1 - distance / 150) * 0.2
            })`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      // Draw and update particles
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle =
          particle.color +
          Math.floor(particle.opacity * 255)
            .toString(16)
            .padStart(2, "0");
        ctx.fill();

        // Glow effect
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 3
        );
        gradient.addColorStop(0, particle.color + "40");
        gradient.addColorStop(1, particle.color + "00");
        ctx.fillStyle = gradient;
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Subtle pulsing
        particle.opacity =
          0.3 + Math.sin(Date.now() * 0.001 + particle.x) * 0.2;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Light mode: Creative wave and gradient streams design */}
      <div className="absolute inset-0 dark:hidden">
        {/* Static waves at the bottom */}
        <svg
          className="absolute bottom-0 left-0 w-full h-64"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="url(#wave-gradient-1)"
            fillOpacity="0.3"
            d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,133.3C672,117,768,107,864,122.7C960,139,1056,181,1152,181.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
          <path
            fill="url(#wave-gradient-2)"
            fillOpacity="0.25"
            d="M0,160L48,144C96,128,192,96,288,96C384,96,480,128,576,133.3C672,139,768,117,864,117.3C960,117,1056,139,1152,154.7C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
          <defs>
            <linearGradient
              id="wave-gradient-1"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <linearGradient
              id="wave-gradient-2"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
        </svg>

        {/* Flowing gradient ribbons */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`ribbon-${i}`}
            className="absolute h-1 rounded-full"
            style={{
              background: `linear-gradient(90deg, 
                ${i === 0 ? "rgba(59, 130, 246, 0.4)" : ""}
                ${i === 1 ? "rgba(139, 92, 246, 0.4)" : ""}
                ${i === 2 ? "rgba(236, 72, 153, 0.4)" : ""}
                ${i === 3 ? "rgba(6, 182, 212, 0.4)" : ""}
                , transparent)`,
              width: "60%",
              top: `${15 + i * 18}%`,
              left: "-60%",
            }}
            animate={{
              left: ["110%", "-60%"],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: "linear",
              delay: i * 4,
            }}
          />
        ))}

        {/* Floating glassmorphic cards */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`glass-${i}`}
            className="absolute backdrop-blur-lg bg-white/20 rounded-2xl border border-white/30 shadow-xl"
            style={{
              width: 80 + i * 20,
              height: 80 + i * 20,
              left: `${15 + i * 18}%`,
              top: `${10 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -40, 0],
              rotate: [0, 10, 0, -10, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
          />
        ))}
      </div>

      {/* Dark mode: Darker gradient orbs */}
      <div className="absolute inset-0 hidden dark:block">
        {/* Large orb 1 - Blue/Purple */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-float" />

        {/* Large orb 2 - Purple/Pink */}
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-float-delayed" />

        {/* Medium orb 1 - Cyan */}
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-float-slow" />

        {/* Medium orb 2 - Emerald */}
        <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-gradient-to-br from-emerald-500/15 to-green-500/15 rounded-full blur-3xl animate-float-reverse" />

        {/* Small accent orbs */}
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-full blur-2xl animate-pulse-slow" />
        <div className="absolute top-2/3 left-1/4 w-40 h-40 bg-gradient-to-br from-indigo-500/15 to-purple-500/15 rounded-full blur-2xl animate-float-delayed" />
      </div>

      {/* Particle canvas - only in dark mode */}
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0 pointer-events-none hidden dark:block"
      />

      {/* Cursor spotlight effect - only in dark mode */}
      <motion.div
        className="pointer-events-none fixed w-[600px] h-[600px] rounded-full hidden dark:block"
        style={{
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0.05) 30%, transparent 70%)",
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Animated rays from center - only in dark mode */}
      <div className="absolute inset-0 items-center justify-center overflow-hidden opacity-20 hidden dark:flex">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 bg-gradient-to-t from-transparent via-primary/40 to-transparent"
            style={{
              height: "200%",
              transformOrigin: "center center",
              rotate: (360 / 12) * i,
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scaleY: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: (i * 4) / 12,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Floating geometric shapes - only in dark mode */}
      <div className="absolute inset-0 overflow-hidden hidden dark:block">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-primary/10 rounded-lg"
            style={{
              width: 40 + i * 15,
              height: 40 + i * 15,
              left: `${10 + i * 10}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              rotate: [0, 360],
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 20 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Scanline effect - only visible in dark mode */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-100"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 92, 246, 0.03) 2px, rgba(139, 92, 246, 0.03) 4px)",
        }}
        animate={{
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Vignette effect - only in dark mode */}
      <div className="absolute inset-0 pointer-events-none hidden dark:block dark:bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
    </div>
  );
}
