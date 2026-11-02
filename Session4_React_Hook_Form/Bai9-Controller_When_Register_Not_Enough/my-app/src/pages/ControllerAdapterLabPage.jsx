import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import CustomRating from '../components/custom/CustomRating';
import CustomToggleSwitch from '../components/custom/CustomToggleSwitch';

export default function ControllerAdapterLabPage() {
  // Demo State thuần không dùng RHF để học viên thấy rõ component thuần
  const [standaloneRating, setStandaloneRating] = useState(2);
  const [standaloneToggle, setStandaloneToggle] = useState(false);

  // Form chính dùng React Hook Form
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty }
  } = useForm({
    defaultValues: {
      satisfactionRating: 0,
      enableNotifications: true,
      vipSupport: false
    }
  });

  const [submittedData, setSubmittedData] = useState(null);
  const watchedValues = watch();

  const onSubmit = (data) => {
    setSubmittedData(data);
  };

  return (
    <div className="lab1-container">
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">
              <span>🎛️</span> Lab 1: Bản Chất Adapter — Tích Hợp Rating & Toggle Switch
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '0.25rem' }}>
              Minh chứng: Custom component hoàn toàn độc lập, Controller chỉ là cầu nối ánh xạ prop hai chiều.
            </p>
          </div>
          <span className="badge badge-cyan">2-Way Data Flow Mapping</span>
        </div>

        {/* Comparison Callout */}
        <div className="callout callout-info">
          <span>💡</span>
          <div>
            <strong>Quan sát quan trọng:</strong> Cả <code>CustomRating</code> và <code>CustomToggleSwitch</code> được viết 100% bằng React thuần,
            không hề <code>import {'{ useForm }'}</code> bên trong. Chúng chỉ nhận <code>rating</code> / <code>onRatingChange</code> và <code>checked</code> / <code>onToggle</code>.
            Controller đứng bên ngoài làm adapter chuyển đổi <code>field.value</code> và <code>field.onChange</code>!
          </div>
        </div>

        <div className="grid-2">
          {/* Cột 1: RHF Form tích hợp qua Controller */}
          <form onSubmit={handleSubmit(onSubmit)} className="card" style={{ background: '#090d16', border: '1px solid #334155' }}>
            <h3 style={{ color: '#38bdf8', marginBottom: '1.25rem', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>📋</span> Form Khảo Sát Khách Hàng (Dùng Controller)
            </h3>

            {/* Custom Rating với Controller */}
            <div className="form-group">
              <Controller
                name="satisfactionRating"
                control={control}
                rules={{
                  validate: (val) => val > 0 || 'Vui lòng chọn ít nhất 1 sao để đánh giá!'
                }}
                render={({ field, fieldState }) => (
                  <div>
                    <CustomRating
                      rating={field.value}
                      onRatingChange={(newRating) => {
                        // Báo cho RHF biết giá trị mới
                        field.onChange(newRating);
                      }}
                      onBlur={field.onBlur}
                      invalid={Boolean(fieldState.error)}
                      label="1. Đánh giá chất lượng dịch vụ *"
                    />
                    {fieldState.error && (
                      <p className="error-text">⚠️ {fieldState.error.message}</p>
                    )}
                    <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginTop: '0.25rem' }}>
                      Mapping: <code>rating={'{field.value}'}</code> | <code>onRatingChange={'{field.onChange}'}</code>
                    </span>
                  </div>
                )}
              />
            </div>

            {/* Custom Switch 1 */}
            <div className="form-group" style={{ paddingTop: '0.5rem', borderTop: '1px solid #1e293b' }}>
              <Controller
                name="enableNotifications"
                control={control}
                render={({ field }) => (
                  <div>
                    <CustomToggleSwitch
                      checked={field.value}
                      onToggle={field.onChange}
                      onBlur={field.onBlur}
                      label="2. Nhận thông báo qua Email hàng tuần"
                      description="Nhận các bản cập nhật khóa học và tin tức công nghệ mới nhất"
                    />
                    <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginTop: '0.25rem' }}>
                      Mapping: <code>checked={'{field.value}'}</code> | <code>onToggle={'{field.onChange}'}</code>
                    </span>
                  </div>
                )}
              />
            </div>

            {/* Custom Switch 2 */}
            <div className="form-group" style={{ paddingTop: '0.5rem', borderTop: '1px solid #1e293b' }}>
              <Controller
                name="vipSupport"
                control={control}
                render={({ field }) => (
                  <CustomToggleSwitch
                    checked={field.value}
                    onToggle={field.onChange}
                    onBlur={field.onBlur}
                    label="3. Kích hoạt gói Hỗ Trợ VIP 1-on-1 (24/7)"
                    description="Được trực tiếp Mentor Senior giải đáp thắc mắc đồ án"
                  />
                )}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                <span>📤 Gửi Đánh Giá (Submit)</span>
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  reset();
                  setSubmittedData(null);
                }}
              >
                <span>🔄 Reset</span>
              </button>
            </div>
          </form>

          {/* Cột 2: Đối chứng với useState thuần & Visualizer */}
          <div>
            {/* Box đối chứng: Dùng useState thì KHÔNG CẦN Controller */}
            <div className="card" style={{ background: '#090d16', border: '1px solid #334155' }}>
              <div className="card-header" style={{ marginBottom: '0.75rem' }}>
                <h4 style={{ color: '#f59e0b', fontSize: '0.95rem', margin: 0 }}>
                  ⚛️ Đối Chứng: Dùng useState Thuần (Không Có Controller)
                </h4>
                <span className="badge badge-amber">No RHF Needed</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '1rem' }}>
                Nếu ứng dụng của bạn chỉ cần đổi state giao diện cục bộ mà không submit form, hãy nối thẳng với <code>useState</code>:
              </p>

              <div style={{ marginBottom: '1rem' }}>
                <CustomRating
                  rating={standaloneRating}
                  onRatingChange={setStandaloneRating}
                  label="Rating với useState:"
                />
              </div>

              <div>
                <CustomToggleSwitch
                  checked={standaloneToggle}
                  onToggle={setStandaloneToggle}
                  label="Toggle với useState"
                  description={`Trạng thái: ${standaloneToggle ? 'BẬT (true)' : 'TẮT (false)'}`}
                />
              </div>
            </div>

            {/* Inspector RHF Form State */}
            <div className="card" style={{ background: '#090d16', border: '1px solid #334155' }}>
              <h4 style={{ color: '#38bdf8', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                📡 Live Inspector: Dữ Liệu RHF Form
              </h4>
              <div className="preview-box">
                <div style={{ color: '#34d399', marginBottom: '0.4rem' }}>// Realtime Values trong RHF Store:</div>
                <div>isDirty: <span style={{ color: isDirty ? '#f59e0b' : '#64748b' }}>{String(isDirty)}</span></div>
                <div>satisfactionRating: <strong style={{ color: '#fbbf24' }}>{watchedValues.satisfactionRating} ⭐</strong></div>
                <div>enableNotifications: <strong style={{ color: '#38bdf8' }}>{String(watchedValues.enableNotifications)}</strong></div>
                <div>vipSupport: <strong style={{ color: '#ec4899' }}>{String(watchedValues.vipSupport)}</strong></div>
              </div>

              {submittedData && (
                <div style={{ marginTop: '1rem' }}>
                  <div style={{ color: '#10b981', fontWeight: 'bold', fontSize: '0.88rem', marginBottom: '0.3rem' }}>
                    ✅ Dữ Liệu Submit Thành Công:
                  </div>
                  <pre className="preview-box" style={{ color: '#a7f3d0' }}>
                    {JSON.stringify(submittedData, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

