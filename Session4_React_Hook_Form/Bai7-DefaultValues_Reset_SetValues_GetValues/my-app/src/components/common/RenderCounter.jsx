import React, { useRef } from 'react';

export default function RenderCounter({ name = 'Component' }) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.25rem',
        fontSize: '0.75rem',
        fontFamily: 'var(--font-mono)',
        padding: '0.2rem 0.5rem',
        borderRadius: '4px',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        color: 'var(--primary-light)',
        border: '1px solid rgba(59, 130, 246, 0.25)',
      }}
      title={`Số lần ${name} render lại`}
    >
      <span>⚡</span>
      <span>{name}: render #{renderCount.current}</span>
    </span>
  );
}

