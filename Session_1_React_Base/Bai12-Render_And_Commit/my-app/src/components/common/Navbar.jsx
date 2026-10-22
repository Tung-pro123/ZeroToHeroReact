export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'pipeline-stepper', label: '🍽️ 3 Bước Chu Trình (Pipeline)', icon: '🍽️' },
    { id: 'clock-input', label: '⏰ Đồng Hồ & Ô Input (Bảo Toàn DOM)', icon: '⏰' },
    { id: 'diffing-inspector', label: '🔍 Bộ Soi Thuật Toán Diffing', icon: '🔍' },
    { id: 'spring-compare', label: '☕ Đối Chiếu Spring MVC & Hibernate', icon: '☕' },
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
