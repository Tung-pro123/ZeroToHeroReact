// ========================================================================================
// FILE: src/components/common/Card.jsx
// ========================================================================================
// KIẾN THỨC BÀI 5: PROP ĐẶC BIỆT "children" (TƯ DUY "CÁI VỎ RỖNG" / SLOT PATTERN)
//
// 1. Bản chất:
//    - Khi bạn viết:
//      <Card title="Hồ sơ">
//        <p>Nội dung bất kỳ ở đây</p>
//      </Card>
//    - React tự động gom toàn bộ nội dung nằm ở giữa 2 thẻ mở/đóng <Card>...</Card>
//      và gán vào một prop đặc biệt có tên là "children"!
//
// 2. Tư duy "Cái Vỏ Rỗng" (Khung ảnh bằng gỗ):
//    - Component Card này không quan tâm bên trong nó chứa cái gì (Avatar, Text, hay cả Form).
//    - Nó chỉ có nhiệm vụ tạo khung viền đẹp, đổ bóng, tiêu đề và chừa 1 "lỗ trống" {children}
//      để nội dung bên ngoài tự rơi vào.
//
// 3. Nguyên lý SOLID trong Doanh nghiệp:
//    - Tuân thủ nguyên lý Đóng/Mở (Open/Closed Principle - OCP):
//      Card đóng với việc sửa đổi mã nguồn, nhưng mở rộng vô hạn với mọi loại nội dung con!
//
// 4. Đối chiếu Spring Boot / Backend:
//    - Giống hệt cơ chế Decorator Pattern hoặc Layout Fragments trong Thymeleaf:
//      layout:fragment="content" chừa chỗ để các trang con tự nhúng view vào!
// ========================================================================================

/**
 * Component Card đa năng đóng vai trò là "Cái Vỏ Rỗng"
 * @param {ReactNode} children - Nội dung bất kỳ được truyền lọt vào giữa thẻ <Card>...</Card>
 * @param {string} title - Tiêu đề tùy chọn của Card
 * @param {string} subtitle - Phụ đề nhỏ
 * @param {string} variant - Biến thể màu viền: 'default' | 'cyan' | 'indigo' | 'rose'
 */
export default function Card({ 
  children, 
  title, 
  subtitle,
  variant = 'default' 
}) {
  return (
    <div className={`custom-card card-variant--${variant}`}>
      {/* Header của Card (nếu có title) */}
      {(title || subtitle) && (
        <div className="custom-card-header">
          {title && <h3 className="custom-card-title">{title}</h3>}
          {subtitle && <p className="custom-card-subtitle">{subtitle}</p>}
        </div>
      )}

      {/* 
        CHỖ TRỐNG QUAN TRỌNG NHẤT: {children}
        Toàn bộ JSX mà Component Cha nhét vào giữa <Card>...</Card> 
        sẽ hiển thị chính xác tại vị trí này!
      */}
      <div className="custom-card-body">
        {children}
      </div>
    </div>
  );
}
