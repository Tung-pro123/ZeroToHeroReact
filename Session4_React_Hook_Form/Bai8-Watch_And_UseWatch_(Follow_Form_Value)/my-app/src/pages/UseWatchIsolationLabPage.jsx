import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import RenderCounter from "../components/common/RenderCounter";

// Component Con 1: Tính toán phí ship độc lập bằng useWatch
function ShippingCalculator({ control, useIsolationMode }) {
  // Lắng nghe 2 trường 'city' và 'deliverySpeed'
  const watchedValues = useWatch({
    control,
    name: ["city", "deliverySpeed"],
    disabled: !useIsolationMode, // nếu tắt mode isolate thì không dùng hook này
  });

  const city = watchedValues?.[0] || "hanoi";
  const speed = watchedValues?.[1] || "standard";

  let baseFee = 30000;
  if (city === "hanoi" || city === "hcm") baseFee = 22000;
  else if (city === "island") baseFee = 75000;

  let multiplier = 1;
  if (speed === "express") multiplier = 1.8;
  else if (speed === "same_day") multiplier = 2.5;

  const totalShipping = Math.round(baseFee * multiplier);

  return (
    <div
      style={{
        background: "#131d2e",
        border: "1px solid #1e3a5f",
        padding: "1rem",
        borderRadius: "8px",
        marginTop: "1rem",
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
        <h4 style={{ color: "#38bdf8", fontSize: "0.9rem", margin: 0 }}>
          🚚 Ước Tính Cước Vận Chuyển (Sub-Component)
        </h4>
        <RenderCounter name="Shipping Sub-Comp" badgeType="pill" />
      </div>

      <div style={{ fontSize: "0.85rem", color: "#cbd5e1" }}>
        <div>
          Khu vực giao: <strong>{city.toUpperCase()}</strong>
        </div>
        <div>
          Phương thức:{" "}
          <strong>
            {speed === "express"
              ? "Hỏa Tốc 24H"
              : speed === "same_day"
                ? "Siêu Tốc 2H"
                : "Tiêu Chuẩn"}
          </strong>
        </div>
        <div
          style={{
            color: "#34d399",
            fontWeight: "bold",
            fontSize: "1.05rem",
            marginTop: "0.3rem",
          }}
        >
          Phí vận chuyển: {totalShipping.toLocaleString("vi-VN")} ₫
        </div>
      </div>
    </div>
  );
}

// Component Con 2: Tổng kết giỏ hàng và tổng tiền thanh toán
function OrderSummaryCard({ control, baseTotal, useIsolationMode }) {
  const watchedValues = useWatch({
    control,
    name: ["city", "deliverySpeed", "couponCode"],
    disabled: !useIsolationMode,
  });

  const city = watchedValues?.[0] || "hanoi";
  const speed = watchedValues?.[1] || "standard";
  const coupon = watchedValues?.[2] || "";

  let baseFee = 30000;
  if (city === "hanoi" || city === "hcm") baseFee = 22000;
  else if (city === "island") baseFee = 75000;
  let multiplier = speed === "express" ? 1.8 : speed === "same_day" ? 2.5 : 1;
  const shippingFee = Math.round(baseFee * multiplier);

  let discount = 0;
  if (coupon.trim().toUpperCase() === "REACTVITE") {
    discount = 150000;
  } else if (coupon.trim().toUpperCase() === "VIP50") {
    discount = Math.round(baseTotal * 0.2);
  }

  const grandTotal = Math.max(0, baseTotal + shippingFee - discount);

  return (
    <div
      className="card"
      style={{ background: "#090d16", border: "1px solid #334155" }}
    >
      <div className="card-header" style={{ marginBottom: "0.75rem" }}>
        <h3
          className="card-title"
          style={{ fontSize: "1rem", color: "#f472b6" }}
        >
          🛒 Tóm Tắt Đơn Hàng (Order Summary)
        </h3>
        <RenderCounter name="Summary Card" badgeType="pill" />
      </div>

      <div
        style={{
          fontSize: "0.88rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#94a3b8",
          }}
        >
          <span>Tiền hàng (3 sản phẩm):</span>
          <span>{baseTotal.toLocaleString("vi-VN")} ₫</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#94a3b8",
          }}
        >
          <span>Phí vận chuyển:</span>
          <span>+{shippingFee.toLocaleString("vi-VN")} ₫</span>
        </div>
        {discount > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#34d399",
              fontWeight: "bold",
            }}
          >
            <span>Mã giảm giá ({coupon.toUpperCase()}):</span>
            <span>-{discount.toLocaleString("vi-VN")} ₫</span>
          </div>
        )}
        <div
          style={{ height: "1px", background: "#334155", margin: "0.5rem 0" }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "1.15rem",
            fontWeight: "bold",
          }}
        >
          <span>Tổng thanh toán:</span>
          <span style={{ color: "#38bdf8" }}>
            {grandTotal.toLocaleString("vi-VN")} ₫
          </span>
        </div>
      </div>
    </div>
  );
}

