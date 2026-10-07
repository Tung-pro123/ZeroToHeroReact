// ========================================================================================
// FILE: src/components/purity-basics/TeaGatheringDemo.jsx
// ========================================================================================
// KIẾN THỨC BÀI 8 (MỤC 1, 2, 4):
// 1. Bản chất hàm tinh khiết (Pure Function):
//    - Minds its own business: Không sửa biến bên ngoài tồn tại trước khi hàm chạy.
//    - Same inputs, same output: Truyền cùng props thì kết quả JSX luôn giống nhau 100%.
// 2. Ô nhiễm (Impurity): Component sửa biến toàn cục bên ngoài.
// 3. Đột biến cục bộ (Local Mutation): Biến sinh ra và biến đổi bên trong chính lần render đó
//    thì hoàn toàn hợp lệ!
// ========================================================================================

import { useState } from 'react';
import Card from '../common/Card';

// BIẾN TOÀN CỤC BÊN NGOÀI (Nguồn gốc gây ô nhiễm)
let globalGuestCounter = 0;

/**
 * ❌ COMPONENT KHÔNG TINH KHIẾT (IMPURE):
 * Tự ý thay đổi biến toàn cục `globalGuestCounter` mỗi khi hàm chạy.
 */
function ImpureCup() {
  globalGuestCounter = globalGuestCounter + 1; // ❌ SIDE EFFECT: Đột biến biến ngoài hàm!
  return (
    <div className="cup-badge impure">
      🍵 Tách trà cho vị khách #{globalGuestCounter}
    </div>
  );
}

/**
 * ✅ COMPONENT TINH KHIẾT (PURE):
 * Chỉ đọc dữ liệu từ `guest` prop được truyền vào. Không đụng chạm gì bên ngoài!
 */
function PureCup({ guest }) {
  return (
    <div className="cup-badge pure">
      🍵 Tách trà cho vị khách #{guest}
    </div>
  );
}

export default function TeaGatheringDemo() {
  // State dùng để kích hoạt Component vẽ lại (Re-render)
  const [renderCount, setRenderCount] = useState(1);

  // Reset lại bộ đếm khi muốn chạy lại từ đầu
  const handleReset = () => {
    globalGuestCounter = 0;
    setRenderCount(1);
  };

  /**
   * ✅ MINH HỌA MỤC 4: ĐỘT BIẾN CỤC BỘ (LOCAL MUTATION)
   * Biến mảng `pureCups` được khởi tạo NGAY TRONG LẦN RENDER NÀY.
   * Ta dùng cups.push() thoải mái vì mảng này chỉ tồn tại cục bộ bên trong hàm!
   */
  const localCups = [];
  for (let i = 1; i <= 3; i++) {
    localCups.push(<PureCup key={i} guest={i} />);
  }

  return (
    <div className="demo-section">
      <div className="section-intro">
        <span className="badge-pill">Mục 1 & 2 & 4: Bản Chất Tính Tinh Khiết</span>
        <h2 className="section-title">Tiệc Trà: Tinh Khiết (Pure) vs Ô Nhiễm (Impure)</h2>
        <p className="section-desc">
          Bấm nút <strong>"Kích hoạt Re-render"</strong> để chứng kiến biến toàn cục của component lỗi bị nhảy số liên tục,
          trong khi component tinh khiết luôn giữ vững tính ổn định tuyệt đối.
        </p>
      </div>

      <div className="re-render-action-bar">
        <button 
          className="action-btn primary"
          onClick={() => setRenderCount(prev => prev + 1)}
        >
          🔄 Kích Hoạt Re-render (Lượt chạy #{renderCount})
        </button>
        <button 
          className="action-btn secondary"
          onClick={handleReset}
        >
          ⏮️ Reset Bộ Đếm Toàn Cục
        </button>
      </div>

      <div className="cups-comparison-grid">
        {/* CỘT 1: Component không tinh khiết */}
        <Card 
          title="❌ Component Không Tinh Khiết (Impure)" 
          subtitle="Sửa biến toàn cục bên ngoài: globalGuestCounter = globalGuestCounter + 1"
          variant="danger"
        >
          <div className="cups-list-wrapper">
            <p className="status-note danger">
              ⚠️ Mỗi lần Re-render, số thứ tự khách lại bị tăng vọt ngẫu nhiên:
            </p>
            <div className="cups-container">
              {/* Gọi 3 lần ImpureCup */}
              <ImpureCup />
              <ImpureCup />
              <ImpureCup />
            </div>
            <div className="code-explain-mini">
              <code>{`let guest = 0;
function Cup() {
  guest = guest + 1; // ❌ SỬA BIẾN NGOÀI HÀM
  return <h2>Tách trà #{guest}</h2>;
}`}</code>
            </div>
          </div>
        </Card>

        {/* CỘT 2: Component tinh khiết */}
        <Card 
          title="✅ Component Tinh Khiết (Pure)" 
          subtitle="Nhận guest qua Prop & dùng Đột biến cục bộ (Local Mutation)"
          variant="success"
        >
          <div className="cups-list-wrapper">
            <p className="status-note success">
              🛡️ Dù Re-render bao nhiêu lần, khách #1, #2, #3 luôn cố định:
            </p>
            <div className="cups-container">
              {/* Render danh sách từ Local Mutation */}
              {localCups}
            </div>
            <div className="code-explain-mini">
              <code>{`function Cup({ guest }) {
  // ✅ PURE: Cùng prop guest -> Luôn cùng JSX
  return <h2>Tách trà #{guest}</h2>;
}`}</code>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
