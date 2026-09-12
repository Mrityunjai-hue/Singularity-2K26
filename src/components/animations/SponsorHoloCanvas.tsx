"use client";

import React, { useEffect, useRef } from "react";

interface SponsorHoloCanvasProps {
  activeColor?: string;
  intensity?: "maximum" | "high" | "medium" | "subtle";
}

export function SponsorHoloCanvas({
  activeColor = "#4FD9FF",
  intensity = "maximum",
}: SponsorHoloCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorRef = useRef(activeColor);
  const intensityRef = useRef(intensity);

  useEffect(() => {
    colorRef.current = activeColor;
    intensityRef.current = intensity;
  }, [activeColor, intensity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let gridOffset = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    // Particle system
    const numParticles = intensity === "maximum" ? 75 : intensity === "high" ? 55 : intensity === "medium" ? 35 : 20;
    const particles: Array<{
      x: number;
      y: number;
      z: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      color: string;
      pulseSpeed: number;
    }> = [];

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 2 + 0.5,
        size: Math.random() * 3 + 1.5,
        speedY: -(Math.random() * 1.2 + 0.3),
        speedX: (Math.random() - 0.5) * 0.6,
        opacity: Math.random() * 0.7 + 0.3,
        color: colorRef.current,
        pulseSpeed: Math.random() * 0.04 + 0.01,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep atmospheric background tint matching active color
      const grad = ctx.createRadialGradient(
        width / 2,
        height * 0.45,
        50,
        width / 2,
        height * 0.5,
        width * 0.8
      );
      grad.addColorStop(0, `${colorRef.current}18`);
      grad.addColorStop(0.5, "#080210e6");
      grad.addColorStop(1, "#040108fa");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 1. Perspective Cyber Grid Floor (Bottom half)
      const horizonY = height * 0.58;
      gridOffset = (gridOffset + 0.8) % 40;

      ctx.save();
      ctx.strokeStyle = `${colorRef.current}30`;
      ctx.lineWidth = 1;

      // Horizontal moving grid lines with perspective compression
      for (let y = horizonY; y < height; y += (height - y) * 0.12 + 4) {
        const adjustedY = y + (gridOffset * (y - horizonY)) / (height - horizonY);
        if (adjustedY <= height) {
          ctx.beginPath();
          ctx.moveTo(0, adjustedY);
          ctx.lineTo(width, adjustedY);
          ctx.stroke();
        }
      }

      // Vertical radiating grid lines converging at horizon center
      const numRays = 24;
      for (let i = 0; i <= numRays; i++) {
        const xOffset = ((i - numRays / 2) / (numRays / 2)) * (width * 1.2);
        ctx.beginPath();
        ctx.moveTo(width / 2, horizonY);
        ctx.lineTo(width / 2 + xOffset, height);
        ctx.stroke();
      }
      ctx.restore();

      // 2. Central Vertical Light Beacon
      const beaconWidth = intensityRef.current === "maximum" ? 140 : 80;
      const beaconGrad = ctx.createLinearGradient(
        width / 2 - beaconWidth / 2,
        0,
        width / 2 + beaconWidth / 2,
        0
      );
      beaconGrad.addColorStop(0, "transparent");
      beaconGrad.addColorStop(0.5, `${colorRef.current}35`);
      beaconGrad.addColorStop(1, "transparent");

      ctx.fillStyle = beaconGrad;
      ctx.fillRect(width / 2 - beaconWidth / 2, 0, beaconWidth, horizonY + 50);

      // 3. Floating Crystalline Ore Spark Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move upward
        p.y += p.speedY;
        p.x += p.speedX;
        p.opacity += Math.sin(Date.now() * p.pulseSpeed) * 0.02;

        // Mouse avoidance/attraction physics
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          p.x -= (dx / dist) * 1.5;
          p.y -= (dy / dist) * 1.5;
        }

        // Reset if off-screen
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        // Draw diamond-shaped crystal particles
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(Date.now() * 0.001 * p.z);
        ctx.fillStyle = colorRef.current;
        ctx.globalAlpha = Math.max(0.1, Math.min(0.85, p.opacity));
        ctx.shadowColor = colorRef.current;
        ctx.shadowBlur = p.size * 3;

        // Draw diamond shard polygon
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 1.4);
        ctx.lineTo(p.size, 0);
        ctx.lineTo(0, p.size * 1.4);
        ctx.lineTo(-p.size, 0);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
    />
  );
}
