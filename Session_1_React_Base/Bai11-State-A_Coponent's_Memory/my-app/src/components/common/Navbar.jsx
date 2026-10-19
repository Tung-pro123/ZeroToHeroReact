export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'let-vs-state', label: '🧪 Let vs State', icon: '🧪' },
    { id: 'hook-drawers', label: '🗄️ Mô Hình Ngăn Kéo (Under the Hood)', icon: '🗄️' },
    { id: 'state-isolation', label: '🎭 Tính Độc Lập (State Isolation)', icon: '🎭' },
    { id: 'state-structure', label: '📋 Tách Biến vs Gộp DTO Object', icon: '📋' },
    { id: 'challenges', label: '🎯 Thử Thách & Câu Đố', icon: '🎯' },
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
