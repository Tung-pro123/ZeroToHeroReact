import { useState } from 'react';
import Header from './components/common/Header';
import Navbar from './components/common/Navbar';
import RefVsStateVisualizer from './components/visualizer/RefVsStateVisualizer';
import StopwatchPrecisionLab from './components/stopwatch/StopwatchPrecisionLab';
import RenderMutationTrapLab from './components/trap/RenderMutationTrapLab';
import DebounceThrottleLab from './components/debounce/DebounceThrottleLab';
import AdvancedRefPatterns from './components/advanced/AdvancedRefPatterns';
import ReactDevChallenges from './components/challenges/ReactDevChallenges';
import RefMasteryQuiz from './components/quiz/RefMasteryQuiz';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('visualizer');

  return (
    <div className="app-container">
      <Header />
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="app-main-content">
        {activeTab === 'visualizer' && <RefVsStateVisualizer />}
        {activeTab === 'stopwatch' && <StopwatchPrecisionLab />}
        {activeTab === 'trap' && <RenderMutationTrapLab />}
        {activeTab === 'debounce' && <DebounceThrottleLab />}
        {activeTab === 'advanced' && <AdvancedRefPatterns />}
        {activeTab === 'challenges' && <ReactDevChallenges />}
        {activeTab === 'quiz' && <RefMasteryQuiz />}
      </main>

      <footer className="app-footer">
        <p>
          ⚓ <strong>Zero to Hero React 18 & 19 Mastery</strong> • Bài 24: Referencing Values with Refs (Escape Hatches Chapter)
        </p>
        <p style={{ marginTop: '0.4rem', color: '#64748b', fontSize: '0.82rem' }}>
          Thiết kế chuẩn kiến trúc Production theo React.dev & Tiêu chuẩn Phỏng vấn Senior Frontend Engineer.
        </p>
      </footer>
    </div>
  );
}
