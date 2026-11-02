import React from 'react';

/**
 * CustomToggleSwitch - Pure Controlled Switch Component
 * Props: `checked` (boolean), `onToggle(boolean)` callback.
 */
export default function CustomToggleSwitch({
  checked = false,
  onToggle,
  onBlur,
  label = 'Bật tính năng',
  description = ''
}) {
  const handleKeyDown = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (onToggle) onToggle(!checked);
    }
  };

  return (
    <div
      className="custom-toggle-wrapper"
      onClick={() => onToggle && onToggle(!checked)}
      onBlur={onBlur}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="switch"
      aria-checked={checked}
    >
      <div className={`toggle-track ${checked ? 'checked' : ''}`}>
        <div className="toggle-thumb" />
      </div>

      <div>
        <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f8fafc' }}>
          {label}
        </div>
        {description && (
          <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.15rem' }}>
            {description}
          </div>
        )}
      </div>
    </div>
  );
}

