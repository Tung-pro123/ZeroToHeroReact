// ========================================================================================
// FILE: src/components/props-basics/GalleryDemo.jsx
// ========================================================================================
// MỤC TIÊU: MINH HỌA COMPONENT CHA TRUYỀN PROPS ĐA DẠNG CHO NHIỀU COMPONENT CON
// ========================================================================================

import Avatar from './Avatar';
import Card from '../common/Card';

export default function GalleryDemo() {
  return (
    <div className="demo-section">
      <div className="section-intro">
        <span className="badge-pill">Mục 1 & 2 & 3: Truyền & Nhận Props Cơ Bản</span>
        <h2 className="section-title">Phòng Thí Nghiệm Props & Default Values</h2>
        <p className="section-desc">
          Quan sát cách Component cha truyền các đối tượng dữ liệu và số đo kích thước khác nhau. 
          Component con tự động điều chỉnh độ phân giải ảnh thumbnail theo Prop <code>size</code>.
        </p>
      </div>

      <div className="avatar-showcase-grid">
        {/* Trường hợp 1: size = 100 (> 90px -> Tải ảnh loại 'b' lớn) */}
        <Card title="Lin Lanying" subtitle="Nhà vật lý bán dẫn Trung Quốc" variant="cyan">
          <div className="avatar-card-inner">
            <Avatar
              person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }}
              size={100}
            />
            <div className="avatar-meta">
              <span className="meta-tag">Prop: size = 100</span>
              <span className="meta-info">Ảnh tải về: <code>1bX5QH6b.jpg</code> (ảnh to)</span>
            </div>
          </div>
        </Card>

        {/* Trường hợp 2: size = 70 (< 90px -> Tải ảnh loại 's' nhỏ để tiết kiệm 3G/4G) */}
        <Card title="Katsuko Saruhashi" subtitle="Nhà địa hóa học Nhật Bản" variant="indigo">
          <div className="avatar-card-inner">
            <Avatar
              person={{ name: 'Katsuko Saruhashi', imageId: 'YfeOqp2' }}
              size={70}
            />
            <div className="avatar-meta">
              <span className="meta-tag">Prop: size = 70</span>
              <span className="meta-info">Ảnh tải về: <code>YfeOqp2s.jpg</code> (ảnh nhỏ)</span>
            </div>
          </div>
        </Card>

        {/* Trường hợp 3: size = 120 (> 90px -> Tải ảnh to) */}
        <Card title="Aklilu Lemma" subtitle="Nhà nghiên cứu ký sinh trùng Ethiopia" variant="rose">
          <div className="avatar-card-inner">
            <Avatar
              person={{ name: 'Aklilu Lemma', imageId: 'OKS67lh' }}
              size={120}
            />
            <div className="avatar-meta">
              <span className="meta-tag">Prop: size = 120</span>
              <span className="meta-info">Ảnh tải về: <code>OKS67lhb.jpg</code> (ảnh to)</span>
            </div>
          </div>
        </Card>

        {/* Trường hợp 4: KHÔNG TRUYỀN GÌ CẢ -> Kích hoạt Default Values */}
        <Card title="Kích hoạt Default Values" subtitle="Không truyền person hay size" variant="default">
          <div className="avatar-card-inner">
            {/* Không truyền thuộc tính nào */}
            <Avatar />
            <div className="avatar-meta">
              <span className="meta-tag warning">Fallback Mặc Định</span>
              <span className="meta-info">size tự động = <code>100</code> (theo khai báo hàm)</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
