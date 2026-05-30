'use client';

import React, { useEffect, useState } from 'react';
import AdminDashboardShell, { API, getAuthHeaders } from '@/components/admin/AdminShell';
import { useAuth } from '@/context/AuthContext';
import { UserPlus, Trash2, Shield, User } from 'lucide-react';

interface TeamMember {
  id: string;
  email: string;
  name: string;
  role: string;
  created_at: string;
}

function TeamContent() {
  const { user } = useAuth();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', name: '', role: 'member' });
  const [error, setError] = useState('');

  useEffect(() => { fetchTeam(); }, []);

  async function fetchTeam() {
    try {
      const res = await fetch(`${API}/api/team`, { credentials: 'include', headers: getAuthHeaders() });
      if (res.ok) { const data = await res.json(); setMembers(data.members); }
    } catch {}
  }

  async function addMember() {
    setError('');
    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: 'POST', credentials: 'include', headers: getAuthHeaders(),
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json();
        setError(typeof err.detail === 'string' ? err.detail : 'Failed to add member');
        return;
      }
      setShowAdd(false);
      setForm({ email: '', password: '', name: '', role: 'member' });
      fetchTeam();
    } catch {
      setError('Failed to add member');
    }
  }

  async function updateRole(id: string, role: string) {
    await fetch(`${API}/api/team/${id}`, {
      method: 'PATCH', credentials: 'include', headers: getAuthHeaders(),
      body: JSON.stringify({ role }),
    });
    fetchTeam();
  }

  async function deleteMember(id: string) {
    if (!confirm('Remove this team member?')) return;
    await fetch(`${API}/api/team/${id}`, {
      method: 'DELETE', credentials: 'include', headers: getAuthHeaders(),
    });
    fetchTeam();
  }

  const isAdmin = user && typeof user === 'object' && user.role === 'admin';

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black text-white font-outfit tracking-tight" data-testid="team-title">Team</h1>
        {isAdmin && (
          <button
            onClick={() => setShowAdd(!showAdd)}
            data-testid="add-member-btn"
            className="bg-[#0070ea] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <UserPlus className="w-3 h-3" /> Add Team Member
          </button>
        )}
      </div>

      {showAdd && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6" data-testid="add-member-form">
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">New Team Member</h3>
          {error && <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm p-3 rounded-lg mb-4">{error}</div>}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <input
              placeholder="Full Name" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              data-testid="member-name"
              className="bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-white text-sm focus:border-[#0070ea] outline-none"
            />
            <input
              placeholder="Email" type="email" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              data-testid="member-email"
              className="bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-white text-sm focus:border-[#0070ea] outline-none"
            />
            <input
              placeholder="Password" type="password" value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              data-testid="member-password"
              className="bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-white text-sm focus:border-[#0070ea] outline-none"
            />
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              data-testid="member-role"
              className="bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-white text-sm focus:border-[#0070ea] outline-none"
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button onClick={addMember} data-testid="save-member-btn" className="bg-[#0070ea] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-600">
              Add Member
            </button>
            <button onClick={() => setShowAdd(false)} className="text-zinc-400 text-xs px-4 py-2 hover:text-white">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {members.map((member) => (
          <div key={member.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex items-center justify-between" data-testid={`member-row-${member.id}`}>
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${member.role === 'admin' ? 'bg-[#0070ea]/10' : 'bg-zinc-800'}`}>
                {member.role === 'admin' ? <Shield className="w-4 h-4 text-[#0070ea]" /> : <User className="w-4 h-4 text-zinc-500" />}
              </div>
              <div>
                <div className="text-white font-medium text-sm">{member.name}</div>
                <div className="text-zinc-500 text-xs">{member.email}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                member.role === 'admin' ? 'bg-[#0070ea]/10 text-[#0070ea]' : 'bg-zinc-800 text-zinc-400'
              }`}>
                {member.role}
              </span>
              {isAdmin && member.email !== (user as any)?.email && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => updateRole(member.id, member.role === 'admin' ? 'member' : 'admin')}
                    className="text-zinc-600 hover:text-[#0070ea] transition-colors p-1 text-xs"
                    title="Toggle role"
                  >
                    <Shield className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteMember(member.id)}
                    className="text-zinc-600 hover:text-zinc-300 transition-colors p-1"
                    title="Remove member"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TeamPage() {
  return (
    <AdminDashboardShell>
      <TeamContent />
    </AdminDashboardShell>
  );
}
