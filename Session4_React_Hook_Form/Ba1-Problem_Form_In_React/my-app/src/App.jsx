import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Navbar from './components/common/Navbar';
import HomePage from './pages/HomePage';
import NativeVsControlledPage from './pages/NativeVsControlledPage';
import StateExplosionLabPage from './pages/StateExplosionLabPage';
import UncontrolledRefLabPage from './pages/UncontrolledRefLabPage';
import RhfArchitecturePage from './pages/RhfArchitecturePage';
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
          <Route path="/native-vs-controlled" element={<NativeVsControlledPage />} />
          <Route path="/state-explosion" element={<StateExplosionLabPage />} />
          <Route path="/uncontrolled-lab" element={<UncontrolledRefLabPage />} />
          <Route path="/rhf-architecture" element={<RhfArchitecturePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <p>
          📋 <strong>Zero to Hero React Mastery</strong> • Session 4: Bài 1 - Vấn Đề Của Form Trong React (Controlled vs Uncontrolled & RHF)
        </p>
        <p style={{ marginTop: '0.4rem', color: '#64748b', fontSize: '0.82rem' }}>
          Được thiết kế theo tiêu chuẩn kiến trúc Enterprise Form & Tối ưu hóa chu trình Re-render trong React 18.
        </p>
      </footer>
    </div>
  );
}
