export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'architecture', label: '🏗️ 1. Kiến Trúc Bộ Đôi' },
    { id: 'isolation', label: '⚡ 2. Tách State & Dispatch (Render Lab)' },
    { id: 'custom-hooks', label: '📦 3. Đóng Gói Custom Hooks' },
    { id: 'immer', label: '🪄 4. Nâng Cấp useImmerReducer' },
    { id: 'cart-app', label: '🛒 5. App Thực Tế: Enterprise Cart' },
    { id: 'tradeoff', label: '🥊 6. Context vs Zustand vs Redux' },
    { id: 'quiz', label: '🧠 7. Trắc Nghiệm Chuyên Sâu' },
  ];

  return (
    <nav className="app-nav">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`nav-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
