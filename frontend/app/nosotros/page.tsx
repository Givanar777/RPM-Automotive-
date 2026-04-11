'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ShieldCheck, History, BadgeDollarSign, Phone } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { siteConfig } from '@/lib/siteConfig';

export default function Nosotros() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[#0B1929]">
      <Navbar />
      
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <span className="inline-block text-[#B0BEC5] font-bold uppercase tracking-[0.2em] text-xs mb-4">
              {t.about.hero.badge}
            </span>
            <h1 className="text-4xl md:text-6xl font-black font-outfit text-white leading-[1.05] tracking-tighter mb-6">
              {t.about.hero.title}
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed">{t.about.hero.subtitle}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[#0F2640] border-y border-[#1A3652]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6 text-slate-400 leading-relaxed text-lg">
              <h2 className="text-3xl font-black text-white font-outfit tracking-tight mb-4">{t.about.legacy.title}</h2>
              <p>{t.about.legacy.p1}</p>
              <p>{t.about.legacy.p2}</p>
              <div className="bg-[#B0BEC5]/5 border-l-4 border-[#B0BEC5] p-6 italic text-slate-300">
                &quot;{t.about.legacy.quote}&quot;
              </div>
              <p>{t.about.legacy.p3}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#1A3652] group">
              <Image src={siteConfig.images.founder} alt="Jose Trinidad Rios - Founder" fill className="object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1929]/80 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-2xl font-black font-outfit">Jose Trinidad Rios</p>
                <p className="text-slate-400 uppercase tracking-[0.2em] text-xs font-bold">{t.about.legacy.founderRole}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black font-outfit text-white tracking-tight mb-4">{t.about.values.title}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">{t.about.values.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: t.about.values.items[0].title, desc: t.about.values.items[0].desc },
              { icon: History, title: t.about.values.items[1].title, desc: t.about.values.items[1].desc },
              { icon: BadgeDollarSign, title: t.about.values.items[2].title, desc: t.about.values.items[2].desc },
            ].map((value, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} data-testid={`about-value-${i}`}
                className="bg-[#0F2640] p-10 rounded-xl border border-[#1A3652] hover:border-[#B0BEC5]/30 transition-all text-center group"
              >
                <div className="w-14 h-14 bg-[#B0BEC5]/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#B0BEC5]/20 transition-colors">
                  <value.icon className="w-7 h-7 text-[#B0BEC5]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 font-outfit">{value.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="bg-gradient-to-br from-[#0F2640] to-[#1A3652] rounded-2xl p-12 md:p-20 text-center text-white relative overflow-hidden border border-[#1A3652]"
          >
            <h2 className="text-3xl md:text-5xl font-black font-outfit mb-8 tracking-tight relative z-10">{t.about.cta.title}</h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto relative z-10">{t.about.cta.subtitle}</p>
            <a href={`tel:${siteConfig.phone}`} className="inline-block relative z-10" data-testid="about-cta-call">
              <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-md border border-[#B0BEC5]/40 text-white px-10 py-5 rounded-xl font-bold text-xl shadow-lg shadow-[#B0BEC5]/20 hover:bg-[#B0BEC5]/90 transition-all flex items-center gap-3"
              >
                <Phone className="w-6 h-6" />
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
