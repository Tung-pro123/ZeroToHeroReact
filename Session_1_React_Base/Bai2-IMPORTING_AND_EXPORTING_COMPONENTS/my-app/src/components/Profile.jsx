// ============================================================================
// FILE: src/components/Profile.jsx
// MỤC TIÊU: Minh họa DEFAULT EXPORT cho một component độc lập
// ĐỐI CHIẾU JAVA: Tương đương với file Profile.java chỉ chứa duy nhất
//                 1 public class Profile {}
// ============================================================================

export default function Profile({ 
  name = "Alan L. Hart", 
  imageUrl = "https://i.imgur.com/QIrZWGIs.jpg", 
  profession = "Bác sĩ X-quang & Nhà văn",
  awards = "Tiên phong tầm soát lao bằng X-quang",
  discovery = "Kỹ thuật X-quang ngực lưu động"
}) {
  return (
    <div className="profile-card">
      <div className="profile-image-wrapper">
        <img
          className="profile-avatar"
          src={imageUrl}
          alt={name}
        />
        <span className="profile-tag">Nhà khoa học</span>
      </div>
      <div className="profile-info">
        <h3 className="profile-name">{name}</h3>
        <p className="profile-profession">{profession}</p>
        <ul className="profile-details">
          <li>
            <strong>🏆 Giải thưởng:</strong> {awards}
          </li>
          <li>
            <strong>💡 Khám phá:</strong> {discovery}
          </li>
        </ul>
      </div>
    </div>
  );
}
