// Procedural Voxel Block-Break Particles (Physics gravity burst)

export interface VoxelParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  vRot: number;
  alpha: number;
  life: number;
  maxLife: number;
}

const VOXEL_PALETTE = [
  "#5D9C43", // Grass block top
  "#7B5231", // Dirt block
  "#4A4A4A", // Stone block
  "#4FD9FF", // Diamond ore
  "#FFD34D", // Gold ore
  "#E14E3D", // Redstone ore
  "#55FF55", // Emerald
];

export function spawnBlockBreakParticles(originX: number, originY: number, count: number = 16) {
  if (typeof window === "undefined") return;

  // Check if user is in low render distance / reduced motion mode
  const isReduced = localStorage.getItem("singularity_low_render") === "true" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (isReduced) return;

  const canvas = document.getElementById("voxel-particle-canvas") as HTMLCanvasElement;
  if (!canvas) {
    const newCanvas = document.createElement("canvas");
    newCanvas.id = "voxel-particle-canvas";
    newCanvas.style.position = "fixed";
    newCanvas.style.top = "0";
    newCanvas.style.left = "0";
    newCanvas.style.width = "100vw";
    newCanvas.style.height = "100vh";
    newCanvas.style.pointerEvents = "none";
    newCanvas.style.zIndex = "99999";
    document.body.appendChild(newCanvas);
    newCanvas.width = window.innerWidth;
    newCanvas.height = window.innerHeight;
    runParticleCanvas(newCanvas, originX, originY, count);
  } else {
    runParticleCanvas(canvas, originX, originY, count);
  }
}

let activeParticles: VoxelParticle[] = [];
let isAnimating = false;

function runParticleCanvas(canvas: HTMLCanvasElement, ox: number, oy: number, count: number) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Resize canvas if needed
  if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // Create new particles
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 6 + 2;
    activeParticles.push({
      x: ox,
      y: oy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - (Math.random() * 4 + 2), // upward initial pop
      size: Math.floor(Math.random() * 6) + 4, // 4-10px square blocks
      color: VOXEL_PALETTE[Math.floor(Math.random() * VOXEL_PALETTE.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 15,
      alpha: 1,
      life: 0,
      maxLife: Math.floor(Math.random() * 25) + 30, // frames
    });
  }

  if (!isAnimating) {
    isAnimating = true;
    requestAnimationFrame(() => animateParticles(canvas, ctx));
  }
}

function animateParticles(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = activeParticles.length - 1; i >= 0; i--) {
    const p = activeParticles[i];
    p.life++;
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.35; // Gravity
    p.rotation += p.vRot;
    p.alpha = Math.max(0, 1 - p.life / p.maxLife);

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;

    // Draw pixelated sharp square block crumb
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);

    // Inner shadow for block bevel
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.fillRect(-p.size / 2, p.size / 2 - 2, p.size, 2);
    ctx.fillRect(p.size / 2 - 2, -p.size / 2, 2, p.size);

    ctx.restore();

    if (p.life >= p.maxLife || p.y > canvas.height + 20) {
      activeParticles.splice(i, 1);
    }
  }

  if (activeParticles.length > 0) {
    requestAnimationFrame(() => animateParticles(canvas, ctx));
  } else {
    isAnimating = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}
