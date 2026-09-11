"use client";

import React, { useEffect, useRef } from "react";

export function LavaFlowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 800);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Fiery Rising Lava Embers
    const emberCount = 55;
    const colors = ["#FF3B00", "#FF7700", "#FFAA00", "#FFD34D", "#FF2200"];

    const embers = Array.from({ length: emberCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3.5 + 1.5,
      speedY: Math.random() * 1.5 + 0.6,
      speedX: (Math.random() - 0.5) * 0.8,
      opacity: Math.random() * 0.8 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: Math.random() * 100,
      maxLife: Math.random() * 120 + 80,
    }));

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Heat Shimmer & Magma Ambient Glow
      const glowFactor = Math.sin(frame * 0.04) * 0.1 + 0.9;
      const bottomGlow = ctx.createLinearGradient(0, height, 0, height * 0.4);
      bottomGlow.addColorStop(0, `rgba(255, 60, 0, ${0.25 * glowFactor})`);
      bottomGlow.addColorStop(0.5, `rgba(255, 120, 0, ${0.12 * glowFactor})`);
      bottomGlow.addColorStop(1, "rgba(255, 60, 0, 0)");

      ctx.fillStyle = bottomGlow;
      ctx.fillRect(0, 0, width, height);

      // Render & Update Rising Volcanic Embers
      for (const e of embers) {
        e.y -= e.speedY;
        e.x += e.speedX + Math.sin(frame * 0.05 + e.life * 0.1) * 0.6;
        e.life++;

        // Reset ember if it reaches top or exceeds lifespan
        if (e.y < -10 || e.life > e.maxLife) {
          e.y = height + Math.random() * 20;
          e.x = Math.random() * width;
          e.life = 0;
          e.speedY = Math.random() * 1.5 + 0.6;
        }

        const alpha = (1 - e.life / e.maxLife) * e.opacity;
        ctx.fillStyle = e.color;
        ctx.shadowColor = e.color;
        ctx.shadowBlur = 8;
        ctx.globalAlpha = alpha;

        // Voxel square ember
        ctx.fillRect(e.x, e.y, e.size, e.size);
      }

      ctx.globalAlpha = 1.0;
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
      className="absolute inset-0 pointer-events-none z-[2] mix-blend-screen opacity-95"
    />
  );
}
