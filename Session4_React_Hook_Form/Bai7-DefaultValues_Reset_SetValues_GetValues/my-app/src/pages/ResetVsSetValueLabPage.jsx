import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import RenderCounter from '../components/common/RenderCounter';

const INITIAL_DEFAULTS = {
  city: 'Hà Nội',
  postalCode: '10000',
  shippingSpeed: 'STANDARD',
};

export default function ResetVsSetValueLabPage() {
  const [optionConfig, setOptionConfig] = useState({
    shouldValidate: true,
    shouldDirty: true,
    shouldTouch: false,
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isDirty, dirtyFields, touchedFields, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: INITIAL_DEFAULTS,
  });

  const watchedValues = watch();

  // Test Set Value
  const handleSetCityOnly = (newCityName) => {
    setValue('city', newCityName, {
      shouldValidate: optionConfig.shouldValidate,
      shouldDirty: optionConfig.shouldDirty,
      shouldTouch: optionConfig.shouldTouch,
    });
  };

  const handleResetToDefaults = () => {
    reset(INITIAL_DEFAULTS);
  };

  const handleReinitializeWithNewBaseline = () => {
    // Reinitialize toàn bộ form với một baseline mới
    const newBaseline = {
      city: 'Đà Nẵng',
      postalCode: '55000',
      shippingSpeed: 'EXPRESS',
    };
    reset(newBaseline);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div className="card">
        <div className="card-header">
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-purple">PROGRAMMATIC MUTATION</span>
              <span className="badge badge-cyan">OPTIONS DEEP DIVE</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>
              Giải Phẫu setValue() Kèm Options vs Sức Mạnh Của reset()
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Hiểu rõ cách code can thiệp thay đổi trường bằng <code>setValue("field", value, {'{ shouldDirty, shouldValidate, shouldTouch }'})</code> 
              và đối chiếu với hành vi tái lập baseline của <code>reset()</code>.
            </p>
          </div>
          <RenderCounter name="ResetVsSetValueLabPage" />
        </div>
      </div>

      {/* Options Configurator */}
      <div className="card" style={{ borderColor: 'var(--primary)' }}>
        <div className="card-header">
          <div className="card-title" style={{ fontSize: '1rem' }}>
            <span>⚙️</span> Cấu Hình Options Khi Gọi setValue("city", newCity)
          </div>
          <span className="badge badge-indigo">Interactive Options</span>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem' }}>
            <input
              type="checkbox"
              checked={optionConfig.shouldDirty}
              onChange={(e) => setOptionConfig((prev) => ({ ...prev, shouldDirty: e.target.checked }))}
              style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }}
            />
            <span><code>shouldDirty: {String(optionConfig.shouldDirty)}</code> (Cập nhật isDirty &amp; dirtyFields)</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem' }}>
            <input
              type="checkbox"
              checked={optionConfig.shouldValidate}
              onChange={(e) => setOptionConfig((prev) => ({ ...prev, shouldValidate: e.target.checked }))}
              style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }}
            />
            <span><code>shouldValidate: {String(optionConfig.shouldValidate)}</code> (Kích hoạt thẩm định lại)</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem' }}>
            <input
              type="checkbox"
              checked={optionConfig.shouldTouch}
              onChange={(e) => setOptionConfig((prev) => ({ ...prev, shouldTouch: e.target.checked }))}
              style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }}
            />
            <span><code>shouldTouch: {String(optionConfig.shouldTouch)}</code> (Đánh dấu touchedFields)</span>
          </label>
        </div>
      </div>

      {/* Main Grid: Form & Action Buttons & Inspector */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
        {/* Form Container */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <span>🚚</span> Form Giao Hàng &amp; Địa Chỉ
            </div>
            <div style={{ display: 'flex', gap: '0.3rem' }}>
              <span className={`status-pill ${isDirty ? 'status-pill-true' : 'status-pill-false'}`}>
                isDirty: {isDirty ? 'YES' : 'NO'}
              </span>
              <span className={`status-pill ${isValid ? 'status-pill-true' : 'status-pill-false'}`}>
                isValid: {isValid ? 'YES' : 'NO'}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit(() => {})}>
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">
                  Tỉnh / Thành Phố <span className="required">* (Tối thiểu 3 ký tự)</span>
                </label>
                {dirtyFields.city && <span className="status-pill status-pill-true">dirty</span>}
              </div>
              <input
                className={`form-input ${errors.city ? 'is-invalid' : ''}`}
                {...register('city', {
                  required: 'Thành phố không được để trống',
                  minLength: { value: 3, message: 'Tên thành phố phải từ 3 ký tự trở lên' },
                })}
              />
              {errors.city && <div className="error-feedback">⚠️ {errors.city.message}</div>}
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">
                  Mã Bưu Điện (Postal Code) <span className="required">* (5 chữ số)</span>
                </label>
                {dirtyFields.postalCode && <span className="status-pill status-pill-true">dirty</span>}
              </div>
              <input
                className={`form-input ${errors.postalCode ? 'is-invalid' : ''}`}
                {...register('postalCode', {
                  required: 'Mã bưu điện là bắt buộc',
                  pattern: { value: /^\d{5}$/, message: 'Mã bưu điện phải gồm đúng 5 chữ số' },
                })}
              />
              {errors.postalCode && <div className="error-feedback">⚠️ {errors.postalCode.message}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Phương Thức Vận Chuyển</label>
              <select className="form-select" {...register('shippingSpeed')}>
                <option value="STANDARD">Giao Tiết Kiệm (Standard - 3 ngày)</option>
                <option value="EXPRESS">Giao Hỏa Tốc (Express - 24h)</option>
                <option value="SAMEDAY">Giao Trong Ngày (Same Day - 4h)</option>
              </select>
            </div>
          </form>

          {/* Quick Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: '1rem' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '700' }}>
              THAO TÁC BẰNG CODE (PROGRAMMATIC CALLS):
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <button
                type="button"
                className="btn btn-primary"
                style={{ fontSize: '0.75rem', padding: '0.4rem' }}
                onClick={() => handleSetCityOnly('TP. Hồ Chí Minh')}
              >
                Gán "TP. Hồ Chí Minh" (setValue)
              </button>

              <button
                type="button"
                className="btn btn-outline"
                style={{ fontSize: '0.75rem', padding: '0.4rem' }}
                onClick={() => handleSetCityOnly('HN')} // Cố tình gây lỗi minLength < 3 để test shouldValidate
              >
                Gán "HN" (Test shouldValidate)
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <button
                type="button"
                className="btn btn-outline"
                style={{ fontSize: '0.75rem', padding: '0.4rem' }}
                onClick={handleResetToDefaults}
              >
                reset() về Default Ban Đầu
              </button>

              <button
                type="button"
                className="btn btn-outline"
                style={{ fontSize: '0.75rem', padding: '0.4rem', borderColor: 'var(--accent-cyan)', color: 'var(--accent-cyan)' }}
                onClick={handleReinitializeWithNewBaseline}
              >
                reset(newBaseline: Đà Nẵng)
              </button>
            </div>
          </div>
        </div>

        {/* Live Diagnostics Inspector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* formState Inspector */}
          <div className="card">
            <div className="card-header">
              <div className="card-title" style={{ fontSize: '1rem' }}>
                <span>🔍</span> Trạng Thái formState Sau Thao Tác
              </div>
            </div>

            <div className="inspector-panel" style={{ minHeight: '170px' }}>
              <pre>{JSON.stringify({
                isDirty,
                isValid,
                dirtyFields,
                touchedFields,
                errors: Object.keys(errors).reduce((acc, k) => ({ ...acc, [k]: errors[k]?.message }), {}),
              }, null, 2)}</pre>
            </div>
          </div>

          {/* Current Form Values Inspector */}
          <div className="card" style={{ flex: 1 }}>
            <div className="card-header">
              <div className="card-title" style={{ fontSize: '1rem' }}>
                <span>📦</span> Giá Trị Form Hiện Tại (watchedValues)
              </div>
            </div>

            <div className="inspector-panel" style={{ minHeight: '120px' }}>
              <pre>{JSON.stringify(watchedValues, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

