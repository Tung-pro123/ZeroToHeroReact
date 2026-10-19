export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'pointer-canvas', label: '🔴 Con Trỏ Di Chuột (Mutation vs Immutable)', icon: '🔴' },
    { id: 'dynamic-form', label: '📝 Form Hồ Sơ (Spread & Computed Name)', icon: '📝' },
    { id: 'nested-immer', label: '🌳 Nested Object & Thư Viện Immer', icon: '🌳' },
    { id: 'shared-mutation', label: '🐛 Bẫy Đột Biến Biến Toàn Cục (Shared Ref)', icon: '🐛' },
    { id: 'java-comparison', label: '☕ Đối Chiếu Lombok Builder & Records', icon: '☕' },
    { id: 'challenges', label: '🎯 Thử Thách & Phỏng Vấn', icon: '🎯' },
  ];

  return (
    <nav className="nav-tabs" role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={activeTab === tab.id}
          className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          <span>{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
