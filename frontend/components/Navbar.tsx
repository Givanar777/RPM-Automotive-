'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Globe, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { siteConfig } from '@/lib/siteConfig';

export default function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { name: t.nav.services, href: '/servicios' },
    { name: t.nav.about, href: '/nosotros' },
    { name: t.nav.testimonials, href: '/#testimonios' },
    { name: t.nav.contact, href: '/contacto' },
  ];

  return (
    <nav data-testid="main-navbar" className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-zinc-200/60 transition-colors duration-200">
      <div className="flex justify-between items-center h-16 px-6 md:px-12 max-w-7xl mx-auto">
        <Link href="/" data-testid="logo-link" className="text-xl font-black tracking-tighter text-zinc-900 font-outfit">
          {siteConfig.name}
        </Link>
        
        <div className="hidden md:flex gap-8 font-medium text-sm">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href}
              data-testid={`nav-link-${link.href.replace('/', '').replace('#', '')}`}
              className={`${
                pathname === link.href 
                  ? 'text-[#0070ea] border-b-2 border-[#0070ea]' 
                  : 'text-zinc-600 hover:text-zinc-900'
              } transition-colors py-1`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 mr-1">
            <Globe className="w-3.5 h-3.5 text-zinc-400" />
            <select 
              data-testid="language-selector"
              value={language} 
              onChange={(e) => setLanguage(e.target.value as 'en' | 'es')}
              className="text-xs font-bold text-zinc-600 bg-transparent border-none focus:ring-0 cursor-pointer uppercase"
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>
          </div>
          
          <a 
            data-testid="nav-phone-link"
            className="hidden lg:flex items-center gap-2 text-zinc-700 font-bold text-sm" 
            href={`tel:${siteConfig.phone}`}
          >
            <Phone className="w-4 h-4" />
            {siteConfig.phoneFormatted}
          </a>

          <a href={`tel:${siteConfig.phone}`} data-testid="nav-call-cta">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#0070ea] text-white px-5 py-2 rounded-lg font-bold hover:bg-blue-600 transition-all text-sm uppercase tracking-wider flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              {t.nav.cta}
            </motion.button>
          </a>
        </div>
      </div>
    </nav>
  );
}
