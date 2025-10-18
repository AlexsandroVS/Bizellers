import { motion } from "framer-motion";
import { Star, Quote, Sparkles } from "lucide-react";
import { fadeInUp } from "@/utils/animations";

const testimonials = [
  {
    quote: "Pasamos de no tener procesos claros a cerrar deals de manera consistente cada semana. El impacto fue inmediato y completamente sostenible.",
    author: "Carlos Mendoza",
    role: "CEO",
    company: "TechSaaS Perú",
    rating: 5,
  },
  {
    quote: "Logramos previsibilidad real en nuestras ventas y claridad absoluta en los indicadores clave del negocio.",
    author: "Ana Rodríguez",
    role: "Co-Founder",
    company: "ScaleUp México",
    rating: 5,
  },
  {
    quote: "Rubén entiende perfectamente cómo escalar equipos comerciales sin perder la esencia y cultura de ventas.",
    author: "Diego Silva",
    role: "Head of Sales",
    company: "GrowthCo Chile",
    rating: 5,
  },
  {
    quote: "La estructura estratégica que implementamos nos permitió duplicar exitosamente nuestro pipeline en solo 4 meses.",
    author: "María González",
    role: "VP Sales",
    company: "InnovateTech Argentina",
    rating: 5,
  },
  {
    quote: "El entrenamiento intensivo transformó completamente a nuestro equipo de ventas B2B en resultados y mentalidad.",
    author: "Luis Fernández",
    role: "Founder",
    company: "B2B Solutions Colombia",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section id="testimonios" className="py-24 bg-negro relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(180, 252, 5, 0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

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
            <span className="text-verde-lima font-bold text-sm">Testimonios</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-blanco mb-4">
            La voz de nuestros <span className="text-verde-lima">clientes</span>
          </h2>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            Historias de éxito que prueban nuestra metodología
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              className="bg-gray-800 border border-gray-700 p-6 rounded-2xl hover:border-verde-lima transition-all duration-300 hover:shadow-2xl hover:shadow-verde-lima/10 group"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <Quote className="w-10 h-10 text-verde-lima/40 group-hover:text-verde-lima/60 transition-colors" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-verde-lima text-verde-lima" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-100 leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="border-t border-gray-700 pt-4">
                <p className="font-bold text-blanco">{testimonial.author}</p>
                <p className="text-sm text-gray-100">{testimonial.role}</p>
                <p className="text-sm text-verde-lima font-bold">{testimonial.company}</p>
              </div>
            </motion.div>
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
            className="inline-block bg-verde-lima text-negro px-10 py-4 rounded-lg font-bold text-lg shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(180, 252, 5, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            Agenda tu sesión estratégica →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
