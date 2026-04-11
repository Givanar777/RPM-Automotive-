export type Language = 'en' | 'es';

export const translations = {
  en: {
    nav: {
      services: 'Services',
      about: 'About Us',
      testimonials: 'Testimonials',
      contact: 'Contact',
      cta: 'CALL / TEXT US',
    },
    hero: {
      badge: 'Expert Automotive Care',
      title: 'Reliable Automotive Repair & Diagnostics in ',
      location: 'Santa Cruz, CA',
      subtitle: 'Expert service you can trust. Experienced mechanics, same-day diagnostics, and a 12-month warranty on parts and labor.',
      ctaCall: 'Call Now',
      ctaText: 'Text Us',
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
      description: "We've built our reputation on transparency, technical expertise, and a commitment to customer satisfaction in the Santa Cruz community.",
      rating: '4.9/5 Rating on Google',
      benefits: [
        {
          title: 'Expert Mechanics',
          description: 'Our team brings decades of hands-on experience.',
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
          title: 'Get a Diagnostic in 30 Min',
          description: 'Fast and thorough vehicle inspection.',
        },
        {
          title: '5-Star Reviews',
          description: 'Top-rated local shop by our loyal customers.',
        },
      ],
    },
    testimonials: {
      title: 'Customer Reviews',
      subtitle: 'Our reputation is built on honesty and quality work. See what our customers in Santa Cruz are saying about us.',
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
          quote: "I found my forever mechanic. The 12-month warranty gives me total peace of mind for my daughter's first car. Highly professional team.",
          author: "Linda R.",
          vehicle: "Honda Civic Owner",
        },
      ],
      viewMore: 'View more on',
    },
    contact: {
      title: 'Get In Touch',
      subtitle: "Call or text us to schedule your service. We'll get back to you right away.",
      callCta: 'Call Us Now',
      textCta: 'Text Us Now',
      form: {
        name: 'Full Name',
        namePlaceholder: 'e.g. John Doe',
        phone: 'Contact Phone (Required)',
        phonePlaceholder: '(831) 000-0000',
        email: 'Email Address',
        emailPlaceholder: 'you@email.com',
        vehicle: 'Vehicle Information',
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
        cta: 'Send Message',
        success: 'Message Sent!',
        successMsg: 'Thank you for contacting us. We will call or text you back shortly to confirm the details.',
      },
      info: {
        address: '110 Stanford Ave.',
        city: 'Santa Cruz, CA 95062',
        phone: '(831) 429-2096',
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
          cta: 'Call for an Estimate: (831) 429-2096',
        },
        {
          title: 'Brake & Safety Service',
          focus: 'Complete Brake Service, Shocks, Struts, Suspension',
          cta: 'Call for an Estimate: (831) 429-2096',
        },
        {
          title: 'Maintenance & Tune-Ups',
          focus: 'Oil Changes, Tune-Ups, Filter Replacements, Fluid Checks',
          cta: 'Call for an Estimate: (831) 429-2096',
        },
        {
          title: 'Cooling System',
          focus: 'Radiators, Water Pumps, Belts, Hoses',
          cta: 'Call for an Estimate: (831) 429-2096',
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
        title: 'The Legacy of Jose Trinidad Rios',
        p1: 'The history of RPM Auto Repair began in 1999, when Jose Trinidad Rios decided to turn his passion for engines into a commitment to his community. With little more than his tools and an unwavering desire to offer fair service, Jose opened the doors of what is now a benchmark of trust in Santa Cruz.',
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
        button: 'Call us today',
      },
    },
  },
  es: {
    nav: {
      services: 'Servicios',
      about: 'Nosotros',
      testimonials: 'Testimonios',
      contact: 'Contacto',
      cta: 'LLAMAR / TEXTAR',
    },
    hero: {
      badge: 'Cuidado Automotriz Experto',
      title: 'Reparacion y Diagnostico Automotriz en ',
      location: 'Santa Cruz, CA',
      subtitle: 'Servicio experto en el que puede confiar. Mecanicos experimentados, diagnosticos el mismo dia y garantia de 12 meses en piezas y mano de obra.',
      ctaCall: 'Llamar Ahora',
      ctaText: 'Enviar Texto',
      ctaServices: 'Ver Servicios',
    },
    stats: {
      experience: 'Mas de 24 Anos',
      experienceSub: 'de Experiencia',
      warranty: '12 Meses',
      warrantySub: 'de Garantia',
      google: '5 Estrellas',
      googleSub: 'en Google',
      diagnostic: '30 Min',
      diagnosticSub: 'Diagnostico',
    },
    services: {
      title: 'Servicios de Precision',
      general: {
        title: 'Reparacion General',
        items: [
          'Reparacion y Reemplazo de Frenos',
          'Suspension y Componentes de Direccion',
          'Amortiguadores y Puntales',
          'Inspecciones de Seguridad',
        ],
      },
      diagnostics: {
        title: 'Diagnosticos',
        items: [
          'Analisis de Luz de Motor (Check Engine)',
          'Solucion de Problemas del Sistema Electrico',
          'Escaneo y Programacion por Computadora',
          'Diagnosticos de Ajuste de Rendimiento',
        ],
      },
      maintenance: {
        title: 'Mantenimiento',
        items: [
          'Cambios de Aceite Recomendados de Fabrica',
          'Intervalos de Servicio 30k/60k/90k',
          'Lavado de Fluidos (Refrigerante, Frenos, Direccion)',
          'Rotacion y Balanceo de Llantas',
        ],
      },
    },
    trust: {
      title: 'La Diferencia de RPM',
      description: 'Hemos construido nuestra reputacion sobre la transparencia, la experiencia tecnica y el compromiso con la satisfaccion del cliente en la comunidad de Santa Cruz.',
      rating: 'Calificacion 4.9/5 en Google',
      benefits: [
        {
          title: 'Mecanicos Expertos',
          description: 'Nuestro equipo trae decadas de experiencia practica.',
        },
        {
          title: 'Garantia de 12 Meses',
          description: 'Confianza en cada reparacion que realizamos.',
        },
        {
          title: 'Servicio el Mismo Dia',
          description: 'Entrega rapida para la mayoria de las tareas de diagnostico.',
        },
        {
          title: 'Precios Honestos',
          description: 'Sin cargos ocultos ni ventas adicionales innecesarias.',
        },
        {
          title: 'Diagnostico en 30 Min',
          description: 'Inspeccion rapida y completa del vehiculo.',
        },
        {
          title: 'Opiniones de 5 Estrellas',
          description: 'Taller local mejor valorado por nuestros clientes leales.',
        },
      ],
    },
    testimonials: {
      title: 'Opiniones de Clientes',
      subtitle: 'Nuestra reputacion se basa en la honestidad y el trabajo de calidad. Mira lo que nuestros clientes en Santa Cruz dicen sobre nosotros.',
      items: [
        {
          quote: "RPM Automotive es el unico lugar al que llevo mi SUV. Son rapidos, honestos y explicaron exactamente que estaba mal con mis frenos sin intentar venderme nada extra.",
          author: "Maria G.",
          vehicle: "Propietaria de Toyota Highlander",
        },
        {
          quote: "El diagnostico el mismo dia fue un salvavidas. Se encendio una luz del motor durante mi trayecto; lo escanearon y pidieron la pieza en menos de una hora.",
          author: "James T.",
          vehicle: "Propietario de BMW Serie 3",
        },
        {
          quote: "Encontre a mi mecanico para siempre. La garantia de 12 meses me da total tranquilidad para el primer auto de mi hija. Equipo altamente profesional.",
          author: "Linda R.",
          vehicle: "Propietaria de Honda Civic",
        },
      ],
      viewMore: 'Ver mas en',
    },
    contact: {
      title: 'Contactanos',
      subtitle: 'Llamanos o envianos un texto para programar tu servicio. Te responderemos enseguida.',
      callCta: 'Llamar Ahora',
      textCta: 'Enviar Texto',
      form: {
        name: 'Nombre Completo',
        namePlaceholder: 'Ej. Juan Perez',
        phone: 'Telefono de Contacto (Obligatorio)',
        phonePlaceholder: '(831) 000-0000',
        email: 'Correo Electronico',
        emailPlaceholder: 'tu@email.com',
        vehicle: 'Informacion del Vehiculo',
        vehiclePlaceholder: 'Ano, Marca y Modelo (Ej. 2015 Toyota Camry)',
        serviceType: 'Que tipo de servicio necesitas?',
        services: [
          'Cambio de Aceite / Mantenimiento',
          'Frenos',
          'Diagnostico de Check Engine',
          'Suspension / Direccion',
          'Sistema de Enfriamiento',
          'Otro',
        ],
        problem: 'Cuentanos brevemente el problema',
        problemPlaceholder: 'Escucho un ruido al frenar... o Necesito mi servicio de las 60k millas.',
        cta: 'Enviar Mensaje',
        success: 'Mensaje Enviado!',
        successMsg: 'Gracias por contactarnos. Te llamaremos o enviaremos un texto pronto para confirmar los detalles.',
      },
      info: {
        address: '110 Stanford Ave.',
        city: 'Santa Cruz, CA 95062',
        phone: '(831) 429-2096',
        hours: 'Horario',
        weekdays: 'Lunes - Viernes: 8:00 AM - 5:00 PM',
        saturday: 'Sabado: 8:00 AM - 1:00 PM',
        sunday: 'Domingo: Cerrado',
      },
    },
    footer: {
      rights: 'Todos los derechos reservados.',
      privacy: 'Politica de Privacidad',
      terms: 'Terminos de Servicio',
      cookies: 'Politica de Cookies',
    },
    servicesPage: {
      hero: {
        title: 'Servicio Experto para Todos los Vehiculos Nacionales e Importados',
        subtitle: 'Desde diagnosticos complejos hasta mantenimiento de rutina, tenemos la experiencia y las herramientas para mantener su vehiculo en optimas condiciones.',
      },
      cards: [
        {
          title: 'Diagnostico y Electrico',
          focus: 'Diagnostico por Computadora, Luz de Motor, Alternadores, Arrancadores, Baterias',
          cta: 'Llamar para Presupuesto: (831) 429-2096',
        },
        {
          title: 'Servicio de Frenos y Seguridad',
          focus: 'Servicio Completo de Frenos, Amortiguadores, Puntales, Suspension',
          cta: 'Llamar para Presupuesto: (831) 429-2096',
        },
        {
          title: 'Mantenimiento y Afinaciones',
          focus: 'Cambios de Aceite, Afinaciones, Reemplazo de Filtros, Revision de Fluidos',
          cta: 'Llamar para Presupuesto: (831) 429-2096',
        },
        {
          title: 'Sistema de Enfriamiento',
          focus: 'Radiadores, Bombas de Agua, Correas, Mangueras',
          cta: 'Llamar para Presupuesto: (831) 429-2096',
        },
      ],
      maintenance: {
        title: 'El Mantenimiento Importa',
        text: 'Nos especializamos en el mantenimiento programado de fabrica para mantener valida su garantia y que su auto funcione por mas tiempo. Desde importaciones europeas hasta clasicos americanos, tenemos las herramientas para hacerlo bien.',
      },
    },
    about: {
      hero: {
        badge: 'Sobre Nosotros',
        title: 'Nuestra Historia: Pasion por la Mecanica desde 1999',
        subtitle: 'Mas que un taller, somos una familia dedicada a mantener la seguridad y el rendimiento de tu vehiculo con la honestidad que nos caracteriza.',
      },
      legacy: {
        title: 'El Legado de Jose Trinidad Rios',
        p1: 'La historia de RPM Auto Repair comenzo en 1999, cuando Jose Trinidad Rios decidio convertir su pasion por los motores en un compromiso con su comunidad. Con poco mas que sus herramientas y un deseo inquebrantable de ofrecer un servicio justo, Jose abrio las puertas de lo que hoy es un referente de confianza en Santa Cruz.',
        p2: 'A lo largo de mas de dos decadas, hemos visto evolucionar la tecnologia automotriz, pero nuestros valores fundamentales han permanecido intactos. No solo reparamos autos; construimos relaciones basadas en la transparencia.',
        quote: 'Nuestra mayor satisfaccion no es solo arreglar un motor, sino ver la tranquilidad en el rostro de nuestros clientes cuando saben que su auto esta en buenas manos.',
        p3: 'Es esa confianza la que hace que, hoy en dia, tengamos clientes que viajan desde Salinas y otras ciudades lejanas solo para que nosotros nos encarguemos de sus vehiculos. Saben que en RPM, la palabra vale tanto como el trabajo realizado.',
        founderRole: 'Fundador & Mecanico Maestro',
      },
      values: {
        title: 'Nuestros Valores',
        subtitle: 'Lo que nos ha mantenido en marcha durante mas de 24 anos.',
        items: [
          {
            title: 'Honestidad',
            desc: 'Diagnosticos claros y directos. Solo recomendamos lo que tu auto realmente necesita.',
          },
          {
            title: 'Experiencia desde 1999',
            desc: 'Mas de dos decadas perfeccionando nuestro oficio y adaptandonos a cada nueva generacion de vehiculos.',
          },
          {
            title: 'Precios Justos',
            desc: 'Calidad de concesionario a precios competitivos. Creemos que la seguridad no debe ser un lujo.',
          },
        ],
      },
      cta: {
        title: 'Listo para experimentar la diferencia?',
        subtitle: 'Unete a los cientos de clientes satisfechos que confian en nosotros para el cuidado de su vehiculo.',
        button: 'Llamanos hoy mismo',
      },
    },
  },
};
