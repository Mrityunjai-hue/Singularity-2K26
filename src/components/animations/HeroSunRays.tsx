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

    // Pause rendering when scrolled out of view to preserve CPU/GPU
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

    // Interactive mouse ripple tracking on water area
    let mousePos = { x: -999, y: -999, isMoving: false };
    let lastRippleTime = 0;

    interface WaterRipple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      opacity: number;
      speed: number;
    }
    const ripples: WaterRipple[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mousePos = { x, y, isMoving: true };

      // Spawn ripple if inside water body (bottom-left region)
      const isOverWater = x < width * 0.44 && y > height * 0.52 && y < height * 0.96;
      const now = performance.now();
      if (isOverWater && now - lastRippleTime > 120) {
        lastRippleTime = now;
        ripples.push({
          x,
          y,
          radius: 4,
          maxRadius: Math.random() * 25 + 30,
          opacity: 0.7,
          speed: Math.random() * 0.6 + 0.8,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 1. Ambient Sunbeam Dust Motes
    const particleCount = 32;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1.2,
      speedX: (Math.random() - 0.3) * 0.35,
      speedY: Math.random() * 0.45 + 0.15,
      opacity: Math.random() * 0.6 + 0.3,
      pulse: Math.random() * Math.PI * 2,
    }));

    // 2. Animated Specular Water Sparkles (Sunlight Glints on River/Lake)
    const waterSparkleCount = 22;
    const waterSparkles = Array.from({ length: waterSparkleCount }, () => ({
      normX: Math.random() * 0.36 + 0.02, // left 2% to 38%
      normY: Math.random() * 0.38 + 0.56, // y: 56% to 94%
      size: Math.random() * 3 + 2,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.04 + 0.02,
      colorType: Math.random() > 0.4 ? "gold" : "cyan",
      driftSpeed: (Math.random() - 0.2) * 0.15,
    }));

    // 3. Cabin Chimney Smoke Puffs
    interface SmokePuff {
      x: number;
      y: number;
      size: number;
      opacity: number;
      speedY: number;
      speedX: number;
      wobble: number;
    }
    const smokePuffs: SmokePuff[] = [];
    let smokeSpawnTimer = 0;

    // 4. Meadow Fireflies & Glowing Flora Particles (Bottom-Right Pasture)
    const fireflyCount = 14;
    const fireflies = Array.from({ length: fireflyCount }, () => ({
      normX: Math.random() * 0.32 + 0.66, // right 66% to 98%
      normY: Math.random() * 0.28 + 0.68, // y: 68% to 96%
      size: Math.random() * 2.5 + 1.5,
      pulse: Math.random() * Math.PI * 2,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.25,
      hue: Math.random() > 0.5 ? "emerald" : "gold",
    }));

    // 5. Distant Soaring Voxel Birds across Mountain Peaks
    const birds = [
      { x: -50, y: height * 0.18, speed: 1.1, size: 4, wingFrame: 0 },
      { x: -90, y: height * 0.22, speed: 1.25, size: 3.5, wingFrame: 3 },
      { x: -140, y: height * 0.20, speed: 1.05, size: 4.5, wingFrame: 6 },
    ];

    let frame = 0;

    const render = () => {
      if (!isVisible) return;
      frame++;
      ctx.clearRect(0, 0, width, height);

      // ==========================================
      // SECTION A: ROTATING VOLUMETRIC GOD RAYS & SUN GLOW
      // ==========================================
      const sunX = width * 0.5;
      const sunY = height * 0.22;

      // Volumetric Radial Sun Glow
      const pulseFactor = Math.sin(frame * 0.02) * 0.08 + 1;
      const gradient = ctx.createRadialGradient(
        sunX,
        sunY,
        25 * pulseFactor,
        sunX,
        sunY,
        width * 0.65
      );
      gradient.addColorStop(0, "rgba(255, 248, 200, 0.42)");
      gradient.addColorStop(0.2, "rgba(255, 205, 90, 0.22)");
      gradient.addColorStop(0.5, "rgba(255, 150, 50, 0.07)");
      gradient.addColorStop(1, "rgba(255, 150, 50, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Rotating Volumetric God Rays
      const rayCount = 11;
      ctx.save();
      ctx.translate(sunX, sunY);
      ctx.rotate(frame * 0.0006);

      for (let i = 0; i < rayCount; i++) {
        const angle = (i * (Math.PI * 2)) / rayCount;
        const rayWidth = 0.12 + Math.sin(frame * 0.015 + i * 1.3) * 0.02;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, width * 0.85, angle - rayWidth, angle + rayWidth);
        ctx.closePath();

        const rayGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, width * 0.85);
        rayGrad.addColorStop(0, "rgba(255, 240, 160, 0.18)");
        rayGrad.addColorStop(0.4, "rgba(255, 210, 110, 0.07)");
        rayGrad.addColorStop(1, "rgba(255, 180, 50, 0)");

        ctx.fillStyle = rayGrad;
        ctx.fill();
      }
      ctx.restore();

      // ==========================================
      // SECTION B: ANIMATED LIVING WATER (LAKE & RIVER SHIMMERS)
      // ==========================================
      // Water boundaries in current resolution
      const waterLeft = 0;
      const waterRight = width * 0.40;
      const waterTop = height * 0.55;
      const waterBottom = height * 0.94;
      const waterHeight = waterBottom - waterTop;

      // Draw undulating pixel wave strips across the water body
      const waveBandCount = 18;
      for (let i = 0; i < waveBandCount; i++) {
        const normY = i / waveBandCount;
        const yBase = waterTop + normY * waterHeight;
        const waveSpeed = 0.03 + (i % 3) * 0.01;
        const waveOffset = Math.sin(frame * waveSpeed + i * 1.2) * (3 + (i * 0.4));
        const currentY = yBase + waveOffset;

        // Wave width tapers along lake shoreline
        const shoreWidth = waterRight * (0.55 + normY * 0.45);
        const stripLength = shoreWidth * (0.4 + Math.sin(frame * 0.02 + i) * 0.15);
        const startX = Math.max(0, waterLeft + (i % 4) * (width * 0.02) + Math.cos(frame * 0.015 + i) * 15);

        const waveOpacity = 0.18 + Math.sin(frame * 0.03 + i * 0.8) * 0.12;

        // Alternating vibrant cyan, sun reflection gold, and translucent wave crest colors
        let waveColor: string;
        if (i % 3 === 0) {
          waveColor = `rgba(79, 217, 255, ${waveOpacity * 1.3})`; // Diamond Cyan Shimmer
        } else if (i % 3 === 1) {
          waveColor = `rgba(255, 235, 140, ${waveOpacity * 1.2})`; // Sunrise Specular Gold
        } else {
          waveColor = `rgba(130, 245, 210, ${waveOpacity * 0.9})`; // Lagoon Emerald
        }

        ctx.fillStyle = waveColor;
        // Pixelated stepped wave bars
        const stepSize = 6;
        for (let x = startX; x < startX + stripLength && x < shoreWidth; x += stepSize * 2) {
          const pixelX = Math.floor(x / stepSize) * stepSize;
          const pixelY = Math.floor(currentY / 2) * 2;
          const barWidth = Math.min(stepSize * 1.6, startX + stripLength - x);
          const barHeight = 2 + (i % 2);
          ctx.fillRect(pixelX, pixelY, barWidth, barHeight);
        }
      }

      // Render Sparkling Sunlight Caustic Glints on Water (✨)
      for (const sparkle of waterSparkles) {
        sparkle.pulse += sparkle.pulseSpeed;
        sparkle.normX += sparkle.driftSpeed * 0.0005;

        // Reset if drifted outside water zone
        if (sparkle.normX > 0.38) sparkle.normX = 0.02;
        if (sparkle.normX < 0.01) sparkle.normX = 0.36;

        const spkX = sparkle.normX * width;
        const spkY = sparkle.normY * height;

        const currentAlpha = (Math.sin(sparkle.pulse) * 0.5 + 0.5) * 0.85;
        if (currentAlpha > 0.05) {
          const currentSize = sparkle.size * (0.7 + currentAlpha * 0.6);
          const color =
            sparkle.colorType === "gold"
              ? `rgba(255, 240, 160, ${currentAlpha})`
              : `rgba(160, 240, 255, ${currentAlpha})`;

          ctx.fillStyle = color;
          // 4-point Diamond Pixel Sparkle
          const px = Math.floor(spkX);
          const py = Math.floor(spkY);
          const s = Math.max(2, Math.floor(currentSize));

          // Center cross
          ctx.fillRect(px - Math.floor(s / 2), py - 1, s, 2);
          ctx.fillRect(px - 1, py - Math.floor(s / 2), 2, s);
          // Bright core
          ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
          ctx.fillRect(px - 1, py - 1, 2, 2);
        }
      }

      // Render Interactive Cursor Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.opacity *= 0.96;

        if (r.radius > r.maxRadius || r.opacity < 0.02) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = `rgba(120, 230, 255, ${r.opacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        // Slightly squashed ellipse to match 3D isometric perspective of lake
        ctx.ellipse(r.x, r.y, r.radius * 1.4, r.radius * 0.6, 0, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = `rgba(255, 245, 180, ${r.opacity * 0.7})`;
        ctx.beginPath();
        ctx.ellipse(r.x, r.y, r.radius * 0.9, r.radius * 0.4, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // ==========================================
      // SECTION C: CABIN CHIMNEY SMOKE PUFFS (RIGHT CHALET)
      // ==========================================
      const chimneyBaseX = width * 0.678;
      const chimneyBaseY = height * 0.515;

      smokeSpawnTimer++;
      if (smokeSpawnTimer % 24 === 0) {
        smokePuffs.push({
          x: chimneyBaseX + (Math.random() - 0.5) * 4,
          y: chimneyBaseY,
          size: Math.random() * 3 + 3,
          opacity: 0.42,
          speedY: -(Math.random() * 0.4 + 0.35),
          speedX: Math.random() * 0.25 + 0.15, // gentle morning breeze to the right
          wobble: Math.random() * Math.PI * 2,
        });
      }

      for (let i = smokePuffs.length - 1; i >= 0; i--) {
        const sp = smokePuffs[i];
        sp.y += sp.speedY;
        sp.x += sp.speedX + Math.sin(sp.wobble + frame * 0.04) * 0.2;
        sp.size += 0.12;
        sp.opacity *= 0.985;

        if (sp.opacity < 0.02 || sp.y < chimneyBaseY - height * 0.2) {
          smokePuffs.splice(i, 1);
          continue;
        }

        // Stepped Pixel Smoke Puff
        ctx.fillStyle = `rgba(235, 240, 255, ${sp.opacity})`;
        const px = Math.floor(sp.x);
        const py = Math.floor(sp.y);
        const s = Math.floor(sp.size);
        ctx.fillRect(px - s, py - s, s * 2, s * 2);
      }

      // ==========================================
      // SECTION D: MEADOW FIREFLIES & GLOWING POLLEN
      // ==========================================
      for (const fly of fireflies) {
        fly.pulse += 0.04;
        fly.normX += fly.speedX * 0.0003;
        fly.normY += fly.speedY * 0.0003;

        if (fly.normX > 0.98) fly.normX = 0.66;
        if (fly.normX < 0.66) fly.normX = 0.98;
        if (fly.normY > 0.96) fly.normY = 0.68;
        if (fly.normY < 0.68) fly.normY = 0.96;

        const fx = fly.normX * width;
        const fy = fly.normY * height;

        const alpha = (Math.sin(fly.pulse) * 0.4 + 0.6) * 0.8;
        const glowColor =
          fly.hue === "emerald"
            ? `rgba(160, 255, 120, ${alpha})`
            : `rgba(255, 220, 100, ${alpha})`;

        ctx.fillStyle = glowColor;
        const px = Math.floor(fx);
        const py = Math.floor(fy);
        const s = Math.max(2, Math.floor(fly.size));
        ctx.fillRect(px, py, s, s);
      }

      // ==========================================
      // SECTION E: DISTANT SOARING VOXEL BIRDS
      // ==========================================
      for (const bird of birds) {
        bird.x += bird.speed;
        bird.wingFrame += 0.15;

        // Reset bird across screen
        if (bird.x > width + 80) {
          bird.x = -60;
          bird.y = height * (0.14 + Math.random() * 0.12);
        }

        const isFlapUp = Math.sin(bird.wingFrame) > 0;
        const bx = Math.floor(bird.x);
        const by = Math.floor(bird.y);
        const bs = bird.size;

        ctx.fillStyle = "rgba(40, 25, 55, 0.45)"; // Distant silhouette

        // Voxel bird shape
        ctx.fillRect(bx, by, bs, bs); // Body
        if (isFlapUp) {
          // Wings up
          ctx.fillRect(bx - bs, by - bs * 0.8, bs, bs * 0.8);
          ctx.fillRect(bx + bs, by - bs * 0.8, bs, bs * 0.8);
        } else {
          // Wings down
          ctx.fillRect(bx - bs, by + bs * 0.8, bs, bs * 0.8);
          ctx.fillRect(bx + bs, by + bs * 0.8, bs, bs * 0.8);
        }
      }

      // ==========================================
      // SECTION F: FLOATING SUNLIGHT DUST PARTICLES
      // ==========================================
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
        ctx.fillStyle = `rgba(255, 238, 160, ${currentOpacity})`;
        ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-auto z-[2] mix-blend-screen opacity-95"
    />
  );
}
