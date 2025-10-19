import { motion } from "framer-motion";
import { Lightbulb, Target, Laptop, Sparkles, ArrowRight } from "lucide-react";
import { fadeInUp, slideUpScale } from "@/utils/animations";
import { useRef } from "react";
import { useScrollInView } from "@/hooks/useScrollInView";

const pillars = [
  {
    icon: Lightbulb,
    number: "01",
    title: "Consultoría estratégica",
    description: "Diagnóstico profundo, definición de foco y diseño de estructura comercial efectiva.",
    highlights: ["Análisis de mercado", "Estructura comercial", "Plan de crecimiento"],
    process: ["Diagnóstico", "Estrategia", "Implementación"],
  },
  {
    icon: Target,
    number: "02",
    title: "Entrenamiento de alto rendimiento",
    description: "Metodologías B2B probadas y validadas en startups y empresas en plena expansión comercial.",
    highlights: ["Técnicas probadas", "Capacitación continua", "Mejores prácticas", "Simulaciones en vivo"],
    process: ["Evaluación", "Capacitación", "Seguimiento"],
  },
  {
    icon: Laptop,
    number: "03",
    title: "Tecnología de ventas",
    description: "Implementación estratégica y optimización continua de herramientas tech para escalar sin fricción.",
    highlights: ["CRM optimizado", "Automatización", "Analítica avanzada"],
    process: ["Selección", "Implementación", "Optimización"],
  },
];

export function Methodology() {
  const ref = useRef<HTMLElement>(null);
  const { isInView } = useScrollInView(ref, 0.2);

  return (
    <section ref={ref} id="metodologia" className="py-24 bg-negro relative overflow-hidden">
      {/* Background Effect - MUY VISIBLES */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-verde-lima/50 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-0 left-0 w-[550px] h-[550px] bg-verde-lima/45 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-verde-lima/35 rounded-full blur-3xl"
      />
      
      {/* Pocos brillos sutiles en posiciones aleatorias */}
      <motion.div
        animate={{ opacity: [0.18, 0.48, 0.18], scale: [1, 1.13, 1], x: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '110px',
          height: '110px',
          left: '12%',
          top: '20%',
          background: 'rgba(180, 252, 5, 0.42)',
          filter: 'blur(33px)',
          zIndex: 1,
        }}
      />
      <motion.div
        animate={{ opacity: [0.22, 0.52, 0.22], scale: [1, 1.1, 1], y: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '95px',
          height: '95px',
          right: '18%',
          bottom: '30%',
          background: 'rgba(180, 252, 5, 0.38)',
          filter: 'blur(30px)',
          zIndex: 1,
        }}
      />
      <motion.div
        animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '105px',
          height: '105px',
          left: '65%',
          top: '55%',
          background: 'rgba(180, 252, 5, 0.4)',
          filter: 'blur(34px)',
          zIndex: 1,
        }}
      />
      <motion.div
        animate={{ opacity: [0.16, 0.46, 0.16], scale: [1, 1.12, 1], x: [0, -10, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '85px',
          height: '85px',
          left: '35%',
          bottom: '15%',
          background: 'rgba(180, 252, 5, 0.36)',
          filter: 'blur(28px)',
          zIndex: 1,
        }}
      />

      <div className="container mx-auto px-6 relative z-[5]">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-2 bg-verde-lima/10 border border-verde-lima/30 rounded-full px-4 py-2 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="w-4 h-4 text-verde-lima" />
            <span className="text-verde-lima font-bold text-sm">Metodología Comprobada</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold text-blanco mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            Nuestra fórmula de <span className="text-verde-lima">éxito</span>
          </motion.h2>

          <motion.p
            className="text-lg text-gray-100 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            No creemos en la suerte. Creemos en <span className="text-verde-lima font-bold">sistemas probados</span>.
          </motion.p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {pillars.map((pillar, i) => (
            <motion.div
              key={`${i}-${isInView}`}
              className="relative bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border-2 group flex flex-col"
              style={{ borderColor: "#374151" }}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{
                delay: isInView ? i * 0.12 : 0,
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{
                y: -12,
                borderColor: "#b4fc05",
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              {/* Number Badge */}
              <motion.div
                className="absolute -top-4 -right-4 w-12 h-12 bg-negro text-verde-lima rounded-full flex items-center justify-center font-bold text-lg border-2 border-verde-lima shadow-lg"
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
              >
                {pillar.number}
              </motion.div>

              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-verde-lima/20 to-verde-lima/5 rounded-xl flex items-center justify-center mb-6"
                whileHover={{
                  scale: 1.15,
                  rotate: [0, -10, 10, -10, 0],
                  backgroundColor: "rgba(180, 252, 5, 0.3)",
                }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                >
                  <pillar.icon className="w-8 h-8 text-verde-lima" />
                </motion.div>
              </motion.div>

              <motion.h3
                className="text-2xl font-bold text-blanco mb-4"
                whileHover={{
                  color: "#b4fc05",
                  x: 5,
                }}
                transition={{ duration: 0.2 }}
              >
                {pillar.title}
              </motion.h3>
              <p className="text-gray-100 leading-relaxed mb-8">{pillar.description}</p>
              
              {/* Green glow effect on hover - MÁS VISIBLE */}
              <div className="absolute inset-0 bg-verde-lima/0 group-hover:bg-verde-lima/10 rounded-2xl transition-all duration-300 -z-10" />
              <div className="absolute -inset-1 bg-verde-lima/0 group-hover:shadow-[0_0_40px_rgba(180,252,5,0.4)] rounded-2xl transition-all duration-300 -z-10" />

              {/* Process Flow */}
              <div className="flex items-center justify-center gap-2 text-xs pt-6 border-t border-gray-700 mt-auto">
                
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <motion.a
            href="#contacto"
            className="inline-flex items-center gap-3 bg-verde-lima text-negro px-10 py-4 rounded-xl font-bold text-lg shadow-xl group"
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(180, 252, 5, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            DIAGNÓSTICO GRATUITO
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
