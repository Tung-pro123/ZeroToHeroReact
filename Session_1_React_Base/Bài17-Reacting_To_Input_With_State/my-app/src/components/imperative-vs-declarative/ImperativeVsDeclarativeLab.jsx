import { useState } from 'react';
import InfoBox from '../common/InfoBox';

function mockCheckAnswer(answer) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isCorrect = answer.toLowerCase().trim() === 'đà nẵng' || answer.toLowerCase().trim() === 'da nang';
      if (isCorrect) {
        resolve();
      } else {
        reject(new Error('Sai rồi! Gợi ý: Thành phố đáng sống nhất Việt Nam có bãi biển Mỹ Khê.'));
      }
    }, 1500);
  });
}

export default function ImperativeVsDeclarativeLab() {
  // DECLARATIVE STATE (React chuẩn)
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing'); // 'typing' | 'submitting' | 'success'

  // IMPERATIVE STATE SIMULATOR (Mô phỏng bẫy Vanilla JS DOM)
  const [impInputVal, setImpInputVal] = useState('');
  const [impDisabled, setImpDisabled] = useState(false);
  const [impLoading, setImpLoading] = useState(false);
  const [impError, setImpError] = useState(null);
  const [impSuccess, setImpSuccess] = useState(false);
  const [forgetReEnable, setForgetReEnable] = useState(true);

  // Xử lý Declarative (React FSM)
  const handleDeclarativeSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setError(null);
    try {
      await mockCheckAnswer(answer);
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setError(err);
    }
  };

  // Xử lý Imperative (Mô phỏng lỗi quên bật lại DOM)
  const handleImperativeSubmit = async (e) => {
    e.preventDefault();
    // Bắt đầu: ra lệnh khóa DOM thủ công
    setImpDisabled(true);
    setImpLoading(true);
    setImpError(null);

    try {
      await mockCheckAnswer(impInputVal);
      setImpLoading(false);
      setImpSuccess(true);
    } catch (err) {
      setImpLoading(false);
      setImpError(err.message);
      // ❌ BẪY IMPERATIVE: Nếu lập trình viên quên gán `setImpDisabled(false)`, form sẽ bị đơ cứng vĩnh viễn!
      if (!forgetReEnable) {
        setImpDisabled(false);
      }
    }
  };

  const handleResetDeclarative = () => {
    setAnswer('');
    setError(null);
    setStatus('typing');
  };

  const handleResetImperative = () => {
    setImpInputVal('');
    setImpDisabled(false);
    setImpLoading(false);
    setImpError(null);
    setImpSuccess(false);
  };

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">🚕 Mệnh Lệnh (Taxi Chỉ Đường) vs Khai Báo (React)</h2>
        <p className="lab-card-desc">
          So sánh đối đầu giữa phương pháp can thiệp DOM thủ công (Imperative) và mô hình trạng thái tự động (Declarative).
        </p>
      </div>

      <InfoBox type="tip" title="Bản Chất: Tại Sao Declarative Triệt Tiêu Bug?">
        Trong bản Declarative, trạng thái nút Submit và ô Input hoàn toàn được tính toán từ <code>status === 'submitting'</code>. 
        Không bao giờ có chuyện API báo lỗi xong mà form vẫn bị đơ cứng vì lập trình viên quên viết lệnh enable lại!
      </InfoBox>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', margin: '1.5rem 0' }}>
        {/* Left: Imperative Vanilla JS Simulator */}
        <div style={{ background: '#0f172a', border: '1px solid #ef4444', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h4 style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>⚠️</span>
              <span>1. Bản Mệnh Lệnh (Vanilla DOM)</span>
            </h4>
            <span style={{ fontSize: '0.75rem', background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
              Dễ sót lệnh
            </span>
          </div>

          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1rem' }}>
            Câu hỏi: <strong>Thành phố nào nổi tiếng với Cầu Rồng?</strong>
          </p>

          {impSuccess ? (
            <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', borderRadius: '8px', color: '#10b981', textAlign: 'center' }}>
              🎉 Chính xác! Bạn trả lời đúng rồi!
              <button className="btn btn-secondary btn-sm" onClick={handleResetImperative} style={{ display: 'block', margin: '0.5rem auto 0' }}>
                Chơi lại
              </button>
            </div>
          ) : (
            <form onSubmit={handleImperativeSubmit}>
              <input
                className="form-input"
                placeholder="Gõ thử câu trả lời sai để test bẫy..."
                value={impInputVal}
                disabled={impDisabled}
                onChange={(e) => setImpInputVal(e.target.value)}
              />

              {impError && (
                <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                  ❌ {impError}
                </div>
              )}

              {impDisabled && !impLoading && (
                <div style={{ color: '#f59e0b', fontSize: '0.8rem', marginTop: '0.5rem', background: 'rgba(245, 158, 11, 0.1)', padding: '0.4rem', borderRadius: '4px' }}>
                  🚨 LỖI ĐƠ CỨNG: Lập trình viên quên dòng <code>input.disabled = false</code> nên form bị kẹt luôn!
                </div>
              )}

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <button
                  type="submit"
                  className="btn btn-danger"
                  disabled={impDisabled || impInputVal.trim().length === 0}
                  style={{ flex: 1 }}
                >
                  {impLoading ? <span className="spinner" /> : 'Gửi đáp án'}
                </button>
                <button type="button" className="btn btn-secondary btn-sm" onClick={handleResetImperative}>
                  Reset
                </button>
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#64748b', marginTop: '0.75rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={forgetReEnable}
                  onChange={(e) => setForgetReEnable(e.target.checked)}
                />
                Mô phỏng quên dòng code mở khóa khi gặp lỗi
              </label>
            </form>
          )}
        </div>

        {/* Right: Declarative React Mode */}
        <div style={{ background: '#0f172a', border: '1px solid #10b981', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h4 style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>✅</span>
              <span>2. Bản Khai Báo (React FSM)</span>
            </h4>
            <span style={{ fontSize: '0.75rem', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
              Chuẩn 100%
            </span>
          </div>

          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1rem' }}>
            Câu hỏi: <strong>Thành phố nào nổi tiếng với Cầu Rồng?</strong>
          </p>

          {status === 'success' ? (
            <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', borderRadius: '8px', color: '#10b981', textAlign: 'center' }}>
              🎉 Chính xác! Bạn trả lời đúng rồi!
              <button className="btn btn-secondary btn-sm" onClick={handleResetDeclarative} style={{ display: 'block', margin: '0.5rem auto 0' }}>
                Chơi lại
              </button>
            </div>
          ) : (
            <form onSubmit={handleDeclarativeSubmit}>
              <input
                className="form-input"
                placeholder="Nhập 'Đà Nẵng'..."
                value={answer}
                disabled={status === 'submitting'}
                onChange={(e) => setAnswer(e.target.value)}
              />

              {error && (
                <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                  ❌ {error.message}
                </div>
              )}

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={status === 'submitting' || answer.trim().length === 0}
                  style={{ flex: 1 }}
                >
                  {status === 'submitting' ? <span className="spinner" /> : 'Gửi đáp án'}
                </button>
                <button type="button" className="btn btn-secondary btn-sm" onClick={handleResetDeclarative}>
                  Reset
                </button>
              </div>

              <div style={{ fontSize: '0.75rem', color: '#38bdf8', marginTop: '0.75rem' }}>
                Current State: <code>status = '{status}'</code> | <code>error = {error ? 'Error' : 'null'}</code>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
