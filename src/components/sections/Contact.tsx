import { motion } from "framer-motion";
import { UserCheck, ClipboardList, ShieldCheck, User as UserIcon, MessageSquare, Mail, Phone, Send, Sparkles, Building2, AlertCircle } from "lucide-react";
import { useState, useRef, type FormEvent, useEffect } from "react";
import { latinAmericanCountriesData } from '@/data/countries';
import { useScrollInView } from "@/hooks/useScrollInView";
import { GreenParticles } from "@/components/common/GreenParticles";
import { CountrySelectWithFlagAndName } from '../common/CountrySelectWithFlagAndName';

export function Contact() {
  const [phoneCountryCode, setPhoneCountryCode] = useState("+51");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phonePlaceholder, setPhonePlaceholder] = useState("987 654 321");
  const [formData, setFormData] = useState({
    name: "",
    empresa: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const sectionRef = useRef<HTMLElement>(null);
  const { hasBeenInView } = useScrollInView(sectionRef, 0.2);

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
    setPhoneError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          phone: fullPhoneNumber,
          cargo: "Lead",
          servicio: "Contacto General"
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", empresa: "", email: "", message: "" });
        setPhoneNumber("");
        setPhoneCountryCode("+51");
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
    <section ref={sectionRef} id="contacto" className="py-24 bg-negro relative overflow-hidden">
      {/* Partículas verdes */}
      <GreenParticles count={35} minSize={2} maxSize={6} />

      {/* Green glow effects for dark background - MÁS INTENSOS */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-20 w-96 h-96 bg-verde-lima/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-20 right-20 w-80 h-80 bg-verde-lima/25 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-verde-lima/20 rounded-full blur-3xl"
      />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - CTA */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-verde-lima/10 border border-verde-lima rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-verde-lima" />
                <span className="text-verde-lima font-bold text-sm">Solicita un Diagnóstico Gratuito</span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blanco mb-6 leading-tight sm:leading-normal">
                Da el primer paso para{" "}<span className="text-verde-lima">escalar</span>
                <span className="relative inline-block">
                  <span className="text-verde-lima">tus ventas</span>
                  <div className="absolute -bottom-2 left-0 right-0 h-1.5 bg-verde-lima/50 rounded-full" />
                </span>
              </h2>

              <p className="text-xl text-gray-100 mb-8">
                Identifica las oportunidades clave del <span className="font-bold text-verde-lima">crecimiento de tu empresa </span> y recibe un plan de acción personalizado.
              </p>

              <div className="space-y-1 mb-8">
                {[
                  { icon: UserCheck, title: "Diagnóstico personalizado" },
                  { icon: ClipboardList, title: "Plan de acción claro" },
                  { icon: ShieldCheck, title: "100% gratis y sin compromiso" },
                ].map((benefit, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  >
                    <div className="w-12 h-12 bg-verde-lima/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-verde-lima" />
                    </div>
                    <h3 className="font-bold text-blanco text-lg">{benefit.title}</h3>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Side - Form */}
            <motion.div
              className="bg-gray-900/50 backdrop-blur-sm border-2 border-verde-lima rounded-2xl p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3),0_0_40px_rgba(180,252,5,0.2)]"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ boxShadow: "0 25px 70px -15px rgba(0,0,0,0.4), 0 0 50px rgba(180,252,5,0.25)" }}
            >
              <h3 className="text-2xl font-bold text-blanco mb-6">
                Agenda tu sesión ahora
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="flex items-center gap-2 text-blanco font-semibold mb-2 text-sm">
                      <UserIcon className="w-4 h-4 text-verde-lima" />
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nombre y Apellido"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-verde-lima rounded-lg focus:border-verde-lima focus:outline-none focus:ring-2 focus:ring-verde-lima transition-all bg-gray-800/50 text-black placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-blanco font-semibold mb-2 text-sm">
                      <Building2 className="w-4 h-4 text-verde-lima" />
                      Empresa *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.empresa}
                      onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                      placeholder="Nombre de tu empresa"
                      className="w-full px-4 py-3 border border-verde-lima rounded-lg focus:border-verde-lima focus:outline-none focus:ring-2 focus:ring-verde-lima transition-all bg-gray-800/50 text-black placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-blanco font-semibold mb-2 text-sm">
                    <Mail className="w-4 h-4 text-verde-lima" />
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    placeholder="Correo electrónico"
                    className={`w-full px-4 py-3 border ${emailError ? 'border-red-500' : 'border-verde-lima'} rounded-lg focus:border-verde-lima focus:outline-none focus:ring-2 focus:ring-verde-lima transition-all bg-gray-800/50 text-black placeholder:text-gray-400`}
                  />
                  {emailError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 mt-2 text-red-400 text-sm"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {emailError}
                    </motion.div>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-blanco font-semibold mb-2 text-sm">
                    <Phone className="w-4 h-4 text-verde-lima" />
                    Teléfono *
                  </label>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-1/2">
                      <label htmlFor="countryCode" className="block text-sm font-medium text-gray-400">
                        Código País
                      </label>
                      <CountrySelectWithFlagAndName
                        value={phoneCountryCode}
                        onChange={setPhoneCountryCode}
                        onPlaceholderChange={setPhonePlaceholder}
                        className="mt-1"
                      />
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-400">
                        Número
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))}
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-800/50 text-white placeholder:text-gray-400 px-3 py-2 h-10"
                        placeholder={phonePlaceholder}
                      />
                    </div>
                  </div>
                  {phoneError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 mt-2 text-red-400 text-sm"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {phoneError}
                    </motion.div>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-blanco font-semibold mb-2 text-sm">
                    <MessageSquare className="w-4 h-4 text-verde-lima" />
                    Mensaje (opcional)
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Cuéntanos más sobre tu situación..."
                    rows={3}
                    className="w-full px-4 py-3 border border-verde-lima rounded-lg focus:border-verde-lima focus:outline-none focus:ring-2 focus:ring-verde-lima transition-all resize-none bg-gray-800/50 text-black placeholder:text-gray-400"
                  />
                </div>

                {submitStatus === "success" && (
                  <div className="bg-verde-lima/20 border border-verde-lima rounded-lg p-4 text-center">
                    <p className="text-verde-lima font-bold">¡Mensaje enviado! Nos contactaremos pronto.</p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-center">
                    <p className="text-red-400 font-bold">Error al enviar. Intenta nuevamente.</p>
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-verde-lima text-negro px-8 py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 hover:bg-verde-lima-dark hover:shadow-verde-lima/50 transition-all disabled:opacity-50 shadow-lg"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
                  <Send className="w-5 h-5" />
                </motion.button>

                <p className="text-center text-xs text-gray-400">
                  Protegemos tu privacidad. No compartiremos tu información.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}