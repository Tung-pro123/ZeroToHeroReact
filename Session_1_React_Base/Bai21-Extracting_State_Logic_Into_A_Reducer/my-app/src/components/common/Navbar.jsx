export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'restaurant-workflow', label: '👨‍🍳 1. Ẩn Dụ Nhà Hàng (Workflow)' },
    { id: 'task-manager', label: '📋 2. Task Manager (useState vs useReducer)' },
    { id: 'messenger-app', label: '💬 3. Messenger (Challenge 1 & 2)' },
    { id: 'draft-recipient', label: '✉️ 4. Bản Nháp Theo Người (Challenge 3)' },
    { id: 'immer-reducer', label: '⚡ 5. useImmerReducer (Mutating Draft)' },
    { id: 'custom-reducer', label: '🛠️ 6. Tự Code useReducer (Challenge 4)' },
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
