❯ cat SobreRuben.tsx
import { useState, useEffect, useRef, memo } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import rubenImage from "@/assets/ruben-profile.png";
import nexumLogo from "@/assets/Nexum1.png";
import kamanLogo from "@/assets/Kaman1.png";
import { AnimatedSection } from "@/components/AnimatedSection";

// ---------------------------------------------------------------------
// 1. HOOK MEJORADO: useInViewCounter
// ---------------------------------------------------------------------

/**
 * Hook para la animación de conteo numérico al entrar en el viewport.
 * La duración de la animación es dinámica, proporcional al valor.
 * @param targetValue El valor numérico final al que debe llegar el contador.
 * @returns Un objeto con la referencia del elemento y el valor animado.
 */
const useInViewCounter = (targetValue: number) => {
  const ref = useRef(null);
  // once: false permite que la animación se reinicie al hacer scroll.
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  const count = useMotionValue(0);

  // 1. Cálculo de Duración Dinámica
  // Duración base: 0.5s para números pequeños.
  // Incremento: +0.005s por unidad para números grandes.
  // Máximo: limitamos la duración a 2.5s para evitar ser demasiado lento.
  const dynamicDuration = Math.min(
    0.5 + targetValue * 0.005,
    2.5 // Máximo 2.5 segundos
  );

  // 2. Configuración del Spring con la duración dinámica
  // Usamos una rigidez más baja para números pequeños y más alta para grandes
  // para que el "rebote" no se sienta tan fuerte en números bajos.
  const springConfig = {
    duration: dynamicDuration * 1000,
    stiffness: 40, // Un poco más suave
    damping: 10
  };

  const rounded = useSpring(count, springConfig);

  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (isInView) {
      // 1. Cuando está visible, empezamos la animación
      count.set(targetValue);
      setHasStarted(true);
    } else if (hasStarted) {
      // 2. Cuando sale de la vista Y YA ha empezado, reiniciamos el valor a 0
      count.set(0);
      setHasStarted(false);
    }
  }, [isInView, count, targetValue, hasStarted]);

  return { ref, rounded };
};

/**
 * Componente para mostrar la estadística con animaciónde contador.
 */
interface StatCounterProps {
  number: number;
  suffix: string;
  description: string;
  index: number;
  isLast: boolean;
}

