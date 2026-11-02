import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Navbar from './components/common/Navbar';
import HomePage from './pages/HomePage';
import ControllerAdapterLabPage from './pages/ControllerAdapterLabPage';
import HybridRegistrationLabPage from './pages/HybridRegistrationLabPage';
import DataTransformLabPage from './pages/DataTransformLabPage';
import ArchitectQuizPage from './pages/ArchitectQuizPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/lab1-adapter" element={<ControllerAdapterLabPage />} />
            <Route path="/lab2-hybrid" element={<HybridRegistrationLabPage />} />
            <Route path="/lab3-transform" element={<DataTransformLabPage />} />
            <Route path="/quiz" element={<ArchitectQuizPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <div>
            🎛️ <strong>Session 4 • Bài 9: Controller — KHI register() KHÔNG ĐỦ</strong>
          </div>
          <div style={{ marginTop: '0.25rem', color: '#64748b' }}>
            ZeroToHeroReact Architecture Series • React 18 & React Hook Form v7.51 • Dev Server Port <strong>3049</strong>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

