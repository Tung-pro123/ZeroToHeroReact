import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function LocationInspectorPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sentPayload, setSentPayload] = useState('Dữ liệu chuyển giao bảo mật (Token/Metadata)');

  const handleTestStateNavigation = () => {
    navigate('/location-inspector?debug=true#demo-hash', {
      state: {
        message: sentPayload,
        timestamp: new Date().toLocaleTimeString(),
        sender: 'LocationInspector Lab',
      },
    });
  };

  const handleClearState = () => {
    navigate('/location-inspector', { replace: true });
  };

  return (
    <div>
      <div className="glass-card" style={{ borderLeft: '4px solid #c084fc' }}>
        <h2 className="card-title">
          <span>🧭</span> Location Inspector: Giải Mã useLocation() Toàn Diện
        </h2>
        <p className="card-subtitle">
          Khác với <code>useParams()</code> (chỉ đọc path) và <code>useSearchParams()</code> (chỉ đọc query), 
          <code>useLocation()</code> cung cấp một <strong>bản chụp trạng thái (Snapshot) toàn diện</strong> của trang hiện tại.
        </p>

        {/* Live Location Object Inspector */}
        <div style={{ background: '#030712', borderRadius: '12px', padding: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#c084fc', textTransform: 'uppercase' }}>
              🔍 Đối Tượng Location Hiện Tại (Live React Router Object)
            </span>
            <span className="badge badge-purple">Key: {location.key}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', fontFamily: 'JetBrains Mono', fontSize: '0.88rem' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid #38bdf8' }}>
              <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '0.2rem' }}>location.pathname</div>
              <div style={{ color: '#38bdf8', fontWeight: 700 }}>"{location.pathname}"</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.4rem' }}>Đường dẫn tương đối (không gồm query/hash)</div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid #34d399' }}>
              <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '0.2rem' }}>location.search</div>
              <div style={{ color: '#34d399', fontWeight: 700 }}>"{location.search || ''}"</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.4rem' }}>Chuỗi thô bắt đầu bằng dấu ?</div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid #c084fc' }}>
              <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '0.2rem' }}>location.hash</div>
              <div style={{ color: '#c084fc', fontWeight: 700 }}>"{location.hash || ''}"</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.4rem' }}>Phần neo trang bắt đầu bằng dấu #</div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid #fbbf24' }}>
              <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '0.2rem' }}>location.key</div>
              <div style={{ color: '#fbbf24', fontWeight: 700 }}>"{location.key}"</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.4rem' }}>ID duy nhất cho mỗi entry lịch sử duyệt web</div>
            </div>
          </div>

          {/* State Inspector */}
          <div style={{ marginTop: '1rem', background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                location.state (Dữ liệu truyền ngầm không lộ trên URL)
              </span>
              {location.state && (
                <button onClick={handleClearState} className="btn btn-secondary btn-sm" style={{ fontSize: '0.72rem' }}>
                  Xóa state
                </button>
              )}
            </div>
            <pre style={{ margin: 0, color: location.state ? '#34d399' : '#64748b', fontSize: '0.85rem' }}>
              {location.state ? JSON.stringify(location.state, null, 2) : 'null (chưa có state nào được truyền qua navigation)'}
            </pre>
          </div>
        </div>

        {/* State Transmission Simulator */}
        <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1.25rem', borderRadius: '12px', marginBottom: '1.75rem' }}>
          <h3 style={{ fontSize: '1rem', color: '#f8fafc', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🚀</span> Thử Nghiệm: Truyền State Ngầm Qua <code>navigate(url, &#123; state &#125;)</code>
          </h3>
          <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginBottom: '0.8rem' }}>
            Thường dùng khi thanh toán thành công (truyền thông tin đơn hàng sang trang xác nhận) mà không muốn lộ dữ liệu nhạy cảm trên URL.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', maxWidth: '600px', flexWrap: 'wrap' }}>
            <input
              type="text"
              value={sentPayload}
              onChange={(e) => setSentPayload(e.target.value)}
              className="form-input"
              style={{ flex: 1 }}
            />
            <button onClick={handleTestStateNavigation} className="btn btn-accent">
              Gửi State kèm Hash & Query ⚡
            </button>
          </div>
        </div>

        {/* Comparison: location.search vs useSearchParams */}
        <div style={{ background: 'rgba(56, 189, 248, 0.06)', border: '1px solid rgba(56, 189, 248, 0.25)', padding: '1.25rem', borderRadius: '12px' }}>
          <h3 style={{ fontSize: '1.05rem', color: '#38bdf8', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>⚖️</span> Phân Biệt: <code>location.search</code> vs <code>useSearchParams()</code>
          </h3>
          <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '0.8rem' }}>
            Rất nhiều kỹ sư mới học thường thắc mắc: <em>"Cả hai đều liên quan tới phần dấu ?, tại sao lại sinh ra 2 hook?"</em>
          </p>

          <div className="grid-2">
            <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '8px' }}>
              <div style={{ color: '#c084fc', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.3rem' }}>
                location.search (useLocation)
              </div>
              <ul style={{ fontSize: '0.82rem', color: '#94a3b8', paddingLeft: '1.2rem', lineHeight: 1.6 }}>
                <li>Trả về <strong>nguyên chuỗi thô</strong> (Raw String): <code>"?q=react&page=2"</code>.</li>
                <li>Chỉ là thuộc tính thuần túy, không có hàm bóc tách hay phương thức cập nhật.</li>
                <li>Thích hợp làm trigger cho <code>useEffect([location])</code> hoặc gửi Analytics.</li>
              </ul>
            </div>

            <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '8px' }}>
              <div style={{ color: '#34d399', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.3rem' }}>
                useSearchParams()
              </div>
              <ul style={{ fontSize: '0.82rem', color: '#94a3b8', paddingLeft: '1.2rem', lineHeight: 1.6 }}>
                <li>Trả về bộ công cụ <code>URLSearchParams</code>: <code>searchParams.get("q")</code>.</li>
                <li>Cung cấp hàm <code>setSearchParams(...)</code> để ghi dữ liệu ngược lên URL.</li>
                <li>Lựa chọn số 1 cho các tính năng <strong>Tìm kiếm, Bộ lọc, Sắp xếp, Phân trang</strong>.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
