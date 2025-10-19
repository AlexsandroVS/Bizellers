import { useState, useEffect, useRef, memo } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Hook para animación de contador al entrar en el viewport
const useInViewCounter = (targetValue: number) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  const count = useMotionValue(0);

  const dynamicDuration = Math.min(0.5 + targetValue * 0.005, 2.5);

  const springConfig = {
    duration: dynamicDuration * 1000,
    stiffness: 40,
    damping: 10
  };

  const rounded = useSpring(count, springConfig);

  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (isInView) {
      count.set(targetValue);
      setHasStarted(true);
    } else if (hasStarted) {
      count.set(0);
      setHasStarted(false);
    }
  }, [isInView, count, targetValue, hasStarted]);

  return { ref, rounded };
};

interface StatCounterProps {
  number: number;
  suffix: string;
  description: string;
  index: number;
  isLast: boolean;
}

const StatCounter = memo(({ number, suffix, description, index, isLast }: StatCounterProps) => {
  const { ref, rounded } = useInViewCounter(number);

  const displayValue = useTransform(rounded, latest => {
    return Math.round(latest).toLocaleString();
  });

  const statVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.1 },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={statVariants}
      whileHover={{ scale: 1.08, y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`px-4 sm:px-6 py-6 sm:py-8 text-center cursor-default group relative overflow-hidden ${
        !isLast ? "md:border-r border-b md:border-b-0 border-verde-lima/20" : "border-b md:border-b-0 border-verde-lima/20 md:border-transparent"
      }`}
    >
      <motion.div
        className="absolute inset-0 bg-verde-lima/0 group-hover:bg-verde-lima/5 rounded-xl transition-colors"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />
      <motion.div
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-verde-lima mb-2 sm:mb-3 group-hover:scale-110 transition-transform relative z-10"
      >
        <motion.span
          className="inline-block"
          whileHover={{ rotate: [0, -5, 5, -5, 0] }}
          transition={{ duration: 0.5 }}
        >
          {displayValue}
        </motion.span>
        {suffix}
      </motion.div>
      <p className="text-xs sm:text-sm text-gray-300 leading-relaxed group-hover:text-blanco transition-colors relative z-10">
        {description}
      </p>
    </motion.div>
  );
});

StatCounter.displayName = 'StatCounter';

