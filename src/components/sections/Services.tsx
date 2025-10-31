import { motion } from "framer-motion";
import { Zap, Compass, Brain, Microscope, Sparkles, Check } from "lucide-react";
import { slideUpScale } from "@/utils/animations";
import { ServiceModal } from "../common/ServiceModal";
import { useState, useRef } from "react";
import { useScrollInView } from "@/hooks/useScrollInView";

const services = [
  {
    icon: Zap,
    title: "Sales Power Session",
    description: "Sesión 1:1 para identificar bloqueos, afinar estrategia y obtener pasos accionables inmediatos.",
    features: [
      "1 hora vía Google Meet",
      "Diagnóstico express",
      "Plan de acción claro",
      "Grabación y checklist",
    ],
    cta: "Agendar mi sesión",
  },
  {
    icon: Compass,
    title: "Growth Sales Blueprint",
    description: "Estructuramos tu sistema de ventas completo en 3 meses: estrategia, procesos y ejecución optimizada.",
    features: [
      "Diagnóstico 360° completo",
      "Diseño + implementación",
      "Playbooks + training",
      "Seguimiento semanal",
    ],
    cta: "Solicitar Blueprint",
    badge: "MÁS POPULAR",
  },
  {
    icon: Brain,
    title: "Fractional Growth Leadership",
    description: "Accede a la guía de un experto en ventas B2B para dirigir y hacer crecer tu equipo.",
    features: [
      "Mín. 16 horas/mes",
      "Dirección estratégica",
      "Seguimiento de KPIs",
      "Reuniones semanales",
    ],
    cta: "Conoce el servicio",
  },
  {
    icon: Microscope,
    title: "Sales Lab",
    description: "Entrenamiento práctico para dominar prospección, negociación y cierre con técnicas comprobadas.",
    features: [
      "Virtual o presencial",
      "Playbooks + templates",
      "Feedback individual",
      "Certificación incluida",
    ],
    cta: "Entrena a tu equipo",
  },
];

export function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const ref = useRef<HTMLElement>(null);
  const { hasBeenInView } = useScrollInView(ref, 0.2);

  const handleServiceClick = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsModalOpen(true);
  };

  return (
    <>
      <section ref={ref} id="servicios" className="py-24 bg-gray-100 relative overflow-hidden">
        {/* Green glow effects */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 -left-40 w-96 h-96 bg-verde-lima/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.2, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-20 -right-40 w-96 h-96 bg-verde-lima/20 rounded-full blur-3xl"
        />
        <div className="container mx-auto px-6 relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-negro border border-verde-lima/30 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-verde-lima" />
              <span className="text-verde-lima font-bold text-sm">Servicios Especializados</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-negro mb-4">
              Diseñados para acelerar tu{" "}
              <span className="inline-block bg-verde-lima text-negro rounded-full px-4 py-1 sm:px-6 sm:py-2">crecimiento B2B</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mt-4 font-medium">
              Elige el servicio que mejor se adapta a tu etapa de crecimiento, necesidades y objetivos comerciales.
            </p>
          </motion.div>

          {/* Services Grid - 4 columnas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {services.map((service, i) => (
              <motion.div
                key={i}
                className="relative bg-white border-2 p-8 rounded-2xl group overflow-hidden flex flex-col h-full"
                style={{
                  borderColor: "#e5e7eb",
                  boxShadow: "0 4px 20px -2px rgba(0,0,0,0.08)"
                }}
                initial={{ opacity: 0, y: 60 }}
                animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                transition={{
                  delay: hasBeenInView ? i * 0.08 : 0,
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileHover={{
                  y: -10,
                  borderColor: "rgba(180, 252, 5, 0.5)",
                  boxShadow: "0 20px 60px -15px rgba(180, 252, 5, 0.25)",
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                {/* Gradient overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-verde-lima/0 via-verde-lima/0 to-verde-lima/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {service.badge && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-verde-lima to-verde-lima-dark text-negro px-5 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    {service.badge}
                  </div>
                )}

                <motion.div
                  className="relative w-16 h-16 bg-negro rounded-xl flex items-center justify-center mb-6"
                  whileHover={{
                    scale: 1.15,
                    rotate: [0, -5, 5, -5, 0],
                    backgroundColor: "#2a2a2a",
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    animate={{
                      y: [0, -3, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  >
                    <service.icon className="w-8 h-8 text-verde-lima" />
                  </motion.div>
                </motion.div>

                <motion.h3
                  className="relative text-2xl font-bold text-negro mb-4 text-left"
                  whileHover={{
                    color: "#b4fc05",
                    x: 3,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {service.title}
                </motion.h3>
                <p className="relative text-gray-600 leading-relaxed mb-6 text-base text-left flex-grow">
                  {service.description}
                </p>

                <div className="relative space-y-3 mb-6 flex-grow">
                  {service.features.map((feature, j) => (
                    <motion.div
                      key={j}
                      className="text-left flex items-start gap-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{
                        delay: hasBeenInView ? i * 0.08 + j * 0.05 : 0,
                        duration: 0.5,
                      }}
                    >
                      <Check className="w-5 h-5 text-negro flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-base">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  onClick={() => handleServiceClick(service.title)}
                  className="relative block w-full bg-negro text-verde-lima text-center px-6 py-4 rounded-xl font-semibold text-base"
                  style={{
                    backgroundColor: "#1a1a1a",
                    color: "#b4fc05",
                  }}
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: "#b4fc05",
                    color: "#1a1a1a",
                    boxShadow: "0 0 20px rgba(180, 252, 5, 0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  {service.cta} →
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName={selectedService}
      />
    </>
  );
}
