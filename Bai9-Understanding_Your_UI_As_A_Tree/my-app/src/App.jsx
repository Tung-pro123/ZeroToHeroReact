import { useState } from 'react';
import Header from './components/common/Header';
import Navbar from './components/common/Navbar';
import RenderTreeVisualizer from './components/render-tree/RenderTreeVisualizer';
import DependencyTreeExplorer from './components/dependency-tree/DependencyTreeExplorer';
import ChildrenDecouplingLab from './components/children-decoupling/ChildrenDecouplingLab';
import SpringTreeComparison from './components/spring-comparison/SpringTreeComparison';
import TreeQuizSection from './components/quiz/TreeQuizSection';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('render-tree');

  return (
    <div className="app-container">
      {/* Hero Header */}
      <Header />

      {/* Navigation Tabs */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Tab Panels */}
      <main>
        {activeTab === 'render-tree' && <RenderTreeVisualizer />}
        {activeTab === 'dependency-tree' && <DependencyTreeExplorer />}
        {activeTab === 'children-lab' && <ChildrenDecouplingLab />}
        {activeTab === 'spring-compare' && <SpringTreeComparison />}
        {activeTab === 'quiz' && <TreeQuizSection />}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          🚀 <strong>ZeroToHeroReact</strong> — Khóa học React từ con số 0 đến làm chủ kiến trúc.
        </p>
        <p style={{ marginTop: '0.4rem', color: '#6b7280', fontSize: '0.85rem' }}>
          Được thiết kế cho học viên React và kỹ sư Backend (Java / Spring Boot).
        </p>
      </footer>
    </div>
  );
}
