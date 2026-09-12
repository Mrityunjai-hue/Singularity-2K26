"use client";

import React, { useEffect, useRef } from "react";

export function NetherCelestialMoon() {
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

    // Cosmic Dust & Amethyst Stardust
    const starCount = 30;
    const colors = ["#C084FC", "#E879F9", "#4FD9FF", "#818CF8", "#F472B6"];

    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: (Math.random() - 0.5) * 0.25,
      color: colors[Math.floor(Math.random() * colors.length)],
      pulse: Math.random() * Math.PI * 2,
    }));

    let frame = 0;

    const render = () => {
      if (!isVisible) return;
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Moon position: top-center
      const moonX = width * 0.5;
      const moonY = height * 0.22;
      const moonRadius = Math.min(width, height) * 0.14;

      // Pulsing Gravitational Waves (Expanding concentric rings without heavy blur)
      const waveCount = 3;
      for (let i = 0; i < waveCount; i++) {
        const waveProgress = (frame * 0.006 + i / waveCount) % 1;
        const waveRadius = moonRadius + waveProgress * (width * 0.35);
        const waveAlpha = (1 - waveProgress) * 0.2;

        ctx.save();
        ctx.beginPath();
        ctx.ellipse(moonX, moonY, waveRadius * 1.6, waveRadius * 0.55, -0.2, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(192, 132, 252, ${waveAlpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      }

      // Celestial Orbital Particle Rings
      const ringParticleCount = 28;
      ctx.save();
      for (let i = 0; i < ringParticleCount; i++) {
        const angle = (i * (Math.PI * 2)) / ringParticleCount + frame * 0.0025;
        const ringRadiusX = moonRadius * 2.2 + Math.sin(i * 3 + frame * 0.015) * 12;
        const ringRadiusY = moonRadius * 0.75 + Math.cos(i * 3 + frame * 0.015) * 6;

        const px = moonX + Math.cos(angle) * ringRadiusX;
        const py = moonY + Math.sin(angle) * ringRadiusY;

        ctx.fillStyle = i % 2 === 0 ? "#4FD9FF" : "#E879F9";
        ctx.fillRect(px, py, 2, 2);
      }
      ctx.restore();

      // Render Floating Amethyst Stardust
      for (const s of stars) {
        s.x += s.speedX;
        s.y += s.speedY;
        s.pulse += 0.025;

        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        const opacity = Math.sin(s.pulse) * 0.35 + 0.65;
        ctx.fillStyle = s.color;
        ctx.globalAlpha = opacity;
        ctx.fillRect(s.x, s.y, s.size, s.size);
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
      className="absolute inset-0 pointer-events-none z-[2] mix-blend-screen opacity-90"
    />
  );
}
