'use client';

import React from 'react';
import { Quote, Star, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';

export default function Testimonials() {
  const { t } = useLanguage();

  const testimonials = [
    {
      quote: t.testimonials.items[0].quote,
      author: t.testimonials.items[0].author,
      vehicle: t.testimonials.items[0].vehicle,
      rating: 5,
    },
    {
      quote: t.testimonials.items[1].quote,
      author: t.testimonials.items[1].author,
      vehicle: t.testimonials.items[1].vehicle,
      rating: 5,
    },
    {
      quote: t.testimonials.items[2].quote,
      author: t.testimonials.items[2].author,
      vehicle: t.testimonials.items[2].vehicle,
      rating: 5,
    },
  ];

  return (
    <section id="testimonios" className="py-12 md:py-24 max-w-7xl mx-auto px-5 md:px-12">
      <div className="text-center mb-8 md:mb-16">
        <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 font-arimo">{t.testimonials.title}</h2>
        <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto px-2">
          {t.testimonials.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-16">
        {testimonials.map((testimonial, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-5 md:p-8 rounded-xl md:rounded-2xl border border-slate-100 shadow-sm italic relative group"
          >
            <Quote className="w-8 h-8 md:w-12 md:h-12 text-[#0070ea]/10 absolute top-3 left-3 md:top-4 md:left-4 group-hover:text-[#0070ea]/20 transition-colors" />
            
            <div className="flex text-yellow-500 mb-3 md:mb-4 relative z-10">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current" />
              ))}
            </div>

            <p className="relative z-10 text-slate-600 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
              &quot;{testimonial.quote}&quot;
            </p>
            
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#0059bb] flex items-center justify-center text-white font-bold text-base md:text-lg">
                {testimonial.author.charAt(0)}
              </div>
              <div>
                <div className="font-bold not-italic text-sm md:text-base">{testimonial.author}</div>
                <div className="text-[10px] md:text-xs text-slate-500 not-italic">{testimonial.vehicle}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 pt-6 md:pt-8 border-t border-slate-100">
        <motion.a 
          whileHover={{ scale: 1.05 }}
          href="#" 
          className="w-full sm:w-auto flex items-center gap-3 px-5 md:px-6 py-3 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all group"
        >
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
            <span className="text-blue-600 font-bold text-lg">G</span>
          </div>
          <div className="text-left">
            <div className="text-[10px] md:text-xs text-slate-400 uppercase font-bold tracking-widest">{t.testimonials.viewMore}</div>
            <div className="font-bold text-slate-800 flex items-center gap-1 text-sm md:text-base">
              Google Business
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </motion.a>

        <motion.a 
          whileHover={{ scale: 1.05 }}
          href="#" 
          className="w-full sm:w-auto flex items-center gap-3 px-5 md:px-6 py-3 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all group"
        >
          <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
            <span className="text-red-600 font-bold text-lg">Y</span>
          </div>
          <div className="text-left">
            <div className="text-[10px] md:text-xs text-slate-400 uppercase font-bold tracking-widest">{t.testimonials.viewMore}</div>
            <div className="font-bold text-slate-800 flex items-center gap-1 text-sm md:text-base">
              Yelp Reviews
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </motion.a>
      </div>
    </section>
  );
}
