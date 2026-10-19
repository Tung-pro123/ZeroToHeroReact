import { useState } from 'react';
import InfoBox from '../common/InfoBox';

// --- SUB-COMPONENT: UNCONTROLLED PANEL (Tự quản lý State riêng) ---
function UncontrolledPanel({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`panel-card ${isOpen ? 'active' : ''}`}>
      <div className="panel-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="panel-title">
          <span>{isOpen ? '📂' : '📁'}</span>
          <span>{title}</span>
        </div>
        <span className="badge badge-amber">Uncontrolled (State nội bộ)</span>
      </div>
      {isOpen && (
        <div className="panel-body">
          <p>{children}</p>
          <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#fbbf24' }}>
            ⚡ Component con này tự quyết định mở/đóng. Cha không thể can thiệp!
          </div>
        </div>
      )}
    </div>
  );
}

// --- SUB-COMPONENT: CONTROLLED PANEL (Nhận trạng thái và hành động từ Cha) ---
function ControlledPanel({ title, children, isActive, onShow }) {
  return (
    <div className={`panel-card ${isActive ? 'active' : ''}`}>
      <div className="panel-header" onClick={onShow}>
        <div className="panel-title">
          <span>{isActive ? '📂' : '📁'}</span>
          <span>{title}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className={`badge ${isActive ? 'badge-emerald' : 'badge-blue'}`}>
            {isActive ? 'ĐANG MỞ (isActive=true)' : 'ĐANG ĐÓNG (isActive=false)'}
          </span>
          <button className="btn btn-secondary btn-sm" onClick={(e) => { e.stopPropagation(); onShow(); }}>
            {isActive ? 'Đã Mở' : 'Mở Bảng Này'}
          </button>
        </div>
      </div>
      {isActive && (
        <div className="panel-body">
          <p>{children}</p>
          <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#34d399' }}>
            ✅ Trạng thái hoàn toàn do Cha điều phối qua prop <code>isActive</code>. Khi bạn bấm mở bảng khác, bảng này tự động đóng lại!
          </div>
        </div>
      )}
    </div>
  );
}

export default function AccordionLab() {
  const [mode, setMode] = useState('controlled'); // 'uncontrolled' | 'controlled'
  const [activeIndex, setActiveIndex] = useState(0);

  const panels = [
    {
      id: 0,
      title: '1. Luồng dữ liệu một chiều (Top-Down Data Flow)',
      content:
        'Trong React, dữ liệu luôn chảy từ trên xuống (Cha -> Con) qua Props. Các component anh em không thể truyền dữ liệu ngang hàng cho nhau.',
    },
    {
      id: 1,
      title: '2. Quy trình Kéo State lên Cha (Lifting State Up)',
      content:
        'Bước 1: Xóa useState ở con -> Bước 2: Chuyển dữ liệu thành Props -> Bước 3: Đặt useState ở Cha chung gần nhất và truyền hàm callback xuống.',
    },
    {
      id: 2,
      title: '3. Nguồn Sự Thật Duy Nhất (Single Source of Truth)',
      content:
        'Mỗi mảnh dữ liệu động chỉ được phép có MỘT nơi làm chủ duy nhất trong ứng dụng để loại bỏ triệt để tình trạng lệch pha dữ liệu.',
    },
  ];

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">🪗 1. Phòng Thí Nghiệm Accordion: Lifting State Up</h2>
        <p className="lab-card-desc">
          So sánh trực quan giữa <strong>Uncontrolled Panels</strong> (con tự giữ state, không phối hợp được với nhau) 
          và <strong>Controlled Panels</strong> (kéo state lên cha, chỉ 1 panel mở tại một thời điểm).
        </p>
      </div>

      {/* Mode Switcher */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button
          className={`btn ${mode === 'controlled' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setMode('controlled')}
        >
          ✅ Bản Chuẩn: Kéo State Lên Cha (Chỉ 1 bảng mở)
        </button>
        <button
          className={`btn ${mode === 'uncontrolled' ? 'btn-danger' : 'btn-secondary'}`}
          onClick={() => setMode('uncontrolled')}
        >
          ❌ Bản Kém: State Nằm Ở Con (Mỗi con tự mở riêng)
        </button>
      </div>

      <InfoBox
        type={mode === 'controlled' ? 'tip' : 'warning'}
        title={
          mode === 'controlled'
            ? `Cha đang nắm giữ State: activeIndex = ${activeIndex}`
            : 'Mỗi Panel tự chứa useState riêng biệt'
        }
      >
        {mode === 'controlled' ? (
          <div>
            Khi bạn bấm vào bất kỳ Panel nào, hàm callback <code>onShow</code> sẽ báo cáo lên Cha.
            Cha cập nhật <code>setActiveIndex(id)</code>, kích hoạt render lại và đóng các Panel còn lại.
          </div>
        ) : (
          <div>
            Hãy thử bấm mở cả 3 bảng! Bạn sẽ thấy cả 3 bảng đều mở cùng lúc vì các con không hề biết bảng bên cạnh đang mở hay đóng.
          </div>
        )}
      </InfoBox>

      {/* Accordion Panels */}
      <div className="accordion-wrapper">
        {panels.map((item, index) =>
          mode === 'controlled' ? (
            <ControlledPanel
              key={item.id}
              title={item.title}
              isActive={activeIndex === index}
              onShow={() => setActiveIndex(index)}
            >
              {item.content}
            </ControlledPanel>
          ) : (
            <UncontrolledPanel key={item.id} title={item.title}>
              {item.content}
            </UncontrolledPanel>
          )
        )}
      </div>

      {/* Flow Monitor */}
      {mode === 'controlled' && (
        <div
          style={{
            marginTop: '2rem',
            padding: '1.25rem',
            background: '#0a0f1d',
            borderRadius: '10px',
            border: '1px solid #1e293b',
          }}
        >
          <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.5rem' }}>
            📡 <strong>GIÁM SÁT LUỒNG DỮ LIỆU ĐANG CHẠY (DATA FLOW INSPECTOR):</strong>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
            {panels.map((p, idx) => (
              <div
                key={p.id}
                style={{
                  padding: '0.75rem',
                  borderRadius: '6px',
                  background: activeIndex === idx ? 'rgba(16, 185, 129, 0.15)' : '#111827',
                  border: `1px solid ${activeIndex === idx ? '#10b981' : '#1f2937'}`,
                }}
              >
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: activeIndex === idx ? '#34d399' : '#e5e7eb' }}>
                  Panel #{idx + 1}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '0.25rem' }}>
                  Prop: <code>isActive = {String(activeIndex === idx)}</code>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
