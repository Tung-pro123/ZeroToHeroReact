export default function Header() {
  return (
    <header className="app-header">
      <div className="header-badge">
        <span>🏗️</span>
        <span>React Core Architecture • Bài 23 (Chương 3 Finale)</span>
      </div>
      <h1 className="app-title">Scaling Up with Reducer and Context</h1>
      <p className="app-subtitle">
        Khám phá bộ đôi quản lý State tối thượng: Kết hợp <code>useReducer</code> (xử lý logic nghiệp vụ) và <code>useContext</code> (truyền tải dữ liệu xuyên cây),
        kỹ thuật tách biệt State & Dispatch ngăn ngừa re-render hàng loạt, và mô hình đóng gói Clean Code.
      </p>
    </header>
  );
}
