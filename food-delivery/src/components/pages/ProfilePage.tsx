import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import './ProfilePage.css';

export const ProfilePage: React.FC = () => {
  const { customer, logout, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState(customer?.displayName || '');
  const [phone, setPhone] = useState(customer?.phone || '');
  const [address, setAddress] = useState(customer?.address || '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await api.put('/customer/profile', { displayName, phone, address });
    await refreshProfile();
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="profile-page">
      <header className="profile-page__header">
        <button onClick={() => navigate('/')} aria-label="Go back"><ArrowLeft size={22} /></button>
        <h1>Profile</h1>
        <button onClick={() => { logout(); navigate('/'); }} aria-label="Logout"><LogOut size={22} /></button>
      </header>

      {customer?.avatarUrl && (
        <div className="profile-page__avatar-wrap">
          <img src={customer.avatarUrl} alt="" className="profile-page__avatar" />
        </div>
      )}

      <form className="profile-page__form" onSubmit={handleSave}>
        <div className="profile-field">
          <label>Email</label>
          <input value={customer?.email || ''} disabled />
        </div>
        <div className="profile-field">
          <label>Display Name</label>
          <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Your name" />
        </div>
        <div className="profile-field">
          <label>Phone Number</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+62 8xx xxxx xxxx" />
        </div>
        <div className="profile-field">
          <label>Delivery Address</label>
          <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Your address" rows={3} />
        </div>
        <button type="submit" className="profile-save-btn" disabled={saving}>
          {saved ? 'Saved!' : saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>

      <button className="profile-orders-btn" onClick={() => navigate('/orders')}>
        View Order History
      </button>
    </div>
  );
};
