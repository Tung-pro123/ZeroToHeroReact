import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const navItems = [
    { to: '/', label: 'Tổng Quan & Mental Model', icon: '🧭' },
    { to: '/higher-order-lab', label: 'Giải Phẫu Higher-Order Function', icon: '⚙️' },
    { to: '/two-callbacks-lab', label: '2 Callbacks: onValid & onInvalid', icon: '🔀' },
    { to: '/prevent-default-async', label: 'PreventDefault & Async Spring Boot', icon: '🚀' },
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

