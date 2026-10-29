import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const navItems = [
    { to: '/', label: 'Tổng Quan & Bộ 4 API', icon: '🧭' },
    { to: '/reset-vs-setvalue', label: 'setValue() Options vs reset()', icon: '⚙️' },
    { to: '/getvalues-snapshot', label: 'getValues() Snapshot Lab', icon: '📸' },
    { to: '/create-vs-edit', label: 'Studio Create vs Edit Form', icon: '📦' },
    { to: '/architect-quiz', label: 'Architect Quiz (5 Câu)', icon: '🏆' },
  ];

  return (
    <nav className="app-nav">
      <div className="nav-container">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            end={item.to === '/'}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

