import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const navItems = [
    { to: '/', label: 'Tổng Quan & Matrix', icon: '🧭' },
    { to: '/built-in-rules', label: '6 Built-in Rules Studio', icon: '📏' },
    { to: '/custom-validate', label: 'Custom validate Lab', icon: '🧪' },
    { to: '/validation-modes', label: 'Validation Modes (UX)', icon: '⏱️' },
    { to: '/enterprise-registration', label: 'Enterprise Form & Backend', icon: '🏢' },
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

