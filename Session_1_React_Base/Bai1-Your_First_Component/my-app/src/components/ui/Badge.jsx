// ========================================================================================
// FILE: src/components/ui/Badge.jsx
// KIẾN THỨC BÀI 1:
// 1. Component tái sử dụng cao (Reusable UI Primitive): Giống như 1 Enum hoặc Value Object trong Java
// 2. Chữ cái đầu viết hoa: Badge (React nhận diện là Component tự định nghĩa chứ không phải thẻ HTML)
// ========================================================================================

/**
 * Component hiển thị nhãn/tag (Ví dụ: Spring Boot Dev, React Specialist, Tech Lead, ...)
 * @param {string} text - Nội dung hiển thị bên trong nhãn
 * @param {string} variant - Biến thể màu sắc: 'primary' | 'success' | 'warning' | 'purple'
 */
export default function Badge({ text = "Developer", variant = "primary" }) {
  // Mapping biến thể sang class CSS
  const variantClass = `badge--${variant}`;

  // BƯỚC 3: Trả về JSX bọc trong ()
  return (
    <span className={`badge ${variantClass}`}>
      <span className="badge-dot" />
      {text}
    </span>
  );
}
