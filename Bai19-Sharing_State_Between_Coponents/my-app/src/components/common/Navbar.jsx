export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'accordion-lab', label: '🪗 1. Lifting State Up Lab' },
    { id: 'synced-inputs', label: '🔗 2. Synced Inputs (Challenge 1)' },
    { id: 'filtering-list', label: '🔍 3. Filterable List (Challenge 2)' },
    { id: 'controlled-playground', label: '🎛️ 4. Controlled vs Uncontrolled' },
    { id: 'temperature-converter', label: '🌡️ 5. Single Source of Truth' },
    { id: 'prop-drilling', label: '⚡ 6. Prop Drilling & Composition' },
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
