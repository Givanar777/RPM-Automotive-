'use client';

import React, { useEffect, useState } from 'react';
import AdminDashboardShell, { API, getAuthHeaders } from '@/components/admin/AdminShell';
import { Phone, Users, UserCheck, Wrench, TrendingUp, AlertCircle } from 'lucide-react';

interface Stats {
  total_leads: number;
  new_leads: number;
  contacted: number;
  converted: number;
  total_clients: number;
  total_services: number;
}

function DashboardContent() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentLeads, setRecentLeads] = useState<any[]>([]);

  useEffect(() => {
    fetchStats();
    fetchRecentLeads();
  }, []);

  async function fetchStats() {
    try {
      const res = await fetch(`${API}/api/dashboard/stats`, { credentials: 'include', headers: getAuthHeaders() });
      if (res.ok) setStats(await res.json());
    } catch {}
  }

  async function fetchRecentLeads() {
    try {
      const res = await fetch(`${API}/api/leads?status=new`, { credentials: 'include', headers: getAuthHeaders() });
      if (res.ok) {
        const data = await res.json();
        setRecentLeads(data.leads.slice(0, 5));
      }
    } catch {}
  }

  const cards = stats ? [
    { label: 'New Leads', value: stats.new_leads, icon: AlertCircle, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    { label: 'Total Leads', value: stats.total_leads, icon: Phone, color: 'text-[#0070ea]', bg: 'bg-[#0070ea]/10' },
    { label: 'Contacted', value: stats.contacted, icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Converted', value: stats.converted, icon: UserCheck, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Clients', value: stats.total_clients, icon: Users, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
    { label: 'Services Done', value: stats.total_services, icon: Wrench, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  ] : [];

  return (
    <div>
      <h1 className="text-2xl font-black text-white font-outfit tracking-tight mb-8" data-testid="dashboard-title">Dashboard</h1>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {cards.map((card) => (
          <div key={card.label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5" data-testid={`stat-${card.label.toLowerCase().replace(/\s/g, '-')}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-8 h-8 ${card.bg} rounded-lg flex items-center justify-center`}>
                <card.icon className={`w-4 h-4 ${card.color}`} />
              </div>
              <span className="text-zinc-500 text-xs uppercase tracking-wider font-bold">{card.label}</span>
            </div>
            <div className="text-3xl font-black text-white font-outfit">{card.value}</div>
          </div>
        ))}
      </div>

      {recentLeads.length > 0 && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Recent New Leads</h2>
          <div className="space-y-3">
            {recentLeads.map((lead) => (
              <div key={lead.id || lead.phone} className="flex items-center justify-between py-3 border-b border-zinc-800 last:border-0">
                <div>
                  <div className="text-white font-medium text-sm">{lead.name}</div>
                  <div className="text-zinc-500 text-xs">{lead.phone} - {lead.service_type || 'N/A'}</div>
                </div>
                <div className="text-xs text-zinc-600">{lead.created_at ? new Date(lead.created_at).toLocaleDateString() : ''}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  return (
    <AdminDashboardShell>
      <DashboardContent />
    </AdminDashboardShell>
  );
}
