'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-[#0B1929]">
      <Navbar />
      <div className="pt-24">
        <ContactForm />
      </div>
      <Footer />
    </main>
  );
}
