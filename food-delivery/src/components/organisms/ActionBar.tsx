import React from 'react';
import { CalendarClock, Phone } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ActionChip } from '../molecules/ActionChip';
import './ActionBar.css';

export const ActionBar: React.FC = () => {
  const { settings } = useStore();

  return (
    <div className="action-bar">
      <ActionChip icon={<CalendarClock size={16} />} label="Order for Later" />
      {settings?.phone && (
        <ActionChip icon={<Phone size={16} />} label={`Call ${settings.phone}`} />
      )}
    </div>
  );
};
