import React, { useEffect, useState, useCallback } from 'react';
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { api } from '../services/api';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  badge: string;
  active: boolean;
  categoryId: number | null;
  categoryName: string | null;
}

interface Category {
  id: number;
  name: string;
}

const emptyForm = { name: '', description: '', price: '', imageUrl: '', badge: '', categoryId: '' };

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyForm);

  const load = useCallback(() => {
    api.get<Product[]>('/admin/products').then(setProducts).catch(() => {});
    api.get<Category[]>('/admin/categories').then(setCategories).catch(() => {});
  }, []);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({
      name: p.name, description: '', price: String(p.price),
      imageUrl: p.imageUrl || '', badge: p.badge || '',
      categoryId: p.categoryId ? String(p.categoryId) : '',
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      name: form.name, description: form.description || null,
      price: Number(form.price), imageUrl: form.imageUrl || null,
      badge: form.badge || null, categoryId: form.categoryId ? Number(form.categoryId) : null,
    };
    if (editing) await api.put(`/admin/products/${editing.id}`, body);
    else await api.post('/admin/products', body);
    setShowModal(false);
    load();
  };

  const handleToggle = async (id: number) => { await api.patch(`/admin/products/${id}/toggle`); load(); };
  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this product?')) return;
    await api.del(`/admin/products/${id}`); load();
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const res = await api.uploadFile(file);
      setForm((f) => ({ ...f, imageUrl: res.url }));
    } catch { alert('Upload failed'); }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Products</h1>
        <button className="btn btn-primary" onClick={openCreate}><Plus size={16} /> Add Product</button>
      </div>
      <div className="card table-wrap">
        <table>
          <thead>
            <tr><th>Name</th><th>Price</th><th>Category</th><th>Badge</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {p.imageUrl && <img src={p.imageUrl} alt="" style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover' }} />}
                  {p.name}
                </td>
                <td>Rp{p.price.toLocaleString('id-ID')}</td>
                <td>{p.categoryName || '-'}</td>
                <td>{p.badge || '-'}</td>
                <td>
                  <button onClick={() => handleToggle(p.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    {p.active ? <ToggleRight size={24} color="var(--success)" /> : <ToggleLeft size={24} color="var(--text-muted)" />}
                  </button>
                </td>
                <td>
                  <button className="btn btn-outline" onClick={() => openEdit(p)} style={{ marginRight: 8 }}><Pencil size={14} /></button>
                  <button className="btn btn-danger" onClick={() => handleDelete(p.id)}><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
            <h2>{editing ? 'Edit Product' : 'New Product'}</h2>
            <div className="form-group">
              <label>Name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Price (Rp)</label>
                <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
                  <option value="">None</option>
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Badge</label>
              <select value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })}>
                <option value="">None</option>
                <option value="Most ordered">Most ordered</option>
                <option value="Most liked">Most liked</option>
              </select>
            </div>
            <div className="form-group">
              <label>Image</label>
              <input type="file" accept="image/*" onChange={handleUpload} />
              {form.imageUrl && <input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="Or paste URL" style={{ marginTop: 8 }} />}
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
