import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const navItems = [
    { to: '/', label: 'Trái Tim useForm()', icon: '💖' },
    { to: '/triad-hub', label: 'Bộ Ba Trụ Cột', icon: '🏛️' },
    { to: '/data-vs-state', label: 'Form Data vs State', icon: '📊' },
    { to: '/default-values', label: 'defaultValues Studio', icon: '⚙️' },
    { to: '/fullstack-pipeline', label: '3-Layer Pipeline & Spring', icon: '🚀' },
    { to: '/quiz', label: 'Senior Quiz (5 câu)', icon: '📝' },
  ];

  return (
    <nav className="app-navbar">
      <div className="nav-links">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              isActive ? 'nav-item active' : 'nav-item'
            }
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
