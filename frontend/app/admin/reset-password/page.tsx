'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Lock, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || '';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [valid, setValid] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [tokenError, setTokenError] = useState('');

  useEffect(() => {
    if (!token) {
      setTokenError('No reset token found. Please use the link from your email.');
      setVerifying(false);
      return;
    }
    verifyToken();
  }, [token]);

  async function verifyToken() {
    try {
      const res = await fetch(`${API}/api/auth/verify-reset-token?token=${encodeURIComponent(token)}`);
      if (res.ok) {
        setValid(true);
      } else {
        const data = await res.json();
        setTokenError(data.detail || 'Invalid or expired reset link.');
      }
    } catch {
      setTokenError('Network error. Please try again.');
    }
    setVerifying(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      if (res.ok) {
        setSuccess(true);
      } else {
        const data = await res.json();
        setError(data.detail || 'Failed to reset password.');
      }
    } catch {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  }

  if (verifying) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <p className="text-zinc-500 text-sm">Verifying reset link...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {tokenError ? (
          <div data-testid="token-error">
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center mb-6">
              <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-3" />
              <p className="text-red-400 text-sm font-medium mb-1">Invalid Link</p>
              <p className="text-zinc-400 text-xs">{tokenError}</p>
            </div>
            <div className="flex flex-col gap-3 items-center">
              <Link href="/admin/forgot-password" className="text-white text-xs bg-zinc-800 px-4 py-2 rounded-lg hover:bg-zinc-700 transition-colors">
                Request a new reset link
              </Link>
              <Link href="/admin" className="text-zinc-500 text-xs hover:text-white transition-colors flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Back to login
              </Link>
            </div>
          </div>
        ) : success ? (
          <div data-testid="reset-success">
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 text-center mb-6">
              <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <p className="text-green-400 text-sm font-medium mb-1">Password Reset!</p>
              <p className="text-zinc-400 text-xs">Your password has been updated. You can now sign in with your new password.</p>
            </div>
            <div className="text-center">
              <Link href="/admin" data-testid="go-to-login" className="inline-block bg-white text-black px-6 py-2.5 rounded-lg text-xs font-bold hover:bg-zinc-200 transition-colors">
                Sign In
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-black text-white font-outfit tracking-tight">New Password</h1>
              <p className="text-zinc-500 text-sm mt-1">Enter your new password below</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4" data-testid="reset-password-form">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg" data-testid="reset-error">
                  {error}
                </div>
              )}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input
                  data-testid="reset-password-input"
                  type="password"
                  placeholder="New password (min 6 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-3 py-3 text-white text-sm focus:border-[#0070ea] outline-none"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input
                  data-testid="reset-confirm-input"
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-3 py-3 text-white text-sm focus:border-[#0070ea] outline-none"
                />
              </div>
              <button
                data-testid="reset-submit"
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black py-3 rounded-lg font-bold text-sm hover:bg-zinc-200 transition-all disabled:opacity-50"
              >
                {loading ? 'Resetting...' : 'Reset Password'}
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
