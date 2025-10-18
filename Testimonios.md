import { useState, useMemo, useCallback, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const cn = (...classes) => classes.filter(Boolean).join(' ');

const Testimonios = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const testimonials = useMemo(() => [
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
  ], []);

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const scrollToContact = useCallback(() => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Calcular la posición relativa de cada card respecto al índice actual
  const getCardPosition = (index) => {
    const diff = index - currentIndex;
    const total = testimonials.length;
    
    // Normalizar la diferencia para que esté en el rango [-total/2, total/2]
    let normalizedDiff = diff;
    if (diff > total / 2) normalizedDiff = diff - total;
    if (diff < -total / 2) normalizedDiff = diff + total;
    
    return normalizedDiff;
  };

  return (
    <section id="testimonios" className="py-24 md:py-36 bg-gradient-subtle relative overflow-hidden">
      {/* Background Elements */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-extrabold mb-6 text-foreground"
          >
            La voz de nuestros{" "}
            <span className="text-primary relative inline-block">
              clientes
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground"
          >
            Historias de éxito que prueban nuestra metodología.
          </motion.p>
        </div>

        {/* Cards Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative w-full mx-auto mb-16 px-4"
        >
          <div 
            className="relative flex items-center justify-center" 
            style={{ minHeight: isMobile ? '580px' : '600px' }}
          >
            {testimonials.map((testimonial, index) => {
              const position = getCardPosition(index);
              const isCenter = position === 0;
              const absPosition = Math.abs(position);
              
              // Para móvil: solo mostrar la card actual
              if (isMobile && !isCenter) return null;

              // Para desktop: mostrar hasta 1 card a cada lado (3 en total)
              const maxVisible = 1;
              if (!isMobile && absPosition > maxVisible) return null;

              // Configuración de transformaciones 3D
              let transformConfig;
              
              if (isMobile) {
                // Móvil: card centrada simple
                transformConfig = {
                  x: 0,
                  y: 0,
                  scale: 1,
                  rotateY: 0,
                  z: 0,
                  opacity: 1,
                };
              } else {
                // Desktop: efecto 3D simétrico
                const side = position > 0 ? 1 : -1; // 1 = derecha, -1 = izquierda
                const offsetX = side * (100 + absPosition * 120); // Separación horizontal reducida
                const offsetZ = -absPosition * 150; // Profundidad
                const rotateY = side * (15 + absPosition * 8); // Rotación
                const scale = 1 - absPosition * 0.15; // Escala
                const opacity = 1 - absPosition * 0.08; // Opacidad reducida para más nitidez
                
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
                  <Card
                    className={cn(
                      "p-6 md:p-10 relative transition-all duration-300",
                      "bg-gradient-subtle border-2 rounded-3xl",
                      isMobile ? "w-[85vw] max-w-[500px]" : "w-[520px]",
                      isCenter
                        ? "border-primary/30 shadow-glow"
                        : "border-primary/20 shadow-strong"
                    )}
                  >
                    <div className="flex flex-col items-center">
                      {/* Image & Rating */}
                      <div className="flex flex-col items-center mb-6">
                        <div className="relative mb-4">
                          <motion.img
                            whileHover={{ scale: isCenter ? 1.05 : 1 }}
                            src={testimonial.image}
                            alt={testimonial.author}
                            className={cn(
                              "w-20 h-20 rounded-full object-cover border-4 shadow-lg transition-all",
                              isCenter
                                ? "border-primary/50 ring-4 ring-primary/20"
                                : "border-primary/30 ring-2 ring-primary/10"
                            )}
                          />
                        </div>

                        {/* Rating Stars */}
                        <div className="flex gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "w-4 h-4 fill-secondary text-secondary transition-opacity",
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
                          ? "text-foreground" 
                          : "text-card-foreground/80"
                      )}>
                        "{testimonial.quote}"
                      </blockquote>

                      {/* Author Info */}
                      <div className="border-t border-border/70 pt-4 text-center w-full">
                        <p className={cn(
                          "font-bold text-base transition-all",
                          isCenter 
                            ? "text-foreground" 
                            : "text-foreground/80"
                        )}>
                          {testimonial.author}
                        </p>
                        <p className={cn(
                          "text-sm transition-all mt-1",
                          isCenter 
                            ? "text-primary" 
                            : "text-primary/80"
                        )}>
                          {testimonial.role}
                        </p>
                        <p className={cn(
                          "text-xs font-semibold mt-1 transition-all",
                          isCenter 
                            ? "text-muted-foreground" 
                            : "text-muted-foreground/70"
                        )}>
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Arrows - Desktop (a los lados) */}
          <motion.button
            whileHover={{ scale: 1.15, x: -8 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevTestimonial}
            className="hidden md:block absolute left-8 top-1/2 -translate-y-1/2 p-5 rounded-full shadow-2xl transition-all duration-300 z-[70] bg-primary hover:bg-primary-hover text-primary-foreground border-2 border-primary/30 backdrop-blur-sm hover:shadow-primary/50"
            aria-label="Testimonio anterior"
          >
            <ChevronLeft className="w-7 h-7" strokeWidth={2.5} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.15, x: 8 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextTestimonial}
            className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2 p-5 rounded-full shadow-2xl transition-all duration-300 z-[70] bg-primary hover:bg-primary-hover text-primary-foreground border-2 border-primary/30 backdrop-blur-sm hover:shadow-primary/50"
            aria-label="Siguiente testimonio"
          >
            <ChevronRight className="w-7 h-7" strokeWidth={2.5} />
          </motion.button>

          {/* Navigation Arrows - Mobile (abajo de la card) */}
          <div className="md:hidden absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-4 z-[70]">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevTestimonial}
              className="p-3 rounded-full shadow-xl transition-all duration-300 bg-primary hover:bg-primary-hover text-primary-foreground border-2 border-primary/30 backdrop-blur-sm"
              aria-label="Testimonio anterior"
            >
              <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextTestimonial}
              className="p-3 rounded-full shadow-xl transition-all duration-300 bg-primary hover:bg-primary-hover text-primary-foreground border-2 border-primary/30 backdrop-blur-sm"
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
                    ? "bg-primary" 
                    : "bg-muted-foreground/30"
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
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-12"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={scrollToContact}
              size="lg"
              className="group bg-primary hover:bg-secondary-hover text-secondary-foreground font-bold shadow-glow hover:shadow-glow/80 transition-all px-8 py-6 text-lg rounded-full"
            >
              <span className="flex items-center gap-2">
                Agenda tu sesión estratégica
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonios;