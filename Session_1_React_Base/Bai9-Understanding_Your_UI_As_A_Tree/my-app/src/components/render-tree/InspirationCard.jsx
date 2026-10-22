import { useState } from 'react';
import FancyText from './FancyText';
import ColorBox from './ColorBox';

const quotes = [
  "Mỗi dòng code sạch là một tác phẩm nghệ thuật.",
  "Đừng vội viết code khi chưa hiểu rõ cấu trúc dữ liệu.",
  "Tư duy dạng cây giúp bạn làm chủ mọi kiến trúc giao diện phức tạp.",
  "React render trong RAM trước khi chạm vào DOM thật."
];

const colors = [
  { name: 'Deep Space Blue', hex: '#1e3a8a' },
  { name: 'Emerald Forest', hex: '#065f46' },
  { name: 'Royal Amethyst', hex: '#581c87' },
  { name: 'Crimson Rose', hex: '#9f1239' }
];

export default function InspirationCard({ mode, setMode }) {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);

  const handleNext = () => {
    if (mode === 'quote') {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    } else {
      setColorIndex((prev) => (prev + 1) % colors.length);
    }
  };

  return (
    <div style={{
      background: 'rgba(15, 23, 42, 0.75)',
      padding: '1.5rem',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <h4 style={{ color: '#93c5fd', fontSize: '1.1rem' }}>
          💡 Component: <code>&lt;InspirationGenerator /&gt;</code>
        </h4>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className={`btn-secondary ${mode === 'quote' ? 'active' : ''}`}
            onClick={() => setMode('quote')}
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
          >
            Chế độ: Danh ngôn
          </button>
          <button
            className={`btn-secondary ${mode === 'color' ? 'active' : ''}`}
            onClick={() => setMode('color')}
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
          >
            Chế độ: Màu sắc
          </button>
        </div>
      </div>

      <div style={{ margin: '1rem 0' }}>
        {mode === 'quote' ? (
          <FancyText title="Cảm hứng lập trình" text={quotes[quoteIndex]} />
        ) : (
          <ColorBox colorName={colors[colorIndex].name} hexCode={colors[colorIndex].hex} />
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
        <button className="btn-primary" onClick={handleNext} style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
          Đổi nội dung tiếp theo 🔄
        </button>
      </div>
    </div>
  );
}
