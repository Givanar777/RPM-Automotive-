'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Phone, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { siteConfig } from '@/lib/siteConfig';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section data-testid="hero-section" className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/45 z-10"></div>
        <Image 
          alt="RPM Auto Repair Shop" 
          className="w-full h-full object-cover" 
          src={siteConfig.images.heroBackground}
          fill
          priority
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="relative z-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <span className="inline-block bg-[#0070ea] px-4 py-1.5 text-white text-xs font-bold uppercase tracking-[0.2em] rounded mb-8">
            {t.hero.badge}
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] mb-6 font-outfit tracking-tighter">
            {t.hero.title}<span className="text-[#0070ea]">{t.hero.location}</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 font-light mb-12 leading-relaxed max-w-xl">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={`tel:${siteConfig.phone}`} data-testid="hero-call-btn">
              <motion.button 
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#0070ea] text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg shadow-blue-500/20 transition-all flex items-center gap-3"
              >
                <Phone className="w-5 h-5" />
                {t.hero.ctaCall}
              </motion.button>
            </a>
            <a href={`sms:${siteConfig.phone}`} data-testid="hero-text-btn">
              <motion.button 
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-all flex items-center gap-3"
              >
                <MessageCircle className="w-5 h-5" />
                {t.hero.ctaText}
              </motion.button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
