'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-slate-900">
      <Navbar />
      
      <div className="pt-14 md:pt-24">
        <ContactForm />
      </div>
      
      <Footer />
    </main>
  );
}
