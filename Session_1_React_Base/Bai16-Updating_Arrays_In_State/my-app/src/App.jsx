import { useState } from 'react';
import Header from './components/common/Header';
import Navbar from './components/common/Navbar';
import ArrayOperationsLab from './components/array-operations/ArrayOperationsLab';
import ShoppingCartLab from './components/shopping-cart/ShoppingCartLab';
import InsertSliceVisualizerLab from './components/insert-slice/InsertSliceVisualizerLab';
import NestedArrayImmerLab from './components/nested-array-immer/NestedArrayImmerLab';
import JavaStreamComparison from './components/java-stream-comparison/JavaStreamComparison';
import ArrayQuiz from './components/challenges/ArrayQuiz';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('array-ops');

  return (
    <div className="app-container">
      {/* Header */}
      <Header />

      {/* Navigation Tabs */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Tab Content */}
      <main>
        {activeTab === 'array-ops' && <ArrayOperationsLab />}
        {activeTab === 'shopping-cart' && <ShoppingCartLab />}
        {activeTab === 'insert-slice' && <InsertSliceVisualizerLab />}
        {activeTab === 'nested-todos' && <NestedArrayImmerLab />}
        {activeTab === 'java-stream' && <JavaStreamComparison />}
        {activeTab === 'challenges' && <ArrayQuiz />}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          📚 <strong>ZeroToHeroReact</strong> — Bài 16: Updating Arrays in State.
        </p>
        <p style={{ marginTop: '0.4rem', color: '#6b7280', fontSize: '0.85rem' }}>
          Tài liệu chuẩn hóa kiến trúc Mảng Bất Biến kết hợp phòng thí nghiệm tương tác chuyên sâu.
        </p>
      </footer>
    </div>
  );
}
