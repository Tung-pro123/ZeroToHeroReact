import { useState } from 'react';
import Header from './components/common/Header';
import Navbar from './components/common/Navbar';
import PipelineStepperLab from './components/pipeline-stepper/PipelineStepperLab';
import ClockInputPreservationLab from './components/clock-input/ClockInputPreservationLab';
import DiffingInspectorLab from './components/diffing-inspector/DiffingInspectorLab';
import SpringCommitComparison from './components/spring-comparison/SpringCommitComparison';
import RenderCommitQuiz from './components/challenges/RenderCommitQuiz';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('pipeline-stepper');

  return (
    <div className="app-container">
      {/* Header */}
      <Header />

      {/* Navigation Tabs */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main>
        {activeTab === 'pipeline-stepper' && <PipelineStepperLab />}
        {activeTab === 'clock-input' && <ClockInputPreservationLab />}
        {activeTab === 'diffing-inspector' && <DiffingInspectorLab />}
        {activeTab === 'spring-compare' && <SpringCommitComparison />}
        {activeTab === 'challenges' && <RenderCommitQuiz />}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          🍽️ <strong>ZeroToHeroReact</strong> — Bài 12: Render and Commit.
        </p>
        <p style={{ marginTop: '0.4rem', color: '#6b7280', fontSize: '0.85rem' }}>
          Tài liệu lý thuyết chuẩn hóa kết hợp phòng thí nghiệm tương tác chuyên sâu.
        </p>
      </footer>
    </div>
  );
}
