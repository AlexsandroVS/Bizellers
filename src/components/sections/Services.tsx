import { motion } from "framer-motion";
import { Zap, Compass, Brain, Microscope, Check, Sparkles } from "lucide-react";
import { fadeInUp } from "@/utils/animations";
import { ServiceModal } from "../common/ServiceModal";
import { useState } from "react";

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
    description: "Guía experta en ventas B2B para dirigir y acelerar el crecimiento de tu equipo comercial.",
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

  const handleServiceClick = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsModalOpen(true);
  };

  return (
    <>
      <section id="servicios" className="py-24 bg-gray-100 relative overflow-hidden">
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
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-verde-lima/10 border border-verde-lima/30 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-verde-lima" />
              <span className="text-verde-lima font-bold text-sm">Servicios Especializados</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-negro mb-4">
              Diseñados para{" "}
              <span className="text-verde-lima">acelerar tu crecimiento B2B</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mt-4 font-medium">
              Elige el formato estratégico que mejor se adapta a tu etapa de crecimiento, necesidades y objetivos comerciales.
            </p>
          </motion.div>

          {/* Services Grid - 3 columnas con 4to centrado */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, i) => (
              <motion.div
                key={i}
                className={`relative bg-white border border-gray-200 p-8 rounded-2xl hover:border-verde-lima/50 transition-all duration-300 group overflow-hidden hover:shadow-[0_20px_60px_-15px_rgba(180,252,5,0.25)] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.08)] flex flex-col h-full ${
                  i === 3 ? 'md:col-span-2 lg:col-span-1 lg:col-start-2 md:max-w-md md:mx-auto lg:max-w-none' : ''
                }`}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
              >
                {/* Gradient overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-verde-lima/0 via-verde-lima/0 to-verde-lima/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {service.badge && (
                  <div className="absolute -top-3 right-6 bg-gradient-to-r from-verde-lima to-verde-lima-dark text-negro px-5 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    {service.badge}
                  </div>
                )}

                <div className="relative w-16 h-16 bg-gradient-to-br from-verde-lima/20 to-verde-lima/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-all duration-300">
                  <service.icon className="w-8 h-8 text-verde-lima" />
                </div>

                <h3 className="relative text-2xl font-bold text-negro mb-3 group-hover:text-verde-lima transition-colors duration-300 min-h-[3.5rem] flex items-center">
                  {service.title}
                </h3>
                <p className="relative text-gray-600 leading-relaxed mb-6 text-sm flex-grow">
                  {service.description}
                </p>

                <div className="relative space-y-2.5 mb-6 flex-grow">
                  {service.features.map((feature, j) => (
                    <div key={j} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-verde-lima/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-verde-lima" strokeWidth={2.5} />
                      </div>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  onClick={() => handleServiceClick(service.title)}
                  className="relative block w-full bg-negro text-verde-lima text-center px-6 py-3.5 rounded-xl font-semibold group-hover:bg-verde-lima group-hover:text-negro transition-all duration-300 text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
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
