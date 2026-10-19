import { useState, createContext, useContext } from 'react';
import InfoBox from '../common/InfoBox';

// 1. Tạo Context cho chế độ Teleportation
const UserContext = createContext(null);

export default function PropDrillingVisualizer() {
  const [mode, setMode] = useState('context'); // 'drilling' | 'context'
  const [vipLevel, setVipLevel] = useState('Diamond');
  const [discount, setDiscount] = useState(25);
  const [currency, setCurrency] = useState('USD');
  const [cartTotal, setCartTotal] = useState(120);

  const userData = {
    name: 'Nguyễn Văn Dev',
    vipLevel,
    discount,
    currency,
  };

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">
          <span>🕳️</span> Bài Lab 1: Vấn Nạn Prop Drilling vs Cổng Dịch Chuyển Context
        </h2>
        <p className="lab-card-desc">
          So sánh trực quan giữa việc "đào giếng" truyền props qua 4 cấp component trung gian và cơ chế Teleportation của React Context API.
        </p>
      </div>

      {/* Mode Selector */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button
          className={`btn ${mode === 'drilling' ? 'btn-danger' : 'btn-secondary'}`}
          onClick={() => setMode('drilling')}
        >
          ⛏️ Chế độ 1: Prop Drilling (Khổ sở chuyển tiếp qua 4 tầng)
        </button>
        <button
          className={`btn ${mode === 'context' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setMode('context')}
        >
          🌌 Chế độ 2: Context Teleportation (Nhàn nhã xuyên không gian)
        </button>
      </div>

      {/* Control Panel */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.6)',
        border: '1px solid var(--border-color)',
        borderRadius: '10px',
        padding: '1.25rem',
        marginBottom: '1.5rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1rem',
      }}>
        <div>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
            Hạng VIP Thành Viên:
          </label>
          <select
            className="input-control"
            value={vipLevel}
            onChange={(e) => setVipLevel(e.target.value)}
          >
            <option value="Standard">Standard (0% off)</option>
            <option value="Gold">Gold Tier (15% off)</option>
            <option value="Diamond">Diamond Tier (25% off)</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
            Mức giảm giá (%):
          </label>
          <input
            type="number"
            className="input-control"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            min="0"
            max="90"
          />
        </div>

        <div>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
            Đơn vị tiền tệ:
          </label>
          <select
            className="input-control"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">USD ($)</option>
            <option value="VND">VND (₫)</option>
            <option value="EUR">EUR (€)</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
            Giá trị giỏ hàng:
          </label>
          <input
            type="number"
            className="input-control"
            value={cartTotal}
            onChange={(e) => setCartTotal(Number(e.target.value))}
            min="10"
            step="10"
          />
        </div>
      </div>

      {mode === 'drilling' ? (
        <InfoBox type="danger" title="Vấn đề của Prop Drilling:">
          Component <code>NavigationHeader</code> và <code>UserAccountWidget</code> hoàn toàn không dùng đến{' '}
          <code>user, discount, currency</code> nhưng vẫn buộc phải khai báo nhận props rồi truyền tiếp xuống dưới.
          Khi dự án scale lên hàng chục tầng, việc đổi tên 1 prop sẽ làm gãy chuỗi truyền ở tất cả các file trung gian!
        </InfoBox>
      ) : (
        <InfoBox type="tip" title="Giải pháp Context API:">
          Component gốc cung cấp dữ liệu qua <code>&lt;UserContext.Provider value={'{userData}'}&gt;</code>.
          Các component trung gian hoàn toàn sạch sẽ, không nhận bất kỳ prop thừa nào.
          Component con ở đáy cây gọi <code>useContext(UserContext)</code> để teleport trực tiếp dữ liệu tới!
        </InfoBox>
      )}

      {/* Visual Component Tree */}
      <div style={{ marginTop: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--accent-cyan)' }}>
          🔍 Cây Component Mô Phỏng Tương Tác
        </h3>

        {mode === 'drilling' ? (
          <DrillingRoot
            userData={userData}
            cartTotal={cartTotal}
          />
        ) : (
          <UserContext.Provider value={{ ...userData, cartTotal }}>
            <ContextRoot />
          </UserContext.Provider>
        )}
      </div>

      {/* Code diff insight */}
      <div style={{
        marginTop: '2rem',
        background: '#090d16',
        borderRadius: '10px',
        border: '1px solid #1e293b',
        padding: '1.25rem',
      }}>
        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#94a3b8', marginBottom: '0.75rem' }}>
          📝 So Sánh Cú Pháp Trong Code Thực Tế:
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
          <div style={{ background: '#1c1117', padding: '1rem', borderRadius: '8px', border: '1px solid #e11d48' }}>
            <span className="badge badge-rose" style={{ marginBottom: '0.5rem' }}>❌ Prop Drilling</span>
            <pre style={{ margin: 0, fontSize: '0.8rem', color: '#fda4af', overflowX: 'auto', fontFamily: 'var(--font-mono)' }}>
{`// Phải truyền xuyên 4 tầng
<RootApp user={user} discount={discount}>
  <NavHeader user={user} discount={discount}>
    <AccountBar user={user} discount={discount}>
      <Checkout user={user} discount={discount} />
    </AccountBar>
  </NavHeader>
</RootApp>`}
            </pre>
          </div>

          <div style={{ background: '#0b1b2b', padding: '1rem', borderRadius: '8px', border: '1px solid #0284c7' }}>
            <span className="badge badge-cyan" style={{ marginBottom: '0.5rem' }}>✅ Context API</span>
            <pre style={{ margin: 0, fontSize: '0.8rem', color: '#7dd3fc', overflowX: 'auto', fontFamily: 'var(--font-mono)' }}>
{`// Root cấp nguồn
<UserContext.Provider value={{ user, discount }}>
  <NavHeader>
    <AccountBar>
      <Checkout /> {/* Đọc trực tiếp useContext(UserContext) */}
    </AccountBar>
  </NavHeader>
</UserContext.Provider>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// DRILLING PIPELINE COMPONENTS
// ----------------------------------------------------
function DrillingRoot({ userData, cartTotal }) {
  return (
    <div className="tree-node-card active-drilling">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <strong>🏛️ Tầng 1: Root App (Giữ State)</strong>
        <span className="badge badge-rose">Passes: user, discount, currency</span>
      </div>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        Nắm giữ trạng thái người dùng và mức chiết khấu hiện tại.
      </p>

      {/* Drilling down to Tier 2 */}
      <DrillingNavHeader userData={userData} cartTotal={cartTotal} />
    </div>
  );
}

function DrillingNavHeader({ userData, cartTotal }) {
  return (
    <div style={{
      background: 'rgba(244, 63, 94, 0.06)',
      border: '1px dashed #f43f5e',
      borderRadius: '8px',
      padding: '1rem',
      marginTop: '1rem',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong>🏢 Tầng 2: NavigationHeader (Trung gian 1)</strong>
        <span className="badge badge-amber">⚠️ Prop Passer - Không dùng</span>
      </div>
      <p style={{ fontSize: '0.82rem', color: '#fda4af', margin: '0.3rem 0 0.8rem' }}>
        "Tôi là thanh Menu điều hướng, tôi không cần biết tiền tệ hay giảm giá nhưng vẫn phải gánh props để chuyển xuống!"
      </p>

      {/* Drilling down to Tier 3 */}
      <DrillingAccountBar userData={userData} cartTotal={cartTotal} />
    </div>
  );
}

function DrillingAccountBar({ userData, cartTotal }) {
  return (
    <div style={{
      background: 'rgba(244, 63, 94, 0.1)',
      border: '1px dashed #fb7185',
      borderRadius: '8px',
      padding: '1rem',
      marginTop: '0.8rem',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong>🚪 Tầng 3: UserAccountBar (Trung gian 2)</strong>
        <span className="badge badge-amber">⚠️ Prop Passer - Không dùng</span>
      </div>
      <p style={{ fontSize: '0.82rem', color: '#fda4af', margin: '0.3rem 0 0.8rem' }}>
        "Tôi chỉ chứa khung Avatar, tôi cũng không tính toán tiền tệ hay hóa đơn nhưng vẫn phải truyền tiếp!"
      </p>

      {/* Drilling down to Tier 4: The Consumer */}
      <DrillingLeafCheckout userData={userData} cartTotal={cartTotal} />
    </div>
  );
}

function DrillingLeafCheckout({ userData, cartTotal }) {
  const finalPrice = cartTotal * (1 - userData.discount / 100);

  return (
    <div style={{
      background: 'rgba(15, 23, 42, 0.9)',
      border: '2px solid #ef4444',
      borderRadius: '8px',
      padding: '1rem',
      marginTop: '0.8rem',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <strong>🎯 Tầng 4: Leaf Consumer (Đích đến cuối)</strong>
        <span className="badge badge-emerald">Cuối cùng cũng nhận được props</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', fontSize: '0.85rem' }}>
        <div>Hội viên: <strong style={{ color: '#f43f5e' }}>{userData.name}</strong></div>
        <div>Cấp bậc: <strong style={{ color: '#fbbf24' }}>{userData.vipLevel}</strong></div>
        <div>Chiết khấu: <strong style={{ color: '#34d399' }}>{userData.discount}%</strong></div>
        <div>
          Tổng thanh toán:{' '}
          <strong style={{ color: '#38bdf8' }}>
            {finalPrice.toFixed(0)} {userData.currency} (gốc: {cartTotal} {userData.currency})
          </strong>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// CONTEXT TELEPORTATION COMPONENTS
// ----------------------------------------------------
function ContextRoot() {
  return (
    <div className="tree-node-card clean-context">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <strong>🏛️ Tầng 1: Root App (Context Provider)</strong>
        <span className="badge badge-cyan">Cổng Teleport Mở: &lt;UserContext.Provider&gt;</span>
      </div>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        Cung cấp dữ liệu toàn cục. Không truyền bất kỳ prop nào qua các tầng con!
      </p>

      <ContextNavHeader />
    </div>
  );
}

function ContextNavHeader() {
  return (
    <div style={{
      background: 'rgba(6, 182, 212, 0.05)',
      border: '1px solid rgba(6, 182, 212, 0.25)',
      borderRadius: '8px',
      padding: '1rem',
      marginTop: '1rem',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong>🏢 Tầng 2: NavigationHeader (Trung gian 1)</strong>
        <span className="badge badge-emerald">✨ Hoàn Toàn Tinh Khiết (0 Props)</span>
      </div>
      <p style={{ fontSize: '0.82rem', color: '#a5f3fc', margin: '0.3rem 0 0.8rem' }}>
        "Tôi không nhận bất kỳ prop thừa nào! Cú pháp chỉ là <code>&lt;ContextNavHeader /&gt;</code>."
      </p>

      <ContextAccountBar />
    </div>
  );
}

function ContextAccountBar() {
  return (
    <div style={{
      background: 'rgba(6, 182, 212, 0.08)',
      border: '1px solid rgba(6, 182, 212, 0.35)',
      borderRadius: '8px',
      padding: '1rem',
      marginTop: '0.8rem',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong>🚪 Tầng 3: UserAccountBar (Trung gian 2)</strong>
        <span className="badge badge-emerald">✨ Hoàn Toàn Tinh Khiết (0 Props)</span>
      </div>
      <p style={{ fontSize: '0.82rem', color: '#a5f3fc', margin: '0.3rem 0 0.8rem' }}>
        "Không bị rác code. Bất cứ khi nào cấu trúc cây thay đổi, component của tôi không bị ảnh hưởng."
      </p>

      <ContextLeafCheckout />
    </div>
  );
}

function ContextLeafCheckout() {
  // Teleport dữ liệu trực tiếp từ Root!
  const contextData = useContext(UserContext);
  const finalPrice = contextData.cartTotal * (1 - contextData.discount / 100);

  return (
    <div style={{
      background: 'rgba(15, 23, 42, 0.95)',
      border: '2px solid #06b6d4',
      borderRadius: '8px',
      padding: '1rem',
      marginTop: '0.8rem',
      boxShadow: '0 0 20px rgba(6, 182, 212, 0.25)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <strong>🎯 Tầng 4: Leaf Consumer (Teleport Đích)</strong>
        <span className="badge badge-cyan">🌌 useContext(UserContext) Thành Công!</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', fontSize: '0.85rem' }}>
        <div>Hội viên: <strong style={{ color: '#38bdf8' }}>{contextData.name}</strong></div>
        <div>Cấp bậc: <strong style={{ color: '#fbbf24' }}>{contextData.vipLevel}</strong></div>
        <div>Chiết khấu: <strong style={{ color: '#34d399' }}>{contextData.discount}%</strong></div>
        <div>
          Tổng thanh toán:{' '}
          <strong style={{ color: '#a855f7' }}>
            {finalPrice.toFixed(0)} {contextData.currency} (gốc: {contextData.cartTotal} {contextData.currency})
          </strong>
        </div>
      </div>
    </div>
  );
}
