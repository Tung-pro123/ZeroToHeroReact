import { useState } from 'react';
import Header from './components/common/Header';
import Navbar from './components/common/Navbar';
import PropDrillingVisualizer from './components/prop-drilling-visualizer/PropDrillingVisualizer';
import AdaptiveHeadingsLab from './components/adaptive-headings/AdaptiveHeadingsLab';
import DynamicMultiContextLab from './components/dynamic-multi-context/DynamicMultiContextLab';
import ImageSizeLab from './components/challenge-image-size/ImageSizeLab';
import ContextRerenderTrapLab from './components/rerender-trap/ContextRerenderTrapLab';
import CompositionVsContextLab from './components/composition-vs-context/CompositionVsContextLab';
import ContextQuiz from './components/challenges/ContextQuiz';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('prop-drilling');

  return (
    <div className="app-container">
      <Header />
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="app-main-content">
        {activeTab === 'prop-drilling' && <PropDrillingVisualizer />}
        {activeTab === 'adaptive-headings' && <AdaptiveHeadingsLab />}
        {activeTab === 'dynamic-context' && <DynamicMultiContextLab />}
        {activeTab === 'image-size-lab' && <ImageSizeLab />}
        {activeTab === 'rerender-trap' && <ContextRerenderTrapLab />}
        {activeTab === 'composition-vs-context' && <CompositionVsContextLab />}
        {activeTab === 'quiz' && <ContextQuiz />}
      </main>

      <footer className="app-footer">
        <p>
          🌌 <strong>Zero to Hero React 18 & 19 Mastery</strong> • Bài 22: Passing Data Deeply with Context
        </p>
        <p style={{ marginTop: '0.4rem', color: '#64748b', fontSize: '0.82rem' }}>
          Được thiết kế chuẩn kiến trúc Production theo tài liệu React.dev & Phỏng vấn Senior Frontend Engineer.
        </p>
      </footer>
    </div>
  );
}
