import React, { useState } from "react";
import { useForm } from "react-hook-form";
import RenderCounter from "../components/common/RenderCounter";

// Helper tính toán độ mạnh mật khẩu trực tiếp trong render (Derived State)
function computePasswordStrength(pass = "") {
  if (!pass) return { score: 0, label: "Chưa nhập", color: "#64748b" };
  let score = 0;
  if (pass.length >= 6) score += 1;
  if (pass.length >= 10) score += 1;
  if (/[A-Z]/.test(pass)) score += 1;
  if (/[0-9]/.test(pass)) score += 1;
  if (/[^A-Za-z0-9]/.test(pass)) score += 1;

  if (score <= 2) return { score: 25, label: "Yếu", color: "#ef4444" };
  if (score === 3 || score === 4)
    return { score: 65, label: "Trung Bình", color: "#f59e0b" };
  return { score: 100, label: "Rất Mạnh (Strong)", color: "#10b981" };
}

export default function WatchConditionalLabPage() {
  const [submittedData, setSubmittedData] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      accountType: "personal",
      password: "",
      bio: "",
      // personal
      nationalId: "",
      dateOfBirth: "",
      // company
      companyName: "",
      taxId: "",
      employeeCount: "1-10",
      // student
      universityName: "",
      studentId: "",
      graduationYear: "2026",
    },
  });

  // Theo dõi trường accountType để render UI có điều kiện
  const selectedAccountType = watch("accountType");
  const watchedPassword = watch("password");
  const watchedBio = watch("bio") || "";

  // DERIVED STATE: Tính toán tức thì ngay trong render body, không dùng useEffect!
  const passwordStrength = computePasswordStrength(watchedPassword);
  const bioCharCount = watchedBio.length;

  const onSubmit = (data) => {
    setSubmittedData(data);
  };

  return (
    <div className="lab1-container">
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">
              <span>👁️</span> Lab 1: watch() & Giao Diện Động (Conditional UI)
            </h2>
            <p
              style={{
                color: "#94a3b8",
                fontSize: "0.88rem",
                marginTop: "0.25rem",
              }}
            >
              Trình diễn kỹ thuật Conditional Fields theo loại tài khoản và tính
              toán Derived State trực tiếp không qua useEffect.
            </p>
          </div>
          <RenderCounter name="Parent Form" badgeType="pill" />
        </div>

        <div className="callout callout-info">
          <span>💡</span>
          <div>
            <strong>Gợi ý trải nghiệm:</strong> Chuyển đổi giữa <em>Cá nhân</em>
            , <em>Công ty</em> và <em>Sinh viên</em>. Quan sát Render Counter
            tăng lên và các trường form thay đổi động tương ứng mà không cần
            quản lý biến <code>isCompanyOpen</code> bằng <code>useState</code>!
          </div>
        </div>

        <div className="grid-2">
          {/* Form Container */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card"
            style={{ background: "#090d16", border: "1px solid #334155" }}
          >
            <h3
              style={{
                color: "#38bdf8",
                marginBottom: "1.25rem",
                fontSize: "1.1rem",
              }}
            >
              📝 Đăng Ký Tài Khoản Đa Dạng
            </h3>

            {/* Chung */}
            <div className="form-group">
              <label className="form-label">Họ và tên *</label>
              <input
                type="text"
                className={`form-input ${errors.fullName ? "error" : ""}`}
                placeholder="Nguyễn Văn A"
                {...register("fullName", { required: "Vui lòng nhập họ tên" })}
              />
              {errors.fullName && (
                <p className="error-text">⚠️ {errors.fullName.message}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Email liên hệ *</label>
              <input
                type="email"
                className={`form-input ${errors.email ? "error" : ""}`}
                placeholder="email@example.com"
                {...register("email", {
                  required: "Vui lòng nhập email hợp lệ",
                })}
              />
              {errors.email && (
                <p className="error-text">⚠️ {errors.email.message}</p>
              )}
            </div>

            {/* Password with live derived strength */}
            <div className="form-group">
              <label className="form-label">Mật khẩu bảo mật</label>
              <input
                type="password"
                className="form-input"
                placeholder="Nhập mật khẩu..."
                {...register("password")}
              />
              <div className="strength-meter-container">
                <div className="strength-bar">
                  <div
                    className="strength-fill"
                    style={{
                      width: `${passwordStrength.score}%`,
                      backgroundColor: passwordStrength.color,
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.78rem",
                  }}
                >
                  <span style={{ color: "#94a3b8" }}>Độ mạnh mật khẩu:</span>
                  <span
                    style={{
                      color: passwordStrength.color,
                      fontWeight: "bold",
                    }}
                  >
                    {passwordStrength.label} ({passwordStrength.score}%)
                  </span>
                </div>
              </div>
            </div>

            {/* Select Account Type */}
            <div className="form-group">
              <label
                className="form-label"
                style={{ color: "#f472b6", fontWeight: "bold" }}
              >
                Loại tài khoản (watch đang lắng nghe):
              </label>
              <select className="form-select" {...register("accountType")}>
                <option value="personal">
                  👤 Tài Khoản Cá Nhân (Personal)
                </option>
                <option value="company">
                  🏢 Tài Khoản Doanh Nghiệp (Company)
                </option>
                <option value="student">
                  🎓 Tài Khoản Sinh Viên (Student)
                </option>
              </select>
            </div>

            {/* CONDITIONAL RENDERING THEO selectedAccountType */}
            {selectedAccountType === "personal" && (
              <div
                style={{
                  padding: "1rem",
                  background: "rgba(56, 189, 248, 0.05)",
                  borderRadius: "8px",
                  border: "1px dashed #0284c7",
                  marginBottom: "1.25rem",
                }}
              >
                <h4
                  style={{
                    color: "#38bdf8",
                    fontSize: "0.95rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  🛡️ Thông Tin Cá Nhân (Personal Only)
                </h4>
                <div className="form-group">
                  <label className="form-label">Số CCCD / Hộ Chiếu *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="00120000xxxx"
                    {...register("nationalId", {
                      required:
                        selectedAccountType === "personal"
                          ? "Cần số CCCD"
                          : false,
                    })}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Ngày sinh</label>
                  <input
                    type="date"
                    className="form-input"
                    {...register("dateOfBirth")}
                  />
                </div>
              </div>
            )}

            {selectedAccountType === "company" && (
              <div
                style={{
                  padding: "1rem",
                  background: "rgba(236, 72, 153, 0.05)",
                  borderRadius: "8px",
                  border: "1px dashed #ec4899",
                  marginBottom: "1.25rem",
                }}
              >
                <h4
                  style={{
                    color: "#ec4899",
                    fontSize: "0.95rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  🏢 Thông Tin Doanh Nghiệp (Company Only)
                </h4>
                <div className="form-group">
                  <label className="form-label">Tên công ty / Tập đoàn *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Công ty Cổ phần Công Nghệ ABC"
                    {...register("companyName", {
                      required:
                        selectedAccountType === "company"
                          ? "Cần tên công ty"
                          : false,
                    })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Mã số thuế (MST) *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="0101234567"
                    {...register("taxId", {
                      required:
                        selectedAccountType === "company"
                          ? "Cần mã số thuế"
                          : false,
                    })}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Quy mô nhân sự</label>
                  <select
                    className="form-select"
                    {...register("employeeCount")}
                  >
                    <option value="1-10">1 - 10 nhân viên</option>
                    <option value="11-50">11 - 50 nhân viên</option>
                    <option value="51-200">51 - 200 nhân viên</option>
                    <option value="200+">Trên 200 nhân sự</option>
                  </select>
                </div>
              </div>
            )}

            {selectedAccountType === "student" && (
              <div
                style={{
                  padding: "1rem",
                  background: "rgba(16, 185, 129, 0.05)",
                  borderRadius: "8px",
                  border: "1px dashed #10b981",
                  marginBottom: "1.25rem",
                }}
              >
                <h4
                  style={{
                    color: "#10b981",
                    fontSize: "0.95rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  🎓 Xác Thực Sinh Viên Nhận Ưu Đãi 50%
                </h4>
                <div className="form-group">
                  <label className="form-label">
                    Tên trường Đại học / Cao đẳng *
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Đại học Bách Khoa, FPT University..."
                    {...register("universityName", {
                      required:
                        selectedAccountType === "student"
                          ? "Cần tên trường"
                          : false,
                    })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Mã số sinh viên (MSSV) *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="SE123456"
                    {...register("studentId", {
                      required:
                        selectedAccountType === "student" ? "Cần MSSV" : false,
                    })}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Năm tốt nghiệp dự kiến</label>
                  <select
                    className="form-select"
                    {...register("graduationYear")}
                  >
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028+">2028 trở đi</option>
                  </select>
                </div>
              </div>
            )}

            {/* Bio with live character count */}
            <div className="form-group">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.3rem",
                }}
              >
                <label className="form-label" style={{ marginBottom: 0 }}>
                  Mô tả ngắn gọn (Bio)
                </label>
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: bioCharCount > 100 ? "#f59e0b" : "#94a3b8",
                  }}
                >
                  {bioCharCount} / 150 ký tự
                </span>
              </div>
              <textarea
                rows={3}
                className="form-textarea"
                placeholder="Giới thiệu bản thân hoặc sứ mệnh công ty..."
                maxLength={150}
                {...register("bio")}
              />
            </div>

            <div
              style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}
            >
              <button
                type="submit"
                className="btn btn-primary"
                style={{ flex: 1 }}
              >
                <span>💾 Xác Nhận Đăng Ký</span>
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  reset();
                  setSubmittedData(null);
                }}
              >
                <span>🔄 Reset Form</span>
              </button>
            </div>
          </form>

          {/* Realtime Inspector & Output */}
          <div>
            <div
              className="card"
              style={{ background: "#090d16", border: "1px solid #334155" }}
            >
              <h4
                style={{
                  color: "#38bdf8",
                  marginBottom: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span>📡</span> Live Subscription Inspector
              </h4>
              <p
                style={{
                  fontSize: "0.82rem",
                  color: "#94a3b8",
                  marginBottom: "1rem",
                }}
              >
                Các giá trị được trích xuất trực tiếp thông qua{" "}
                <code>watch()</code> trong quá trình người dùng nhập liệu:
              </p>

              <div className="preview-box">
                <div style={{ color: "#34d399", marginBottom: "0.4rem" }}>
                  // Realtime State Tracker
                </div>
                <div>
                  <strong>Current Account:</strong>{" "}
                  <span style={{ color: "#f472b6" }}>
                    "{selectedAccountType}"
                  </span>
                </div>
                <div>
                  <strong>Password Length:</strong>{" "}
                  {watchedPassword ? watchedPassword.length : 0} chars
                </div>
                <div>
                  <strong>Strength Rating:</strong> {passwordStrength.label}
                </div>
                <div>
                  <strong>Bio Length:</strong> {bioCharCount} chars
                </div>
              </div>

              {submittedData && (
                <div style={{ marginTop: "1.25rem" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "0.5rem",
                      color: "#10b981",
                    }}
                  >
                    <span>✅</span>{" "}
                    <strong>Payload Gửi Đi Thành Công (onSubmit):</strong>
                  </div>
                  <pre className="preview-box" style={{ color: "#a7f3d0" }}>
                    {JSON.stringify(submittedData, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            <div className="callout callout-warning">
              <span>⚠️</span>
              <div>
                <strong>Lưu ý về watch():</strong> Vì <code>watch()</code> được
                gọi trực tiếp ở component cha, mỗi khi gõ vào ô{" "}
                <em>Mật khẩu</em> hoặc <em>Bio</em>, toàn bộ form này sẽ
                re-render. Hãy chuyển sang <strong>Lab 2</strong> để xem cách{" "}
                <code>useWatch()</code> chặn đứng hiện tượng này!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
