'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';

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
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-colors duration-200 ease-in-out">
      <div className="flex justify-between items-center h-16 px-6 md:px-12 max-w-7xl mx-auto">
        <Link href="/" className="text-xl font-black tracking-tighter text-slate-900 font-public-sans">
          RPM Automotive
        </Link>
        
        <div className="hidden md:flex gap-8 font-medium text-sm">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href}
              className={`${
                pathname === link.href 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-slate-600 hover:text-blue-500'
              } transition-colors py-1`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 mr-2">
            <Globe className="w-4 h-4 text-slate-400" />
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value as 'en' | 'es')}
              className="text-xs font-bold text-slate-600 bg-transparent border-none focus:ring-0 cursor-pointer uppercase"
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>
          </div>
          
          <a className="hidden lg:flex items-center gap-2 text-[#0059bb] font-bold" href="tel:8314292096">
            <Phone className="w-4 h-4" />
            831.429.2096
          </a>
          <Link href="/contacto">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#0070ea] text-white px-6 py-2.5 rounded-lg font-bold hover:brightness-110 transition-all text-sm uppercase tracking-wider"
            >
              {t.nav.cta}
            </motion.button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
