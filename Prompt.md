# Prompt: Landing Page Bizellers - Rediseño Inspirado en Growth Machine

## Contexto del Proyecto
Rediseñar completamente la landing page de Bizellers con un enfoque minimalista y moderno, reduciendo el cansancio visual y maximizando la conversión. La nueva versión debe captar inmediatamente la atención del usuario y guiarlo naturalmente hacia el uso de los servicios.

## Paleta de Colores Bizellers

### Colores Principales (Uso Limitado)
```css
:root {
  /* Colores de Marca - Uso Estratégico */
  --verde-lima: #B4FC05;      /* Acento principal, CTAs, highlights */
  --negro: #121212;            /* Backgrounds, texto principal */
  --blanco: #FFFFFF;           /* Texto sobre fondos oscuros, backgrounds alternos */
  --azul-claro: #64A8CF;       /* Opcional: elementos secundarios, hover states */
  
  /* Escala de Grises (Derivados del Negro) */
  --gray-900: #1A1A1A;         /* Backgrounds sutilmente diferentes */
  --gray-800: #2A2A2A;         /* Cards, elementos elevados */
  --gray-700: #3A3A3A;         /* Borders sutiles */
  --gray-100: #F5F5F5;         /* Backgrounds claros alternativos */
  
  /* Variaciones del Verde Lima (para depth) */
  --verde-lima-dark: #9DD604;  /* Hover states */
  --verde-lima-light: #C5FD3A; /* Glow effects */
  --verde-lima-muted: rgba(180, 252, 5, 0.1); /* Backgrounds sutiles */
}
```

