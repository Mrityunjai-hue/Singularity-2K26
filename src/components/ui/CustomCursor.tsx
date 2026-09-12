"use client";

import React, { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only show on desktop fine pointers
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let rafId: number;
    let mouseX = -100;
    let mouseY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const updatePosition = () => {
      if (cursor) {
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      rafId = requestAnimationFrame(updatePosition);
    };

    const handleMouseDown = () => {
      if (cursor) cursor.classList.add("scale-75");
    };

    const handleMouseUp = () => {
      if (cursor) cursor.classList.remove("scale-75");
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    rafId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[999999] -ml-2 -mt-2 will-change-transform transition-transform duration-75 ease-out hidden sm:block"
    >
      {/* Minecraft Voxel Crosshair */}
      <div className="relative flex items-center justify-center">
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
