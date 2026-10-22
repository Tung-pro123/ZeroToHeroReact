export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'array-ops', label: '⚡ Sân Chơi Mảng (Thêm, Xóa, Đảo, Sắp Xếp)', icon: '⚡' },
    { id: 'shopping-cart', label: '🛒 Giỏ Hàng Mua Sắm (Map & Filter)', icon: '🛒' },
    { id: 'insert-slice', label: '🧩 Ghép 3 Mảnh với slice & Spread', icon: '🧩' },
    { id: 'nested-todos', label: '📋 Object Lồng Mảng & useImmer', icon: '📋' },
    { id: 'java-stream', label: '☕ Đối Chiếu Java Stream API', icon: '☕' },
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
