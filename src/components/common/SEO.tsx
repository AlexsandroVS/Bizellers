import { useEffect } from 'react';

export function SEO() {
  useEffect(() => {
    // Structured Data - Organization
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Bizellers",
      "description": "Consultoría de ventas B2B que transforma equipos comerciales en motores de crecimiento",
      "url": "https://www.bizellers.com",
      "logo": "https://www.bizellers.com/logo2.png",
      "image": "https://www.bizellers.com/og-image.jpg",
      "email": "alexsandro.valeriano1@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "MX",
        "addressRegion": "México"
      },
      "sameAs": [
        "https://www.instagram.com/bizellers",
        "https://www.linkedin.com/company/bizellers"
      ],
      "founder": {
        "@type": "Person",
        "name": "Rubén Viera",
        "jobTitle": "Fundador y Consultor de Ventas B2B",
        "description": "Experto en ventas B2B con más de 7 años liderando equipos comerciales y estrategias de desarrollo de negocios"
      }
    };

    // Structured Data - Local Business
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Bizellers",
      "description": "Consultoría estratégica de ventas B2B, entrenamiento de alto rendimiento y tecnología de ventas para startups y scaleups",
      "url": "https://www.bizellers.com",
      "telephone": "+52-123-456-7890",
      "email": "alexsandro.valeriano1@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "MX",
        "addressLocality": "México"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "addressCountry": "MX"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      },
      "priceRange": "$$",
      "areaServed": {
        "@type": "GeoCircle",
        "name": "Latinoamérica",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "addressCountry": "MX"
        }
      }
    };

    // Structured Data - Services
    const servicesSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "Service",
          "name": "Sales Power Session",
          "description": "Sesión 1:1 para identificar bloqueos, afinar estrategia y obtener pasos accionables inmediatos",
          "provider": {
            "@type": "Organization",
            "name": "Bizellers"
          },
          "serviceType": "Consultoría de Ventas",
          "areaServed": "Latinoamérica"
        },
        {
          "@type": "Service",
          "name": "Growth Sales Blueprint",
          "description": "Estructuramos tu sistema de ventas completo en 3 meses: estrategia, procesos y ejecución optimizada",
          "provider": {
            "@type": "Organization",
            "name": "Bizellers"
          },
          "serviceType": "Implementación de Sistema de Ventas",
          "areaServed": "Latinoamérica"
        },
        {
          "@type": "Service",
          "name": "Fractional Growth Leadership",
          "description": "Guía experta en ventas B2B para dirigir y acelerar el crecimiento de tu equipo comercial",
          "provider": {
            "@type": "Organization",
            "name": "Bizellers"
          },
          "serviceType": "Liderazgo Comercial Fraccional",
          "areaServed": "Latinoamérica"
        },
        {
          "@type": "Service",
          "name": "Sales Lab",
          "description": "Entrenamiento práctico para dominar prospección, negociación y cierre con técnicas comprobadas",
          "provider": {
            "@type": "Organization",
            "name": "Bizellers"
          },
          "serviceType": "Capacitación en Ventas",
          "areaServed": "Latinoamérica"
        }
      ]
    };

    // Structured Data - Person (Rubén Viera)
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
      },
      "alumniOf": [
        {
          "@type": "Organization",
          "name": "Nexum Aceleradora"
        },
        {
          "@type": "Organization",
          "name": "Kaman Incubadora de Negocios"
        }
      ],
      "knowsAbout": [
        "Ventas B2B",
        "Estrategia Comercial",
        "Sales Operations",
        "CRM",
        "Growth Sales",
        "Desarrollo de Negocios",
        "Entrenamiento de Equipos Comerciales"
      ]
    };

    // Structured Data - WebSite
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

    // Structured Data - FAQPage
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "¿Cuál es el perfil de empresas con las que colabora Bizellers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Nuestro enfoque está dirigido a startups tecnológicas, scaleups y empresas B2B en fase de crecimiento acelerado que requieren estructurar y profesionalizar sus procesos comerciales. Colaboramos con organizaciones que típicamente se encuentran en fase de tracción o expansión internacional."
          }
        },
        {
          "@type": "Question",
          "name": "¿Qué resultados medibles puedo esperar de la consultoría?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Nuestros proyectos están diseñados para generar resultados cuantificables: incremento mensurable en tasas de conversión, optimización del ciclo de venta, mejora sustancial en la precisión del forecasting comercial y escalabilidad comprobada del equipo."
          }
        },
        {
          "@type": "Question",
          "name": "¿La capacitación incluye la participación de todo el equipo comercial?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Nuestra metodología está diseñada para incluir y potenciar la participación colaborativa de todo el equipo comercial. Promovemos activamente la participación grupal, ya que garantiza una implementación consistente, alineación estratégica y adopción efectiva de las mejores prácticas."
          }
        },
        {
          "@type": "Question",
          "name": "¿El servicio incluye implementación de CRM o únicamente consultoría estratégica?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Nuestro servicio abarca consultoría estratégica, arquitectura de soluciones y acompañamiento integral en la implementación de sistemas CRM. Adicionalmente, proporcionamos soporte técnico especializado para configuración avanzada, personalización de flujos de trabajo y optimización continua de plataformas como HubSpot, Pipedrive, Salesforce u otras herramientas tecnológicas."
          }
        }
      ]
    };

    // Inject all structured data scripts
    const schemas = [
      organizationSchema,
      localBusinessSchema,
      servicesSchema,
      personSchema,
      websiteSchema,
      faqSchema
    ];

    schemas.forEach((schema, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = `structured-data-${index}`;
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    // Cleanup function
    return () => {
      schemas.forEach((_, index) => {
        const script = document.getElementById(`structured-data-${index}`);
        if (script) {
          document.head.removeChild(script);
        }
      });
    };
  }, []);

  return null;
}
