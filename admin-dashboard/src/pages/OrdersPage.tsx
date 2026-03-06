import React, { useEffect, useState, useCallback } from 'react';
import { api } from '../services/api';

interface OrderItem {
  productName: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

interface Order {
  id: number;
  orderNumber: string;
  status: string;
  deliveryType: string;
  subtotal: number;
  deliveryFee: number;
  platformFee: number;
  discount: number;
  total: number;
  customerName: string;
  customerEmail: string;
  deliveryAddress: string;
  contactPhone: string;
  items: OrderItem[];
  createdAt: string;
}

const STATUSES = ['PENDING', 'CONFIRMED', 'PREPARING', 'DELIVERING', 'DELIVERED', 'CANCELLED'];

export const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selected, setSelected] = useState<Order | null>(null);
  const [filter, setFilter] = useState('ALL');

  const load = useCallback(() => {
    api.get<Order[]>('/admin/orders').then(setOrders).catch(() => {});
  }, []);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (id: number, status: string) => {
    await api.patch(`/admin/orders/${id}/status`, { status });
    load();
    if (selected?.id === id) setSelected({ ...selected, status });
  };

  const filtered = filter === 'ALL' ? orders : orders.filter((o) => o.status === filter);

  return (
    <div>
      <div className="page-header"><h1>Orders</h1></div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {['ALL', ...STATUSES].map((s) => (
          <button key={s} className={`btn ${filter === s ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setFilter(s)}>{s}</button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 16 }}>
        <div className="card table-wrap" style={{ flex: 2 }}>
          <table>
            <thead>
              <tr><th>Order #</th><th>Customer</th><th>Status</th><th>Total</th><th>Date</th></tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} onClick={() => setSelected(o)} style={{ cursor: 'pointer', background: selected?.id === o.id ? 'var(--bg)' : '' }}>
                  <td>{o.orderNumber}</td>
                  <td>{o.customerName || o.customerEmail || 'Guest'}</td>
                  <td><span className={`badge-status ${o.status.toLowerCase()}`}>{o.status}</span></td>
                  <td>Rp{(o.total || 0).toLocaleString('id-ID')}</td>
                  <td>{new Date(o.createdAt).toLocaleDateString('id-ID')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selected && (
          <div className="card" style={{ flex: 1 }}>
            <h3>Order {selected.orderNumber}</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: 4, fontSize: 14 }}>
              {selected.customerName || 'Guest'} &middot; {selected.customerEmail}
            </p>
            <p style={{ fontSize: 14, marginTop: 4 }}>{selected.deliveryAddress}</p>
            <p style={{ fontSize: 14 }}>{selected.contactPhone}</p>

            <h4 style={{ marginTop: 16, marginBottom: 8 }}>Items</h4>
            {selected.items?.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, padding: '4px 0' }}>
                <span>{item.productName} x{item.quantity}</span>
                <span>Rp{item.lineTotal.toLocaleString('id-ID')}</span>
              </div>
            ))}
            <hr style={{ margin: '12px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
              <span>Total</span><span>Rp{(selected.total || 0).toLocaleString('id-ID')}</span>
            </div>

            <h4 style={{ marginTop: 16, marginBottom: 8 }}>Update Status</h4>
            <select
              value={selected.status}
              onChange={(e) => updateStatus(selected.id, e.target.value)}
              style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border)' }}
            >
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};
