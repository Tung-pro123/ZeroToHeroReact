export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'imperative-vs-declarative', label: '🚕 Mệnh Lệnh vs Khai Báo (Taxi)', icon: '🚕' },
    { id: 'visual-states', label: '🎨 5 Trạng Thái Hình Ảnh (Visual States)', icon: '🎨' },
    { id: 'paradox-refactor', label: '⚖️ Triệt Tiêu Nghịch Lý (State Paradox)', icon: '⚖️' },
    { id: 'profile-editor', label: '👤 Thử Thách 2: Profile Editor', icon: '👤' },
    { id: 'image-selection', label: '🖼️ Thử Thách 1: Đổi Viền Ảnh & Bubbling', icon: '🖼️' },
    { id: 'spring-fsm', label: '☕ Đối Chiếu Spring State Machine', icon: '☕' },
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
