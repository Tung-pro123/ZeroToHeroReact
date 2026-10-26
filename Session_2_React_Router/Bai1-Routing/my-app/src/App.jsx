import { Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Navbar from './components/common/Navbar';
import HomePage from './pages/HomePage';
import CsrVsSsrRoutingPage from './pages/CsrVsSsrRoutingPage';
import CoreTrioPage from './pages/CoreTrioPage';
import AdminLayoutPage, { AdminDashboard, AdminUsers, AdminSettings } from './pages/AdminLayoutPage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
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
          {/* 1. Basic Route */}
          <Route path="/" element={<HomePage />} />
          <Route path="/csr-vs-ssr" element={<CsrVsSsrRoutingPage />} />
          <Route path="/core-trio" element={<CoreTrioPage />} />

          {/* 2. Nested Routes with <Outlet /> & Index Route */}
          <Route path="/admin" element={<AdminLayoutPage />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* 3. Dynamic Segments (:courseId) */}
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:courseId" element={<CourseDetailPage />} />

          {/* 4. Quiz */}
          <Route path="/quiz" element={<QuizPage />} />

          {/* 5. Wildcard Catch-All 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <p>
          🌐 <strong>Zero to Hero React Mastery</strong> • Session 2: Bài 1 - Routing (BrowserRouter, Routes, Route, Nested Layouts & Outlet)
        </p>
        <p style={{ marginTop: '0.4rem', color: '#64748b', fontSize: '0.82rem' }}>
          Được thiết kế chuẩn kiến trúc Production theo React Router 6 & Tiêu chuẩn Phỏng vấn Senior Frontend Engineer.
        </p>
      </footer>
    </div>
  );
}
