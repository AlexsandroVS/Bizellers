import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: string;
  y: string;
  size: number;
  duration: number;
  delay: number;
}

interface GreenParticlesProps {
  count?: number;
  minSize?: number;
  maxSize?: number;
}

export function GreenParticles({ count = 20, minSize = 2, maxSize = 6 }: GreenParticlesProps) {
  const particles: Particle[] = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    size: minSize + Math.random() * (maxSize - minSize),
    duration: 3 + Math.random() * 4,
    delay: Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-verde-lima"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            filter: "blur(1px)",
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Componente para efectos de brillo grandes
interface GlowEffectsProps {
  variant?: "dark" | "light";
  intensity?: "low" | "medium" | "high";
}

export function GlowEffects({ variant = "dark", intensity = "medium" }: GlowEffectsProps) {
  const opacities = {
    low: { min: 0.15, max: 0.25 },
    medium: { min: 0.25, max: 0.45 },
    high: { min: 0.35, max: 0.6 },
  };

  const currentOpacity = opacities[intensity];

  return (
    <>
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [currentOpacity.min, currentOpacity.max, currentOpacity.min] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute top-1/4 right-1/4 w-96 h-96 ${
          variant === "dark" ? "bg-verde-lima/40" : "bg-verde-lima/30"
        } rounded-full blur-3xl`}
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [currentOpacity.min - 0.05, currentOpacity.max - 0.1, currentOpacity.min - 0.05] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className={`absolute bottom-1/4 left-1/4 w-80 h-80 ${
          variant === "dark" ? "bg-verde-lima/35" : "bg-verde-lima/25"
        } rounded-full blur-3xl`}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [currentOpacity.min - 0.1, currentOpacity.max - 0.15, currentOpacity.min - 0.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] ${
          variant === "dark" ? "bg-verde-lima/30" : "bg-verde-lima/20"
        } rounded-full blur-3xl`}
      />
    </>
  );
}
