import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import RenderCounter from '../components/common/RenderCounter';

export default function HigherOrderLabPage() {
  const [selectedPattern, setSelectedPattern] = useState('standard');
  const [executionLogs, setExecutionLogs] = useState([]);

  // RHF Hook
  const { register, handleSubmit } = useForm({
    defaultValues: {
      accountName: 'nguyen_van_a',
      role: 'FULLSTACK_ENGINEER',
    },
  });

  const addLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setExecutionLogs((prev) => [
      { id: Date.now() + Math.random(), time: timestamp, message, type },
      ...prev.slice(0, 19),
    ]);
  };

  // Callback người dùng tự viết
  const myOnSubmit = (data) => {
    addLog(`[myOnSubmit] Được gọi thành công với payload: ${JSON.stringify(data)}`, 'valid');
  };

  // Mô phỏng 3 cách xử lý
  const handleFormSubmit = (e) => {
    if (selectedPattern === 'standard') {
      addLog(`[Standard Flow] React phát sinh Submit Event -> RHF submitHandler(e) tiếp nhận`, 'event');
      handleSubmit(myOnSubmit)(e);
    } else if (selectedPattern === 'wrapperDiscard') {
      e.preventDefault();
      addLog(`[Wrapper Discard] Đang gọi handleSubmit(myOnSubmit)...`, 'event');
      // TẠO RA HANDLER NHƯNG VỨT ĐI (KHÔNG GỌI)
      const unusedHandler = handleSubmit(myOnSubmit);
      addLog(`⚠️ Đã tạo ra handler: [${typeof unusedHandler}], nhưng KHÔNG AI GỌI NÓ! Dữ liệu bị treo, onSubmit không bao giờ chạy!`, 'invalid');
    } else if (selectedPattern === 'prematureCall') {
      e.preventDefault();
      addLog(`❌ [Premature Call] Bạn đã gõ handleSubmit(onSubmit()) lúc render! myOnSubmit đã chạy từ trước khi submit với data = undefined!`, 'invalid');
    }
  };

  const clearLogs = () => setExecutionLogs([]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header card */}
      <div className="card">
        <div className="card-header">
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-indigo">CORE MENTAL MODEL</span>
              <span className="badge badge-amber">HIGHER-ORDER FUNCTION</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>
              Giải Phẫu Cú Pháp: Tại Sao Là handleSubmit(onSubmit)?
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Hiểu rõ sự khác biệt giữa <strong>Render Time</strong> (lúc tạo handler) và <strong>Event Time</strong> (lúc form submit thực sự xảy ra).
            </p>
          </div>
          <RenderCounter name="HigherOrderLabPage" />
        </div>
      </div>

      {/* Pattern Selector Tabs */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <span>🔬</span> Chọn Kịch Bản Viết Code Để So Sánh
          </div>
          <span className="badge badge-cyan">Interactive Lab</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <button
            type="button"
            className={`btn ${selectedPattern === 'standard' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => {
              setSelectedPattern('standard');
              addLog('Chuyển sang: Cách 1 - Chuẩn mực RHF: onSubmit={handleSubmit(onSubmit)}', 'info');
            }}
          >
            ✅ Cách 1: Chuẩn RHF (handleSubmit(onSubmit))
          </button>

          <button
            type="button"
            className={`btn ${selectedPattern === 'wrapperDiscard' ? 'btn-danger' : 'btn-outline'}`}
            onClick={() => {
              setSelectedPattern('wrapperDiscard');
              addLog('Chuyển sang: Cách 2 - Bẫy vứt bỏ handler: handleSubmit(onSubmit) mà không gọi', 'invalid');
            }}
          >
            ❌ Cách 2: Tạo Handler Rồi Bỏ Xó
          </button>

          <button
            type="button"
            className={`btn ${selectedPattern === 'prematureCall' ? 'btn-danger' : 'btn-outline'}`}
            onClick={() => {
              setSelectedPattern('prematureCall');
              addLog('Chuyển sang: Cách 3 - Bẫy gọi nhầm lúc render: handleSubmit(onSubmit())', 'invalid');
            }}
          >
            ⚠️ Cách 3: Gọi Nhầm Lúc Render
          </button>
        </div>

        {/* Dynamic Code Viewer */}
        <div className="code-block" style={{ marginBottom: '1.5rem' }}>
          {selectedPattern === 'standard' && (
            <div>
              <span className="code-comment">// ✅ CÁCH 1: CHUẨN MỰC RHF - handleSubmit nhận callback và TRẢ VỀ submitHandler</span><br />
              <span className="code-keyword">const</span> {'{'} register, handleSubmit {'}'} = <span className="code-func">useForm</span>();<br /><br />
              <span className="code-comment">// Lúc render: handleSubmit(myOnSubmit) trả về hàm (e) => void</span><br />
              <span className="code-keyword">const</span> submitHandler = <span className="code-func">handleSubmit</span>(myOnSubmit);<br /><br />
              <span className="code-keyword">return</span> (<br />
              &nbsp;&nbsp;&lt;<span className="code-keyword">form</span> <span className="code-prop">onSubmit</span>={'{'}submitHandler{'}'}&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="code-keyword">input</span> {'{'}...<span className="code-func">register</span>(<span className="code-string">"accountName"</span>){'}'} /&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="code-keyword">button</span> <span className="code-prop">type</span>=<span className="code-string">"submit"</span>&gt;Gửi Form&lt;/<span className="code-keyword">button</span>&gt;<br />
              &nbsp;&nbsp;&lt;/<span className="code-keyword">form</span>&gt;<br />
              );
            </div>
          )}

          {selectedPattern === 'wrapperDiscard' && (
            <div>
              <span className="code-comment">// ❌ CÁCH 2: BẪY PHỔ BIẾN - TẠO HANDLER RỒI BỎ XÓ (VỨT VÀO HƯ VÔ)</span><br />
              <span className="code-keyword">function</span> <span className="code-func">submitForm</span>(event) {'{'}<br />
              &nbsp;&nbsp;<span className="code-comment">// LỖI NẶNG: handleSubmit(myOnSubmit) trả về 1 function mới, nhưng bạn KHÔNG GỌI NÓ!</span><br />
              &nbsp;&nbsp;<span className="code-func">handleSubmit</span>(myOnSubmit); <span className="code-comment">// 👈 Return value bị bỏ quên!</span><br />
              {'}'}<br /><br />
              &lt;<span className="code-keyword">form</span> <span className="code-prop">onSubmit</span>={'{'}submitForm{'}'}&gt; ... &lt;/<span className="code-keyword">form</span>&gt;
            </div>
          )}

          {selectedPattern === 'prematureCall' && (
            <div>
              <span className="code-comment">// ⚠️ CÁCH 3: LỖI THIẾU KIẾN THỨC JS CƠ BẢN</span><br />
              <span className="code-comment">// Gõ onSubmit() có thêm dấu ngoặc tròn ()</span><br />
              &lt;<span className="code-keyword">form</span> <span className="code-prop">onSubmit</span>={'{'}<span className="code-func">handleSubmit</span>(<span className="code-func">myOnSubmit</span>()){'}'}&gt;<br />
              &nbsp;&nbsp;<span className="code-comment">// 👈 myOnSubmit() bị ép thực thi ngay lúc component RENDER! data lúc này là undefined!</span><br />
              &lt;/<span className="code-keyword">form</span>&gt;
            </div>
          )}
        </div>

        {/* Live Interactive Form */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          <form onSubmit={handleFormSubmit} style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>📝</span> Form Thử Nghiệm Thực Tế
            </h3>

            <div className="form-group">
              <label className="form-label">Tên Tài Khoản (accountName)</label>
              <input
                className="form-input"
                {...register('accountName', { required: true })}
                placeholder="Nhập tên tài khoản..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Vai Trò Hệ Thống (role)</label>
              <select className="form-select" {...register('role')}>
                <option value="FULLSTACK_ENGINEER">Fullstack Engineer</option>
                <option value="BACKEND_ARCHITECT">Backend Architect</option>
                <option value="TECH_LEAD">Tech Lead</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
              <span>🚀</span> Bấm Để Kích Hoạt Form Submit
            </button>
          </form>

          {/* Execution Log Terminal */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)' }}>
                📺 Console Log Theo Dõi Dòng Thực Thi (Execution Stream)
              </span>
              <button type="button" className="btn btn-outline" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }} onClick={clearLogs}>
                Xóa Log
              </button>
            </div>

            <div className="log-terminal" style={{ flex: 1, minHeight: '220px' }}>
              {executionLogs.length === 0 ? (
                <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', padding: '1rem 0' }}>
                  Chưa có sự kiện nào. Hãy chọn kịch bản ở trên và bấm "Bấm Để Kích Hoạt Form Submit"...
                </div>
              ) : (
                executionLogs.map((log) => (
                  <div key={log.id} className="log-entry">
                    <span className="log-time">[{log.time}]</span>
                    <span className={`log-type-${log.type}`}>{log.message}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pure JS Function Explanation */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <span>🧠</span> Bản Chất Pure JavaScript: Function Trả Về Function (Higher-Order Function)
          </div>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
          Đừng nghĩ RHF là "phép thuật đen" (magic). Hãy xem cách một Higher-Order Function hoạt động bằng JavaScript thuần:
        </p>

        <div className="code-block">
          <span className="code-comment">// Minh họa cách handleSubmit được sinh ra:</span><br />
          <span className="code-keyword">function</span> <span className="code-func">createSubmitHandler</span>(myCallback) {'{'}<br />
          &nbsp;&nbsp;<span className="code-comment">// Trả về một hàm event listener nhận synthetic event từ browser</span><br />
          &nbsp;&nbsp;<span className="code-keyword">return function</span>(browserEvent) {'{'}<br />
          &nbsp;&nbsp;&nbsp;&nbsp;browserEvent.<span className="code-func">preventDefault</span>(); <span className="code-comment">// 1. Ngăn reload trang</span><br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">const</span> collectedData = {'{'} ...registeredValues {'}'}; <span className="code-comment">// 2. Thu gom data</span><br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">const</span> isValid = <span className="code-func">validateAllFields</span>(); <span className="code-comment">// 3. Kiểm tra hợp lệ</span><br /><br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">if</span> (isValid) {'{'}<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-func">myCallback</span>(collectedData); <span className="code-comment">// 4. Giao data cho hàm của bạn!</span><br />
          &nbsp;&nbsp;&nbsp;&nbsp;{'}'}<br />
          &nbsp;&nbsp;{'}'};<br />
          {'}'}
        </div>
      </div>
    </div>
  );
}

