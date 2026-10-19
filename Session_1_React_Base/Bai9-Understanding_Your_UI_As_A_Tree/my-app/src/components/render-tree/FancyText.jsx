export default function FancyText({ title, text }) {
  return (
    <div style={{
      padding: '1.25rem',
      borderRadius: '10px',
      background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(99, 102, 241, 0.15))',
      border: '1px solid rgba(56, 189, 248, 0.3)',
      textAlign: 'center'
    }}>
      <h3 style={{ color: '#38bdf8', fontSize: '1.1rem', marginBottom: '0.4rem' }}>{title}</h3>
      <p style={{ fontStyle: 'italic', color: '#f3f4f6', fontSize: '1.05rem' }}>"{text}"</p>
    </div>
  );
}
