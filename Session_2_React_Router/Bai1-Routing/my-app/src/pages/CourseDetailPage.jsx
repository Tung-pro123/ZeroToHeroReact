import { useParams, Link } from 'react-router-dom';
import { COURSES_DATA } from './CoursesPage';

export default function CourseDetailPage() {
  const { courseId } = useParams();

  const course = COURSES_DATA.find((c) => c.id === courseId);

  return (
    <div className="tab-pane">
      <div className="lab-card">
        {/* Breadcrumb */}
        <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
          <Link to="/" style={{ color: '#38bdf8' }}>Trang chủ</Link>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <Link to="/courses" style={{ color: '#38bdf8' }}>Khóa học</Link>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <span>{courseId}</span>
        </div>

        <div style={{
          padding: '1.5rem',
          background: 'rgba(56, 189, 248, 0.05)',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          borderRadius: '12px',
          marginBottom: '1.5rem',
        }}>
          <span className="badge badge-emerald" style={{ marginBottom: '0.5rem' }}>
            useParams() Hook đã bóc tách:
          </span>
          <div style={{ fontSize: '1.4rem', fontFamily: 'JetBrains Mono', color: '#38bdf8', margin: '0.4rem 0' }}>
            courseId = "{courseId}"
          </div>
        </div>

        {course ? (
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.75rem' }}>
              {course.title}
            </h1>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
              {course.description}
            </p>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Link to="/courses" className="btn btn-primary">
                ⬅️ Quay Lại Danh Sách Khóa Học
              </Link>
            </div>
          </div>
        ) : (
          <div style={{ color: '#f87171' }}>
            ⚠️ Không tìm thấy chi tiết khóa học cho ID này trong database.
          </div>
        )}
      </div>
    </div>
  );
}
