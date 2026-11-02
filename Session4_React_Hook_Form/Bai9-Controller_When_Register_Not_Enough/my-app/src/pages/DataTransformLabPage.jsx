import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

const COUNTRIES = [
  {
    code: "VN",
    name: "Việt Nam",
    flag: "🇻🇳",
    currency: "VND",
    region: "Đông Nam Á",
  },
  {
    code: "US",
    name: "Hoa Kỳ (USA)",
    flag: "🇺🇸",
    currency: "USD",
    region: "Bắc Mỹ",
  },
  {
    code: "JP",
    name: "Nhật Bản (Japan)",
    flag: "🇯🇵",
    currency: "JPY",
    region: "Đông Á",
  },
  {
    code: "DE",
    name: "Đức (Germany)",
    flag: "🇩🇪",
    currency: "EUR",
    region: "Châu Âu",
  },
  {
    code: "SG",
    name: "Singapore",
    flag: "🇸🇬",
    currency: "SGD",
    region: "Đông Nam Á",
  },
];

export default function DataTransformLabPage() {
  const [transformMode, setTransformMode] = useState("string"); // 'string' | 'object'
  const [submittedData, setSubmittedData] = useState(null);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      accountName: "Công Ty TechGlobal",
      selectedCountry: "VN", // Mặc định là chuỗi ID 'VN'
    },
  });

  const onSubmit = (data) => {
    setSubmittedData(data);
  };

  const currentCountryValue = watch("selectedCountry");

  return (
    <div className="lab3-container">
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">
              <span>🔄</span> Lab 3: Data Transformation — Biến Đổi Object Phức
              Tạp Trong Controller
            </h2>
            <p
              style={{
                color: "#94a3b8",
                fontSize: "0.88rem",
                marginTop: "0.25rem",
              }}
            >
              Giải quyết bài toán 3rd-party component trả về Object phức tạp
              nhưng Backend chỉ cần ID đơn lẻ (hoặc ngược lại).
            </p>
          </div>
          <span className="badge badge-amber">Adapter Transform</span>
        </div>

        <div className="callout callout-info">
          <span>💡</span>
          <div>
            <strong>Kịch bản thực tế:</strong> Thư viện React-Select hoặc
            Autocomplete thường trả về một Object đầy đủ:
            <code>{'{ code: "VN", name: "Việt Nam", currency: "VND" }'}</code>.
            Nhưng database của bạn chỉ có cột{" "}
            <code>country_code: VARCHAR(2)</code>. Nhờ <code>Controller</code>,
            bạn có thể biến đổi giá trị ngay trong <code>onChange</code>:
            <br />
            <code>
              onChange=
              {"(selectedOption) => field.onChange(selectedOption.code)"}
            </code>
            !
          </div>
        </div>

        {/* Switch Mode Controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#090d16",
            padding: "1rem",
            borderRadius: "10px",
            border: "1px solid #334155",
            marginBottom: "1.5rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <span
              style={{
                fontWeight: 600,
                color: "#f8fafc",
                marginRight: "0.5rem",
              }}
            >
              Chế Độ Lưu Dữ Liệu Vào RHF:
            </span>
            <span
              className={
                transformMode === "string"
                  ? "badge badge-cyan"
                  : "badge badge-purple"
              }
            >
              {transformMode === "string"
                ? '🔤 Trích Xuất Chuỗi ID (code: "VN")'
                : "📦 Giữ Nguyên Toàn Bộ Object"}
            </span>
          </div>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              const nextMode = transformMode === "string" ? "object" : "string";
              setTransformMode(nextMode);
              reset({
                accountName: "Công Ty TechGlobal",
                selectedCountry: nextMode === "string" ? "VN" : COUNTRIES[0],
              });
              setSubmittedData(null);
            }}
          >
            <span>
              🔄 Đổi Chế Độ:{" "}
              {transformMode === "string"
                ? "Sang Lưu Full Object"
                : "Sang Chỉ Lưu Mã String"}
            </span>
          </button>
        </div>

        <div className="grid-2">
          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card"
            style={{ background: "#090d16", border: "1px solid #334155" }}
          >
            <h3
              style={{
                color: "#38bdf8",
                marginBottom: "1.25rem",
                fontSize: "1.05rem",
              }}
            >
              🏢 Đăng Ký Trụ Sở Doanh Nghiệp Quốc Tế
            </h3>

            {/* Account Name */}
            <div className="form-group">
              <label className="form-label">Tên tổ chức / Chi nhánh</label>
              <Controller
                name="accountName"
                control={control}
                rules={{ required: "Vui lòng nhập tên tài khoản" }}
                render={({ field, fieldState }) => (
                  <div>
                    <input
                      type="text"
                      className={`form-input ${fieldState.error ? "error" : ""}`}
                      {...field}
                    />
                    {fieldState.error && (
                      <p className="error-text">
                        ⚠️ {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Custom Rich Country Picker */}
            <div className="form-group">
              <label className="form-label" style={{ color: "#f472b6" }}>
                Quốc gia đăng ký kinh doanh (Custom Rich UI):
              </label>

              <Controller
                name="selectedCountry"
                control={control}
                rules={{ required: "Vui lòng chọn một quốc gia hợp lệ" }}
                render={({ field, fieldState }) => {
                  // Xác định code hiện tại đang chọn dù value là string hay object
                  const selectedCode =
                    typeof field.value === "object"
                      ? field.value?.code
                      : field.value;

                  return (
                    <div>
                      {/* Grid cards giả lập React-Select/Autocomplete */}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(auto-fill, minmax(130px, 1fr))",
                          gap: "0.6rem",
                          marginTop: "0.4rem",
                        }}
                      >
                        {COUNTRIES.map((c) => {
                          const isSelected = selectedCode === c.code;

                          return (
                            <div
                              key={c.code}
                              onClick={() => {
                                if (transformMode === "string") {
                                  // Chế độ 1: Trích xuất chỉ string ID
                                  field.onChange(c.code);
                                } else {
                                  // Chế độ 2: Lưu toàn bộ Object
                                  field.onChange(c);
                                }
                              }}
                              style={{
                                padding: "0.75rem",
                                borderRadius: "8px",
                                border: `1px solid ${isSelected ? "#38bdf8" : "#334155"}`,
                                background: isSelected
                                  ? "rgba(56, 189, 248, 0.15)"
                                  : "#0e1626",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                textAlign: "center",
                              }}
                            >
                              <div
                                style={{
                                  fontSize: "1.6rem",
                                  marginBottom: "0.2rem",
                                }}
                              >
                                {c.flag}
                              </div>
                              <div
                                style={{
                                  fontSize: "0.82rem",
                                  fontWeight: 600,
                                  color: "#f8fafc",
                                }}
                              >
                                {c.name}
                              </div>
                              <div
                                style={{
                                  fontSize: "0.72rem",
                                  color: "#94a3b8",
                                }}
                              >
                                Tiền tệ: {c.currency}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {fieldState.error && (
                        <p className="error-text">
                          ⚠️ {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  );
                }}
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
                <span>📤 Nộp Dữ Liệu Doanh Nghiệp</span>
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  reset();
                  setSubmittedData(null);
                }}
              >
                <span>🔄 Reset</span>
              </button>
            </div>
          </form>

          {/* Inspector */}
          <div>
            <div
              className="card"
              style={{ background: "#090d16", border: "1px solid #334155" }}
            >
              <h4
                style={{
                  color: "#38bdf8",
                  marginBottom: "0.75rem",
                  fontSize: "1rem",
                }}
              >
                🔍 Dữ Liệu Lưu Trong RHF Lúc Này
              </h4>

              <div className="preview-box">
                <div style={{ color: "#34d399", marginBottom: "0.4rem" }}>
                  // Kiểu dữ liệu RHF đang nắm giữ:
                </div>
                <div>
                  Chế độ hiện tại:{" "}
                  <strong>{transformMode.toUpperCase()}</strong>
                </div>
                <div>
                  Kiểu dữ liệu: <code>{typeof currentCountryValue}</code>
                </div>
                <div style={{ marginTop: "0.5rem", color: "#c084fc" }}>
                  Giá trị field.value:
                </div>
                <pre style={{ color: "#e0f2fe", marginTop: "0.3rem" }}>
                  {JSON.stringify(currentCountryValue, null, 2)}
                </pre>
              </div>

              {submittedData && (
                <div style={{ marginTop: "1.25rem" }}>
                  <div
                    style={{
                      color: "#10b981",
                      fontWeight: "bold",
                      fontSize: "0.88rem",
                      marginBottom: "0.3rem",
                    }}
                  >
                    ✅ Dữ Liệu Backend Nhận Được:
                  </div>
                  <pre className="preview-box" style={{ color: "#a7f3d0" }}>
                    {JSON.stringify(submittedData, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            <div className="callout callout-success">
              <span>🎯</span>
              <div>
                <strong>Lợi ích tối cao của Adapter Pattern:</strong> Bạn không
                cần ép Backend phải đổi API theo UI component, cũng không cần ép
                UI component phải thay đổi cấu trúc dữ liệu của nó. Controller
                đóng vai trò <strong>Middleware (Lớp trung gian)</strong> chuyển
                dịch dữ liệu mượt mà ở cả 2 chiều!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
