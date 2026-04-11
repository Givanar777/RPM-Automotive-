'use client';

import React, { useState } from 'react';
import { X, Calendar, Clock, Car, User, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { submitBooking } from '@/app/actions/booking';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const services = [
  'Reparación de Frenos',
  'Suspensión y Dirección',
  'Revisión de Motor',
  'Servicio de Transmisión',
  'Diagnóstico Check Engine',
  'Sistema Eléctrico',
  'Mantenimiento 30k/60k/90k',
  'Cambio de Aceite',
  'Otro Servicio',
];

const timeSlots = [
  '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
];

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await submitBooking(formData);
    
    if (result.success) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);
    }
    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {isSuccess ? (
            <div className="p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold mb-4">¡Cita Solicitada!</h2>
              <p className="text-slate-600 text-lg">
                Hemos recibido tu solicitud. Un asesor de RPM Automotive te contactará pronto para confirmar tu cita.
              </p>
            </div>
          ) : (
            <div className="p-8 md:p-10">
              <h2 className="text-3xl font-bold mb-2 font-arimo">Agendar Cita Online</h2>
              <p className="text-slate-500 mb-8">Selecciona el servicio y horario que mejor te convenga.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-[#0070ea]" />
                      Servicio Necesario
                    </label>
                    <select 
                      name="service"
                      required
                      defaultValue=""
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#0070ea]/20 focus:border-[#0070ea] transition-all"
                    >
                      <option value="">Seleccionar Servicio</option>
                      {services.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <Car className="w-4 h-4 text-[#0070ea]" />
                      Vehículo (Año, Marca, Modelo)
                    </label>
                    <input 
                      name="vehicle"
                      required
                      placeholder="ej. 2018 Ford F-150"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#0070ea]/20 focus:border-[#0070ea] transition-all"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#0070ea]" />
                      Fecha Preferida
                    </label>
                    <input 
                      type="date"
                      name="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#0070ea]/20 focus:border-[#0070ea] transition-all"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#0070ea]" />
                      Horario Preferido
                    </label>
                    <select 
                      name="time"
                      required
                      defaultValue=""
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#0070ea]/20 focus:border-[#0070ea] transition-all"
                    >
                      <option value="">Seleccionar Horario</option>
                      {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <User className="w-4 h-4 text-[#0070ea]" />
                      Nombre Completo
                    </label>
                    <input 
                      name="name"
                      required
                      placeholder="Tu Nombre"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#0070ea]/20 focus:border-[#0070ea] transition-all"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#0070ea]" />
                      Teléfono
                    </label>
                    <input 
                      name="phone"
                      required
                      type="tel"
                      placeholder="(408) 000-0000"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#0070ea]/20 focus:border-[#0070ea] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#0070ea]" />
                    Correo Electrónico
                  </label>
                  <input 
                    name="email"
                    required
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#0070ea]/20 focus:border-[#0070ea] transition-all"
                  />
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className="w-full bg-[#0070ea] text-white py-4 rounded-xl font-bold text-lg hover:brightness-110 transition-all shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Procesando...' : 'Confirmar Solicitud de Cita'}
                </motion.button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function Wrench(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  )
}
