import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollInView } from "@/hooks/useScrollInView";

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

const testimonials = [
  {
    quote: "Pasamos de no tener procesos claros a cerrar deals de manera consistente cada semana. El impacto fue inmediato y completamente sostenible.",
    author: "Carlos Mendoza",
    role: "CEO",
    company: "TechSaaS Perú",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    quote: "Logramos previsibilidad real en nuestras ventas y claridad absoluta en los indicadores clave del negocio.",
    author: "Ana Rodríguez",
    role: "Co-Founder",
    company: "ScaleUp México",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  },
  {
    quote: "Rubén entiende perfectamente cómo escalar equipos comerciales sin perder la esencia y cultura de ventas.",
    author: "Diego Silva",
    role: "Head of Sales",
    company: "GrowthCo Chile",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
  },
  {
    quote: "La estructura estratégica que implementamos nos permitió duplicar exitosamente nuestro pipeline en solo 4 meses.",
    author: "María González",
    role: "VP Sales",
    company: "InnovateTech Argentina",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
  },
  {
    quote: "El entrenamiento intensivo transformó completamente a nuestro equipo de ventas B2B en resultados y mentalidad.",
    author: "Luis Fernández",
    role: "Founder",
    company: "B2B Solutions Colombia",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { isInView } = useScrollInView(sectionRef, 0.2);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const getCardPosition = (index: number) => {
    const diff = index - currentIndex;
    const total = testimonials.length;

    let normalizedDiff = diff;
    if (diff > total / 2) normalizedDiff = diff - total;
    if (diff < -total / 2) normalizedDiff = diff + total;

    return normalizedDiff;
  };

  return (
    <section ref={sectionRef} id="testimonios" className="py-24 md:py-36 bg-blanco relative overflow-hidden">
      {/* Background Elements - Enhanced green glows */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-96 h-96 bg-verde-lima/25 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.12, 0.2, 0.12] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-20 right-10 w-80 h-80 bg-verde-lima/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.18, 0.1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-verde-lima/15 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-extrabold mb-6 text-negro"
          >
            La voz de nuestros{" "}
            <span className="inline-block bg-verde-lima text-negro rounded-full px-6 py-2">
              clientes
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            Historias de éxito que prueban nuestra metodología.
          </motion.p>
        </div>

        {/* Cards Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative w-full mx-auto mb-16 px-4 md:px-16"
        >
          <div
            className="relative flex items-center justify-center"
            style={{ minHeight: isMobile ? '580px' : '600px' }}
          >
            {testimonials.map((testimonial, index) => {
              const position = getCardPosition(index);
              const isCenter = position === 0;
              const absPosition = Math.abs(position);

              if (isMobile && !isCenter) return null;

              const maxVisible = 1;
              if (!isMobile && absPosition > maxVisible) return null;

              let transformConfig;

              if (isMobile) {
                transformConfig = {
                  x: 0,
                  y: 0,
                  scale: 1,
                  rotateY: 0,
                  z: 0,
                  opacity: 1,
                };
              } else {
                const side = position > 0 ? 1 : -1;
                const offsetX = side * (100 + absPosition * 120);
                const offsetZ = -absPosition * 150;
                const rotateY = side * (15 + absPosition * 8);
                const scale = 1 - absPosition * 0.15;
                const opacity = 1 - absPosition * 0.08;

                transformConfig = {
                  x: isCenter ? 0 : offsetX,
                  y: 0,
                  scale: scale,
                  rotateY: isCenter ? 0 : rotateY,
                  z: isCenter ? 0 : offsetZ,
                  opacity: opacity,
                };
              }

              const zIndex = 50 - absPosition;

              return (
                <motion.div
                  key={index}
                  initial={false}
                  animate={transformConfig}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 30,
                  }}
                  className="absolute cursor-pointer"
                  style={{
                    transformStyle: 'preserve-3d',
                    perspective: '1000px',
                    zIndex: zIndex,
                    left: '50%',
                    top: '50%',
                    marginLeft: isMobile ? '-42.5vw' : '-260px',
                    marginTop: isMobile ? '-240px' : '-260px',
                  }}
                  onClick={() => {
                    if (!isCenter) {
                      setCurrentIndex(index);
                    }
                  }}
                >
                  <div
                    className={cn(
                      "p-6 md:p-10 relative transition-all duration-300 backdrop-blur-sm",
                      "bg-negro rounded-3xl",
                      isMobile ? "w-[85vw] max-w-[500px]" : "w-[520px]",
                      isCenter
                        ? "border-2 !border-verde-lima/50 shadow-[0_25px_80px_-15px_rgba(180,252,5,0.35),0_10px_30px_-10px_rgba(0,0,0,0.15)] ring-2 ring-verde-lima"
                        : "border-2 !border-gray-700 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)]"
                    )}
                    style={{
                      borderColor: isCenter ? 'rgba(180, 252, 5, 0.5)' : undefined,
                    }}
                  >
                    {/* Inner glow effect for active card */}
                    {isCenter && (
                      <div className="absolute inset-0 bg-gradient-to-br from-verde-lima/10 via-transparent to-verde-lima/10 rounded-3xl pointer-events-none" />
                    )}
                    <div className="flex flex-col items-center">
                      {/* Image & Rating */}
                      <div className="flex flex-col items-center mb-6">
                        <div className="relative mb-4">
                          <motion.img
                            whileHover={{ scale: isCenter ? 1.05 : 1 }}
                            src={testimonial.image}
                            alt={`${testimonial.author} - ${testimonial.role} en ${testimonial.company}, cliente de Bizellers`}
                            className={cn(
                              "w-20 h-20 rounded-full object-cover border-4 shadow-lg transition-all",
                              isCenter
                                ? "border-verde-lima ring-4 ring-verde-lima"
                                : "border-gray-600 ring-2 ring-gray-700"
                            )}
                            loading="lazy"
                            width="80"
                            height="80"
                          />
                        </div>

                        {/* Rating Stars */}
                        <div className="flex gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "w-4 h-4 fill-verde-lima text-verde-lima transition-opacity",
                                isCenter ? "opacity-100" : "opacity-80"
                              )}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Quote */}
                      <blockquote className={cn(
                        "text-base md:text-lg mb-6 leading-relaxed text-center font-light italic max-w-xl transition-all",
                        isCenter
                          ? "text-blanco"
                          : "text-gray-300"
                      )}>
                        "{testimonial.quote}"
                      </blockquote>

                      {/* Author Info */}
                      <div className="border-t border-gray-700 pt-4 text-center w-full">
                        <p className={cn(
                          "font-bold text-base transition-all",
                          isCenter
                            ? "text-blanco"
                            : "text-gray-200"
                        )}>
                          {testimonial.author}
                        </p>
                        <p className={cn(
                          "text-sm transition-all mt-1",
                          isCenter
                            ? "text-verde-lima font-semibold"
                            : "text-verde-lima/80"
                        )}>
                          {testimonial.role}
                        </p>
                        <p className={cn(
                          "text-xs font-semibold mt-1 transition-all",
                          isCenter
                            ? "text-gray-400"
                            : "text-gray-500"
                        )}>
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Arrows - Desktop */}
          <motion.button
            initial={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.15, x: -8 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevTestimonial}
            className="hidden md:block absolute left-24 p-5 rounded-full shadow-2xl transition-all duration-300 z-[70] bg-verde-lima hover:bg-verde-lima-dark text-negro border-2 border-verde-lima/30 backdrop-blur-sm hover:shadow-verde-lima/50"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
            aria-label="Testimonio anterior"
          >
            <ChevronLeft className="w-7 h-7" strokeWidth={2.5} />
          </motion.button>

          <motion.button
            initial={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.15, x: 8 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextTestimonial}
            className="hidden md:block absolute right-24 p-5 rounded-full shadow-2xl transition-all duration-300 z-[70] bg-verde-lima hover:bg-verde-lima-dark text-negro border-2 border-verde-lima/30 backdrop-blur-sm hover:shadow-verde-lima/50"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
            aria-label="Siguiente testimonio"
          >
            <ChevronRight className="w-7 h-7" strokeWidth={2.5} />
          </motion.button>

          {/* Navigation Arrows - Mobile */}
          <div className="md:hidden absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-4 z-[70]">
            <motion.button
              initial={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevTestimonial}
              className="p-3 rounded-full shadow-xl transition-all duration-300 bg-verde-lima hover:bg-verde-lima-dark text-negro border-2 border-verde-lima/30 backdrop-blur-sm"
              aria-label="Testimonio anterior"
            >
              <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
            </motion.button>

            <motion.button
              initial={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextTestimonial}
              className="p-3 rounded-full shadow-xl transition-all duration-300 bg-verde-lima hover:bg-verde-lima-dark text-negro border-2 border-verde-lima/30 backdrop-blur-sm"
              aria-label="Siguiente testimonio"
            >
              <ChevronRight className="w-6 h-6" strokeWidth={2.5} />
            </motion.button>
          </div>

          {/* Dots Indicator */}
          <div className="absolute -bottom-8 md:-bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-[60] mt-20 md:mt-0">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                animate={{
                  scale: index === currentIndex ? 1 : 0.8,
                  width: index === currentIndex ? 32 : 8,
                }}
                whileHover={{ scale: index === currentIndex ? 1 : 1.2 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "h-2 rounded-full transition-colors duration-300",
                  index === currentIndex
                    ? "bg-verde-lima"
                    : "bg-gray-400"
                )}
                aria-label={`Ir al testimonio ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.a
            href="#contacto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-verde-lima hover:bg-verde-lima-dark text-negro font-bold shadow-2xl hover:shadow-verde-lima/50 transition-all px-8 py-4 text-lg rounded-full"
          >
            Agenda tu sesión estratégica →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
