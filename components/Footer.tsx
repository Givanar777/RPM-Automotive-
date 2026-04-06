'use client';

import React from 'react';
import { Share2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="flex flex-col md:flex-row justify-between items-center py-12 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-8 md:mb-0">
          <div className="text-lg font-bold text-white mb-2">RPM Automotive</div>
          <div className="text-[10px] text-slate-500 uppercase tracking-widest">
            © 2024 RPM Automotive. {t.footer.rights}
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex flex-wrap justify-center gap-6 text-xs uppercase tracking-widest">
            <a className="text-slate-400 hover:text-white transition-colors opacity-80 hover:opacity-100" href="#">{t.footer.privacy}</a>
            <a className="text-slate-400 hover:text-white transition-colors opacity-80 hover:opacity-100" href="#">{t.footer.terms}</a>
            <a className="text-slate-400 hover:text-white transition-colors opacity-80 hover:opacity-100" href="#">{t.footer.cookies}</a>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer transition-colors">
              <Share2 className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
