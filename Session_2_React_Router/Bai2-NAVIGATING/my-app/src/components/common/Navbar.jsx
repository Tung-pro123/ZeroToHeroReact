import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const navItems = [
    { to: '/', label: 'Tổng Quan (Home)', icon: '🏠', end: true },
    { to: '/navlink-lab', label: 'NavLink & Active Lab', icon: '🎨' },
    { to: '/navigate-lab', label: 'useNavigate Logic Lab', icon: '⚡' },
    { to: '/store', label: 'Mini Store (E-Commerce)', icon: '🛒' },
    { to: '/dashboard', label: 'Dashboard (Auth Flow)', icon: '📊' },
    { to: '/quiz', label: 'Senior Architect Quiz', icon: '📝' },
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
            {({ isActive }) => (
              <>
                <span>{item.icon}</span>
                <span>{item.label}</span>
                {isActive && (
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#38bdf8',
                      boxShadow: '0 0 6px #38bdf8',
                    }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
