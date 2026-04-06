'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MapPin, Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { submitQuote } from '@/app/actions/booking';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactForm() {
  const { language, t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await submitQuote(formData);
    
    if (result.success) {
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
      (e.target as HTMLFormElement).reset();
    }
    setIsSubmitting(false);
  };

  return (
    <section id="contacto" className="py-24 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4 font-arimo">{t.contact.title}</h2>
          <p className="text-slate-400 mb-10">
            {t.contact.subtitle}
          </p>
          
          {isSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-500/10 border border-green-500/20 p-8 rounded-2xl text-center"
            >
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">{t.contact.form.success}</h3>
              <p className="text-slate-300">{t.contact.form.successMsg}</p>
            </motion.div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">{t.contact.form.name}</label>
                  <input 
                    name="name"
                    required
                    className="w-full bg-slate-800 border-slate-700 rounded-lg p-3 text-white focus:ring-[#0070ea] focus:border-[#0070ea] outline-none transition-all" 
                    placeholder={t.contact.form.namePlaceholder} 
                    type="text"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">{t.contact.form.phone}</label>
                  <input 
                    name="phone"
                    required
                    className="w-full bg-slate-800 border-slate-700 rounded-lg p-3 text-white focus:ring-[#0070ea] focus:border-[#0070ea] outline-none transition-all" 
                    placeholder={t.contact.form.phonePlaceholder} 
                    type="tel"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">{t.contact.form.email}</label>
                  <input 
                    name="email"
                    required
                    className="w-full bg-slate-800 border-slate-700 rounded-lg p-3 text-white focus:ring-[#0070ea] focus:border-[#0070ea] outline-none transition-all" 
                    placeholder={t.contact.form.emailPlaceholder} 
                    type="email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">{t.contact.form.vehicle}</label>
                  <input 
                    name="vehicle"
                    required
                    className="w-full bg-slate-800 border-slate-700 rounded-lg p-3 text-white focus:ring-[#0070ea] focus:border-[#0070ea] outline-none transition-all" 
                    placeholder={t.contact.form.vehiclePlaceholder} 
                    type="text"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">{t.contact.form.serviceType}</label>
                <select 
                  name="serviceType"
                  required
                  defaultValue=""
                  className="w-full bg-slate-800 border-slate-700 rounded-lg p-3 text-white focus:ring-[#0070ea] focus:border-[#0070ea] outline-none transition-all appearance-none"
                >
                  <option value="" disabled>{language === 'es' ? 'Seleccione un servicio' : 'Select a service'}</option>
                  {t.contact.form.services.map((service) => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">{t.contact.form.problem}</label>
                <textarea 
                  name="message"
                  required
                  className="w-full bg-slate-800 border-slate-700 rounded-lg p-3 text-white focus:ring-[#0070ea] focus:border-[#0070ea] outline-none transition-all" 
                  placeholder={t.contact.form.problemPlaceholder} 
                  rows={4}
                ></textarea>
              </div>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className="w-full bg-[#0070ea] py-4 rounded-lg font-bold text-lg hover:brightness-110 transition-all uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (language === 'es' ? 'Enviando...' : 'Sending...') : (
                  <>
                    <Send className="w-5 h-5" />
                    {t.contact.form.cta}
                  </>
                )}
              </motion.button>
            </form>
          )}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-8"
        >
          <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-[#0070ea]" />
              {language === 'es' ? 'Visita Nuestro Taller' : 'Visit Our Shop'}
            </h3>
            <p className="text-slate-300 mb-4">123 Mechanic Way,<br />Milpitas, CA 95035</p>
            <p className="text-[#0070ea] font-bold mb-8">{t.contact.info.phone}</p>
            <div className="space-y-3 mt-8 border-t border-slate-700 pt-6">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">{language === 'es' ? 'Lunes - Viernes' : 'Monday - Friday'}</span>
                <span>8:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">{language === 'es' ? 'Sábado' : 'Saturday'}</span>
                <span>9:00 AM - 2:00 PM</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">{language === 'es' ? 'Domingo' : 'Sunday'}</span>
                <span className="text-[#0070ea]">{language === 'es' ? 'Cerrado' : 'Closed'}</span>
              </div>
            </div>
          </div>
          
          <div className="h-64 bg-slate-800 rounded-xl overflow-hidden relative border border-slate-700">
            <Image 
              alt="Mapa de Milpitas" 
              className="w-full h-full object-cover opacity-50 grayscale contrast-125" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIFRl7FUEfB9eQNFjv3Jo6jW_-9OnkviXPYNrbCtN_Ta2Gz15zHumneOoYR7flYKXFq4pViKQd2hDUg0DI0uXcVyfk8Vu98Y6NxIEG4C3M0J26X-Sr3GLdVlANREQBIqCkzmhRxbm2YpwHNq0x4M9T_eqfTq-hG7fXyEO043JoHCNMCW5TgjCE4HCBwcqb1AGtMNabKtObLqkRuvUgogbcuo-xS0KFmrYjB1aXb4fRyuvmZEJq6TOo7AMk77J3o2Fb1yLh4EeUjN-C" 
              fill
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <MapPin className="w-12 h-12 text-[#0070ea] fill-current" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
