export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'render-tree', label: '🌳 Cây Render (Render Tree)', icon: '🌳' },
    { id: 'dependency-tree', label: '📦 Cây Phụ Thuộc (Dependency Tree)', icon: '📦' },
    { id: 'children-lab', label: '🔀 Decoupling với Children', icon: '🔀' },
    { id: 'spring-compare', label: '☕ Đối Chiếu Java/Spring Boot', icon: '☕' },
    { id: 'quiz', label: '🎯 Thử Thách & Câu Đố', icon: '🎯' },
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
