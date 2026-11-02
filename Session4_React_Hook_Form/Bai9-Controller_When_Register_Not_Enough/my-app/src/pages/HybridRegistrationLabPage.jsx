import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import NativeForwardedInput from '../components/custom/NativeForwardedInput';
import CustomTagPicker from '../components/custom/CustomTagPicker';
import CustomColorSlider from '../components/custom/CustomColorSlider';
import CustomRating from '../components/custom/CustomRating';
import CustomToggleSwitch from '../components/custom/CustomToggleSwitch';

export default function HybridRegistrationLabPage() {
  const [submittedCandidate, setSubmittedCandidate] = useState(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      fullName: 'Hoàng Nhật Minh',
      email: 'minh.hoang@company.io',
      bio: 'Fullstack Engineer đam mê React và micro-frontends.',
      experienceLevel: 65,
      skills: ['React', 'TypeScript', 'Node.js'],
      englishProficiency: 4,
      openToRelocation: true
    }
  });

  const onSubmit = (data) => {
    // Giả lập async submit
    setSubmittedCandidate(data);
  };

  const currentValues = watch();

  return (
    <div className="lab2-container">
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">
              <span>🚀</span> Lab 2: Hybrid Form — Phối Hợp Nhịp Nhàng Giữa register() và Controller
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '0.25rem' }}>
              Kiến trúc chuẩn Enterprise: Dùng <code>register()</code> cho native & forwardRef inputs, dùng <code>Controller</code> cho complex custom UI.
            </p>
          </div>
          <span className="badge badge-emerald">Production Architecture</span>
        </div>

        <div className="callout callout-info">
          <span>🏆</span>
          <div>
            <strong>Triết lý Senior:</strong> Không bao giờ ép toàn bộ form dùng <code>Controller</code>.
            Những ô nhập thông thường hãy dùng <code>register()</code> để tối ưu tốc độ và giảm boilerplate code.
            Chỉ bật <code>Controller</code> khi component thực sự cần Adapter hai chiều!
          </div>
        </div>

        <div className="grid-2">
          {/* Hybrid Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="card" style={{ background: '#090d16', border: '1px solid #334155' }}>
            <h3 style={{ color: '#38bdf8', marginBottom: '1.25rem', fontSize: '1.1rem' }}>
              🧑‍💻 Hồ Sơ Ứng Tuyển Senior Software Engineer
            </h3>

            {/* PHẦN 1: Dùng register() với Native Input */}
            <div style={{ padding: '1rem', background: 'rgba(56, 189, 248, 0.04)', borderRadius: '8px', border: '1px dashed #0284c7', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#38bdf8' }}>
                  📌 NHÓM 1: Dùng register("...") Trực Tiếp
                </span>
                <span className="badge badge-cyan">Zero Boilerplate</span>
              </div>

              <div className="form-group">
                <label className="form-label">Họ và tên ứng viên *</label>
                <input
                  type="text"
                  className={`form-input ${errors.fullName ? 'error' : ''}`}
                  placeholder="Nhập họ và tên..."
                  {...register('fullName', { required: 'Vui lòng nhập họ và tên' })}
                />
                {errors.fullName && <p className="error-text">⚠️ {errors.fullName.message}</p>}
              </div>

              {/* Dùng NativeForwardedInput (chứng minh custom component có forwardRef vẫn dùng register được!) */}
              <NativeForwardedInput
                label="Email công việc * (Custom component có forwardRef)"
                helperText="Custom component nhưng forward ref xuống thẻ input -> Vẫn dùng {...register()} tốt!"
                type="email"
                placeholder="developer@example.com"
                error={errors.email}
                {...register('email', {
                  required: 'Email là bắt buộc',
                  pattern: { value: /^\S+@\S+$/i, message: 'Định dạng email không hợp lệ' }
                })}
              />

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Tóm tắt kinh nghiệm (Bio)</label>
                <textarea
                  rows={2}
                  className="form-textarea"
                  placeholder="Giới thiệu đôi nét về bản thân..."
                  {...register('bio')}
                />
              </div>
            </div>

            {/* PHẦN 2: Dùng Controller với Complex UI */}
            <div style={{ padding: '1rem', background: 'rgba(168, 85, 247, 0.04)', borderRadius: '8px', border: '1px dashed #a855f7', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#c084fc' }}>
                  🎛️ NHÓM 2: Dùng Controller (Custom UI & Complex State)
                </span>
                <span className="badge badge-purple">Controlled Adapter</span>
              </div>

              {/* Tag Picker */}
              <div className="form-group">
                <Controller
                  name="skills"
                  control={control}
                  rules={{
                    validate: (tags) => (tags && tags.length >= 2) || 'Vui lòng chọn ít nhất 2 kỹ năng chuyên môn!'
                  }}
                  render={({ field, fieldState }) => (
                    <div>
                      <CustomTagPicker
                        tags={field.value}
                        onTagsChange={field.onChange}
                        onBlur={field.onBlur}
                        invalid={Boolean(fieldState.error)}
                        label="Kỹ năng công nghệ (Tags) *"
                      />
                      {fieldState.error && <p className="error-text">⚠️ {fieldState.error.message}</p>}
                    </div>
                  )}
                />
              </div>

              {/* Color Slider */}
              <div className="form-group" style={{ marginTop: '1.25rem' }}>
                <Controller
                  name="experienceLevel"
                  control={control}
                  render={({ field }) => (
                    <CustomColorSlider
                      sliderValue={field.value}
                      onSlide={field.onChange}
                      onBlur={field.onBlur}
                      min={10}
                      max={100}
                      step={5}
                      label="Mức độ tự tin kiến trúc hệ thống"
                      unit="pts"
                    />
                  )}
                />
              </div>

              {/* Star Rating */}
              <div className="form-group" style={{ marginTop: '1.25rem' }}>
                <Controller
                  name="englishProficiency"
                  control={control}
                  render={({ field }) => (
                    <CustomRating
                      rating={field.value}
                      onRatingChange={field.onChange}
                      onBlur={field.onBlur}
                      label="Trình độ tiếng Anh giao tiếp"
                    />
                  )}
                />
              </div>

              {/* Toggle Switch */}
              <div className="form-group" style={{ marginTop: '1.25rem', marginBottom: 0 }}>
                <Controller
                  name="openToRelocation"
                  control={control}
                  render={({ field }) => (
                    <CustomToggleSwitch
                      checked={field.value}
                      onToggle={field.onChange}
                      onBlur={field.onBlur}
                      label="Sẵn sàng Onsite / Relocation nước ngoài (Singapore, Nhật Bản, Châu Âu)"
                    />
                  )}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={isSubmitting}>
                <span>💾 Nộp Hồ Sơ Ứng Tuyển</span>
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  reset();
                  setSubmittedCandidate(null);
                }}
              >
                <span>🔄 Reset</span>
              </button>
            </div>
          </form>

          {/* Right Column: Live Data & Analysis */}
          <div>
            <div className="card" style={{ background: '#090d16', border: '1px solid #334155' }}>
              <h4 style={{ color: '#38bdf8', marginBottom: '0.75rem', fontSize: '1rem' }}>
                📊 RHF Store Kết Hợp Nhất Quán
              </h4>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '1rem' }}>
                Khi gọi <code>handleSubmit</code>, RHF tự động gom toàn bộ giá trị từ cả <code>register()</code> lẫn <code>Controller</code> thành một Object phẳng duy nhất:
              </p>

              <div className="preview-box">
                <div style={{ color: '#34d399', marginBottom: '0.4rem' }}>// Realtime State:</div>
                <div>fullName: <span style={{ color: '#38bdf8' }}>"{currentValues.fullName}"</span></div>
                <div>email: <span style={{ color: '#38bdf8' }}>"{currentValues.email}"</span></div>
                <div>skills: <span style={{ color: '#c084fc' }}>{JSON.stringify(currentValues.skills)}</span></div>
                <div>experienceLevel: <span style={{ color: '#f59e0b' }}>{currentValues.experienceLevel} pts</span></div>
                <div>englishProficiency: <span style={{ color: '#fbbf24' }}>{currentValues.englishProficiency} ⭐</span></div>
                <div>openToRelocation: <span style={{ color: '#10b981' }}>{String(currentValues.openToRelocation)}</span></div>
              </div>

              {submittedCandidate && (
                <div style={{ marginTop: '1.25rem' }}>
                  <div style={{ color: '#10b981', fontWeight: 'bold', fontSize: '0.88rem', marginBottom: '0.3rem' }}>
                    🎉 Payload Đã Nộp Thành Công (onSubmit):
                  </div>
                  <pre className="preview-box" style={{ color: '#a7f3d0' }}>
                    {JSON.stringify(submittedCandidate, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            <div className="callout callout-warning">
              <span>⚠️</span>
              <div>
                <strong>Cảnh báo Double Registration:</strong> Tuyệt đối không bao giờ viết:
                <br />
                <code>&lt;input {'{...field}'} {'{...register("field")}'} /&gt;</code>
                <br />
                Điều này đăng ký 1 ô input hai lần vào RHF, gây xung đột event và làm mất đồng bộ dữ liệu.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

