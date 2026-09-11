/**
 * GLSL Shaders for the Singularity Event Horizon Core & Accretion Disk
 */

export const CoreDiskVertexShader = `
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

void main() {
  vUv = uv;
  vPosition = position;
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const CoreDiskFragmentShader = `
uniform float uTime;
uniform vec3 uColorCore;
uniform vec3 uColorGlow;
uniform vec3 uColorAmber;
uniform float uIntensity;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

// Simplex 2D noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 center = vUv - 0.5;
  float dist = length(center) * 2.0; // 0.0 at center, 1.0 at edge
  
  if (dist < 0.28) {
    // Inside Event Horizon (Total blackness)
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }
  
  // Angle around center for rotation
  float angle = atan(center.y, center.x);
  
  // Swirling coordinates
  float swirlSpeed = 0.6;
  float swirlAngle = angle + (uTime * swirlSpeed) - (dist * 4.0);
  vec2 noiseCoord = vec2(cos(swirlAngle), sin(swirlAngle)) * (dist * 3.0);
  
  float n1 = snoise(noiseCoord + vec2(uTime * 0.2, uTime * 0.15)) * 0.5 + 0.5;
  float n2 = snoise(noiseCoord * 2.0 - vec2(uTime * 0.3, uTime * 0.1)) * 0.5 + 0.5;
  float combinedNoise = (n1 * 0.6 + n2 * 0.4);
  
  // Photon ring spike near event horizon edge (dist ~ 0.30 - 0.38)
  float photonRing = smoothstep(0.28, 0.32, dist) * smoothstep(0.48, 0.32, dist) * 2.5;
  
  // Accretion disk radial falloff
  float diskShape = smoothstep(0.28, 0.45, dist) * (1.0 - smoothstep(0.75, 1.0, dist));
  
  // Relativistic Doppler beaming (one side brighter due to high-speed rotation)
  float doppler = 0.6 + 0.4 * sin(angle + 0.8);
  
  // Color blending (Emerald / Toxic Green + Amber Highlights)
  vec3 col = mix(uColorCore, uColorGlow, n1);
  col = mix(col, uColorAmber, pow(n2, 2.0) * 0.4);
  col += uColorGlow * photonRing * 1.5;
  
  float alpha = (diskShape * combinedNoise * doppler + photonRing) * uIntensity;
  alpha = clamp(alpha, 0.0, 1.0);
  
  gl_FragColor = vec4(col * (1.2 + photonRing), alpha);
}
`;
