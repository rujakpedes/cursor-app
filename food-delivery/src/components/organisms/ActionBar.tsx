import React from 'react';
import { Users, CalendarClock, Languages } from 'lucide-react';
import { ActionChip } from '../molecules/ActionChip';
import './ActionBar.css';

export const ActionBar: React.FC = () => (
  <div className="action-bar">
    <ActionChip icon={<Users size={16} />} label="Group Order" />
    <ActionChip icon={<CalendarClock size={16} />} label="Order for Later" />
    <ActionChip icon={<Languages size={16} />} label="Menu language" />
  </div>
);
