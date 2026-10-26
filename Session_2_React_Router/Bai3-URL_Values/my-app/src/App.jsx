import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Navbar from './components/common/Navbar';
import UrlOmnibar from './components/common/UrlOmnibar';
import HomePage from './pages/HomePage';
import ParamsLabPage from './pages/ParamsLabPage';
import ConcertCityPage from './pages/ConcertCityPage';
import ShopProductPage from './pages/ShopProductPage';
import SearchParamsStudioPage from './pages/SearchParamsStudioPage';
import LocationInspectorPage from './pages/LocationInspectorPage';
import SpringBootBridgePage from './pages/SpringBootBridgePage';
import QuizPage from './pages/QuizPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

export default function App() {
  return (
    <div className="app-container">
      <Header />
      <Navbar />

      <main className="app-main-content">
        <UrlOmnibar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/params-lab" element={<ParamsLabPage />} />
          <Route path="/concerts/:city" element={<ConcertCityPage />} />
          <Route path="/shops/:shopId/products/:productId" element={<ShopProductPage />} />
          <Route path="/search-studio" element={<SearchParamsStudioPage />} />
          <Route path="/location-inspector" element={<LocationInspectorPage />} />
          <Route path="/spring-boot-bridge" element={<SpringBootBridgePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <p>
          🌐 <strong>Zero to Hero React Mastery</strong> • Session 2: Bài 3 - URL Values (useParams, useSearchParams, useLocation)
        </p>
        <p style={{ marginTop: '0.4rem', color: '#64748b', fontSize: '0.82rem' }}>
          Thiết kế chuẩn kiến trúc Production theo React Router v6 & Đối chiếu trực quan với Spring Boot 3 MVC.
        </p>
      </footer>
    </div>
  );
}