### Estrategia de Uso de Color
1. **Fondo predominante**: Negro (#121212) - 60% de la página
2. **Acento estratégico**: Verde Lima (#B4FC05) - 10% (CTAs, títulos importantes, iconos)
3. **Contraste**: Blanco (#FFFFFF) - 30% (texto, secciones alternadas)
4. **Toque sutil**: Azul Claro (#64A8CF) - <5% (detalles, hover effects opcionales)

---

## Análisis Estructura Growth Machine + Adaptación Bizellers

### 1. **Hero Section - REDISEÑADO**

#### Cambios Clave vs Versión Anterior
- ❌ **Eliminar**: Background estático o imagen
- ✅ **Añadir**: Video de fondo en loop (mp4 optimizado, max 5MB)
- ✅ **Simplificar**: Menos elementos, más impacto visual

#### Estructura Nueva
```
[VIDEO DE FONDO - Oscurecido con overlay negro rgba(18,18,18,0.7)]
  ├── Logotipo Bizellers (arriba izquierda, fixed)
  ├── Headline ANIMADO con efectos especiales
  ├── Subheadline simple y claro
  └── CTA Verde Lima destacado
```

#### Animaciones del Headline - Opciones a Probar

**Opción 1: Wave Effect (Onda de Palabras)**
```typescript
// Cada palabra aparece con un efecto de ola
const waveVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.6, 0.05, 0.01, 0.9]
    }
  })
}

// Uso
{headline.split(' ').map((word, i) => (
  <motion.span
    key={i}
    custom={i}
    variants={waveVariants}
    initial="hidden"
    animate="visible"
    className="inline-block mr-2"
  >
    {word}
  </motion.span>
))}
```

**Opción 2: Fade In Palabra por Palabra**
```typescript
const fadeWordVariants = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: (i: number) => ({
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.15,
      duration: 0.6
    }
  })
}
```

**Opción 3: Contador + Typewriter para Números**
```typescript
// Para headlines con números tipo "500+ empresas"
const CounterText = ({ end, suffix }: { end: number, suffix: string }) => {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = end / steps
    const stepDuration = duration / steps
    
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepDuration)
    
    return () => clearInterval(timer)
  }, [end])
  
  return (
    <span className="text-verde-lima font-bold">
      {count}{suffix}
    </span>
  )
}
```

**Opción 4: Glitch Effect (Tecnológico)**
```typescript
const glitchVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.1 }
  },
  glitch: {
    x: [0, -2, 2, -2, 2, 0],
    textShadow: [
      "0 0 0px rgba(180, 252, 5, 0)",
      "-2px 0 0px rgba(180, 252, 5, 0.8), 2px 0 0px rgba(100, 168, 207, 0.8)",
      "2px 0 0px rgba(180, 252, 5, 0.8), -2px 0 0px rgba(100, 168, 207, 0.8)",
      "0 0 0px rgba(180, 252, 5, 0)"
    ],
    transition: { duration: 0.3 }
  }
}
```

#### Layout Hero Responsive
```typescript
<section className="relative h-screen w-full overflow-hidden">
  {/* Video Background */}
  <video
    autoPlay
    muted
    loop
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/hero-video.mp4" type="video/mp4" />
  </video>
  
  {/* Overlay oscuro */}
  <div className="absolute inset-0 bg-negro/70" />
  
  {/* Contenido */}
  <div className="relative z-10 container h-full flex flex-col justify-center items-start">
    <motion.h1 
      className="text-5xl md:text-7xl lg:text-8xl font-agrandir font-bold text-blanco mb-6"
    >
      {/* Headline con animación seleccionada */}
    </motion.h1>
    
    <motion.p 
      className="text-xl md:text-2xl text-gray-100 mb-8 max-w-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      Tu subheadline claro y directo
    </motion.p>
    
    <motion.button
      className="bg-verde-lima text-negro px-8 py-4 rounded-lg font-bold text-lg"
      whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(180, 252, 5, 0.5)" }}
      whileTap={{ scale: 0.95 }}
    >
      Comenzar Ahora
    </motion.button>
  </div>
  
  {/* Scroll Indicator */}
  <motion.div
    className="absolute bottom-8 left-1/2 -translate-x-1/2"
    animate={{ y: [0, 10, 0] }}
    transition={{ repeat: Infinity, duration: 1.5 }}
  >
    <ChevronDown className="w-8 h-8 text-verde-lima" />
  </motion.div>
</section>
```

---

### 2. **Stats Section - MINIMALISTA**

#### Diseño Simplificado
- Fondo: Blanco o Gris muy claro
- Números: Verde Lima, tamaño gigante
- Labels: Negro, tipografía Inter

```typescript
<section className="py-20 bg-blanco">
  <div className="container">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
        >
          <CountUp
            end={stat.value}
            duration={2}
            suffix={stat.suffix}
            className="text-6xl md:text-7xl font-bold text-verde-lima block mb-2"
          />
          <p className="text-lg text-negro/70">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>
```

---

### 3. **Servicios/Features - CARDS NEGRAS CON ACENTO VERDE**

#### Diseño Reposicionado
- Fondo: Negro
- Cards: Gris oscuro (gray-800) con border verde lima sutil
- Hover: Glow effect verde lima

```typescript
<section className="py-24 bg-negro">
  <div className="container">
    <h2 className="text-4xl md:text-5xl font-agrandir font-bold text-blanco mb-16 text-center">
      Nuestros <span className="text-verde-lima">Servicios</span>
    </h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service, i) => (
        <motion.div
          key={i}
          className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-verde-lima transition-all duration-300"
          whileHover={{ 
            y: -10,
            boxShadow: "0 20px 40px rgba(180, 252, 5, 0.2)"
          }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
        >
          {/* Icono con fondo verde lima */}
          <div className="w-14 h-14 bg-verde-lima/10 rounded-lg flex items-center justify-center mb-6">
            <service.Icon className="w-7 h-7 text-verde-lima" />
          </div>
          
          <h3 className="text-2xl font-bold text-blanco mb-4">
            {service.title}
          </h3>
          
          <p className="text-gray-100 leading-relaxed">
            {service.description}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</section>
```

---

### 4. **Video/Demo Section - MINIMIZADO**

```typescript
<section className="py-20 bg-blanco">
  <div className="container max-w-5xl">
    <motion.div
      className="relative rounded-2xl overflow-hidden group cursor-pointer"
      whileHover={{ scale: 1.02 }}
      onClick={() => setVideoOpen(true)}
    >
      <img 
        src="/video-thumbnail.jpg" 
        alt="Demo" 
        className="w-full aspect-video object-cover"
      />
      
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-negro/40 group-hover:bg-negro/30 transition-colors" />
      
      {/* Play button */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
      >
        <div className="w-20 h-20 bg-verde-lima rounded-full flex items-center justify-center">
          <Play className="w-8 h-8 text-negro ml-1" />
        </div>
      </motion.div>
    </motion.div>
  </div>
</section>
```

---

### 5. **Social Proof - LOGOS INFINITE SCROLL**

#### Implementación con Pausa on Hover
```typescript
<section className="py-16 bg-negro overflow-hidden">
  <div className="mb-8">
    <h3 className="text-center text-gray-100 text-lg">
      Empresas que confían en nosotros
    </h3>
  </div>
  
  <motion.div
    className="flex gap-16"
    animate={{ x: ["0%", "-50%"] }}
    transition={{
      duration: 30,
      repeat: Infinity,
      ease: "linear"
    }}
    whileHover={{ animationPlayState: "paused" }}
  >
    {/* Duplicar logos para loop seamless */}
    {[...logos, ...logos].map((logo, i) => (
      <div
        key={i}
        className="flex-shrink-0 grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100"
      >
        <img 
          src={logo.src} 
          alt={logo.alt} 
          className="h-12 w-auto object-contain"
        />
      </div>
    ))}
  </motion.div>
</section>
```

---

### 6. **CTA Final - IMPACTANTE**

```typescript
<section className="py-24 bg-gradient-to-br from-verde-lima to-verde-lima-dark">
  <div className="container text-center">
    <motion.h2
      className="text-4xl md:text-6xl font-agrandir font-bold text-negro mb-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      ¿Listo para transformar tu negocio?
    </motion.h2>
    
    <motion.p
      className="text-xl text-negro/80 mb-10 max-w-2xl mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
    >
      Únete a más de 500 empresas que ya están creciendo con Bizellers
    </motion.p>
    
    <motion.button
      className="bg-negro text-verde-lima px-12 py-5 rounded-lg font-bold text-lg"
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 0 40px rgba(18, 18, 18, 0.5)"
      }}
      whileTap={{ scale: 0.95 }}
    >
      Agendar Demo Gratuito
    </motion.button>
  </div>
</section>
```

---

## Optimización de Imágenes

### Estrategia de Carga
```typescript
// Componente Image Optimizado
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  eager?: boolean
}

export const OptimizedImage = ({ src, alt, className, eager }: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentSrc, setCurrentSrc] = useState('')

  useEffect(() => {
    // Blur placeholder (muy pequeño, <5KB)
    const blurSrc = src.replace(/\.(jpg|png|webp)/, '-blur.$1')
    setCurrentSrc(blurSrc)

    // Cargar imagen real
    const img = new Image()
    img.src = src
    img.onload = () => {
      setCurrentSrc(src)
      setIsLoaded(true)
    }
  }, [src])

  return (
    <motion.img
      src={currentSrc}
      alt={alt}
      className={className}
      initial={{ opacity: 0, filter: 'blur(20px)' }}
      animate={{ 
        opacity: isLoaded ? 1 : 0.5,
        filter: isLoaded ? 'blur(0px)' : 'blur(20px)'
      }}
      transition={{ duration: 0.6 }}
      loading={eager ? 'eager' : 'lazy'}
    />
  )
}
```

### Conversión y Compresión
```bash
# Script para optimizar imágenes (usa Sharp o Imagemagick)
# Convierte a WebP y genera versiones blur

# En package.json
{
  "scripts": {
    "optimize-images": "node scripts/optimize-images.js"
  }
}
```

```javascript
// scripts/optimize-images.js
import sharp from 'sharp'
import { readdir } from 'fs/promises'

const inputDir = './public/images/original'
const outputDir = './public/images/optimized'

const files = await readdir(inputDir)

for (const file of files) {
  // Imagen principal WebP
  await sharp(`${inputDir}/${file}`)
    .webp({ quality: 80 })
    .toFile(`${outputDir}/${file.replace(/\.\w+$/, '.webp')}`)
  
  // Blur placeholder
  await sharp(`${inputDir}/${file}`)
    .resize(20)
    .blur(10)
    .webp({ quality: 20 })
    .toFile(`${outputDir}/${file.replace(/\.\w+$/, '-blur.webp')}`)
}
```

---

## Responsive Mobile - Consideraciones Críticas

### Breakpoints Específicos
```typescript
// tailwind.config.ts
export default {
  theme: {
    screens: {
      'xs': '375px',   // iPhone SE
      'sm': '640px',   // Móviles grandes
      'md': '768px',   // Tablets
      'lg': '1024px',  // Desktop pequeño
      'xl': '1280px',  // Desktop normal
      '2xl': '1536px', // Desktop grande
    }
  }
}
```

### Hero Mobile Ajustado
```typescript
<section className="relative h-screen">
  <video className="hidden md:block absolute inset-0 ...">
    {/* Video solo en desktop */}
  </video>
  
  <div className="md:hidden absolute inset-0 bg-gradient-to-br from-negro to-gray-900">
    {/* Gradiente simple en mobile para performance */}
  </div>
  
  <div className="container h-full flex flex-col justify-center px-6 md:px-0">
    <h1 className="text-4xl xs:text-5xl md:text-7xl lg:text-8xl">
      {/* Tamaños progresivos */}
    </h1>
  </div>
</section>
```

### Touch Optimization
```typescript
// Aumentar área de toque en móviles
const Button = ({ children, ...props }) => (
  <motion.button
    className="px-8 py-4 min-h-[48px] md:min-h-[44px]" // Mínimo 48px en mobile
    whileTap={{ scale: 0.95 }} // Feedback táctil
    {...props}
  >
    {children}
  </motion.button>
)
```

---

## Estructura de Proyecto Vite

```
bizellers-landing/
├── public/
│   ├── videos/
│   │   └── hero-video.mp4 (optimizado, max 5MB)
│   └── images/
│       ├── optimized/
│       └── original/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── OptimizedImage.tsx
│   │   │   └── Section.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   └── sections/
│   │       ├── Hero.tsx
│   │       ├── Stats.tsx
│   │       ├── Services.tsx
│   │       ├── VideoDemo.tsx
│   │       ├── SocialProof.tsx
│   │       └── FinalCTA.tsx
│   ├── hooks/
│   │   ├── useScrollAnimation.ts
│   │   ├── useInView.ts
│   │   └── useCountUp.ts
│   ├── utils/
│   │   └── animations.ts
│   ├── types/
│   │   └── index.ts
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
├── scripts/
│   └── optimize-images.js
└── vite.config.ts
```

---

## Tipografías Configuradas

```css
/* globals.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* Agrandir debe estar localmente o via CDN premium */
@font-face {
  font-family: 'Agrandir';
  src: url('/fonts/Agrandir-Bold.woff2') format('woff2');
  font-weight: 700;
  font-display: swap;
}

* {
  font-family: 'Inter', sans-serif;
}

h1, h2, h3 {
  font-family: 'Agrandir', 'Inter', sans-serif;
}
```

---

## Performance Checklist

### Vite Optimizations
```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'

export default defineConfig({
  plugins: [
    react(),
    imagetools() // Auto-optimiza imágenes
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'framer': ['framer-motion'],
          'vendor': ['react', 'react-dom']
        }
      }
    }
  }
})
```

### Lazy Loading de Secciones
```typescript
import { lazy, Suspense } from 'react'

const Services = lazy(() => import('./components/sections/Services'))
const VideoDemo = lazy(() => import('./components/sections/VideoDemo'))

function App() {
  return (
    <>
      <Hero /> {/* Above the fold - NO lazy */}
      <Stats />
      <Suspense fallback={<div className="h-screen" />}>
        <Services />
        <VideoDemo />
      </Suspense>
    </>
  )
}
```

---

## Textos Atractivos - Ejemplos Reformulados

### Antes vs Después

**❌ Antes**: "Ofrecemos servicios de consultoría empresarial"
**✅ Después**: "Transformamos tu caos empresarial en crecimiento predecible"

**❌ Antes**: "Tenemos experiencia en el sector"
**✅ Después**: "500+ empresas ya confían en nuestra metodología"

**❌ Antes**: "Contáctanos para más información"
**✅ Después**: "Agenda tu demo gratuito en 30 segundos"

### Fórmula de Headlines
```
[Verbo de Acción] + [Beneficio Específico] + [En Tiempo Récord]

Ejemplos:
- "Duplica tus ventas en 90 días con IA y procesos validados"
- "Escala tu equipo comercial sin perder rentabilidad"
- "Convierte leads fríos en clientes recurrentes"
```

---

## Próximos Pasos Inmediatos

### Fase 1: Setup (Día 1)
- [ ] `npm create vite@latest bizellers-landing -- --template react-ts`
- [ ] Instalar dependencias: `framer-motion`, `lucide-react`
- [ ] Configurar Tailwind con colores de Bizellers
- [ ] Estructura de carpetas modular

### Fase 2: Hero + Header 
- [ ] Implementar video de fondo optimizado
- [ ] Probar las 4 opciones de animación de headline
- [ ] Header sticky con logo Bizellers
- [ ] Mobile-first responsive

### Fase 3: Secciones Core 
- [ ] Stats con counter animation
- [ ] Cards de servicios con hover effects
- [ ] Social proof con infinite marquee
- [ ] CTA final impactante

### Fase 4: Polish 
- [ ] Optimización de imágenes
- [ ] Testing en dispositivos reales
- [ ] Ajustes de microinteracciones
- [ ] Performance audit (Lighthouse)

---

## Recursos Específicos para Bizellers

### Inspiración Visual Similar
- Linear.app (microinteracciones sutiles)
- Vercel.com (minimalismo efectivo)
- Stripe.com (gradientes y glows)

### Testing en Dispositivos
```bash
# Usa Vite network para probar en móvil real
npm run dev -- --host

# Accede desde tu móvil con:
# http://[TU-IP-LOCAL]:5173
```

---