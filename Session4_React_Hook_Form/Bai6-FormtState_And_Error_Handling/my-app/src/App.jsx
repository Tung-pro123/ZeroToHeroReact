import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Navbar from './components/common/Navbar';
import HomePage from './pages/HomePage';
import FormStateRadarPage from './pages/FormStateRadarPage';
import DirtyVsTouchedLabPage from './pages/DirtyVsTouchedLabPage';
import EditProfileStudioPage from './pages/EditProfileStudioPage';
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
            <Route path="/formstate-radar" element={<FormStateRadarPage />} />
            <Route path="/dirty-vs-touched" element={<DirtyVsTouchedLabPage />} />
            <Route path="/edit-profile-studio" element={<EditProfileStudioPage />} />
            <Route path="/architect-quiz" element={<ArchitectQuizPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

