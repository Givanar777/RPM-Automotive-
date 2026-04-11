'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard, Users, UserCheck, Wrench, LogOut, Menu, X, Phone, ChevronRight
} from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || '';

function getAuthHeaders() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  const h: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) h['Authorization'] = `Bearer ${token}`;
  return h;
}

// --- Login Page ---
function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-white font-outfit tracking-tight">RPM Admin</h1>
          <p className="text-zinc-500 text-sm mt-1">Sign in to manage your business</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4" data-testid="admin-login-form">
          {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg" data-testid="login-error">{error}</div>}
          <input
            data-testid="login-email"
            type="email" placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)} required
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-white text-sm focus:border-[#0070ea] outline-none"
          />
          <input
            data-testid="login-password"
            type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)} required
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-white text-sm focus:border-[#0070ea] outline-none"
          />
          <button
            data-testid="login-submit"
            type="submit" disabled={loading}
            className="w-full bg-[#0070ea] text-white py-3 rounded-lg font-bold text-sm hover:bg-blue-600 transition-all disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div className="text-center mt-6">
          <Link href="/" className="text-zinc-500 text-xs hover:text-white transition-colors">Back to website</Link>
        </div>
      </div>
    </div>
  );
}

// --- Sidebar ---
function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const links = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Leads', href: '/admin/leads', icon: Phone },
    { name: 'Clients', href: '/admin/clients', icon: UserCheck },
    { name: 'Team', href: '/admin/team', icon: Users },
  ];

  return (
    <aside data-testid="admin-sidebar" className={`fixed top-0 left-0 h-screen bg-zinc-950 border-r border-zinc-800 z-40 transition-all ${collapsed ? 'w-0 -translate-x-full md:w-16 md:translate-x-0' : 'w-64'}`}>
      <div className="flex items-center justify-between h-14 px-4 border-b border-zinc-800">
        {!collapsed && <span className="text-white font-black font-outfit text-sm">RPM Admin</span>}
        <button onClick={onToggle} className="text-zinc-400 hover:text-white p-1" data-testid="sidebar-toggle">
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <X className="w-4 h-4" />}
        </button>
      </div>
      <nav className="py-4 space-y-1 px-2">
        {links.map((link) => {
          const active = pathname === link.href;
          const showTeam = link.href !== '/admin/team' || (user && typeof user === 'object' && user.role === 'admin');
          if (!showTeam) return null;
          return (
            <Link
              key={link.href} href={link.href}
              data-testid={`sidebar-${link.name.toLowerCase()}`}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active ? 'bg-[#0070ea]/10 text-[#0070ea]' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <link.icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span>{link.name}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-zinc-800">
        {!collapsed && user && typeof user === 'object' && (
          <div className="text-xs text-zinc-500 mb-2 px-2 truncate">{user.name} ({user.role})</div>
        )}
        <button
          onClick={logout}
          data-testid="sidebar-logout"
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-zinc-400 hover:text-red-400 rounded-lg hover:bg-zinc-900 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          {!collapsed && 'Logout'}
        </button>
      </div>
    </aside>
  );
}

// --- Dashboard Shell ---
export default function AdminDashboardShell({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-zinc-500 text-sm">Loading...</div>
      </div>
    );
  }

  if (!user || user === false) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      {/* Mobile menu toggle */}
      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className="md:hidden fixed top-3 left-3 z-50 bg-zinc-900 p-2 rounded-lg text-zinc-400 border border-zinc-800"
        data-testid="mobile-sidebar-toggle"
      >
        <Menu className="w-5 h-5" />
      </button>
      <main className={`transition-all ${sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'} min-h-screen`}>
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

export { getAuthHeaders, API };
