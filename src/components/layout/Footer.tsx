import { Instagram, Linkedin, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="bg-gray-900 py-12 relative overflow-hidden">
      {/* Green glow effects */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-20 w-80 h-80 bg-verde-lima/15 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-0 right-20 w-72 h-72 bg-verde-lima/12 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo y descripción */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h3
              className="text-2xl font-bold text-verde-lima mb-4 flex items-center gap-2"
              whileHover={{
                textShadow: "0 0 20px rgba(180, 252, 5, 0.6)",
                scale: 1.02,
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>
              BIZELLERS
            </motion.h3>
            <p className="text-gray-100 leading-relaxed">
              En Bizellers transformamos equipos comerciales en motores de crecimiento.
            </p>
          </motion.div>

          {/* Páginas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-bold text-blanco mb-4">Páginas</h4>
            <div className="flex flex-col gap-2">
              <motion.a
                href="#metodologia"
                className="text-gray-100"
                whileHover={{
                  color: "#b4fc05",
                  x: 3,
                }}
                transition={{ duration: 0.2 }}
              >
                Metodología
              </motion.a>
              <motion.a
                href="#servicios"
                className="text-gray-100"
                whileHover={{
                  color: "#b4fc05",
                  x: 3,
                }}
                transition={{ duration: 0.2 }}
              >
                Servicios
              </motion.a>
              <motion.a
                href="#testimonios"
                className="text-gray-100"
                whileHover={{
                  color: "#b4fc05",
                  x: 3,
                }}
                transition={{ duration: 0.2 }}
              >
                Testimonios
              </motion.a>
            </div>
          </motion.div>

          {/* Redes sociales */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-bold text-blanco mb-4">Síguenos</h4>
            <div className="flex gap-4">
              <motion.a
                href="https://instagram.com/bizellers"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-verde-lima/10 flex items-center justify-center text-blanco"
                whileHover={{
                  scale: 1.2,
                  backgroundColor: "rgba(180, 252, 5, 0.2)",
                  color: "#b4fc05",
                  rotate: [0, -10, 10, -10, 0],
                  boxShadow: "0 0 20px rgba(180, 252, 5, 0.4)",
                }}
                transition={{ duration: 0.4 }}
              >
                <Instagram size={24} />
              </motion.a>
              <motion.a
                href="https://linkedin.com/company/bizellers"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-verde-lima/10 flex items-center justify-center text-blanco"
                whileHover={{
                  scale: 1.2,
                  backgroundColor: "rgba(180, 252, 5, 0.2)",
                  color: "#b4fc05",
                  rotate: [0, -10, 10, -10, 0],
                  boxShadow: "0 0 20px rgba(180, 252, 5, 0.4)",
                }}
                transition={{ duration: 0.4 }}
              >
                <Linkedin size={24} />
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.p
            className="text-gray-100 text-sm"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            © 2025 Bizellers. Todos los derechos reservados.
          </motion.p>
          <motion.a
            href="#contacto"
            className="bg-verde-lima text-negro px-6 py-2 rounded-lg font-bold text-sm relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(180, 252, 5, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut"
              }}
            />
            <span className="relative z-10 inline-flex items-center gap-3 group">
              DIAGNÓSTICO GRATUITO
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.a>
        </motion.div>
      </div>
    </footer>
  );
}
