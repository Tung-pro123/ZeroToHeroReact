export default function ColorBox({ colorName, hexCode }) {
  return (
    <div style={{
      padding: '1.25rem',
      borderRadius: '10px',
      background: hexCode,
      color: '#ffffff',
      textAlign: 'center',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    }}>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
        🎨 {colorName}
      </h3>
      <p style={{ fontFamily: 'monospace', fontSize: '0.95rem', opacity: 0.9 }}>
        Mã HEX: {hexCode}
      </p>
    </div>
  );
}
