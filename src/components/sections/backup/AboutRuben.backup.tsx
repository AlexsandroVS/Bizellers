import { motion } from "framer-motion";
import { fadeInUp, slideInLeft, slideInRight } from "@/utils/animations";
import { useRef } from "react";
import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";

const stats = [
  { value: 7, suffix: "+", label: "años", description: "Liderando equipos comerciales y estrategias de desarrollo de negocios" },
  { value: 5, suffix: "+", label: "industrias", description: "Experiencia en ventas B2B y estrategias Go-To-Market" },
  { value: 5, suffix: "+", label: "países", description: "Sales Ops, ventas, operaciones y expansión internacional" },
];

export function AboutRuben() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, 0.2);

  return (
    <section ref={ref} id="sobre-ruben" className="py-24 bg-negro">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-verde-lima/10 to-gray-800 rounded-3xl overflow-hidden border-4 border-verde-lima/20 shadow-2xl">
                <img
                  src="/ruben-profile.png"
                  alt="Rubén Viera - Fundador de Bizellers"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Badge flotante */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-verde-lima text-negro px-6 py-3 rounded-full font-bold text-sm shadow-xl">
                Fundador de Bizellers
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-blanco mb-6">
              Hola, soy <span className="text-verde-lima">Rubén Viera</span> 👋
            </h2>

            <div className="border-l-4 border-verde-lima pl-6 mb-6">
              <p className="text-xl text-gray-100 leading-relaxed">
                He liderado estrategias comerciales de ventas B2B y crecimiento acelerado en startups que escalaron exitosamente en toda Latinoamérica.
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl mb-8">
              <p className="text-lg text-gray-100 leading-relaxed">
                Hoy, desde <span className="text-verde-lima font-bold">Bizellers</span>, ayudo a fundadores, líderes, equipos y empresas en expansión a construir sistemas de venta robustos que realmente generan resultados.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              {stats.map((stat, i) => (
                <StatCard key={i} stat={stat} enabled={isInView} delay={i * 0.1} />
              ))}
            </div>

            {/* Mentoring Section */}
            <div className="bg-verde-lima-muted border border-verde-lima/30 rounded-xl p-6 mb-8">
              <p className="text-gray-100 mb-4">
                Damos mentoring especializado en ventas B2B & Growth a startups tecnológicas en etapa de crecimiento acelerado dentro de incubadoras de negocios.
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <img
                  src="/Nexum1.png"
                  alt="Nexum Aceleradora"
                  className="h-12 object-contain bg-blanco px-4 py-2 rounded"
                />
                <img
                  src="/Kaman1.png"
                  alt="Kaman Incubadora de Negocios"
                  className="h-12 object-contain bg-blanco px-4 py-2 rounded"
                />
              </div>
            </div>

            <motion.a
              href="#contacto"
              className="inline-block bg-verde-lima text-negro px-8 py-4 rounded-lg font-bold"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(180, 252, 5, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              Conversemos sobre tu estrategia comercial
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface StatCardProps {
  stat: typeof stats[0];
  enabled: boolean;
  delay: number;
}

function StatCard({ stat, enabled, delay }: StatCardProps) {
  const count = useCountUp(stat.value, 2000, enabled);

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={enabled ? { opacity: 1, y: 0 } : {}}
      transition={{ delay }}
    >
      <div className="text-4xl font-bold text-verde-lima mb-1">
        {count}{stat.suffix}
      </div>
      <div className="text-sm font-bold text-blanco mb-2">{stat.label}</div>
      <p className="text-xs text-gray-100">{stat.description}</p>
    </motion.div>
  );
}
