import { useState } from 'react';
import InspirationCard from './InspirationCard';
import InfoBox from '../common/InfoBox';

export default function RenderTreeVisualizer() {
  const [mode, setMode] = useState('quote'); // 'quote' | 'color'
  const [viewType, setViewType] = useState('react-tree'); // 'react-tree' | 'dom-tree'

  return (
    <div className="lab-card">
      <div className="card-header">
        <div>
          <h2 className="card-title">🌳 Phòng Thí Nghiệm Cây Render (Render Tree Lab)</h2>
          <p className="card-desc">
            Quan sát trực quan cách React mô hình hóa cấu trúc Component và sự biến đổi động của cây Render 
            khi có điều kiện hiển thị (Conditional Rendering).
          </p>
        </div>
        <div className="toggle-wrapper">
          <span className="toggle-label">Góc nhìn:</span>
          <button
            className={`btn-secondary ${viewType === 'react-tree' ? 'active' : ''}`}
            onClick={() => setViewType('react-tree')}
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem' }}
          >
            ⚛️ Cây React Component
          </button>
          <button
            className={`btn-secondary ${viewType === 'dom-tree' ? 'active' : ''}`}
            onClick={() => setViewType('dom-tree')}
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem' }}
          >
            🌐 Cây DOM Trình Duyệt (HTML)
          </button>
        </div>
      </div>

      <div className="grid-2">
        {/* Cột 1: Ứng dụng thực tế đang chạy */}
        <div>
          <h3 style={{ fontSize: '1.15rem', color: '#f3f4f6', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🖥️</span> Ứng Dụng Đang Thực Thi
          </h3>
          <InspirationCard mode={mode} setMode={setMode} />

          <InfoBox title="Bản chất Render Tree">
            Render Tree chỉ phản ánh trạng thái tại <strong>một lần render duy nhất (snapshot)</strong>. 
            Khi bạn đổi chế độ từ <em>Danh ngôn</em> sang <em>Màu sắc</em>, nhánh <code>&lt;FancyText /&gt;</code> 
            sẽ bị gỡ bỏ (unmount) và thay thế bằng nhánh <code>&lt;ColorBox /&gt;</code> trong RAM.
          </InfoBox>
        </div>

        {/* Cột 2: Sơ đồ Cây Trực Quan */}
        <div>
          <h3 style={{ fontSize: '1.15rem', color: '#f3f4f6', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🌲</span> {viewType === 'react-tree' ? 'Mô Hình Cây Render (Virtual RAM)' : 'Mô Hình Cây DOM Thật (Browser)'}
          </h3>

          {viewType === 'react-tree' ? (
            <div className="tree-container">
              {/* Tầng 1: Root Node */}
              <div className="tree-row">
                <div className="tree-node root">
                  <div className="node-title"><span>⚛️</span> &lt;App /&gt;</div>
                  <div className="node-type">Nút Gốc (Root Node)</div>
                  <div className="node-render-status status-mounted">Đang Render</div>
                </div>
              </div>

              {/* Tầng 2: Top-level Components */}
              <div className="tree-row">
                <div className="tree-node top-level">
                  <div className="node-title">&lt;Header /&gt;</div>
                  <div className="node-type">Top-Level Component</div>
                  <div className="node-render-status status-mounted">Mounted</div>
                </div>
                <div className="tree-node top-level">
                  <div className="node-title">&lt;InspirationGenerator /&gt;</div>
                  <div className="node-type">Top-Level Component</div>
                  <div className="node-render-status status-mounted">State Holder</div>
                </div>
                <div className="tree-node top-level">
                  <div className="node-title">&lt;Footer /&gt;</div>
                  <div className="node-type">Top-Level Component</div>
                  <div className="node-render-status status-mounted">Mounted</div>
                </div>
              </div>

              {/* Tầng 3: Leaf Nodes & Dynamic Branch */}
              <div className="tree-row">
                <div className={`tree-node leaf ${mode === 'quote' ? 'dynamic-active' : 'unmounted'}`}>
                  <div className="node-title">&lt;FancyText /&gt;</div>
                  <div className="node-type">Nút Lá (Leaf Node)</div>
                  <div className={`node-render-status ${mode === 'quote' ? 'status-mounted' : 'status-unmounted'}`}>
                    {mode === 'quote' ? '✨ Active trên Cây' : '❌ Đã Unmounted'}
                  </div>
                </div>

                <div className={`tree-node leaf ${mode === 'color' ? 'dynamic-active' : 'unmounted'}`}>
                  <div className="node-title">&lt;ColorBox /&gt;</div>
                  <div className="node-type">Nút Lá (Leaf Node)</div>
                  <div className={`node-render-status ${mode === 'color' ? 'status-mounted' : 'status-unmounted'}`}>
                    {mode === 'color' ? '🎨 Active trên Cây' : '❌ Đã Unmounted'}
                  </div>
                </div>

                <div className="tree-node leaf">
                  <div className="node-title">&lt;Copyright /&gt;</div>
                  <div className="node-type">Nút Lá (Leaf Node)</div>
                  <div className="node-render-status status-mounted">Static Leaf</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="tree-container">
              {/* Cây DOM thật */}
              <div className="tree-row">
                <div className="tree-node" style={{ borderColor: '#10b981' }}>
                  <div className="node-title"><span>🌐</span> &lt;div id="root"&gt;</div>
                  <div className="node-type">Real DOM Root</div>
                </div>
              </div>
              <div className="tree-row">
                <div className="tree-node" style={{ borderColor: '#10b981' }}>
                  <div className="node-title">&lt;header class="..."&gt;</div>
                  <div className="node-type">HTML Element</div>
                </div>
                <div className="tree-node" style={{ borderColor: '#10b981' }}>
                  <div className="node-title">&lt;div class="box"&gt;</div>
                  <div className="node-type">HTML Container</div>
                </div>
                <div className="tree-node" style={{ borderColor: '#10b981' }}>
                  <div className="node-title">&lt;footer class="..."&gt;</div>
                  <div className="node-type">HTML Element</div>
                </div>
              </div>
              <div className="tree-row">
                <div className="tree-node" style={{ borderColor: '#10b981' }}>
                  <div className="node-title">
                    {mode === 'quote' ? '<p class="quote-text">' : '<div style="background:...">' }
                  </div>
                  <div className="node-type">HTML Leaf Node</div>
                </div>
                <div className="tree-node" style={{ borderColor: '#10b981' }}>
                  <div className="node-title">&lt;small&gt;© 2026&lt;/small&gt;</div>
                  <div className="node-type">HTML Leaf Node</div>
                </div>
              </div>
            </div>
          )}

          <div style={{ marginTop: '1rem', fontSize: '0.88rem', color: '#9ca3af', lineHeight: 1.5 }}>
            {viewType === 'react-tree' ? (
              <p>
                <strong>💡 Tại sao các thẻ HTML (&lt;h1&gt;, &lt;div&gt;) không xuất hiện ở đây?</strong><br />
                Vì React là thư viện độc lập nền tảng (Platform Agnostic). Render Tree của React chỉ theo dõi 
                các <strong>Component</strong>. Khi chạy trên Web, <code>react-dom</code> mới biến chúng thành cây DOM thật của trình duyệt!
              </p>
            ) : (
              <p>
                <strong>🌐 Cây DOM thật (Browser DOM):</strong> Đây là cây các phần tử HTML cụ thể do 
                <code>react-dom</code> cập nhật (commit) lên trình duyệt để người dùng nhìn thấy điểm ảnh (pixels).
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
