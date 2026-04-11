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
    <section id="contacto" data-testid="contact-section" className="py-32 border-t border-white/5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <div className="text-[11px] uppercase tracking-[0.3em] text-white/30 font-medium mb-4">Contact</div>
          <h2 className="text-4xl md:text-5xl font-bold font-outfit tracking-tight text-white mb-6">{t.contact.title}</h2>
          <p className="text-white/30 text-lg max-w-xl mx-auto mb-12">{t.contact.subtitle}</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${siteConfig.phone}`} data-testid="contact-call-btn">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-black px-10 py-4 text-[13px] uppercase tracking-[0.15em] font-medium transition-all flex items-center gap-3 w-full sm:w-auto justify-center"
              >
                <Phone className="w-4 h-4" />
                {t.contact.callCta}
              </motion.button>
            </a>
            <a href={`sms:${siteConfig.phone}`} data-testid="contact-text-btn">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="border border-white/20 text-white px-10 py-4 text-[13px] uppercase tracking-[0.15em] font-medium hover:bg-white/5 transition-all flex items-center gap-3 w-full sm:w-auto justify-center"
              >
                <MessageCircle className="w-4 h-4" />
                {t.contact.textCta}
              </motion.button>
            </a>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <div className="text-[11px] uppercase tracking-[0.3em] text-white/30 font-medium mb-8">
              {language === 'es' ? 'O envianos tus datos' : 'Or send us your details'}
            </div>
            
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                data-testid="contact-success-message"
                className="border border-white/10 p-12 text-center"
              >
                <CheckCircle2 className="w-8 h-8 text-white/30 mx-auto mb-6" />
                <h3 className="text-lg font-medium mb-3 text-white">{t.contact.form.success}</h3>
                <p className="text-white/35">{t.contact.form.successMsg}</p>
              </motion.div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit} data-testid="contact-form">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] mb-3 text-white/25 uppercase tracking-[0.2em]">{t.contact.form.name}</label>
                    <input 
                      name="name" required data-testid="contact-name-input"
                      className="w-full bg-transparent border-b border-white/10 pb-3 text-white text-sm focus:border-white/40 outline-none transition-all placeholder:text-white/15" 
                      placeholder={t.contact.form.namePlaceholder} type="text"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] mb-3 text-white/25 uppercase tracking-[0.2em]">{t.contact.form.phone}</label>
                    <input 
                      name="phone" required data-testid="contact-phone-input"
                      className="w-full bg-transparent border-b border-white/10 pb-3 text-white text-sm focus:border-white/40 outline-none transition-all placeholder:text-white/15" 
                      placeholder={t.contact.form.phonePlaceholder} type="tel"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] mb-3 text-white/25 uppercase tracking-[0.2em]">{t.contact.form.email}</label>
                    <input 
                      name="email" data-testid="contact-email-input"
                      className="w-full bg-transparent border-b border-white/10 pb-3 text-white text-sm focus:border-white/40 outline-none transition-all placeholder:text-white/15" 
                      placeholder={t.contact.form.emailPlaceholder} type="email"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] mb-3 text-white/25 uppercase tracking-[0.2em]">{t.contact.form.vehicle}</label>
                    <input 
                      name="vehicle" data-testid="contact-vehicle-input"
                      className="w-full bg-transparent border-b border-white/10 pb-3 text-white text-sm focus:border-white/40 outline-none transition-all placeholder:text-white/15" 
                      placeholder={t.contact.form.vehiclePlaceholder} type="text"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] mb-3 text-white/25 uppercase tracking-[0.2em]">{t.contact.form.serviceType}</label>
                  <select 
                    name="serviceType" data-testid="contact-service-select" defaultValue=""
                    className="w-full bg-transparent border-b border-white/10 pb-3 text-white text-sm focus:border-white/40 outline-none transition-all appearance-none"
                  >
                    <option value="" disabled className="bg-black">{language === 'es' ? 'Seleccione un servicio' : 'Select a service'}</option>
                    {t.contact.form.services.map((service) => (
                      <option key={service} value={service} className="bg-black">{service}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] mb-3 text-white/25 uppercase tracking-[0.2em]">{t.contact.form.problem}</label>
                  <textarea 
                    name="message" data-testid="contact-message-textarea"
                    className="w-full bg-transparent border-b border-white/10 pb-3 text-white text-sm focus:border-white/40 outline-none transition-all resize-none placeholder:text-white/15" 
                    placeholder={t.contact.form.problemPlaceholder} rows={3}
                  ></textarea>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting} data-testid="contact-submit-btn"
                  className="bg-white text-black py-4 px-10 text-[13px] uppercase tracking-[0.15em] font-medium transition-all flex items-center gap-3 disabled:opacity-30"
                >
                  {isSubmitting ? (language === 'es' ? 'Enviando...' : 'Sending...') : (
                    <><Send className="w-4 h-4" />{t.contact.form.cta}</>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
          
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex flex-col gap-10">
            <div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-white/30 font-medium mb-6 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                {language === 'es' ? 'Visita Nuestro Taller' : 'Visit Our Shop'}
              </div>
              <p className="text-white/50 text-sm mb-1">{siteConfig.address}</p>
              <p className="text-white/50 text-sm mb-4">{siteConfig.city}</p>
              <a href={`tel:${siteConfig.phone}`} className="text-white font-medium block mb-2" data-testid="info-phone-link">
                {siteConfig.phoneFormatted}
              </a>
              <a href={`mailto:${siteConfig.email}`} className="text-white/35 text-sm flex items-center gap-2 mb-6 hover:text-white/60 transition-colors" data-testid="info-email-link">
                <Mail className="w-3.5 h-3.5" /> {siteConfig.email}
              </a>
              <a 
                href={siteConfig.googleMapsUrl} target="_blank" rel="noopener noreferrer"
                data-testid="directions-link"
                className="text-[13px] text-white/25 hover:text-white/50 uppercase tracking-[0.15em] transition-colors"
              >
                {language === 'es' ? 'Obtener Direcciones' : 'Get Directions'} &rarr;
              </a>
            </div>

            <div className="border-t border-white/5 pt-10">
              <div className="text-[11px] uppercase tracking-[0.3em] text-white/30 font-medium mb-6 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" />
                {t.contact.info.hours}
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/30">{language === 'es' ? 'Lunes - Viernes' : 'Monday - Friday'}</span>
                  <span className="text-white/60">{siteConfig.hours.weekdays}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/30">{language === 'es' ? 'Sabado' : 'Saturday'}</span>
                  <span className="text-white/60">{siteConfig.hours.saturday}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/30">{language === 'es' ? 'Domingo' : 'Sunday'}</span>
                  <span className="text-white/50">{language === 'es' ? 'Cerrado' : 'Closed'}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-white/5 pt-10 rounded-none overflow-hidden h-48" data-testid="google-maps-embed">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3186.3!2d-122.03!3d36.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s110+Stanford+Ave%2C+Santa+Cruz%2C+CA+95062!5e0!3m2!1sen!2sus!4v1700000000000"
                width="100%" height="100%"
                style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
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
