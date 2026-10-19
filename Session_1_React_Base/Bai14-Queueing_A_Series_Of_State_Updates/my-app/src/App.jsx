import { useState } from 'react';
import Header from './components/common/Header';
import Navbar from './components/common/Navbar';
import BatchingWaiterLab from './components/batching-waiter/BatchingWaiterLab';
import QueuePipelineLab from './components/queue-pipeline/QueuePipelineLab';
import AsyncRequestCounterLab from './components/async-request-counter/AsyncRequestCounterLab';
import CustomQueueEngineLab from './components/custom-queue-engine/CustomQueueEngineLab';
import BackendBatchingComparison from './components/backend-batching/BackendBatchingComparison';
import QueueQuiz from './components/challenges/QueueQuiz';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('waiter-batching');

  return (
    <div className="app-container">
      {/* Header */}
      <Header />

      {/* Navigation Tabs */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Tab Content */}
      <main>
        {activeTab === 'waiter-batching' && <BatchingWaiterLab />}
        {activeTab === 'queue-pipeline' && <QueuePipelineLab />}
        {activeTab === 'async-cart' && <AsyncRequestCounterLab />}
        {activeTab === 'custom-queue' && <CustomQueueEngineLab />}
        {activeTab === 'backend-batching' && <BackendBatchingComparison />}
        {activeTab === 'challenges' && <QueueQuiz />}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          📋 <strong>ZeroToHeroReact</strong> — Bài 14: Queueing a Series of State Updates.
        </p>
        <p style={{ marginTop: '0.4rem', color: '#6b7280', fontSize: '0.85rem' }}>
          Tài liệu chuẩn hóa kiến trúc Reconciler kết hợp phòng thí nghiệm hàng đợi State trực quan.
        </p>
      </footer>
    </div>
  );
}
