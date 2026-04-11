'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone, Globe, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { siteConfig } from '@/lib/siteConfig';

export default function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { name: t.nav.services, href: '/servicios' },
    { name: t.nav.about, href: '/nosotros' },
    { name: t.nav.testimonials, href: '/#testimonios' },
    { name: t.nav.contact, href: '/contacto' },
  ];

  return (
    <>
      <nav
        data-testid="main-navbar"
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black/70 backdrop-blur-2xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="flex justify-between items-center h-20 px-8 md:px-16 max-w-[1400px] mx-auto">
          <Link href="/" data-testid="logo-link" className="group relative flex items-center overflow-hidden">
            <div className="relative transition-transform duration-500 ease-out group-hover:translate-x-1">
              <Image
                src={siteConfig.logo}
                alt={siteConfig.name}
                width={160}
                height={48}
                className="h-12 md:h-14 w-auto object-contain transition-all duration-500 group-hover:brightness-125"
                priority
              />
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] pointer-events-none" />
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                data-testid={`nav-link-${link.href.replace('/', '').replace('#', '')}`}
                className={`text-[13px] uppercase tracking-[0.15em] font-medium transition-all duration-300 ${
                  pathname === link.href
                    ? 'text-white'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center">
              <select
                data-testid="language-selector"
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'en' | 'es')}
                className="text-[11px] font-medium text-white/50 bg-transparent border-none focus:ring-0 cursor-pointer uppercase tracking-[0.15em] hover:text-white transition-colors"
              >
                <option value="en">EN</option>
                <option value="es">ES</option>
              </select>
            </div>

            <a
              data-testid="nav-phone-link"
              className="hidden sm:flex items-center gap-2 text-white/70 hover:text-white text-[13px] font-medium tracking-wide transition-colors"
              href={`tel:${siteConfig.phone}`}
            >
              <Phone className="w-3.5 h-3.5" />
              {siteConfig.phoneFormatted}
            </a>

            <button
              data-testid="mobile-menu-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-white/70 hover:text-white transition-colors"
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            data-testid="mobile-menu"
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  data-testid={`mobile-nav-${link.href.replace('/', '').replace('#', '')}`}
                  className={`text-2xl uppercase tracking-[0.2em] font-light transition-colors ${
                    pathname === link.href ? 'text-white' : 'text-white/40 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="h-px w-16 bg-white/10 my-4" />

              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-white/30" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as 'en' | 'es')}
                  className="text-sm text-white/50 bg-transparent border-none cursor-pointer uppercase tracking-widest"
                >
                  <option value="en">English</option>
                  <option value="es">Espanol</option>
                </select>
              </div>

              <a
                href={`tel:${siteConfig.phone}`}
                data-testid="mobile-call-btn"
                className="text-white/50 hover:text-white text-sm uppercase tracking-[0.2em] flex items-center gap-3 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <Phone className="w-4 h-4" />
                {siteConfig.phoneFormatted}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
