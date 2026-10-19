// ==========================================================================
// CARD COMPONENT - Reusable UI Container
// ==========================================================================
import React from 'react';

/**
 * Component bọc giao diện theo chuẩn card hiện đại
 * @param {string} title - Tiêu đề của card
 * @param {string} subtitle - Phụ đề hoặc giải thích ngắn
 * @param {string} icon - Biểu tượng emoji đại diện
 * @param {React.ReactNode} children - Nội dung bên trong card
 * @param {React.ReactNode} action - Nút hành động hoặc công cụ ở góc trên phải
 */
export default function Card({ title, subtitle, icon, children, action, className = '' }) {
  return (
    <div className={`card ${className}`}>
      {/* Header chứa icon, tiêu đề và hành động phụ */}
      <div className="card-header">
        <div className="card-title-group">
          {icon && <span className="card-icon">{icon}</span>}
          <div>
            <h3 className="card-title">{title}</h3>
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
        </div>
        {action && <div className="card-action">{action}</div>}
      </div>

      {/* Thân card hiển thị nội dung con được truyền qua children slot */}
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}
