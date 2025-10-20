import { motion } from "framer-motion";

const brands = [
  { name: "AcceptGo", logo: "/Assets/AcceptGo.png" },
  { name: "ARIA", logo: "/Assets/ARIA.png" },
  { name: "Buplat", logo: "/Assets/Buplat.png" },
  { name: "Code", logo: "/Assets/Code.png" },
  { name: "EasyDrop", logo: "/Assets/EasyDrop.png" },
  { name: "Equipu", logo: "/Assets/Equipu.png" },
  { name: "EraDigital", logo: "/Assets/EraDigital.png" },
  { name: "Kaman", logo: "/Assets/Kaman.png" },
  { name: "Nexum", logo: "/Assets/Nexum.png" },
  { name: "Perflay", logo: "/Assets/Perflay.png" },
  { name: "StartupGrind", logo: "/Assets/StartupGrind.png" },
  { name: "Superdotados", logo: "/Assets/Superdotados.png" },
  { name: "Tecsup", logo: "/Assets/Tecsup.png" },
];

export function Brands() {
  // Duplicar las marcas para el efecto infinito
  const duplicatedBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <section className="py-12 bg-negro relative overflow-hidden">
      {/* Green glow effects */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/4 w-96 h-96 bg-verde-lima/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.12, 0.2, 0.12] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute top-1/2 right-1/4 w-80 h-80 bg-verde-lima/15 rounded-full blur-3xl"
      />

      {/* Divider superior */}
      <div className="container mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-verde-lima/30 to-transparent mb-8 shadow-[0_0_10px_rgba(180,252,5,0.3)]"></div>
      </div>

      <div className="relative z-10">
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-16 items-center"
            animate={{
              x: [0, -1000],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {duplicatedBrands.map((brand, index) => (
              <motion.div
                key={`${brand.name}-${index}`}
                className="flex-shrink-0"
                whileHover={{ scale: 1.1 }}
              >
                <img
                  src={brand.logo}
                  alt={`Logo ${brand.name}`}
                  className="h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-all"
                  style={{
                    filter: "brightness(0) invert(1) drop-shadow(0 0 8px rgba(180, 252, 5, 0.4))",
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Divider inferior */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="h-px bg-gradient-to-r from-transparent via-verde-lima/30 to-transparent mt-8 shadow-[0_0_10px_rgba(180,252,5,0.3)]"></div>
      </div>
    </section>
  );
}
