import { useState } from 'react';
import Header from './components/common/Header';
import Navbar from './components/common/Navbar';
import PassVsCallLab from './components/pass-vs-call/PassVsCallLab';
import BubblingVisualizer from './components/bubbling/BubblingVisualizer';
import FormPreventLab from './components/form-prevent/FormPreventLab';
import PropsHandlerLab from './components/props-handler/PropsHandlerLab';
import ChallengesSection from './components/challenges/ChallengesSection';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('pass-vs-call');

  return (
    <div className="app-container">
      {/* Header */}
      <Header />

      {/* Navigation Bar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Tab Content */}
      <main>
        {activeTab === 'pass-vs-call' && <PassVsCallLab />}
        {activeTab === 'bubbling' && <BubblingVisualizer />}
        {activeTab === 'prevent-default' && <FormPreventLab />}
        {activeTab === 'props-handler' && <PropsHandlerLab />}
        {activeTab === 'challenges' && <ChallengesSection />}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          ⚡ <strong>ZeroToHeroReact</strong> — Bài 10: Responding to Events.
        </p>
        <p style={{ marginTop: '0.4rem', color: '#6b7280', fontSize: '0.85rem' }}>
          Tài liệu lý thuyết chuẩn hóa kết hợp phòng thí nghiệm tương tác chuyên sâu.
        </p>
      </footer>
    </div>
  );
}
