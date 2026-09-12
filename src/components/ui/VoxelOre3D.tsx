"use client";

import React, { useState, useEffect, useRef } from "react";

interface VoxelOre3DProps {
  tierId: "diamond" | "gold" | "iron" | "redstone";
  colorHex: string;
  size?: number;
}

export function VoxelOre3D({ tierId, colorHex, size = 160 }: VoxelOre3DProps) {
  const [rotX, setRotX] = useState(15);
  const [rotY, setRotY] = useState(0);
  const isHovered = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto rotation loop
  useEffect(() => {
    let animId: number;
    let angle = 0;

    const loop = () => {
      if (!isHovered.current) {
        angle = (angle + 0.8) % 360;
        setRotY(angle);
        setRotX(15 + Math.sin(angle * (Math.PI / 180) * 2) * 8);
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotY((x / rect.width) * 120);
    setRotX(-(y / rect.height) * 90);
  };

  const halfSize = size / 2;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => {
        isHovered.current = true;
      }}
      onMouseLeave={() => {
        isHovered.current = false;
      }}
      onMouseMove={handleMouseMove}
      className="relative flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      style={{
        width: size * 1.5,
        height: size * 1.5,
        perspective: 1000,
      }}
    >
      {/* 1. Orbiting Energy Ring (for Diamond / Gold) */}
      {(tierId === "diamond" || tierId === "gold") && (
        <div
          className="absolute inset-0 rounded-full border-2 border-dashed animate-spin pointer-events-none"
          style={{
            borderColor: `${colorHex}60`,
            boxShadow: `0 0 35px ${colorHex}40`,
            animationDuration: tierId === "diamond" ? "6s" : "10s",
            transform: "rotateX(75deg) scale(1.3)",
          }}
        />
      )}

      {/* 2. Concentric Secondary Ring (Diamond exclusive) */}
      {tierId === "diamond" && (
        <div
          className="absolute inset-0 rounded-full border border-dotted animate-spin pointer-events-none"
          style={{
            borderColor: `${colorHex}80`,
            boxShadow: `0 0 25px ${colorHex}50`,
            animationDuration: "4s",
            animationDirection: "reverse",
            transform: "rotateY(60deg) scale(1.2)",
          }}
        />
      )}

      {/* 3. Base Holo-Pedestal Ring Floor */}
      <div
        className="absolute bottom-2 w-32 h-32 rounded-full border-4 border-solid pointer-events-none"
        style={{
          borderColor: colorHex,
          backgroundColor: `${colorHex}15`,
          boxShadow: `0 0 40px ${colorHex}60, inset 0 0 20px ${colorHex}40`,
          transform: "rotateX(80deg)",
        }}
      />

      {/* 4. 3D Voxel Crystal Cube / Octahedron Model */}
      <div
        className="relative transition-transform duration-100 ease-out"
        style={{
          width: size,
          height: size,
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
        }}
      >
        {/* Cube Face: Front */}
        <div
          className="absolute inset-0 border-2 backdrop-blur-sm flex items-center justify-center font-pixel-title text-xl font-bold"
          style={{
            borderColor: colorHex,
            backgroundColor: `${colorHex}25`,
            boxShadow: `inset 0 0 30px ${colorHex}50, 0 0 20px ${colorHex}30`,
            transform: `translateZ(${halfSize * 0.6}px)`,
          }}
        >
          <span style={{ color: colorHex, textShadow: `0 0 10px ${colorHex}` }}>
            {tierId === "diamond" ? "💎" : tierId === "gold" ? "🟡" : tierId === "iron" ? "⚪" : "🔴"}
          </span>
        </div>

        {/* Cube Face: Back */}
        <div
          className="absolute inset-0 border-2 backdrop-blur-sm flex items-center justify-center font-pixel-title text-xl font-bold"
          style={{
            borderColor: colorHex,
            backgroundColor: `${colorHex}20`,
            boxShadow: `inset 0 0 30px ${colorHex}40`,
            transform: `rotateY(180deg) translateZ(${halfSize * 0.6}px)`,
          }}
        >
          <span style={{ color: colorHex }}>✦</span>
        </div>

        {/* Cube Face: Right */}
        <div
          className="absolute inset-0 border-2 backdrop-blur-sm flex items-center justify-center font-pixel-title text-xl font-bold"
          style={{
            borderColor: colorHex,
            backgroundColor: `${colorHex}25`,
            boxShadow: `inset 0 0 30px ${colorHex}45`,
            transform: `rotateY(90deg) translateZ(${halfSize * 0.6}px)`,
          }}
        >
          <span style={{ color: colorHex }}>◆</span>
        </div>

        {/* Cube Face: Left */}
        <div
          className="absolute inset-0 border-2 backdrop-blur-sm flex items-center justify-center font-pixel-title text-xl font-bold"
          style={{
            borderColor: colorHex,
            backgroundColor: `${colorHex}20`,
            boxShadow: `inset 0 0 30px ${colorHex}45`,
            transform: `rotateY(-90deg) translateZ(${halfSize * 0.6}px)`,
          }}
        >
          <span style={{ color: colorHex }}>◆</span>
        </div>

        {/* Cube Face: Top */}
        <div
          className="absolute inset-0 border-2 backdrop-blur-sm flex items-center justify-center font-pixel-title text-xl font-bold"
          style={{
            borderColor: colorHex,
            backgroundColor: `${colorHex}35`,
            boxShadow: `inset 0 0 35px ${colorHex}70, 0 0 30px ${colorHex}50`,
            transform: `rotateX(90deg) translateZ(${halfSize * 0.6}px)`,
          }}
        >
          <span style={{ color: colorHex }}>▲</span>
        </div>

        {/* Cube Face: Bottom */}
        <div
          className="absolute inset-0 border-2 backdrop-blur-sm"
          style={{
            borderColor: colorHex,
            backgroundColor: `${colorHex}40`,
            boxShadow: `0 0 40px ${colorHex}90`,
            transform: `rotateX(-90deg) translateZ(${halfSize * 0.6}px)`,
          }}
        />
      </div>

      {/* 5. Center Core Radiance */}
      <div
        className="absolute w-12 h-12 rounded-full pointer-events-none animate-ping"
        style={{
          backgroundColor: colorHex,
          opacity: 0.35,
          filter: "blur(12px)",
        }}
      />
    </div>
  );
}
