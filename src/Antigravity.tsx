import { useEffect, useRef } from "react";

type ParticleShape = "circle" | "capsule";

type AntigravityProps = {
  count?: number;
  magnetRadius?: number;
  ringRadius?: number;
  waveSpeed?: number;
  waveAmplitude?: number;
  particleSize?: number;
  lerpSpeed?: number;
  color?: string;
  autoAnimate?: boolean;
  particleVariance?: number;
  rotationSpeed?: number;
  depthFactor?: number;
  pulseSpeed?: number;
  particleShape?: ParticleShape;
  fieldStrength?: number;
};

type Particle = {
  angle: number;
  baseX: number;
  baseY: number;
  depth: number;
  phase: number;
  size: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
};

function createParticles(count: number, variance: number): Particle[] {
  return Array.from({ length: count }, () => {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.sqrt(Math.random()) * 0.46;
    const baseX = 0.5 + Math.cos(angle) * radius;
    const baseY = 0.5 + Math.sin(angle) * radius;
    const size = 0.72 + Math.random() * variance;

    return {
      angle,
      baseX,
      baseY,
      depth: 0.45 + Math.random() * 0.95,
      phase: Math.random() * Math.PI * 2,
      size,
      vx: 0,
      vy: 0,
      x: baseX,
      y: baseY,
    };
  });
}

function Antigravity({
  count = 300,
  magnetRadius = 10,
  ringRadius = 10,
  waveSpeed = 0.4,
  waveAmplitude = 1,
  particleSize = 2,
  lerpSpeed = 0.1,
  color = "#64D7EA",
  autoAnimate = false,
  particleVariance = 1,
  rotationSpeed = 0,
  depthFactor = 1,
  pulseSpeed = 3,
  particleShape = "capsule",
  fieldStrength = 10,
}: AntigravityProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({ active: false, x: 0.5, y: 0.5 });
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    particlesRef.current = createParticles(count, particleVariance);

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawParticle = (
      particle: Particle,
      x: number,
      y: number,
      size: number,
      alpha: number,
      rotation: number,
    ) => {
      context.save();
      context.globalAlpha = alpha;
      context.translate(x, y);
      context.rotate(rotation);
      context.fillStyle = color;

      if (particleShape === "capsule") {
        const capsuleWidth = size * 3.2;
        const capsuleHeight = size * 1.35;
        context.beginPath();
        context.roundRect(
          -capsuleWidth / 2,
          -capsuleHeight / 2,
          capsuleWidth,
          capsuleHeight,
          capsuleHeight / 2,
        );
        context.fill();
      } else {
        context.beginPath();
        context.arc(0, 0, size, 0, Math.PI * 2);
        context.fill();
      }

      context.restore();
    };

    const render = (time: number) => {
      const seconds = time / 1000;
      const minSize = Math.min(width, height);
      const centerX = width / 2;
      const centerY = height / 2;
      const magnetPx = Math.max(24, magnetRadius * minSize * 0.015);
      const ringPx = Math.max(20, ringRadius * minSize * 0.012);

      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";

      const pointer = pointerRef.current;
      const followX = pointer.active ? (pointer.x - 0.5) * width * 0.34 : 0;
      const followY = pointer.active ? (pointer.y - 0.5) * height * 0.34 : 0;

      particlesRef.current.forEach((particle) => {
        const orbit =
          autoAnimate || rotationSpeed !== 0
            ? rotationSpeed * seconds * 0.18 * particle.depth
            : 0;
        const wave =
          autoAnimate
            ? Math.sin(seconds * waveSpeed + particle.phase) * waveAmplitude * 0.008
            : 0;

        const rotatedX =
          0.5 +
          (particle.baseX - 0.5) * Math.cos(orbit) -
          (particle.baseY - 0.5) * Math.sin(orbit);
        const rotatedY =
          0.5 +
          (particle.baseX - 0.5) * Math.sin(orbit) +
          (particle.baseY - 0.5) * Math.cos(orbit);

        let targetX = (rotatedX + wave) * width + followX * particle.depth;
        let targetY = (rotatedY - wave) * height + followY * particle.depth;

        if (pointer.active) {
          const pointerX = pointer.x * width;
          const pointerY = pointer.y * height;
          const dx = targetX - pointerX;
          const dy = targetY - pointerY;
          const distance = Math.hypot(dx, dy) || 1;

          if (distance < magnetPx) {
            const force = (1 - distance / magnetPx) * fieldStrength * particle.depth;
            targetX += (dx / distance) * force * 12;
            targetY += (dy / distance) * force * 12;
          }

          if (Math.abs(distance - ringPx) < ringPx * 0.34) {
            const tangent = Math.atan2(dy, dx) + Math.PI / 2;
            targetX += Math.cos(tangent) * fieldStrength * 1.8;
            targetY += Math.sin(tangent) * fieldStrength * 1.8;
          }
        }

        particle.x += (targetX / width - particle.x) * lerpSpeed;
        particle.y += (targetY / height - particle.y) * lerpSpeed;

        const x = particle.x * width;
        const y = particle.y * height;
        const distanceFromCenter = Math.hypot(x - centerX, y - centerY) / minSize;
        const pulse = 1 + Math.sin(seconds * pulseSpeed + particle.phase) * 0.08;
        const depthScale = 1 + particle.depth * depthFactor * 0.18;
        const size = particleSize * particle.size * depthScale * pulse;
        const alpha = Math.max(0.18, 0.78 - distanceFromCenter * 0.75);
        const rotation = particle.angle + seconds * rotationSpeed;

        drawParticle(particle, x, y, size, alpha, rotation);
      });

      context.globalCompositeOperation = "source-over";
      animationFrame = requestAnimationFrame(render);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      pointerRef.current = {
        active: x >= 0 && x <= 1 && y >= 0 && y <= 1,
        x,
        y,
      };
    };

    const handlePointerLeave = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      if (x >= 0 && x <= 1 && y >= 0 && y <= 1) return;
      pointerRef.current.active = false;
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("pointerout", handlePointerLeave);
    animationFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("pointerout", handlePointerLeave);
    };
  }, [
    count,
    magnetRadius,
    ringRadius,
    waveSpeed,
    waveAmplitude,
    particleSize,
    lerpSpeed,
    color,
    autoAnimate,
    particleVariance,
    rotationSpeed,
    depthFactor,
    pulseSpeed,
    particleShape,
    fieldStrength,
  ]);

  return <canvas className="antigravity-canvas" ref={canvasRef} />;
}

export default Antigravity;
