'use client';

import React from 'react';
import { Quote, Star, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section id="testimonios" data-testid="testimonials-section" className="py-32 max-w-[1400px] mx-auto px-8 md:px-16">
      <div className="text-center mb-20">
        <div className="text-[11px] uppercase tracking-[0.3em] text-white/30 font-medium mb-4">Testimonials</div>
        <h2 className="text-4xl md:text-5xl font-bold font-outfit tracking-tight text-white mb-6">{t.testimonials.title}</h2>
        <p className="text-white/30 max-w-2xl mx-auto text-lg">
          {t.testimonials.subtitle}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-px bg-white/5 mb-20">
        {t.testimonials.items.map((testimonial, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.15 }}
            viewport={{ once: true }}
            className="bg-[#0B1929] p-10 group hover:bg-white/[0.02] transition-all duration-500"
            data-testid={`testimonial-card-${index}`}
          >
            <div className="flex text-white/20 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>

            <p className="text-white/40 mb-8 leading-relaxed text-[15px] italic group-hover:text-white/55 transition-colors duration-500">
              &quot;{testimonial.quote}&quot;
            </p>
            
            <div>
              <div className="text-white text-sm font-medium">{testimonial.author}</div>
              <div className="text-[11px] text-white/25 uppercase tracking-[0.15em] mt-1">{testimonial.vehicle}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        <a 
          href="#" data-testid="google-reviews-link"
          className="text-white/25 hover:text-white/60 text-[13px] uppercase tracking-[0.15em] flex items-center gap-2 transition-colors"
        >
          {t.testimonials.viewMore} Google
          <ExternalLink className="w-3 h-3" />
        </a>
        <a 
          href="#" data-testid="yelp-reviews-link"
          className="text-white/25 hover:text-white/60 text-[13px] uppercase tracking-[0.15em] flex items-center gap-2 transition-colors"
        >
          {t.testimonials.viewMore} Yelp
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </section>
  );
}
