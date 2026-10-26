import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const navItems = [
    { to: '/', label: 'Bản Chất register()', icon: '✍️' },
    { to: '/spread-inspector', label: 'Giải Phẫu Spread {...}', icon: '🔬' },
    { to: '/the-4-props', label: 'Mổ Xẻ 4 Props Cốt Tử', icon: '🧬' },
    { to: '/nested-and-types', label: 'Nested Data & Number Trap', icon: '🌲' },
    { to: '/override-pitfall', label: 'Cạm Bẫy Ghi Đè Props', icon: '⚠️' },
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
