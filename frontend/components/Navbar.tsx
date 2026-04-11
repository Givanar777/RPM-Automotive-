'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone, Globe, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { siteConfig } from '@/lib/siteConfig';

export default function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: t.nav.services, href: '/servicios' },
    { name: t.nav.about, href: '/nosotros' },
    { name: t.nav.testimonials, href: '/#testimonios' },
    { name: t.nav.contact, href: '/contacto' },
  ];

  return (
    <>
      <nav data-testid="main-navbar" className="fixed top-0 w-full z-50 bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800/60">
        <div className="flex justify-between items-center h-16 px-6 md:px-12 max-w-7xl mx-auto">
          <Link href="/" data-testid="logo-link" className="flex items-center">
            <Image src={siteConfig.logo} alt={siteConfig.name} width={120} height={48} className="h-11 w-auto object-contain" priority />
          </Link>
          
          <div className="hidden md:flex gap-8 font-medium text-sm">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href}
                data-testid={`nav-link-${link.href.replace('/', '').replace('#', '')}`}
                className={`${
                  pathname === link.href 
                    ? 'text-[#38BDF8] border-b-2 border-[#38BDF8]' 
                    : 'text-zinc-300 hover:text-white'
                } transition-colors py-1`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 mr-1">
              <Globe className="w-3.5 h-3.5 text-zinc-500" />
              <select 
                data-testid="language-selector"
                value={language} 
                onChange={(e) => setLanguage(e.target.value as 'en' | 'es')}
                className="text-xs font-bold text-zinc-300 bg-transparent border-none focus:ring-0 cursor-pointer uppercase"
              >
                <option value="en">EN</option>
                <option value="es">ES</option>
              </select>
            </div>
            
            <a 
              data-testid="nav-phone-link"
              className="hidden lg:flex items-center gap-2 text-zinc-300 font-bold text-sm" 
              href={`tel:${siteConfig.phone}`}
            >
              <Phone className="w-4 h-4" />
              {siteConfig.phoneFormatted}
            </a>

            <a href={`tel:${siteConfig.phone}`} data-testid="nav-call-cta" className="hidden sm:block">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#38BDF8] text-[#0B1929] px-5 py-2 rounded-lg font-bold hover:bg-[#38BDF8]/90 transition-all text-sm uppercase tracking-wider flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                {t.nav.cta}
              </motion.button>
            </a>

            {/* Mobile hamburger */}
            <button 
              data-testid="mobile-menu-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-zinc-300 hover:text-white transition-colors"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            data-testid="mobile-menu"
            className="fixed top-16 inset-x-0 z-40 bg-zinc-950 border-b border-zinc-800 shadow-lg md:hidden"
          >
            <div className="px-6 py-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  data-testid={`mobile-nav-${link.href.replace('/', '').replace('#', '')}`}
                  className={`block py-3 px-4 rounded-lg text-base font-medium transition-colors ${
                    pathname === link.href
                      ? 'bg-[#38BDF8]/10 text-[#38BDF8]'
                      : 'text-zinc-300 hover:bg-zinc-900'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-4 border-t border-zinc-100 mt-4 space-y-3">
                <div className="flex items-center gap-2 px-4">
                  <Globe className="w-4 h-4 text-zinc-500" />
                  <select 
                    value={language} 
                    onChange={(e) => setLanguage(e.target.value as 'en' | 'es')}
                    className="text-sm font-bold text-zinc-300 bg-transparent border-none cursor-pointer uppercase"
                  >
                    <option value="en">English</option>
                    <option value="es">Espanol</option>
                  </select>
                </div>

                <a
                  href={`tel:${siteConfig.phone}`}
                  data-testid="mobile-call-btn"
                  className="flex items-center justify-center gap-2 bg-[#38BDF8] text-[#0B1929] py-3 rounded-lg font-bold text-base"
                  onClick={() => setMobileOpen(false)}
                >
                  <Phone className="w-5 h-5" />
                  {t.nav.cta}: {siteConfig.phoneFormatted}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
