'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ShieldCheck, History, BadgeDollarSign, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

export default function Nosotros() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[#fcf9f8]">
      <Navbar />
      
      {/* Section 1: Hero */}
      <section className="relative pt-24 pb-12 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-100/50 -z-10 skew-x-12 transform translate-x-20" />
        <div className="max-w-7xl mx-auto px-5 md:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-block text-[#0070ea] font-bold uppercase tracking-widest text-xs md:text-sm mb-3 md:mb-4">
              {t.about.hero.badge}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold font-arimo text-slate-900 leading-tight mb-4 md:mb-6">
              {t.about.hero.title}
            </h1>
            <p className="text-base md:text-xl text-slate-600 leading-relaxed font-light">
              {t.about.hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 2: History & Founder */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-12">
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12 items-start">
            {/* Image - narrower newspaper column style on desktop */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] md:aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl group order-1 lg:order-1 lg:col-span-1"
            >
              <Image 
                src="/images/rpm-shop-team.jpeg" 
                alt="RPM Auto Repair - Professional mechanic in our fully-equipped Milpitas shop"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 text-white">
                <p className="text-lg md:text-2xl font-bold font-arimo">RPM Auto Repair</p>
                <p className="text-slate-200 uppercase tracking-widest text-xs md:text-sm">{t.about.legacy.founderRole}</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4 md:space-y-6 text-slate-600 leading-relaxed text-base md:text-lg order-2 lg:order-2 lg:col-span-2"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-arimo mb-2 md:mb-4">{t.about.legacy.title}</h2>
              <p>
                {t.about.legacy.p1}
              </p>
              <p>
                {t.about.legacy.p2}
              </p>
              <div className="bg-[#0070ea]/5 border-l-4 border-[#0070ea] p-4 md:p-6 italic text-sm md:text-base">
                &quot;{t.about.legacy.quote}&quot;
              </div>
              <p>
                {t.about.legacy.p3}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: Values */}
      <section className="py-12 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-5 md:px-12">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold font-arimo text-slate-900 mb-3 md:mb-4">{t.about.values.title}</h2>
            <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto px-2">{t.about.values.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {[
              {
                icon: ShieldCheck,
                title: t.about.values.items[0].title,
                desc: t.about.values.items[0].desc
              },
              {
                icon: History,
                title: t.about.values.items[1].title,
                desc: t.about.values.items[1].desc
              },
              {
                icon: BadgeDollarSign,
                title: t.about.values.items[2].title,
                desc: t.about.values.items[2].desc
              }
            ].map((value, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 md:p-10 rounded-xl md:rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow text-center group"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 bg-[#0070ea]/10 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:bg-[#0070ea] transition-colors">
                  <value.icon className="w-6 h-6 md:w-8 md:h-8 text-[#0070ea] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 md:mb-4">{value.title}</h3>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 md:py-20">
        <div className="max-w-5xl mx-auto px-5 md:px-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#0070ea] rounded-2xl md:rounded-3xl p-8 md:p-20 text-center text-white shadow-xl md:shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-arimo mb-4 md:mb-8 relative z-10 text-balance">{t.about.cta.title}</h2>
            <p className="text-base md:text-xl text-blue-100 mb-6 md:mb-10 max-w-2xl mx-auto relative z-10">
              {t.about.cta.subtitle}
            </p>
            <Link href="/contacto" className="inline-block mx-auto relative z-10">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#0070ea] px-6 py-4 md:px-10 md:py-5 rounded-xl font-bold text-base md:text-xl shadow-xl hover:bg-blue-50 transition-colors flex items-center gap-2 md:gap-3"
              >
                {t.about.cta.button}
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
