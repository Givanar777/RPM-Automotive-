'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative h-[870px] min-h-[600px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent z-10"></div>
        <Image 
          alt="Interior de taller automotriz" 
          className="w-full h-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAA6R0uWFfXwqanmdIqV3T7F4Jp9olwxFIFFoyU1UWRBITpzaR2j6pads0jn6eYskbjcEda8RSo8Pxtk4Desmp20_BrmdMl7BL5eEmhj0An0mHjZ92PX6NJzLt7Q6FpZU8MM_50KwR485gwgzp-0QHpFKSaiUlz2GAqoFC13xKqrK2Q3FQcEWyRTwQ1rQ2TajKryOUMKHZgy19Xv3oEyZDmWEMZUwjNtFsU80EsFrqMVY2DKtYZtnZRKiuES8rmBqnkZDMsz95gxs1R" 
          fill
          priority
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="relative z-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <span className="inline-block bg-[#0059bb] px-3 py-1 text-white text-xs font-bold uppercase tracking-widest rounded mb-6">
            {t.hero.badge}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6 font-arimo">
            {t.hero.title}<span className="text-[#0070ea]">{t.hero.location}</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-light mb-10 leading-relaxed">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contacto">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#0070ea] text-white px-8 py-4 rounded-lg font-bold text-lg hover:translate-y-[-2px] shadow-lg shadow-primary/20 transition-all"
              >
                {t.hero.ctaRequest}
              </motion.button>
            </Link>
            <Link href="/#servicios">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-all"
              >
                {t.hero.ctaServices}
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
