'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Phone, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { siteConfig } from '@/lib/siteConfig';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section data-testid="hero-section" className="relative h-screen min-h-[850px] flex items-end overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full h-full"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster={siteConfig.images.heroBackground}
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </div>

      <div className="relative z-20 px-8 md:px-16 max-w-[1400px] mx-auto w-full pb-16 md:pb-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-[11px] uppercase tracking-[0.3em] text-white/40 font-medium mb-8"
          >
            {t.hero.badge}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-5xl md:text-[5.5rem] font-bold text-white leading-[0.95] mb-10 font-outfit tracking-[-0.03em]"
          >
            {t.hero.title}<br /><span className="text-white/50">{t.hero.location}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-base md:text-lg text-white/40 font-light mb-14 leading-relaxed max-w-lg"
          >
            {t.hero.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex gap-4"
          >
            <a href={`tel:${siteConfig.phone}`} data-testid="hero-call-btn">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-black px-8 py-3.5 text-[13px] uppercase tracking-[0.15em] font-medium transition-all flex items-center gap-3"
              >
                <Phone className="w-4 h-4" />
                {t.hero.ctaCall}
              </motion.button>
            </a>
            <a href={`sms:${siteConfig.phone}`} data-testid="hero-text-btn">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="border border-white/20 text-white px-8 py-3.5 text-[13px] uppercase tracking-[0.15em] font-medium hover:bg-white/5 transition-all flex items-center gap-3"
              >
                <MessageCircle className="w-4 h-4" />
                {t.hero.ctaText}
              </motion.button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
