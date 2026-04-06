'use client';

import React from 'react';
import { Shield, Gauge, Handshake, MessageSquare, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';

export default function Trust() {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: Shield,
      title: t.trust.benefits[1].title,
      description: t.trust.benefits[1].description,
    },
    {
      icon: Gauge,
      title: t.trust.benefits[2].title,
      description: t.trust.benefits[2].description,
    },
    {
      icon: Handshake,
      title: t.trust.benefits[3].title,
      description: t.trust.benefits[3].description,
    },
    {
      icon: MessageSquare,
      title: t.trust.benefits[5].title,
      description: t.trust.benefits[5].description,
    },
  ];

  return (
    <section className="bg-[#f0eded] py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        <div className="grid lg:grid-cols-12 gap-4 md:gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 flex flex-col justify-center"
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 font-arimo">{t.trust.title}</h2>
            <p className="text-slate-600 mb-6 md:mb-8 text-base md:text-lg">
              {t.trust.description}
            </p>
            <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-white rounded-lg shadow-sm">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                ))}
              </div>
              <span className="font-bold text-sm md:text-base">{t.trust.rating}</span>
            </div>
          </motion.div>
          
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-4 md:p-6 rounded-xl border border-slate-200 flex flex-col items-center text-center hover:shadow-md transition-shadow"
              >
                <benefit.icon className="w-8 h-8 md:w-10 md:h-10 text-[#0059bb] mb-2 md:mb-4" />
                <h4 className="font-bold text-sm md:text-base mb-1 md:mb-2">{benefit.title}</h4>
                <p className="text-xs md:text-sm text-slate-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
