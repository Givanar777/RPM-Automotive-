'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ShieldCheck, History, BadgeDollarSign, Phone, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { siteConfig } from '@/lib/siteConfig';

export default function Nosotros() {
  const { language, t } = useLanguage();

  return (
    <main className="min-h-screen bg-[#0B1929]">
      <Navbar />
      
      {/* Video Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1929] via-black/30 to-black/20 z-10" />
          <video
            autoPlay muted loop playsInline
            preload="auto"
            className="w-full h-full object-cover"
            key={language}
          >
            <source src={language === 'es' ? '/hero-nosotros.mp4' : '/hero-aboutus.mp4'} type="video/mp4" />
          </video>
        </div>
        <div className="relative z-20 px-8 md:px-16 max-w-[1400px] mx-auto w-full pb-16">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-[11px] uppercase tracking-[0.3em] text-white/40 font-medium mb-6"
            >
              {t.about.hero.badge}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-5xl md:text-[5rem] font-bold font-outfit text-white leading-[0.95] tracking-[-0.03em] mb-8"
            >
              {t.about.hero.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-base md:text-lg text-white/40 leading-relaxed"
            >
              {t.about.hero.subtitle}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Legacy Section */}
      <section className="py-32 border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <div className="text-[11px] uppercase tracking-[0.3em] text-white/30 font-medium mb-6">Heritage</div>
              <h2 className="text-4xl font-bold text-white font-outfit tracking-tight mb-10">{t.about.legacy.title}</h2>
              <div className="space-y-6 text-white/35 leading-relaxed text-[16px]">
                <p>{t.about.legacy.p1}</p>
                <p>{t.about.legacy.p2}</p>
                <div className="border-l border-white/10 pl-8 py-4 my-10">
                  <p className="italic text-white/50 text-lg leading-relaxed">
                    &quot;{t.about.legacy.quote}&quot;
                  </p>
                </div>
                <p>{t.about.legacy.p3}</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="relative aspect-[3/4] overflow-hidden group sticky top-32">
              <Image src={siteConfig.images.founder} alt="Jose Trinidad Rios - Founder" fill className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10">
                <p className="text-xl font-bold font-outfit text-white">Jose Trinidad Rios</p>
                <p className="text-[11px] text-white/40 uppercase tracking-[0.2em] mt-1">{t.about.legacy.founderRole}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <div className="mb-20">
            <div className="text-[11px] uppercase tracking-[0.3em] text-white/30 font-medium mb-4">Principles</div>
            <h2 className="text-4xl md:text-5xl font-bold font-outfit text-white tracking-tight">{t.about.values.title}</h2>
            <p className="text-white/30 mt-4 max-w-xl text-lg">{t.about.values.subtitle}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-px bg-white/5">
            {[
              { icon: ShieldCheck, title: t.about.values.items[0].title, desc: t.about.values.items[0].desc },
              { icon: History, title: t.about.values.items[1].title, desc: t.about.values.items[1].desc },
              { icon: BadgeDollarSign, title: t.about.values.items[2].title, desc: t.about.values.items[2].desc },
            ].map((value, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }} viewport={{ once: true }} data-testid={`about-value-${i}`}
                className="bg-[#0B1929] p-10 group hover:bg-white/[0.02] transition-all duration-500"
              >
                <value.icon className="w-5 h-5 text-white/15 mb-8 group-hover:text-white/40 transition-colors duration-500" />
                <h3 className="text-lg font-medium text-white mb-3 font-outfit tracking-tight">{value.title}</h3>
                <p className="text-white/25 leading-relaxed text-[15px] group-hover:text-white/40 transition-colors duration-500">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold font-outfit tracking-tight text-white mb-6">{t.about.cta.title}</h2>
            <p className="text-lg text-white/30 mb-12 max-w-xl mx-auto">{t.about.cta.subtitle}</p>
            <a href={`tel:${siteConfig.phone}`} data-testid="about-cta-call">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="bg-white text-black px-10 py-4 text-[13px] uppercase tracking-[0.15em] font-medium transition-all inline-flex items-center gap-3"
              >
                <Phone className="w-4 h-4" />
                {t.about.cta.button}
              </motion.button>
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
