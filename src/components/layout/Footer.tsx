import { Mail, Instagram, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="bg-gray-900 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo y descripción */}
          <div>
            <h3 className="text-2xl font-bold text-verde-lima mb-4">BIZELLERS</h3>
            <p className="text-gray-100">
              En Bizellers transformamos equipos comerciales en motores de crecimiento.
            </p>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-lg font-bold text-blanco mb-4">Contacto</h4>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:contacto@bizellers.com"
                className="text-gray-100 hover:text-verde-lima transition-colors flex items-center gap-2"
              >
                <Mail size={18} />
                contacto@bizellers.com
              </a>
              <a
                href="https://www.bizellers.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-100 hover:text-verde-lima transition-colors"
              >
                www.bizellers.com
              </a>
            </div>
          </div>

          {/* Redes sociales */}
          <div>
            <h4 className="text-lg font-bold text-blanco mb-4">Síguenos</h4>
            <div className="flex gap-4">
              <motion.a
                href="https://instagram.com/bizellers"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blanco hover:text-verde-lima transition-colors"
                whileHover={{ scale: 1.2 }}
              >
                <Instagram size={24} />
              </motion.a>
              <motion.a
                href="https://linkedin.com/company/bizellers"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blanco hover:text-verde-lima transition-colors"
                whileHover={{ scale: 1.2 }}
              >
                <Linkedin size={24} />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-100 text-sm">
            © 2025 Bizellers. Todos los derechos reservados.
          </p>
          <motion.a
            href="#contacto"
            className="bg-verde-lima text-negro px-6 py-2 rounded-lg font-bold text-sm"
            whileHover={{ scale: 1.05 }}
          >
            Hablemos de tu crecimiento
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
