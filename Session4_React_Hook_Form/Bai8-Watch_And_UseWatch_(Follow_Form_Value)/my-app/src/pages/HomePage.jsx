import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="homepage-container">
      {/* Hero Section */}
      <div
        className="card"
        style={{
          background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
        }}
      >
        <h2
          style={{
            fontSize: "1.8rem",
            marginBottom: "0.75rem",
            color: "#38bdf8",
          }}
        >
          👁️ Làm Chủ Cơ Chế Theo Dõi Giá Trị Form: getValues vs watch vs
          useWatch
        </h2>
        <p style={{ color: "#94a3b8", fontSize: "1.05rem", lineHeight: "1.7" }}>
          Trong React Hook Form, bài toán theo dõi dữ liệu người dùng nhập là
          chìa khóa để xây dựng giao diện động (Dynamic Forms), tính toán
          realtime và tối ưu hóa hiệu năng render. Khóa học này giải phẫu 3 cơ
          chế cốt lõi và vạch trần cạm bẫy lẫn lộn kinh điển giữa{" "}
          <code>watch()</code> và <code>dirtyFields</code>.
        </p>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          <Link to="/lab1-watch-conditional" className="btn btn-primary">
            <span>🚀 Khám Phá Lab 1 (watch & Conditional UI)</span>
          </Link>
          <Link to="/lab2-usewatch-isolation" className="btn btn-secondary">
            <span>⚡ Thử Nghiệm Lab 2 (useWatch Render Isolation)</span>
          </Link>
          <Link to="/lab3-watch-vs-dirty" className="btn btn-outline">
            <span>⚖️ So Sánh Lab 3 (watch vs dirtyFields)</span>
          </Link>
        </div>
      </div>

      {/* The Bitcoin Real-World Analogy */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            💡 Phép Ẩn Dụ Thực Tế: Theo Dõi Giá Bitcoin Trong Văn Phòng
          </h3>
          <span className="badge badge-amber">Architect Mental Model</span>
        </div>

        <div className="grid-3" style={{ marginTop: "1rem" }}>
          <div
            style={{
              background: "#090d16",
              padding: "1.25rem",
              borderRadius: "10px",
              border: "1px solid #334155",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📸</div>
            <h4 style={{ color: "#38bdf8", marginBottom: "0.5rem" }}>
              1. getValues() — Ảnh Chụp (Snapshot)
            </h4>
            <p
              style={{
                color: "#94a3b8",
                fontSize: "0.88rem",
                lineHeight: "1.5",
              }}
            >
              Bạn chỉ mở app lên xem giá BTC đúng 1 lần tại thời điểm click nút
              "Đặt lệnh Mua".
            </p>
            <div
              style={{
                marginTop: "0.75rem",
                padding: "0.5rem",
                background: "rgba(56, 189, 248, 0.1)",
                borderRadius: "6px",
                fontSize: "0.8rem",
                color: "#38bdf8",
              }}
            >
              ⚡ <strong>Zero Re-render</strong>. Không tốn bất kỳ tài nguyên
              hiển thị nào!
            </div>
          </div>

          <div
            style={{
              background: "#090d16",
              padding: "1.25rem",
              borderRadius: "10px",
              border: "1px solid #334155",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📢</div>
            <h4 style={{ color: "#ec4899", marginBottom: "0.5rem" }}>
              2. watch() — Loa Phát Thanh Văn Phòng
            </h4>
            <p
              style={{
                color: "#94a3b8",
                fontSize: "0.88rem",
                lineHeight: "1.5",
              }}
            >
              Bật bảng điện tử LED giữa phòng khách. Cứ giá Bitcoin nhấp nháy
              thay đổi 1 USD là cả công ty ngẩng đầu lên nhìn.
            </p>
            <div
              style={{
                marginTop: "0.75rem",
                padding: "0.5rem",
                background: "rgba(236, 72, 153, 0.1)",
                borderRadius: "6px",
                fontSize: "0.8rem",
                color: "#f472b6",
              }}
            >
              ⚠️ <strong>Component Cha Re-render</strong> toàn bộ cây con tại
              mỗi phím gõ!
            </div>
          </div>

          <div
            style={{
              background: "#090d16",
              padding: "1.25rem",
              borderRadius: "10px",
              border: "1px solid #334155",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>⌚</div>
            <h4 style={{ color: "#10b981", marginBottom: "0.5rem" }}>
              3. useWatch() — Đồng Hồ Smartwatch Riêng
            </h4>
            <p
              style={{
                color: "#94a3b8",
                fontSize: "0.88rem",
                lineHeight: "1.5",
              }}
            >
              Nhân viên tài chính đeo smartwatch trên tay. Giá BTC đổi thì
              smartwatch rung nhẹ, toàn bộ phòng họp cha vẫn tập trung làm việc.
            </p>
            <div
              style={{
                marginTop: "0.75rem",
                padding: "0.5rem",
                background: "rgba(16, 185, 129, 0.1)",
                borderRadius: "6px",
                fontSize: "0.8rem",
                color: "#34d399",
              }}
            >
              🎯 <strong>Isolated Render</strong>. Chỉ component con re-render,
              component cha đứng yên!
            </div>
          </div>
        </div>
      </div>

      {/* Decision Matrix Table */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            📊 Ma Trận Quyết Định Kiến Trúc (Architecture Decision Matrix)
          </h3>
          <span className="badge badge-purple">Benchmark RHF v7</span>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table className="matrix-table">
            <thead>
              <tr>
                <th>Phương Pháp</th>
                <th>Cơ Chế Bản Chất</th>
                <th>Ảnh Hưởng Render</th>
                <th>Nguy Cơ Về Performance</th>
                <th>Trường Hợp Sử Dụng Chuẩn</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong style={{ color: "#38bdf8" }}>getValues()</strong>
                </td>
                <td>Hỏi trực tiếp RHF ref cache (Imperative Read)</td>
                <td>
                  <span className="badge badge-emerald">0 re-render</span>
                </td>
                <td>Không có. Hiệu năng tuyệt đối</td>
                <td>
                  Bấm nút Submit, check điều kiện khi click, validation
                  cross-field thụ động
                </td>
              </tr>
              <tr>
                <td>
                  <strong style={{ color: "#ec4899" }}>watch()</strong>
                </td>
                <td>Đăng ký Subscribe vào Component hiện tại</td>
                <td>
                  <span className="badge badge-amber">Re-render Component</span>
                </td>
                <td>
                  Lag UI nếu form có hàng chục input, rich text, table lớn
                </td>
                <td>
                  Form nhỏ, Conditional Rendering đơn giản, live preview cấp
                  form cha
                </td>
              </tr>
              <tr>
                <td>
                  <strong style={{ color: "#10b981" }}>useWatch()</strong>
                </td>
                <td>Custom Hook subscribe qua RHF Subject cách ly</td>
                <td>
                  <span className="badge badge-cyan">Chỉ Child Re-render</span>
                </td>
                <td>
                  Cần truyền prop <code>control</code> hoặc dùng{" "}
                  <code>FormProvider</code>
                </td>
                <td>
                  Form giỏ hàng phức tạp, thanh tính tổng tiền, stepper, preview
                  phân đoạn
                </td>
              </tr>
              <tr>
                <td>
                  <strong style={{ color: "#c084fc" }}>watch(callback)</strong>
                </td>
                <td>Observer pattern trả về subscription teardown</td>
                <td>
                  <span className="badge badge-emerald">0 re-render UI</span>
                </td>
                <td>
                  Phải nhớ <code>unsubscribe()</code> trong return của{" "}
                  <code>useEffect</code>
                </td>
                <td>
                  Auto-save ra localStorage/API, gửi event telemetry analytics
                  âm thầm
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Anti-Pattern Warning */}
      <div className="callout callout-danger">
        <span style={{ fontSize: "1.5rem" }}>🚫</span>
        <div>
          <h4 style={{ color: "#f87171", marginBottom: "0.3rem" }}>
            Anti-Pattern Nghiêm Trọng: Đừng bao giờ đồng bộ watch() vào useState
            qua useEffect!
          </h4>
          <p style={{ fontSize: "0.88rem" }}>
            Nhiều lập trình viên viết:{" "}
            <code>
              const val = watch('foo'); useEffect(() =&gt; {"{ setFoo(val) }"},
              [val])
            </code>
            . Điều này tạo ra một vòng lặp render kép (Cascade Re-renders), làm
            chậm UI gấp 2 lần và sinh ra các trạng thái bất đồng bộ khó debug.
            Thay vào đó, hãy{" "}
            <strong>tính toán trực tiếp (Derived State in Render)</strong> ngay
            trong hàm component!
          </p>
        </div>
      </div>
    </div>
  );
}
