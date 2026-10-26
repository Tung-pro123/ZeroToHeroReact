import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Navbar from './components/common/Navbar';
import HomePage from './pages/HomePage';
import SpreadInspectorPage from './pages/SpreadInspectorPage';
import The4PropsLabPage from './pages/The4PropsLabPage';
import NestedAndTypesStudioPage from './pages/NestedAndTypesStudioPage';
import OverridePitfallLabPage from './pages/OverridePitfallLabPage';
import QuizPage from './pages/QuizPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

export default function App() {
  return (
    <div className="app-container">
      <Header />
      <Navbar />

      <main className="app-main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/spread-inspector" element={<SpreadInspectorPage />} />
          <Route path="/the-4-props" element={<The4PropsLabPage />} />
          <Route path="/nested-and-types" element={<NestedAndTypesStudioPage />} />
          <Route path="/override-pitfall" element={<OverridePitfallLabPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <p>
          ✍️ <strong>Zero to Hero React Mastery</strong> • Session 4: Bài 3 - register() Đăng Ký Input & Cú Pháp Spread
        </p>
        <p style={{ marginTop: '0.4rem', color: '#64748b', fontSize: '0.82rem' }}>
          Được thiết kế theo tiêu chuẩn kiến trúc Enterprise Form & Tối ưu hóa chu trình kết nối DOM trong React 18.
        </p>
      </footer>
    </div>
  );
}
