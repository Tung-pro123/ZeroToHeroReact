import { useState, useRef, forwardRef } from 'react';

export default function DomChallenges() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="tab-pane">
      <div className="lab-card">
        <div className="lab-header">
          <h2 className="lab-title">🎯 React.dev Official Challenges (4 Bài Tập Chính Thức)</h2>
          <p className="lab-desc">
            Lời giải chuẩn xác và tối ưu cho toàn bộ thử thách của chuyên đề <strong>Manipulating the DOM with Refs</strong>.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <button
            className={`btn ${activeTab === 1 ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab(1)}
          >
            Thử Thách 1: Play & Pause Video
          </button>
          <button
            className={`btn ${activeTab === 2 ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab(2)}
          >
            Thử Thách 2: Focus Ô Tìm Kiếm
          </button>
          <button
            className={`btn ${activeTab === 3 ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab(3)}
          >
            Thử Thách 3: Image Carousel Scroll
          </button>
          <button
            className={`btn ${activeTab === 4 ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab(4)}
          >
            Thử Thách 4: Focus Với forwardRef
          </button>
        </div>

        {activeTab === 1 && <Challenge1 />}
        {activeTab === 2 && <Challenge2 />}
        {activeTab === 3 && <Challenge3 />}
        {activeTab === 4 && <Challenge4 />}
      </div>
    </div>
  );
}

// Challenge 1: Play and pause the video
function Challenge1() {
  const [isPlaying, setIsPlaying] = useState(false);
  const ref = useRef(null);

  function handleClick() {
    const nextIsPlaying = !isPlaying;
    setIsPlaying(nextIsPlaying);
    if (nextIsPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  return (
    <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
      <h3 style={{ color: '#38bdf8', marginBottom: '0.5rem' }}>Thử thách 1: Play and pause the video</h3>
      <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '1rem' }}>
        Tạo nút bấm duy nhất để chuyển đổi trạng thái Play / Pause của thẻ video.
      </p>

      <div style={{ maxWidth: '400px' }}>
        <video
          ref={ref}
          width="100%"
          loop
          playsInline
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          style={{ borderRadius: '8px', display: 'block', marginBottom: '1rem' }}
        />
        <button className={`btn ${isPlaying ? 'btn-danger' : 'btn-primary'}`} onClick={handleClick}>
          {isPlaying ? '⏸️ Tạm Dừng' : '▶️ Phát Video'}
        </button>
      </div>
    </div>
  );
}

// Challenge 2: Focus the search input
function Challenge2() {
  const inputRef = useRef(null);

  return (
    <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
      <h3 style={{ color: '#38bdf8', marginBottom: '0.5rem' }}>Thử thách 2: Focus the search input</h3>
      <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '1rem' }}>
        Khi người dùng bấm nút "Tìm kiếm", con trỏ chuột phải tự động nhảy vào ô input.
      </p>

      <div style={{ display: 'flex', gap: '0.75rem', maxWidth: '500px' }}>
        <input
          ref={inputRef}
          placeholder="Nhập nội dung cần tìm..."
          style={{
            flex: 1,
            padding: '0.65rem 1rem',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.2)',
            background: '#090d16',
            color: '#fff',
          }}
        />
        <button className="btn btn-primary" onClick={() => inputRef.current.focus()}>
          🔍 Tìm kiếm
        </button>
      </div>
    </div>
  );
}

// Challenge 3: Scrolling an image carousel
function Challenge3() {
  const [index, setIndex] = useState(0);
  const imagesRef = useRef(new Map());

  const IMAGES = [
    'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=300&q=80',
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=300&q=80',
    'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&q=80',
  ];

  function handleNext() {
    const nextIndex = (index + 1) % IMAGES.length;
    setIndex(nextIndex);
    const node = imagesRef.current.get(nextIndex);
    if (node) {
      node.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  return (
    <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
      <h3 style={{ color: '#38bdf8', marginBottom: '0.5rem' }}>Thử thách 3: Scrolling an image carousel</h3>
      <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '1rem' }}>
        Bấm nút Next để tự động cuộn mượt đến bức ảnh tiếp theo.
      </p>

      <button className="btn btn-primary" onClick={handleNext} style={{ marginBottom: '1rem' }}>
        ➡️ Ảnh Tiếp Theo (Hiện tại: #{index + 1})
      </button>

      <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', padding: '1rem 0' }}>
        {IMAGES.map((img, i) => (
          <img
            key={i}
            ref={(node) => {
              if (node) imagesRef.current.set(i, node);
              else imagesRef.current.delete(i);
            }}
            src={img}
            alt=""
            style={{
              width: '260px',
              height: '160px',
              objectFit: 'cover',
              borderRadius: '10px',
              border: index === i ? '3px solid #38bdf8' : '1px solid rgba(255,255,255,0.1)',
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Challenge 4: Focus the search input with separate components
const SearchInput = forwardRef(function SearchInput(props, ref) {
  return (
    <input
      ref={ref}
      placeholder="Ô tìm kiếm đóng gói trong component con..."
      style={{
        width: '100%',
        padding: '0.65rem 1rem',
        borderRadius: '8px',
        border: '1px solid rgba(255,255,255,0.2)',
        background: '#090d16',
        color: '#fff',
      }}
    />
  );
});

function Challenge4() {
  const searchRef = useRef(null);

  return (
    <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
      <h3 style={{ color: '#38bdf8', marginBottom: '0.5rem' }}>Thử thách 4: Focus ô input giữa 2 component khác nhau (forwardRef)</h3>
      <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '1rem' }}>
        Ô <code>&lt;SearchInput /&gt;</code> được viết thành một component riêng biệt. Dùng <code>forwardRef</code> để cho phép Component cha truyền ref vào.
      </p>

      <div style={{ display: 'flex', gap: '0.75rem', maxWidth: '520px' }}>
        <SearchInput ref={searchRef} />
        <button className="btn btn-primary" onClick={() => searchRef.current.focus()}>
          🎯 Focus
        </button>
      </div>
    </div>
  );
}
