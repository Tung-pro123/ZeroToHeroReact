// ========================================================================================
// FILE: src/components/challenges/ChallengeSection.jsx
// ========================================================================================
// LỜI GIẢI HOÀN CHỈNH CHO CẢ 3 BÀI TẬP THỬ THÁCH (CHALLENGES 1, 2, 3) CỦA BÀI 5 (REACT.DEV)
// ========================================================================================

import { getImageUrl } from '../../utils/imageUrl';
import Card from '../common/Card';

/**
 * Component Profile tái sử dụng chuẩn mực (Challenge 1 & 2)
 * Nhận đầy đủ các Props cần thiết, loại bỏ 100% mã nguồn trùng lặp!
 */
function Profile({
  name,
  imageId,
  profession,
  awards = [],
  discovery,
  imageSize = 70, // Giá trị mặc định là 70px
}) {
  // Challenge 2: Tự động điều chỉnh kích thước ảnh thumbnail theo prop imageSize
  const thumbnailType = imageSize < 90 ? 's' : 'b';

  return (
    <div className="profile-inner-content">
      <div className="profile-avatar-row">
        <img
          className="profile-avatar"
          src={getImageUrl({ imageId }, thumbnailType)}
          alt={name}
          width={imageSize}
          height={imageSize}
        />
        <div className="profile-heading">
          <h4 className="profile-name">{name}</h4>
          <span className="profile-profession">{profession}</span>
        </div>
      </div>

      <ul className="profile-details-list">
        <li>
          <strong>🏆 Giải thưởng ({awards.length}): </strong>
          <span>{awards.join(', ')}</span>
        </li>
        <li>
          <strong>🔬 Phát minh / Đóng góp: </strong>
          <span>{discovery}</span>
        </li>
      </ul>
    </div>
  );
}

/**
 * Component chính giải quyết trọn vẹn 3 Thử Thách
 */
export default function ChallengeSection() {
  return (
    <div className="demo-section">
      <div className="section-intro">
        <span className="badge-pill success">Mục 8: Lời Giải Các Bài Tập Thử Thách (Challenges)</span>
        <h2 className="section-title">Thực Hành 3 Thử Thách Từ react.dev</h2>
        <p className="section-desc">
          Kết hợp Component <code>&lt;Profile /&gt;</code> tái sử dụng (Challenge 1 & 2) 
          và đóng gói linh hoạt bên trong khung <code>&lt;Card&gt;</code> dùng prop <code>children</code> (Challenge 3).
        </p>
      </div>

      <div className="challenges-grid">
        {/* 
          CHALLENGE 3: Sử dụng <Card> làm khung bao bọc (Wrapper)
          và truyền Profile vào như là {children}!
        */}
        <Card 
          title="Nhà Khoa Học Đoạt Giải Nobel" 
          subtitle="Thử thách 1, 2 & 3 gộp lại hoàn chỉnh" 
          variant="indigo"
        >
          <Profile
            name="Maria Skłodowska-Curie"
            imageId="szV5sdG"
            imageSize={80} // < 90px -> tải ảnh nhỏ 's'
            profession="Nhà vật lý và hóa học"
            awards={[
              'Giải Nobel Vật lý',
              'Giải Nobel Hóa học',
              'Huy chương Davy',
              'Huy chương Matteucci'
            ]}
            discovery="Phát hiện hai nguyên tố phóng xạ polonium và radium"
          />
        </Card>

        <Card 
          title="Nhà Địa Hóa Học Tiên Phong" 
          subtitle="Thử thách 1, 2 & 3 gộp lại hoàn chỉnh" 
          variant="cyan"
        >
          <Profile
            name="Katsuko Saruhashi"
            imageId="YfeOqp2"
            imageSize={110} // > 90px -> tải ảnh to sắc nét 'b'
            profession="Nhà địa hóa học"
            awards={[
              'Giải thưởng Miyake về Địa hóa học',
              'Giải thưởng Tanaka'
            ]}
            discovery="Phát triển phương pháp đo nồng độ cacbon dioxit trong nước biển"
          />
        </Card>
      </div>
    </div>
  );
}
