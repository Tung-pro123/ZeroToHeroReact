import { useState } from 'react';
import Header from './components/common/Header';
import Navbar from './components/common/Navbar';
import StatePrinciplesLab from './components/state-principles/StatePrinciplesLab';
import RedundantVsDerivedLab from './components/redundant-vs-derived/RedundantVsDerivedLab';
import SelectionIdVsObjectLab from './components/selection-id-vs-object/SelectionIdVsObjectLab';
import MultiSelectSetLab from './components/multiselect-set/MultiSelectSetLab';
import FlattenTreeLab from './components/flatten-tree/FlattenTreeLab';
import DbNormalizationComparison from './components/db-normalization-comparison/DbNormalizationComparison';
import StructureQuiz from './components/challenges/StructureQuiz';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('state-principles');

  return (
    <div className="app-container">
      {/* Header */}
      <Header />

      {/* Navigation Tabs */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Tab Content */}
      <main>
        {activeTab === 'state-principles' && <StatePrinciplesLab />}
        {activeTab === 'redundant-vs-derived' && <RedundantVsDerivedLab />}
        {activeTab === 'selection-id-vs-object' && <SelectionIdVsObjectLab />}
        {activeTab === 'multiselect-set' && <MultiSelectSetLab />}
        {activeTab === 'flatten-tree' && <FlattenTreeLab />}
        {activeTab === 'db-normalization' && <DbNormalizationComparison />}
        {activeTab === 'challenges' && <StructureQuiz />}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          🏗️ <strong>ZeroToHeroReact</strong> — Bài 18: Choosing the State Structure (Chương 3: Managing State).
        </p>
        <p style={{ marginTop: '0.4rem', color: '#6b7280', fontSize: '0.85rem' }}>
          Tài liệu chuẩn hóa kiến trúc thiết kế State kết hợp phòng thí nghiệm tương tác chuyên sâu.
        </p>
      </footer>
    </div>
  );
}
