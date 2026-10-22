export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'state-principles', label: '🌟 5 Nguyên Tắc Vàng', icon: '🌟' },
    { id: 'redundant-vs-derived', label: '🎒 Hành Lý & Derived State', icon: '🎒' },
    { id: 'selection-id-vs-object', label: '📌 Lưu selectedId vs Cả Object', icon: '📌' },
    { id: 'multiselect-set', label: '⚡ Chọn Nhiều với JS Set O(1)', icon: '⚡' },
    { id: 'flatten-tree', label: '🌲 Làm Phẳng Cây (Normalized)', icon: '🌲' },
    { id: 'db-normalization', label: '🗄️ Đối Chiếu Chuẩn Hóa DB (3NF)', icon: '🗄️' },
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
