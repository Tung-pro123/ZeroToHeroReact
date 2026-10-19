// ==========================================================================
// CHUYÊN ĐỀ SÂU: "BẪY SỐ 0" KHI DÙNG TOÁN TỬ && (PITFALL OF 0 IN JSX)
// ==========================================================================
import React, { useState } from 'react';
import Card from '../common/Card';

export default function PitfallZeroInspector() {
  // Trạng thái số lượng thông báo / tin nhắn chưa đọc
  const [unreadCount, setUnreadCount] = useState(0);

  return (
    <Card
      title="Cảnh báo chí mạng: Bẫy số 0 trong toán tử &&"
      subtitle="Lỗi phổ biến nhất mà lập trình viên Spring Boot chuyển sang React gặp phải khi render số lượng"
      icon="⚠️"
      className="card-pitfall"
    >
      <div className="lab-container">
        {/* Bộ điều khiển số lượng tương tác trực tiếp */}
        <div className="counter-controls">
          <button
            className="btn-counter"
            onClick={() => setUnreadCount((c) => Math.max(0, c - 1))}
            title="Giảm 1"
          >
            -
          </button>

          <div className="counter-display">
            <span className="counter-val">{unreadCount}</span>
            <span className="counter-label">Số tin nhắn chưa đọc</span>
          </div>

          <button
            className="btn-counter"
            onClick={() => setUnreadCount((c) => c + 1)}
            title="Tăng 1"
          >
            +
          </button>

          <button
            className="btn-reset"
            onClick={() => setUnreadCount(0)}
            title="Đặt về 0 để thấy rõ bug"
          >
            🔄 Đặt về 0 (Xem Bug)
          </button>

          <button
            className="btn-reset"
            onClick={() => setUnreadCount(3)}
            title="Đặt về 3 để thấy trạng thái có dữ liệu"
          >
            🔔 Đặt về 3
          </button>
        </div>

        {/* Lưới so sánh 4 cách viết */}
        <div className="pitfall-grid">
          {/* 1. CÁCH VIẾT SAI */}
          <div className="pitfall-card buggy">
            <div className="pitfall-title">
              <span style={{ color: 'var(--color-danger)' }}>❌ Cách viết sai phổ biến</span>
              <span className="badge badge-danger">BUG GIAO DIỆN</span>
            </div>
            <code style={{ fontSize: '0.85rem' }}>
              {`{unreadCount && (`}
              <br />
              {`  <span>📩 Có tin mới</span>`}
              <br />
              {`)}`}
            </code>

            {/* Khung kết quả render thực tế */}
            <div className="render-result-box">
              {/* Đây là đoạn code bị bug thực tế: Khi unreadCount = 0, JS trả về 0 và React in ra '0' */}
              {unreadCount && (
                <span className="success-render">📩 Có {unreadCount} tin mới</span>
              )}
              {/* Cảnh báo hiển thị thêm nếu unreadCount === 0 để người học hiểu ngay */}
              {unreadCount === 0 && (
                <div className="bug-alert">
                  <span>🚨 KẾT QUẢ RENDER:</span>
                  <strong style={{ fontSize: '1.2rem', textDecoration: 'underline' }}>
                    {unreadCount && 'Chưa thấy'}
                    {/* Minh chứng trực quan cho kết quả JS */}
                    {(unreadCount && true) === 0 ? '0' : ''}
                  </strong>
                  <span style={{ fontSize: '0.75rem' }}>(Số 0 bị in thừa lên màn hình!)</span>
                </div>
              )}
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              ⚡ <strong>Nguyên nhân:</strong> Trong JS, <code>0 && ...</code> trả về đúng giá trị <code>0</code>. React coi 0 là kiểu số hợp lệ nên in thẳng ra HTML!
            </p>
          </div>

          {/* 2. CÁCH SỬA CHUẨN 1: SO SÁNH SỐ HỌC */}
          <div className="pitfall-card fixed">
            <div className="pitfall-title">
              <span style={{ color: 'var(--color-success)' }}>✅ Cách 1: So sánh rõ ràng (Khuyên dùng)</span>
              <span className="badge badge-success">RECOMMENDED</span>
            </div>
            <code style={{ fontSize: '0.85rem' }}>
              {`{unreadCount > 0 && (`}
              <br />
              {`  <span>📩 Có tin mới</span>`}
              <br />
              {`)}`}
            </code>

            <div className="render-result-box">
              {unreadCount > 0 && (
                <span className="success-render">📩 Có {unreadCount} tin mới</span>
              )}
              {unreadCount === 0 && (
                <span className="empty-placeholder">(Không render gì - Giao diện sạch sẽ)</span>
              )}
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              ✨ <strong>Cơ chế:</strong> <code>unreadCount &gt; 0</code> luôn trả về kiểu Boolean (<code>false</code>). React tự động bỏ qua giá trị boolean.
            </p>
          </div>

          {/* 3. CÁCH SỬA CHUẨN 2: ÉP KIỂU BẰNG !! */}
          <div className="pitfall-card fixed">
            <div className="pitfall-title">
              <span style={{ color: 'var(--color-success)' }}>✅ Cách 2: Toán tử hai lần phủ định (!!)</span>
              <span className="badge badge-info">CLEAN JS</span>
            </div>
            <code style={{ fontSize: '0.85rem' }}>
              {`{!!unreadCount && (`}
              <br />
              {`  <span>📩 Có tin mới</span>`}
              <br />
              {`)}`}
            </code>

            <div className="render-result-box">
              {!!unreadCount && (
                <span className="success-render">📩 Có {unreadCount} tin mới</span>
              )}
              {unreadCount === 0 && (
                <span className="empty-placeholder">(Không render gì - Giao diện sạch sẽ)</span>
              )}
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              ✨ <strong>Cơ chế:</strong> <code>!!0</code> ép kiểu số 0 thành giá trị boolean <code>false</code>. Không còn số 0 nào lọt vào JSX.
            </p>
          </div>

          {/* 4. CÁCH SỬA CHUẨN 3: TOÁN TỬ 3 NGÔI HOẶC NULL */}
          <div className="pitfall-card fixed">
            <div className="pitfall-title">
              <span style={{ color: 'var(--color-success)' }}>✅ Cách 3: Toán tử 3 ngôi tường minh</span>
              <span className="badge badge-info">EXPLICIT</span>
            </div>
            <code style={{ fontSize: '0.85rem' }}>
              {`{unreadCount > 0 ? (`}
              <br />
              {`  <span>📩 Có tin</span>`}
              <br />
              {`) : null}`}
            </code>

            <div className="render-result-box">
              {unreadCount > 0 ? (
                <span className="success-render">📩 Có {unreadCount} tin mới</span>
              ) : null}
              {unreadCount === 0 && (
                <span className="empty-placeholder">(Trả về null - DOM hoàn toàn trống)</span>
              )}
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              ✨ <strong>Cơ chế:</strong> Tường minh chỉ định nhánh else là <code>null</code>, loại bỏ mọi sự mơ hồ của short-circuit evaluation.
            </p>
          </div>
        </div>

        {/* So sánh cốt lõi giữa Java và JavaScript */}
        <div className="callout-box">
          <div className="callout-title">
            <span>🧠 GÓC NHÌN JAVA / SPRING BOOT DEVELOPER:</span>
          </div>
          <div className="callout-desc">
            - <strong>Trong Java:</strong> Biểu thức <code>if (count && doSomething())</code> sẽ <strong>báo lỗi biên dịch ngay lập tức (Compile Error)</strong> vì toán tử <code>&&</code> trong Java chỉ chấp nhận hai toán hạng kiểu <code>boolean</code>.<br />
            - <strong>Trong JavaScript:</strong> Toán tử <code>&&</code> không ép về boolean mà thực hiện <em>Short-circuit Evaluation</em> và <strong>trả về giá trị của toán hạng cuối cùng được đánh giá</strong>:
            <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
              <li><code>true && "Hello"</code> ➡️ Trả về <code>"Hello"</code></li>
              <li><code>false && "Hello"</code> ➡️ Trả về <code>false</code> (React không render boolean)</li>
              <li><code>0 && "Hello"</code> ➡️ Dừng lại ở số 0 và <strong>trả về số 0</strong>! (React coi số 0 là một number cần in ra)</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}
