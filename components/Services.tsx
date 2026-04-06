'use client';

import React from 'react';
import { Wrench, Monitor, Calendar, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Wrench,
      title: t.services.general.title,
      description: t.services.general.description,
      items: t.services.general.items,
    },
    {
      icon: Monitor,
      title: t.services.diagnostics.title,
      description: t.services.diagnostics.description,
      items: t.services.diagnostics.items,
    },
    {
      icon: Calendar,
      title: t.services.maintenance.title,
      description: t.services.maintenance.description,
      items: t.services.maintenance.items,
    },
  ];

  return (
    <section id="servicios" className="py-12 md:py-24 px-5 md:px-12 max-w-7xl mx-auto">
      <div className="mb-8 md:mb-16">
        <h2 className="text-2xl md:text-5xl font-bold mb-3 md:mb-4 font-arimo">{t.services.title}</h2>
        <div className="h-1 md:h-1.5 w-16 md:w-24 bg-[#0070ea]"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        {services.map((service, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-5 md:p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-xl transition-shadow group"
          >
            <div className="mb-4 md:mb-6">
              <service.icon className="w-8 h-8 md:w-10 md:h-10 text-[#0059bb] mb-3 md:mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl md:text-2xl font-bold">{service.title}</h3>
              <p className="text-xs md:text-sm text-[#0070ea] font-medium mt-1">{service.description}</p>
            </div>
            <ul className="space-y-3 md:space-y-4 text-slate-600 text-sm md:text-base">
              {service.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 md:gap-3">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-[#0059bb] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
