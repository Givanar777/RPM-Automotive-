'use client';

import React from 'react';
import { Award, Shield, Gauge, Handshake, SearchCheck, MessageSquare, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';

export default function Trust() {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: Award,
      title: t.trust.benefits[0].title,
      description: t.trust.benefits[0].description,
    },
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
      icon: SearchCheck,
      title: t.trust.benefits[4].title,
      description: t.trust.benefits[4].description,
    },
    {
      icon: MessageSquare,
      title: t.trust.benefits[5].title,
      description: t.trust.benefits[5].description,
    },
  ];

  return (
    <section className="bg-[#f0eded] py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 flex flex-col justify-center"
          >
            <h2 className="text-4xl font-bold mb-6 font-arimo">{t.trust.title}</h2>
            <p className="text-slate-600 mb-8 text-lg">
              {t.trust.description}
            </p>
            <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="font-bold">{t.trust.rating}</span>
            </div>
          </motion.div>
          
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col items-center text-center hover:shadow-md transition-shadow"
              >
                <benefit.icon className="w-10 h-10 text-[#0059bb] mb-4" />
                <h4 className="font-bold mb-2">{benefit.title}</h4>
                <p className="text-sm text-slate-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
