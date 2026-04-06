'use client';

import React from 'react';
import { History, ShieldCheck, Star, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';

export default function Stats() {
  const { t } = useLanguage();

  const stats = [
    {
      icon: History,
      title: t.stats.experience,
      subtitle: t.stats.experienceSub,
    },
    {
      icon: ShieldCheck,
      title: t.stats.warranty,
      subtitle: t.stats.warrantySub,
    },
    {
      icon: Star,
      title: t.stats.google,
      subtitle: t.stats.googleSub,
    },
    {
      icon: Zap,
      title: t.stats.diagnostic,
      subtitle: t.stats.diagnosticSub,
    },
  ];

  return (
    <section className="bg-[#1c1b1b] py-6 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 text-center lg:text-left">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col lg:flex-row items-center gap-2 md:gap-4"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#0059bb]/20 flex items-center justify-center">
                <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-[#0070ea]" />
              </div>
              <div>
                <div className="text-base md:text-2xl font-bold text-white leading-tight">{stat.title}</div>
                <div className="text-slate-400 text-[10px] md:text-sm uppercase tracking-wider md:tracking-widest">{stat.subtitle}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