export function AboutRuben() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const stats = [
    {
      number: 7,
      suffix: "+ años",
      description: "Liderando equipos comerciales y estrategias de desarrollo de negocios",
    },
    {
      number: 5,
      suffix: "+ industrias",
      description: "Experiencia en ventas B2B y estrategias Go-To-Market",
    },
    {
      number: 5,
      suffix: "+ países",
      description: "Sales Ops, ventas, operaciones y expansión internacional",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <section id="sobre-ruben" className="py-20 md:py-32 bg-negro relative overflow-hidden">
      {/* Animated background elements - INTENSIFIED */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-verde-lima/40 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-verde-lima/35 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-verde-lima/30 rounded-full blur-3xl"
      />

      {/* Additional green glows */}
      <motion.div
        animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.14, 1], x: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '120px',
          height: '120px',
          left: '15%',
          top: '25%',
          background: 'rgba(180, 252, 5, 0.42)',
          filter: 'blur(35px)',
          zIndex: 1,
        }}
      />
      <motion.div
        animate={{ opacity: [0.24, 0.54, 0.24], scale: [1, 1.11, 1], y: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '100px',
          height: '100px',
          right: '20%',
          bottom: '30%',
          background: 'rgba(180, 252, 5, 0.38)',
          filter: 'blur(32px)',
          zIndex: 1,
        }}
      />
      <motion.div
        animate={{ opacity: [0.18, 0.48, 0.18], scale: [1, 1.13, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '110px',
          height: '110px',
          left: '70%',
          top: '60%',
          background: 'rgba(180, 252, 5, 0.4)',
          filter: 'blur(36px)',
          zIndex: 1,
        }}
      />

      <div className="container mx-auto px-6 sm:px-8 lg:px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Grid de 2 columnas: imagen izquierda, contenido derecha */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center mb-12 md:mb-16">

            {/* Columna izquierda: Imagen en cuadrado */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full aspect-square max-w-sm sm:max-w-md md:max-w-lg mx-auto lg:max-w-xl lg:-mt-12"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -inset-4 bg-verde-lima/50 blur-3xl rounded-full"
              />
              <div className="relative h-full">
                <motion.img
                  src="/ruben-profile.png"
                  alt="Rubén Viera - Experto en ventas B2B y estrategias de crecimiento comercial"
                  className="relative w-full h-full rounded-2xl md:rounded-3xl object-cover"
                />
                {/* Efecto de glow intenso detrás */}
                <motion.div
                  className="absolute -inset-2 rounded-3xl bg-verde-lima/50 blur-2xl -z-10"
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.5, 0.7, 0.5]
                  }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />
              </div>
            </motion.div>

            {/* Columna derecha: Contenido */}
            <div className="space-y-6 md:space-y-8 lg:pt-8">
              {/* Header */}
              <motion.h2
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-blanco leading-tight"
              >
                Hola, soy{" "}
                <span className="relative inline-block">
                  <motion.span
                    className="text-verde-lima inline-block relative z-10"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    Rubén Viera
                  </motion.span>
                  <motion.span
                    animate={{ rotate: [0, 12, -12, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "easeInOut",
                    }}
                    className="inline-block ml-2 text-4xl"
                  >
                    👋
                  </motion.span>
                  {/* Underline animado */}
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-verde-lima to-verde-lima/50 rounded-full"
                    initial={{ scaleX: 0, originX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                  />
                </span>
              </motion.h2>

              {/* Text content */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="relative pl-3 md:pl-4 border-l-4 border-verde-lima/40"
                >
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blanco leading-relaxed font-medium">
                    He liderado estrategias comerciales de ventas B2B y crecimiento acelerado en startups
                    que escalaron exitosamente en toda Latinoamérica.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-xl md:rounded-2xl border border-verde-lima/20 shadow-lg"
                >
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blanco leading-relaxed">
                    Hoy, desde <span className="font-bold text-verde-lima bg-verde-lima/10 px-2 py-1 rounded">Bizellers</span>, ayudo a fundadores, líderes, equipos y empresas en expansión a
                    construir sistemas de venta robustos que realmente generan resultados.
                  </p>
                </motion.div>
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, x: 100, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.button
                  onClick={() => scrollToSection("contacto")}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group bg-verde-lima text-negro px-6 py-5 sm:px-5 sm:py-4 rounded-xl font-bold text-sm sm:text-base md:text-lg shadow-2xl hover:shadow-verde-lima/50 transition-all duration-300 relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-3"
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                      repeatDelay: 1,
                    }}
                  />
                  <span className="relative z-10">DIAGNÓSTICO GRATUITO</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>
            </div>
          </div>

          {/* Stats grid debajo de las 2 columnas */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-0 bg-gray-800/50 rounded-xl md:rounded-2xl shadow-2xl p-4 sm:p-6 border border-verde-lima/20 mb-12 md:mb-16 max-w-5xl mx-auto"
          >
            {stats.map((stat, index) => (
              <StatCounter
                key={index}
                number={stat.number}
                suffix={stat.suffix}
                description={stat.description}
                index={index}
                isLast={index === stats.length - 1}
              />
            ))}
          </motion.div>

          {/* Sección de mentoring con logos */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8"
          >
            {/* Texto a la izquierda */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="bg-gradient-to-r from-verde-lima/10 to-transparent p-4 sm:p-5 md:p-6 rounded-lg md:rounded-xl border-l-4 border-verde-lima"
            >
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blanco leading-relaxed font-semibold">
                Damos mentoring especializado en ventas B2B & Growth a startups tecnológicas en etapa de crecimiento acelerado dentro de incubadoras de negocios.
              </p>
            </motion.div>

            {/* Logos a la derecha */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center lg:justify-end gap-4 sm:gap-6"
            >
              <motion.div
                className="relative p-5 rounded-xl border-2 border-verde-lima/30 hover:border-verde-lima bg-gradient-to-br from-verde-lima/10 via-verde-lima/5 to-verde-lima/10 hover:from-verde-lima/20 hover:via-verde-lima/10 hover:to-verde-lima/20 transition-all duration-300 shadow-lg hover:shadow-verde-lima/30 cursor-pointer"
                whileHover={{ scale: 1.12, y: -6, rotate: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 12 }}
              >
                <img
                  src="/Nexum1.png"
                  alt="Nexum Aceleradora"
                  className="h-10 sm:h-12 md:h-14 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
                />
              </motion.div>
              <motion.div
                className="relative p-5 rounded-xl border-2 border-verde-lima/30 hover:border-verde-lima bg-gradient-to-br from-verde-lima/10 via-verde-lima/5 to-verde-lima/10 hover:from-verde-lima/20 hover:via-verde-lima/10 hover:to-verde-lima/20 transition-all duration-300 shadow-lg hover:shadow-verde-lima/30 cursor-pointer"
                whileHover={{ scale: 1.12, y: -6, rotate: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 12 }}
              >
                <img
                  src="/Kaman1.png"
                  alt="Kaman Incubadora de Negocios"
                  className="h-10 sm:h-12 md:h-14 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
