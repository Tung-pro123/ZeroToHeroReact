import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import RenderCounter from '../components/common/RenderCounter';

export default function PreventDefaultAndAsyncPage() {
  const [networkDelay, setNetworkDelay] = useState(1000);
  const [serverMode, setServerMode] = useState('SUCCESS_201');
  const [serverLogs, setServerLogs] = useState([]);
  const [apiResponse, setApiResponse] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      fullName: 'Tran Thi Mai',
      workEmail: 'mai.tran@company.vn',
      department: 'ENGINEERING',
    },
  });

  const logServerEvent = (msg, type = 'info') => {
    const time = new Date().toLocaleTimeString();
    setServerLogs((prev) => [{ id: Date.now() + Math.random(), time, msg, type }, ...prev.slice(0, 15)]);
  };

  // Callback bất đồng bộ gửi HTTP Request tới Mock Spring Boot Server
  const onSubmitAsync = async (data) => {
    logServerEvent(`[Client] RHF handleSubmit thẩm định thành công. Chuẩn bị payload JSON...`, 'valid');
    logServerEvent(`[Client -> Server] POST http://localhost:8080/api/v1/auth/register`, 'info');

    // Giả lập trễ mạng
    await new Promise((resolve) => setTimeout(resolve, networkDelay));

    if (serverMode === 'SUCCESS_201') {
      const response = {
        statusCode: 201,
        statusText: 'Created',
        headers: {
          'Content-Type': 'application/json',
          'X-Powered-By': 'Spring Boot 3.2.4',
        },
        body: {
          success: true,
          userId: 'USR_' + Math.floor(100000 + Math.random() * 900000),
          message: 'Tài khoản nhân sự đã được tạo thành công trên hệ thống cơ sở dữ liệu!',
          createdAt: new Date().toISOString(),
          record: data,
        },
      };
      setApiResponse(response);
      logServerEvent(`[Server -> Client] HTTP 201 Created - Record ID: ${response.body.userId}`, 'valid');
    } else if (serverMode === 'FAIL_400') {
      const response = {
        statusCode: 400,
        statusText: 'Bad Request',
        headers: {
          'Content-Type': 'application/json',
          'X-Powered-By': 'Spring Boot 3.2.4',
        },
        body: {
          timestamp: new Date().toISOString(),
          status: 400,
          error: 'Bad Request',
          message: 'Email ' + data.workEmail + ' đã tồn tại trong Database của công ty!',
          path: '/api/v1/auth/register',
        },
      };
      setApiResponse(response);
      logServerEvent(`[Server -> Client] HTTP 400 Bad Request - Trùng lặp email!`, 'invalid');
    } else {
      const response = {
        statusCode: 500,
        statusText: 'Internal Server Error',
        headers: {
          'Content-Type': 'application/json',
          'X-Powered-By': 'Spring Boot 3.2.4',
        },
        body: {
          timestamp: new Date().toISOString(),
          status: 500,
          error: 'Internal Server Error',
          message: 'Database Connection Pool Timeout: không thể kết nối tới PostgreSQL Master Replica',
          path: '/api/v1/auth/register',
        },
      };
      setApiResponse(response);
      logServerEvent(`[Server -> Client] HTTP 500 Server Error - DB Timeout`, 'invalid');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div className="card">
        <div className="card-header">
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-indigo">BACKEND INTEGRATION</span>
              <span className="badge badge-cyan">SPRING BOOT &amp; REST CONTROLLER</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>
              handleSubmit() Không Phải Là HTTP Submit: Tích Hợp API Bất Đồng Bộ
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              RHF chỉ quản lý form và giao <code>data</code> cho bạn. Việc gửi request qua mạng (<code>fetch</code> / <code>axios</code>) 
              là trách nhiệm của lập trình viên trong hàm <code>async onSubmit(data)</code>.
            </p>
          </div>
          <RenderCounter name="PreventDefaultAndAsyncPage" />
        </div>
      </div>

      {/* Spring Boot REST Controller Code Preview & Architecture */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <span>☕</span> Kiến Trúc Hai Đầu: React Client ➔ Spring Boot Backend
          </div>
          <span className="badge badge-indigo">Fullstack Data Flow</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.25rem' }}>
          {/* Frontend Code */}
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary-light)', marginBottom: '0.5rem' }}>
              💻 Phía React (Event Handler - KHÔNG dùng useEffect!)
            </div>
            <div className="code-block" style={{ fontSize: '0.8rem' }}>
              <span className="code-comment">// 1. Khai báo hàm async onSubmit</span><br />
              <span className="code-keyword">const</span> <span className="code-func">onSubmit</span> = <span className="code-keyword">async</span> (data) =&gt; {'{'}<br />
              &nbsp;&nbsp;<span className="code-comment">// isSubmitting tự động chuyển sang true</span><br />
              &nbsp;&nbsp;<span className="code-keyword">const</span> res = <span className="code-keyword">await</span> <span className="code-func">fetch</span>(<span className="code-string">"/api/v1/auth/register"</span>, {'{'}<br />
              &nbsp;&nbsp;&nbsp;&nbsp;method: <span className="code-string">"POST"</span>,<br />
              &nbsp;&nbsp;&nbsp;&nbsp;headers: {'{'} <span className="code-string">"Content-Type"</span>: <span className="code-string">"application/json"</span> {'}'},<br />
              &nbsp;&nbsp;&nbsp;&nbsp;body: JSON.<span className="code-func">stringify</span>(data),<br />
              &nbsp;&nbsp;{'}'});<br />
              &nbsp;&nbsp;<span className="code-comment">// isSubmitting tự động trả về false khi promise hoàn tất</span><br />
              {'}'};
            </div>
          </div>

          {/* Backend Code */}
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#38bdf8', marginBottom: '0.5rem' }}>
              🛡️ Phía Spring Boot (@RestController &amp; @Valid @RequestBody)
            </div>
            <div className="code-block" style={{ fontSize: '0.8rem' }}>
              <span className="code-keyword">@RestController</span><br />
              <span className="code-keyword">@RequestMapping</span>(<span className="code-string">"/api/v1/auth"</span>)<br />
              <span className="code-keyword">public class</span> <span className="code-func">AuthController</span> {'{'}<br />
              &nbsp;&nbsp;<span className="code-keyword">@PostMapping</span>(<span className="code-string">"/register"</span>)<br />
              &nbsp;&nbsp;<span className="code-keyword">public</span> ResponseEntity&lt;?&gt; <span className="code-func">register</span>(<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">@Valid @RequestBody</span> RegisterDto dto<br />
              &nbsp;&nbsp;) {'{'}<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Validation Backend bảo vệ an toàn ngay cả khi bypass React!</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">return</span> ResponseEntity.<span className="code-func">status</span>(HttpStatus.CREATED).<span className="code-func">body</span>(...);<br />
              &nbsp;&nbsp;{'}'}<br />
              {'}'}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Mock Server Controls & Form */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
        {/* Form Area */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <span>📝</span> Đăng Ký Tài Khoản Kèm Theo isSubmitting
            </div>
            {isSubmitting ? (
              <span className="badge badge-amber" style={{ animation: 'pulse 1s infinite' }}>
                ⏳ Đang Gửi Mạng...
              </span>
            ) : (
              <span className="badge badge-emerald">Idle (Sẵn sàng)</span>
            )}
          </div>

          {/* Server Config Options */}
          <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
              ⚙️ Giả Lập Phản Hồi Server &amp; Tốc Độ Mạng:
            </span>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
              <button
                type="button"
                className={`btn ${serverMode === 'SUCCESS_201' ? 'btn-primary' : 'btn-outline'}`}
                style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
                onClick={() => setServerMode('SUCCESS_201')}
              >
                Trả Về 201 Created (Thành Công)
              </button>
              <button
                type="button"
                className={`btn ${serverMode === 'FAIL_400' ? 'btn-danger' : 'btn-outline'}`}
                style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
                onClick={() => setServerMode('FAIL_400')}
              >
                Trả Về 400 Bad Request (Trùng Email)
              </button>
              <button
                type="button"
                className={`btn ${serverMode === 'FAIL_500' ? 'btn-danger' : 'btn-outline'}`}
                style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
                onClick={() => setServerMode('FAIL_500')}
              >
                Trả Về 500 Server Error
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8rem' }}>
              <span>Độ trễ mạng:</span>
              <input
                type="range"
                min="200"
                max="3000"
                step="200"
                value={networkDelay}
                onChange={(e) => setNetworkDelay(Number(e.target.value))}
                style={{ flex: 1, accentColor: 'var(--primary)' }}
              />
              <span className="badge badge-cyan">{networkDelay}ms</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmitAsync)}>
            <div className="form-group">
              <label className="form-label">Họ và Tên Nhân Viên</label>
              <input
                className={`form-input ${errors.fullName ? 'is-invalid' : ''}`}
                {...register('fullName', { required: 'Họ tên không được để trống' })}
                disabled={isSubmitting}
              />
              {errors.fullName && <div className="error-feedback">⚠️ {errors.fullName.message}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Email Công Ty (workEmail)</label>
              <input
                className={`form-input ${errors.workEmail ? 'is-invalid' : ''}`}
                {...register('workEmail', {
                  required: 'Email bắt buộc phải có',
                  pattern: { value: /^\S+@\S+\.\S+$/, message: 'Email không hợp lệ' },
                })}
                disabled={isSubmitting}
              />
              {errors.workEmail && <div className="error-feedback">⚠️ {errors.workEmail.message}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Phòng Ban (department)</label>
              <select className="form-select" {...register('department')} disabled={isSubmitting}>
                <option value="ENGINEERING">Kỹ Thuật Phần Mềm (Engineering)</option>
                <option value="PRODUCT">Quản Trị Sản Phẩm (Product)</option>
                <option value="FINANCE">Tài Chính Kế Toán (Finance)</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '0.5rem' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⏳</span>
                  Đang Gửi Dữ Liệu Tới Spring Boot ({networkDelay}ms)...
                </>
              ) : (
                <>
                  <span>🚀</span> Gửi HTTP POST Request
                </>
              )}
            </button>
          </form>
        </div>

        {/* Server Response & Logs Inspector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Server Inspector */}
          <div className="mock-server">
            <div className="mock-server-header">
              <div className="mock-server-endpoint">
                <span className="http-badge-post">POST</span>
                <span>/api/v1/auth/register</span>
              </div>
              {apiResponse && (
                <span className={`badge ${apiResponse.statusCode < 300 ? 'badge-emerald' : 'badge-rose'}`}>
                  HTTP {apiResponse.statusCode} {apiResponse.statusText}
                </span>
              )}
            </div>

            <div className="mock-server-body">
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                📦 Gói Tin HTTP Phản Hồi Từ Backend (Response Packet):
              </span>
              <div className="code-block" style={{ fontSize: '0.78rem', minHeight: '160px' }}>
                {apiResponse ? (
                  <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
                ) : (
                  <span style={{ color: 'var(--text-muted)' }}>
                    // Server đang chờ request... Hãy bấm "Gửi HTTP POST Request" bên cạnh.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Network Activity Logs */}
          <div className="card" style={{ padding: '1rem', flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)' }}>
                📡 Network Trace Log (Trình Bắt Gói Tin Mạng)
              </span>
              <button
                type="button"
                className="btn btn-outline"
                style={{ fontSize: '0.7rem', padding: '0.2rem 0.4rem' }}
                onClick={() => setServerLogs([])}
              >
                Xóa
              </button>
            </div>
            <div className="log-terminal" style={{ maxHeight: '180px' }}>
              {serverLogs.length === 0 ? (
                <div style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Chưa có sự kiện mạng nào.</div>
              ) : (
                serverLogs.map((item) => (
                  <div key={item.id} className="log-entry">
                    <span className="log-time">[{item.time}]</span>
                    <span className={`log-type-${item.type}`}>{item.msg}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

