import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { OrderResponse } from '../../data/types';
import { api } from '../../services/api';
import { formatRupiah } from '../atoms/PriceDisplay';
import './OrderHistoryPage.css';

export const OrderHistoryPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get<OrderResponse[]>('/orders/my')
      .then(setOrders)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="orders-page">
      <header className="orders-page__header">
        <button onClick={() => navigate(-1)}><ArrowLeft size={22} /></button>
        <h1>Order History</h1>
        <div style={{ width: 22 }} />
      </header>

      {loading && <p style={{ textAlign: 'center', padding: 32, color: 'var(--color-text-muted)' }}>Loading...</p>}

      <div className="orders-page__list">
        {orders.map((o) => (
          <div key={o.id} className="order-card" onClick={() => navigate(`/track/${o.orderNumber}`)}>
            <div className="order-card__top">
              <span className="order-card__number">#{o.orderNumber}</span>
              <span className={`order-card__status order-card__status--${o.status.toLowerCase()}`}>{o.status}</span>
            </div>
            <p className="order-card__items">
              {o.items.map((i) => `${i.productName} x${i.quantity}`).join(', ')}
            </p>
            <div className="order-card__bottom">
              <span>{formatRupiah(o.total)}</span>
              <span className="order-card__date">{new Date(o.createdAt).toLocaleDateString('id-ID')}</span>
            </div>
          </div>
        ))}
        {!loading && orders.length === 0 && (
          <p style={{ textAlign: 'center', padding: 32, color: 'var(--color-text-muted)' }}>
            No orders yet. Start ordering!
          </p>
        )}
      </div>
    </div>
  );
};
