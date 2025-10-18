import { motion } from "framer-motion";
import { Building2, TrendingUp, Users, Wrench, ChevronDown } from "lucide-react";
import { useState } from "react";
import { fadeInUp } from "@/utils/animations";

const faqs = [
  {
    icon: Building2,
    question: "¿Qué tipo de empresas trabajan con Bizellers?",
    answer: "Trabajamos principalmente con startups, scaleups y empresas B2B en fase de crecimiento acelerado con enfoque en ventas consultivas y estratégicas. Nuestros clientes típicamente están en fase de tracción o expansión rápida, y buscan estructurar y profesionalizar sus procesos comerciales para escalar de manera predecible y sostenible.",
  },
  {
    icon: TrendingUp,
    question: "¿Qué retorno de inversión puedo esperar?",
    answer: "El ROI depende de tu ciclo comercial actual, pero todos nuestros proyectos se enfocan en resultados medibles y tangibles: incremento significativo en tasas de conversión, reducción del ciclo de venta, mejora notable en forecasting y escalabilidad real del equipo comercial. Diseñamos KPIs específicos y personalizados para cada proyecto, con seguimiento continuo de resultados.",
  },
  {
    icon: Users,
    question: "¿Puedo incluir a mi equipo completo en las sesiones?",
    answer: "Absolutamente sí, todos nuestros programas admiten y fomentan la participación grupal de tu equipo. De hecho, es altamente recomendable para asegurar la correcta implementación, alineación estratégica y adopción efectiva por parte de todo el equipo comercial. La transformación es más efectiva cuando todos participan activamente.",
  },
  {
    icon: Wrench,
    question: "¿Implementan CRM o solo brindan asesoría?",
    answer: "Asesoramos, diseñamos y acompañamos en la implementación completa de sistemas CRM. Además, ofrecemos soporte técnico especializado opcional para configuración avanzada, personalización y optimización de herramientas como HubSpot, Pipedrive, Salesforce u otras plataformas según las necesidades específicas de tu negocio.",
  },
];

export function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faqs" className="py-24 bg-negro">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            className="inline-block bg-verde-lima-muted border border-verde-lima/30 rounded-full px-4 py-2 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-verde-lima font-bold text-sm">Preguntas Frecuentes</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold text-blanco mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Resolvemos tus <span className="text-verde-lima">dudas</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-100 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Encuentra respuestas claras a las consultas más comunes sobre nuestros servicios
          </motion.p>
        </div>

        {/* FAQs List */}
        <div className="max-w-4xl mx-auto space-y-4 mb-12">
          {faqs.map((faq, i) => (
            <FAQ
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="#contacto"
            className="inline-block bg-verde-lima text-negro px-8 py-4 rounded-lg font-bold text-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(180, 252, 5, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            Aún tengo dudas — conversemos →
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
}

function FAQ({ faq, index, isOpen, onClick }: FAQProps) {
  const Icon = faq.icon;

  return (
    <motion.div
      className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden hover:border-verde-lima transition-all duration-300"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <button
        className="w-full flex items-center justify-between p-6 text-left"
        onClick={onClick}
      >
        <div className="flex items-center gap-4 flex-1">
          <div className="w-12 h-12 bg-verde-lima-muted rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon className="w-6 h-6 text-verde-lima" />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-blanco pr-4">{faq.question}</h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
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
          <p className="text-gray-100 leading-relaxed">{faq.answer}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
