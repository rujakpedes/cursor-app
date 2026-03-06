import React from 'react';
import { Wrench } from 'lucide-react';
import './MaintenancePage.css';

interface MaintenancePageProps {
  message: string;
}

export const MaintenancePage: React.FC<MaintenancePageProps> = ({ message }) => (
  <div className="maintenance-page">
    <div className="maintenance-card">
      <Wrench size={48} color="var(--color-primary)" />
      <h1>Under Maintenance</h1>
      <p>{message || "We're currently performing maintenance. Please check back soon."}</p>
    </div>
  </div>
);
