"use client";

import React, { useEffect, useRef } from "react";

export function NetherCelestialMoon() {
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

    // Cosmic Dust & Amethyst Stardust
    const starCount = 60;
    const colors = ["#C084FC", "#E879F9", "#4FD9FF", "#818CF8", "#F472B6"];

    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      pulse: Math.random() * Math.PI * 2,
    }));

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Moon position: top-center (x: 50%, y: 22%)
      const moonX = width * 0.5;
      const moonY = height * 0.22;
      const moonRadius = Math.min(width, height) * 0.14;

      // Pulsing Gravitational Waves (Expanding concentric rings)
      const waveCount = 3;
      for (let i = 0; i < waveCount; i++) {
        const waveProgress = ((frame * 0.008 + i / waveCount) % 1);
        const waveRadius = moonRadius + waveProgress * (width * 0.35);
        const waveAlpha = (1 - waveProgress) * 0.25;

        ctx.save();
        ctx.beginPath();
        ctx.ellipse(moonX, moonY, waveRadius * 1.6, waveRadius * 0.55, -0.2, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(192, 132, 252, ${waveAlpha})`;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = "#C084FC";
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.restore();
      }

      // Celestial Orbital Particle Rings (Floating crystal dust in the moon's rings)
      const ringParticleCount = 40;
      ctx.save();
      for (let i = 0; i < ringParticleCount; i++) {
        const angle = (i * (Math.PI * 2)) / ringParticleCount + frame * 0.003;
        const ringRadiusX = moonRadius * 2.2 + Math.sin(i * 3 + frame * 0.02) * 15;
        const ringRadiusY = moonRadius * 0.75 + Math.cos(i * 3 + frame * 0.02) * 8;

        const px = moonX + Math.cos(angle) * ringRadiusX;
        const py = moonY + Math.sin(angle) * ringRadiusY;

        ctx.fillStyle = i % 2 === 0 ? "#4FD9FF" : "#E879F9";
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 8;
        ctx.fillRect(px, py, 2.5, 2.5);
      }
      ctx.restore();

      // Render Floating Amethyst Stardust
      for (const s of stars) {
        s.x += s.speedX;
        s.y += s.speedY;
        s.pulse += 0.03;

        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        const opacity = Math.sin(s.pulse) * 0.4 + 0.6;
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 6;
        ctx.globalAlpha = opacity;
        ctx.fillRect(s.x, s.y, s.size, s.size);
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
      className="absolute inset-0 pointer-events-none z-[2] mix-blend-screen opacity-90"
    />
  );
}
