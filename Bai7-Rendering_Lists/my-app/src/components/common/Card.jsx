// ==========================================================================
// CARD COMPONENT - Reusable UI Container
// ==========================================================================
import React from 'react';

/**
 * Component Card bọc giao diện hiện đại chuẩn Clean Code
 * @param {string} title - Tiêu đề của Card
 * @param {string} subtitle - Phụ đề hoặc hướng dẫn tóm tắt
 * @param {string} icon - Biểu tượng emoji
 * @param {React.ReactNode} children - Nội dung bên trong (Slot pattern)
 * @param {React.ReactNode} action - Nút bấm hoặc bộ lọc ở góc trên phải
 */
export default function Card({ title, subtitle, icon, children, action, className = '' }) {
  return (
    <div className={`card ${className}`}>
      {/* Header chứa icon, tiêu đề và hành động bổ trợ */}
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

      {/* Nội dung thân Card */}
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}
