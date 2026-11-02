import React from 'react';

/**
 * NativeForwardedInput - Custom Component nhưng hỗ trợ forwardRef
 * Chứng minh: KHÔNG PHẢI CỨ CUSTOM COMPONENT LÀ CẦN CONTROLLER!
 * Nếu component forward đúng ref và props xuống native input, {...register('field')} chạy hoàn hảo!
 */
const NativeForwardedInput = React.forwardRef(function NativeForwardedInput(
  { label, error, helperText, ...restProps },
  ref
) {
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <input
        ref={ref}
        className={`form-input ${error ? 'error' : ''}`}
        {...restProps}
      />
      {helperText && !error && (
        <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginTop: '0.25rem' }}>
          {helperText}
        </span>
      )}
      {error && <p className="error-text">⚠️ {error.message || 'Trường này không hợp lệ'}</p>}
    </div>
  );
});

export default NativeForwardedInput;

