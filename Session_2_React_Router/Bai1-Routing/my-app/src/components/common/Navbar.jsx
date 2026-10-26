import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const navItems = [
    { to: '/', label: 'Tổng Quan (Home)', icon: '🏠', end: true },
    { to: '/csr-vs-ssr', label: 'CSR vs SSR Routing', icon: '⚡' },
    { to: '/core-trio', label: 'Bộ Ba: Router/Routes/Route', icon: '🧩' },
    { to: '/admin', label: 'Nested Layout & <Outlet />', icon: '🏛️' },
    { to: '/courses', label: 'Dynamic Segment (:id)', icon: '🎯' },
    { to: '/quiz', label: 'Senior Architect Quiz', icon: '📝' },
    { to: '/some-invalid-url', label: 'Thử Nghiệm 404', icon: '🚫' },
  ];

  return (
    <nav className="app-nav">
      <div className="nav-links">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `nav-item-link ${isActive ? 'active' : ''}`
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
