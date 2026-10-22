// ========================================================================================
// FILE: src/components/spread-demo/SpreadPropsDemo.jsx
// ========================================================================================
// KIẾN THỨC BÀI 5 (MỤC 4 & VẤN ĐỀ 1): KỸ THUẬT SPREAD PROPS {...props}
// ========================================================================================

import { useState } from 'react';
import Avatar from '../props-basics/Avatar';
import Card from '../common/Card';

export default function SpreadPropsDemo() {
  const [useSpread, setUseSpread] = useState(true);

  // Giả sử có một gói dữ liệu đối tượng từ API hoặc Component cha trung gian:
  const profileProps = {
    person: { name: "Alan Turing", imageId: "bE7W1ji" },
    size: 110,
  };

  return (
    <div className="demo-section">
      <div className="section-intro">
        <span className="badge-pill warning">Mục 4 & Vấn Đề 1: Kỹ Thuật Chuyển Tiếp Props</span>
        <h2 className="section-title">Spread Props: <code>{`{...props}`}</code> vs Truyền Thẳng</h2>
        <p className="section-desc">
          Khám phá nguyên nhân vì sao truyền thẳng <code>props={`{props}`}</code> làm vỡ giao diện 
          và khi nào doanh nghiệp dùng toán tử Spread.
        </p>
      </div>

      {/* Điều khiển Toggle để thử nghiệm */}
      <div className="demo-toggle-bar">
        <button
          className={`toggle-btn ${useSpread ? 'active-success' : ''}`}
          onClick={() => setUseSpread(true)}
        >
          ✅ Dùng Toán Tử Spread: <code>{`<Avatar {...profileProps} />`}</code>
        </button>
        <button
          className={`toggle-btn ${!useSpread ? 'active-danger' : ''}`}
          onClick={() => setUseSpread(false)}
        >
          ❌ Truyền Thẳng: <code>{`<Avatar profileProps={profileProps} />`}</code>
        </button>
      </div>

      <div className="spread-comparison-grid">
        {/* Kết quả Render thực tế */}
        <Card 
          title="Kết Quả Hiển Thị Trên Trình Duyệt" 
          subtitle={useSpread ? "Giao diện hoạt động chuẩn xác" : "Dữ liệu bị lỗi undefined do lồng object sai"}
          variant={useSpread ? "cyan" : "rose"}
        >
          <div className="spread-result-container">
            {useSpread ? (
              <div className="success-preview">
                <Avatar {...profileProps} />
                <div className="preview-label">
                  <strong>Thành công:</strong> Avatar nhận được <code>person</code> và <code>size=110</code> trực tiếp!
                </div>
              </div>
            ) : (
              <div className="error-preview">
                {/* Ở đây ta truyền prop có tên là profileProps thay vì unpack */}
                <Avatar profileProps={profileProps} />
                <div className="error-label">
                  <strong>Trực quan hóa lỗi:</strong> Avatar tìm <code>person</code> ở tầng ngoài cùng không thấy!
                  <br />
                  Nó bị fallback về giá trị mặc định "Nhà Khoa Học Ẩn Danh".
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Giải thích chi tiết mã nguồn */}
        <div className="code-explain-card">
          <div className="explain-header">
            <h4>💡 Phân Tích Cốt Lõi: Bản Chất JavaScript</h4>
          </div>
          <div className="explain-body">
            <p>
              Khi bạn viết <code>{`<Avatar {...profileProps} />`}</code>, React trải phẳng (unpack) object thành:
            </p>
            <pre className="code-snippet"><code>{`<Avatar 
  person={profileProps.person} 
  size={profileProps.size} 
/>`}</code></pre>
            <p>
              Ngược lại, nếu viết <code>{`<Avatar profileProps={profileProps} />`}</code>, bạn đang gửi một object bị lồng 2 tầng:
            </p>
            <pre className="code-snippet bad"><code>{`// React tạo đối tượng props nhận vào là:
props = {
  profileProps: { person: {...}, size: 110 } // Bị lồng bên trong!
}
// Avatar tìm props.person -> undefined!`}</code></pre>
          </div>

          <div className="enterprise-tip-alert">
            <span className="tip-title">⚠️ Cảnh báo thực chiến doanh nghiệp:</span>
            Toán tử <code>{`{...props}`}</code> rất tiện lợi khi viết các component vỏ bọc (như Button, Input, Modal wrapper).
            Tuy nhiên, <strong>lạm dụng ở mọi nơi là biểu hiện của kiến trúc tồi</strong> vì nó làm lu mờ luồng dữ liệu,
            khiến các lập trình viên khác rất khó biết component đang nhận những thuộc tính gì!
          </div>
        </div>
      </div>
    </div>
  );
}
