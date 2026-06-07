"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
};

function createParticles(width: number, height: number) {
  const particleCount = Math.max(
    80,
    Math.min(100, Math.round((width * height) / 18000))
  );

  return Array.from({ length: particleCount }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    size: Math.random() * 1.6 + 0.6
  }));
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return undefined;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return undefined;
    }

    let particles: Particle[] = [];
    let frameId = 0;
    let width = 0;
    let height = 0;
    let devicePixelRatio = 1;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      const rect = parent?.getBoundingClientRect();

      width = rect?.width || window.innerWidth;
      height = rect?.height || window.innerHeight;
      devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

      particles = createParticles(width, height);
    };

    const drawFrame = () => {
      context.clearRect(0, 0, width, height);

      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index];

        if (!prefersReducedMotion) {
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x <= 0 || particle.x >= width) {
            particle.vx *= -1;
          }

          if (particle.y <= 0 || particle.y >= height) {
            particle.vy *= -1;
          }
        }

        context.beginPath();
        context.fillStyle = "rgba(255, 138, 91, 0.18)";
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();

        for (let connectionIndex = index + 1; connectionIndex < particles.length; connectionIndex += 1) {
          const otherParticle = particles[connectionIndex];
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance > 100) {
            continue;
          }

          context.beginPath();
          context.strokeStyle = `rgba(255, 209, 102, ${0.14 - distance / 950})`;
          context.lineWidth = 1;
          context.moveTo(particle.x, particle.y);
          context.lineTo(otherParticle.x, otherParticle.y);
          context.stroke();
        }
      }

      if (!prefersReducedMotion) {
        frameId = window.requestAnimationFrame(drawFrame);
      }
    };

    resizeCanvas();
    drawFrame();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
      aria-hidden="true"
    />
  );
}
