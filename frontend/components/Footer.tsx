'use client';

import React from 'react';
import { Share2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { siteConfig } from '@/lib/siteConfig';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer data-testid="footer" className="bg-zinc-950 border-t border-zinc-800">
      <div className="flex flex-col md:flex-row justify-between items-center py-10 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-6 md:mb-0">
          <div className="text-lg font-black text-white font-outfit tracking-tight mb-1">{siteConfig.name}</div>
          <div className="text-zinc-600 text-xs">{siteConfig.address} {siteConfig.city}</div>
          <div className="text-[10px] text-zinc-700 uppercase tracking-widest mt-2">
            &copy; {new Date().getFullYear()} {siteConfig.name}. {t.footer.rights}
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex flex-wrap justify-center gap-6 text-xs uppercase tracking-widest">
            <a className="text-zinc-500 hover:text-white transition-colors" href="#" data-testid="footer-privacy">{t.footer.privacy}</a>
            <a className="text-zinc-500 hover:text-white transition-colors" href="#" data-testid="footer-terms">{t.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
