export default function InfoBox({ type = 'tip', title, children }) {
  const icons = {
    tip: '💡',
    danger: '⚠️',
    info: 'ℹ️',
    warning: '⚡',
  };

  return (
    <div className={`info-box ${type}`}>
      <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>{icons[type]}</span>
      <div style={{ flex: 1 }}>
        {title && (
          <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{title}</div>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
}
