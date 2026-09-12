"use client";

import React, { useEffect, useRef } from "react";

export function HeroSunRays() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Pause rendering when scrolled out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          cancelAnimationFrame(animationFrameId);
          render();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Sunlight particles
    const particleCount = 28;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1,
      speedX: (Math.random() - 0.3) * 0.3,
      speedY: Math.random() * 0.4 + 0.15,
      opacity: Math.random() * 0.6 + 0.3,
      pulse: Math.random() * Math.PI * 2,
    }));

    let frame = 0;

    const render = () => {
      if (!isVisible) return;
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Sun position
      const sunX = width * 0.5;
      const sunY = height * 0.22;

      // Volumetric Radial Sun Glow
      const pulseFactor = Math.sin(frame * 0.02) * 0.1 + 1;
      const gradient = ctx.createRadialGradient(
        sunX,
        sunY,
        20 * pulseFactor,
        sunX,
        sunY,
        width * 0.6
      );
      gradient.addColorStop(0, "rgba(255, 245, 180, 0.35)");
      gradient.addColorStop(0.2, "rgba(255, 200, 80, 0.18)");
      gradient.addColorStop(0.5, "rgba(255, 150, 50, 0.05)");
      gradient.addColorStop(1, "rgba(255, 150, 50, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Rotating Volumetric God Rays
      const rayCount = 10;
      ctx.save();
      ctx.translate(sunX, sunY);
      ctx.rotate(frame * 0.0008);

      for (let i = 0; i < rayCount; i++) {
        const angle = (i * (Math.PI * 2)) / rayCount;
        const rayWidth = 0.1 + Math.sin(frame * 0.015 + i) * 0.015;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, width * 0.8, angle - rayWidth, angle + rayWidth);
        ctx.closePath();

        const rayGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, width * 0.8);
        rayGrad.addColorStop(0, "rgba(255, 235, 150, 0.14)");
        rayGrad.addColorStop(0.4, "rgba(255, 200, 100, 0.05)");
        rayGrad.addColorStop(1, "rgba(255, 180, 50, 0)");

        ctx.fillStyle = rayGrad;
        ctx.fill();
      }
      ctx.restore();

      // Render Floating Sunlight Particles (without heavy shadowBlur)
      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += 0.03;

        if (p.y > height) {
          p.y = -10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        const currentOpacity = (Math.sin(p.pulse) * 0.3 + 0.7) * p.opacity;
        ctx.fillStyle = `rgba(255, 235, 150, ${currentOpacity})`;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[2] mix-blend-screen opacity-90"
    />
  );
}
