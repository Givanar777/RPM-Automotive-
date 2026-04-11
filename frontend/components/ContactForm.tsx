'use client';

import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Send, CheckCircle2, Clock, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { siteConfig } from '@/lib/siteConfig';

export default function ContactForm() {
  const { language, t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      email: (formData.get('email') as string) || '',
      vehicle: (formData.get('vehicle') as string) || '',
      service_type: (formData.get('serviceType') as string) || '',
      message: (formData.get('message') as string) || '',
      source: 'website',
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      await fetch(`${apiUrl}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
      (e.target as HTMLFormElement).reset();
    } catch {
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    }
    setIsSubmitting(false);
  };

  return (
    <section id="contacto" data-testid="contact-section" className="py-24 bg-[#0F2640] border-t border-[#1A3652] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Call/Text CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 font-outfit tracking-tight text-white">{t.contact.title}</h2>
          <p className="text-slate-400 mb-10 text-lg max-w-xl mx-auto">{t.contact.subtitle}</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href={`tel:${siteConfig.phone}`} data-testid="contact-call-btn">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-md border border-[#B0BEC5]/40 text-white px-10 py-5 rounded-xl font-bold text-lg shadow-lg shadow-white/5 hover:bg-white/20 transition-all flex items-center gap-3 w-full sm:w-auto justify-center"
              >
                <Phone className="w-6 h-6" />
                {t.contact.callCta}
              </motion.button>
            </a>
            <a href={`sms:${siteConfig.phone}`} data-testid="contact-text-btn">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/5 backdrop-blur border border-slate-500/30 text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-white/10 transition-all flex items-center gap-3 w-full sm:w-auto justify-center"
              >
                <MessageCircle className="w-6 h-6" />
                {t.contact.textCta}
              </motion.button>
            </a>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-slate-500 text-sm uppercase tracking-[0.2em] font-bold mb-6">
              {language === 'es' ? 'O envianos tus datos' : 'Or send us your details'}
            </p>
            
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                data-testid="contact-success-message"
                className="bg-emerald-500/10 border border-emerald-500/20 p-8 rounded-xl text-center"
              >
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2 text-white">{t.contact.form.success}</h3>
                <p className="text-slate-400">{t.contact.form.successMsg}</p>
              </motion.div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit} data-testid="contact-form">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold mb-2 text-slate-500 uppercase tracking-wider">{t.contact.form.name}</label>
                    <input 
                      name="name" required data-testid="contact-name-input"
                      className="w-full bg-[#0B1929] border border-[#1A3652] rounded-lg p-3 text-white focus:border-[#B0BEC5] outline-none transition-all text-sm" 
                      placeholder={t.contact.form.namePlaceholder} type="text"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-2 text-slate-500 uppercase tracking-wider">{t.contact.form.phone}</label>
                    <input 
                      name="phone" required data-testid="contact-phone-input"
                      className="w-full bg-[#0B1929] border border-[#1A3652] rounded-lg p-3 text-white focus:border-[#B0BEC5] outline-none transition-all text-sm" 
                      placeholder={t.contact.form.phonePlaceholder} type="tel"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold mb-2 text-slate-500 uppercase tracking-wider">{t.contact.form.email}</label>
                    <input 
                      name="email" data-testid="contact-email-input"
                      className="w-full bg-[#0B1929] border border-[#1A3652] rounded-lg p-3 text-white focus:border-[#B0BEC5] outline-none transition-all text-sm" 
                      placeholder={t.contact.form.emailPlaceholder} type="email"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-2 text-slate-500 uppercase tracking-wider">{t.contact.form.vehicle}</label>
                    <input 
                      name="vehicle" data-testid="contact-vehicle-input"
                      className="w-full bg-[#0B1929] border border-[#1A3652] rounded-lg p-3 text-white focus:border-[#B0BEC5] outline-none transition-all text-sm" 
                      placeholder={t.contact.form.vehiclePlaceholder} type="text"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-2 text-slate-500 uppercase tracking-wider">{t.contact.form.serviceType}</label>
                  <select 
                    name="serviceType" data-testid="contact-service-select" defaultValue=""
                    className="w-full bg-[#0B1929] border border-[#1A3652] rounded-lg p-3 text-white focus:border-[#B0BEC5] outline-none transition-all text-sm appearance-none"
                  >
                    <option value="" disabled>{language === 'es' ? 'Seleccione un servicio' : 'Select a service'}</option>
                    {t.contact.form.services.map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-2 text-slate-500 uppercase tracking-wider">{t.contact.form.problem}</label>
                  <textarea 
                    name="message" data-testid="contact-message-textarea"
                    className="w-full bg-[#0B1929] border border-[#1A3652] rounded-lg p-3 text-white focus:border-[#B0BEC5] outline-none transition-all text-sm" 
                    placeholder={t.contact.form.problemPlaceholder} rows={3}
                  ></textarea>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting} data-testid="contact-submit-btn"
                  className="w-full bg-white/10 backdrop-blur-md border border-[#B0BEC5]/40 text-white py-4 rounded-lg font-bold text-sm hover:bg-white/20 transition-all uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (language === 'es' ? 'Enviando...' : 'Sending...') : (
                    <><Send className="w-4 h-4" />{t.contact.form.cta}</>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
          
          {/* Info Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <div className="bg-[#0B1929] p-8 rounded-xl border border-[#1A3652]">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 font-outfit text-white">
                <MapPin className="w-5 h-5 text-[#B0BEC5]" />
                {language === 'es' ? 'Visita Nuestro Taller' : 'Visit Our Shop'}
              </h3>
              <p className="text-slate-400 mb-2 text-sm">{siteConfig.address}</p>
              <p className="text-slate-400 mb-4 text-sm">{siteConfig.city}</p>
              <a href={`tel:${siteConfig.phone}`} className="text-[#B0BEC5] font-bold text-lg block mb-2" data-testid="info-phone-link">
                {siteConfig.phoneFormatted}
              </a>
              <a href={`mailto:${siteConfig.email}`} className="text-slate-400 text-sm flex items-center gap-2 mb-6 hover:text-[#B0BEC5] transition-colors" data-testid="info-email-link">
                <Mail className="w-4 h-4" /> {siteConfig.email}
              </a>
              <a 
                href={siteConfig.googleMapsUrl} target="_blank" rel="noopener noreferrer"
                data-testid="directions-link"
                className="inline-block text-sm text-slate-500 hover:text-[#B0BEC5] underline underline-offset-4 transition-colors"
              >
                {language === 'es' ? 'Obtener Direcciones' : 'Get Directions'} &rarr;
              </a>
            </div>

            <div className="bg-[#0B1929] p-8 rounded-xl border border-[#1A3652]">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 font-outfit text-white">
                <Clock className="w-5 h-5 text-[#B0BEC5]" />
                {t.contact.info.hours}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">{language === 'es' ? 'Lunes - Viernes' : 'Monday - Friday'}</span>
                  <span className="text-white font-medium">{siteConfig.hours.weekdays}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">{language === 'es' ? 'Sabado' : 'Saturday'}</span>
                  <span className="text-white font-medium">{siteConfig.hours.saturday}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">{language === 'es' ? 'Domingo' : 'Sunday'}</span>
                  <span className="text-[#B0BEC5] font-medium">{language === 'es' ? 'Cerrado' : 'Closed'}</span>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="rounded-xl overflow-hidden border border-[#1A3652] h-48" data-testid="google-maps-embed">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3186.3!2d-122.03!3d36.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s110+Stanford+Ave%2C+Santa+Cruz%2C+CA+95062!5e0!3m2!1sen!2sus!4v1700000000000"
                width="100%" height="100%"
                style={{ border: 0 }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="RPM Automotive Location"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
