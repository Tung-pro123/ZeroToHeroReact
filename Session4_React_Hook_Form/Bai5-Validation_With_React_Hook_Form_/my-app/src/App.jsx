import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Navbar from './components/common/Navbar';
import HomePage from './pages/HomePage';
import BuiltInRulesStudioPage from './pages/BuiltInRulesStudioPage';
import CustomValidateLabPage from './pages/CustomValidateLabPage';
import ValidationModesPlaygroundPage from './pages/ValidationModesPlaygroundPage';
import EnterpriseRegistrationPage from './pages/EnterpriseRegistrationPage';
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
            <Route path="/built-in-rules" element={<BuiltInRulesStudioPage />} />
            <Route path="/custom-validate" element={<CustomValidateLabPage />} />
            <Route path="/validation-modes" element={<ValidationModesPlaygroundPage />} />
            <Route path="/enterprise-registration" element={<EnterpriseRegistrationPage />} />
            <Route path="/architect-quiz" element={<ArchitectQuizPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

