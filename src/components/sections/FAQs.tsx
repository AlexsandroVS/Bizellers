import { motion } from "framer-motion";
import { Building2, TrendingUp, Users, Wrench, ChevronDown, ArrowRight } from "lucide-react";
import { useState, useRef } from "react";
import { slideUpScale } from "@/utils/animations";
import { useScrollInView } from "@/hooks/useScrollInView";

const faqs = [
  {
    icon: Building2,
    question: "¿Cuál es el perfil de empresas con las que colabora Bizellers?",
    answer: "Nuestro enfoque está dirigido a startups tecnológicas, scaleups y empresas B2B en fase de crecimiento acelerado que requieren estructurar y profesionalizar sus procesos comerciales. Colaboramos con organizaciones que típicamente se encuentran en fase de tracción o expansión internacional, con ventas consultivas complejas y ciclos de venta B2B que demandan metodologías especializadas para escalar de manera predecible y sostenible.",
  },
  {
    icon: TrendingUp,
    question: "¿Qué resultados medibles puedo esperar de la consultoría?",
    answer: "Si bien el ROI específico depende de las variables de tu ciclo comercial actual, nuestros proyectos están diseñados para generar resultados cuantificables: incremento mensurable en tasas de conversión, optimización del ciclo de venta, mejora sustancial en la precisión del forecasting comercial y escalabilidad comprobada del equipo. Establecemos indicadores clave de desempeño (KPIs) personalizados para cada engagement, con seguimiento sistemático y reportes de avance continuos.",
  },
  {
    icon: Users,
    question: "¿La capacitación incluye la participación de todo el equipo comercial?",
    answer: "Nuestra metodología está diseñada para incluir y potenciar la participación colaborativa de todo el equipo comercial. De hecho, promovemos activamente la participación grupal, ya que garantiza una implementación consistente, alineación estratégica y adopción efectiva de las mejores prácticas. La transformación organizacional es significativamente más efectiva cuando involucra a todos los stakeholders del área comercial desde el inicio del proceso.",
  },
  {
    icon: Wrench,
    question: "¿El servicio incluye implementación de CRM o únicamente consultoría estratégica?",
    answer: "Nuestro servicio abarca consultoría estratégica, arquitectura de soluciones y acompañamiento integral en la implementación de sistemas CRM. Adicionalmente, proporcionamos soporte técnico especializado para configuración avanzada, personalización de flujos de trabajo y optimización continua de plataformas como HubSpot, Pipedrive, Salesforce u otras herramientas tecnológicas, adaptadas específicamente a los requerimientos y objetivos estratégicos de tu organización.",
  },
];

export function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);
  const { isInView } = useScrollInView(ref, 0.2);

  return (
    <section ref={ref} id="faqs" className="py-24 bg-blanco relative overflow-hidden">
      {/* Green glow effects */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-10 w-96 h-96 bg-verde-lima/25 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.18, 0.1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute bottom-40 left-10 w-80 h-80 bg-verde-lima/20 rounded-full blur-3xl"
      />
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            className="inline-block bg-negro border border-verde-lima/30 rounded-full px-4 py-2 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-verde-lima font-bold text-sm">Preguntas Frecuentes</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold text-negro mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            Resolvemos tus <span className="text-verde-lima decoration-clone">dudas</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-700 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Encuentra respuestas claras a las consultas más comunes sobre nuestros servicios
          </motion.p>
        </div>

        {/* FAQs List */}
        <div className="max-w-4xl mx-auto space-y-4 mb-12">
          {faqs.map((faq, i) => (
            <FAQ
              key={`${i}-${isInView}`}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              isInView={isInView}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <motion.a
            href="#contacto"
            className="inline-flex items-center gap-3 bg-verde-lima text-negro px-8 py-4 rounded-lg font-bold text-lg group"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(180, 252, 5, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            DIAGNÓSTICO GRATUITO
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

interface FAQProps {
  faq: typeof faqs[0];
  index: number;
  isOpen: boolean;
  onClick: () => void;
  isInView: boolean;
}

function FAQ({ faq, index, isOpen, onClick, isInView }: FAQProps) {
  const Icon = faq.icon;

  return (
    <motion.div
      className="bg-white border-2 rounded-2xl overflow-hidden group"
      style={{
        borderColor: "#e5e7eb",
        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)"
      }}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{
        delay: isInView ? index * 0.08 : 0,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -6,
        borderColor: "rgba(180, 252, 5, 0.3)",
        boxShadow: "0 20px 50px -12px rgba(180, 252, 5, 0.15)",
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      <button
        className={`w-full px-6 py-6 flex items-center justify-between cursor-pointer group ${
          isOpen ? "bg-verde-lima/5" : ""
        }`}
        style={{
          backgroundColor: isOpen ? "rgba(180, 252, 5, 0.05)" : "transparent"
        }}
        onClick={onClick}
      >
        <div className="flex items-start gap-4 flex-1">
          <motion.div
            className="w-12 h-12 rounded-xl bg-verde-lima/10 flex items-center justify-center flex-shrink-0"
            whileHover={{
              scale: 1.1,
              backgroundColor: "rgba(180, 252, 5, 0.2)",
              rotate: [0, -5, 5, -5, 0],
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={isOpen ? { scale: 1.1, rotate: 15 } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Icon className="w-6 h-6 text-verde-lima" />
            </motion.div>
          </motion.div>
          <motion.h3
            className="text-lg font-bold text-negro flex-1 text-left"
            whileHover={{
              color: "#b4fc05",
              x: 3,
            }}
            transition={{ duration: 0.2 }}
          >
            {faq.question}
          </motion.h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
          whileHover={{ scale: 1.2 }}
        >
          <ChevronDown className="w-6 h-6 text-verde-lima" />
        </motion.div>
      </button>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6 pl-22">
          <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
