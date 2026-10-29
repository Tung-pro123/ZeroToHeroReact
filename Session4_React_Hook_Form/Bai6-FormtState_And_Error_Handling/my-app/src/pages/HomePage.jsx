import React from 'react';
import { Link } from 'react-router-dom';
import RenderCounter from '../components/common/RenderCounter';

export default function HomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Hero Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #131c33 0%, #1e1b4b 100%)', borderColor: '#6366f1' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span className="badge badge-indigo">LESSON 6 OF 9</span>
              <span className="badge badge-emerald">THE METADATA HUB</span>
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.5rem' }}>
              formState &amp; Error Handling: Làm Chủ Trạng Thái Biểu Mẫu
            </h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '780px', fontSize: '0.95rem' }}>
              Sau khi đã kết nối input và cấu hình validation ở các bài trước, hôm nay chúng ta khám phá trung tâm điều khiển 
              <strong> formState</strong>. Hiểu rõ sự khác biệt giữa <strong>Form Data</strong> (dữ liệu nhập) và <strong>Form State</strong> (siêu dữ liệu mô tả trạng thái form), 
              và làm chủ 6 thuộc tính then chốt: <code>errors</code>, <code>isDirty</code>, <code>dirtyFields</code>, <code>touchedFields</code>, <code>isValid</code>, và <code>isSubmitting</code>.
            </p>
          </div>
          <RenderCounter name="HomePage" />
        </div>
      </div>

      {/* Form Data vs Form State Comparison */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <span>⚖️</span> Phân Biệt Sâu Sắc: Form Data vs Form State
          </div>
          <span className="badge badge-cyan">Core Mental Model</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {/* Form Data Box */}
          <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--accent-cyan)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--accent-cyan)' }}>
                1. Form Data (Dữ liệu người dùng)
              </h3>
              <span className="badge badge-cyan">Payload Object</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
              Trả lời câu hỏi: <strong>"Người dùng đã nhập cái gì vào form?"</strong>
            </p>
            <div className="code-block" style={{ fontSize: '0.8rem' }}>
              {'{'}<br />
              &nbsp;&nbsp;<span className="code-prop">username</span>: <span className="code-string">"tung_developer"</span>,<br />
              &nbsp;&nbsp;<span className="code-prop">email</span>: <span className="code-string">"tung@example.com"</span>,<br />
              &nbsp;&nbsp;<span className="code-prop">role</span>: <span className="code-string">"LEAD_ARCHITECT"</span><br />
              {'}'}
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Dữ liệu này được chuyển giao cho hàm <code>onSubmit(data)</code> khi người dùng gửi form thành công.
            </p>
          </div>

          {/* Form State Box */}
          <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--accent-purple)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--accent-purple)' }}>
                2. Form State (Siêu dữ liệu trạng thái)
              </h3>
              <span className="badge badge-purple">formState Object</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
              Trả lời câu hỏi: <strong>"Biểu mẫu hiện đang ở trong tình trạng nào?"</strong>
            </p>
            <div className="code-block" style={{ fontSize: '0.8rem' }}>
              {'{'}<br />
              &nbsp;&nbsp;<span className="code-prop">errors</span>: {'{ ... }'}, <span className="code-comment">// Trường nào đang lỗi?</span><br />
              &nbsp;&nbsp;<span className="code-prop">isDirty</span>: <span className="code-keyword">true</span>, <span className="code-comment">// Có khác defaultValues không?</span><br />
              &nbsp;&nbsp;<span className="code-prop">dirtyFields</span>: {'{ username: true }'}, <span className="code-comment">// Ô nào bị sửa?</span><br />
              &nbsp;&nbsp;<span className="code-prop">touchedFields</span>: {'{ email: true }'}, <span className="code-comment">// Ô nào đã bị rời khỏi?</span><br />
              &nbsp;&nbsp;<span className="code-prop">isValid</span>: <span className="code-keyword">false</span>, <span className="code-comment">// Có thỏa mãn 100% rules?</span><br />
              &nbsp;&nbsp;<span className="code-prop">isSubmitting</span>: <span className="code-keyword">false</span> <span className="code-comment">// Có đang gửi API không?</span><br />
              {'}'}
            </div>
          </div>
        </div>
      </div>

      {/* 6 Pillars Summary Table */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <span>🏛️</span> Bảng Ma Trận 6 Trụ Cột Của formState
          </div>
          <span className="badge badge-indigo">Property Overview</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '0.75rem 1rem' }}>Thuộc tính</th>
                <th style={{ padding: '0.75rem 1rem' }}>Kiểu Dữ Liệu</th>
                <th style={{ padding: '0.75rem 1rem' }}>Ý Nghĩa Thực Tế</th>
                <th style={{ padding: '0.75rem 1rem' }}>Ứng Dụng Điển Hình Trên UI</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '0.85rem 1rem' }}><code style={{ color: 'var(--accent-rose)', fontWeight: '700' }}>errors</code></td>
                <td style={{ padding: '0.85rem 1rem' }}><span className="badge badge-rose">Object</span></td>
                <td style={{ padding: '0.85rem 1rem' }}>Chứa danh sách các trường đang vi phạm validation kèm thông điệp lỗi.</td>
                <td style={{ padding: '0.85rem 1rem' }}>Render thông báo lỗi dưới input: <code>{'{errors.email?.message}'}</code></td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '0.85rem 1rem' }}><code style={{ color: 'var(--accent-amber)', fontWeight: '700' }}>isDirty</code></td>
                <td style={{ padding: '0.85rem 1rem' }}><span className="badge badge-amber">Boolean</span></td>
                <td style={{ padding: '0.85rem 1rem' }}>Báo hiệu toàn bộ form có bất kỳ giá trị nào khác với <code>defaultValues</code> hay không.</td>
                <td style={{ padding: '0.85rem 1rem' }}>Khóa nút "Lưu thay đổi" khi người dùng chưa sửa gì: <code>disabled={'{!isDirty}'}</code></td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '0.85rem 1rem' }}><code style={{ color: 'var(--accent-cyan)', fontWeight: '700' }}>dirtyFields</code></td>
                <td style={{ padding: '0.85rem 1rem' }}><span className="badge badge-cyan">Object</span></td>
                <td style={{ padding: '0.85rem 1rem' }}>Chỉ rõ cụ thể những trường nào đã bị người dùng chỉnh sửa khác default.</td>
                <td style={{ padding: '0.85rem 1rem' }}>Hiện biểu tượng dấu chấm vàng hoặc nhãn "Đã sửa" cạnh từng ô input.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '0.85rem 1rem' }}><code style={{ color: 'var(--accent-purple)', fontWeight: '700' }}>touchedFields</code></td>
                <td style={{ padding: '0.85rem 1rem' }}><span className="badge badge-purple">Object</span></td>
                <td style={{ padding: '0.85rem 1rem' }}>Ghi nhận những trường mà người dùng đã từng bấm vào (focus) rồi rời khỏi (blur).</td>
                <td style={{ padding: '0.85rem 1rem' }}>Chỉ hiện lỗi sau khi người dùng đã rời khỏi ô: <code>{'{touchedFields.email && errors.email}'}</code></td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '0.85rem 1rem' }}><code style={{ color: 'var(--accent-emerald)', fontWeight: '700' }}>isValid</code></td>
                <td style={{ padding: '0.85rem 1rem' }}><span className="badge badge-emerald">Boolean</span></td>
                <td style={{ padding: '0.85rem 1rem' }}>Khẳng định 100% tất cả các trường trên form đều vượt qua các điều kiện validation.</td>
                <td style={{ padding: '0.85rem 1rem' }}>Khóa nút Submit khi form còn lỗi: <code>disabled={'{!isValid}'}</code></td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '0.85rem 1rem' }}><code style={{ color: 'var(--primary-light)', fontWeight: '700' }}>isSubmitting</code></td>
                <td style={{ padding: '0.85rem 1rem' }}><span className="badge badge-indigo">Boolean</span></td>
                <td style={{ padding: '0.85rem 1rem' }}>Tự động là <code>true</code> trong lúc hàm async <code>onSubmit(data)</code> đang đợi Promise.</td>
                <td style={{ padding: '0.85rem 1rem' }}>Hiển thị spinner xoay và ngăn người dùng click đúp gửi 2 lần liên tiếp.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Navigation to Labs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        <Link to="/formstate-radar" className="card" style={{ textDecoration: 'none' }}>
          <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>📡</div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            1. formState Radar Dashboard
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Bảng điều khiển trực quan hóa cả 6 thuộc tính của <code>formState</code> phản hồi thời gian thực khi bạn nhập liệu và tương tác.
          </p>
        </Link>

        <Link to="/dirty-vs-touched" className="card" style={{ textDecoration: 'none' }}>
          <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>🔬</div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            2. Ma Trận Dirty vs Touched
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Giải phẫu sự khác biệt giữa "Chạm vào rồi rời đi" (Touched) và "Giá trị bị thay đổi khỏi mặc định" (Dirty).
          </p>
        </Link>

        <Link to="/edit-profile-studio" className="card" style={{ textDecoration: 'none' }}>
          <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>👤</div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            3. Studio Edit Profile &amp; Dirty Tracking
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Xây dựng trang cập nhật hồ sơ chuẩn doanh nghiệp: Khóa nút lưu thông minh, đánh dấu ô bị sửa và mô phỏng gửi dữ liệu backend.
          </p>
        </Link>

        <Link to="/architect-quiz" className="card" style={{ textDecoration: 'none' }}>
          <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>🏆</div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            4. Senior Architect Quiz (5 Câu)
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Thử thách 5 câu hỏi phỏng vấn hóc búa về kiến trúc <code>formState</code>, lifecycle submit và tối ưu hóa UX.
          </p>
        </Link>
      </div>
    </div>
  );
}

