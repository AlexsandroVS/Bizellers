import { motion } from "framer-motion";
import { ChevronDown, TrendingUp, Target, Zap } from "lucide-react";
import { waveVariants, glitchVariants } from "@/utils/animations";
import { GreenParticles } from "@/components/common/GreenParticles";

export function Hero() {
  // Palabras clave que se destacan en verde
  const greenKeywords = ["estrategia", "entrenamiento", "tecnología"];
  const headline = "Escala tus ventas con estrategia, entrenamiento y tecnología";
  const words = headline.split(" ");

  // Función para renderizar una palabra con animación de ola si es palabra clave
  const renderWord = (word: string, wordIndex: number) => {
    const cleanWord = word.toLowerCase().replace(/[^a-záéíóúñ]/g, "");
    const isKeyword = greenKeywords.includes(cleanWord);

    if (!isKeyword) {
      return (
        <motion.span
          key={wordIndex}
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            delay: wordIndex * 0.1,
            duration: 0.5,
            ease: [0.6, 0.05, 0.01, 0.9],
          }}
          className="inline-block mr-3"
        >
          {word}
        </motion.span>
      );
    }

    // Para palabras clave, animar letra por letra con efecto de ola
    const letters = word.split("");
    return (
      <span key={wordIndex} className="inline-block mr-3 text-verde-lima font-extrabold">
        {letters.map((letter, letterIndex) => (
          <motion.span
            key={`${wordIndex}-${letterIndex}`}
            className="inline-block"
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: 1,
              y: [50, 0, -8, 0],
              textShadow: [
                "0 0 0px rgba(180, 252, 5, 0)",
                "0 0 10px rgba(180, 252, 5, 0.5)",
                "0 0 20px rgba(180, 252, 5, 0.8)",
                "0 0 10px rgba(180, 252, 5, 0.5)",
              ],
            }}
            transition={{
              opacity: { delay: wordIndex * 0.1, duration: 0.3 },
              y: {
                delay: wordIndex * 0.1 + letterIndex * 0.05,
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut",
              },
              textShadow: {
                delay: wordIndex * 0.1 + letterIndex * 0.05,
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut",
              },
            }}
          >
            {letter}
          </motion.span>
        ))}
      </span>
    );
  };

  const metrics = [
    { icon: TrendingUp, value: "+40%", label: "Productividad", position: "top-1/4 right-[10%]" },
    { icon: Target, value: "+100%", label: "Conversión", position: "bottom-1/3 left-[8%]" },
    { icon: Zap, value: "2.5x", label: "ROI", position: "top-1/3 left-[15%]" },
  ];

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        {/* Video para Desktop */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hidden md:block w-full h-full object-cover brightness-[0.3]"
          poster="/herovid.gif"
        >
          <source src="/herovid2.mp4" type="video/mp4" />
        </video>

        {/* Video para Responsive/Mobile */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="md:hidden w-full h-full object-cover brightness-[0.3]"
          poster="/herovid.gif"
        >
          <source src="/heroresponsive.mp4" type="video/mp4" />
          {/* Fallback to GIF if video doesn't load */}
          <img
            src="/herovid.gif"
            alt="Conferencia de negocios y crecimiento empresarial B2B - Bizellers consultoría de ventas"
            className="w-full h-full object-cover brightness-[0.3]"
          />
        </video>

        {/* Overlay oscuro para contraste */}
        <div className="absolute inset-0 bg-negro/50" />

        {/* Partículas verdes */}
        <GreenParticles count={30} minSize={2} maxSize={5} />

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
            {words.map((word, i) => renderWord(word, i))}
          </h1>

          {/* Subheadline */}
          <motion.p
            className="text-xl md:text-2xl text-blanco/90 mb-10 max-w-3xl mx-auto drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            En Bizellers convertimos{" "}
            <motion.span
              className="text-verde-lima font-bold inline-block"
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 20px rgba(180, 252, 5, 0.8)",
                transition: { duration: 0.2 }
              }}
            >
              equipos comerciales
            </motion.span>{" "}
            en{" "}
            <motion.span
              className="text-verde-lima font-bold inline-block"
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 20px rgba(180, 252, 5, 0.8)",
                transition: { duration: 0.2 }
              }}
            >
              motores de crecimiento
            </motion.span>
            .
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, type: "spring", stiffness: 200, damping: 15 }}
          >
            <motion.a
              href="#contacto"
              className="inline-block bg-verde-lima text-negro px-12 py-5 rounded-lg font-bold text-xl shadow-2xl relative overflow-hidden"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 50px rgba(180, 252, 5, 0.8), 0 10px 30px rgba(0, 0, 0, 0.3)",
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: "easeInOut"
                }}
              />
              <span className="relative z-10">Diagnóstico Gratuito</span>
            </motion.a>
          </motion.div>

          {/* Métricas */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {metrics.map((metric, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center gap-2 p-4 rounded-full"
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: 1.8 + i * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
                whileHover={{
                  backgroundColor: "rgba(180, 252, 5, 0.03)",
                  transition: { duration: 0.4 }
                }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut"
                  }}
                >
                  <metric.icon className="w-8 h-8 text-verde-lima" />
                </motion.div>
                <motion.div
                  className="text-3xl md:text-4xl font-bold text-verde-lima"
                  animate={{
                    scale: [1, 1.05, 1],
                    textShadow: [
                      "0 0 10px rgba(180, 252, 5, 0.3)",
                      "0 0 20px rgba(180, 252, 5, 0.6)",
                      "0 0 10px rgba(180, 252, 5, 0.3)",
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut"
                  }}
                >
                  {metric.value}
                </motion.div>
                <div className="text-sm text-blanco font-medium">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.a
        href="#metodologia"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer group"
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{ delay: 2.5, duration: 0.8 }}
        whileHover={{ scale: 1.2 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{
            y: [0, 12, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-verde-lima rounded-full flex items-start justify-center p-1"
            animate={{
              borderColor: ["#b4fc05", "#8bc905", "#b4fc05"],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut"
            }}
          >
            <motion.div
              className="w-1.5 h-1.5 bg-verde-lima rounded-full"
              animate={{
                y: [0, 16, 0],
                opacity: [1, 0.3, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut"
              }}
            />
          </motion.div>
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut"
            }}
          >
            <ChevronDown className="w-6 h-6 text-verde-lima drop-shadow-[0_0_10px_rgba(180,252,5,0.5)]" />
          </motion.div>
        </motion.div>
      </motion.a>
    </section>
  );
}
