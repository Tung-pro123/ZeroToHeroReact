import React from "react";
import { useForm } from "react-hook-form";
import RenderCounter from "../components/common/RenderCounter";

export default function WatchVsDirtyLabPage() {
  const {
    register,
    watch,
    reset,
    formState: { dirtyFields, isDirty },
  } = useForm({
    defaultValues: {
      accountType: "personal",
      notes: "",
    },
  });

  const currentAccountType = watch("accountType");
  const isAccountTypeDirty = Boolean(dirtyFields.accountType);

  // Giả lập logic code của một lập trình viên non tay dùng dirtyFields thay cho watch()
  const buggyShouldShowCompany = isAccountTypeDirty;
  // Logic chuẩn kiến trúc bằng watch()
  const correctShouldShowCompany = currentAccountType === "company";
  const correctShouldShowStudent = currentAccountType === "student";

  return (
    <div className="lab3-container">
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">
              <span>⚖️</span> Lab 3: watch() vs dirtyFields — Cuộc Chiến Value
              vs Metadata
            </h2>
            <p
              style={{
                color: "#94a3b8",
                fontSize: "0.88rem",
                marginTop: "0.25rem",
              }}
            >
              Giải mã cạm bẫy kinh điển: Tại sao dùng <code>dirtyFields</code>{" "}
              để render giao diện có điều kiện lại gây ra lỗi nghiêm trọng khi
              thêm lựa chọn thứ 3?
            </p>
          </div>
          <RenderCounter name="Truth Matrix Page" badgeType="pill" />
        </div>

        {/* Story Intro */}
        <div className="callout callout-danger">
          <span style={{ fontSize: "1.4rem" }}>💥</span>
          <div>
            <h4 style={{ color: "#f87171", marginBottom: "0.25rem" }}>
              Bài Học Kinh Nghiệm: Khi PM Yêu Cầu Thêm Option Thứ 3
            </h4>
            <p style={{ fontSize: "0.88rem", lineHeight: "1.5" }}>
              Ban đầu form chỉ có 2 option: <code>personal</code> (default) và{" "}
              <code>company</code>. Một lập trình viên lười viết:
              <code>{"{ dirtyFields.accountType && <CompanyFields /> }"}</code>.
              Mọi thứ hoạt động hoàn hảo cho tới khi PM yêu cầu thêm option thứ
              3:
              <code>student</code>! Khi người dùng chọn "Sinh viên", giá trị
              khác default ban đầu nên{" "}
              <code>dirtyFields.accountType = true</code>, khiến form hiển thị
              sai bét mục "Mã số thuế doanh nghiệp"!
            </p>
          </div>
        </div>

        {/* Live Interactive Playground */}
        <div className="grid-2">
          {/* Controls */}
          <div
            className="card"
            style={{ background: "#090d16", border: "1px solid #334155" }}
          >
            <h3
              style={{
                color: "#38bdf8",
                marginBottom: "1rem",
                fontSize: "1.05rem",
              }}
            >
              🕹️ Bảng Điều Khiển Thực Nghiệm
            </h3>

            <div className="form-group">
              <label
                className="form-label"
                style={{ color: "#f472b6", fontWeight: 600 }}
              >
                Chọn loại tài khoản (Default ban đầu: "personal"):
              </label>
              <select className="form-select" {...register("accountType")}>
                <option value="personal">
                  1. Cá nhân (personal) [Mặc Định]
                </option>
                <option value="company">2. Doanh nghiệp (company)</option>
                <option value="student">
                  3. Sinh viên (student) [LỰA CHỌN THỨ 3 GÂY BẪY]
                </option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                Ghi chú bổ sung (thử gõ để kích hoạt isDirty)
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Gõ thử vào đây..."
                {...register("notes")}
              />
            </div>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => reset({ accountType: "personal", notes: "" })}
            >
              <span>🔄 Reset Form về Default Values</span>
            </button>

            {/* Radar / State Monitor */}
            <div
              style={{
                marginTop: "1.5rem",
                background: "#131d2e",
                padding: "1rem",
                borderRadius: "8px",
                border: "1px solid #1e3a5f",
              }}
            >
              <h4
                style={{
                  color: "#38bdf8",
                  fontSize: "0.9rem",
                  marginBottom: "0.5rem",
                }}
              >
                📡 Trạng Thái Hệ Thống FormState:
              </h4>
              <div
                style={{
                  fontSize: "0.85rem",
                  fontFamily: "monospace",
                  lineHeight: "1.6",
                }}
              >
                <div>
                  • Giá trị hiện tại (watch):{" "}
                  <span style={{ color: "#38bdf8", fontWeight: "bold" }}>
                    "{currentAccountType}"
                  </span>
                </div>
                <div>
                  • Giá trị mặc định (default):{" "}
                  <span style={{ color: "#94a3b8" }}>"personal"</span>
                </div>
                <div>
                  • dirtyFields.accountType:{" "}
                  <span
                    style={{
                      color: isAccountTypeDirty ? "#f59e0b" : "#34d399",
                      fontWeight: "bold",
                    }}
                  >
                    {String(isAccountTypeDirty)}
                  </span>
                </div>
                <div>
                  • formState.isDirty:{" "}
                  <span style={{ color: isDirty ? "#f59e0b" : "#34d399" }}>
                    {String(isDirty)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Comparison: Buggy vs Correct */}
          <div
            className="card"
            style={{ background: "#090d16", border: "1px solid #334155" }}
          >
            <h3
              style={{
                color: "#ec4899",
                marginBottom: "1rem",
                fontSize: "1.05rem",
              }}
            >
              ⚔️ So Sánh Trực Quan 2 Cách Tiếp Cận
            </h3>

            {/* Approach A: Buggy */}
            <div
              style={{
                padding: "1rem",
                borderRadius: "8px",
                border: "1px solid #ef4444",
                background: "rgba(239, 68, 68, 0.05)",
                marginBottom: "1.25rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <strong style={{ color: "#f87171" }}>
                  ❌ Cách Sai: Dùng dirtyFields.accountType
                </strong>
                <span className="badge badge-pink">Buggy UI</span>
              </div>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "#94a3b8",
                  marginBottom: "0.5rem",
                }}
              >
                Code: <code>{"{ isDirtyAccount && <CompanyInputs /> }"}</code>
              </p>
              {buggyShouldShowCompany ? (
                <div
                  style={{
                    background: "#3b1115",
                    border: "1px solid #7f1d1d",
                    padding: "0.75rem",
                    borderRadius: "6px",
                    fontSize: "0.85rem",
                    color: "#fecaca",
                  }}
                >
                  <strong>
                    🏢 Hiện Form Doanh Nghiệp (MST, Giấy phép kinh doanh)
                  </strong>
                  {currentAccountType === "student" && (
                    <div
                      style={{
                        color: "#f87171",
                        fontWeight: "bold",
                        marginTop: "0.4rem",
                        borderTop: "1px dashed #ef4444",
                        paddingTop: "0.3rem",
                      }}
                    >
                      🚨 BUG: Người dùng là "Sinh Viên" nhưng lại bị bắt nhập Mã
                      Số Thuế Doanh Nghiệp!
                    </div>
                  )}
                </div>
              ) : (
                <div
                  style={{
                    color: "#64748b",
                    fontSize: "0.85rem",
                    fontStyle: "italic",
                  }}
                >
                  (Ẩn form Doanh nghiệp vì trường chưa bị sửa đổi so với
                  default)
                </div>
              )}
            </div>

            {/* Approach B: Correct */}
            <div
              style={{
                padding: "1rem",
                borderRadius: "8px",
                border: "1px solid #10b981",
                background: "rgba(16, 185, 129, 0.05)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <strong style={{ color: "#34d399" }}>
                  ✅ Cách Chuẩn: Dùng watch('accountType')
                </strong>
                <span className="badge badge-emerald">Best Practice</span>
              </div>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "#94a3b8",
                  marginBottom: "0.5rem",
                }}
              >
                Code:{" "}
                <code>
                  {
                    '{ watch("accountType") === "company" && <CompanyInputs /> }'
                  }
                </code>
              </p>
              {correctShouldShowCompany && (
                <div
                  style={{
                    background: "#064e3b",
                    border: "1px solid #059669",
                    padding: "0.75rem",
                    borderRadius: "6px",
                    fontSize: "0.85rem",
                    color: "#a7f3d0",
                  }}
                >
                  🏢 Hiện đúng Form Doanh Nghiệp (Chỉ khi chọn Company)
                </div>
              )}
              {correctShouldShowStudent && (
                <div
                  style={{
                    background: "#0284c7",
                    border: "1px solid #0369a1",
                    padding: "0.75rem",
                    borderRadius: "6px",
                    fontSize: "0.85rem",
                    color: "#e0f2fe",
                  }}
                >
                  🎓 Hiện đúng Form Sinh Viên (Mã sinh viên & Thẻ SV)
                </div>
              )}
              {currentAccountType === "personal" && (
                <div
                  style={{
                    color: "#64748b",
                    fontSize: "0.85rem",
                    fontStyle: "italic",
                  }}
                >
                  👤 Hiện Form Cá Nhân thông thường
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Truth Matrix Summary */}
        <div
          className="card"
          style={{
            marginTop: "1.5rem",
            background: "#090d16",
            border: "1px solid #334155",
          }}
        >
          <h3
            className="card-title"
            style={{
              fontSize: "1rem",
              color: "#38bdf8",
              marginBottom: "0.75rem",
            }}
          >
            📋 Bảng Chân Lý Bản Chất: Value vs Metadata
          </h3>
          <table className="matrix-table">
            <thead>
              <tr>
                <th>Tiêu Chí</th>
                <th>
                  <code>watch()</code> / <code>useWatch()</code>
                </th>
                <th>
                  <code>dirtyFields</code> (formState)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Bản chất cốt lõi</strong>
                </td>
                <td>
                  <span style={{ color: "#38bdf8" }}>
                    VALUE (Dữ liệu giá trị thực)
                  </span>
                </td>
                <td>
                  <span style={{ color: "#f59e0b" }}>
                    METADATA (Trạng thái biến đổi so với default)
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Câu hỏi trả lời</strong>
                </td>
                <td>
                  <em>"Người dùng hiện đang chọn cái gì?"</em>
                </td>
                <td>
                  <em>"Trường này đã bị gõ khác giá trị ban đầu chưa?"</em>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Kiểu dữ liệu trả về</strong>
                </td>
                <td>String, Number, Array, Object (Data type của input)</td>
                <td>
                  <code>boolean | undefined | object</code>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Mục đích kiến trúc</strong>
                </td>
                <td>Conditional Rendering, tính toán realtime, sync UI</td>
                <td>
                  Bật/tắt nút "Lưu thay đổi", cảnh báo "Bạn có thay đổi chưa lưu
                  khi thoát trang"
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
