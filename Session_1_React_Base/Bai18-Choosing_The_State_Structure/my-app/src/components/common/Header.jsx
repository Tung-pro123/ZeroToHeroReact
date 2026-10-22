export default function Header() {
  return (
    <header className="app-header">
      <div className="header-badge">
        <span>🏗️ Chương 3: Managing State</span>
        <span>•</span>
        <span>Bài 18</span>
      </div>
      <h1 className="app-title">Choosing the State Structure</h1>
      <p className="app-subtitle">
        Làm chủ 5 nguyên tắc vàng thiết kế State, chuẩn hóa cấu trúc dữ liệu phẳng (Normalized State), 
        loại bỏ State thừa với Derived State và chống lỗi mất đồng bộ bằng selectedId.
      </p>
    </header>
  );
}
