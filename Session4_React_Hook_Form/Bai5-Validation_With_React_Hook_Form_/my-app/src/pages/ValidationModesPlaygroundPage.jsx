import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import RenderCounter from '../components/common/RenderCounter';

// Subcomponent cho từng mode để useForm khởi tạo độc lập với mode tương ứng
function ModeTesterInstance({ currentMode }) {
  const [eventLogs, setEventLogs] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: currentMode,
    defaultValues: {
      userEmail: '',
      userPin: '',
    },
  });

  const addLog = (eventName, detail) => {
    const time = new Date().toLocaleTimeString();
    setEventLogs((prev) => [{ id: Date.now() + Math.random(), time, eventName, detail }, ...prev.slice(0, 15)]);
  };

  const onTestSubmit = (data) => {
    addLog('SUBMIT_SUCCESS', `Gửi thành công: ${JSON.stringify(data)}`);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
      {/* Live Input Field Container */}
      <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: '700' }}>
            Form Đang Chạy Với Mode: <span style={{ color: 'var(--primary-light)' }}>{currentMode}</span>
          </h4>
          <RenderCounter name={`Mode_${currentMode}`} />
        </div>

        <form onSubmit={handleSubmit(onTestSubmit)}>
          <div className="form-group">
            <label className="form-label">
              Email Người Dùng <span className="required">* (Phải đúng cú pháp)</span>
            </label>
            <input
              className={`form-input ${errors.userEmail ? 'is-invalid' : ''}`}
              {...register('userEmail', {
                required: 'Email bắt buộc phải nhập',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Email không đúng định dạng',
                },
                onChange: (e) => addLog('onChange', `Gõ ký tự: "${e.target.value}"`),
                onBlur: (e) => addLog('onBlur', `Rời khỏi input email (value: "${e.target.value}")`),
              })}
              onFocus={() => addLog('onFocus', 'Bắt đầu focus vào input email')}
              placeholder="Gõ thử vào đây để xem thời điểm báo lỗi..."
            />
            {errors.userEmail && <div className="error-feedback">⚠️ {errors.userEmail.message}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Mã PIN Bảo Mật <span className="required">* (Đúng 6 số)</span>
            </label>
            <input
              className={`form-input ${errors.userPin ? 'is-invalid' : ''}`}
              {...register('userPin', {
                required: 'Mã PIN bắt buộc phải có',
                pattern: { value: /^\d{6}$/, message: 'PIN phải gồm chính xác 6 chữ số' },
                onChange: (e) => addLog('onChange', `Nhập PIN: "${e.target.value}"`),
                onBlur: () => addLog('onBlur', 'Rời khỏi ô PIN'),
              })}
              placeholder="ví dụ: 123456"
            />
            {errors.userPin && <div className="error-feedback">⚠️ {errors.userPin.message}</div>}
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '0.5rem' }}
            onClick={() => addLog('onClick_Submit', 'Bấm nút [Submit Form]')}
          >
            🚀 Bấm Để Submit Thử Nghiệm
          </button>
        </form>
      </div>

      {/* Real-time Event Logger Terminal */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)' }}>
            📡 Event &amp; Validation Stream Tracker
          </span>
          <button
            type="button"
            className="btn btn-outline"
            style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}
            onClick={() => setEventLogs([])}
          >
            Xóa Log
          </button>
        </div>

        <div className="inspector-panel" style={{ minHeight: '260px' }}>
          {eventLogs.length === 0 ? (
            <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', padding: '1rem 0' }}>
              Chưa có thao tác nào. Hãy click vào ô input, gõ vài chữ hoặc click ra ngoài...
            </div>
          ) : (
            eventLogs.map((log) => (
              <div key={log.id} style={{ padding: '0.3rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>[{log.time}]</span>
                <span style={{ color: log.eventName.includes('Submit') ? 'var(--accent-emerald)' : 'var(--accent-cyan)', fontWeight: '600' }}>
                  {log.eventName}:
                </span>
                <span style={{ color: 'var(--text-primary)' }}>{log.detail}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default function ValidationModesPlaygroundPage() {
  const [activeMode, setActiveMode] = useState('onSubmit');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div className="card">
        <div className="card-header">
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-amber">UX STRATEGY</span>
              <span className="badge badge-blue">VALIDATION TIMING</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>
              Khảo Sát 3 Chế Độ Kích Hoạt Validation (mode)
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Khi nào validation nên chạy? Lúc bấm Submit, khi rời khỏi ô nhập (Blur), hay ngay trên từng phím gõ (Change)?
            </p>
          </div>
          <RenderCounter name="ValidationModesPlaygroundPage" />
        </div>
      </div>

      {/* Mode Selection Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        <div
          className={`mode-card ${activeMode === 'onSubmit' ? 'active' : ''}`}
          onClick={() => setActiveMode('onSubmit')}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: '800', fontSize: '1rem', color: 'var(--primary-light)' }}>
              1. mode: "onSubmit"
            </span>
            <span className="badge badge-blue">Mặc định</span>
          </div>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            <strong>Lazy validation:</strong> Người dùng gõ hoặc click thoải mái, RHF không làm phiền. Chỉ khi người dùng bấm Submit thì toàn bộ form mới được kiểm tra.
          </p>
        </div>

        <div
          className={`mode-card ${activeMode === 'onBlur' ? 'active' : ''}`}
          onClick={() => setActiveMode('onBlur')}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: '800', fontSize: '1rem', color: 'var(--accent-cyan)' }}>
              2. mode: "onBlur"
            </span>
            <span className="badge badge-cyan">Cân bằng nhất</span>
          </div>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            <strong>Field exit feedback:</strong> Khi người dùng hoàn thành một ô và click sang ô khác, ô vừa rời sẽ lập tức được thẩm định và hiện lỗi nếu sai.
          </p>
        </div>

        <div
          className={`mode-card ${activeMode === 'onChange' ? 'active' : ''}`}
          onClick={() => setActiveMode('onChange')}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: '800', fontSize: '1rem', color: 'var(--accent-purple)' }}>
              3. mode: "onChange"
            </span>
            <span className="badge badge-purple">Phản hồi tức thì</span>
          </div>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            <strong>Real-time keystroke:</strong> Mỗi một phím gõ đều kích hoạt thẩm định lại. Rất trực quan cho đồng hồ đo độ mạnh mật khẩu nhưng tăng số lần cập nhật state.
          </p>
        </div>
      </div>

      {/* Interactive Testing Sandbox for Active Mode */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <span>🔬</span> Phòng Thử Nghiệm Tương Tác Trực Tiếp Với Mode: <code>"{activeMode}"</code>
          </div>
        </div>

        {/* Dynamic Key to reset hook state when switching modes */}
        <ModeTesterInstance key={activeMode} currentMode={activeMode} />
      </div>

      {/* UX Matrix Summary */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <span>⚖️</span> Lời Khuyên Kiến Trúc Cho Quyết Định UX
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <strong style={{ color: 'var(--text-primary)' }}>Nên chọn "onSubmit" khi:</strong>
            <p style={{ marginTop: '0.35rem' }}>Form đăng nhập ngắn (2 ô), form khảo sát đơn giản nơi người dùng không muốn thấy viền đỏ khi vừa mới bắt đầu nhập.</p>
          </div>
          <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <strong style={{ color: 'var(--text-primary)' }}>Nên chọn "onBlur" khi:</strong>
            <p style={{ marginTop: '0.35rem' }}>Form đăng ký dài, form thanh toán (Checkout), hồ sơ tuyển dụng. Người dùng sửa lỗi ngay từng ô trước khi cuộn xuống quá xa.</p>
          </div>
          <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <strong style={{ color: 'var(--text-primary)' }}>Nên chọn "onChange" khi:</strong>
            <p style={{ marginTop: '0.35rem' }}>Cần live visual feedback như thanh đo độ mạnh mật khẩu, tìm kiếm gợi ý tức thì, hoặc kiểm tra trùng lặp mã giảm giá.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

