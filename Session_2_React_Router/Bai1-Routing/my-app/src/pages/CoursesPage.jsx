import { Link } from 'react-router-dom';

export const COURSES_DATA = [
  {
    id: 'react-18-core',
    title: 'Khóa học React 18 & 19 Core Mastery',
    duration: '12 Tuần',
    level: 'Nền tảng đến Nâng cao',
    description: 'Bản chất Deep Dive: Virtual DOM, Reconciliation, Hooks, useReducer, Context và Custom Hooks.',
    badge: 'HOT',
  },
  {
    id: 'react-router-spa',
    title: 'Khóa học React Router & SPA Architecture',
    duration: '4 Tuần',
    level: 'Chuyên sâu Single Page App',
    description: 'Làm chủ BrowserRouter, Nested Routes, Outlet, NavLink, Loaders, Actions và Auth Guards.',
    badge: 'NEW',
  },
  {
    id: 'spring-boot-fullstack',
    title: 'Khóa học Spring Boot 3 & React Fullstack',
    duration: '16 Tuần',
    level: 'Thực chiến Doanh nghiệp',
    description: 'Kết hợp React Frontend với Spring Boot REST API, Spring Security JWT, JPA Hibernate và Docker.',
    badge: 'ENTERPRISE',
  },
];

export default function CoursesPage() {
  return (
    <div className="tab-pane">
      <div className="lab-card">
        <div className="lab-header">
          <h2 className="lab-title">🎯 Dynamic Segments: Tham Số Động (:id) Trong URL</h2>
          <p className="lab-desc">
            Kỹ thuật cấu hình Route chứa biến động: <code>path="/courses/:courseId"</code>. Hãy click vào từng khóa học bên dưới để quan sát URL thay đổi và Component con bóc tách tham số bằng <code>useParams()</code>.
          </p>
        </div>

        <div className="grid-3">
          {COURSES_DATA.map((course) => (
            <div
              key={course.id}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span className="badge badge-cyan" style={{ alignSelf: 'flex-start', marginBottom: '0.5rem', fontSize: '0.7rem' }}>
                {course.badge}
              </span>

              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.4rem', color: '#f8fafc' }}>
                {course.title}
              </h3>

              <div style={{ fontSize: '0.8rem', color: '#38bdf8', marginBottom: '0.5rem' }}>
                Thời lượng: {course.duration} • {course.level}
              </div>

              <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.5', flex: 1, marginBottom: '1rem' }}>
                {course.description}
              </p>

              <Link
                to={`/courses/${course.id}`}
                className="btn btn-outline"
                style={{ width: '100%', borderColor: 'rgba(56, 189, 248, 0.4)', color: '#38bdf8' }}
              >
                📖 Xem Giáo Trình (:id)
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
