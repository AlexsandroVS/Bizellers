import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";
import { TrendingUp } from "lucide-react";

const stats = [
  { value: 40, suffix: "%", label: "Incremento en Productividad" },
  { value: 100, suffix: "%", label: "Mejora en Conversión" },
  { value: 2.5, suffix: "x", label: "ROI Promedio" },
];

export function Stats() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, 0.3);

  return (
    <section ref={ref} className="py-12 bg-negro relative overflow-hidden">
      {/* Enhanced green glow effects with particles - MÁS VISIBLES */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-verde-lima/40 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-0 left-1/4 w-80 h-80 bg-verde-lima/50 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 right-1/4 w-80 h-80 bg-verde-lima/50 rounded-full blur-3xl"
      />
      
      {/* Efectos de brillo aleatorios */}
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3], x: [-20, 20, -20] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 right-1/3 w-40 h-40 bg-verde-lima/40 rounded-full blur-2xl"
      />
      <motion.div
        animate={{ opacity: [0.2, 0.6, 0.2], y: [-15, 15, -15] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/3 left-1/3 w-32 h-32 bg-verde-lima/35 rounded-full blur-xl"
      />
      
      {/* Pocos brillos sutiles en posiciones aleatorias */}
      <motion.div
        animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.1, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '100px',
          height: '100px',
          left: '15%',
          top: '25%',
          background: 'rgba(180, 252, 5, 0.4)',
          filter: 'blur(30px)',
          zIndex: 1,
        }}
      />
      <motion.div
        animate={{ opacity: [0.15, 0.45, 0.15], scale: [1, 1.15, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '120px',
          height: '120px',
          right: '20%',
          top: '60%',
          background: 'rgba(180, 252, 5, 0.35)',
          filter: 'blur(35px)',
          zIndex: 1,
        }}
      />
      <motion.div
        animate={{ opacity: [0.25, 0.55, 0.25], scale: [1, 1.12, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '90px',
          height: '90px',
          left: '70%',
          top: '35%',
          background: 'rgba(180, 252, 5, 0.38)',
          filter: 'blur(32px)',
          zIndex: 1,
        }}
      />
      <div className="container mx-auto px-6 relative z-[5]">
        {/* Top divider - MÁS VISIBLE */}
        <div className="mb-8">
          <div className="h-0.5 bg-gradient-to-r from-transparent via-verde-lima/60 to-transparent shadow-[0_0_10px_rgba(180,252,5,0.5)]"></div>
        </div>
        
        {/* Badge */}
        <div className="text-center mb-8">
          <motion.div
            className="inline-flex items-center gap-2 bg-verde-lima-muted border border-verde-lima/30 rounded-full px-4 py-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            <TrendingUp className="w-4 h-4 text-verde-lima" />
            <span className="text-verde-lima font-bold text-sm">Resultados Comprobados</span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <StatItem key={i} stat={stat} delay={i * 0.1} enabled={isInView} />
          ))}
        </div>
        
        {/* Bottom divider - MÁS VISIBLE */}
        <div className="mt-8">
          <div className="h-0.5 bg-gradient-to-r from-transparent via-verde-lima/60 to-transparent shadow-[0_0_10px_rgba(180,252,5,0.5)]"></div>
        </div>
      </div>
    </section>
  );
}

interface StatItemProps {
  stat: typeof stats[0];
  delay: number;
  enabled: boolean;
}

function StatItem({ stat, delay, enabled }: StatItemProps) {
  const count = useCountUp(stat.value, 2000, enabled);

  return (
    <motion.div
      className="text-center relative"
      initial={{ opacity: 0, y: 30 }}
      animate={enabled ? { opacity: 1, y: 0 } : {}}
      transition={{ delay }}
    >
      <div className="text-4xl md:text-5xl font-bold text-verde-lima mb-2 drop-shadow-[0_0_10px_rgba(180,252,5,0.5)]">
        {count}{stat.suffix}
      </div>
      <p className="text-base text-blanco">{stat.label}</p>
    </motion.div>
  );
}
