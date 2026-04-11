'use client';

import React from 'react';
import { History, ShieldCheck, Star, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';

export default function Stats() {
  const { t } = useLanguage();

  const stats = [
    { icon: History, title: t.stats.experience, subtitle: t.stats.experienceSub },
    { icon: ShieldCheck, title: t.stats.warranty, subtitle: t.stats.warrantySub },
    { icon: Star, title: t.stats.google, subtitle: t.stats.googleSub },
    { icon: Zap, title: t.stats.diagnostic, subtitle: t.stats.diagnosticSub },
  ];

  return (
    <section data-testid="stats-section" className="bg-black py-14 border-y border-white/5">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center lg:text-left">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col lg:flex-row items-center gap-4"
              data-testid={`stat-item-${index}`}
            >
              <stat.icon className="w-5 h-5 text-white/20" />
              <div>
                <div className="text-xl font-bold text-white font-outfit tracking-tight">{stat.title}</div>
                <div className="text-white/30 text-[11px] uppercase tracking-[0.2em]">{stat.subtitle}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
