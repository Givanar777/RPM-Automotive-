'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Phone } from 'lucide-react';
import Navbar from '@/components/Navbar';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { siteConfig } from '@/lib/siteConfig';

export default function ContactoPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[#0B1929]">
      <Navbar />

      {/* Video Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1929] via-black/30 to-black/20 z-10" />
          <video
            autoPlay muted loop playsInline
            preload="auto"
            className="w-full h-full object-cover"
          >
            <source src="/hero-contact.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="relative z-20 px-8 md:px-16 max-w-[1400px] mx-auto w-full pb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}>
            <div className="text-[11px] uppercase tracking-[0.3em] text-white/40 font-medium mb-6">Get In Touch</div>
            <h1 className="text-5xl md:text-[5rem] font-bold text-white font-outfit tracking-[-0.03em] leading-[0.95] mb-8 max-w-3xl">
              {t.contact.title}
            </h1>
            <a href={`tel:${siteConfig.phone}`} className="inline-flex items-center gap-3 text-white/50 hover:text-white text-base transition-colors">
              <Phone className="w-4 h-4" />
              {siteConfig.phoneFormatted}
            </a>
          </motion.div>
        </div>
      </section>

      <ContactForm />
      <Footer />
    </main>
  );
}
