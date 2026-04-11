'use client';

import React from 'react';
import { Shield, Gauge, Handshake, SearchCheck, MessageSquare, Star, Wrench } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';

export default function Trust() {
  const { t } = useLanguage();

  const icons = [Wrench, Shield, Gauge, Handshake, SearchCheck, MessageSquare];

  return (
    <section data-testid="trust-section" className="py-32 border-y border-white/5">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        <div className="grid lg:grid-cols-12 gap-20">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <div className="text-[11px] uppercase tracking-[0.3em] text-white/30 font-medium mb-4">Why RPM</div>
            <h2 className="text-4xl md:text-5xl font-bold font-outfit tracking-tight text-white mb-8">{t.trust.title}</h2>
            <p className="text-white/35 text-lg leading-relaxed mb-10">
              {t.trust.description}
            </p>
            <div className="flex items-center gap-3">
              <div className="flex text-white/30">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-white/40 text-sm">{t.trust.rating}</span>
            </div>
          </motion.div>
          
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-px bg-white/5">
            {t.trust.benefits.map((benefit, index) => {
              const Icon = icons[index];
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.06 }}
                  viewport={{ once: true }}
                  className="bg-[#0B1929] p-6 flex flex-col group hover:bg-white/[0.02] transition-all duration-500"
                  data-testid={`trust-benefit-${index}`}
                >
                  <Icon className="w-5 h-5 text-white/15 mb-4 group-hover:text-white/40 transition-colors duration-500" />
                  <h4 className="font-medium text-sm text-white mb-2 tracking-tight">{benefit.title}</h4>
                  <p className="text-[13px] text-white/25 leading-relaxed group-hover:text-white/40 transition-colors duration-500">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
