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
        <h2 className="text-3xl md:text-4xl font-black mb-4 font-outfit tracking-tight">{t.testimonials.title}</h2>
        <p className="text-zinc-600 max-w-2xl mx-auto">
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
            className="bg-white p-8 rounded-xl border border-zinc-200 relative group hover:border-zinc-300 hover:shadow-md transition-all"
            data-testid={`testimonial-card-${index}`}
          >
            <Quote className="w-10 h-10 text-[#0070ea]/10 absolute top-4 left-4 group-hover:text-[#0070ea]/20 transition-colors" />
            
            <div className="flex text-yellow-500 mb-4 relative z-10">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>

            <p className="relative z-10 text-zinc-600 mb-6 leading-relaxed text-sm italic">
              &quot;{testimonial.quote}&quot;
            </p>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center">
                <span className="text-sm font-bold text-zinc-500">{testimonial.author.charAt(0)}</span>
              </div>
              <div>
                <div className="font-bold text-sm not-italic">{testimonial.author}</div>
                <div className="text-xs text-zinc-400 uppercase tracking-wider">{testimonial.vehicle}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8 border-t border-zinc-100">
        <motion.a 
          whileHover={{ scale: 1.03 }}
          href="#" 
          data-testid="google-reviews-link"
          className="flex items-center gap-3 px-6 py-3 bg-white border border-zinc-200 rounded-xl hover:shadow-md transition-all group"
        >
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
            <span className="text-blue-600 font-bold text-lg">G</span>
          </div>
          <div className="text-left">
            <div className="text-xs text-zinc-400 uppercase font-bold tracking-widest">{t.testimonials.viewMore}</div>
            <div className="font-bold text-zinc-800 flex items-center gap-1 text-sm">
              Google Business
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </motion.a>

        <motion.a 
          whileHover={{ scale: 1.03 }}
          href="#" 
          data-testid="yelp-reviews-link"
          className="flex items-center gap-3 px-6 py-3 bg-white border border-zinc-200 rounded-xl hover:shadow-md transition-all group"
        >
          <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
            <span className="text-red-600 font-bold text-lg">Y</span>
          </div>
          <div className="text-left">
            <div className="text-xs text-zinc-400 uppercase font-bold tracking-widest">{t.testimonials.viewMore}</div>
            <div className="font-bold text-zinc-800 flex items-center gap-1 text-sm">
              Yelp Reviews
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </motion.a>
      </div>
    </section>
  );
}
