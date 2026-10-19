export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'pass-vs-call', label: '⚠️ Truyền Hàm vs Gọi Hàm', icon: '⚠️' },
    { id: 'bubbling', label: '🌊 Sủi Bọt & stopPropagation', icon: '🌊' },
    { id: 'prevent-default', label: '⛔ Ngăn Reload (preventDefault)', icon: '⛔' },
    { id: 'props-handler', label: '🎛️ Handler Qua Props', icon: '🎛️' },
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
