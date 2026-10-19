import { useState } from 'react';
import Header from './components/common/Header';
import Navbar from './components/common/Navbar';
import PointerCanvasLab from './components/pointer-canvas/PointerCanvasLab';
import DynamicFormLab from './components/dynamic-form/DynamicFormLab';
import NestedObjectImmerLab from './components/nested-immer/NestedObjectImmerLab';
import SharedMutationBugLab from './components/shared-mutation-bug/SharedMutationBugLab';
import JavaImmutabilityComparison from './components/backend-comparison/JavaImmutabilityComparison';
import ObjectQuiz from './components/challenges/ObjectQuiz';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('pointer-canvas');

  return (
    <div className="app-container">
      {/* Header */}
      <Header />

      {/* Navigation Tabs */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Tab Content */}
      <main>
        {activeTab === 'pointer-canvas' && <PointerCanvasLab />}
        {activeTab === 'dynamic-form' && <DynamicFormLab />}
        {activeTab === 'nested-immer' && <NestedObjectImmerLab />}
        {activeTab === 'shared-mutation' && <SharedMutationBugLab />}
        {activeTab === 'java-comparison' && <JavaImmutabilityComparison />}
        {activeTab === 'challenges' && <ObjectQuiz />}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          📦 <strong>ZeroToHeroReact</strong> — Bài 15: Updating Objects in State.
        </p>
        <p style={{ marginTop: '0.4rem', color: '#6b7280', fontSize: '0.85rem' }}>
          Tài liệu chuẩn hóa kiến trúc Immutability kết hợp phòng thí nghiệm tương tác chuyên sâu.
        </p>
      </footer>
    </div>
  );
}
