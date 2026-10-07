// ========================================================================================
// FILE: src/components/ui/MetricItem.jsx
// KIẾN THỨC BÀI 1:
// 1. Phân chia giao diện thành các khối nhỏ (Atomic Design): Một thẻ thống kê con
// 2. Minh họa tính độc lập: Component này không quan tâm nó nằm ở đâu (ProfileCard hay Dashboard)
// ========================================================================================

/**
 * Component hiển thị chỉ số đo lường công việc (Commits, Projects, Reviews)
 * @param {string|number} value - Giá trị số liệu
 * @param {string} label - Tiêu đề số liệu
 */
export default function MetricItem({ value = "0", label = "Metric" }) {
  return (
    <div className="metric-item">
      <span className="metric-value">{value}</span>
      <span className="metric-label">{label}</span>
    </div>
  );
}
