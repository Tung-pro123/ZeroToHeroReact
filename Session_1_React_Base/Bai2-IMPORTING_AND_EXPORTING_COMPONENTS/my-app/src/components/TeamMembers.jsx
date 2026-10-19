// ============================================================================
// FILE: src/components/TeamMembers.jsx
// MỤC TIÊU: Minh họa NAMED EXPORTS (Xuất nhiều hàm con có tên từ cùng 1 file)
// ĐỐI CHIẾU JAVA: Giống như một Utility/Helper class chứa nhiều public static methods
//                 public class StringUtils { public static void capitalize() ... }
//                 Khi dùng: import static com.example.StringUtils.*;
// ============================================================================

// Named Export 1: Badge hiển thị chức vụ
export function RoleBadge({ role = "Frontend Engineer", level = "Senior" }) {
  const getBadgeColor = () => {
    switch (level.toLowerCase()) {
      case "lead":
        return "badge-lead";
      case "senior":
        return "badge-senior";
      default:
        return "badge-default";
    }
  };

  return (
    <span className={`role-badge ${getBadgeColor()}`}>
      🏷️ {role} • {level}
    </span>
  );
}

// Named Export 2: Bio hiển thị dòng tiểu sử ngắn
export function BioSnippet({ quote = "Đam mê kiến trúc Clean Code và React Performance" }) {
  return (
    <blockquote className="bio-snippet">
      <span className="quote-mark">“</span>
      {quote}
      <span className="quote-mark">”</span>
    </blockquote>
  );
}

// Named Export 3: Nút mạng xã hội
export function SocialLinks({ github = "github.com", linkedin = "linkedin.com" }) {
  return (
    <div className="social-links-container">
      <a href={`https://${github}`} target="_blank" rel="noreferrer" className="social-pill github">
        🐙 GitHub
      </a>
      <a href={`https://${linkedin}`} target="_blank" rel="noreferrer" className="social-pill linkedin">
        💼 LinkedIn
      </a>
    </div>
  );
}

// Named Export 4: Thẻ thành viên tổng hợp các thành phần trên
export function MemberCard({ name, role, level, quote, avatarUrl, github, linkedin }) {
  return (
    <div className="member-card">
      <img src={avatarUrl} alt={name} className="member-avatar" />
      <h4 className="member-name">{name}</h4>
      <RoleBadge role={role} level={level} />
      <BioSnippet quote={quote} />
      <SocialLinks github={github} linkedin={linkedin} />
    </div>
  );
}
