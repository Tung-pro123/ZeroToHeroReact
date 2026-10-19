export default function InfoBox({ type = 'info', title, children }) {
  const icons = {
    info: '💡',
    tip: '✨',
    warning: '⚠️',
  };

  return (
    <div className={`info-box ${type}`}>
      <div className="info-box-title">
        <span>{icons[type] || '💡'}</span>
        <span>{title}</span>
      </div>
      <div className="info-box-body">{children}</div>
    </div>
  );
}
