import { useState } from 'react';
import Header from './components/common/Header';
import Navbar from './components/common/Navbar';
import ImperativeVsDeclarativeLab from './components/imperative-vs-declarative/ImperativeVsDeclarativeLab';
import VisualStateMachineLab from './components/visual-state-machine/VisualStateMachineLab';
import StateParadoxRefactorLab from './components/state-paradox-refactor/StateParadoxRefactorLab';
import ProfileEditorLab from './components/profile-editor/ProfileEditorLab';
import ImageSelectionLab from './components/image-selection/ImageSelectionLab';
import SpringStateComparison from './components/spring-fsm-comparison/SpringStateComparison';
import DeclarativeQuiz from './components/challenges/DeclarativeQuiz';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('imperative-vs-declarative');

  return (
    <div className="app-container">
      {/* Header */}
      <Header />

      {/* Navigation Tabs */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Tab Content */}
      <main>
        {activeTab === 'imperative-vs-declarative' && <ImperativeVsDeclarativeLab />}
        {activeTab === 'visual-states' && <VisualStateMachineLab />}
        {activeTab === 'paradox-refactor' && <StateParadoxRefactorLab />}
        {activeTab === 'profile-editor' && <ProfileEditorLab />}
        {activeTab === 'image-selection' && <ImageSelectionLab />}
        {activeTab === 'spring-fsm' && <SpringStateComparison />}
        {activeTab === 'challenges' && <DeclarativeQuiz />}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          💡 <strong>ZeroToHeroReact</strong> — Bài 17: Reacting to Input with State (Chương 3: Managing State).
        </p>
        <p style={{ marginTop: '0.4rem', color: '#6b7280', fontSize: '0.85rem' }}>
          Tài liệu chuẩn hóa tư duy Lập trình Khai báo (Declarative UI) kết hợp phòng thí nghiệm tương tác chuyên sâu.
        </p>
      </footer>
    </div>
  );
}
