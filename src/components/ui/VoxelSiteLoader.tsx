"use client";

import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { soundFx } from "@/lib/soundFx";

export function VoxelSiteLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("SPAWNING 3D VOXEL REALM...");
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isReadyToEnter, setIsReadyToEnter] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });

  const STATUS_STAGES = [
    { p: 15, text: "SPAWNING 3D VOXEL MATRIX..." },
    { p: 35, text: "CALIBRATING QUANTUM HOLOGRAM..." },
    { p: 55, text: "SYNTHESIZING RETRO ARCADE SHADERS..." },
    { p: 75, text: "CONNECTING TO OVERWORLD NEXUS..." },
    { p: 90, text: "CHARGING REDSTONE FLUX CORE..." },
    { p: 100, text: "SINGULARITY 2K26 PORTAL ONLINE!" },
  ];

  // Three.js 3D Fullscreen Scene
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06010d, 0.035);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;

    // 3. Central 3D Logo Medallion Group
    const logoGroup = new THREE.Group();
    scene.add(logoGroup);

    // Load Official Singularity Brand Logo Texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load("/images/singularity_brand_logo.png", (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;

      // Front & Back Face Materials
      const faceMat = new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        roughness: 0.2,
        metalness: 0.3,
        side: THREE.FrontSide,
        emissive: new THREE.Color(0x1a1a2e),
        emissiveIntensity: 0.4,
      });

      const backMat = new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        roughness: 0.2,
        metalness: 0.3,
        side: THREE.BackSide,
        emissive: new THREE.Color(0x1a1a2e),
        emissiveIntensity: 0.4,
      });

      const rimMat = new THREE.MeshStandardMaterial({
        color: 0x4fd9ff,
        metalness: 0.9,
        roughness: 0.1,
        emissive: 0x0088ff,
        emissiveIntensity: 0.8,
      });

      const goldTrimMat = new THREE.MeshStandardMaterial({
        color: 0xffd34d,
        metalness: 0.95,
        roughness: 0.15,
        emissive: 0xbb8800,
        emissiveIntensity: 0.7,
      });

      // 3D Medallion Cylinder Body
      const radius = 1.8;
      const thickness = 0.3;
      const cylinderGeo = new THREE.CylinderGeometry(radius, radius, thickness, 48, 1, false);

      const materials = [
        rimMat,  // Side Rim
        faceMat, // Top Face (Front)
        backMat, // Bottom Face (Back)
      ];

      const medallion = new THREE.Mesh(cylinderGeo, materials);
      medallion.rotation.x = Math.PI / 2; // Face camera initially
      logoGroup.add(medallion);

      // Outer Beveled Golden Ring Accent
      const outerRingGeo = new THREE.TorusGeometry(radius + 0.15, 0.06, 16, 64);
      const outerRing = new THREE.Mesh(outerRingGeo, goldTrimMat);
      logoGroup.add(outerRing);

      // Inner Diamond Ring Accent
      const innerRingGeo = new THREE.TorusGeometry(radius - 0.05, 0.04, 16, 64);
      const innerRing = new THREE.Mesh(innerRingGeo, rimMat);
      logoGroup.add(innerRing);

      // Glowing Diamond Corner Voxels on the Medallion
      const cornerVoxelGeo = new THREE.BoxGeometry(0.2, 0.2, 0.2);
      const cornerColors = [0x4fd9ff, 0xffd34d, 0x55ff55, 0xe14e3d];
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const cornerMat = new THREE.MeshStandardMaterial({
          color: cornerColors[i % cornerColors.length],
          emissive: cornerColors[i % cornerColors.length],
          emissiveIntensity: 1.5,
          metalness: 0.8,
        });
        const cornerMesh = new THREE.Mesh(cornerVoxelGeo, cornerMat);
        cornerMesh.position.set(
          Math.cos(angle) * (radius + 0.22),
          Math.sin(angle) * (radius + 0.22),
          0
        );
        cornerMesh.rotation.set(angle, angle, 0);
        logoGroup.add(cornerMesh);
      }
    });

    // 4. Orbiting Holographic Rings
    const ringGroup = new THREE.Group();
    scene.add(ringGroup);

    const holoRingMat1 = new THREE.MeshBasicMaterial({
      color: 0x4fd9ff,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const holoRing1 = new THREE.Mesh(new THREE.TorusGeometry(3.0, 0.03, 8, 48), holoRingMat1);
    holoRing1.rotation.x = Math.PI / 3;
    ringGroup.add(holoRing1);

    const holoRingMat2 = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const holoRing2 = new THREE.Mesh(new THREE.TorusGeometry(3.6, 0.02, 6, 48), holoRingMat2);
    holoRing2.rotation.y = Math.PI / 4;
    holoRing2.rotation.x = -Math.PI / 5;
    ringGroup.add(holoRing2);

    const holoRingMat3 = new THREE.MeshBasicMaterial({
      color: 0xffd34d,
      transparent: true,
      opacity: 0.35,
    });
    const holoRing3 = new THREE.Mesh(new THREE.TorusGeometry(4.2, 0.015, 4, 32), holoRingMat3);
    holoRing3.rotation.z = Math.PI / 6;
    ringGroup.add(holoRing3);

    // 5. 3D Swarm of Orbiting Voxel Blocks
    const voxelCount = 50;
    const voxels: {
      mesh: THREE.Mesh;
      speed: number;
      orbitRadius: number;
      orbitSpeed: number;
      angle: number;
      tiltAxis: THREE.Vector3;
      rotSpeed: { x: number; y: number; z: number };
    }[] = [];

    const voxelColors = [
      0x4fd9ff, // Diamond
      0xffd34d, // Gold
      0x55ff55, // Emerald
      0xe14e3d, // Redstone
      0xa855f7, // Amethyst
      0x00f0ff, // Cyan
    ];

    const boxGeo = new THREE.BoxGeometry(0.18, 0.18, 0.18);

    for (let i = 0; i < voxelCount; i++) {
      const color = voxelColors[Math.floor(Math.random() * voxelColors.length)];
      const voxelMat = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.9,
        metalness: 0.7,
        roughness: 0.2,
      });

      const mesh = new THREE.Mesh(boxGeo, voxelMat);
      const orbitRadius = 2.4 + Math.random() * 2.8;
      const angle = Math.random() * Math.PI * 2;
      const tiltAxis = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      ).normalize();

      mesh.position.set(
        Math.cos(angle) * orbitRadius,
        (Math.random() - 0.5) * 2.5,
        Math.sin(angle) * orbitRadius
      );

      scene.add(mesh);

      voxels.push({
        mesh,
        speed: 0.01 + Math.random() * 0.02,
        orbitRadius,
        orbitSpeed: (Math.random() - 0.5) * 0.025,
        angle,
        tiltAxis,
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.05,
          y: (Math.random() - 0.5) * 0.05,
          z: (Math.random() - 0.5) * 0.05,
        },
      });
    }

    // 6. 3D Particle Starfield
    const starCount = 600;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 35;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 35;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 25 - 5;

      const c = Math.random() > 0.5 ? 0.3 + Math.random() * 0.7 : 0.8;
      starColors[i * 3] = 0.3 * c;
      starColors[i * 3 + 1] = 0.8 * c;
      starColors[i * 3 + 2] = 1.0 * c;
    }

    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 7. Dynamic Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const cyanPointLight = new THREE.PointLight(0x4fd9ff, 5, 20);
    cyanPointLight.position.set(4, 3, 5);
    scene.add(cyanPointLight);

    const purplePointLight = new THREE.PointLight(0xa855f7, 4.5, 20);
    purplePointLight.position.set(-4, -3, 4);
    scene.add(purplePointLight);

    const goldPointLight = new THREE.PointLight(0xffd34d, 3.5, 15);
    goldPointLight.position.set(0, 5, -2);
    scene.add(goldPointLight);

    // 8. Mouse / Pointer Interaction
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.targetX = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
        mouseRef.current.targetY = (e.touches[0].clientY / window.innerHeight - 0.5) * 2;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // 9. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // 3D Logo Continuous Cinematic Spin + Tilt Parallax + Levitation
      logoGroup.rotation.y += 0.016;
      logoGroup.rotation.x =
        Math.sin(elapsedTime * 1.6) * 0.12 + mouseRef.current.y * 0.4;
      logoGroup.rotation.z =
        Math.cos(elapsedTime * 1.2) * 0.08 - mouseRef.current.x * 0.3;
      logoGroup.position.y = Math.sin(elapsedTime * 2.2) * 0.18;

      // Holographic Rings Rotations
      ringGroup.rotation.y = elapsedTime * 0.2 + mouseRef.current.x * 0.2;
      ringGroup.rotation.x = Math.sin(elapsedTime * 0.5) * 0.2;
      holoRing1.rotation.z += 0.008;
      holoRing2.rotation.z -= 0.012;
      holoRing3.rotation.x += 0.006;

      // Orbiting Voxel Swarm
      voxels.forEach((v) => {
        v.angle += v.orbitSpeed;
        v.mesh.position.x = Math.cos(v.angle) * v.orbitRadius;
        v.mesh.position.z = Math.sin(v.angle) * v.orbitRadius;
        v.mesh.position.y += Math.sin(elapsedTime * 2 + v.angle) * 0.005;

        v.mesh.rotation.x += v.rotSpeed.x;
        v.mesh.rotation.y += v.rotSpeed.y;
        v.mesh.rotation.z += v.rotSpeed.z;
      });

      // Starfield Slow Drift
      starField.rotation.y = elapsedTime * 0.02;
      starField.rotation.x = mouseRef.current.y * 0.05;

      // Dynamic Light Orbiting
      cyanPointLight.position.x = Math.cos(elapsedTime * 1.2) * 5;
      cyanPointLight.position.y = Math.sin(elapsedTime * 1.2) * 4;
      purplePointLight.position.x = -Math.cos(elapsedTime * 0.9) * 5;
      purplePointLight.position.z = Math.sin(elapsedTime * 0.9) * 5;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);

      // Cleanup WebGL Geometries & Textures
      scene.clear();
      renderer.dispose();
    };
  }, []);

  // Progress Boot Timer
  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("sng_site_loader_shown");
    const duration = hasLoaded ? 1400 : 2600; // 2.6s initial grand reveal, 1.4s on refresh
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calcProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(calcProgress);

      const stage = STATUS_STAGES.find((s) => calcProgress <= s.p) || STATUS_STAGES[STATUS_STAGES.length - 1];
      setStatusText(stage.text);

      if (elapsed >= duration) {
        clearInterval(interval);
        setProgress(100);
        setIsReadyToEnter(true);

        try {
          soundFx.playChestOpen();
        } catch {}

        sessionStorage.setItem("sng_site_loader_shown", "true");

        // Automatically fade into fest after brief completion pause
        setTimeout(() => {
          dismissLoader();
        }, 600);
      }
    }, 25);

    return () => clearInterval(interval);
  }, []);

  const dismissLoader = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  };

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col justify-between overflow-hidden bg-[#06010d] select-none transition-all duration-700 ${
        isFadingOut
          ? "opacity-0 pointer-events-none scale-110 filter blur-sm"
          : "opacity-100 scale-100"
      }`}
    >
      {/* 1. Fullscreen 3D Three.js WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block cursor-grab active:cursor-grabbing"
      />

      {/* 2. Cyberpunk Scanline & Grid Atmosphere */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#06010d_90%)] pointer-events-none" />

      {/* 3. Top Cyberpunk HUD Header */}
      <header className="relative z-10 w-full p-4 sm:p-6 flex items-center justify-between text-xs font-pixel-arcade pointer-events-none">
        <div className="flex items-center gap-3 bg-[#0D031A]/85 backdrop-blur-md border border-[#4FD9FF]/40 px-3 py-1.5 shadow-[0_0_15px_rgba(79,217,255,0.2)]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#55FF55] animate-pulse shadow-[0_0_8px_#55FF55]" />
          <span className="text-[#4FD9FF] font-bold tracking-wider uppercase">
            SINGULARITY 2K26 // 3D CORE ONLINE
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-4 bg-[#0D031A]/85 backdrop-blur-md border border-[#FFD34D]/30 px-3 py-1.5 text-[11px] text-[#A0A0C0]">
          <span>LOC: <strong className="text-white">HBTU KANPUR</strong></span>
          <span className="text-[#3A1E54]">|</span>
          <span>MODE: <strong className="text-[#FFD34D]">VOXEL × ARCADE</strong></span>
          <span className="text-[#3A1E54]">|</span>
          <span>FPS: <strong className="text-[#55FF55]">60.0</strong></span>
        </div>
      </header>

      {/* 4. Center 3D Interactive Helper Prompt */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center pointer-events-none my-auto px-4">
        <div className="opacity-75 font-pixel-arcade text-[11px] sm:text-xs text-[#4FD9FF] tracking-widest uppercase mb-1 drop-shadow-[0_2px_4px_#000]">
          ✦ DRAG & HOVER TO ROTATE 3D EMBLEM ✦
        </div>
        <div className="text-[10px] font-pixel-arcade text-[#FFD34D]/80 tracking-widest uppercase">
          OFFICIAL FESTIVAL ARTIFACT
        </div>
      </div>

      {/* 5. Bottom Console Control & Multi-Segment Progress Bar */}
      <footer className="relative z-10 w-full p-4 sm:p-8 flex flex-col items-center">
        <div className="w-full max-w-xl bg-[#0D031A]/90 backdrop-blur-md border-2 sm:border-4 border-[#4FD9FF]/60 shadow-[0_0_40px_rgba(79,217,255,0.35),0_10px_0_#000] p-4 sm:p-5">
          {/* Main Title Badge */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <h1 className="font-pixel-title text-xl sm:text-2xl text-white font-bold tracking-wider drop-shadow-[0_3px_0_#000]">
                SINGULARITY <span className="text-[#4FD9FF]">2K26</span>
              </h1>
              <span className="px-2 py-0.5 text-[9px] font-pixel-arcade bg-[#FFD34D] text-black font-bold">
                OFFICIAL
              </span>
            </div>
            <div className="font-pixel-arcade text-xs text-[#55FF55] font-bold flex items-center gap-1.5">
              <span className="animate-spin inline-block">⚡</span>
              {progress}% READY
            </div>
          </div>

          {/* Voxel Segmented Progress Bar */}
          <div className="w-full bg-[#05010B] border-2 border-[#3A1E54] p-1 mb-3">
            <div className="h-4 bg-[#0A0214] relative overflow-hidden flex items-center">
              <div
                className="h-full bg-gradient-to-r from-[#E14E3D] via-[#FFD34D] via-[#4FD9FF] to-[#55FF55] transition-all duration-75 ease-out relative shadow-[0_0_15px_#4FD9FF]"
                style={{ width: `${progress}%` }}
              >
                {/* Internal Shimmer Wave */}
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.6)_50%,transparent_100%)] animate-[shimmer_1.2s_infinite]" />
              </div>

              {/* Segment Matrix Lines */}
              <div
                className="absolute inset-0 bg-[linear-gradient(90deg,transparent_88%,rgba(0,0,0,0.8)_12%)] pointer-events-none"
                style={{ backgroundSize: "14px 100%" }}
              />
            </div>
          </div>

          {/* Terminal Status & Interactive Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 font-pixel-arcade text-[11px] sm:text-xs">
            <div className="text-[#4FD9FF] font-bold flex items-center gap-2 truncate">
              <span className="text-[#55FF55]">▶</span>
              <span className="tracking-wide">{statusText}</span>
            </div>

            {isReadyToEnter ? (
              <button
                onClick={dismissLoader}
                className="px-4 py-1.5 bg-[#4FD9FF] hover:bg-[#7ce4ff] text-black font-pixel-arcade font-bold text-xs uppercase transition-all shadow-[0_0_20px_rgba(79,217,255,0.8),0_3px_0_#000] active:translate-y-0.5 cursor-pointer animate-pulse"
              >
                ENTER REALM ➔
              </button>
            ) : (
              <span className="text-[#A0A0C0] text-[10px] uppercase">
                LOADING VOXEL ASSETS...
              </span>
            )}
          </div>
        </div>

        {/* Footer Accreditation */}
        <div className="mt-3 text-[10px] font-pixel-arcade text-[#A0A0C0]/70 uppercase tracking-widest text-center">
          N8N DSC · AWS SBG HBTU · DEPT OF MATHEMATICS
        </div>
      </footer>
    </div>
  );
}
