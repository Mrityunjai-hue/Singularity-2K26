"use client";

import React, { useEffect, useState } from "react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    // Only show on desktop pointers
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) {
      setEnabled(false);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="fixed pointer-events-none z-[999999] transition-transform duration-75 ease-out"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Minecraft Voxel Crosshair */}
      <div className={`relative flex items-center justify-center transition-all ${isClicking ? "scale-75" : "scale-100"}`}>
        {/* Horizontal bar */}
        <div className="w-4 h-1 bg-white border border-black shadow-[0_0_4px_rgba(0,0,0,0.8)]" />
        {/* Vertical bar */}
        <div className="w-1 h-4 bg-white border border-black shadow-[0_0_4px_rgba(0,0,0,0.8)] absolute" />
        {/* Center pixel */}
        <div className="w-1 h-1 bg-white absolute" />
      </div>
    </div>
  );
}
