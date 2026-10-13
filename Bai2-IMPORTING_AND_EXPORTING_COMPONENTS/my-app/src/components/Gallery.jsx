// ============================================================================
// FILE: src/components/Gallery.jsx
// MỤC TIÊU: Minh họa việc IMPORT component con từ file khác và DEFAULT EXPORT
// ĐỐI CHIẾU JAVA: Giống như một Service/Controller import một Model/Component
//                 import com.example.models.Profile;
//                 public class GalleryService { ... }
// ============================================================================

import Profile from './Profile';

export default function Gallery() {
  const scientists = [
    {
      name: "Alan L. Hart",
      imageUrl: "https://i.imgur.com/QIrZWGIs.jpg",
      profession: "Bác sĩ X-quang & Nhà văn",
      awards: "Tiên phong tầm soát bệnh lao",
      discovery: "Sử dụng phim X-quang ngực lưu động"
    },
    {
      name: "Maria Skłodowska-Curie",
      imageUrl: "https://i.imgur.com/szV5sdGs.jpg",
      profession: "Nhà vật lý & Hóa học",
      awards: "2 giải Nobel (Vật lý & Hóa học)",
      discovery: "Tìm ra nguyên tố Poloni và Radi"
    },
    {
      name: "Katsuko Saruhashi",
      imageUrl: "https://i.imgur.com/YfeOqp2s.jpg",
      profession: "Nhà hóa học địa chất",
      awards: "Giải thưởng Miyake về Hóa học địa chất",
      discovery: "Phương pháp đo CO2 trong nước biển"
    }
  ];

  return (
    <section className="gallery-container">
      <div className="gallery-header">
        <h2 className="gallery-title">Bộ Sưu Tập: Các Nhà Khoa Học Lỗi Lạc</h2>
        <p className="gallery-subtitle">
          (Được cấu thành từ component <code>Profile.jsx</code> được nạp vào qua <code>import Profile from './Profile'</code>)
        </p>
      </div>
      <div className="gallery-grid">
        {scientists.map((scientist, idx) => (
          <Profile
            key={idx}
            name={scientist.name}
            imageUrl={scientist.imageUrl}
            profession={scientist.profession}
            awards={scientist.awards}
            discovery={scientist.discovery}
          />
        ))}
      </div>
    </section>
  );
}
