import React, { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import { api } from '../services/api';

interface Settings {
  storeName: string;
  location: string;
  phone: string;
  email: string;
  deliveryFeeStandard: number;
  deliveryFeePriority: number;
  deliveryFeeSaver: number;
  prioritySurcharge: number;
  deliveryTimeStandard: number;
  deliveryTimePriority: number;
  deliveryTimeSaver: number;
  maintenanceMode: boolean;
  maintenanceMessage: string;
}

export const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get<Settings>('/admin/settings').then(setSettings).catch(() => {});
  }, []);

  const handleSave = async () => {
    if (!settings) return;
    await api.put('/admin/settings', settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleMaintenance = async () => {
    if (!settings) return;
    const next = !settings.maintenanceMode;
    await api.patch('/admin/maintenance', { enabled: next, message: settings.maintenanceMessage });
    setSettings({ ...settings, maintenanceMode: next });
  };

  if (!settings) return <div>Loading...</div>;

  const u = (field: keyof Settings, value: any) => setSettings({ ...settings, [field]: value });

  return (
    <div>
      <div className="page-header">
        <h1>Store Settings</h1>
        <button className="btn btn-primary" onClick={handleSave}>
          <Save size={16} /> {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: 16 }}>General</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Store Name</label>
            <input value={settings.storeName || ''} onChange={(e) => u('storeName', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input value={settings.location || ''} onChange={(e) => u('location', e.target.value)} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Phone</label>
            <input value={settings.phone || ''} onChange={(e) => u('phone', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input value={settings.email || ''} onChange={(e) => u('email', e.target.value)} />
          </div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: 16 }}>Delivery Fees (Rp)</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Standard</label>
            <input type="number" value={settings.deliveryFeeStandard} onChange={(e) => u('deliveryFeeStandard', Number(e.target.value))} />
          </div>
          <div className="form-group">
            <label>Priority</label>
            <input type="number" value={settings.deliveryFeePriority} onChange={(e) => u('deliveryFeePriority', Number(e.target.value))} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Saver</label>
            <input type="number" value={settings.deliveryFeeSaver} onChange={(e) => u('deliveryFeeSaver', Number(e.target.value))} />
          </div>
          <div className="form-group">
            <label>Priority Surcharge</label>
            <input type="number" value={settings.prioritySurcharge} onChange={(e) => u('prioritySurcharge', Number(e.target.value))} />
          </div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: 16 }}>Delivery Times (mins)</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Standard</label>
            <input type="number" value={settings.deliveryTimeStandard} onChange={(e) => u('deliveryTimeStandard', Number(e.target.value))} />
          </div>
          <div className="form-group">
            <label>Priority</label>
            <input type="number" value={settings.deliveryTimePriority} onChange={(e) => u('deliveryTimePriority', Number(e.target.value))} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Saver</label>
            <input type="number" value={settings.deliveryTimeSaver} onChange={(e) => u('deliveryTimeSaver', Number(e.target.value))} />
          </div>
          <div className="form-group" />
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: 16 }}>Maintenance Mode</h3>
        <div className="toggle-switch" onClick={toggleMaintenance}>
          <div className={`toggle-track ${settings.maintenanceMode ? 'on' : ''}`}>
            <div className="toggle-thumb" />
          </div>
          <span>{settings.maintenanceMode ? 'Maintenance ON' : 'Maintenance OFF'}</span>
        </div>
        <div className="form-group" style={{ marginTop: 16 }}>
          <label>Maintenance Message</label>
          <textarea value={settings.maintenanceMessage || ''} onChange={(e) => u('maintenanceMessage', e.target.value)} />
        </div>
      </div>
    </div>
  );
};
