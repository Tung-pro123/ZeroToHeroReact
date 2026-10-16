export default function Header() {
  return (
    <header className="app-header">
      <div className="header-badge">
        <span>📚 React Core Concept</span>
        <span>•</span>
        <span>Bài 16</span>
      </div>
      <h1 className="app-title">Updating Arrays in State</h1>
      <p className="app-subtitle">
        Làm chủ các thao tác Thêm, Sửa, Xóa, Chèn và Sắp xếp Mảng bất biến (Immutability), 
        phân biệt slice vs splice, xử lý Object lồng nhau và bứt phá với useImmer.
      </p>
    </header>
  );
}
