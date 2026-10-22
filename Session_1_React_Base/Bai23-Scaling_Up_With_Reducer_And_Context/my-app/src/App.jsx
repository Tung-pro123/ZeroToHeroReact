import { useState } from 'react';
import Header from './components/common/Header';
import Navbar from './components/common/Navbar';
import ArchitectureVisualizer from './components/architecture-visualizer/ArchitectureVisualizer';
import RenderIsolationLab from './components/render-isolation-lab/RenderIsolationLab';
import CustomHooksGuardLab from './components/custom-hooks-guard/CustomHooksGuardLab';
import ImmerReducerLab from './components/immer-reducer-lab/ImmerReducerLab';
import EcommerceCartApp from './components/ecommerce-cart-app/EcommerceCartApp';
import TradeoffMatrix from './components/tradeoff-matrix/TradeoffMatrix';
import ScalingQuiz from './components/challenges/ScalingQuiz';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('architecture');

  return (
    <div className="app-container">
      <Header />
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="app-main-content">
        {activeTab === 'architecture' && <ArchitectureVisualizer />}
        {activeTab === 'isolation' && <RenderIsolationLab />}
        {activeTab === 'custom-hooks' && <CustomHooksGuardLab />}
        {activeTab === 'immer' && <ImmerReducerLab />}
        {activeTab === 'cart-app' && <EcommerceCartApp />}
        {activeTab === 'tradeoff' && <TradeoffMatrix />}
        {activeTab === 'quiz' && <ScalingQuiz />}
      </main>

      <footer className="app-footer">
        <p>
          🏗️ <strong>Zero to Hero React 18 & 19 Mastery</strong> • Bài 23: Scaling Up with Reducer and Context (Chương 3 Finale)
        </p>
        <p style={{ marginTop: '0.4rem', color: '#64748b', fontSize: '0.82rem' }}>
          Được thiết kế chuẩn kiến trúc Production theo tài liệu React.dev & Tiêu chuẩn Phỏng vấn Senior Frontend Engineer.
        </p>
      </footer>
    </div>
  );
}
