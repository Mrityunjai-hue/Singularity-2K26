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

    // 1. Fiery Rising Volcanic Embers & Cinders
    const emberCount = 48;
    const emberColors = ["#FFF099", "#FFD34D", "#FF7700", "#FF3B00", "#E14E3D", "#990A00"];

    const embers = Array.from({ length: emberCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1.5,
      speedY: Math.random() * 1.5 + 0.6,
      speedX: (Math.random() - 0.5) * 0.8,
      opacity: Math.random() * 0.7 + 0.3,
      color: emberColors[Math.floor(Math.random() * emberColors.length)],
      life: Math.random() * 120,
      maxLife: Math.random() * 140 + 90,
      wobbleSpeed: Math.random() * 0.06 + 0.03,
    }));

    // 2. Bursting Magma Spark Particles
    interface MagmaSpark {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      life: number;
      maxLife: number;
    }
    const sparks: MagmaSpark[] = [];
    let sparkSpawnTimer = 0;

    let frame = 0;

    const render = () => {
      if (!isVisible) return;
      frame++;
      ctx.clearRect(0, 0, width, height);

      // ==========================================
      // SECTION A: AMBIENT VOLCANIC HEAT SHIMMER & MAGMA GLOW
      // ==========================================
      const heatPulse = Math.sin(frame * 0.035) * 0.1 + 0.9;
      const bottomGlow = ctx.createLinearGradient(0, height, 0, height * 0.35);
      bottomGlow.addColorStop(0, `rgba(255, 45, 0, ${0.28 * heatPulse})`);
      bottomGlow.addColorStop(0.4, `rgba(255, 110, 0, ${0.12 * heatPulse})`);
      bottomGlow.addColorStop(0.8, `rgba(255, 180, 0, ${0.04 * heatPulse})`);
      bottomGlow.addColorStop(1, "rgba(255, 45, 0, 0)");

      ctx.fillStyle = bottomGlow;
      ctx.fillRect(0, 0, width, height);

      // Left & Right Lava Falls Ambient Glow
      const leftLavaGlow = ctx.createRadialGradient(0, height * 0.5, 20, 0, height * 0.5, width * 0.35);
      leftLavaGlow.addColorStop(0, `rgba(255, 90, 0, ${0.22 * heatPulse})`);
      leftLavaGlow.addColorStop(1, "rgba(255, 90, 0, 0)");
      ctx.fillStyle = leftLavaGlow;
      ctx.fillRect(0, 0, width * 0.4, height);

      const rightLavaGlow = ctx.createRadialGradient(width, height * 0.5, 20, width, height * 0.5, width * 0.35);
      rightLavaGlow.addColorStop(0, `rgba(255, 90, 0, ${0.22 * heatPulse})`);
      rightLavaGlow.addColorStop(1, "rgba(255, 90, 0, 0)");
      ctx.fillStyle = rightLavaGlow;
      ctx.fillRect(width * 0.6, 0, width * 0.4, height);

      // ==========================================
      // SECTION B: FLOWING MAGMA CASCADE CHANNELS (LEFT & RIGHT)
      // ==========================================
      const cascadeCount = 12;
      for (let i = 0; i < cascadeCount; i++) {
        // Left lava stream
        const leftNormY = ((frame * 1.5 + i * (height / cascadeCount)) % height);
        const leftWobble = Math.sin(frame * 0.04 + i * 1.5) * (width * 0.02);
        const leftX = width * 0.08 + leftWobble;

        const leftWidth = Math.sin(frame * 0.03 + i) * 12 + 28;
        const leftGrad = ctx.createLinearGradient(leftX, leftNormY, leftX + leftWidth, leftNormY);
        leftGrad.addColorStop(0, "rgba(255, 50, 0, 0.25)");
        leftGrad.addColorStop(0.5, "rgba(255, 210, 60, 0.4)");
        leftGrad.addColorStop(1, "rgba(255, 50, 0, 0.25)");

        ctx.fillStyle = leftGrad;
        ctx.fillRect(Math.floor(leftX), Math.floor(leftNormY), Math.floor(leftWidth), 8);

        // Right lava stream
        const rightNormY = ((frame * 1.8 + i * (height / cascadeCount)) % height);
        const rightWobble = Math.cos(frame * 0.04 + i * 1.2) * (width * 0.02);
        const rightX = width * 0.88 + rightWobble;
        const rightWidth = Math.sin(frame * 0.035 + i * 2) * 14 + 32;

        const rightGrad = ctx.createLinearGradient(rightX, rightNormY, rightX + rightWidth, rightNormY);
        rightGrad.addColorStop(0, "rgba(255, 50, 0, 0.25)");
        rightGrad.addColorStop(0.5, "rgba(255, 230, 80, 0.45)");
        rightGrad.addColorStop(1, "rgba(255, 50, 0, 0.25)");

        ctx.fillStyle = rightGrad;
        ctx.fillRect(Math.floor(rightX), Math.floor(rightNormY), Math.floor(rightWidth), 8);
      }

      // ==========================================
      // SECTION C: BURSTING MAGMA BUBBLES & SPARK BURSTS
      // ==========================================
      sparkSpawnTimer++;
      if (sparkSpawnTimer % 28 === 0) {
        // Pick a magma origin point (left or right lava pool or bottom)
        const isLeft = Math.random() > 0.5;
        const originX = isLeft ? Math.random() * (width * 0.25) : width * 0.75 + Math.random() * (width * 0.25);
        const originY = height * 0.65 + Math.random() * (height * 0.3);

        const burstCount = Math.floor(Math.random() * 5 + 4);
        for (let j = 0; j < burstCount; j++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 2.5 + 1.2;
          sparks.push({
            x: originX,
            y: originY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 1.2, // bias upward
            size: Math.random() * 2.5 + 1.5,
            color: emberColors[Math.floor(Math.random() * (emberColors.length - 1))],
            life: 0,
            maxLife: Math.random() * 35 + 25,
          });
        }
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vy += 0.06; // gravity
        sp.life++;

        if (sp.life >= sp.maxLife) {
          sparks.splice(i, 1);
          continue;
        }

        const alpha = (1 - sp.life / sp.maxLife);
        ctx.fillStyle = sp.color;
        ctx.globalAlpha = alpha;
        ctx.fillRect(Math.floor(sp.x), Math.floor(sp.y), Math.floor(sp.size), Math.floor(sp.size));
      }

      // ==========================================
      // SECTION D: RISING VOLCANIC EMBERS & CINDERS
      // ==========================================
      for (const e of embers) {
        e.y -= e.speedY;
        e.x += e.speedX + Math.sin(frame * e.wobbleSpeed + e.life * 0.08) * 0.5;
        e.life++;

        if (e.y < -10 || e.life > e.maxLife) {
          e.y = height + Math.random() * 25;
          e.x = Math.random() * width;
          e.life = 0;
          e.speedY = Math.random() * 1.5 + 0.6;
        }

        const alpha = (1 - e.life / e.maxLife) * e.opacity;
        ctx.fillStyle = e.color;
        ctx.globalAlpha = alpha;
        ctx.fillRect(Math.floor(e.x), Math.floor(e.y), Math.floor(e.size), Math.floor(e.size));
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
