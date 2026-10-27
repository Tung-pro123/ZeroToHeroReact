import React from 'react';
import { Link } from 'react-router-dom';
import RenderCounter from '../components/common/RenderCounter';

export default function HomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Hero Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #131c2e 0%, #172554 100%)', borderColor: '#3b82f6' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span className="badge badge-indigo">LESSON 4 OF 9</span>
              <span className="badge badge-emerald">THE GATEKEEPER</span>
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.5rem' }}>
              handleSubmit(): Cánh Cổng Thu Thập Dữ Liệu &amp; Thẩm Định Form
            </h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '760px', fontSize: '0.95rem' }}>
              Ở Bài 3, bạn đã dùng <code>register()</code> để gắn kết các input. Nhưng khi người dùng bấm nút <strong>[ Submit ]</strong>, 
              ai ngăn chặn trình duyệt reload trang? Ai kiểm tra validation? Ai đóng gói các giá trị thành một <code>data object</code> hoàn chỉnh? 
              Đó chính là nhiệm vụ tối cao của <code>handleSubmit()</code>.
            </p>
          </div>
          <RenderCounter name="HomePage" />
        </div>
      </div>

      {/* The 5-Stage Gatekeeper Pipeline */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <span>🔄</span> 5 Giai Đoạn Trong Chu Trình Submit Form Của RHF
          </div>
          <span className="badge badge-cyan">Submission Architecture</span>
        </div>

        <div className="pipeline-container">
          <div className="pipeline-node">
            <span className="node-tag">Bước 1</span>
            <span className="node-title">User Action</span>
            <span className="node-subtitle">Click [Submit] hoặc Enter</span>
          </div>

          <span className="pipeline-arrow">➔</span>

          <div className="pipeline-node active">
            <span className="node-tag">Bước 2</span>
            <span className="node-title">Synthetic Event</span>
            <span className="node-subtitle">Browser phát event submit</span>
          </div>

          <span className="pipeline-arrow">➔</span>

          <div className="pipeline-node active">
            <span className="node-tag">Bước 3</span>
            <span className="node-title">RHF Handler</span>
            <span className="node-subtitle">event.preventDefault() tự động</span>
          </div>

          <span className="pipeline-arrow">➔</span>

          <div className="pipeline-node active">
            <span className="node-tag">Bước 4</span>
            <span className="node-title">Validation Check</span>
            <span className="node-subtitle">Kiểm tra mọi registered fields</span>
          </div>

          <span className="pipeline-arrow">➔</span>

          <div className="pipeline-node success">
            <span className="node-tag">Bước 5 (Pass)</span>
            <span className="node-title">onValid(data)</span>
            <span className="node-subtitle">Nhận clean data object</span>
          </div>
        </div>

        <div style={{ background: '#0b1120', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <p style={{ fontSize: '0.9rem', color: '#93c5fd', lineHeight: '1.6' }}>
            💡 <strong>Câu thần chú cốt lõi của Bài 4:</strong><br />
            <em>"React Hook Form nhận <code>event</code> từ trình duyệt; còn callback nghiệp vụ của bạn nhận <code>data</code> đã được xác thực!"</em>
          </p>
        </div>
      </div>

      {/* 3 Paradigms Comparison Table */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <span>⚖️</span> So Sánh 3 Mô Hình Xử Lý Form Trong Web &amp; React
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '0.75rem 1rem' }}>Tiêu chí</th>
                <th style={{ padding: '0.75rem 1rem' }}>HTML Form Truyền Thống</th>
                <th style={{ padding: '0.75rem 1rem' }}>React Controlled Form (useState)</th>
                <th style={{ padding: '0.75rem 1rem', color: 'var(--primary-light)' }}>React Hook Form (handleSubmit)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '0.85rem 1rem', fontWeight: '600' }}>Hành vi reload trang</td>
                <td style={{ padding: '0.85rem 1rem', color: 'var(--accent-rose)' }}>Tự động reload &amp; gửi GET/POST</td>
                <td style={{ padding: '0.85rem 1rem', color: 'var(--accent-amber)' }}>Phải nhớ tự gõ <code>e.preventDefault()</code></td>
                <td style={{ padding: '0.85rem 1rem', color: 'var(--accent-emerald)', fontWeight: '600' }}>RHF tự động xử lý dưới nền</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '0.85rem 1rem', fontWeight: '600' }}>Cách gom dữ liệu</td>
                <td style={{ padding: '0.85rem 1rem' }}>FormData API hoặc server form encoding</td>
                <td style={{ padding: '0.85rem 1rem' }}>Gom thủ công từ từng biến <code>state</code></td>
                <td style={{ padding: '0.85rem 1rem', color: 'var(--accent-emerald)', fontWeight: '600' }}>RHF tự trích xuất và đóng gói vào <code>data</code></td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '0.85rem 1rem', fontWeight: '600' }}>Thời điểm chạy Validation</td>
                <td style={{ padding: '0.85rem 1rem' }}>HTML5 constraints cơ bản</td>
                <td style={{ padding: '0.85rem 1rem' }}>Lập trình viên viết hàng loạt <code>if (...) return;</code></td>
                <td style={{ padding: '0.85rem 1rem', color: 'var(--accent-emerald)', fontWeight: '600' }}>Tự động kiểm tra trước khi gọi callback</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '0.85rem 1rem', fontWeight: '600' }}>Gửi HTTP Request</td>
                <td style={{ padding: '0.85rem 1rem' }}>Trình duyệt tự chuyển trang</td>
                <td style={{ padding: '0.85rem 1rem' }}>Lập trình viên gọi <code>fetch()</code> / <code>axios</code></td>
                <td style={{ padding: '0.85rem 1rem' }}>Lập trình viên gọi <code>fetch()</code> trong <code>onSubmit(data)</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Module Navigation Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        <Link to="/higher-order-lab" className="card" style={{ textDecoration: 'none' }}>
          <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>⚙️</div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            1. Giải Phẫu Higher-Order Function
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Khám phá tại sao <code>handleSubmit(onSubmit)</code> trả về một function mới, phân biệt Render Time vs Submit Event Time và 3 lỗi phổ biến.
          </p>
        </Link>

        <Link to="/two-callbacks-lab" className="card" style={{ textDecoration: 'none' }}>
          <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>🔀</div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            2. Hai Callbacks: onValid &amp; onInvalid
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Xem luồng rẽ nhánh trực quan thời gian thực: Khi form hợp lệ gọi <code>onValid(data)</code>, khi vi phạm validation gọi <code>onInvalid(errors)</code>.
          </p>
        </Link>

        <Link to="/prevent-default-async" className="card" style={{ textDecoration: 'none' }}>
          <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>🚀</div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            3. PreventDefault &amp; Spring Boot Async
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Trực tiếp tương tác gửi dữ liệu tới Mock Spring Boot Server <code>@PostMapping("/api/users")</code> với <code>isSubmitting</code>, HTTP status 200, 400, 500.
          </p>
        </Link>

        <Link to="/architect-quiz" className="card" style={{ textDecoration: 'none' }}>
          <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>🏆</div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            4. Senior Architect Quiz
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Thử thách 5 câu hỏi phỏng vấn hóc búa về Higher-Order Functions, Event Lifecycle và kiến trúc Form Submission.
          </p>
        </Link>
      </div>
    </div>
  );
}

