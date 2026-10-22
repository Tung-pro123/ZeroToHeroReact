export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'focus-scroll', label: '🔍 Focus & Scroll DOM', icon: '📍' },
    { id: 'media-player', label: '🎬 HTML5 Video Controller', icon: '▶️' },
    { id: 'cat-gallery', label: '🐱 Cat Friends Gallery (Map Ref)', icon: '🖼️' },
    { id: 'forward-ref', label: '🛡️ forwardRef & useImperativeHandle', icon: '📦' },
    { id: 'flush-sync', label: '⚡ flushSync Auto-Scroll', icon: '📜' },
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
