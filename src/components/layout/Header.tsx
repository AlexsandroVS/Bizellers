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
      let currentIsDark = true; // Default por si no encuentra ninguna
      
      for (const section of allSections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            currentIsDark = darkSections.includes(section);
            break;
          }
        }
      }
      
      setIsDarkBackground(currentIsDark);
    };
    
    handleScroll(); // Ejecutar inmediatamente
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Metodología", href: "#metodologia" },
    { label: "Servicios", href: "#servicios" },
    { label: "Testimonios", href: "#testimonios" },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? (isDarkBackground ? "bg-negro/95 shadow-[0_4px_20px_rgba(180,252,5,0.1)]" : "bg-blanco shadow-lg") 
          : "bg-negro/80 backdrop-blur-sm"
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
            whileHover={{ scale: 1.05 }}
          >
            <AnimatePresence mode="wait">
              {!isScrolled || isDarkBackground ? (
                <motion.img
                  key="logo2"
                  src="/logo2.png"
                  alt="Bizellers"
                  className="absolute inset-0 h-full w-full object-contain"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                />
              ) : (
                <motion.img
                  key="logo3"
                  src="/logo3.png"
                  alt="Bizellers"
                  className="absolute inset-0 h-full w-full object-contain"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </AnimatePresence>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className={`relative font-medium transition-colors duration-300 ${
                    isScrolled && !isDarkBackground ? "text-negro" : "text-blanco"
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-verde-lima"
                      layoutId="activeSection"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.a>
              );
            })}
            <motion.a
              href="#contacto"
              className="bg-verde-lima text-negro px-6 py-2 rounded-lg font-bold"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(180, 252, 5, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              Conversemos
            </motion.a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden ${isScrolled && !isDarkBackground ? "text-negro" : "text-blanco"}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              className="md:hidden mt-4 pb-4 flex flex-col gap-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`font-medium transition-colors duration-300 ${
                    isScrolled && !isDarkBackground ? "text-negro hover:text-verde-lima" : "text-blanco hover:text-verde-lima"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contacto"
                className="bg-verde-lima text-negro px-6 py-3 rounded-lg font-bold text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Conversemos
              </a>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
