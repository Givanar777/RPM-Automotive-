export type Language = 'en' | 'es';

export const translations = {
  en: {
    nav: {
      services: 'Services',
      about: 'About Us',
      testimonials: 'Testimonials',
      contact: 'Contact',
      cta: 'CONTACT US',
    },
    hero: {
      badge: 'Expert Automotive Care',
      title: 'Reliable Automotive Repair & Diagnostics in ',
      location: 'Santa Cruz, CA',
      subtitle: 'Expert service you can trust. same-day diagnostics, and a 12-month warranty on parts and labor.',
      ctaRequest: 'Request Diagnostic',
      ctaServices: 'View Services',
    },
    stats: {
      experience: 'Over 24 Years',
      experienceSub: 'of Experience',
      warranty: '12-Month',
      warrantySub: 'Warranty',
      google: '5 Stars',
      googleSub: 'on Google',
      diagnostic: '30-Min',
      diagnosticSub: 'Diagnostic',
    },
    services: {
      title: 'Precision Services',
      general: {
        title: 'General Repair',
        items: [
          'Brake Repair & Replacement',
          'Suspension & Steering Components',
          'Shocks & Struts',
          'Safety Inspections',
        ],
      },
      diagnostics: {
        title: 'Diagnostics',
        items: [
          'Check Engine Light Analysis',
          'Electrical System Troubleshooting',
          'Computer Scanning & Programming',
          'Performance Tuning Diagnostics',
        ],
      },
      maintenance: {
        title: 'Maintenance',
        items: [
          'Factory Recommended Oil Changes',
          '30k/60k/90k Service Intervals',
          'Fluid Flushes (Coolant, Brake, Steering)',
          'Tire Rotation & Balancing',
        ],
      },
    },
    trust: {
      title: 'The RPM Difference',
      description: "We've built our reputation on transparency, technical expertise, and a commitment to customer satisfaction in the Milpitas community.",
      rating: '4.9/5 Rating on Google',
      benefits: [
        {
          title: 'ASE Certification',
          description: 'Our mechanics are master-level certified experts.',
        },
        {
          title: '12-Month Warranty',
          description: 'Confidence in every repair we perform.',
        },
        {
          title: 'Same-Day Service',
          description: 'Quick turnaround for most diagnostic tasks.',
        },
        {
          title: 'Honest Pricing',
          description: 'No hidden fees or unnecessary upselling.',
        },
        {
          title: 'Free Diagnostic',
          description: 'Complimentary 30-minute system inspection.',
        },
        {
          title: '5-Star Reviews',
          description: 'Top-rated local shop by our loyal customers.',
        },
      ],
    },
    testimonials: {
      title: 'Customer Reviews',
      subtitle: 'Our reputation is built on honesty and quality work. See what our customers in Milpitas are saying about us.',
      items: [
        {
          quote: "RPM Automotive is the only place I take my SUV. They are fast, honest, and explained exactly what was wrong with my brakes without trying to sell me anything extra.",
          author: "Maria G.",
          vehicle: "Toyota Highlander Owner",
        },
        {
          quote: "Same-day diagnosis was a lifesaver. A check engine light came on during my commute; they scanned it and ordered the part in less than an hour.",
          author: "James T.",
          vehicle: "BMW 3 Series Owner",
        },
        {
          quote: "I found my forever mechanic. The 24-month warranty gives me total peace of mind for my daughter's first car. Highly professional team.",
          author: "Linda R.",
          vehicle: "Honda Civic Owner",
        },
      ],
      viewMore: 'View more on',
    },
    contact: {
      title: 'Request Your Diagnostic or Appointment',
      subtitle: "Tell us what your car needs and we'll get in touch with you shortly.",
      form: {
        name: 'Full Name',
        namePlaceholder: 'e.g. John Doe',
        phone: 'Contact Phone (Required)',
        phonePlaceholder: '(831) 000-0000',
        email: 'Email Address',
        emailPlaceholder: 'you@email.com',
        vehicle: 'Vehicle Information (This saves you 5 minutes of phone questions)',
        vehiclePlaceholder: 'Year, Make and Model (e.g. 2015 Toyota Camry)',
        serviceType: 'What type of service do you need?',
        services: [
          'Oil Change / Maintenance',
          'Brakes',
          'Check Engine Diagnostic',
          'Suspension / Steering',
          'Cooling System',
          'Other',
        ],
        problem: 'Briefly tell us the problem',
        problemPlaceholder: 'I hear a noise when braking... or I need my 60k mile service.',
        cta: 'Send Appointment Request',
        success: 'Request Sent!',
        successMsg: 'Thank you for contacting us. We will get in touch with you soon to confirm the details.',
      },
      info: {
        address: 'Address',
        phone: '831.429.2096',
        hours: 'Hours',
        weekdays: 'Monday - Friday: 8:00 AM - 5:00 PM',
        saturday: 'Saturday: 8:00 AM - 1:00 PM',
        sunday: 'Sunday: Closed',
      },
    },
    footer: {
      rights: 'All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      cookies: 'Cookie Policy',
    },
    servicesPage: {
      hero: {
        title: 'Expert Service for All Foreign & Domestic Vehicles',
        subtitle: 'From complex diagnostics to routine maintenance, we have the expertise and tools to keep your vehicle in peak condition.',
      },
      cards: [
        {
          title: 'Diagnostics & Electrical',
          focus: 'Computer Diagnostics, Check Engine Light, Alternators, Starters, Batteries',
          cta: 'Call for an Estimate: 831.429.2096',
        },
        {
          title: 'Brake & Safety Service',
          focus: 'Complete Brake Service, Shocks, Struts, Suspension',
          cta: 'Call for an Estimate: 831.429.2096',
        },
        {
          title: 'Maintenance & Tune-Ups',
          focus: 'Oil Changes, Tune-Ups, Filter Replacements, Fluid Checks',
          cta: 'Call for an Estimate: 831.429.2096',
        },
        {
          title: 'Cooling System',
          focus: 'Radiators, Water Pumps, Belts, Hoses',
          cta: 'Call for an Estimate: 831.429.2096',
        },
      ],
      maintenance: {
        title: 'Maintenance Matters',
        text: 'We specialize in factory-scheduled maintenance to keep your warranty valid and your car running longer. From European imports to American classics, we have the tools to do it right.',
      },
    },
    about: {
      hero: {
        badge: 'About Us',
        title: 'Our History: Passion for Mechanics since 1999',
        subtitle: 'More than a shop, we are a family dedicated to maintaining the safety and performance of your vehicle with the honesty that characterizes us.',
      },
      legacy: {
        title: 'The Legacy of José Trinidad Ríos',
        p1: 'The history of RPM Auto Repair began in 1999, when José Trinidad Ríos decided to turn his passion for engines into a commitment to his community. With little more than his tools and an unwavering desire to offer fair service, José opened the doors of what is now a benchmark of trust in Milpitas.',
        p2: 'Over more than two decades, we have seen automotive technology evolve, but our core values have remained intact. We don\'t just repair cars; we build relationships based on transparency.',
        quote: 'Our greatest satisfaction is not just fixing an engine, but seeing the peace of mind on our customers\' faces when they know their car is in good hands.',
        p3: 'It is that trust that makes us, today, have customers who travel from Salinas and other distant cities just for us to take care of their vehicles. They know that at RPM, our word is as good as the work performed.',
        founderRole: 'Founder & Master Mechanic',
      },
      values: {
        title: 'Our Values',
        subtitle: 'What has kept us going for over 24 years.',
        items: [
          {
            title: 'Honesty',
            desc: 'Clear and direct diagnostics. We only recommend what your car really needs.',
          },
          {
            title: 'Experience since 1999',
            desc: 'More than two decades perfecting our craft and adapting to each new generation of vehicles.',
          },
          {
            title: 'Fair Prices',
            desc: 'Dealership quality at competitive prices. We believe safety should not be a luxury.',
          },
        ],
      },
      cta: {
        title: 'Ready to experience the difference?',
        subtitle: 'Join the hundreds of satisfied customers who trust us with their vehicle care.',
        button: 'Contact us today',
      },
    },
  },
  es: {
    nav: {
      services: 'Servicios',
      about: 'Nosotros',
      testimonials: 'Testimonios',
      contact: 'Contacto',
      cta: 'CONTACTAR',
    },
    hero: {
      badge: 'Cuidado Automotriz Experto',
      title: 'Reparación y Diagnóstico Automotriz Confiable en ',
      location: 'Milpitas, CA',
      subtitle: 'Servicio experto en el que puede confiar. Mecánicos certificados por ASE, diagnósticos el mismo día y garantía de 24 meses en piezas y mano de obra.',
      ctaRequest: 'Solicitar Diagnóstico',
      ctaServices: 'Ver Servicios',
    },
    stats: {
      experience: 'Más de 24 Años',
      experienceSub: 'de Experiencia',
      warranty: '24 Meses',
      warrantySub: 'de Garantía',
      google: '5 Estrellas',
      googleSub: 'en Google',
      diagnostic: 'Diagnóstico de 30 Min',
      diagnosticSub: 'GRATIS',
    },
    services: {
      title: 'Servicios de Precisión',
      general: {
        title: 'Reparación General',
        items: [
          'Reparación y Reemplazo de Frenos',
          'Suspensión y Componentes de Dirección',
          'Amortiguadores y Puntales',
          'Inspecciones de Seguridad',
        ],
      },
      diagnostics: {
        title: 'Diagnósticos',
        items: [
          'Análisis de Luz de Motor (Check Engine)',
          'Solución de Problemas del Sistema Eléctrico',
          'Escaneo y Programación por Computadora',
          'Diagnósticos de Ajuste de Rendimiento',
        ],
      },
      maintenance: {
        title: 'Mantenimiento',
        items: [
          'Cambios de Aceite Recomendados de Fábrica',
          'Intervalos de Servicio 30k/60k/90k',
          'Lavado de Fluidos (Refrigerante, Frenos, Dirección)',
          'Rotación y Balanceo de Llantas',
        ],
      },
    },
    trust: {
      title: 'La Diferencia de RPM',
      description: 'Hemos construido nuestra reputación sobre la transparencia, la experiencia técnica y el compromiso con la satisfacción del cliente en la comunidad de Milpitas.',
      rating: 'Calificación 4.9/5 en Google',
      benefits: [
        {
          title: 'Certificación ASE',
          description: 'Nuestros mecánicos son expertos certificados a nivel maestro.',
        },
        {
          title: 'Garantía de 24 Meses',
          description: 'Confianza en cada reparación que realizamos.',
        },
        {
          title: 'Servicio el Mismo Día',
          description: 'Entrega rápida para la mayoría de las tareas de diagnóstico.',
        },
        {
          title: 'Precios Honestos',
          description: 'Sin cargos ocultos ni ventas adicionales innecesarias.',
        },
        {
          title: 'Diagnóstico Gratis',
          description: 'Inspección de sistema de 30 minutos complementaria.',
        },
        {
          title: 'Opiniones de 5 Estrellas',
          description: 'Taller local mejor valorado por nuestros clientes leales.',
        },
      ],
    },
    testimonials: {
      title: 'Opiniones de Clientes',
      subtitle: 'Nuestra reputación se basa en la honestidad y el trabajo de calidad. Mira lo que nuestros clientes en Milpitas dicen sobre nosotros.',
      items: [
        {
          quote: "RPM Automotive es el único lugar al que llevo mi SUV. Son rápidos, honestos y explicaron exactamente qué estaba mal con mis frenos sin intentar venderme nada extra.",
          author: "Maria G.",
          vehicle: "Propietaria de Toyota Highlander",
        },
        {
          quote: "El diagnóstico el mismo día fue un salvavidas. Se encendió una luz del motor durante mi trayecto; lo escanearon y pidieron la pieza en menos de una hora.",
          author: "James T.",
          vehicle: "Propietario de BMW Serie 3",
        },
        {
          quote: "Encontré a mi mecánico para siempre. La garantía de 24 meses me da total tranquilidad para el primer auto de mi hija. Equipo altamente profesional.",
          author: "Linda R.",
          vehicle: "Propietaria de Honda Civic",
        },
      ],
      viewMore: 'Ver más en',
    },
    contact: {
      title: 'Solicita tu Diagnóstico o Cita',
      subtitle: 'Cuéntanos qué necesita tu auto y nos pondremos en contacto contigo a la brevedad.',
      form: {
        name: 'Nombre Completo',
        namePlaceholder: 'Ej. Juan Pérez',
        phone: 'Teléfono de Contacto (Obligatorio)',
        phonePlaceholder: '(831) 000-0000',
        email: 'Correo Electrónico',
        emailPlaceholder: 'tu@email.com',
        vehicle: 'Información del Vehículo (Esto te ahorra 5 minutos de preguntas por teléfono)',
        vehiclePlaceholder: 'Año, Marca y Modelo (Ej. 2015 Toyota Camry)',
        serviceType: '¿Qué tipo de servicio necesitas?',
        services: [
          'Cambio de Aceite / Mantenimiento',
          'Frenos',
          'Diagnóstico de Check Engine',
          'Suspensión / Dirección',
          'Sistema de Enfriamiento',
          'Otro',
        ],
        problem: 'Cuéntanos brevemente el problema',
        problemPlaceholder: 'Escucho un ruido al frenar... o Necesito mi servicio de las 60k millas.',
        cta: 'Enviar Solicitud de Cita',
        success: '¡Solicitud Enviada!',
        successMsg: 'Gracias por contactarnos. Nos comunicaremos contigo pronto para confirmar los detalles.',
      },
      info: {
        address: 'Dirección',
        phone: '831.429.2096',
        hours: 'Horario',
        weekdays: 'Lunes - Viernes: 8:00 AM - 5:00 PM',
        saturday: 'Sábado: 8:00 AM - 1:00 PM',
        sunday: 'Domingo: Cerrado',
      },
    },
    footer: {
      rights: 'Todos los derechos reservados.',
      privacy: 'Política de Privacidad',
      terms: 'Términos de Servicio',
      cookies: 'Política de Cookies',
    },
    servicesPage: {
      hero: {
        title: 'Servicio Experto para Todos los Vehículos Nacionales e Importados',
        subtitle: 'Desde diagnósticos complejos hasta mantenimiento de rutina, tenemos la experiencia y las herramientas para mantener su vehículo en óptimas condiciones.',
      },
      cards: [
        {
          title: 'Diagnóstico y Eléctrico',
          focus: 'Diagnóstico por Computadora, Luz de Motor, Alternadores, Arrancadores, Baterías',
          cta: 'Llamar para Presupuesto: 831.429.2096',
        },
        {
          title: 'Servicio de Frenos y Seguridad',
          focus: 'Servicio Completo de Frenos, Amortiguadores, Puntales, Suspensión',
          cta: 'Llamar para Presupuesto: 831.429.2096',
        },
        {
          title: 'Mantenimiento y Afinaciones',
          focus: 'Cambios de Aceite, Afinaciones, Reemplazo de Filtros, Revisión de Fluidos',
          cta: 'Llamar para Presupuesto: 831.429.2096',
        },
        {
          title: 'Sistema de Enfriamiento',
          focus: 'Radiadores, Bombas de Agua, Correas, Mangueras',
          cta: 'Llamar para Presupuesto: 831.429.2096',
        },
      ],
      maintenance: {
        title: 'El Mantenimiento Importa',
        text: 'Nos especializamos en el mantenimiento programado de fábrica para mantener válida su garantía y que su auto funcione por más tiempo. Desde importaciones europeas hasta clásicos americanos, tenemos las herramientas para hacerlo bien.',
      },
    },
    about: {
      hero: {
        badge: 'Sobre Nosotros',
        title: 'Nuestra Historia: Pasión por la Mecánica desde 1999',
        subtitle: 'Más que un taller, somos una familia dedicada a mantener la seguridad y el rendimiento de tu vehículo con la honestidad que nos caracteriza.',
      },
      legacy: {
        title: 'El Legado de José Trinidad Ríos',
        p1: 'La historia de RPM Auto Repair comenzó en 1999, cuando José Trinidad Ríos decidió convertir su pasión por los motores en un compromiso con su comunidad. Con poco más que sus herramientas y un deseo inquebrantable de ofrecer un servicio justo, José abrió las puertas de lo que hoy es un referente de confianza en Milpitas.',
        p2: 'A lo largo de más de dos décadas, hemos visto evolucionar la tecnología automotriz, pero nuestros valores fundamentales han permanecido intactos. No solo reparamos autos; construimos relaciones basadas en la transparencia.',
        quote: 'Nuestra mayor satisfacción no es solo arreglar un motor, sino ver la tranquilidad en el rostro de nuestros clientes cuando saben que su auto está en buenas manos.',
        p3: 'Es esa confianza la que hace que, hoy en día, tengamos clientes que viajan desde Salinas y otras ciudades lejanas solo para que nosotros nos encarguemos de sus vehículos. Saben que en RPM, la palabra vale tanto como el trabajo realizado.',
        founderRole: 'Fundador & Mecánico Maestro',
      },
      values: {
        title: 'Nuestros Valores',
        subtitle: 'Lo que nos ha mantenido en marcha durante más de 24 años.',
        items: [
          {
            title: 'Honestidad',
            desc: 'Diagnósticos claros y directos. Solo recomendamos lo que tu auto realmente necesita.',
          },
          {
            title: 'Experiencia desde 1999',
            desc: 'Más de dos décadas perfeccionando nuestro oficio y adaptándonos a cada nueva generación de vehículos.',
          },
          {
            title: 'Precios Justos',
            desc: 'Calidad de concesionario a precios competitivos. Creemos que la seguridad no debe ser un lujo.',
          },
        ],
      },
      cta: {
        title: '¿Listo para experimentar la diferencia?',
        subtitle: 'Únete a los cientos de clientes satisfechos que confían en nosotros para el cuidado de su vehículo.',
        button: 'Contáctanos hoy mismo',
      },
    },
  },
};
