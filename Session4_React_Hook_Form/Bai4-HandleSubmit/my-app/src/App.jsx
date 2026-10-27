import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Navbar from './components/common/Navbar';
import HomePage from './pages/HomePage';
import HigherOrderLabPage from './pages/HigherOrderLabPage';
import TwoCallbacksLabPage from './pages/TwoCallbacksLabPage';
import PreventDefaultAndAsyncPage from './pages/PreventDefaultAndAsyncPage';
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
            <Route path="/higher-order-lab" element={<HigherOrderLabPage />} />
            <Route path="/two-callbacks-lab" element={<TwoCallbacksLabPage />} />
            <Route path="/prevent-default-async" element={<PreventDefaultAndAsyncPage />} />
            <Route path="/architect-quiz" element={<ArchitectQuizPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

