export default function InfoBox({ type = 'info', title, children }) {
  const isSpring = type === 'spring';
  return (
    <div className={isSpring ? 'spring-callout' : 'info-callout'}>
      {title && (
        <div style={{ fontWeight: 700, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span>{isSpring ? '☕' : '💡'}</span>
          <span>{title}</span>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}
