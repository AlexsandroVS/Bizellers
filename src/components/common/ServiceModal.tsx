import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, Building, Mail, Phone, MessageSquare, Sparkles, CheckCircle } from "lucide-react";
import { useState, useEffect, type FormEvent } from "react";
import { latinAmericanCountriesData } from '@/data/countries';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
}

export function ServiceModal({ isOpen, onClose, serviceName }: ServiceModalProps) {
  const [phoneCountryCode, setPhoneCountryCode] = useState("+51");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phonePlaceholder, setPhonePlaceholder] = useState("987 654 321");
  const [formData, setFormData] = useState({
    name: "",
    cargo: "",
    empresa: "",
    email: "",
    message: "",
    service: serviceName,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    setFormData((prev) => ({ ...prev, service: serviceName }));
  }, [serviceName]);

  useEffect(() => {
    const country = latinAmericanCountriesData.find(c => c.dial_code === phoneCountryCode);
    if (country) {
      setPhonePlaceholder(country.placeholder);
    }
  }, [phoneCountryCode]);

  const handleEmailChange = (value: string) => {
    setFormData({ ...formData, email: value });

    if (value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setEmailError("Por favor ingresa un correo electrónico válido.");
      } else {
        setEmailError("");
      }
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setEmailError("Por favor ingresa un correo electrónico válido.");
      return;
    }

    const fullPhoneNumber = `${phoneCountryCode}${phoneNumber}`;
    if (phoneNumber && !/^\d{7,15}$/.test(phoneNumber)) {
      setPhoneError("Por favor ingresa un número de teléfono válido.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, phone: fullPhoneNumber }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setTimeout(() => {
          onClose();
          setFormData({
            name: "",
            cargo: "",
            empresa: "",
            email: "",
            message: "",
            service: serviceName,
          });
          setPhoneNumber("");
          setPhoneCountryCode("+51");
        }, 2000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCountry = latinAmericanCountriesData.find(c => c.dial_code === phoneCountryCode);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-[#121212]/97 backdrop-blur-xl z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-verde-lima/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.15, 0.1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-verde-lima/15 rounded-full blur-3xl"
            />
          </motion.div>

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none overflow-y-auto">
            <motion.div
              className="bg-gradient-to-br from-blanco to-gray-50 rounded-3xl shadow-[0_30px_100px_-15px_rgba(0,0,0,0.5),0_0_50px_rgba(180,252,5,0.2)] max-w-2xl w-full border-2 border-verde-lima/20 pointer-events-auto my-8 max-h-[90vh] flex flex-col"
              initial={{ scale: 0.8, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-verde-lima via-verde-lima-dark to-verde-lima px-6 py-5 rounded-t-3xl flex justify-between items-center shadow-lg flex-shrink-0">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-1.5 bg-[#121212]/10 rounded-full px-2.5 py-1 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-negro" />
                    <span className="text-xs font-bold text-negro">SOLICITUD</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-negro">{serviceName}</h3>
                </div>
                <motion.button
                  onClick={onClose}
                  className="text-negro hover:bg-[#121212]/10 p-2 rounded-full transition-all"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={24} strokeWidth={2.5} />
                </motion.button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5 bg-white/50 backdrop-blur-sm overflow-y-auto flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="flex items-center gap-2 text-negro font-bold mb-2 text-sm">
                      <User className="w-4 h-4 text-verde-lima" />
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nombre completo"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-verde-lima focus:ring-2 text-black focus:ring-verde-lima focus:outline-none transition-all bg-white shadow-sm hover:shadow-md"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-negro font-bold mb-2 text-sm">
                      <User className="w-4 h-4 text-verde-lima" />
                      Cargo *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.cargo}
                      onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                      placeholder="CEO, Director de Ventas, etc."
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-verde-lima focus:ring-2 text-black focus:ring-verde-lima focus:outline-none transition-all bg-white shadow-sm hover:shadow-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-negro font-bold mb-2 text-sm">
                    <Building className="w-4 h-4 text-verde-lima" />
                    Empresa *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.empresa}
                    onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                    placeholder="Nombre de tu empresa"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-verde-lima focus:ring-2 text-black focus:ring-verde-lima focus:outline-none transition-all bg-white shadow-sm hover:shadow-md"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="flex items-center gap-2 text-negro font-bold mb-2 text-sm">
                      <Mail className="w-4 h-4 text-verde-lima" />
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleEmailChange(e.target.value)}
                      placeholder="Correo electrónico"
                      className={`w-full px-4 py-3 border-2 ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:border-verde-lima focus:ring-2 text-black focus:ring-verde-lima focus:outline-none transition-all bg-white shadow-sm hover:shadow-md`}
                    />
                    {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-negro font-bold mb-2 text-sm">
                      <Phone className="w-4 h-4 text-verde-lima" />
                      Teléfono
                    </label>
                    <div className="flex items-center">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span>{selectedCountry?.flag}</span>
                        </div>
                        <select
                          value={phoneCountryCode}
                          onChange={(e) => setPhoneCountryCode(e.target.value)}
                          className="appearance-none w-28 bg-white border-2 border-gray-300 rounded-l-xl py-3 pl-8 pr-8 text-black focus:outline-none focus:border-verde-lima focus:ring-2 focus:ring-verde-lima transition-all shadow-sm hover:shadow-md"
                        >
                          {latinAmericanCountriesData.map((country) => (
                            <option key={country.code} value={country.dial_code}>
                              {country.dial_code}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                           <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                      </div>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder={phonePlaceholder}
                        className={`w-full px-4 py-3 border-y-2 border-r-2 ${phoneError ? 'border-red-500' : 'border-gray-300'} rounded-r-xl focus:border-verde-lima focus:ring-2 text-black focus:ring-verde-lima focus:outline-none transition-all bg-white shadow-sm hover:shadow-md`}
                      />
                    </div>
                    {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-negro font-bold mb-2 text-sm">
                    <MessageSquare className="w-4 h-4 text-verde-lima" />
                    Mensaje (opcional)
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Cuéntanos más sobre tu situación..."
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-verde-lima focus:ring-2 text-black focus:ring-verde-lima focus:outline-none transition-all resize-none bg-white shadow-sm hover:shadow-md"
                  />
                </div>

                {submitStatus === "success" && (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-verde-lima/20 border-2 border-verde-lima rounded-xl p-5 text-center flex items-center justify-center gap-3"
                  >
                    <CheckCircle className="w-6 h-6 text-verde-lima" />
                    <p className="text-negro font-bold text-lg">¡Solicitud enviada! Nos contactaremos pronto.</p>
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-red-50 border-2 border-red-500 rounded-xl p-5 text-center"
                  >
                    <p className="text-red-700 font-bold">Error al enviar. Intenta nuevamente.</p>
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-verde-lima to-verde-lima-dark text-negro px-8 py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:shadow-[0_10px_40px_rgba(180,252,5,0.4)] transition-all disabled:opacity-50 shadow-lg"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02, y: -2 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
                  <Send className="w-5 h-5" />
                </motion.button>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}