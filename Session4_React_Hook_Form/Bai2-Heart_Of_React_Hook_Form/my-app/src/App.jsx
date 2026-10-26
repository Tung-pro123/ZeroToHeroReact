import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Navbar from './components/common/Navbar';
import HomePage from './pages/HomePage';
import TriadHubPage from './pages/TriadHubPage';
import FormDataVsStatePage from './pages/FormDataVsStatePage';
import DefaultValuesStudioPage from './pages/DefaultValuesStudioPage';
import FullstackPipelinePage from './pages/FullstackPipelinePage';
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
          <Route path="/triad-hub" element={<TriadHubPage />} />
          <Route path="/data-vs-state" element={<FormDataVsStatePage />} />
          <Route path="/default-values" element={<DefaultValuesStudioPage />} />
          <Route path="/fullstack-pipeline" element={<FullstackPipelinePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <p>
          💖 <strong>Zero to Hero React Mastery</strong> • Session 4: Bài 2 - useForm() Trái Tim Của React Hook Form
        </p>
        <p style={{ marginTop: '0.4rem', color: '#64748b', fontSize: '0.82rem' }}>
          Được thiết kế theo chuẩn Enterprise Architecture & Quản lý FormState hiệu năng cao trong React 18.
        </p>
      </footer>
    </div>
  );
}
