import { useState } from 'react';
import Header from './components/common/Header';
import Navbar from './components/common/Navbar';
import TripleCounterLab from './components/triple-counter/TripleCounterLab';
import TimeTravelChatLab from './components/time-travel-chat/TimeTravelChatLab';
import TrafficLightLab from './components/traffic-light/TrafficLightLab';
import ClosureMemoryInspectorLab from './components/closure-inspector/ClosureMemoryInspectorLab';
import DatabaseSnapshotComparison from './components/database-comparison/DatabaseSnapshotComparison';
import SnapshotQuiz from './components/challenges/SnapshotQuiz';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('triple-counter');

  return (
    <div className="app-container">
      {/* Header */}
      <Header />

      {/* Navigation Tabs */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Tab Content */}
      <main>
        {activeTab === 'triple-counter' && <TripleCounterLab />}
        {activeTab === 'time-travel-chat' && <TimeTravelChatLab />}
        {activeTab === 'traffic-light' && <TrafficLightLab />}
        {activeTab === 'closure-inspector' && <ClosureMemoryInspectorLab />}
        {activeTab === 'database-compare' && <DatabaseSnapshotComparison />}
        {activeTab === 'challenges' && <SnapshotQuiz />}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          📸 <strong>ZeroToHeroReact</strong> — Bài 13: State as a Snapshot.
        </p>
        <p style={{ marginTop: '0.4rem', color: '#6b7280', fontSize: '0.85rem' }}>
          Tài liệu lý thuyết chuẩn hóa kết hợp phòng thí nghiệm trực quan tương tác.
        </p>
      </footer>
    </div>
  );
}
