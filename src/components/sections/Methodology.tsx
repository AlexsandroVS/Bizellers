import { motion } from "framer-motion";
import { Lightbulb, Target, Laptop, Sparkles, ArrowRight } from "lucide-react";
import { fadeInUp } from "@/utils/animations";

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
  return (
    <section id="metodologia" className="py-24 bg-negro relative overflow-hidden">
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
      
      {/* Partículas flotantes estilo neón - MUY VISIBLES */}
      {[...Array(18)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.sin(i) * 15, 0],
            opacity: [0.65, 1, 0.65],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 3 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
          className="absolute rounded-full bg-verde-lima blur-lg pointer-events-none z-[1]"
          style={{
            width: `${45 + i * 7}px`,
            height: `${45 + i * 7}px`,
            left: `${3 + i * 5.5}%`,
            top: `${12 + (i % 5) * 20}%`,
            filter: 'blur(6px)',
          }}
        />
      ))}

      <div className="container mx-auto px-6 relative z-[5]">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-2 bg-verde-lima/10 border border-verde-lima/30 rounded-full px-4 py-2 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-4 h-4 text-verde-lima" />
            <span className="text-verde-lima font-bold text-sm">Metodología Comprobada</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold text-blanco mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Nuestra fórmula de <span className="text-verde-lima">éxito</span>
          </motion.h2>

          <motion.p
            className="text-2xl md:text-3xl font-bold text-verde-lima mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            ESTRATEGIA + ENTRENAMIENTO + TECNOLOGÍA
          </motion.p>

          <motion.p
            className="text-lg text-gray-100 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            No creemos en la suerte. Creemos en <span className="text-verde-lima font-bold">sistemas probados</span>.
          </motion.p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              className="relative bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border-2 border-gray-700 hover:border-verde-lima transition-all duration-300 group flex flex-col"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ y: -10, boxShadow: "0 25px 50px rgba(180, 252, 5, 0.15)" }}
            >
              {/* Number Badge */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-negro text-verde-lima rounded-full flex items-center justify-center font-bold text-lg border-2 border-verde-lima shadow-lg">
                {pillar.number}
              </div>

              <div className="w-16 h-16 bg-gradient-to-br from-verde-lima/20 to-verde-lima/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <pillar.icon className="w-8 h-8 text-verde-lima" />
              </div>

              <h3 className="text-2xl font-bold text-blanco mb-4 group-hover:text-verde-lima transition-colors">
                {pillar.title}
              </h3>
              <p className="text-gray-100 leading-relaxed mb-8">{pillar.description}</p>
              
              {/* Green glow effect on hover - MÁS VISIBLE */}
              <div className="absolute inset-0 bg-verde-lima/0 group-hover:bg-verde-lima/10 rounded-2xl transition-all duration-300 -z-10" />
              <div className="absolute -inset-1 bg-verde-lima/0 group-hover:shadow-[0_0_40px_rgba(180,252,5,0.4)] rounded-2xl transition-all duration-300 -z-10" />

              {/* Process Flow */}
              <div className="flex items-center justify-center gap-2 text-sm pt-6 border-t border-gray-700 mt-auto">
                {pillar.process.map((step, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <span className="text-verde-lima font-bold">{step}</span>
                    {j < pillar.process.length - 1 && <ArrowRight className="w-4 h-4 text-gray-100" />}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="#contacto"
            className="inline-block bg-verde-lima text-negro px-10 py-4 rounded-xl font-bold text-lg shadow-xl"
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(180, 252, 5, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            Agendar Sesión Gratuita →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
