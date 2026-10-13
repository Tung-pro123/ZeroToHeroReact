// ============================================================================
// FILE: src/components/ChallengeSolution.jsx
// MỤC TIÊU: Lời giải tương tác cho Thử thách 1 từ react.dev
//           "Split the components further (Tách Profile ra file riêng)"
// ============================================================================

import React, { useState } from 'react';
import Profile from './Profile';

export default function ChallengeSolution() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="challenge-container">
      <div className="challenge-badge">🏆 Thử thách chính thức react.dev</div>
      <h2 className="challenge-title">Thử Thách: Tách Profile ra Tập Tin Riêng</h2>
      
      <p className="challenge-desc">
        Trong mã nguồn ban đầu, component <code>Profile</code> được viết chung trong <code>Gallery.js</code> mà không có từ khóa <code>export</code>. 
        Mục tiêu là chuyển <code>Profile</code> ra file độc lập <code>Profile.js</code> và import lại vào <code>Gallery.js</code>.
      </p>

      {/* Thanh tiến trình các bước giải quyết */}
      <div className="steps-nav">
        <button 
          className={`step-btn ${activeStep === 1 ? 'active' : ''}`}
          onClick={() => setActiveStep(1)}
        >
          Bước 1: Tạo Profile.jsx
        </button>
        <button 
          className={`step-btn ${activeStep === 2 ? 'active' : ''}`}
          onClick={() => setActiveStep(2)}
        >
          Bước 2: Cập nhật Gallery.jsx
        </button>
        <button 
          className={`step-btn ${activeStep === 3 ? 'active' : ''}`}
          onClick={() => setActiveStep(3)}
        >
          Bước 3: Kết quả hoạt động
        </button>
      </div>

      {/* Nội dung chi tiết từng bước */}
      <div className="step-content">
        {activeStep === 1 && (
          <div className="step-panel">
            <h4>📁 Bước 1: Tạo tập tin <code>src/components/Profile.jsx</code></h4>
            <p>Di chuyển hàm <code>Profile()</code> sang tập tin mới và thêm tiền tố <code>export default</code>:</p>
            <pre className="code-snippet">
{`// src/components/Profile.jsx
export default function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
      className="profile-avatar"
    />
  );
}`}
            </pre>
            <div className="tip-box">
              💡 <strong>Lưu ý:</strong> Dùng <code>export default</code> vì <code>Profile</code> là component đại diện chính duy nhất của tập tin này.
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div className="step-panel">
            <h4>📁 Bước 2: Nhập <code>Profile</code> vào <code>src/components/Gallery.jsx</code></h4>
            <p>Dùng lệnh <code>import Profile from './Profile'</code> tại đầu file <code>Gallery.jsx</code>:</p>
            <pre className="code-snippet">
{`// src/components/Gallery.jsx
import Profile from './Profile'; // ✅ Nạp component từ file cùng thư mục

export default function Gallery() {
  return (
    <section>
      <h2>Những Nhà Khoa Học Đáng Chú Ý</h2>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}`}
            </pre>
            <div className="tip-box">
              💡 <strong>Quy tắc đường dẫn tương đối:</strong> <code>./</code> biểu thị cùng thư mục hiện tại. Nếu ở thư mục cha ta dùng <code>../</code>.
            </div>
          </div>
        )}

        {activeStep === 3 && (
          <div className="step-panel">
            <h4>🎉 Bước 3: Xem Component Hoạt Động Trực Tiếp</h4>
            <p>Dưới đây là component <code>Profile</code> độc lập đang được render tái sử dụng nhiều lần:</p>
            <div className="live-demo-box">
              <div className="gallery-avatars-row">
                <Profile 
                  name="Alan L. Hart"
                  imageUrl="https://i.imgur.com/QIrZWGIs.jpg"
                  profession="Bác sĩ X-quang"
                  awards="Tiên phong tầm soát lao"
                  discovery="X-quang ngực lưu động"
                />
                <Profile 
                  name="Maria Skłodowska-Curie"
                  imageUrl="https://i.imgur.com/szV5sdGs.jpg"
                  profession="Nhà vật lý & Hóa học"
                  awards="2 giải Nobel"
                  discovery="Poloni và Radi"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
