import React, { useEffect, useState, useCallback } from 'react';
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { api } from '../services/api';

interface Promo {
  id: number;
  code: string;
  description: string;
  discountAmount: number;
  minSpend: number | null;
  validFrom: string | null;
  validUntil: string | null;
  active: boolean;
}

const emptyForm = { code: '', description: '', discountAmount: '', minSpend: '', validUntil: '' };

export const PromosPage: React.FC = () => {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Promo | null>(null);
  const [form, setForm] = useState(emptyForm);

  const load = useCallback(() => {
    api.get<Promo[]>('/admin/promos').then(setPromos).catch(() => {});
  }, []);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (p: Promo) => {
    setEditing(p);
    setForm({
      code: p.code, description: p.description,
      discountAmount: String(p.discountAmount),
      minSpend: p.minSpend ? String(p.minSpend) : '',
      validUntil: p.validUntil ? p.validUntil.substring(0, 10) : '',
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      code: form.code, description: form.description,
      discountAmount: Number(form.discountAmount),
      minSpend: form.minSpend ? Number(form.minSpend) : null,
      validFrom: null,
      validUntil: form.validUntil ? new Date(form.validUntil).toISOString() : null,
    };
    if (editing) await api.put(`/admin/promos/${editing.id}`, body);
    else await api.post('/admin/promos', body);
    setShowModal(false);
    load();
  };

  return (
    <div>
      <div className="page-header">
        <h1>Promos</h1>
        <button className="btn btn-primary" onClick={openCreate}><Plus size={16} /> Add Promo</button>
      </div>
      <div className="card table-wrap">
        <table>
          <thead>
            <tr><th>Code</th><th>Description</th><th>Discount</th><th>Min Spend</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {promos.map((p) => (
              <tr key={p.id}>
                <td><strong>{p.code}</strong></td>
                <td>{p.description}</td>
                <td>Rp{p.discountAmount.toLocaleString('id-ID')}</td>
                <td>{p.minSpend ? `Rp${p.minSpend.toLocaleString('id-ID')}` : '-'}</td>
                <td>
                  <button onClick={() => { api.patch(`/admin/promos/${p.id}/toggle`).then(load); }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    {p.active ? <ToggleRight size={24} color="var(--success)" /> : <ToggleLeft size={24} color="var(--text-muted)" />}
                  </button>
                </td>
                <td>
                  <button className="btn btn-outline" onClick={() => openEdit(p)} style={{ marginRight: 8 }}><Pencil size={14} /></button>
                  <button className="btn btn-danger" onClick={() => { if (window.confirm('Delete?')) api.del(`/admin/promos/${p.id}`).then(load); }}><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
            <h2>{editing ? 'Edit Promo' : 'New Promo'}</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Code</label>
                <input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Discount (Rp)</label>
                <input type="number" value={form.discountAmount} onChange={(e) => setForm({ ...form, discountAmount: e.target.value })} required />
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Min Spend (Rp)</label>
                <input type="number" value={form.minSpend} onChange={(e) => setForm({ ...form, minSpend: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Valid Until</label>
                <input type="date" value={form.validUntil} onChange={(e) => setForm({ ...form, validUntil: e.target.value })} />
              </div>
            </div>
            <div className="modal-actions">
              <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">{editing ? 'Save' : 'Create'}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
