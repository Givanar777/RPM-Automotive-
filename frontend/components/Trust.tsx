'use client';

import React from 'react';
import { Shield, Gauge, Handshake, SearchCheck, MessageSquare, Star, Wrench } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';

export default function Trust() {
  const { t } = useLanguage();

  const icons = [Wrench, Shield, Gauge, Handshake, SearchCheck, MessageSquare];

  return (
    <section data-testid="trust-section" className="bg-[#0F2640] py-24 border-y border-[#1A3652]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 flex flex-col justify-center"
          >
            <h2 className="text-3xl md:text-4xl font-black mb-6 font-outfit tracking-tight text-white">{t.trust.title}</h2>
            <p className="text-slate-400 mb-8 text-lg leading-relaxed">
              {t.trust.description}
            </p>
            <div className="flex items-center gap-4 p-4 bg-[#1A3652]/50 rounded-lg border border-[#1A3652]">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="font-bold text-sm text-slate-300">{t.trust.rating}</span>
            </div>
          </motion.div>
          
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {t.trust.benefits.map((benefit, index) => {
              const Icon = icons[index];
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="bg-[#0B1929] p-6 rounded-xl border border-[#1A3652] flex flex-col items-center text-center hover:border-[#B0BEC5]/30 hover:shadow-md hover:shadow-[#B0BEC5]/5 transition-all"
                  data-testid={`trust-benefit-${index}`}
                >
                  <Icon className="w-8 h-8 text-[#B0BEC5] mb-3" />
                  <h4 className="font-bold mb-1 text-sm font-outfit text-white">{benefit.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
