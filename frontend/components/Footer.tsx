'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { siteConfig } from '@/lib/siteConfig';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer data-testid="footer" className="border-t border-white/5">
      <div className="flex flex-col md:flex-row justify-between items-center py-12 px-8 md:px-16 max-w-[1400px] mx-auto">
        <div className="mb-6 md:mb-0 flex items-center gap-8">
          <Image src={siteConfig.logo} alt={siteConfig.name} width={80} height={28} className="h-7 w-auto object-contain opacity-60" />
          <div>
            <div className="text-white/20 text-xs">{siteConfig.address} {siteConfig.city}</div>
            <a href={`mailto:${siteConfig.email}`} className="text-white/20 text-xs hover:text-white/40 transition-colors">{siteConfig.email}</a>
          </div>
        </div>
        
        <div className="flex items-center gap-8">
          <a className="text-white/15 hover:text-white/40 text-[11px] uppercase tracking-[0.15em] transition-colors" href="#" data-testid="footer-privacy">{t.footer.privacy}</a>
          <a className="text-white/15 hover:text-white/40 text-[11px] uppercase tracking-[0.15em] transition-colors" href="#" data-testid="footer-terms">{t.footer.terms}</a>
          <span className="text-white/10 text-[11px] uppercase tracking-[0.15em]">&copy; {new Date().getFullYear()} {siteConfig.name}</span>
        </div>
      </div>
    </footer>
  );
}
