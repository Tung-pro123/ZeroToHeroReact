import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const navItems = [
    { to: '/', label: 'Tổng quan & Triad Hooks', icon: '🏛️' },
    { to: '/params-lab', label: 'Dynamic Params (useParams)', icon: '🎯' },
    { to: '/search-studio', label: 'Search & Filter Studio', icon: '🔍' },
    { to: '/location-inspector', label: 'Location Inspector', icon: '🧭' },
    { to: '/spring-boot-bridge', label: 'Spring Boot Bridge', icon: '☕' },
    { to: '/quiz', label: 'Architect Quiz (5 câu)', icon: '📝' },
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
