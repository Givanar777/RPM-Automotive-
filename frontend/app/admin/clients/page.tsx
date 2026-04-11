'use client';

import React, { useEffect, useState } from 'react';
import AdminDashboardShell, { API, getAuthHeaders } from '@/components/admin/AdminShell';
import {
  Phone, Mail, Car, Wrench, Plus, ChevronDown, ChevronUp, Trash2,
  Calendar, DollarSign, Gauge, FileText, User, Search, X, Edit2, Save
} from 'lucide-react';

interface ServiceRecord {
  id: string;
  vehicle: string;
  service_type: string;
  description: string;
  date: string;
  mileage: number;
  cost: number;
  technician: string;
  status: string;
  notes: string;
  created_by?: string;
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
}

const emptyForm = {
  client_phone: '', vehicle: '', service_type: '', description: '',
  date: new Date().toISOString().split('T')[0], mileage: 0, cost: 0,
  technician: '', notes: '',
};

function ClientsContent() {
  const [clients, setClients] = useState<Client[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [records, setRecords] = useState<ServiceRecord[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ ...emptyForm });
  const [search, setSearch] = useState('');
  const [editingRecord, setEditingRecord] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<ServiceRecord>>({});
  const [loadingRecords, setLoadingRecords] = useState(false);

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
    setLoadingRecords(true);
    try {
      const res = await fetch(`${API}/api/clients/${encodeURIComponent(phone)}`, { credentials: 'include', headers: getAuthHeaders() });
      if (res.ok) {
        const data = await res.json();
        setRecords(data.service_records || []);
      }
    } catch {}
    setLoadingRecords(false);
  }

  async function addServiceRecord() {
    if (!formData.client_phone || !formData.service_type) return;
    const res = await fetch(`${API}/api/services`, {
      method: 'POST', credentials: 'include', headers: getAuthHeaders(),
      body: JSON.stringify({ ...formData, status: 'completed' }),
    });
    if (res.ok) {
      setShowForm(false);
      setFormData({ ...emptyForm });
      fetchClients();
      if (expanded === formData.client_phone) {
        // Refresh the expanded client's records
        setTimeout(() => expandClient(formData.client_phone), 200);
      }
    }
  }

  async function deleteRecord(id: string) {
    if (!confirm('Delete this service record?')) return;
    await fetch(`${API}/api/services/${id}`, { method: 'DELETE', credentials: 'include', headers: getAuthHeaders() });
    setRecords(records.filter(r => r.id !== id));
    fetchClients();
  }

  async function saveEditRecord(id: string) {
    const res = await fetch(`${API}/api/services/${id}`, {
      method: 'PATCH', credentials: 'include', headers: getAuthHeaders(),
      body: JSON.stringify(editData),
    });
    if (res.ok) {
      setEditingRecord(null);
      setEditData({});
      if (expanded) {
        const phone = expanded;
        setExpanded(null);
        setTimeout(() => expandClient(phone), 200);
      }
    }
  }

  function startEdit(rec: ServiceRecord) {
    setEditingRecord(rec.id);
    setEditData({
      service_type: rec.service_type, description: rec.description,
      date: rec.date, mileage: rec.mileage, cost: rec.cost,
      technician: rec.technician, notes: rec.notes,
    });
  }

  function openFormForClient(phone: string) {
    setFormData({ ...emptyForm, client_phone: phone });
    setShowForm(true);
  }

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search) ||
    (c.email && c.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-black text-white font-outfit tracking-tight" data-testid="clients-title">Clients</h1>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              data-testid="client-search"
              placeholder="Search clients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-white text-sm focus:border-zinc-600 outline-none w-full sm:w-56"
            />
          </div>
          <button
            onClick={() => { setShowForm(!showForm); setFormData({ ...emptyForm }); }}
            data-testid="add-service-btn"
            className="bg-white text-black px-4 py-2 rounded-lg text-xs font-bold hover:bg-zinc-200 transition-colors flex items-center gap-2 shrink-0"
          >
            <Plus className="w-3 h-3" /> Add Service
          </button>
        </div>
      </div>

      {/* Add Service Form */}
      {showForm && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6" data-testid="service-form">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider">New Service Record</h3>
            <button onClick={() => setShowForm(false)} className="text-zinc-500 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="text-zinc-500 text-[11px] uppercase tracking-wider font-bold mb-1.5 block">Client *</label>
              <select
                value={formData.client_phone}
                onChange={(e) => setFormData({ ...formData, client_phone: e.target.value })}
                data-testid="service-client-select"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-white text-sm focus:border-zinc-500 outline-none"
              >
                <option value="">Select Client</option>
                {clients.map((c) => <option key={c.phone} value={c.phone}>{c.name} ({c.phone})</option>)}
              </select>
            </div>
            <div>
              <label className="text-zinc-500 text-[11px] uppercase tracking-wider font-bold mb-1.5 block">Vehicle</label>
              <input
                placeholder="e.g. 2020 BMW 328i"
                value={formData.vehicle}
                onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                data-testid="service-vehicle"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-white text-sm focus:border-zinc-500 outline-none"
              />
            </div>
            <div>
              <label className="text-zinc-500 text-[11px] uppercase tracking-wider font-bold mb-1.5 block">Service Type *</label>
              <input
                placeholder="e.g. Oil Change, Brake Pad Replacement"
                value={formData.service_type}
                onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
                data-testid="service-type"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-white text-sm focus:border-zinc-500 outline-none"
              />
            </div>
            <div>
              <label className="text-zinc-500 text-[11px] uppercase tracking-wider font-bold mb-1.5 block">Date</label>
              <input
                type="date" value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                data-testid="service-date"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-white text-sm focus:border-zinc-500 outline-none"
              />
            </div>
            <div>
              <label className="text-zinc-500 text-[11px] uppercase tracking-wider font-bold mb-1.5 block">Mileage</label>
              <input
                type="number" placeholder="e.g. 45000"
                value={formData.mileage || ''}
                onChange={(e) => setFormData({ ...formData, mileage: parseInt(e.target.value) || 0 })}
                data-testid="service-mileage"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-white text-sm focus:border-zinc-500 outline-none"
              />
            </div>
            <div>
              <label className="text-zinc-500 text-[11px] uppercase tracking-wider font-bold mb-1.5 block">Cost ($)</label>
              <input
                type="number" placeholder="0.00"
                value={formData.cost || ''}
                onChange={(e) => setFormData({ ...formData, cost: parseFloat(e.target.value) || 0 })}
                data-testid="service-cost"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-white text-sm focus:border-zinc-500 outline-none"
              />
            </div>
            <div>
              <label className="text-zinc-500 text-[11px] uppercase tracking-wider font-bold mb-1.5 block">Technician</label>
              <input
                placeholder="Technician name"
                value={formData.technician}
                onChange={(e) => setFormData({ ...formData, technician: e.target.value })}
                data-testid="service-technician"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-white text-sm focus:border-zinc-500 outline-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-zinc-500 text-[11px] uppercase tracking-wider font-bold mb-1.5 block">Description</label>
              <input
                placeholder="Brief description of work performed"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                data-testid="service-description"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-white text-sm focus:border-zinc-500 outline-none"
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-3">
              <label className="text-zinc-500 text-[11px] uppercase tracking-wider font-bold mb-1.5 block">Technician Notes</label>
              <textarea
                placeholder="Internal notes about the service..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                data-testid="service-notes"
                rows={2}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-white text-sm focus:border-zinc-500 outline-none resize-none"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={addServiceRecord}
              data-testid="save-service-btn"
              className="bg-white text-black px-5 py-2.5 rounded-lg text-xs font-bold hover:bg-zinc-200 transition-colors"
            >Save Record</button>
            <button onClick={() => setShowForm(false)} className="text-zinc-400 text-xs px-4 py-2 hover:text-white transition-colors">Cancel</button>
          </div>
        </div>
      )}

      {/* Client List */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-zinc-500 text-center py-16 bg-zinc-900 rounded-xl border border-zinc-800" data-testid="no-clients">
            {clients.length === 0 ? 'No clients yet. Convert leads to create clients.' : 'No clients match your search.'}
          </div>
        )}
        {filtered.map((client) => (
          <div key={client.id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden" data-testid={`client-row-${client.phone}`}>
            <div
              onClick={() => expandClient(client.phone)}
              className="p-5 cursor-pointer hover:bg-zinc-800/50 transition-colors flex items-center justify-between"
              data-testid={`client-expand-${client.phone}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-zinc-400">{client.name.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <div className="text-white font-medium">{client.name}</div>
                  <div className="text-zinc-500 text-xs flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5">
                    <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {client.phone}</span>
                    {client.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {client.email}</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <div className="text-zinc-400 text-xs font-medium">{client.service_count} service{client.service_count !== 1 ? 's' : ''}</div>
                  {client.vehicles && client.vehicles.filter(v => v).length > 0 && (
                    <div className="text-zinc-600 text-xs flex items-center gap-1 mt-0.5 justify-end">
                      <Car className="w-3 h-3" /> {client.vehicles.filter(v => v).join(', ')}
                    </div>
                  )}
                </div>
                {expanded === client.phone ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
              </div>
            </div>

            {expanded === client.phone && (
              <div className="border-t border-zinc-800 p-5 bg-zinc-950/50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                    <Wrench className="w-3.5 h-3.5" /> Service History
                  </h4>
                  <button
                    onClick={() => openFormForClient(client.phone)}
                    data-testid={`add-service-for-${client.phone}`}
                    className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors bg-zinc-800 px-3 py-1.5 rounded-lg"
                  >
                    <Plus className="w-3 h-3" /> Add Service
                  </button>
                </div>

                {loadingRecords ? (
                  <p className="text-zinc-600 text-sm">Loading records...</p>
                ) : records.length === 0 ? (
                  <p className="text-zinc-600 text-sm py-4 text-center" data-testid="no-records">No service records yet for this client.</p>
                ) : (
                  <div className="space-y-2">
                    {records.map((rec) => (
                      <div key={rec.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4" data-testid={`service-record-${rec.id}`}>
                        {editingRecord === rec.id ? (
                          /* Edit mode */
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                              <input value={editData.service_type || ''} onChange={(e) => setEditData({ ...editData, service_type: e.target.value })} placeholder="Service Type" className="bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-white text-sm focus:border-zinc-500 outline-none" />
                              <input value={editData.description || ''} onChange={(e) => setEditData({ ...editData, description: e.target.value })} placeholder="Description" className="bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-white text-sm focus:border-zinc-500 outline-none" />
                              <input type="date" value={editData.date || ''} onChange={(e) => setEditData({ ...editData, date: e.target.value })} className="bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-white text-sm focus:border-zinc-500 outline-none" />
                              <input type="number" value={editData.mileage || ''} onChange={(e) => setEditData({ ...editData, mileage: parseInt(e.target.value) || 0 })} placeholder="Mileage" className="bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-white text-sm focus:border-zinc-500 outline-none" />
                              <input type="number" value={editData.cost || ''} onChange={(e) => setEditData({ ...editData, cost: parseFloat(e.target.value) || 0 })} placeholder="Cost" className="bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-white text-sm focus:border-zinc-500 outline-none" />
                              <input value={editData.technician || ''} onChange={(e) => setEditData({ ...editData, technician: e.target.value })} placeholder="Technician" className="bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-white text-sm focus:border-zinc-500 outline-none" />
                            </div>
                            <textarea value={editData.notes || ''} onChange={(e) => setEditData({ ...editData, notes: e.target.value })} placeholder="Notes" rows={2} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-white text-sm focus:border-zinc-500 outline-none resize-none" />
                            <div className="flex gap-2">
                              <button onClick={() => saveEditRecord(rec.id)} className="bg-white text-black px-3 py-1.5 rounded text-xs font-bold hover:bg-zinc-200 flex items-center gap-1"><Save className="w-3 h-3" /> Save</button>
                              <button onClick={() => setEditingRecord(null)} className="text-zinc-400 text-xs px-3 py-1.5 hover:text-white">Cancel</button>
                            </div>
                          </div>
                        ) : (
                          /* View mode */
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-1.5">
                                <span className="text-white text-sm font-medium">{rec.service_type}</span>
                                <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded ${rec.status === 'completed' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                                  {rec.status}
                                </span>
                              </div>
                              {rec.description && <p className="text-zinc-400 text-xs mb-2">{rec.description}</p>}
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-zinc-500 text-xs">
                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {rec.date}</span>
                                {rec.vehicle && <span className="flex items-center gap-1"><Car className="w-3 h-3" /> {rec.vehicle}</span>}
                                {rec.mileage > 0 && <span className="flex items-center gap-1" data-testid={`mileage-${rec.id}`}><Gauge className="w-3 h-3" /> {rec.mileage.toLocaleString()} mi</span>}
                                {rec.cost > 0 && <span className="flex items-center gap-1" data-testid={`cost-${rec.id}`}><DollarSign className="w-3 h-3" /> ${rec.cost.toFixed(2)}</span>}
                                {rec.technician && <span className="flex items-center gap-1"><User className="w-3 h-3" /> {rec.technician}</span>}
                              </div>
                              {rec.notes && (
                                <div className="mt-2 text-xs text-zinc-500 bg-zinc-800/50 rounded px-3 py-2 flex items-start gap-2" data-testid={`notes-${rec.id}`}>
                                  <FileText className="w-3 h-3 mt-0.5 shrink-0 text-zinc-600" />
                                  <span>{rec.notes}</span>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              <button onClick={() => startEdit(rec)} className="text-zinc-600 hover:text-zinc-300 transition-colors p-1.5" data-testid={`edit-record-${rec.id}`}>
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button onClick={() => deleteRecord(rec.id)} className="text-zinc-600 hover:text-red-400 transition-colors p-1.5" data-testid={`delete-record-${rec.id}`}>
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        )}
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
