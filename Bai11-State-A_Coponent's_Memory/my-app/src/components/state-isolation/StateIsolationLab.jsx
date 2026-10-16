import { useState } from 'react';
import InfoBox from '../common/InfoBox';

const sculptureList = [
  {
    name: 'Hokusai - Đại Hải Trình',
    artist: 'Katsushika Hokusai',
    description: 'Một trong những bức tranh khắc gỗ kinh điển nhất của nghệ thuật Nhật Bản.',
    url: '🌊',
    color: '#0284c7'
  },
  {
    name: 'Nữ Thần Tự Do',
    artist: 'Frédéric Auguste Bartholdi',
    description: 'Tác phẩm điêu khắc bằng đồng khổng lồ biểu tượng cho tự do và tình hữu nghị.',
    url: '🗽',
    color: '#059669'
  },
  {
    name: 'Bức Tượng David',
    artist: 'Michelangelo',
    description: 'Kiệt tác điêu khắc thời Phục hưng mô tả người anh hùng Kinh Thánh David.',
    url: '🗿',
    color: '#7c3aed'
  }
];

// Component Độc Lập
function GalleryCard({ galleryId, title }) {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  const hasNext = index < sculptureList.length - 1;
  const hasPrev = index > 0;

  const handleNext = () => {
    if (hasNext) setIndex(index + 1);
  };

  const handlePrev = () => {
    if (hasPrev) setIndex(index - 1);
  };

  const currentSculpture = sculptureList[index];

  return (
    <div style={{
      background: 'rgba(30, 41, 59, 0.75)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '14px',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ color: '#c084fc', fontSize: '1.05rem', fontWeight: 700 }}>{title}</h4>
        <span className="badge badge-react" style={{ fontSize: '0.72rem' }}>
          Trang {index + 1} / {sculptureList.length}
        </span>
      </div>

      <div style={{
        background: currentSculpture.color,
        borderRadius: '10px',
        padding: '2rem',
        textAlign: 'center',
        fontSize: '3rem',
        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3)'
      }}>
        {currentSculpture.url}
      </div>

      <div>
        <h5 style={{ fontSize: '1.1rem', color: '#f3f4f6', fontWeight: 700 }}>
          {currentSculpture.name}
        </h5>
        <p style={{ fontSize: '0.88rem', color: '#9ca3af', fontStyle: 'italic' }}>
          Tác giả: {currentSculpture.artist}
        </p>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button
          className="btn-secondary"
          onClick={handlePrev}
          disabled={!hasPrev}
          style={{ flex: 1, padding: '0.45rem', fontSize: '0.85rem' }}
        >
          ⬅️ Trang Trước
        </button>
        <button
          className="btn-primary"
          onClick={handleNext}
          disabled={!hasNext}
          style={{ flex: 1, padding: '0.45rem', fontSize: '0.85rem' }}
        >
          Trang Kế ➡️
        </button>
      </div>

      <div>
        <button
          className="btn-secondary"
          onClick={() => setShowMore(!showMore)}
          style={{ width: '100%', fontSize: '0.82rem', padding: '0.4rem' }}
        >
          {showMore ? 'Ẩn bớt chi tiết 🔼' : 'Xem thêm giới thiệu 🔽'}
        </button>
        {showMore && (
          <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5, padding: '0.5rem', background: 'rgba(0,0,0,0.3)', borderRadius: '6px' }}>
            {currentSculpture.description}
          </p>
        )}
      </div>
    </div>
  );
}

export default function StateIsolationLab() {
  return (
    <div className="lab-card">
      <div className="card-header">
        <div>
          <h2 className="card-title">🎭 Tính Độc Lập Và Riêng Tư Của State (State Isolation)</h2>
          <p className="card-desc">
            Mỗi thể hiện (instance) của Component trên màn hình được React cấp phát một vùng nhớ State độc lập hoàn toàn. 
            Tương tác ở bản sao này không làm xáo trộn bản sao kia.
          </p>
        </div>
      </div>

      <div className="grid-2">
        <GalleryCard galleryId="A" title="🏛️ Phòng Trưng Bày 1 (Hà Nội)" />
        <GalleryCard galleryId="B" title="🏛️ Phòng Trưng Bày 2 (TP. Hồ Chí Minh)" />
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <InfoBox type="spring" title="Đối chiếu Spring Prototype Scope">
          Tương tự như các Bean có <code>@Scope("prototype")</code> trong Spring Framework: Mỗi lần Spring khởi tạo một instance, 
          nó tạo một vùng nhớ riêng biệt trong Heap. Trong React, việc bạn render 2 lần thẻ <code>&lt;GalleryCard /&gt;</code> 
          khiến React tạo 2 mảng State riêng biệt, đảm bảo tính đóng gói (Encapsulation) tuyệt đối!
        </InfoBox>
      </div>
    </div>
  );
}
