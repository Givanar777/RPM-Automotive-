'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[85vh] md:h-[870px] md:min-h-[600px] flex items-center overflow-hidden pt-14 md:pt-0">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 md:via-slate-900/80 to-slate-900/60 md:to-transparent z-10"></div>
        <Image 
          alt="Interior de taller automotriz" 
          className="w-full h-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAA6R0uWFfXwqanmdIqV3T7F4Jp9olwxFIFFoyU1UWRBITpzaR2j6pads0jn6eYskbjcEda8RSo8Pxtk4Desmp20_BrmdMl7BL5eEmhj0An0mHjZ92PX6NJzLt7Q6FpZU8MM_50KwR485gwgzp-0QHpFKSaiUlz2GAqoFC13xKqrK2Q3FQcEWyRTwQ1rQ2TajKryOUMKHZgy19Xv3oEyZDmWEMZUwjNtFsU80EsFrqMVY2DKtYZtnZRKiuES8rmBqnkZDMsz95gxs1R" 
          fill
          priority
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="relative z-20 px-5 md:px-12 max-w-7xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <span className="inline-block bg-[#0059bb] px-3 py-1 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest rounded mb-4 md:mb-6">
            {t.hero.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold text-white leading-[1.15] mb-4 md:mb-6 font-arimo">
            {t.hero.title}<span className="text-[#0070ea]">{t.hero.location}</span>
          </h1>
          <p className="text-base md:text-xl text-slate-300 font-light mb-6 md:mb-10 leading-relaxed">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <a href="sms:8314292096" className="w-full sm:w-auto">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-[#0070ea] text-white px-6 md:px-8 py-3.5 md:py-4 rounded-lg font-bold text-base md:text-lg hover:translate-y-[-2px] shadow-lg shadow-primary/20 transition-all"
              >
                {t.hero.ctaRequest}
              </motion.button>
            </a>
            <a href="tel:8314292096" className="w-full sm:w-auto">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 md:px-8 py-3.5 md:py-4 rounded-lg font-bold text-base md:text-lg hover:bg-white/20 transition-all"
              >
                {t.hero.ctaServices}
              </motion.button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
