'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Phone, Activity, Disc, Wrench, Thermometer, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { siteConfig } from '@/lib/siteConfig';

export default function ServiciosPage() {
  const { language, t } = useLanguage();
  const icons = [Activity, Disc, Wrench, Thermometer];

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
            <source src={language === 'es' ? '/hero-servicios.mp4' : '/hero-services.mp4'} type="video/mp4" />
          </video>
        </div>
        <div className="relative z-20 px-8 md:px-16 max-w-[1400px] mx-auto w-full pb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}>
            <div className="text-[11px] uppercase tracking-[0.3em] text-white/40 font-medium mb-6">Our Expertise</div>
            <h1 className="text-5xl md:text-[5rem] font-bold text-white font-outfit tracking-[-0.03em] leading-[0.95] mb-8 max-w-4xl">
              {t.servicesPage.hero.title}
            </h1>
            <p className="text-base md:text-lg text-white/40 max-w-2xl leading-relaxed">
              {t.servicesPage.hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-32 max-w-[1400px] mx-auto px-8 md:px-16">
        <div className="grid md:grid-cols-2 gap-px bg-white/5">
          {t.servicesPage.cards.map((card, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                data-testid={`services-page-card-${index}`}
                className="bg-[#0B1929] p-10 md:p-14 flex flex-col justify-between group hover:bg-white/[0.02] transition-all duration-500"
              >
                <div>
                  <Icon className="w-5 h-5 text-white/15 mb-10 group-hover:text-white/40 transition-colors duration-500" />
                  <h3 className="text-2xl font-bold text-white mb-4 font-outfit tracking-tight">{card.title}</h3>
                  <div className="flex items-start gap-3 mb-10">
                    <ChevronRight className="w-4 h-4 text-white/20 mt-0.5 shrink-0" />
                    <p className="text-white/35 leading-relaxed text-[15px]">{card.focus}</p>
                  </div>
                </div>
                <a 
                  href={`tel:${siteConfig.phone}`}
                  data-testid={`services-call-btn-${index}`}
                  className="inline-flex items-center gap-3 text-[13px] uppercase tracking-[0.15em] text-white/30 hover:text-white transition-colors duration-300"
                >
                  <Phone className="w-4 h-4" />
                  {card.cta}
                </a>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Maintenance */}
      <section className="py-32 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <div className="text-[11px] uppercase tracking-[0.3em] text-white/30 font-medium mb-6">Specialization</div>
              <h2 className="text-4xl md:text-5xl font-bold font-outfit tracking-tight text-white mb-8">
                {t.servicesPage.maintenance.title}
              </h2>
              <p className="text-lg text-white/35 leading-relaxed">
                {t.servicesPage.maintenance.text}
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex flex-col gap-px bg-white/5">
              {['European Imports', 'American Classics', 'Domestic & Foreign'].map((item) => (
                <div key={item} className="bg-[#0B1929] px-8 py-6 flex items-center justify-between group hover:bg-white/[0.02] transition-all duration-500">
                  <span className="text-white/50 text-[15px] group-hover:text-white/70 transition-colors duration-500">{item}</span>
                  <ChevronRight className="w-4 h-4 text-white/15 group-hover:text-white/40 transition-colors duration-500" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold font-outfit tracking-tight text-white mb-10">
              {t.contact.title}
            </h2>
            <a href={`tel:${siteConfig.phone}`}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-black px-10 py-4 text-[13px] uppercase tracking-[0.15em] font-medium transition-all inline-flex items-center gap-3"
              >
                <Phone className="w-4 h-4" />
                {siteConfig.phoneFormatted}
              </motion.button>
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
