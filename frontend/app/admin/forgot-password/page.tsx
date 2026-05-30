'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || '';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      if (res.ok) {
        setSent(true);
      } else {
        const data = await res.json();
        setError(data.detail || 'Something went wrong.');
      }
    } catch {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-white font-outfit tracking-tight">Reset Password</h1>
          <p className="text-zinc-500 text-sm mt-1">
            {sent ? 'Check your email' : 'Enter your email to receive a reset link'}
          </p>
        </div>

        {sent ? (
          <div data-testid="reset-email-sent">
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 text-center mb-6">
              <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <p className="text-green-400 text-sm font-medium mb-1">Reset link sent!</p>
              <p className="text-zinc-400 text-xs">
                If an account exists for <span className="text-white">{email}</span>, you&apos;ll receive an email with a link to reset your password.
              </p>
            </div>
            <p className="text-zinc-600 text-xs text-center mb-6">
              Didn&apos;t receive it? Check your spam folder or try again in a few minutes.
            </p>
            <div className="flex flex-col gap-2 items-center">
              <button
                onClick={() => { setSent(false); setEmail(''); }}
                className="text-zinc-400 text-xs hover:text-white transition-colors"
                data-testid="try-again-btn"
              >
                Try a different email
              </button>
              <Link href="/admin" className="text-zinc-500 text-xs hover:text-white transition-colors flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Back to login
              </Link>
            </div>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-4" data-testid="forgot-password-form">
              {error && (
                <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm p-3 rounded-lg" data-testid="forgot-error">
                  {error}
                </div>
              )}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input
                  data-testid="forgot-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-3 py-3 text-white text-sm focus:border-[#0070ea] outline-none"
                />
              </div>
              <button
                data-testid="forgot-submit"
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black py-3 rounded-lg font-bold text-sm hover:bg-zinc-200 transition-all disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
            <div className="text-center mt-6">
              <Link href="/admin" className="text-zinc-500 text-xs hover:text-white transition-colors flex items-center gap-1 justify-center">
                <ArrowLeft className="w-3 h-3" /> Back to login
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
