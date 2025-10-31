import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Sparkles, CheckCircle } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setEmail("");
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

  return (
    <section className="py-12 md:py-16 bg-negro relative overflow-hidden">
      {/* Green glow effects - INTENSIFIED */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-10 w-[500px] h-[500px] bg-verde-lima/35 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-0 right-10 w-[450px] h-[450px] bg-verde-lima/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-verde-lima/25 rounded-full blur-3xl"
      />
      
      {/* Additional neon glows */}
      <motion.div
        animate={{ opacity: [0.25, 0.55, 0.25], scale: [1, 1.14, 1], x: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '150px',
          height: '150px',
          left: '20%',
          top: '20%',
          background: 'rgba(180, 252, 5, 0.45)',
          filter: 'blur(40px)',
          zIndex: 1,
        }}
      />
      <motion.div
        animate={{ opacity: [0.28, 0.58, 0.28], scale: [1, 1.12, 1], y: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '120px',
          height: '120px',
          right: '15%',
          bottom: '25%',
          background: 'rgba(180, 252, 5, 0.42)',
          filter: 'blur(38px)',
          zIndex: 1,
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-verde-lima/10 border border-verde-lima rounded-full px-4 py-2 mb-6"
            >
              <Sparkles className="w-4 h-4 text-verde-lima" />
              <span className="text-verde-lima font-bold text-sm">Newsletter</span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-blanco mb-4"
            >
              Recibe contenido exclusivo{" "}
              <span className="relative inline-block">
                <span className="text-verde-lima">para escalar</span>
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-verde-lima/50 rounded-full"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                />
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-100 mb-8 max-w-3xl mx-auto"
            >
              Recursos para transformar tu equipo comercial en un motor de crecimiento.
            </motion.p>
          </div>

          {/* Newsletter Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-verde-lima" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Escribe tu correo electrónico"
                    className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border-2 border-verde-lima rounded-lg focus:border-verde-lima focus:outline-none focus:ring-2 focus:ring-verde-lima transition-all text-negro placeholder:text-gray-400"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-verde-lima text-negro px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-verde-lima-dark transition-all disabled:opacity-50 shadow-lg whitespace-nowrap"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    "Enviando..."
                  ) : (
                    <>
                      Suscribirme
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </div>

              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-verde-lima/20 border border-verde-lima rounded-lg p-4 flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-verde-lima flex-shrink-0" />
                  <p className="text-verde-lima font-bold">
                    ¡Gracias por suscribirte! Revisa tu correo para confirmar.
                  </p>
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-center"
                >
                  <p className="text-red-400 font-bold">
                    Error al suscribirse. Intenta nuevamente.
                  </p>
                </motion.div>
              )}

              
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
