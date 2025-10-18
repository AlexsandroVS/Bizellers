import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isDarkBackground, setIsDarkBackground] = useState(true); // Empieza en true porque Hero es oscuro

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Secciones con fondo oscuro (negro)
      const darkSections = ["inicio", "metodologia", "sobre-ruben", "contacto"];

      // Detectar sección activa y si tiene fondo oscuro
      const allSections = ["inicio", "metodologia", "servicios", "sobre-ruben", "testimonios", "faqs", "contacto"];
      let found = false;
      let currentIsDark = isDarkBackground; // Mantener el estado anterior si no encuentra nada

      for (const section of allSections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Usar un rango más amplio para evitar parpadeos
          if (rect.top <= 150 && rect.bottom >= 50) {
            setActiveSection(section);
            currentIsDark = darkSections.includes(section);
            found = true;
            break;
          }
        }
      }

      // Solo actualizar si encontramos una sección válida
      if (found) {
        setIsDarkBackground(currentIsDark);
      }
    };

    handleScroll(); // Ejecutar inmediatamente
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDarkBackground]); // Agregar isDarkBackground como dependencia

  const navItems = [
    { label: "Metodología", href: "#metodologia" },
    { label: "Servicios", href: "#servicios" },
    { label: "Testimonios", href: "#testimonios" },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? (isDarkBackground ? "bg-negro/98 backdrop-blur-xl shadow-[0_4px_20px_rgba(180,252,5,0.1)] border-b border-verde-lima/10" : "bg-blanco shadow-lg")
          : "bg-negro/85 backdrop-blur-md"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo con animación de cambio */}
          <motion.a
            href="#inicio"
            className="relative h-12 w-32"
            whileHover={{
              scale: 1.05,
              filter: "drop-shadow(0 0 8px rgba(180, 252, 5, 0.4))",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {!isScrolled || isDarkBackground ? (
                <motion.img
                  key="logo2"
                  src="/logo2.png"
                  alt="Bizellers - Consultoría de Ventas B2B"
                  className="absolute inset-0 h-full w-full object-contain"
                  initial={{ opacity: 0, y: -10, rotate: -5 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, y: 10, rotate: 5 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  loading="eager"
                  width="128"
                  height="48"
                />
              ) : (
                <motion.img
                  key="logo3"
                  src="/logo3.png"
                  alt="Bizellers - Consultoría de Ventas B2B"
                  className="absolute inset-0 h-full w-full object-contain"
                  initial={{ opacity: 0, y: -10, rotate: -5 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, y: 10, rotate: 5 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  loading="eager"
                  width="128"
                  height="48"
                />
              )}
            </AnimatePresence>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, i) => {
              const isActive = activeSection === item.href.replace("#", "");
              const textColor = isScrolled && !isDarkBackground ? "#121212" : "#ffffff";
              return (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="relative font-medium"
                  style={{ color: textColor }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                  whileHover={{
                    scale: 1.05,
                    textShadow: isDarkBackground
                      ? "0 0 8px rgba(180, 252, 5, 0.5)"
                      : "0 2px 4px rgba(0, 0, 0, 0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-verde-lima rounded-full"
                      layoutId="activeSection"
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.a>
              );
            })}
            <motion.a
              href="#contacto"
              className="bg-verde-lima text-negro px-6 py-2 rounded-lg font-bold relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
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
              <span className="relative z-10">Conversemos</span>
            </motion.a>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden"
            style={{ color: isScrolled && !isDarkBackground ? "#121212" : "#ffffff" }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9, rotate: 90 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={28} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={28} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              className="md:hidden mt-4 pb-4 flex flex-col gap-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navItems.map((item, i) => {
                const textColor = isScrolled && !isDarkBackground ? "#121212" : "#ffffff";
                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className="font-medium"
                    style={{ color: textColor }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                    whileHover={{
                      color: "#b4fc05",
                      x: 5,
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </motion.a>
                );
              })}
              <motion.a
                href="#contacto"
                className="bg-verde-lima text-negro px-6 py-3 rounded-lg font-bold text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(180, 252, 5, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Conversemos
              </motion.a>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
