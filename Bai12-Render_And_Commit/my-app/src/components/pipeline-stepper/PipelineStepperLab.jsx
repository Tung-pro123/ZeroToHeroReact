import { useState } from 'react';
import InfoBox from '../common/InfoBox';

export default function PipelineStepperLab() {
  const [activeStage, setActiveStage] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [counter, setCounter] = useState(10);

  const stages = [
    {
      id: 1,
      name: '1. Trigger (Kích Hoạt)',
      icon: '🔔',
      role: 'Người dùng / Mã code',
      where: 'Event Handler / Initial Load',
      touchesRealDom: false,
      desc: 'Yêu cầu vẽ lại được đưa vào hàng đợi: Khởi chạy app qua createRoot hoặc gọi hàm setter (setCount).',
      analogy: 'Khách hàng gọi món tại bàn ăn hoặc yêu cầu đổi món.'
    },
    {
      id: 2,
      name: '2. Render (Tính Toán)',
      icon: '🍳',
      role: 'React Engine (RAM)',
      where: 'Bộ nhớ RAM (Virtual DOM)',
      touchesRealDom: false,
      desc: 'React gọi thực thi các hàm Component, đệ quy duyệt cây, tính toán cây JSX mới và so sánh (Diffing) với cây cũ.',
      analogy: 'Đầu bếp trong bếp nhận nguyên liệu (props/state) và nấu món ăn.'
    },
    {
      id: 3,
      name: '3. Commit (Gắn Vào DOM)',
      icon: '🍽️',
      role: 'react-dom (Renderer)',
      where: 'Cây Real DOM của Trình duyệt',
      touchesRealDom: true,
      desc: 'React CHỈ áp dụng những điểm khác biệt nhỏ nhất vào các node DOM thật sự có thay đổi (bảo toàn 100% các node khác).',
      analogy: 'Người phục vụ bưng đúng đĩa thức ăn thành phẩm đặt lên bàn ăn thực tế.'
    },
    {
      id: 4,
      name: '4. Browser Paint (Đổ Màu Pixel)',
      icon: '🎨',
      role: 'Browser Engine (Chrome/Firefox)',
      where: 'Màn hình máy tính / GPU',
      touchesRealDom: true,
      desc: 'Trình duyệt tính toán lại vị trí (Layout/Reflow) và đổ màu các điểm ảnh (Repaint) lên màn hình cho mắt người dùng thấy.',
      analogy: 'Thực khách thưởng thức hương vị và màu sắc đĩa ăn.'
    }
  ];

  const handleTriggerSimulation = () => {
    setIsAutoPlaying(true);
    setActiveStage(1);
    setCounter((c) => c + 1);

    setTimeout(() => setActiveStage(2), 700);
    setTimeout(() => setActiveStage(3), 1500);
    setTimeout(() => {
      setActiveStage(4);
      setIsAutoPlaying(false);
    }, 2200);
  };

  const currentStageInfo = stages.find((s) => s.id === activeStage);

  return (
    <div className="lab-card">
      <div className="card-header">
        <div>
          <h2 className="card-title">🍽️ Chu Trình Render &amp; Commit (The Restaurant Pipeline)</h2>
          <p className="card-desc">
            Trải nghiệm từng nấc thang xử lý từ lúc kích hoạt (Trigger) đến khi điểm ảnh xuất hiện trên màn hình (Browser Paint).
          </p>
        </div>
        <button
          className="btn-primary"
          onClick={handleTriggerSimulation}
          disabled={isAutoPlaying}
        >
          {isAutoPlaying ? '⏳ Đang Xử Lý Chu Trình...' : '🚀 Kích Hoạt Re-render (Trigger)'}
        </button>
      </div>

      {/* Stepper Progress Bar */}
      <div className="stepper-container">
        {stages.map((st) => (
          <div
            key={st.id}
            className={`stepper-step ${activeStage === st.id ? 'active' : ''}`}
            onClick={() => !isAutoPlaying && setActiveStage(st.id)}
            style={{ cursor: isAutoPlaying ? 'default' : 'pointer' }}
          >
            <div className="step-num">{st.id}</div>
            <div className="step-title">
              <span>{st.icon}</span> {st.name}
            </div>
            <div className="step-desc">{st.role}</div>
          </div>
        ))}
      </div>

      {/* Chi tiết giai đoạn được chọn */}
      <div className="grid-2">
        <div className="compare-box highlight">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '1.6rem' }}>{currentStageInfo.icon}</span>
            <h3 style={{ fontSize: '1.2rem', color: '#06b6d4', fontWeight: 700 }}>
              Giai Đoạn {currentStageInfo.name}
            </h3>
          </div>

          <p style={{ color: '#f3f4f6', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
            {currentStageInfo.desc}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', background: 'rgba(0,0,0,0.3)', borderRadius: '6px' }}>
              <span style={{ color: '#9ca3af' }}>Ai thực thi:</span>
              <strong style={{ color: '#38bdf8' }}>{currentStageInfo.role}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', background: 'rgba(0,0,0,0.3)', borderRadius: '6px' }}>
              <span style={{ color: '#9ca3af' }}>Nơi diễn ra:</span>
              <strong style={{ color: '#cbd5e1' }}>{currentStageInfo.where}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', background: 'rgba(0,0,0,0.3)', borderRadius: '6px' }}>
              <span style={{ color: '#9ca3af' }}>Có chạm vào DOM thật không:</span>
              <strong style={{ color: currentStageInfo.touchesRealDom ? '#10b981' : '#f43f5e' }}>
                {currentStageInfo.touchesRealDom ? '✅ CÓ (Thay đổi DOM)' : '❌ KHÔNG (Chỉ trong RAM)'}
              </strong>
            </div>
          </div>
        </div>

        <div className="compare-box">
          <h3 className="compare-title"><span>👨‍🍳</span> Ẩn Dụ Nhà Hàng (Restaurant Metaphor)</h3>
          <div style={{ padding: '1.25rem', background: 'rgba(15, 23, 42, 0.8)', borderRadius: '10px', borderLeft: '4px solid #06b6d4' }}>
            <p style={{ fontSize: '0.95rem', color: '#cbd5e1', fontStyle: 'italic', lineHeight: 1.6 }}>
              "{currentStageInfo.analogy}"
            </p>
          </div>

          <div style={{ marginTop: '1.25rem' }}>
            <div style={{ fontSize: '0.82rem', color: '#9ca3af', textTransform: 'uppercase' }}>Giá trị State hiện tại:</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#34d399', marginTop: '0.2rem' }}>
              counter = {counter}
            </div>
          </div>

          <InfoBox title="Hiểu lầm phổ biến">
            Nhiều người nghĩ gọi <code>setCount</code> sẽ vẽ lại màn hình ngay lập tức. Thực tế, React chỉ đưa yêu cầu vào hàng đợi (Trigger), 
            sau đó mới gọi hàm component để tính toán (Render), rồi chỉ sửa đúng text hiển thị (Commit)!
          </InfoBox>
        </div>
      </div>
    </div>
  );
}
