'use client';

import React from 'react';
import { Wrench, Monitor, Calendar, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';

export default function Services() {
  const { t } = useLanguage();

  const services = [
    { icon: Wrench, title: t.services.general.title, items: t.services.general.items },
    { icon: Monitor, title: t.services.diagnostics.title, items: t.services.diagnostics.items },
    { icon: Calendar, title: t.services.maintenance.title, items: t.services.maintenance.items },
  ];

  return (
    <section id="servicios" data-testid="services-section" className="py-32 px-8 md:px-16 max-w-[1400px] mx-auto">
      <div className="mb-20">
        <div className="text-[11px] uppercase tracking-[0.3em] text-white/30 font-medium mb-4">Our Expertise</div>
        <h2 className="text-4xl md:text-5xl font-bold font-outfit tracking-tight text-white">{t.services.title}</h2>
      </div>
      
      <div className="grid md:grid-cols-3 gap-px bg-white/5">
        {services.map((service, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.15 }}
            viewport={{ once: true }}
            className="bg-[#0B1929] p-10 group hover:bg-white/[0.02] transition-all duration-500"
            data-testid={`service-card-${index}`}
          >
            <service.icon className="w-5 h-5 text-white/20 mb-8 group-hover:text-white/50 transition-colors duration-500" />
            <h3 className="text-lg font-medium font-outfit text-white mb-6 tracking-tight">{service.title}</h3>
            <ul className="space-y-4">
              {service.items.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/35 text-sm group-hover:text-white/50 transition-colors duration-500">
                  <ChevronRight className="w-3 h-3 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
