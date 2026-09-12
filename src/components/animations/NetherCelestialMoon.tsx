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

    // 1. Cosmic Amethyst Stardust & Ender Particles
    const starCount = 42;
    const starColors = ["#C084FC", "#E879F9", "#4FD9FF", "#818CF8", "#F472B6", "#A78BFA"];

    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1.2,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: (Math.random() - 0.5) * 0.35,
      color: starColors[Math.floor(Math.random() * starColors.length)],
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.04 + 0.02,
    }));

    // 2. Shooting Star Celestial Comets
    interface Comet {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      color: string;
      life: number;
      maxLife: number;
    }
    const comets: Comet[] = [];
    let cometTimer = 0;

    let frame = 0;

    const render = () => {
      if (!isVisible) return;
      frame++;
      ctx.clearRect(0, 0, width, height);

      // ==========================================
      // SECTION A: CELESTIAL MOON GLOW & GRAVITATIONAL WAVES
      // ==========================================
      const moonX = width * 0.5;
      const moonY = height * 0.22;
      const moonRadius = Math.min(width, height) * 0.15;

      // Deep Cosmic Nebula Core Glow
      const nebulaFactor = Math.sin(frame * 0.02) * 0.1 + 0.9;
      const moonGlow = ctx.createRadialGradient(
        moonX,
        moonY,
        moonRadius * 0.3,
        moonX,
        moonY,
        moonRadius * 3.5
      );
      moonGlow.addColorStop(0, `rgba(192, 132, 252, ${0.35 * nebulaFactor})`);
      moonGlow.addColorStop(0.35, `rgba(79, 217, 255, ${0.15 * nebulaFactor})`);
      moonGlow.addColorStop(0.7, `rgba(147, 51, 234, ${0.05 * nebulaFactor})`);
      moonGlow.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = moonGlow;
      ctx.fillRect(0, 0, width, height);

      // Expanding Concentric Gravitational Wave Rings
      const waveCount = 4;
      for (let i = 0; i < waveCount; i++) {
        const waveProgress = (frame * 0.005 + i / waveCount) % 1;
        const waveRadius = moonRadius + waveProgress * (width * 0.45);
        const waveAlpha = (1 - waveProgress) * 0.28;

        ctx.save();
        ctx.beginPath();
        ctx.ellipse(moonX, moonY, waveRadius * 1.6, waveRadius * 0.55, -0.18, 0, Math.PI * 2);
        ctx.strokeStyle = i % 2 === 0 ? `rgba(192, 132, 252, ${waveAlpha})` : `rgba(79, 217, 255, ${waveAlpha * 0.8})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      }

      // ==========================================
      // SECTION B: DUAL ORBITING CELESTIAL PARTICLE RINGS
      // ==========================================
      const ringParticleCount = 36;
      ctx.save();
      for (let i = 0; i < ringParticleCount; i++) {
        // Inner Ring
        const angle1 = (i * (Math.PI * 2)) / ringParticleCount + frame * 0.0035;
        const ring1X = moonRadius * 2.1 + Math.sin(i * 3 + frame * 0.02) * 14;
        const ring1Y = moonRadius * 0.72 + Math.cos(i * 3 + frame * 0.02) * 7;
        const p1x = moonX + Math.cos(angle1) * ring1X;
        const p1y = moonY + Math.sin(angle1) * ring1Y;

        ctx.fillStyle = i % 2 === 0 ? "#4FD9FF" : "#E879F9";
        ctx.fillRect(Math.floor(p1x), Math.floor(p1y), 2.5, 2.5);

        // Outer Ring (reverse tilt)
        const angle2 = (i * (Math.PI * 2)) / ringParticleCount - frame * 0.0025;
        const ring2X = moonRadius * 2.8 + Math.sin(i * 2 + frame * 0.015) * 18;
        const ring2Y = moonRadius * 0.95 + Math.cos(i * 2 + frame * 0.015) * 9;
        const p2x = moonX + Math.cos(angle2) * ring2X;
        const p2y = moonY + Math.sin(angle2) * ring2Y;

        ctx.fillStyle = i % 3 === 0 ? "#FFD34D" : i % 3 === 1 ? "#C084FC" : "#55FF55";
        ctx.fillRect(Math.floor(p2x), Math.floor(p2y), 2, 2);
      }
      ctx.restore();

      // ==========================================
      // SECTION C: SHOOTING STAR CELESTIAL COMETS
      // ==========================================
      cometTimer++;
      if (cometTimer % 90 === 0) {
        comets.push({
          x: Math.random() * (width * 0.8) + width * 0.1,
          y: Math.random() * (height * 0.3),
          length: Math.random() * 80 + 60,
          speed: Math.random() * 8 + 6,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3, // ~45 deg downward right
          opacity: 0.85,
          color: Math.random() > 0.5 ? "#4FD9FF" : "#E879F9",
          life: 0,
          maxLife: 30,
        });
      }

      for (let i = comets.length - 1; i >= 0; i--) {
        const c = comets[i];
        c.x += Math.cos(c.angle) * c.speed;
        c.y += Math.sin(c.angle) * c.speed;
        c.life++;

        if (c.life >= c.maxLife) {
          comets.splice(i, 1);
          continue;
        }

        const alpha = (1 - c.life / c.maxLife) * c.opacity;
        const tailX = c.x - Math.cos(c.angle) * c.length;
        const tailY = c.y - Math.sin(c.angle) * c.length;

        const cometGrad = ctx.createLinearGradient(c.x, c.y, tailX, tailY);
        cometGrad.addColorStop(0, c.color);
        cometGrad.addColorStop(0.2, "rgba(255, 255, 255, 0.9)");
        cometGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.save();
        ctx.strokeStyle = cometGrad;
        ctx.lineWidth = 2.5;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Bright comet head
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(Math.floor(c.x - 1.5), Math.floor(c.y - 1.5), 3, 3);
        ctx.restore();
      }

      // ==========================================
      // SECTION D: FLOATING AMETHYST STARDUST PARTICLES
      // ==========================================
      for (const s of stars) {
        s.x += s.speedX;
        s.y += s.speedY;
        s.pulse += s.pulseSpeed;

        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        const opacity = Math.sin(s.pulse) * 0.4 + 0.6;
        ctx.fillStyle = s.color;
        ctx.globalAlpha = opacity;
        ctx.fillRect(Math.floor(s.x), Math.floor(s.y), Math.floor(s.size), Math.floor(s.size));
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
