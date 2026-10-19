// ========================================================================================
// FILE: src/components/profile/TeamGallery.jsx
// ========================================================================================
// KIẾN THỨC BÀI 1:
// 1. Khả năng lồng ghép (Composition): Tương tự như ví dụ Gallery trong tài liệu react.dev
//    Một Component lớn (TeamGallery) quản lý và hiển thị nhiều Component con (ProfileCard).
//
// 2. CẢNH BÁO KỸ THUẬT QUAN TRỌNG NHẤT BÀI 1:
//    - "Mọi component phải được khai báo ở phạm vi ngoài cùng (Top Level) của file".
//    - KHÔNG ĐƯỢC viết hàm "function ProfileCard() { ... }" nằm lọt bên trong thân hàm TeamGallery!
//    - Tại sao? Trong Spring Boot/Java, nếu bạn tạo mới 1 Class hoặc Anonymous Instance mỗi khi
//      1 method được gọi, bộ nhớ sẽ bị rác. Ở React, nếu lồng định nghĩa hàm, mỗi khi TeamGallery
//      chạy lại (re-render), nó sẽ xóa sạch và tạo lại hoàn toàn hàm con -> mất sạch State và giật lag giao diện!
// ========================================================================================

import ProfileCard from './ProfileCard';

export default function TeamGallery() {
  // Dữ liệu mẫu thực tế của đội ngũ kỹ sư doanh nghiệp
  const teamMembers = [
    {
      id: 1,
      name: "Trần Minh Quân",
      title: "Senior Backend Lead",
      badgeText: "Spring Boot / Java 21",
      badgeVariant: "success",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      bio: "Chuyên gia kiến trúc Microservices, Spring Cloud, Kafka và tối ưu hóa PostgreSQL.",
      metrics: { commits: 840, prs: 142, stars: "3.2k" }
    },
    {
      id: 2,
      name: "Lê Hoàng Mai",
      title: "Frontend Architect",
      badgeText: "React 19 / TypeScript",
      badgeVariant: "primary",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      bio: "Đam mê thiết kế Component System tối ưu, State Management và Micro-frontends.",
      metrics: { commits: 612, prs: 98, stars: "1.8k" }
    },
    {
      id: 3,
      name: "Phạm Quốc Dũng",
      title: "DevOps & Cloud Engineer",
      badgeText: "Docker / K8s / AWS",
      badgeVariant: "warning",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      bio: "Tự động hóa CI/CD Pipeline, triển khai hạ tầng Spring Boot và Vite React lên AWS EKS.",
      metrics: { commits: 420, prs: 67, stars: "950" }
    }
  ];

  return (
    <section className="gallery-section">
      <div className="section-header">
        <div className="badge-pill">Khối Xây Dựng Giao Diện (Composition)</div>
        <h2 className="section-title">Đội Ngũ Kỹ Sư Công Nghệ</h2>
        <p className="section-desc">
          Ví dụ thực tế về việc một Component cha (<code>&lt;TeamGallery /&gt;</code>) tái sử dụng 
          nhiều Component con (<code>&lt;ProfileCard /&gt;</code>) một cách độc lập và tinh gọn.
        </p>
      </div>

      {/* Grid danh sách hiển thị các ProfileCard con */}
      <div className="gallery-grid">
        {teamMembers.map((member) => (
          // Gọi component con và truyền dữ liệu
          <ProfileCard
            key={member.id}
            name={member.name}
            title={member.title}
            badgeText={member.badgeText}
            badgeVariant={member.badgeVariant}
            avatarUrl={member.avatarUrl}
            bio={member.bio}
            metrics={member.metrics}
          />
        ))}
      </div>
    </section>
  );
}
