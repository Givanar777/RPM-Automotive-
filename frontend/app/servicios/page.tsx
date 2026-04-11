'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Phone, Activity, Disc, Wrench, Thermometer, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { siteConfig } from '@/lib/siteConfig';

export default function ServiciosPage() {
  const { t } = useLanguage();
  const icons = [Activity, Disc, Wrench, Thermometer];

  return (
    <main className="min-h-screen bg-[#0B1929]">
      <Navbar />
      
      <section className="pt-32 pb-20 bg-[#0F2640] border-b border-[#1A3652]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 font-outfit tracking-tighter">
              {t.servicesPage.hero.title}
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              {t.servicesPage.hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-6">
          {t.servicesPage.cards.map((card, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                data-testid={`services-page-card-${index}`}
                className="bg-[#0F2640] border border-[#1A3652] rounded-2xl p-8 md:p-10 hover:border-[#38BDF8]/30 hover:shadow-lg hover:shadow-[#38BDF8]/5 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 bg-[#38BDF8]/10 rounded-xl flex items-center justify-center mb-8 group-hover:bg-[#38BDF8]/20 transition-colors">
                    <Icon className="w-7 h-7 text-[#38BDF8]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 font-outfit">{card.title}</h3>
                  <div className="flex items-start gap-3 mb-8">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                    <p className="text-slate-400 leading-relaxed italic text-sm">{card.focus}</p>
                  </div>
                </div>
                <a 
                  href={`tel:${siteConfig.phone}`}
                  data-testid={`services-call-btn-${index}`}
                  className="w-full bg-[#38BDF8] hover:bg-[#38BDF8]/90 text-[#0B1929] py-4 rounded-xl font-bold text-center transition-all flex items-center justify-center gap-3"
                >
                  <Phone className="w-5 h-5" />
                  {card.cta}
                </a>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="py-20 bg-[#0F2640] border-t border-[#1A3652] overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-black mb-6 font-outfit tracking-tight text-white">
              {t.servicesPage.maintenance.title}
            </h2>
            <p className="text-xl text-slate-400 leading-relaxed mb-8">
              {t.servicesPage.maintenance.text}
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="bg-[#38BDF8]/10 px-4 py-2 rounded-full text-sm font-bold border border-[#38BDF8]/20 text-[#38BDF8]">European Imports</div>
              <div className="bg-[#38BDF8]/10 px-4 py-2 rounded-full text-sm font-bold border border-[#38BDF8]/20 text-[#38BDF8]">American Classics</div>
              <div className="bg-[#38BDF8]/10 px-4 py-2 rounded-full text-sm font-bold border border-[#38BDF8]/20 text-[#38BDF8]">Domestic & Foreign</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
