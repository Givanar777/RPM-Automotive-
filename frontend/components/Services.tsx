'use client';

import React from 'react';
import { Wrench, Monitor, Calendar, CheckCircle2 } from 'lucide-react';
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
    <section id="servicios" data-testid="services-section" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl font-black mb-4 font-outfit tracking-tight">{t.services.title}</h2>
        <div className="h-1 w-20 bg-[#0070ea]"></div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl border border-zinc-200 hover:border-zinc-300 hover:shadow-lg transition-all group"
            data-testid={`service-card-${index}`}
          >
            <div className="mb-6">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#0070ea] transition-colors">
                <service.icon className="w-6 h-6 text-[#0070ea] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold font-outfit">{service.title}</h3>
            </div>
            <ul className="space-y-3 text-zinc-600">
              {service.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#0070ea] shrink-0 mt-1" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
