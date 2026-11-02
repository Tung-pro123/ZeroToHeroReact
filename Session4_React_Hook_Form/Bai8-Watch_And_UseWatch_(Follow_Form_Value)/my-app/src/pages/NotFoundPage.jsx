import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
      <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🔍</div>
      <h2
        style={{ fontSize: "1.8rem", color: "#38bdf8", marginBottom: "0.5rem" }}
      >
        404 - Không Tìm Thấy Trang
      </h2>
      <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>
        Đường dẫn bạn truy cập không tồn tại trong hệ thống Bài 8.
      </p>
      <Link to="/" className="btn btn-primary">
        <span>🏠 Quay Về Trang Chủ</span>
      </Link>
    </div>
  );
}
