import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

interface Order {
  id: number;
  orderNumber: string;
  status: string;
  total: number;
  customerName: string;
  createdAt: string;
}

export const DashboardPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    api.get<Order[]>('/admin/orders').then(setOrders).catch(() => {});
    api.get<any[]>('/admin/products').then(setProducts).catch(() => {});
  }, []);

  const pending = orders.filter((o) => o.status === 'PENDING').length;
  const today = orders.filter((o) => {
    const d = new Date(o.createdAt);
    const now = new Date();
    return d.toDateString() === now.toDateString();
  });
  const revenue = today.reduce((sum, o) => sum + (o.total || 0), 0);

  return (
    <div>
      <div className="page-header"><h1>Dashboard</h1></div>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="label">Total Orders</div>
          <div className="value">{orders.length}</div>
        </div>
        <div className="stat-card">
          <div className="label">Pending Orders</div>
          <div className="value">{pending}</div>
        </div>
        <div className="stat-card">
          <div className="label">Today's Revenue</div>
          <div className="value">Rp{revenue.toLocaleString('id-ID')}</div>
        </div>
        <div className="stat-card">
          <div className="label">Active Products</div>
          <div className="value">{products.filter((p) => p.active).length}</div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: 16 }}>Recent Orders</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Order #</th><th>Customer</th><th>Status</th><th>Total</th></tr>
            </thead>
            <tbody>
              {orders.slice(0, 10).map((o) => (
                <tr key={o.id}>
                  <td>{o.orderNumber}</td>
                  <td>{o.customerName || 'Guest'}</td>
                  <td><span className={`badge-status ${o.status.toLowerCase()}`}>{o.status}</span></td>
                  <td>Rp{(o.total || 0).toLocaleString('id-ID')}</td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr><td colSpan={4} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No orders yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
