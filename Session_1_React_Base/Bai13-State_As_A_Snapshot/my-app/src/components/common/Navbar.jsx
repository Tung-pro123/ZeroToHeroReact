export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'triple-counter', label: '🔢 Thí Nghiệm +3 & Thế Giá Trị', icon: '🔢' },
    { id: 'time-travel-chat', label: '✉️ Tránh Lỗi Chat Race Condition', icon: '✉️' },
    { id: 'traffic-light', label: '🚦 Đèn Giao Thông & Thứ Tự Alert', icon: '🚦' },
    { id: 'closure-inspector', label: '🎞️ Bộ Soi Snapshot Frames', icon: '🎞️' },
    { id: 'database-compare', label: '🗄️ Đối Chiếu DB MVCC & Spring', icon: '🗄️' },
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
