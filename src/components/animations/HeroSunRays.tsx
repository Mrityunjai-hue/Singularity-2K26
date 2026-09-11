"use client";

import React, { useEffect, useRef } from "react";

export function HeroSunRays() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Sunlight particles (Golden pollen / dust drifting in the morning sun rays)
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.3) * 0.4,
      speedY: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.7 + 0.3,
      pulse: Math.random() * Math.PI * 2,
    }));

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Sun position: top-center (x: 50%, y: 25%)
      const sunX = width * 0.5;
      const sunY = height * 0.22;

      // Draw Volumetric Radial Sun Glow
      const pulseFactor = Math.sin(frame * 0.03) * 0.15 + 1;
      const gradient = ctx.createRadialGradient(
        sunX,
        sunY,
        20 * pulseFactor,
        sunX,
        sunY,
        width * 0.65
      );
      gradient.addColorStop(0, "rgba(255, 245, 180, 0.45)");
      gradient.addColorStop(0.2, "rgba(255, 200, 80, 0.25)");
      gradient.addColorStop(0.5, "rgba(255, 150, 50, 0.08)");
      gradient.addColorStop(1, "rgba(255, 150, 50, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw Rotating Volumetric God Rays
      const rayCount = 12;
      ctx.save();
      ctx.translate(sunX, sunY);
      ctx.rotate(frame * 0.001);

      for (let i = 0; i < rayCount; i++) {
        const angle = (i * (Math.PI * 2)) / rayCount;
        const rayWidth = 0.12 + Math.sin(frame * 0.02 + i) * 0.02;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, width * 0.9, angle - rayWidth, angle + rayWidth);
        ctx.closePath();

        const rayGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, width * 0.9);
        rayGrad.addColorStop(0, "rgba(255, 235, 150, 0.18)");
        rayGrad.addColorStop(0.4, "rgba(255, 200, 100, 0.08)");
        rayGrad.addColorStop(1, "rgba(255, 180, 50, 0)");

        ctx.fillStyle = rayGrad;
        ctx.fill();
      }
      ctx.restore();

      // Render Floating Sunlight Particles
      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += 0.04;

        if (p.y > height) {
          p.y = -10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        const currentOpacity = (Math.sin(p.pulse) * 0.3 + 0.7) * p.opacity;
        ctx.fillStyle = `rgba(255, 235, 150, ${currentOpacity})`;
        ctx.shadowColor = "#FFE066";
        ctx.shadowBlur = 6;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[2] mix-blend-screen opacity-90"
      style={{ willChange: "transform" }}
    />
  );
}
