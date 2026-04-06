'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Phone, Activity, Disc, Wrench, Thermometer, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

export default function ServiciosPage() {
  const { t } = useLanguage();

  const icons = [Activity, Disc, Wrench, Thermometer];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 md:pt-32 pb-10 md:pb-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-5 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-6xl font-black text-slate-900 mb-4 md:mb-6 font-arimo tracking-tight">
              {t.servicesPage.hero.title}
            </h1>
            <p className="text-base md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {t.servicesPage.hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-24 max-w-7xl mx-auto px-5 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {t.servicesPage.cards.map((card, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-slate-200 rounded-2xl md:rounded-3xl p-5 md:p-10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-50 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-8 group-hover:bg-blue-600 transition-colors duration-300">
                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 md:mb-4 font-arimo">{card.title}</h3>
                  <div className="flex items-start gap-2 md:gap-3 mb-4 md:mb-8">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-green-500 mt-0.5 shrink-0" />
                    <p className="text-slate-600 leading-relaxed italic text-sm md:text-base">
                      {card.focus}
                    </p>
                  </div>
                </div>
                
                <a 
                  href="tel:8314292096"
                  className="w-full bg-[#008000] hover:bg-[#006600] text-white py-3.5 md:py-5 rounded-xl md:rounded-2xl font-black text-center transition-all flex items-center justify-center gap-2 md:gap-3 shadow-lg shadow-green-200 hover:shadow-green-300 tracking-tight text-sm md:text-base"
                >
                  <Phone className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                  {card.cta}
                </a>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Maintenance Matters Section */}
      <section className="py-12 md:py-20 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 skew-x-12 transform translate-x-32" />
        <div className="max-w-7xl mx-auto px-5 md:px-12 relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 font-arimo">
              {t.servicesPage.maintenance.title}
            </h2>
            <p className="text-base md:text-xl text-slate-300 leading-relaxed mb-6 md:mb-8">
              {t.servicesPage.maintenance.text}
            </p>
            <div className="flex flex-wrap gap-2 md:gap-4">
              <div className="bg-white/10 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold border border-white/20">European Imports</div>
              <div className="bg-white/10 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold border border-white/20">American Classics</div>
              <div className="bg-white/10 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold border border-white/20">Domestic & Foreign</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
