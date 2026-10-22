// ========================================================================================
// FILE: src/components/profile/ProfileCard.jsx
// ========================================================================================
// KIẾN THỨC CỐT LÕI BÀI 1 TRONG TẬP TIN NÀY:
// 
// 1. [BƯỚC 1]: Xuất Component (export default)
//    - Ở dòng 33, ta dùng "export default function ProfileCard".
//    - Doanh nghiệp: Mỗi file thường export default component chính của file đó để dễ import.
//
// 2. [BƯỚC 2]: Khai báo hàm với PascalCase
//    - Tên hàm là "ProfileCard" (chữ P và C viết hoa).
//    - Nếu viết là "profileCard" -> React sẽ tưởng nhầm là thẻ HTML vô danh và KHÔNG vẽ được ra!
//
// 3. [BƯỚC 3]: Trả về phần tử giao diện JSX bọc trong ()
//    - Cú pháp: return ( <div ...> </div> );
//    - Ngăn chặn bẫy ASI (Automatic Semicolon Insertion) của JavaScript.
//
// 4. [MỐI QUAN HỆ CHA - CON (Parent - Child Component)]:
//    - ProfileCard là Component Cha (Parent).
//    - Avatar, Badge, MetricItem là các Component Con (Child).
//    - Khi React biên dịch, nó sẽ đệ quy "mở bung" từng hàm con cho đến khi chỉ còn
//      thẻ HTML gốc (div, h3, p, img, span) trước khi đưa cho trình duyệt vẽ.
//
// 5. [ĐỐI CHIẾU SPRING BOOT]:
//    - ProfileCard giống như 1 Composite DTO / View Layer tổng hợp thông tin từ nhiều Model con.
//    - Thay vì copy paste mã HTML ở 10 chỗ khác nhau, bạn chỉ cần gọi <ProfileCard />!
// ========================================================================================

// Import các Component con từ thư mục ui (Khả năng lồng ghép - Composition)
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import MetricItem from '../ui/MetricItem';

// BƯỚC 1: Xuất Component bằng "export default"
// BƯỚC 2: Tên hàm viết hoa chữ cái đầu (PascalCase: ProfileCard)
export default function ProfileCard({
  name = "Nguyễn Văn Dev",
  title = "Fullstack Engineer",
  badgeText = "Spring Boot + React",
  badgeVariant = "primary",
  avatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  bio = "Chuyển mình từ Java Spring Boot sang làm chủ React Frontend hiện đại.",
  metrics = { commits: 342, prs: 58, stars: 1290 }
}) {
  // BƯỚC 3: Trả về JSX bọc trong cặp ngoặc tròn ( )
  // NẾU VIẾT:
  // return
  //   <div className="profile-card">
  // -> JS sẽ tự động chèn dấu chấm phẩy thành "return;" -> trả về undefined (LỖI TRẮNG MÀN HÌNH)!
  return (
    <article className="profile-card">
      {/* Phần đầu thẻ: Chứa Avatar (Component con) */}
      <div className="profile-card-header">
        {/* Component con thứ nhất được lồng ghép */}
        <Avatar 
          src={avatarUrl} 
          alt={`Ảnh của ${name}`} 
          size="lg" 
          isOnline={true} 
        />
        
        {/* Component con thứ hai: Nhãn vai trò chuyên môn */}
        <div className="profile-card-badge-wrapper">
          <Badge text={badgeText} variant={badgeVariant} />
        </div>
      </div>

      {/* Phần thông tin cá nhân (Các thẻ HTML cơ bản) */}
      <div className="profile-card-body">
        <h3 className="profile-card-name">{name}</h3>
        <p className="profile-card-title">{title}</p>
        <p className="profile-card-bio">{bio}</p>
      </div>

      {/* Phần chân thẻ: Tái sử dụng MetricItem (Component con thứ ba) */}
      <div className="profile-card-footer">
        <MetricItem value={metrics.commits} label="Git Commits" />
        <div className="metric-divider" />
        <MetricItem value={metrics.prs} label="Pull Requests" />
        <div className="metric-divider" />
        <MetricItem value={metrics.stars} label="Stars Earned" />
      </div>
    </article>
  );
}
