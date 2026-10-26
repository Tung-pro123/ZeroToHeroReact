import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [selectedTool, setSelectedTool] = useState('register');

  const tools = {
    register: {
      name: 'register',
      tag: 'Field Registration',
      color: '#ec4899',
      desc: 'Hàm đăng ký phần tử input vào hệ thống quản lý của RHF. Nhận vào field name (ví dụ: "email") và trả về các props cần thiết ({ name, ref, onChange, onBlur }).',
      code: '<input {...register("email")} />'
    },
    handleSubmit: {
      name: 'handleSubmit',
      tag: 'Submission Controller',
      color: '#8b5cf6',
      desc: 'Hàm bọc (Wrapper/Higher-Order Function) chặn sự kiện submit mặc định (e.preventDefault), kích hoạt validation, gom toàn bộ Form Data và truyền vào hàm onSubmit của bạn.',
      code: '<form onSubmit={handleSubmit(onSubmit)}>'
    },
    formState: {
      name: 'formState',
      tag: 'Form Metadata',
      color: '#38bdf8',
      desc: 'Object chứa toàn bộ thông tin siêu dữ liệu của form: errors, isDirty, isValid, isSubmitting, touchedFields, dirtyFields, submitCount. RHF dùng Proxy để chỉ re-render khi thuộc tính được truy cập thay đổi.',
      code: 'const { errors, isDirty, isSubmitting } = formState;'
    },
    reset: {
      name: 'reset',
      tag: 'Form Resetting',
      color: '#10b981',
      desc: 'Hàm thiết lập lại toàn bộ form về giá trị mặc định ban đầu hoặc giá trị mới, đồng thời dọn sạch các cờ trạng thái (isDirty = false, errors = {}).',
      code: 'reset({ email: "", password: "" });'
    },
    watch: {
      name: 'watch',
      tag: 'Value Subscription',
      color: '#f59e0b',
      desc: 'Hàm đăng ký lắng nghe sự thay đổi của một hoặc nhiều field cụ thể theo thời gian thực mà không làm ảnh hưởng các trường khác.',
      code: 'const currentEmail = watch("email");'
    },
    setValue: {
      name: 'setValue',
      tag: 'Programmatic Setter',
      color: '#34d399',
      desc: 'Hàm cập nhật giá trị của field bằng code JavaScript, có thể tùy chọn kích hoạt re-validate hoặc đánh dấu dirty.',
      code: 'setValue("email", "tung@gmail.com", { shouldValidate: true });'
    },
    getValues: {
      name: 'getValues',
      tag: 'Instant Reader',
      color: '#c084fc',
      desc: 'Đọc tức thời giá trị hiện tại của một hoặc toàn bộ field từ bộ nhớ của form mà hoàn toàn không kích hoạt re-render.',
      code: 'const allValues = getValues();'
    },
    control: {
      name: 'control',
      tag: 'Custom Components',
      color: '#fb7185',
      desc: 'Cầu nối điều khiển trung gian dành riêng cho các UI component phức tạp của bên thứ ba (như MUI Select, Ant Design DatePicker) qua <Controller />.',
      code: '<Controller name="role" control={control} render={...} />'
    }
  };

  return (
    <div>
      <div className="glass-card" style={{ borderLeft: '4px solid var(--accent-pink)' }}>
        <h2 className="card-title">
          <span>💖</span> useForm() — Trái Tim Của React Hook Form
        </h2>
        <p className="card-subtitle">
          <code>useForm()</code> là Hook trung tâm quan trọng nhất được thư viện cung cấp. 
          Khi được gọi, nó <strong>thiết lập một trạm điều hành quản lý form (Mission Control)</strong> và trả về một bộ công cụ hoàn chỉnh để Component tương tác với form.
        </p>

        {/* Destructuring Clarification */}
        <div style={{ background: '#03050e', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '1.75rem' }}>
          <div style={{ color: '#38bdf8', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.4rem' }}>
            💡 Bản chất của cú pháp destructuring:
          </div>
          <div className="code-box" style={{ margin: 0 }}>
            <span className="code-comment">// 1. Khởi tạo trạm điều hành</span><br />
            <span className="code-keyword">const</span> form = <span className="code-fn">useForm</span>();<br />
            <span className="code-comment">// form chứa: form.register, form.handleSubmit, form.formState, form.reset...</span><br /><br />
            <span className="code-comment">// 2. Destructuring chỉ là JavaScript thuần túy để code gọn hơn!</span><br />
            <span className="code-keyword">const</span> &#123; register, handleSubmit, formState &#125; = <span className="code-fn">useForm</span>();
          </div>
        </div>

        {/* Interactive Object Explorer */}
        <h3 style={{ fontSize: '1.15rem', color: '#f8fafc', fontWeight: 700, marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>🧰</span> Trạm Điều Hành useForm(): Bấm Vào Từng Công Cụ Để Khám Phá
        </h3>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          {Object.keys(tools).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedTool(key)}
              className={`btn btn-sm ${selectedTool === key ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontFamily: 'JetBrains Mono', fontSize: '0.85rem' }}
            >
              {key}()
            </button>
          ))}
        </div>

        {/* Tool Detail Box */}
        {tools[selectedTool] && (
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: `1px solid ${tools[selectedTool].color}55`, borderRadius: '12px', padding: '1.5rem', borderLeft: `5px solid ${tools[selectedTool].color}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ fontSize: '1.3rem', fontWeight: 800, fontFamily: 'JetBrains Mono', color: tools[selectedTool].color }}>
                  form.{tools[selectedTool].name}
                </span>
                <span className="badge" style={{ background: `${tools[selectedTool].color}22`, color: tools[selectedTool].color, border: `1px solid ${tools[selectedTool].color}44` }}>
                  {tools[selectedTool].tag}
                </span>
              </div>
            </div>

            <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              {tools[selectedTool].desc}
            </p>

            <div style={{ background: '#03050e', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)', fontFamily: 'JetBrains Mono', fontSize: '0.86rem', color: '#38bdf8' }}>
              {tools[selectedTool].code}
            </div>
          </div>
        )}
      </div>

      {/* The 2 Crucial Misconceptions */}
      <div className="glass-card">
        <h3 className="card-title">
          <span>🚫</span> Hai Hiểu Lầm Phổ Biến Cần Tránh Khi Tiếp Cận useForm()
        </h3>
        
        <div className="grid-2">
          <div style={{ background: 'rgba(244, 63, 94, 0.06)', border: '1px solid rgba(244, 63, 94, 0.3)', padding: '1.25rem', borderRadius: '10px' }}>
            <h4 style={{ color: '#fb7185', fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              1. useForm() KHÔNG tự tạo thẻ HTML &lt;form&gt;
            </h4>
            <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.5 }}>
              <code>useForm()</code> chỉ là Hook chứa logic quản lý form. Bạn vẫn phải tự viết thẻ <code>&lt;form onSubmit=&#123;...&#125;&gt;</code> trong JSX như bình thường.
            </p>
          </div>

          <div style={{ background: 'rgba(244, 63, 94, 0.06)', border: '1px solid rgba(244, 63, 94, 0.3)', padding: '1.25rem', borderRadius: '10px' }}>
            <h4 style={{ color: '#fb7185', fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              2. useForm() KHÔNG tự gửi API đến Backend
            </h4>
            <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.5 }}>
              RHF chỉ thu thập và xác thực dữ liệu. Khi dữ liệu đã hợp lệ, nó trao <code>data</code> cho hàm <code>onSubmit(data)</code>. 
              Việc gọi <code>fetch()</code> hay <code>axios.post()</code> đến Spring Boot là trách nhiệm của bạn.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Launch Cards */}
      <div className="grid-3">
        <div style={{ background: 'rgba(15, 20, 38, 0.8)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <h4 style={{ color: '#ec4899', marginBottom: '0.4rem' }}>🏛️ Bộ Ba Trụ Cột</h4>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1rem' }}>
            Khám phá mối liên hệ mật thiết giữa register, handleSubmit và formState.
          </p>
          <Link to="/triad-hub" className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
            Khám Phá Bộ Ba →
          </Link>
        </div>

        <div style={{ background: 'rgba(15, 20, 38, 0.8)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <h4 style={{ color: '#38bdf8', marginBottom: '0.4rem' }}>📊 Form Data vs State</h4>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1rem' }}>
            Phân biệt rạch ròi dữ liệu người dùng nhập và siêu dữ liệu cờ trạng thái form.
          </p>
          <Link to="/data-vs-state" className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
            Xem Form State Live →
          </Link>
        </div>

        <div style={{ background: 'rgba(15, 20, 38, 0.8)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <h4 style={{ color: '#10b981', marginBottom: '0.4rem' }}>⚙️ defaultValues Studio</h4>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1rem' }}>
            Thực hành cấu hình defaultValues và kết hợp hài hòa với React useState.
          </p>
          <Link to="/default-values" className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
            Mở Studio →
          </Link>
        </div>
      </div>
    </div>
  );
}
