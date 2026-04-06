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
      items: t.services.general.items,
    },
    {
      icon: Monitor,
      title: t.services.diagnostics.title,
      items: t.services.diagnostics.items,
    },
    {
      icon: Calendar,
      title: t.services.maintenance.title,
      items: t.services.maintenance.items,
    },
  ];

  return (
    <section id="servicios" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 font-arimo">{t.services.title}</h2>
        <div className="h-1.5 w-24 bg-[#0070ea]"></div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-xl transition-shadow group"
          >
            <div className="mb-6">
              <service.icon className="w-10 h-10 text-[#0059bb] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold">{service.title}</h3>
            </div>
            <ul className="space-y-4 text-slate-600">
              {service.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0059bb] shrink-0 mt-0.5" />
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
