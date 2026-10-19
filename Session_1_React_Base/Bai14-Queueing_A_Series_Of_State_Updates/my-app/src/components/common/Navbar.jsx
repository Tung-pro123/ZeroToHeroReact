export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'waiter-batching', label: '🧑‍🍳 Bồi Bàn & Gom Cụm (Batching)', icon: '🧑‍🍳' },
    { id: 'queue-pipeline', label: '🔄 Hàng Đợi Updater Step-by-Step', icon: '🔄' },
    { id: 'async-cart', label: '🛒 Thử Thách 1: Giỏ Hàng Bất Đồng Bộ', icon: '🛒' },
    { id: 'custom-queue', label: '⚙️ Thử Thách 2: Tự Viết getFinalState', icon: '⚙️' },
    { id: 'backend-batching', label: '☕ Đối Chiếu Hibernate & Kafka', icon: '☕' },
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