export default function UseWatchIsolationLabPage() {
  const [isolationMode, setIsolationMode] = useState(true);
  const [submittedResult, setSubmittedResult] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "Nguyễn Hoàng Nam",
      phone: "0988776655",
      email: "nam.nguyen@example.com",
      address: "Số 18, Phố Bà Triệu",
      city: "hanoi",
      deliverySpeed: "standard",
      notes: "Giao giờ hành chính",
      couponCode: "REACTVITE",
    },
  });

  // NẾU TẮT isolationMode: Bật watch() ở Form Cha để so sánh sự bùng nổ render!
  const parentWatchedAll = !isolationMode ? watch() : null;

  const onSubmit = (data) => {
    setSubmittedResult(data);
  };

  const BASE_PRICE = 1450000;

  return (
    <div className="lab2-container">
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">
              <span>⚡</span> Lab 2: useWatch() & Nghệ Thuật Cách Ly Render
              (Render Isolation)
            </h2>
            <p
              style={{
                color: "#94a3b8",
                fontSize: "0.88rem",
                marginTop: "0.25rem",
              }}
            >
              Kiểm chứng sự khác biệt hiệu năng giữa việc dùng{" "}
              <code>useWatch()</code> ở component con so với dùng{" "}
              <code>watch()</code> ở cha.
            </p>
          </div>
          <RenderCounter name="Parent Checkout Form" badgeType="pill" />
        </div>

        {/* Toggle Mode Bar */}
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
              Kiến Trúc Lắng Nghe:
            </span>
            <span
              className={
                isolationMode ? "badge badge-emerald" : "badge badge-amber"
              }
            >
              {isolationMode
                ? "🎯 useWatch() Cách Ly Độc Lập (Khuyên Dùng)"
                : "⚠️ watch() Tại Cấp Cha (Anti-Pattern Form Lớn)"}
            </span>
          </div>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setIsolationMode(!isolationMode)}
            style={{ fontSize: "0.85rem" }}
          >
            <span>
              🔄 Chuyển sang:{" "}
              {isolationMode
                ? "Chế độ watch() ở Cha"
                : "Chế độ useWatch() Cách Ly"}
            </span>
          </button>
        </div>

        <div className="callout callout-info">
          <span>🧪</span>
          <div>
            <strong>Thử nghiệm thực chiến:</strong>
            <ul
              style={{
                paddingLeft: "1.25rem",
                marginTop: "0.4rem",
                fontSize: "0.85rem",
              }}
            >
              <li>
                <strong>
                  Khi gõ vào ô "Ghi chú giao hàng" hoặc "Địa chỉ chi tiết":
                </strong>{" "}
                Ở chế độ <code>useWatch()</code>, <em>Parent Checkout Form</em>{" "}
                KHÔNG HỀ render thêm lần nào (Render Counter giữ nguyên).
              </li>
              <li>
                <strong>Khi đổi "Tỉnh/Thành Phố" hoặc "Mã Coupon":</strong> Chỉ{" "}
                <em>Shipping Sub-Comp</em> và <em>Summary Card</em> re-render để
                cập nhật giá tiền, còn toàn bộ các ô nhập khác của Form Cha
                không bị ảnh hưởng!
              </li>
              <li>
                <strong>
                  Hãy thử chuyển sang chế độ "watch() Tại Cấp Cha":
                </strong>{" "}
                Mỗi một ký tự bạn gõ vào bất kỳ ô nào sẽ làm Form Cha đỏ rực vì
                Render Counter tăng phi mã!
              </li>
            </ul>
          </div>
        </div>

        <div className="grid-2">
          {/* Checkout Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
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
              📦 Thông Tin Nhận Hàng & Thanh Toán
            </h3>

            <div className="form-group">
              <label className="form-label">Họ và tên người nhận</label>
              <input
                type="text"
                className="form-input"
                {...register("fullName", { required: true })}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <div className="form-group">
                <label className="form-label">Số điện thoại</label>
                <input
                  type="tel"
                  className="form-input"
                  {...register("phone")}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email thông báo</label>
                <input
                  type="email"
                  className="form-input"
                  {...register("email")}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Địa chỉ nhà / Số đường</label>
              <input
                type="text"
                className="form-input"
                placeholder="Gõ thử vào đây để test re-render..."
                {...register("address")}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <div className="form-group">
                <label className="form-label">
                  Tỉnh / Thành phố (useWatch target)
                </label>
                <select className="form-select" {...register("city")}>
                  <option value="hanoi">Hà Nội (Nội thành)</option>
                  <option value="hcm">TP. Hồ Chí Minh</option>
                  <option value="danang">Đà Nẵng & Miền Trung</option>
                  <option value="island">
                    Biển đảo / Vùng xa (Phú Quốc, Côn Đảo...)
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Tốc độ vận chuyển</label>
                <select className="form-select" {...register("deliverySpeed")}>
                  <option value="standard">Tiêu chuẩn (2-3 ngày)</option>
                  <option value="express">Hỏa tốc (24 giờ)</option>
                  <option value="same_day">Siêu tốc 2H (Now/Grab)</option>
                </select>
              </div>
            </div>

            {/* Sub-Component 1 uses useWatch */}
            <ShippingCalculator
              control={control}
              useIsolationMode={isolationMode}
            />

            <div className="form-group" style={{ marginTop: "1rem" }}>
              <label className="form-label">Mã ưu đãi / Voucher giảm giá</label>
              <input
                type="text"
                className="form-input"
                placeholder="Nhập REACTVITE hoặc VIP50..."
                {...register("couponCode")}
              />
              <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>
                💡 Thử gõ: <code>REACTVITE</code> (-150k) hoặc{" "}
                <code>VIP50</code> (-20%)
              </span>
            </div>

            <div className="form-group">
              <label className="form-label">Ghi chú cho shipper</label>
              <textarea
                rows={2}
                className="form-textarea"
                placeholder="Ví dụ: Gọi trước khi giao 15 phút, để gói hàng ở bảo vệ..."
                {...register("notes")}
              />
            </div>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ flex: 1 }}
              >
                <span>💳 Hoàn Tất Đặt Hàng</span>
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  reset();
                  setSubmittedResult(null);
                }}
              >
                <span>🔄 Reset</span>
              </button>
            </div>
          </form>

          {/* Right Column: Order Summary & Code Contrast */}
          <div>
            <OrderSummaryCard
              control={control}
              baseTotal={BASE_PRICE}
              useIsolationMode={isolationMode}
            />

            <div
              className="card"
              style={{ background: "#090d16", border: "1px solid #334155" }}
            >
              <h4
                style={{
                  color: "#38bdf8",
                  marginBottom: "0.75rem",
                  fontSize: "0.95rem",
                }}
              >
                🧠 Phân Tích Kỹ Thuật: Tại Sao useWatch() Lại Tối Ưu?
              </h4>
              <div
                style={{
                  fontSize: "0.85rem",
                  color: "#94a3b8",
                  lineHeight: "1.6",
                }}
              >
                <p>
                  1. <code>useWatch()</code> hoạt động dựa trên cơ chế{" "}
                  <strong>RHF Subject Subscription</strong> (tương tự RxJS /
                  Observer pattern).
                </p>
                <p style={{ marginTop: "0.5rem" }}>
                  2. Nó chỉ thông báo cho <em>React Component đang gọi nó</em>{" "}
                  cập nhật lại Virtual DOM khi giá trị của trường đăng ký trong
                  danh sách <code>name</code> thay đổi.
                </p>
                <p style={{ marginTop: "0.5rem" }}>
                  3. Component cha lưu giữ <code>control</code> hoàn toàn không
                  hề nhận tín hiệu setState, giúp loại bỏ 100% hiện tượng giật
                  lag gõ phím (typing lag) trong các form thương mại điện tử
                  hoặc form bảo hiểm lớn!
                </p>
              </div>

              {submittedResult && (
                <div style={{ marginTop: "1rem" }}>
                  <div
                    style={{
                      color: "#10b981",
                      fontWeight: 600,
                      fontSize: "0.88rem",
                      marginBottom: "0.3rem",
                    }}
                  >
                    ✅ Đơn Hàng Đã Tạo (Submitted):
                  </div>
                  <pre className="preview-box" style={{ color: "#a7f3d0" }}>
                    {JSON.stringify(submittedResult, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
