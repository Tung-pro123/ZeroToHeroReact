import { useState } from 'react';
import Header from './components/common/Header';
import Navbar from './components/common/Navbar';
import AccordionLab from './components/lifting-state-up/AccordionLab';
import SyncedInputsLab from './components/synced-inputs/SyncedInputsLab';
import FilterableListLab from './components/filtering-list/FilterableListLab';
import ControlledPlayground from './components/controlled-vs-uncontrolled/ControlledPlayground';
import TemperatureConverter from './components/single-source-truth/TemperatureConverter';
import PropDrillingLab from './components/prop-drilling/PropDrillingLab';
import SharingQuiz from './components/challenges/SharingQuiz';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('accordion-lab');

  return (
    <div className="app-container">
      {/* Header */}
      <Header />

      {/* Navigation Tabs */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Tab Content */}
      <main>
        {activeTab === 'accordion-lab' && <AccordionLab />}
        {activeTab === 'synced-inputs' && <SyncedInputsLab />}
        {activeTab === 'filtering-list' && <FilterableListLab />}
        {activeTab === 'controlled-playground' && <ControlledPlayground />}
        {activeTab === 'temperature-converter' && <TemperatureConverter />}
        {activeTab === 'prop-drilling' && <PropDrillingLab />}
        {activeTab === 'quiz' && <SharingQuiz />}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          🔄 <strong>ZeroToHeroReact</strong> — Bài 19: Sharing State Between Components (Chương 3: Managing State).
        </p>
        <p style={{ marginTop: '0.4rem', color: '#6b7280', fontSize: '0.85rem' }}>
          Tài liệu chuẩn hóa kỹ thuật Kéo State lên Cha, Controlled Components & Triết lý Single Source of Truth.
        </p>
      </footer>
    </div>
  );
}
