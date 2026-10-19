export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'position-matrix', label: '🌲 1. Cùng Vị Trí vs Khác Vị Trí' },
    { id: 'nested-trap', label: '⚠️ 2. Cạm Bẫy Component Lồng Nhau' },
    { id: 'chat-key-reset', label: '💬 3. Reset State Bằng Key (Chat)' },
    { id: 'list-key-sort', label: '📋 4. Sắp Xếp Danh Sách & Key' },
    { id: 'display-vs-unmount', label: '👁️ 5. CSS Display vs Unmount' },
    { id: 'swap-fields', label: '🔄 6. Đổi Chỗ Form Fields' },
    { id: 'quiz', label: '🧠 7. Thử Thách Trắc Nghiệm' },
  ];

  return (
    <nav className="app-nav">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`nav-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
