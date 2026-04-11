'use client';

import React, { useEffect, useState } from 'react';
import AdminDashboardShell, { API, getAuthHeaders } from '@/components/admin/AdminShell';
import { Phone, Mail, Car, Wrench, Plus, ChevronDown, ChevronUp, Trash2, Calendar, DollarSign } from 'lucide-react';

interface ServiceRecord {
  id: string;
  vehicle: string;
  service_type: string;
  description: string;
  date: string;
  cost: number;
  technician: string;
  status: string;
  notes: string;
}

interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicles: string[];
  notes: string;
  service_count: number;
  created_at: string;
  service_records?: ServiceRecord[];
}

function ClientsContent() {
  const [clients, setClients] = useState<Client[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [records, setRecords] = useState<ServiceRecord[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    client_phone: '', vehicle: '', service_type: '', description: '',
    date: new Date().toISOString().split('T')[0], cost: 0, technician: '', notes: '',
  });

  useEffect(() => { fetchClients(); }, []);

  async function fetchClients() {
    try {
      const res = await fetch(`${API}/api/clients`, { credentials: 'include', headers: getAuthHeaders() });
      if (res.ok) { const data = await res.json(); setClients(data.clients); }
    } catch {}
  }

  async function expandClient(phone: string) {
    if (expanded === phone) { setExpanded(null); return; }
    setExpanded(phone);
    try {
      const res = await fetch(`${API}/api/clients/${encodeURIComponent(phone)}`, { credentials: 'include', headers: getAuthHeaders() });
      if (res.ok) {
        const data = await res.json();
        setRecords(data.service_records || []);
      }
    } catch {}
  }

  async function addServiceRecord() {
    if (!formData.client_phone || !formData.service_type) return;
    await fetch(`${API}/api/services`, {
      method: 'POST', credentials: 'include', headers: getAuthHeaders(),
      body: JSON.stringify({ ...formData, status: 'completed' }),
    });
    setShowForm(false);
    setFormData({ client_phone: '', vehicle: '', service_type: '', description: '', date: new Date().toISOString().split('T')[0], cost: 0, technician: '', notes: '' });
    fetchClients();
    if (expanded) expandClient(expanded);
  }

  async function deleteRecord(id: string) {
    if (!confirm('Delete this service record?')) return;
    await fetch(`${API}/api/services/${id}`, { method: 'DELETE', credentials: 'include', headers: getAuthHeaders() });
    if (expanded) expandClient(expanded);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black text-white font-outfit tracking-tight" data-testid="clients-title">Clients</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          data-testid="add-service-btn"
          className="bg-[#0070ea] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          <Plus className="w-3 h-3" /> Add Service Record
        </button>
      </div>

      {/* Add Service Form */}
      {showForm && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6" data-testid="service-form">
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">New Service Record</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <select
              value={formData.client_phone}
              onChange={(e) => setFormData({ ...formData, client_phone: e.target.value })}
              data-testid="service-client-select"
              className="bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-white text-sm focus:border-[#0070ea] outline-none"
            >
              <option value="">Select Client</option>
              {clients.map((c) => <option key={c.phone} value={c.phone}>{c.name} ({c.phone})</option>)}
            </select>
            <input
              placeholder="Vehicle" value={formData.vehicle}
              onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
              data-testid="service-vehicle"
              className="bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-white text-sm focus:border-[#0070ea] outline-none"
            />
            <input
              placeholder="Service Type" value={formData.service_type}
              onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
              data-testid="service-type"
              className="bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-white text-sm focus:border-[#0070ea] outline-none"
            />
            <input
              placeholder="Description" value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-white text-sm focus:border-[#0070ea] outline-none"
            />
            <input
              type="date" value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-white text-sm focus:border-[#0070ea] outline-none"
            />
            <input
              type="number" placeholder="Cost ($)" value={formData.cost || ''}
              onChange={(e) => setFormData({ ...formData, cost: parseFloat(e.target.value) || 0 })}
              className="bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-white text-sm focus:border-[#0070ea] outline-none"
            />
            <input
              placeholder="Technician" value={formData.technician}
              onChange={(e) => setFormData({ ...formData, technician: e.target.value })}
              className="bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-white text-sm focus:border-[#0070ea] outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={addServiceRecord}
              data-testid="save-service-btn"
              className="bg-[#0070ea] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-600"
            >Save Record</button>
            <button onClick={() => setShowForm(false)} className="text-zinc-400 text-xs px-4 py-2 hover:text-white">Cancel</button>
          </div>
        </div>
      )}

      {/* Client List */}
      <div className="space-y-3">
        {clients.length === 0 && (
          <div className="text-zinc-500 text-center py-12 bg-zinc-900 rounded-xl border border-zinc-800">
            No clients yet. Convert leads to create clients.
          </div>
        )}
        {clients.map((client) => (
          <div key={client.id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden" data-testid={`client-row-${client.phone}`}>
            <div
              onClick={() => expandClient(client.phone)}
              className="p-5 cursor-pointer hover:bg-zinc-800/50 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                  <span className="text-sm font-bold text-zinc-400">{client.name.charAt(0)}</span>
                </div>
                <div>
                  <div className="text-white font-medium">{client.name}</div>
                  <div className="text-zinc-500 text-xs flex items-center gap-3">
                    <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {client.phone}</span>
                    {client.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {client.email}</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-zinc-400 text-xs">{client.service_count} services</div>
                  {client.vehicles && client.vehicles.length > 0 && (
                    <div className="text-zinc-600 text-xs flex items-center gap-1">
                      <Car className="w-3 h-3" /> {client.vehicles.filter(v => v).join(', ')}
                    </div>
                  )}
                </div>
                {expanded === client.phone ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
              </div>
            </div>

            {expanded === client.phone && (
              <div className="border-t border-zinc-800 p-5 bg-zinc-900/50">
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Wrench className="w-3 h-3" /> Service History
                </h4>
                {records.length === 0 ? (
                  <p className="text-zinc-600 text-sm">No service records yet.</p>
                ) : (
                  <div className="space-y-2">
                    {records.map((rec) => (
                      <div key={rec.id} className="bg-zinc-800 rounded-lg p-4 flex items-start justify-between">
                        <div>
                          <div className="text-white text-sm font-medium">{rec.service_type}</div>
                          <div className="text-zinc-400 text-xs mt-1">{rec.description}</div>
                          <div className="text-zinc-500 text-xs mt-2 flex items-center gap-3">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {rec.date}</span>
                            <span className="flex items-center gap-1"><Car className="w-3 h-3" /> {rec.vehicle}</span>
                            {rec.cost > 0 && <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> ${rec.cost}</span>}
                            {rec.technician && <span>Tech: {rec.technician}</span>}
                          </div>
                        </div>
                        <button onClick={() => deleteRecord(rec.id)} className="text-zinc-600 hover:text-red-400 transition-colors p-1">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ClientsPage() {
  return (
    <AdminDashboardShell>
      <ClientsContent />
    </AdminDashboardShell>
  );
}
