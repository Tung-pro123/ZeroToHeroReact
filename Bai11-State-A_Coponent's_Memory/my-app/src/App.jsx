import { useState } from 'react';
import Header from './components/common/Header';
import Navbar from './components/common/Navbar';
import LetVsStateLab from './components/let-vs-state/LetVsStateLab';
import HookDrawersVisualizer from './components/hook-drawers/HookDrawersVisualizer';
import StateIsolationLab from './components/state-isolation/StateIsolationLab';
import StateStructureLab from './components/state-structure/StateStructureLab';
import ChallengesSection from './components/challenges/ChallengesSection';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('let-vs-state');

  return (
    <div className="app-container">
      {/* Header */}
      <Header />

      {/* Navigation Tabs */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main>
        {activeTab === 'let-vs-state' && <LetVsStateLab />}
        {activeTab === 'hook-drawers' && <HookDrawersVisualizer />}
        {activeTab === 'state-isolation' && <StateIsolationLab />}
        {activeTab === 'state-structure' && <StateStructureLab />}
        {activeTab === 'challenges' && <ChallengesSection />}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          🧠 <strong>ZeroToHeroReact</strong> — Bài 11: State - A Component's Memory.
        </p>
        <p style={{ marginTop: '0.4rem', color: '#6b7280', fontSize: '0.85rem' }}>
          Tài liệu lý thuyết chuẩn hóa kết hợp phòng thí nghiệm tương tác chuyên sâu.
        </p>
      </footer>
    </div>
  );
}
