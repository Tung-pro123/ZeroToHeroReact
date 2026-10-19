export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'prop-drilling', label: '🕳️ 1. Prop Drilling vs Context' },
    { id: 'adaptive-headings', label: '📑 2. Tiêu Đề Thích Ứng (Shadowing)' },
    { id: 'dynamic-context', label: '🔐 3. Multi-Context (Theme & Auth)' },
    { id: 'image-size-lab', label: '🖼️ 4. Zoom Ảnh (Challenge 1)' },
    { id: 'rerender-trap', label: '⚡ 5. Cạm Bẫy Re-render & Tách Context' },
    { id: 'composition-vs-context', label: '🧩 6. Composition vs Context' },
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
