import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { Brands } from "./components/sections/Brands";
import { Methodology } from "./components/sections/Methodology";
import { Services } from "./components/sections/Services";
import { Testimonials } from "./components/sections/Testimonials";
import { AboutRuben } from "./components/sections/AboutRuben";
import { Newsletter } from "./components/sections/Newsletter";
import { FAQs } from "./components/sections/FAQs";
import { Contact } from "./components/sections/Contact";
import { SEO } from "./components/common/SEO";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";

// Landing Page Component
function LandingPage() {
  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Bizellers",
    "url": "https://www.bizellers.com",
    "logo": "https://www.bizellers.com/bizellers_logo.jpg",
    "image": "https://www.bizellers.com/hero-business.png",
    "description": "Consultoría de ventas B2B para startups y scaleups en Latinoamérica. Ayudamos a escalar tu crecimiento comercial a través de estrategia, entrenamiento y tecnología.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "MX",
      "addressLocality": "México"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "contacto@bizellers.com"
    },
    "founder": {
      "@type": "Person",
      "name": "Rubén Viera"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Bizellers",
    "url": "https://www.bizellers.com",
    "description": "Consultoría de ventas B2B que transforma equipos comerciales en motores de crecimiento",
    "publisher": {
      "@type": "Organization",
      "name": "Bizellers"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.bizellers.com/?s={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Rubén Viera",
      "jobTitle": "Fundador y CEO de Bizellers",
      "description": "Experto en ventas B2B con más de 7 años liderando equipos comerciales y estrategias de desarrollo de negocios en startups tecnológicas y scaleups en Latinoamérica",
      "image": "https://www.bizellers.com/ruben-profile.png",
      "url": "https://www.bizellers.com",
      "worksFor": {
        "@type": "Organization",
        "name": "Bizellers"
      }
  };

  const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "¿Cuál es el perfil de empresas con las que colabora Bizellers?",
          "acceptedAnswer": { "@type": "Answer", "text": "Nuestro enfoque está dirigido a startups tecnológicas, scaleups y empresas B2B en fase de crecimiento acelerado que requieren estructurar y profesionalizar sus procesos comerciales." }
        },
        {
          "@type": "Question",
          "name": "¿Qué resultados medibles puedo esperar de la consultoría?",
          "acceptedAnswer": { "@type": "Answer", "text": "Nuestros proyectos están diseñados para generar resultados cuantificables: incremento mensurable en tasas de conversión, optimización del ciclo de venta y mejora sustancial en la precisión del forecasting comercial." }
        },
        {
          "@type": "Question",
          "name": "¿La capacitación incluye la participación de todo el equipo comercial?",
          "acceptedAnswer": { "@type": "Answer", "text": "Nuestra metodología está diseñada para incluir y potenciar la participación colaborativa de todo el equipo comercial, garantizando una implementación consistente y aliniación estratégica." }
        },
        {
          "@type": "Question",
          "name": "¿El servicio incluye implementación de CRM o únicamente consultoría estratégica?",
          "acceptedAnswer": { "@type": "Answer", "text": "Nuestro servicio abarca consultoría estratégica, arquitectura de soluciones y acompañamiento integral en la implementación de sistemas CRM y otras herramientas tecnológicas." }
        }
      ]
    };

  return (
    <div className="min-h-screen bg-negro">
      <SEO 
        title="Bizellers - Consultoría de Ventas B2B | Escalamos tu Crecimiento Comercial"
        description="Transformamos equipos comerciales en motores de crecimiento. Consultoría estratégica, entrenamiento de alto rendimiento y tecnología de ventas B2B para startups y scaleups en Latinoamérica."
        keywords="consultoría ventas B2B, estrategia comercial, growth sales, ventas startups, CRM, sales training, desarrollo comercial, escalamiento ventas, Rubén Viera, México, Latinoamérica"
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            professionalServiceSchema,
            websiteSchema,
            personSchema,
            faqSchema
          ]
        }}
      />
      <Header />
      <main>
        <Hero />
        <Brands />
        <Methodology />
        <Services />
        <Testimonials />
        <AboutRuben />
        <Newsletter />
        <FAQs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
