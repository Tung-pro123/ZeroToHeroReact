import { useState } from 'react';
import Header from './components/common/Header';
import Navbar from './components/common/Navbar';
import PositionMatrixLab from './components/position-matrix/PositionMatrixLab';
import NestedTrapLab from './components/nested-trap/NestedTrapLab';
import ChatKeyResetLab from './components/chat-key-reset/ChatKeyResetLab';
import ListKeySortLab from './components/list-key-sort/ListKeySortLab';
import DisplayVsUnmountLab from './components/display-vs-unmount/DisplayVsUnmountLab';
import SwapFieldsLab from './components/swap-fields/SwapFieldsLab';
import PreservingQuiz from './components/challenges/PreservingQuiz';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('position-matrix');

  return (
    <div className="app-container">
      {/* Header */}
      <Header />

      {/* Navigation Tabs */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Tab Content */}
      <main>
        {activeTab === 'position-matrix' && <PositionMatrixLab />}
        {activeTab === 'nested-trap' && <NestedTrapLab />}
        {activeTab === 'chat-key-reset' && <ChatKeyResetLab />}
        {activeTab === 'list-key-sort' && <ListKeySortLab />}
        {activeTab === 'display-vs-unmount' && <DisplayVsUnmountLab />}
        {activeTab === 'swap-fields' && <SwapFieldsLab />}
        {activeTab === 'quiz' && <PreservingQuiz />}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          💾 <strong>ZeroToHeroReact</strong> — Bài 20: Preserving and Resetting State (Chương 3: Managing State).
        </p>
        <p style={{ marginTop: '0.4rem', color: '#6b7280', fontSize: '0.85rem' }}>
          Tài liệu chuẩn hóa kiến trúc Render Tree, Reconciliation, và Kỹ thuật điều phối State bằng thuộc tính Key.
        </p>
      </footer>
    </div>
  );
}
