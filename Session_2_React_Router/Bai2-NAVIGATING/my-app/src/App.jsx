import { Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Navbar from './components/common/Navbar';
import HomePage from './pages/HomePage';
import NavLinkLabPage from './pages/NavLinkLabPage';
import UseNavigateLabPage from './pages/UseNavigateLabPage';
import StorePage from './pages/StorePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutSuccessPage from './pages/CheckoutSuccessPage';
import DashboardPage from './pages/DashboardPage';
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
          <Route path="/navlink-lab" element={<NavLinkLabPage />} />
          <Route path="/navigate-lab" element={<UseNavigateLabPage />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/checkout-success" element={<CheckoutSuccessPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <p>
          🧭 <strong>Zero to Hero React Mastery</strong> • Session 2: Bài 2 - Navigating (Link vs NavLink vs useNavigate)
        </p>
        <p style={{ marginTop: '0.4rem', color: '#64748b', fontSize: '0.82rem' }}>
          Được thiết kế chuẩn kiến trúc Production theo React Router 6 & Tiêu chuẩn Phỏng vấn Senior Frontend Engineer.
        </p>
      </footer>
    </div>
  );
}
