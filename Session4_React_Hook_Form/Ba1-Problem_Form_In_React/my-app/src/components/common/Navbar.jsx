import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const navItems = [
    { to: '/', label: 'Tổng quan & 6 Nguyên Tắc', icon: '🏛️' },
    { to: '/native-vs-controlled', label: 'Native vs Controlled Loop', icon: '🔄' },
    { to: '/state-explosion', label: 'State Explosion (10 Fields)', icon: '💥' },
    { to: '/uncontrolled-lab', label: 'Uncontrolled & useRef', icon: '🎯' },
    { to: '/rhf-architecture', label: 'Kiến Trúc RHF vs Zod', icon: '⚡' },
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
