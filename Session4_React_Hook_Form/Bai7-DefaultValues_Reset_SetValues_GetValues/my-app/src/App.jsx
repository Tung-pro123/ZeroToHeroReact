import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Navbar from './components/common/Navbar';
import HomePage from './pages/HomePage';
import ResetVsSetValueLabPage from './pages/ResetVsSetValueLabPage';
import GetValuesSnapshotLabPage from './pages/GetValuesSnapshotLabPage';
import CreateVsEditProductStudioPage from './pages/CreateVsEditProductStudioPage';
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
            <Route path="/reset-vs-setvalue" element={<ResetVsSetValueLabPage />} />
            <Route path="/getvalues-snapshot" element={<GetValuesSnapshotLabPage />} />
            <Route path="/create-vs-edit" element={<CreateVsEditProductStudioPage />} />
            <Route path="/architect-quiz" element={<ArchitectQuizPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

