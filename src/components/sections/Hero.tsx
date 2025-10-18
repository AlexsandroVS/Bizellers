import { motion } from "framer-motion";
import { ChevronDown, TrendingUp, Target, Zap } from "lucide-react";
import { waveVariants } from "@/utils/animations";

export function Hero() {
  // Palabras clave que se destacan en verde
  const greenKeywords = ["estrategia", "entrenamiento", "tecnología"];
  const headline = "Escala tus ventas con estrategia, entrenamiento y tecnología";
  const words = headline.split(" ");

  const metrics = [
    { icon: TrendingUp, value: "+40%", label: "Productividad", position: "top-1/4 right-[10%]" },
    { icon: Target, value: "+100%", label: "Conversión", position: "bottom-1/3 left-[8%]" },
    { icon: Zap, value: "2.5x", label: "ROI", position: "top-1/3 left-[15%]" },
  ];

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video/GIF Background */}
      <div className="absolute inset-0">
        <img
          src="/herovid.gif"
          alt="Business Conference"
          className="w-full h-full object-cover brightness-[0.3]"
        />
        {/* Overlay oscuro para contraste */}
        <div className="absolute inset-0 bg-negro/50" />
        {/* Green glow effects */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-verde-lima/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-verde-lima/15 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-6 py-32">
        <div className="max-w-5xl mx-auto text-center">
          {/* Animated Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-blanco mb-6 leading-tight drop-shadow-2xl">
            {words.map((word, i) => {
              const cleanWord = word.toLowerCase().replace(/[^a-záéíóúñ]/g, "");
              const isKeyword = greenKeywords.includes(cleanWord);
              return (
                <motion.span
                  key={i}
                  custom={i}
                  variants={waveVariants}
                  initial="hidden"
                  animate="visible"
                  className={`inline-block mr-3 ${isKeyword ? 'text-verde-lima font-extrabold' : ''}`}
                >
                  {word}
                </motion.span>
              );
            })}
          </h1>

          {/* Subheadline */}
          <motion.p
            className="text-xl md:text-2xl text-blanco/90 mb-10 max-w-3xl mx-auto drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            En Bizellers convertimos <span className="text-verde-lima font-bold">equipos comerciales</span> en{" "}
            <span className="text-verde-lima font-bold">motores de crecimiento</span>.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.a
              href="#contacto"
              className="inline-block bg-verde-lima text-negro px-12 py-5 rounded-lg font-bold text-xl shadow-2xl"
              whileHover={{ scale: 1.08, boxShadow: "0 0 40px rgba(180, 252, 5, 0.6)" }}
              whileTap={{ scale: 0.95 }}
            >
              Diagnóstico Gratuito
            </motion.a>
          </motion.div>

          {/* Métricas */}
          <motion.div
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
          >
            {metrics.map((metric, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <metric.icon className="w-8 h-8 text-verde-lima" />
                <div className="text-3xl md:text-4xl font-bold text-verde-lima">{metric.value}</div>
                <div className="text-sm text-blanco">{metric.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <ChevronDown className="w-8 h-8 text-verde-lima drop-shadow-lg" />
      </motion.div>
    </section>
  );
}