const StatCounter = memo(({ number, suffix, description, index, isLast }: StatCounterProps) => {
  // EL HOOK AHORA SOLO RECIBE EL VALOR NUMÉRICO
  const { ref, rounded } = useInViewCounter(number);

  // Transformación para redondear el valor y añadir elsufijo
  const displayValue = useTransform(rounded, latest => {
    // Si el número es bajo (como 5 o 7), no queremos decimales.
    // Usaremos `Math.round` para números enteros.
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
      ref={ref} // Adjuntar el ref al elemento padre para detección de visibilidad
      variants={statVariants}
      whileHover={{ scale: 1.08, y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`px-4 sm:px-6 py-6 sm:py-8 text-centercursor-default group relative overflow-hidden ${
        !isLast ? "md:border-r border-b md:border-b-0 border-primary/20" : "border-b md:border-b-0 border-primary/20 md:border-transparent"
      }`}
    >
      {/* Efecto de glow en hover */}
      <motion.div
        className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 rounded-xl transition-colors"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />
      <motion.div
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2 sm:mb-3 group-hover:scale-110 transition-transform relative z-10"
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
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors relative z-10">
        {description}
      </p>
    </motion.div>
  );
});

StatCounter.displayName = 'StatCounter';

// ---------------------------------------------------------------------
// 2. COMPONENTE PRINCIPAL REFACTORIZADO: SobreRuben
// ---------------------------------------------------------------------

const SobreRuben = () => {
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

  // ¡IMPORTANTE! Refactorizar stats para separar número y sufijo
  const stats = [
    {
      number: 7,
      suffix: "+ años", // Lo que NO se anima
      description: "Liderando equipos comerciales y estrategias de desarrollo de negocios",
    },
    {
      number: 5,
      suffix: "+ industrias", // Lo que NO se anima
      description: "Experiencia en ventas B2B y estrategias Go-To-Market",
    },
    {
      number: 5,
      suffix: "+ países", // Lo que NO se anima
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
    <section id="sobre-ruben" className="py-20 md:py-32bg-gradient-subtle relative overflow-hidden">
      {/* Animated background elements (Mantenido) */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-6 sm:px-8 lg:px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Grid de 2 columnas: imagen izquierda, contenido derecha */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center mb-12 md:mb-16">

            {/* Columna izquierda: Imagen en cuadrado */}
            <AnimatedSection>
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full aspect-square max-w-sm sm:max-w-md md:max-w-lg mx-auto lg:max-w-xl lg:-mt-12"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-secondary/15 blur-3xl rounded-full"
                />
                <div className="relative h-full">
                  <motion.img
                    src={rubenImage}
                    alt="Rubén Viera - Experto en ventas B2B y estrategias de crecimiento comercial"
                    className="relative w-full h-full rounded-2xl md:rounded-3xl object-cover"
                  />
                  {/* Efecto de glow sutil detrás */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-primary/20 blur-2xl -z-10"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>
            </AnimatedSection>

            {/* Columna derecha: Contenido */}
            <div className="space-y-6 md:space-y-8 lg:pt-8">
              {/* Header */}
              <AnimatedSection>
                <motion.h2
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-foreground leading-tight"
                >
                  Hola, soy{" "}
                  <span className="relative inline-block">
                    <motion.span
                      className="text-primary inline-block relative z-10"
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
                      className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
                      initial={{ scaleX: 0, originX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: false }}
                      transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                    />
                  </span>
                </motion.h2>
              </AnimatedSection>

              {/* Text content */}
              <AnimatedSection className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="relative pl-3 md:pl-4 border-l-4 border-primary/40"
                >
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground leading-relaxed font-medium">
                    He liderado estrategias comercialesde ventas B2B y crecimiento acelerado en startups
                    que escalaron exitosamente en toda Latinoamérica.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-card/50 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-xl md:rounded-2xl border border-primary/20 shadow-lg"
                >
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground leading-relaxed">
                    Hoy, desde <span className="font-bold text-primary bg-primary/10 px-2 py-1 rounded">Bizellers</span>, ayudo a fundadores, líderes, equipos y empresas en expansión a
                    construir sistemas de venta robustos que realmente generan resultados.
                  </p>
                </motion.div>
              </AnimatedSection>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, x: 100, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale:1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block"
                >
                  <Button
                    onClick={() => scrollToSection("contacto")}
                    variant="cta"
                    size="lg"
                    className="group shadow-2xl hover:shadow-primary/50 transition-all duration-300 text-sm sm:text-base md:text-lg px-6 py-5 sm:px-8 sm:py-6 relative overflow-hidden w-full sm:w-auto"
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
                    <span className="relative z-10">Conversemos sobre tu estrategia comercial</span>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Stats grid debajo de las 2 columnas - disposición única */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-0 bg-card rounded-xl md:rounded-2xl shadow-2xl p-4 sm:p-6 border border-primary/20 mb-12 md:mb-16"
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
              className="bg-gradient-to-r from-primary/5 to-transparent p-4 sm:p-5 md:p-6 rounded-lg md:rounded-xl border-l-4 border-primary"
            >
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground leading-relaxed font-semibold">
                Damos mentoring especializado en ventasB2B & Growth a startups tecnológicas en etapa de crecimiento acelerado dentro de incubadoras de negocios.
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
                className="relative p-5 rounded-xl border-2 border-primary/30 hover:border-primary bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 hover:from-primary/20 hover:via-secondary/20 hover:to-primary/10 transition-all duration-300 shadow-medium hover:shadow-glow cursor-pointer"
                whileHover={{ scale: 1.12, y: -6, rotate: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 12 }}
              >
                <img
                  src={nexumLogo}
                  alt="Nexum Aceleradora"
                  className="h-10 sm:h-12 md:h-14 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
                />
              </motion.div>
              <motion.div
                className="relative p-5 rounded-xl border-2 border-primary/30 hover:border-primary bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 hover:from-primary/20 hover:via-secondary/20 hover:to-primary/10 transition-all duration-300 shadow-medium hover:shadow-glow cursor-pointer"
                whileHover={{ scale: 1.12, y: -6, rotate: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 12 }}
              >
                <img
                  src={kamanLogo}
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
};

