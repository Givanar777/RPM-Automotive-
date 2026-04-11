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
    <section data-testid="stats-section" className="bg-zinc-950 py-10 border-y border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center lg:text-left">
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
              <div className="w-12 h-12 rounded-full bg-[#0070ea]/15 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-[#0070ea]" />
              </div>
              <div>
                <div className="text-2xl font-black text-white font-outfit tracking-tight">{stat.title}</div>
                <div className="text-zinc-500 text-xs uppercase tracking-[0.2em] font-bold">{stat.subtitle}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
