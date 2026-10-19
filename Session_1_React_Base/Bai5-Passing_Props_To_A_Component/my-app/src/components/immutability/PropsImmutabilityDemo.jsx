// ========================================================================================
// FILE: src/components/immutability/PropsImmutabilityDemo.jsx
// ========================================================================================
// KIẾN THỨC BÀI 5 (MỤC 6): TÍNH BẤT BIẾN CỦA PROPS (PROPS ARE IMMUTABLE)
// ========================================================================================

import Card from '../common/Card';

export default function PropsImmutabilityDemo() {
  return (
    <div className="demo-section">
      <div className="section-intro">
        <span className="badge-pill accent">Mục 6: Bản Chất Kiến Trúc</span>
        <h2 className="section-title">Tính Bất Biến Của Props (Read-Only & Snapshots)</h2>
        <p className="section-desc">
          Hiểu sâu lý do vì sao React cấm tuyệt đối việc gán đè Props bên trong Component con.
        </p>
      </div>

      <div className="immutability-cards-grid">
        <Card title="1. Props Là Gì Theo Dòng Thời Gian?" variant="cyan">
          <div className="concept-box">
            <div className="concept-icon">📸</div>
            <h4>Một Bức Ảnh Chụp Nhanh (Snapshot)</h4>
            <p>
              Mỗi lần Component hiển thị, Props phản ánh trạng thái dữ liệu tại đúng thời điểm đó.
              Nó đại diện cho dữ liệu đầu vào cố định của lượt chạy (Render) đó.
            </p>
          </div>
        </Card>

        <Card title="2. Quy Tắc Vàng: CẤM SỬA PROPS" variant="rose">
          <div className="concept-box">
            <div className="concept-icon">🚫</div>
            <h4>Tuyệt Đối Không Gán Đè</h4>
            <p>
              ❌ <code>props.size = 200;</code>
              <br />
              ❌ <code>person.name = 'Tên mới';</code>
              <br />
              Nếu cố tình sửa, React sẽ không nhận biết được thay đổi để vẽ lại, gây ra lỗi đồng bộ dữ liệu ngầm cực kỳ nguy hiểm.
            </p>
          </div>
        </Card>

        <Card title="3. Muốn Thay Đổi Dữ Liệu Thì Làm Sao?" variant="indigo">
          <div className="concept-box">
            <div className="concept-icon">🔄</div>
            <h4>Thông Qua STATE (Trạng Thái)</h4>
            <p>
              Component con không được tự sửa dữ liệu. Nó phải thông báo cho Component cha
              cập nhật <strong>State</strong> để Cha sinh ra một bộ Props <strong>hoàn toàn mới</strong> đưa xuống.
            </p>
          </div>
        </Card>
      </div>

      {/* So sánh với Java Record / final trong Spring Boot */}
      <div className="spring-record-box">
        <div className="spring-record-badge">🌱 Cầu Nối Java / Spring Boot</div>
        <h3>Props Trong React = Java 17 Record hoặc `final` Fields trong Java DTO</h3>
        <div className="code-comparison-horizontal">
          <div className="code-col">
            <h5>Java 17 (Bất biến hoàn toàn):</h5>
            <pre><code>{`// Không có setter! Một khi đã tạo là không thể sửa:
public record UserDTO(
    String name, 
    int size
) {}`}</code></pre>
          </div>
          <div className="code-col">
            <h5>React Props (Chỉ đọc):</h5>
            <pre><code>{`// Read-only! Không được gán lại:
function Profile({ name, size }) {
  // props.size = 50; ❌ LỖI KIẾN TRÚC!
  return <div>{name}</div>;
}`}</code></pre>
          </div>
        </div>
      </div>
    </div>
  );
}
