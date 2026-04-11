'use client';

import React from 'react';
import { Quote, Star, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section id="testimonios" data-testid="testimonials-section" className="py-24 max-w-7xl mx-auto px-6 md:px-12">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-black mb-4 font-outfit tracking-tight text-white">{t.testimonials.title}</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          {t.testimonials.subtitle}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {t.testimonials.items.map((testimonial, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            viewport={{ once: true }}
            className="bg-[#0F2640] p-8 rounded-xl border border-[#1A3652] relative group hover:border-[#B0BEC5]/20 transition-all"
            data-testid={`testimonial-card-${index}`}
          >
            <Quote className="w-10 h-10 text-[#B0BEC5]/10 absolute top-4 left-4 group-hover:text-[#B0BEC5]/20 transition-colors" />
            
            <div className="flex text-amber-400 mb-4 relative z-10">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>

            <p className="relative z-10 text-slate-400 mb-6 leading-relaxed text-sm italic">
              &quot;{testimonial.quote}&quot;
            </p>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1A3652] flex items-center justify-center">
                <span className="text-sm font-bold text-[#B0BEC5]">{testimonial.author.charAt(0)}</span>
              </div>
              <div>
                <div className="font-bold text-sm not-italic text-white">{testimonial.author}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">{testimonial.vehicle}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8 border-t border-[#1A3652]">
        <motion.a 
          whileHover={{ scale: 1.03 }}
          href="#" 
          data-testid="google-reviews-link"
          className="flex items-center gap-3 px-6 py-3 bg-[#0F2640] border border-[#1A3652] rounded-xl hover:border-[#B0BEC5]/30 transition-all group"
        >
          <div className="w-8 h-8 bg-[#B0BEC5]/10 rounded-lg flex items-center justify-center">
            <span className="text-[#B0BEC5] font-bold text-lg">G</span>
          </div>
          <div className="text-left">
            <div className="text-xs text-slate-500 uppercase font-bold tracking-widest">{t.testimonials.viewMore}</div>
            <div className="font-bold text-slate-300 flex items-center gap-1 text-sm">
              Google Business
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </motion.a>

        <motion.a 
          whileHover={{ scale: 1.03 }}
          href="#" 
          data-testid="yelp-reviews-link"
          className="flex items-center gap-3 px-6 py-3 bg-[#0F2640] border border-[#1A3652] rounded-xl hover:border-[#B0BEC5]/30 transition-all group"
        >
          <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center">
            <span className="text-red-400 font-bold text-lg">Y</span>
          </div>
          <div className="text-left">
            <div className="text-xs text-slate-500 uppercase font-bold tracking-widest">{t.testimonials.viewMore}</div>
            <div className="font-bold text-slate-300 flex items-center gap-1 text-sm">
              Yelp Reviews
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </motion.a>
      </div>
    </section>
  );
}
