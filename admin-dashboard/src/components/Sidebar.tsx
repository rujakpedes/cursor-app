import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Tag, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Sidebar: React.FC = () => {
  const { logout } = useAuth();
  const links = [
    { to: '/', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { to: '/products', icon: <Package size={18} />, label: 'Products' },
    { to: '/orders', icon: <ShoppingCart size={18} />, label: 'Orders' },
    { to: '/promos', icon: <Tag size={18} />, label: 'Promos' },
    { to: '/settings', icon: <Settings size={18} />, label: 'Settings' },
  ];

  return (
    <nav className="sidebar">
      <h2>Admin Panel</h2>
      {links.map((l) => (
        <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => isActive ? 'active' : ''}>
          {l.icon}
          {l.label}
        </NavLink>
      ))}
      <a href="#logout" onClick={(e) => { e.preventDefault(); logout(); }} style={{ marginTop: 'auto' }}>
        <LogOut size={18} />
        Logout
      </a>
    </nav>
  );
};
