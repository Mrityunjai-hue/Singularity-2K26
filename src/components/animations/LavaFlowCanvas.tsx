"use client";

import React, { useEffect, useRef } from "react";

export function LavaFlowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 800);

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
    if (canvas.parentElement) observer.observe(canvas.parentElement);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Fiery Rising Lava Embers
    const emberCount = 30;
    const colors = ["#FF3B00", "#FF7700", "#FFAA00", "#FFD34D", "#FF2200"];

    const embers = Array.from({ length: emberCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1.5,
      speedY: Math.random() * 1.2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.6,
      opacity: Math.random() * 0.7 + 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: Math.random() * 100,
      maxLife: Math.random() * 120 + 80,
    }));

    let frame = 0;

    const render = () => {
      if (!isVisible) return;
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Heat Shimmer & Magma Ambient Glow
      const glowFactor = Math.sin(frame * 0.03) * 0.08 + 0.92;
      const bottomGlow = ctx.createLinearGradient(0, height, 0, height * 0.45);
      bottomGlow.addColorStop(0, `rgba(255, 60, 0, ${0.2 * glowFactor})`);
      bottomGlow.addColorStop(0.5, `rgba(255, 120, 0, ${0.08 * glowFactor})`);
      bottomGlow.addColorStop(1, "rgba(255, 60, 0, 0)");

      ctx.fillStyle = bottomGlow;
      ctx.fillRect(0, 0, width, height);

      // Render & Update Rising Volcanic Embers (fast rendering without shadowBlur)
      for (const e of embers) {
        e.y -= e.speedY;
        e.x += e.speedX + Math.sin(frame * 0.04 + e.life * 0.1) * 0.4;
        e.life++;

        if (e.y < -10 || e.life > e.maxLife) {
          e.y = height + Math.random() * 20;
          e.x = Math.random() * width;
          e.life = 0;
          e.speedY = Math.random() * 1.2 + 0.5;
        }

        const alpha = (1 - e.life / e.maxLife) * e.opacity;
        ctx.fillStyle = e.color;
        ctx.globalAlpha = alpha;
        ctx.fillRect(e.x, e.y, e.size, e.size);
      }

      ctx.globalAlpha = 1.0;

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
      className="absolute inset-0 pointer-events-none z-[2] mix-blend-screen opacity-95"
    />
  );
}
