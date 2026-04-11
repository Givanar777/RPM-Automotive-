'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { siteConfig } from '@/lib/siteConfig';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer data-testid="footer" className="bg-[#0B1929] border-t border-[#1A3652]">
      <div className="flex flex-col md:flex-row justify-between items-center py-10 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-6 md:mb-0">
          <Image src={siteConfig.logo} alt={siteConfig.name} width={80} height={32} className="h-8 w-auto object-contain mb-1" />
          <div className="text-slate-600 text-xs">{siteConfig.address} {siteConfig.city}</div>
          <a href={`mailto:${siteConfig.email}`} className="text-slate-600 text-xs hover:text-[#38BDF8] transition-colors">{siteConfig.email}</a>
          <div className="text-[10px] text-slate-700 uppercase tracking-widest mt-2">
            &copy; {new Date().getFullYear()} {siteConfig.name}. {t.footer.rights}
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex flex-wrap justify-center gap-6 text-xs uppercase tracking-widest">
            <a className="text-slate-600 hover:text-[#38BDF8] transition-colors" href="#" data-testid="footer-privacy">{t.footer.privacy}</a>
            <a className="text-slate-600 hover:text-[#38BDF8] transition-colors" href="#" data-testid="footer-terms">{t.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
