// ========================================================================================
// FILE: src/components/pitfalls/PitfallDemonstrator.jsx
// ========================================================================================
// MỤC TIÊU: TRỰC QUAN HÓA CÁC CẠM BẪY KINH ĐIỂN CỦA BÀI 1 ĐỂ TRÁNH TRONG THỰC TẾ DOANH NGHIỆP
// ========================================================================================

import { useState } from 'react';

export default function PitfallDemonstrator() {
  // Quản lý tab để người học xem từng cạm bẫy
  const [activeTab, setActiveTab] = useState('naming');

  return (
    <div className="pitfalls-container">
      <div className="section-header">
        <div className="badge-pill warning">Phân Tích Cạm Bẫy (Pitfalls & Clean Code)</div>
        <h2 className="section-title">2 Cạm Bẫy Kinh Điển & 1 Cảnh Báo Hiệu Năng</h2>
        <p className="section-desc">
          Những lỗi sai 90% người mới học React gặp phải và cách tư duy theo chuẩn Enterprise.
        </p>
      </div>

      {/* Tabs chuyển đổi giữa 3 cạm bẫy */}
      <div className="pitfall-tabs">
        <button 
          className={`tab-btn ${activeTab === 'naming' ? 'active' : ''}`}
          onClick={() => setActiveTab('naming')}
        >
          1. Quên viết hoa (PascalCase)
        </button>
        <button 
          className={`tab-btn ${activeTab === 'asi' ? 'active' : ''}`}
          onClick={() => setActiveTab('asi')}
        >
          2. Bẫy ngắt dòng ASI (return)
        </button>
        <button 
          className={`tab-btn ${activeTab === 'nesting' ? 'active' : ''}`}
          onClick={() => setActiveTab('nesting')}
        >
          3. Định nghĩa lồng Component
        </button>
      </div>

      {/* Nội dung chi tiết của từng cạm bẫy */}
      <div className="pitfall-content-box">
        {activeTab === 'naming' && (
          <div className="pitfall-card">
            <h3 className="pitfall-title">
              Cạm bẫy 1: Quên viết hoa chữ cái đầu của Component
            </h3>
            <p className="pitfall-explanation">
              Trình xử lý JSX của React dùng quy ước chữ cái đầu để phân biệt:
              <br />
              &bull; <strong>Chữ thường</strong> (<code>&lt;button&gt;</code>, <code>&lt;div&gt;</code>, <code>&lt;profile&gt;</code>): 
              React coi là thẻ HTML gốc của trình duyệt. Trình duyệt không biết <code>&lt;profile&gt;</code> là gì nên sẽ bỏ qua hoặc render thẻ rỗng!
              <br />
              &bull; <strong>Chữ hoa (PascalCase)</strong> (<code>&lt;Profile /&gt;</code>, <code>&lt;TeamGallery /&gt;</code>): 
              React nhận diện đây là Component tự định nghĩa và gọi hàm tương ứng.
            </p>

            <div className="code-comparison-grid">
              <div className="code-block bad">
                <div className="code-badge bad">❌ SAI (Lỗi kinh điển)</div>
                <pre><code>{`// Sai vì chữ 'p' viết thường:
function profile() {
  return <h1>Xin chào!</h1>;
}

// Khi dùng trong JSX:
export default function App() {
  return <profile />; // Trình duyệt coi đây là thẻ HTML lạ!
}`}</code></pre>
              </div>

              <div className="code-block good">
                <div className="code-badge good">✅ ĐÚNG (Chuẩn React)</div>
                <pre><code>{`// Đúng: Viết hoa chữ 'P' (PascalCase):
function Profile() {
  return <h1>Xin chào!</h1>;
}

// Khi dùng trong JSX:
export default function App() {
  return <Profile />; // React gọi hàm Profile() để tạo giao diện
}`}</code></pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'asi' && (
          <div className="pitfall-card">
            <h3 className="pitfall-title">
              Cạm bẫy 2: Bẫy tự động chèn dấu chấm phẩy (ASI) khi thiếu ngoặc tròn
            </h3>
            <p className="pitfall-explanation">
              Cơ chế Automatic Semicolon Insertion (ASI) của JavaScript là một tính năng gây nhầm lẫn nhất. 
              Nếu bạn xuống dòng ngay sau từ khóa <code>return</code> mà không có dấu ngoặc tròn <code>(</code>, 
              trình biên dịch JS sẽ tự động chèn dấu <code>;</code> thành <code>return;</code> và lập tức trả về <code>undefined</code>.
            </p>

            <div className="code-comparison-grid">
              <div className="code-block bad">
                <div className="code-badge bad">❌ SAI (Trắng màn hình)</div>
                <pre><code>{`function Card() {
  return  // <-- JS tự thêm dấu ; ở đây thành "return;"!
    <div className="card">
      <h3>Nội dung</h3>
    </div>;
}
// Kết quả: Card trả về undefined, giao diện biến mất!`}</code></pre>
              </div>

              <div className="code-block good">
                <div className="code-badge good">✅ ĐÚNG (Luôn bọc trong ngoặc tròn)</div>
                <pre><code>{`function Card() {
  return ( // <-- Dấu mở ngoặc giữ lệnh return không bị ngắt dòng
    <div className="card">
      <h3>Nội dung</h3>
    </div>
  );
}`}</code></pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'nesting' && (
          <div className="pitfall-card">
            <h3 className="pitfall-title">
              Cảnh báo kỹ thuật: Tuyệt đối không định nghĩa Component lồng bên trong Component khác
            </h3>
            <p className="pitfall-explanation">
              Quy tắc vàng: <strong>Mọi Component phải được khai báo ở Top Level (phạm vi ngoài cùng của file)</strong>.
              <br />
              Nếu bạn định nghĩa hàm <code>Child()</code> nằm gọn bên trong thân hàm <code>Parent()</code>, 
              mỗi khi <code>Parent</code> chạy lại (re-render), con trỏ hàm <code>Child</code> sẽ bị khởi tạo mới trong bộ nhớ, 
              khiến toàn bộ trạng thái (state, input focus) của component con bị mất sạch và gây rò rỉ hiệu năng!
            </p>

            <div className="code-comparison-grid">
              <div className="code-block bad">
                <div className="code-badge bad">❌ SAI (Lồng định nghĩa hàm)</div>
                <pre><code>{`export default function Gallery() {
  // KHÔNG ĐƯỢC: Khai báo hàm con bên trong hàm cha!
  function Profile() {
    return <img src="avatar.jpg" alt="Dev" />;
  }

  return (
    <section>
      <Profile />
    </section>
  );
}`}</code></pre>
              </div>

              <div className="code-block good">
                <div className="code-badge good">✅ ĐÚNG (Tách riêng ở Top-Level)</div>
                <pre><code>{`// Khai báo độc lập ở phạm vi ngoài cùng:
function Profile() {
  return <img src="avatar.jpg" alt="Dev" />;
}

// Hàm cha chỉ việc gọi và sử dụng:
export default function Gallery() {
  return (
    <section>
      <Profile />
    </section>
  );
}`}</code></pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
