import React from 'react';
import { Link } from 'react-router-dom';
import RenderCounter from '../components/common/RenderCounter';

export default function HomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Hero Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #101c33 0%, #1e293b 100%)', borderColor: '#3b82f6' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span className="badge badge-blue">LESSON 7 OF 9</span>
              <span className="badge badge-emerald">PROGRAMMATIC FORM CONTROL</span>
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.5rem' }}>
              Bộ 4 API Điều Khiển Dữ Liệu Form Chủ Động
            </h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '780px', fontSize: '0.95rem' }}>
              Sau khi đã thuần thục việc lắng nghe người dùng nhập qua <code>register</code> và kiểm soát trạng thái bằng <code>formState</code>, 
              hôm nay chúng ta làm chủ 4 công cụ quyền lực để <strong>chủ động điều khiển form bằng code</strong>: 
              <code>defaultValues</code> (điểm xuất phát), <code>reset()</code> (tái lập trạng thái), <code>setValue()</code> (ghi dữ liệu), 
              và <code>getValues()</code> (đọc snapshot tức thời).
            </p>
          </div>
          <RenderCounter name="HomePage" />
        </div>
      </div>

      {/* 4-Way Control Flow Diagram */}
      <div className="flow-diagram-grid">
        <div className="flow-card" style={{ borderLeft: '4px solid var(--primary-light)' }}>
          <div className="flow-card-header">
            <span className="flow-card-title" style={{ color: 'var(--primary-light)' }}>defaultValues</span>
            <span className="badge badge-blue">Baseline</span>
          </div>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
            <strong>"Form bắt đầu thế nào?"</strong> — Đặt mốc dữ liệu ban đầu cho form và làm chuẩn so sánh cho cơ chế tính toán <code>isDirty</code>.
          </p>
        </div>

        <div className="flow-card" style={{ borderLeft: '4px solid var(--accent-cyan)' }}>
          <div className="flow-card-header">
            <span className="flow-card-title" style={{ color: 'var(--accent-cyan)' }}>reset(newData)</span>
            <span className="badge badge-cyan">Reinitialize</span>
          </div>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
            <strong>"Đưa form về một baseline mới"</strong> — Xóa form về mặc định hoặc nạp trọn bộ dữ liệu server cho Edit Form.
          </p>
        </div>

        <div className="flow-card" style={{ borderLeft: '4px solid var(--accent-purple)' }}>
          <div className="flow-card-header">
            <span className="flow-card-title" style={{ color: 'var(--accent-purple)' }}>setValue(name, val)</span>
            <span className="badge badge-purple">Code ➔ Form</span>
          </div>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
            <strong>"Code chủ động đổi 1 field"</strong> — Cập nhật giá trị trường cụ thể kèm các tùy chọn <code>shouldValidate</code>, <code>shouldDirty</code>.
          </p>
        </div>

        <div className="flow-card" style={{ borderLeft: '4px solid var(--accent-emerald)' }}>
          <div className="flow-card-header">
            <span className="flow-card-title" style={{ color: 'var(--accent-emerald)' }}>getValues()</span>
            <span className="badge badge-emerald">Form ➔ Code</span>
          </div>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
            <strong>"Đọc snapshot ngay bây giờ"</strong> — Lấy nhanh giá trị hiện tại mà KHÔNG gây re-render component, lý tưởng cho event handlers.
          </p>
        </div>
      </div>

      {/* Conceptual Comparison Table */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <span>⚖️</span> Đối Chiếu 3 Cặp Khái Niệm Rất Dễ Bị Nhầm Lẫn
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '0.75rem 1rem' }}>Cặp So Sánh</th>
                <th style={{ padding: '0.75rem 1rem' }}>Khái Niệm A</th>
                <th style={{ padding: '0.75rem 1rem' }}>Khái Niệm B</th>
                <th style={{ padding: '0.75rem 1rem' }}>Quy Tắc Vàng Cần Nhớ</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '0.85rem 1rem', fontWeight: '700' }}>defaultValues vs placeholder</td>
                <td style={{ padding: '0.85rem 1rem' }}><code>defaultValues</code>: Giá trị thực tế của form được gửi đi nếu user không sửa.</td>
                <td style={{ padding: '0.85rem 1rem' }}><code>placeholder</code>: Chỉ là chữ gợi ý mờ của HTML, không có giá trị thật trong payload.</td>
                <td style={{ padding: '0.85rem 1rem', color: 'var(--accent-emerald)' }}>Đừng bao giờ nhầm placeholder là giá trị mặc định của form!</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '0.85rem 1rem', fontWeight: '700' }}>setValue() vs reset()</td>
                <td style={{ padding: '0.85rem 1rem' }}><code>setValue()</code>: Cập nhật MỘT hoặc vài field trong form đang hoạt động.</td>
                <td style={{ padding: '0.85rem 1rem' }}><code>reset()</code>: Tái khởi tạo TOÀN BỘ form về một bộ dữ liệu / baseline mới.</td>
                <td style={{ padding: '0.85rem 1rem', color: 'var(--accent-cyan)' }}>Khi nạp data sản phẩm từ server cho Edit Form, hãy dùng <code>reset(product)</code> thay vì gọi <code>setValue</code> hàng loạt!</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '0.85rem 1rem', fontWeight: '700' }}>getValues() vs handleSubmit()</td>
                <td style={{ padding: '0.85rem 1rem' }}><code>getValues()</code>: Đọc giá trị tức thì, KHÔNG kiểm tra validation.</td>
                <td style={{ padding: '0.85rem 1rem' }}><code>handleSubmit()</code>: Toàn bộ quy trình submit ➔ chặn reload ➔ validate ➔ giao data sạch.</td>
                <td style={{ padding: '0.85rem 1rem', color: 'var(--accent-amber)' }}><code>getValues()</code> dùng để đọc snapshot; <code>handleSubmit</code> dùng cho flow submit dữ liệu!</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Navigation to Labs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        <Link to="/reset-vs-setvalue" className="card" style={{ textDecoration: 'none' }}>
          <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>⚙️</div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            1. setValue() Options vs reset() Lab
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Thực nghiệm các options của <code>setValue</code> (<code>shouldValidate</code>, <code>shouldDirty</code>, <code>shouldTouch</code>) và đối chiếu với <code>reset()</code>.
          </p>
        </Link>

        <Link to="/getvalues-snapshot" className="card" style={{ textDecoration: 'none' }}>
          <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>📸</div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            2. getValues() Snapshot Lab
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Khám phá cơ chế đọc tức thời không gây re-render component, và ứng dụng so sánh chéo mật khẩu xác nhận (Confirm Password).
          </p>
        </Link>

        <Link to="/create-vs-edit" className="card" style={{ textDecoration: 'none' }}>
          <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>📦</div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            3. Studio Create vs Edit Product
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Mô phỏng trọn vẹn 2 màn hình kinh điển: Tạo sản phẩm mới (reset sau submit thành công) và Chỉnh sửa sản phẩm (đồng bộ API bằng <code>useEffect</code>).
          </p>
        </Link>

        <Link to="/architect-quiz" className="card" style={{ textDecoration: 'none' }}>
          <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>🏆</div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            4. Senior Architect Quiz (5 Câu)
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Kiểm tra mức độ thành thạo về tư duy điều khiển form, semantics của <code>reset</code> vs <code>setValue</code>, và snapshot data.
          </p>
        </Link>
      </div>
    </div>
  );
}

