'use client';

import React, { useEffect, useState } from 'react';
import AdminDashboardShell, { API, getAuthHeaders } from '@/components/admin/AdminShell';
import { Phone, Mail, Car, MessageCircle, CheckCircle2, Clock, UserPlus, Trash2, Eye } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  service_type: string;
  message: string;
  status: string;
  notes: string;
  assigned_to: string;
  created_at: string;
  source: string;
}

function statusColor(s: string) {
  switch (s) {
    case 'new': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    case 'contacted': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    case 'converted': return 'bg-green-500/10 text-green-500 border-green-500/20';
    case 'lost': return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
    default: return 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20';
  }
}

function LeadsContent() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<Lead | null>(null);
  const [notes, setNotes] = useState('');

  useEffect(() => { fetchLeads(); }, [filter]);

  async function fetchLeads() {
    try {
      const url = filter === 'all' ? `${API}/api/leads` : `${API}/api/leads?status=${filter}`;
      const res = await fetch(url, { credentials: 'include', headers: getAuthHeaders() });
      if (res.ok) { const data = await res.json(); setLeads(data.leads); }
    } catch {}
  }

  async function updateStatus(id: string, status: string) {
    await fetch(`${API}/api/leads/${id}`, {
      method: 'PATCH', credentials: 'include', headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    });
    fetchLeads();
    if (selected && selected.id === id) setSelected({ ...selected, status });
  }

  async function updateNotes(id: string) {
    await fetch(`${API}/api/leads/${id}`, {
      method: 'PATCH', credentials: 'include', headers: getAuthHeaders(),
      body: JSON.stringify({ notes }),
    });
    fetchLeads();
  }

  async function convertLead(id: string) {
    await fetch(`${API}/api/leads/${id}/convert`, {
      method: 'POST', credentials: 'include', headers: getAuthHeaders(),
    });
    fetchLeads();
    setSelected(null);
  }

  async function deleteLead(id: string) {
    if (!confirm('Delete this lead?')) return;
    await fetch(`${API}/api/leads/${id}`, {
      method: 'DELETE', credentials: 'include', headers: getAuthHeaders(),
    });
    fetchLeads();
    if (selected && selected.id === id) setSelected(null);
  }

  const filters = ['all', 'new', 'contacted', 'converted', 'lost'];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black text-white font-outfit tracking-tight" data-testid="leads-title">Leads</h1>
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              data-testid={`filter-${f}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                filter === f ? 'bg-[#0070ea] text-white' : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Lead List */}
        <div className="lg:col-span-2 space-y-2">
          {leads.length === 0 && (
            <div className="text-zinc-500 text-center py-12 bg-zinc-900 rounded-xl border border-zinc-800">No leads found</div>
          )}
          {leads.map((lead) => (
            <div
              key={lead.id}
              onClick={() => { setSelected(lead); setNotes(lead.notes || ''); }}
              data-testid={`lead-row-${lead.id}`}
              className={`bg-zinc-900 border rounded-xl p-4 cursor-pointer transition-all hover:border-zinc-700 ${
                selected?.id === lead.id ? 'border-[#0070ea]' : 'border-zinc-800'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                    <span className="text-xs font-bold text-zinc-400">{lead.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{lead.name}</div>
                    <div className="text-zinc-500 text-xs flex items-center gap-2">
                      <Phone className="w-3 h-3" /> {lead.phone}
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${statusColor(lead.status)}`}>
                  {lead.status}
                </span>
              </div>
              <div className="text-zinc-500 text-xs mt-2 flex items-center gap-4">
                {lead.vehicle && <span className="flex items-center gap-1"><Car className="w-3 h-3" /> {lead.vehicle}</span>}
                {lead.service_type && <span>{lead.service_type}</span>}
                <span className="ml-auto">{lead.created_at ? new Date(lead.created_at).toLocaleDateString() : ''}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Lead Detail */}
        <div className="lg:col-span-1">
          {selected ? (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 sticky top-6" data-testid="lead-detail">
              <h3 className="text-lg font-bold text-white mb-4 font-outfit">{selected.name}</h3>
              <div className="space-y-3 text-sm mb-6">
                <div className="flex items-center gap-2 text-zinc-300">
                  <Phone className="w-4 h-4 text-zinc-500" />
                  <a href={`tel:${selected.phone}`} className="text-[#0070ea] hover:underline">{selected.phone}</a>
                </div>
                {selected.email && (
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Mail className="w-4 h-4 text-zinc-500" /> {selected.email}
                  </div>
                )}
                {selected.vehicle && (
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Car className="w-4 h-4 text-zinc-500" /> {selected.vehicle}
                  </div>
                )}
                {selected.service_type && (
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Clock className="w-4 h-4 text-zinc-500" /> {selected.service_type}
                  </div>
                )}
                {selected.message && (
                  <div className="flex items-start gap-2 text-zinc-300">
                    <MessageCircle className="w-4 h-4 text-zinc-500 mt-0.5" />
                    <span className="italic text-zinc-400">{selected.message}</span>
                  </div>
                )}
              </div>

              {/* Status Actions */}
              <div className="space-y-2 mb-6">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Update Status</label>
                <div className="flex flex-wrap gap-2">
                  {['new', 'contacted', 'converted', 'lost'].map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(selected.id, s)}
                      data-testid={`status-${s}`}
                      className={`px-3 py-1 rounded text-xs font-bold uppercase border transition-colors ${
                        selected.status === s ? statusColor(s) : 'border-zinc-700 text-zinc-500 hover:text-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2 mb-6">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  data-testid="lead-notes"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white text-sm focus:border-[#0070ea] outline-none resize-none"
                  rows={3}
                  placeholder="Add notes about this lead..."
                />
                <button
                  onClick={() => updateNotes(selected.id)}
                  className="text-xs bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-lg hover:bg-zinc-700 transition-colors"
                >
                  Save Notes
                </button>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-zinc-800">
                {selected.status !== 'converted' && (
                  <button
                    onClick={() => convertLead(selected.id)}
                    data-testid="convert-lead-btn"
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg text-xs font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-1"
                  >
                    <UserPlus className="w-3 h-3" /> Convert to Client
                  </button>
                )}
                <button
                  onClick={() => deleteLead(selected.id)}
                  data-testid="delete-lead-btn"
                  className="bg-zinc-800 text-zinc-400 py-2 px-3 rounded-lg text-xs hover:bg-zinc-700 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center">
              <Eye className="w-8 h-8 text-zinc-700 mx-auto mb-3" />
              <p className="text-zinc-500 text-sm">Select a lead to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LeadsPage() {
  return (
    <AdminDashboardShell>
      <LeadsContent />
    </AdminDashboardShell>
  );
}
