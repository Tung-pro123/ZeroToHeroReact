import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import RenderCounter from '../components/common/RenderCounter';

const BASE_DEFAULT = {
  nickName: 'pro_coder',
};

export default function DirtyVsTouchedLabPage() {
  const [uxStrategy, setUxStrategy] = useState('FRIENDLY_TOUCHED'); // 'FRIENDLY_TOUCHED' | 'AGGRESSIVE_IMMEDIATE'
  const [timelineLogs, setTimelineLogs] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    reset,
    watch,
    formState: { errors, isDirty, dirtyFields, touchedFields },
  } = useForm({
    mode: 'onChange',
    defaultValues: BASE_DEFAULT,
  });

  const watchedNickName = watch('nickName');

  const addLog = (action, dirtyVal, touchedVal) => {
    const time = new Date().toLocaleTimeString();
    setTimelineLogs((prev) => [
      { id: Date.now() + Math.random(), time, action, dirtyVal, touchedVal },
      ...prev.slice(0, 15),
    ]);
  };

  // Simulating 4 specific scenarios
  const runScenario1 = () => {
    // Focus rồi blur mà không sửa giá trị
    setFocus('nickName');
    setTimeout(() => {
      document.body.focus();
      addLog('Focus rồi Blur (Không đổi giá trị)', false, true);
    }, 150);
  };

  const runScenario2 = () => {
    // Sửa giá trị khác default nhưng chưa blur
    setValue('nickName', 'master_architect', { shouldValidate: true, shouldDirty: true, shouldTouch: false });
    addLog('Đổi giá trị khác default (Chưa blur)', true, false);
  };

  const runScenario3 = () => {
    // Sửa giá trị và blur
    setValue('nickName', 'lead_tech_2026', { shouldValidate: true, shouldDirty: true, shouldTouch: true });
    addLog('Đổi giá trị và Blur', true, true);
  };

  const runScenario4 = () => {
    // Sửa rồi xóa về đúng default ban đầu
    setValue('nickName', BASE_DEFAULT.nickName, { shouldValidate: true, shouldDirty: true });
    addLog(`Đưa giá trị về lại default ("${BASE_DEFAULT.nickName}")`, false, true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div className="card">
        <div className="card-header">
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-amber">CRUCIAL DISTINCTION</span>
              <span className="badge badge-purple">DIRTY VS TOUCHED</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>
              Giải Phẫu Ma Trận: Dirty (Dữ Liệu Đổi) vs Touched (Tương Tác Rời Đi)
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Hai khái niệm thường bị nhầm lẫn nhất trong React Hook Form: <code>isDirty/dirtyFields</code> so sánh giá trị với <code>defaultValues</code>, 
              trong khi <code>touchedFields</code> ghi nhận sự kiện người dùng đã từng tương tác rồi rời khỏi ô (focus ➔ blur).
            </p>
          </div>
          <RenderCounter name="DirtyVsTouchedLabPage" />
        </div>
      </div>

      {/* The 4-Row Truth Matrix Table */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <span>📊</span> Bảng Ma Trận Sự Thật (The Truth Matrix)
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '0.75rem 1rem' }}>Tình Huống Tương Tác</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>Dirty? (Giá trị đổi)</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>Touched? (Đã Blur)</th>
                <th style={{ padding: '0.75rem 1rem' }}>Giải Thích Bản Chất</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '0.85rem 1rem', fontWeight: '600' }}>1. Chưa làm gì (Initial State)</td>
                <td style={{ padding: '0.85rem 1rem', textAlign: 'center' }}><span className="badge badge-rose">❌ FALSE</span></td>
                <td style={{ padding: '0.85rem 1rem', textAlign: 'center' }}><span className="badge badge-rose">❌ FALSE</span></td>
                <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)' }}>Form vừa mount, giá trị trùng default, chưa từng bị focus.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', background: 'rgba(99, 102, 241, 0.04)' }}>
                <td style={{ padding: '0.85rem 1rem', fontWeight: '600' }}>2. Focus rồi Blur (Không đổi giá trị)</td>
                <td style={{ padding: '0.85rem 1rem', textAlign: 'center' }}><span className="badge badge-rose">❌ FALSE</span></td>
                <td style={{ padding: '0.85rem 1rem', textAlign: 'center' }}><span className="badge badge-emerald">✅ TRUE</span></td>
                <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)' }}>Người dùng đã bấm vào rồi rời đi nhưng giá trị vẫn nguyên như default!</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '0.85rem 1rem', fontWeight: '600' }}>3. Nhập giá trị mới (Chưa Blur)</td>
                <td style={{ padding: '0.85rem 1rem', textAlign: 'center' }}><span className="badge badge-emerald">✅ TRUE</span></td>
                <td style={{ padding: '0.85rem 1rem', textAlign: 'center' }}><span className="badge badge-rose">❌ FALSE</span></td>
                <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)' }}>Giá trị đã khác default, nhưng con trỏ chuột vẫn đang nằm trong ô.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', background: 'rgba(99, 102, 241, 0.04)' }}>
                <td style={{ padding: '0.85rem 1rem', fontWeight: '600' }}>4. Nhập giá trị mới VÀ Blur</td>
                <td style={{ padding: '0.85rem 1rem', textAlign: 'center' }}><span className="badge badge-emerald">✅ TRUE</span></td>
                <td style={{ padding: '0.85rem 1rem', textAlign: 'center' }}><span className="badge badge-emerald">✅ TRUE</span></td>
                <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)' }}>Cả hai điều kiện đều thỏa mãn.</td>
              </tr>
              <tr>
                <td style={{ padding: '0.85rem 1rem', fontWeight: '600' }}>5. Sửa rồi xóa về đúng default</td>
                <td style={{ padding: '0.85rem 1rem', textAlign: 'center' }}><span className="badge badge-rose">❌ FALSE</span></td>
                <td style={{ padding: '0.85rem 1rem', textAlign: 'center' }}><span className="badge badge-emerald">✅ TRUE</span></td>
                <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)' }}>Giá trị trùng lại với defaultValues, RHF tự động trả isDirty về false!</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Simulation Sandbox */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
        {/* Form Container */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <span>🔬</span> Phòng Thử Nghiệm Tương Tác
            </div>
            <div style={{ display: 'flex', gap: '0.3rem' }}>
              <span className={`status-pill ${isDirty ? 'status-pill-true' : 'status-pill-false'}`}>
                isDirty: {isDirty ? 'YES' : 'NO'}
              </span>
              <span className={`status-pill ${touchedFields.nickName ? 'status-pill-true' : 'status-pill-false'}`}>
                touched: {touchedFields.nickName ? 'YES' : 'NO'}
              </span>
            </div>
          </div>

          {/* Quick Simulation Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <button type="button" className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.4rem' }} onClick={runScenario1}>
              1. Focus rồi Blur (No change)
            </button>
            <button type="button" className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.4rem' }} onClick={runScenario2}>
              2. Đổi value (No blur)
            </button>
            <button type="button" className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.4rem' }} onClick={runScenario3}>
              3. Đổi value + Blur
            </button>
            <button type="button" className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.4rem' }} onClick={runScenario4}>
              4. Xóa về đúng Default
            </button>
          </div>

          {/* UX Strategy Toggle */}
          <div style={{ background: 'var(--bg-secondary)', padding: '0.875rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
              🎨 Chọn Chiến Lược Hiển Thị Lỗi UI:
            </span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                type="button"
                className={`btn ${uxStrategy === 'FRIENDLY_TOUCHED' ? 'btn-primary' : 'btn-outline'}`}
                style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                onClick={() => setUxStrategy('FRIENDLY_TOUCHED')}
              >
                ✅ Friendly: Chỉ hiện lỗi khi ĐÃ TOUCHED
              </button>
              <button
                type="button"
                className={`btn ${uxStrategy === 'AGGRESSIVE_IMMEDIATE' ? 'btn-danger' : 'btn-outline'}`}
                style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                onClick={() => setUxStrategy('AGGRESSIVE_IMMEDIATE')}
              >
                ⚠️ Aggressive: Hiện lỗi ngay lập tức
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(() => {})}>
            <div className="form-group">
              <label className="form-label">
                Biệt Danh Kỹ Sư (nickName) <span className="required">* (Tối thiểu 5 ký tự)</span>
              </label>
              <input
                className={`form-input ${errors.nickName ? 'is-invalid' : ''}`}
                {...register('nickName', {
                  required: 'Biệt danh không được để trống',
                  minLength: { value: 5, message: 'Biệt danh phải có tối thiểu 5 ký tự' },
                  onBlur: () => addLog('User Blur Event', isDirty, true),
                })}
              />

              {/* Conditional Error Rendering based on selected UX strategy */}
              {uxStrategy === 'FRIENDLY_TOUCHED' ? (
                touchedFields.nickName && errors.nickName && (
                  <div className="error-feedback">
                    ⚠️ {errors.nickName.message} (Chỉ hiện vì ô đã bị rời khỏi / touched)
                  </div>
                )
              ) : (
                errors.nickName && (
                  <div className="error-feedback">
                    ⚠️ {errors.nickName.message} (Hiện ngay tức thì)
                  </div>
                )
              )}

              <div className="input-hint" style={{ marginTop: '0.5rem' }}>
                Giá trị hiện tại: <strong>"{watchedNickName}"</strong> | Default: <strong>"{BASE_DEFAULT.nickName}"</strong>
              </div>
            </div>

            <button type="button" className="btn btn-outline" style={{ width: '100%' }} onClick={() => reset(BASE_DEFAULT)}>
              🔄 Reset Về Trạng Thái Ban Đầu
            </button>
          </form>
        </div>

        {/* Live Timeline Stream */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)' }}>
              📡 Dòng Sự Kiện Tương Tác Thời Gian Thực
            </span>
            <button
              type="button"
              className="btn btn-outline"
              style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}
              onClick={() => setTimelineLogs([])}
            >
              Xóa Log
            </button>
          </div>

          <div className="inspector-panel" style={{ flex: 1, minHeight: '300px' }}>
            {timelineLogs.length === 0 ? (
              <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', padding: '1rem 0' }}>
                Chưa có thao tác nào. Hãy click vào các nút Scenario 1, 2, 3, 4 bên trái...
              </div>
            ) : (
              timelineLogs.map((log) => (
                <div key={log.id} style={{ padding: '0.4rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>[{log.time}]</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: '600', flex: 1 }}>{log.action}</span>
                  <span className={`status-pill ${log.dirtyVal ? 'status-pill-true' : 'status-pill-false'}`}>
                    Dirty: {log.dirtyVal ? 'YES' : 'NO'}
                  </span>
                  <span className={`status-pill ${log.touchedVal ? 'status-pill-true' : 'status-pill-false'}`}>
                    Touched: {log.touchedVal ? 'YES' : 'NO'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

