import React, { useState } from 'react';

export default function FullstackPipelinePage() {
  const [pipelineState, setPipelineState] = useState('idle'); // idle, layer1, layer2, layer3, backend, success

  const runSimulation = async () => {
    setPipelineState('layer1');
    await new Promise((r) => setTimeout(r, 600));
    setPipelineState('layer2');
    await new Promise((r) => setTimeout(r, 700));
    setPipelineState('layer3');
    await new Promise((r) => setTimeout(r, 700));
    setPipelineState('backend');
    await new Promise((r) => setTimeout(r, 800));
    setPipelineState('success');
  };

  return (
    <div>
      <div className="glass-card" style={{ borderLeft: '4px solid #8b5cf6' }}>
        <h2 className="card-title">
          <span>🚀</span> Quy Trình Submit 3 Tầng & Cầu Nối Spring Boot Fullstack
        </h2>
        <p className="card-subtitle">
          Giải mã chi tiết cơ chế hoạt động của cú pháp <code>&lt;form onSubmit=&#123;handleSubmit(onSubmit)&#125;&gt;</code> và luồng dữ liệu sang Spring Boot.
        </p>

        {/* 3-Layer Architecture Stepper */}
        <div style={{ background: '#03050e', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(139, 92, 246, 0.3)', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h3 style={{ color: '#c084fc', fontSize: '1.1rem', fontWeight: 700 }}>
              🔬 Mô Phỏng Luồng Thực Thi 3 Tầng Khi Người Dùng Nhấn Submit
            </h3>
            <button
              onClick={runSimulation}
              disabled={pipelineState !== 'idle' && pipelineState !== 'success'}
              className="btn btn-purple btn-sm"
            >
              {pipelineState === 'idle' || pipelineState === 'success' ? 'Chạy Mô Phỏng Pipeline ⚡' : 'Đang xử lý...'}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            {/* Layer 1 */}
            <div
              style={{
                background: pipelineState === 'layer1' ? 'rgba(236, 72, 153, 0.25)' : 'rgba(255, 255, 255, 0.03)',
                border: pipelineState === 'layer1' ? '1px solid #ec4899' : '1px solid rgba(255, 255, 255, 0.08)',
                padding: '1rem',
                borderRadius: '10px',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ color: '#ec4899', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                TẦNG 1: HTML FORM EVENT
              </div>
              <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                Người dùng click submit. Browser kích hoạt sự kiện <code>onSubmit</code> của thẻ <code>&lt;form&gt;</code>.
              </div>
            </div>

            {/* Layer 2 */}
            <div
              style={{
                background: pipelineState === 'layer2' ? 'rgba(168, 85, 247, 0.25)' : 'rgba(255, 255, 255, 0.03)',
                border: pipelineState === 'layer2' ? '1px solid #a855f7' : '1px solid rgba(255, 255, 255, 0.08)',
                padding: '1rem',
                borderRadius: '10px',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ color: '#c084fc', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                TẦNG 2: RHF handleSubmit()
              </div>
              <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                RHF gọi <code>e.preventDefault()</code>, kích hoạt validation. Nếu invalid =&gt; cập nhật <code>errors</code>. Nếu valid =&gt; chuyển sang Tầng 3.
              </div>
            </div>

            {/* Layer 3 */}
            <div
              style={{
                background: pipelineState === 'layer3' ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255, 255, 255, 0.03)',
                border: pipelineState === 'layer3' ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.08)',
                padding: '1rem',
                borderRadius: '10px',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ color: '#38bdf8', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                TẦNG 3: USER onSubmit(data)
              </div>
              <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                Hàm do bạn tự viết nhận được <code>data</code> sạch và sẵn sàng gọi <code>fetch() / axios</code>.
              </div>
            </div>

            {/* Backend Layer */}
            <div
              style={{
                background: pipelineState === 'backend' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 255, 255, 0.03)',
                border: pipelineState === 'backend' ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.08)',
                padding: '1rem',
                borderRadius: '10px',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ color: '#34d399', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                SPRING BOOT CONTROLLER
              </div>
              <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                Nhận JSON qua <code>@RequestBody UserDTO dto</code>, lưu vào DB và trả về <code>HTTP 201 Created</code>.
              </div>
            </div>
          </div>

          {pipelineState === 'success' && (
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', padding: '1rem', borderRadius: '8px', color: '#34d399', fontSize: '0.9rem' }}>
              ✓ Chu trình hoàn tất thành công! Dữ liệu đã chuyển giao toàn vẹn từ Client sang Server.
            </div>
          )}
        </div>

        {/* 4 Demarcated Responsibilities */}
        <h3 style={{ fontSize: '1.1rem', color: '#f8fafc', fontWeight: 700, marginBottom: '1rem' }}>
          🛡️ Phân Tách 4 Trọng Trách Kỹ Thuật Độc Lập
        </h3>

        <div className="grid-2">
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1.25rem', borderRadius: '10px', borderLeft: '4px solid #ec4899' }}>
            <h4 style={{ color: '#ec4899', marginBottom: '0.4rem', fontSize: '1rem' }}>
              1. React Hook Form (Client-side)
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5 }}>
              Quản lý FORM: Đăng ký inputs, lắng nghe tương tác, gom dữ liệu khi submit, theo dõi cờ trạng thái.
            </p>
          </div>

          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1.25rem', borderRadius: '10px', borderLeft: '4px solid #38bdf8' }}>
            <h4 style={{ color: '#38bdf8', marginBottom: '0.4rem', fontSize: '1rem' }}>
              2. Zod (Data Validation)
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5 }}>
              Xác thực DATA: Định nghĩa schema quy chuẩn, kiểm tra định dạng email, password strength, kiểu số...
            </p>
          </div>

          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1.25rem', borderRadius: '10px', borderLeft: '4px solid #a855f7' }}>
            <h4 style={{ color: '#c084fc', marginBottom: '0.4rem', fontSize: '1rem' }}>
              3. Axios / Fetch (HTTP Transport)
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5 }}>
              Vận chuyển DỮ LIỆU: Mở kết nối mạng HTTP POST, gửi JSON headers, nhận response từ server.
            </p>
          </div>

          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1.25rem', borderRadius: '10px', borderLeft: '4px solid #10b981' }}>
            <h4 style={{ color: '#34d399', marginBottom: '0.4rem', fontSize: '1rem' }}>
              4. Spring Boot (Backend Server)
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5 }}>
              Xử lý NGHIỆP VỤ: Nhận DTO, kiểm tra bảo mật (Spring Security), ghi dữ liệu vào MySQL/PostgreSQL.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
