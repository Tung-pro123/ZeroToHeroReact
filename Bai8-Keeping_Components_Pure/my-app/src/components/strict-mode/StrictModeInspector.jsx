// ========================================================================================
// FILE: src/components/strict-mode/StrictModeInspector.jsx
// ========================================================================================
// KIẾN THỨC BÀI 8 (MỤC 3): CƠ CHẾ STRICT MODE (TẠI SAO REACT GỌI HÀM COMPONENT 2 LẦN?)
// ========================================================================================

import Card from '../common/Card';

export default function StrictModeInspector() {
  return (
    <div className="demo-section">
      <div className="section-intro">
        <span className="badge-pill warning">Mục 3: Khám Phá Cơ Chế React Engine</span>
        <h2 className="section-title">Giải Mã &lt;React.StrictMode&gt;: Tại Sao Gọi Hàm 2 Lần?</h2>
        <p className="section-desc">
          Khi chạy môi trường phát triển (Development), React cố tình kích hoạt hàm Component 2 lần liên tiếp 
          để vạch trần các component không tinh khiết.
        </p>
      </div>

      <div className="strict-mode-flow-grid">
        <Card title="1. Nếu Component TINH KHIẾT (Pure)" variant="success">
          <div className="flow-step-box">
            <div className="flow-badge success">Toán Học: y = f(x)</div>
            <div className="formula-line">
              Lần gọi 1: <code>Cup(guest=1) &rarr; "Khách #1"</code>
            </div>
            <div className="formula-arrow">&darr; Hủy kết quả 1, gọi lại lần 2 để kiểm tra &darr;</div>
            <div className="formula-line">
              Lần gọi 2: <code>Cup(guest=1) &rarr; "Khách #1"</code>
            </div>
            <p className="flow-summary success">
              🎯 <strong>Hoàn hảo:</strong> Cả 2 lần đều cho ra kết quả giống hệt nhau! 
              React biết chắc chắn component này an toàn để vẽ lên màn hình.
            </p>
          </div>
        </Card>

        <Card title="2. Nếu Component BỊ Ô NHIỄM (Impure)" variant="danger">
          <div className="flow-step-box">
            <div className="flow-badge danger">Có Tác Dụng Phụ: guest = guest + 1</div>
            <div className="formula-line bad">
              Lần gọi 1: <code>guest biến thành 1 &rarr; "Khách #1"</code>
            </div>
            <div className="formula-arrow">&darr; Hủy kết quả 1, gọi lại lần 2 &darr;</div>
            <div className="formula-line bad">
              Lần gọi 2: <code>guest biến thành 2 &rarr; "Khách #2"</code>
            </div>
            <p className="flow-summary danger">
              💥 <strong>Bị bắt quả tang:</strong> Kết quả lần 1 (#1) khác kết quả lần 2 (#2)!
              Người dùng sẽ thấy số nhảy cóc (#2, #4, #6), giúp lập trình viên phát hiện lỗi ngay trong dev.
            </p>
          </div>
        </Card>
      </div>

      <div className="strict-mode-faq-card">
        <h4>💡 Hai câu hỏi phỏng vấn hay gặp nhất về Strict Mode:</h4>
        <div className="faq-item">
          <strong>1. Strict Mode có làm web chạy chậm khi đưa lên Production không?</strong>
          <p>
            &bull; <strong>KHÔNG!</strong> Cơ chế gọi hàm 2 lần chỉ kích hoạt trong môi trường phát triển cục bộ (Local Development).
            Khi bạn đóng gói bằng <code>npm run build</code> cho môi trường Production, cơ chế này tự động tắt 100%, 
            mỗi component chỉ chạy đúng 1 lần duy nhất nên không ảnh hưởng hiệu năng.
          </p>
        </div>
        <div className="faq-item">
          <strong>2. Làm sao để tắt chế độ gọi 2 lần nếu muốn thử nghiệm?</strong>
          <p>
            &bull; Chỉ cần vào file <code>src/main.jsx</code>, tạm thời gỡ bỏ thẻ <code>&lt;React.StrictMode&gt;</code> bao quanh <code>&lt;App /&gt;</code>.
            Tuy nhiên, <strong>khuyến cáo doanh nghiệp là luôn giữ StrictMode</strong> để bảo vệ độ ổn định của ứng dụng.
          </p>
        </div>
      </div>
    </div>
  );
}
