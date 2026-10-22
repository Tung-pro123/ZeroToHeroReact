export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'visualizer', label: '🧠 Ref vs State vs Var', icon: '⚡' },
    { id: 'stopwatch', label: '⏱️ Stopwatch Precision', icon: '⏳' },
    { id: 'trap', label: '⚠️ Render-Phase Trap', icon: '🚨' },
    { id: 'debounce', label: '🛡️ Debounce & Throttle', icon: '🛑' },
    { id: 'advanced', label: '🚀 Advanced Ref Patterns', icon: '🧩' },
    { id: 'challenges', label: '🎯 React.dev Challenges', icon: '🏆' },
    { id: 'quiz', label: '💡 Senior Architect Quiz', icon: '📝' },
  ];

  return (
    <nav className="app-nav">
      <div className="nav-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`nav-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
