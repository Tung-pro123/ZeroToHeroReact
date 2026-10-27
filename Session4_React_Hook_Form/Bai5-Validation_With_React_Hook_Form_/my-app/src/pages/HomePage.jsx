import React from 'react';
import { Link } from 'react-router-dom';
import RenderCounter from '../components/common/RenderCounter';

export default function HomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Hero Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #101b2f 0%, #1e293b 100%)', borderColor: '#3b82f6' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span className="badge badge-blue">LESSON 5 OF 9</span>
              <span className="badge badge-emerald">THE VALIDATION ENGINE</span>
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.5rem' }}>
              Validation Trong React Hook Form: Cấu Hình Ràng Buộc Dữ Liệu
            </h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '780px', fontSize: '0.95rem' }}>
              Ở Bài 4, ta biết rằng <code>handleSubmit</code> đóng vai trò người gác cổng. Hôm nay, chúng ta mở chiếc hộp 
              <strong>"VALIDATION"</strong>: Khám phá cách truyền các quy tắc thẩm định vào đối số thứ hai của <code>register("fieldName", {'{ ...rules }'})</code>, 
              cú pháp ngắn gọn vs cú pháp object có message, custom function <code>validate</code>, và các chế độ kích hoạt <code>mode</code>.
            </p>
          </div>
          <RenderCounter name="HomePage" />
        </div>
      </div>

      {/* Mental Model Connection Diagram */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <span>🔗</span> Mắt Xích Kiến Thức: Từ register() Đến Thẩm Định Form
          </div>
          <span className="badge badge-cyan">Architecture Flow</span>
        </div>

        <div className="code-block" style={{ fontSize: '0.88rem' }}>
          <span className="code-keyword">register</span>(<span className="code-string">"email"</span>, {'{'}<br />
          &nbsp;&nbsp;<span className="code-comment">// 👇 Argument 2 chính là nơi định nghĩa toàn bộ luật chơi</span><br />
          &nbsp;&nbsp;<span className="code-prop">required</span>: <span className="code-string">"Email không được để trống"</span>,<br />
          &nbsp;&nbsp;<span className="code-prop">pattern</span>: {'{'}<br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-prop">value</span>: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{'{2,}'}$/i,<br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-prop">message</span>: <span className="code-string">"Định dạng email không hợp lệ"</span>,<br />
          &nbsp;&nbsp;{'}'},<br />
          &nbsp;&nbsp;<span className="code-prop">validate</span>: (<span className="code-func">val</span>) =&gt; !<span className="code-func">val</span>.<span className="code-func">endsWith</span>(<span className="code-string">"@tempmail.com"</span>) || <span className="code-string">"Không chấp nhận email rác!"</span>,<br />
          {'}'});
        </div>
      </div>

      {/* The Complete Rules Matrix */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <span>📊</span> Bảng Tổng Hợp Ma Trận Các Quy Tắc Built-in Trong RHF
          </div>
          <span className="badge badge-amber">Rules Matrix</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="rules-table">
            <thead>
              <tr>
                <th>Tên Quy Tắc (Rule)</th>
                <th>Cú Pháp Ngắn Gọn</th>
                <th>Cú Pháp Chuẩn Object ({'{ value, message }'})</th>
                <th>Mục Đích Sử Dụng &amp; Ví Dụ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong style={{ color: 'var(--primary-light)' }}>required</strong></td>
                <td><code>required: true</code></td>
                <td><code>required: "Bắt buộc nhập"</code></td>
                <td>Kiểm tra trường không được để trống hoặc chưa tích chọn.</td>
              </tr>
              <tr>
                <td><strong style={{ color: 'var(--accent-cyan)' }}>minLength</strong></td>
                <td><code>minLength: 8</code></td>
                <td><code>{'{ value: 8, message: "Tối thiểu 8 ký tự" }'}</code></td>
                <td>Độ dài chuỗi tối thiểu (mật khẩu, username, mã số thuế).</td>
              </tr>
              <tr>
                <td><strong style={{ color: 'var(--accent-cyan)' }}>maxLength</strong></td>
                <td><code>maxLength: 30</code></td>
                <td><code>{'{ value: 30, message: "Tối đa 30 ký tự" }'}</code></td>
                <td>Độ dài chuỗi tối đa (tiêu đề, ghi chú tóm tắt).</td>
              </tr>
              <tr>
                <td><strong style={{ color: 'var(--accent-emerald)' }}>min</strong></td>
                <td><code>min: 18</code></td>
                <td><code>{'{ value: 18, message: "Phải >= 18 tuổi" }'}</code></td>
                <td>Giá trị số học tối thiểu (kết hợp <code>valueAsNumber: true</code>).</td>
              </tr>
              <tr>
                <td><strong style={{ color: 'var(--accent-emerald)' }}>max</strong></td>
                <td><code>max: 100</code></td>
                <td><code>{'{ value: 100, message: "Không quá 100" }'}</code></td>
                <td>Giá trị số học tối đa (tuổi, phần trăm giảm giá).</td>
              </tr>
              <tr>
                <td><strong style={{ color: 'var(--accent-purple)' }}>pattern</strong></td>
                <td><code>pattern: /^[0-9]+$/</code></td>
                <td><code>{'{ value: /^[0-9]+$/, message: "Chỉ nhập số" }'}</code></td>
                <td>Kiểm tra khớp biểu thức chính quy (RegExp).</td>
              </tr>
              <tr>
                <td><strong style={{ color: 'var(--accent-rose)' }}>validate</strong></td>
                <td><code>validate: (v) =&gt; v !== 'admin'</code></td>
                <td><code>validate: (v) =&gt; v !== 'admin' || 'Cấm admin!'</code></td>
                <td>Hàm kiểm tra logic tùy biến bất kỳ (Custom Business Rules).</td>
              </tr>
              <tr>
                <td><strong style={{ color: 'var(--accent-amber)' }}>valueAsNumber</strong></td>
                <td><code>valueAsNumber: true</code></td>
                <td><code>valueAsNumber: true</code></td>
                <td>Tùy chọn chuyển đổi giá trị sang Number (không phải validation rule).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Navigation to Labs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        <Link to="/built-in-rules" className="card" style={{ textDecoration: 'none' }}>
          <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>📏</div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            1. 6 Built-in Rules Studio
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Thực nghiệm chi tiết <code>required</code>, <code>minLength</code>, <code>maxLength</code>, <code>min</code>, <code>max</code>, <code>pattern</code> và phép màu <code>valueAsNumber</code>.
          </p>
        </Link>

        <Link to="/custom-validate" className="card" style={{ textDecoration: 'none' }}>
          <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>🧪</div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            2. Custom validate Function Lab
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Giải phẫu hàm <code>validate</code> khi built-in rules không đủ: Cấm từ khóa reserved (admin, root), kiểm tra độ phức tạp của mật khẩu.
          </p>
        </Link>

        <Link to="/validation-modes" className="card" style={{ textDecoration: 'none' }}>
          <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>⏱️</div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            3. So Sánh 3 Validation Modes (UX)
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Đổi qua lại giữa <code>mode: "onSubmit"</code>, <code>"onBlur"</code> và <code>"onChange"</code> để cảm nhận trải nghiệm người dùng thực tế.
          </p>
        </Link>

        <Link to="/enterprise-registration" className="card" style={{ textDecoration: 'none' }}>
          <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>🏢</div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            4. Enterprise Form &amp; Backend Compare
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Form doanh nghiệp hoàn chỉnh kết hợp mọi rule và bảng đối chiếu với các Annotation trong Spring Boot Java (`@NotBlank`, `@Email`, `@Size`, `@Min`).
          </p>
        </Link>

        <Link to="/architect-quiz" className="card" style={{ textDecoration: 'none' }}>
          <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>🏆</div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            5. Architect Quiz (5 Câu)
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Thử thách kiến thức phỏng vấn Senior Architect về cơ chế hoạt động ngầm của bộ máy Validation.
          </p>
        </Link>
      </div>
    </div>
  );
}

