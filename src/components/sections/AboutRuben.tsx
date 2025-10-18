import { motion } from "framer-motion";
import { slideInLeft, slideInRight } from "@/utils/animations";
import { useRef } from "react";
import { useScrollInView } from "@/hooks/useScrollInView";
import { useCountUp } from "@/hooks/useCountUp";
import { GreenParticles } from "@/components/common/GreenParticles";

const stats = [
  { value: 7, suffix: "+", label: "años", description: "Liderando equipos comerciales y estrategias de desarrollo de negocios" },
  { value: 5, suffix: "+", label: "industrias", description: "Experiencia en ventas B2B y estrategias Go-To-Market" },
  { value: 5, suffix: "+", label: "países", description: "Sales Ops, ventas, operaciones y expansión internacional" },
];

export function AboutRuben() {
  const ref = useRef<HTMLElement>(null);
  const { isInView } = useScrollInView(ref, 0.2);

  return (
    <section ref={ref} id="sobre-ruben" className="py-24 bg-negro relative overflow-hidden">
      {/* Partículas verdes */}
      <GreenParticles count={30} minSize={2} maxSize={5} />

      {/* Green glow effects - MUY VISIBLES */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-40 left-20 w-[500px] h-[500px] bg-verde-lima/50 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute bottom-40 right-20 w-96 h-96 bg-verde-lima/45 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-verde-lima/40 rounded-full blur-3xl"
      />
      
      {/* Pocos brillos sutiles en posiciones aleatorias */}
      <motion.div
        animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.14, 1], y: [0, -15, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '100px',
          height: '100px',
          left: '10%',
          top: '30%',
          background: 'rgba(180, 252, 5, 0.4)',
          filter: 'blur(31px)',
          zIndex: 1,
        }}
      />
      <motion.div
        animate={{ opacity: [0.24, 0.54, 0.24], scale: [1, 1.11, 1], x: [0, 12, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '115px',
          height: '115px',
          right: '15%',
          top: '65%',
          background: 'rgba(180, 252, 5, 0.43)',
          filter: 'blur(33px)',
          zIndex: 1,
        }}
      />
      <motion.div
        animate={{ opacity: [0.18, 0.48, 0.18], scale: [1, 1.13, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '92px',
          height: '92px',
          left: '75%',
          bottom: '25%',
          background: 'rgba(180, 252, 5, 0.37)',
          filter: 'blur(29px)',
          zIndex: 1,
        }}
      />
      <div className="container mx-auto px-6 relative z-[5]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Outer animated glow - SUPER VISIBLE */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -inset-8 bg-verde-lima/60 blur-3xl rounded-full"
              />
              
              {/* Middle glow layer */}
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.6, 0.9, 0.6],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute -inset-4 bg-verde-lima/50 blur-2xl rounded-full"
              />
              
              {/* Inner sharp glow */}
              <motion.div
                animate={{
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -inset-2 bg-verde-lima/40 blur-xl rounded-full"
              />
              
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/ruben-profile.png"
                  alt="Rubén Viera - Fundador y CEO de Bizellers, experto en consultoría de ventas B2B y crecimiento comercial"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width="500"
                  height="500"
                />
              </div>
              {/* Badge flotante - Reducido y centrado */}
              <motion.div
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-verde-lima text-negro px-4 py-2 rounded-full font-bold text-xs shadow-xl whitespace-nowrap"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(180, 252, 5, 0.6)",
                }}
              >
                Fundador de Bizellers
              </motion.div>
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

            {/* Partner Logos */}
            <div className="flex flex-wrap gap-6 items-center mb-8">
              <img
                src="/Nexum1.png"
                alt="Nexum Aceleradora - Partner de Bizellers en desarrollo de startups y scaleups"
                className="h-16 object-contain filter brightness-0 invert"
                loading="lazy"
                width="200"
                height="64"
              />
              <img
                src="/Kaman1.png"
                alt="Kaman Incubadora de Negocios - Partner de Bizellers en crecimiento empresarial"
                className="h-16 object-contain filter brightness-0 invert"
                loading="lazy"
                width="200"
                height="64"
              />
            </div>

            <div className="text-center lg:text-left">
              <motion.a
                href="#contacto"
                className="inline-block bg-verde-lima text-negro px-8 py-4 rounded-lg font-bold shadow-xl hover:shadow-verde-lima/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Conversemos sobre tu estrategia comercial
              </motion.a>
            </div>
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
