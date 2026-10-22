// ========================================================================================
// FILE: src/components/ui/Avatar.jsx
// KIẾN THỨC BÀI 1:
// 1. Quy tắc đặt tên: Bắt buộc viết hoa chữ cái đầu (PascalCase: "Avatar", KHÔNG ĐƯỢC "avatar")
// 2. JSX Thẻ đơn: Trong HTML thẻ <img> có thể không đóng, nhưng trong JSX BẮT BUỘC có dấu tự đóng <img />
// 3. Tư duy Spring Boot: Giống như một ViewHelper method trong Java: public String renderAvatar(User user)
// ========================================================================================

/**
 * Component hiển thị ảnh đại diện người dùng
 * @param {string} src - Đường dẫn ảnh
 * @param {string} alt - Mô tả văn bản cho ảnh (hỗ trợ SEO & Accessibility)
 * @param {string} size - Kích thước: 'sm' | 'md' | 'lg'
 * @param {boolean} isOnline - Trạng thái hoạt động
 */
export default function Avatar({ 
  src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80", 
  alt = "User Avatar", 
  size = "md",
  isOnline = true 
}) {
  // Bản chất: Đây là một hàm JS thuần túy (Pure Function) nhận tham số đầu vào và trả về giao diện.
  // Trong React thực tế ở doanh nghiệp, chúng ta chuẩn hóa kích thước bằng class hoặc style token.
  const sizeClass = {
    sm: "avatar--sm",
    md: "avatar--md",
    lg: "avatar--lg",
  }[size] || "avatar--md";

  // BƯỚC 3: Trả về phần tử giao diện JSX
  // Luôn bọc trong ngoặc tròn () để tránh bẫy ASI (Automatic Semicolon Insertion)
  return (
    <div className={`avatar-container ${sizeClass}`}>
      {/* 
        CẠM BẪY 3 TRONG BÀI 1: Thẻ đơn (Self-closing tag)
        - Trong HTML thường: <img src="..."> là hợp lệ.
        - Trong React JSX: BẮT BUỘC phải có dấu gạch chéo tự đóng "/>" ở cuối thẻ!
        Nếu quên dấu "/>", Babel/Vite sẽ báo lỗi cú pháp (SyntaxError: Unterminated JSX contents).
      */}
      <img 
        className="avatar-image" 
        src={src} 
        alt={alt} 
        loading="lazy"
      />

      {/* Hiển thị chấm xanh báo online */}
      {isOnline && <span className="avatar-status-badge" title="Đang trực tuyến" />}
    </div>
  );
}
