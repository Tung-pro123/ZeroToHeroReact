// ============================================================================
// FILE: src/components/MixedModule.jsx
// MỤC TIÊU: Minh họa MIXED EXPORTS (Kết hợp cả Default Export & Named Export)
//           trong CÙNG MỘT FILE
// CÚ PHÁP IMPORT: import ProductCard, { PriceTag, StockStatus, BuyButton } from './MixedModule';
// ============================================================================

// 1. NAMED EXPORT: PriceTag
export function PriceTag({ price, discountPrice }) {
  return (
    <div className="price-tag-container">
      {discountPrice ? (
        <>
          <span className="current-price">{discountPrice.toLocaleString()} ₫</span>
          <span className="original-price">{price.toLocaleString()} ₫</span>
        </>
      ) : (
        <span className="current-price">{price.toLocaleString()} ₫</span>
      )}
    </div>
  );
}

// 2. NAMED EXPORT: StockStatus
export function StockStatus({ inStock = true, count = 12 }) {
  return inStock ? (
    <span className="stock-pill in-stock">
      🟢 Còn hàng ({count} sản phẩm)
    </span>
  ) : (
    <span className="stock-pill out-of-stock">
      🔴 Tạm hết hàng
    </span>
  );
}

// 3. NAMED EXPORT: BuyButton
export function BuyButton({ onClick, label = "Thêm vào giỏ hàng" }) {
  return (
    <button className="buy-btn" onClick={onClick}>
      🛒 {label}
    </button>
  );
}

// 4. DEFAULT EXPORT: Component chính đại diện cho cả module
export default function ProductCard({
  title = "Khóa Học React Zero To Hero",
  category = "Frontend Development",
  price = 1200000,
  discountPrice = 890000,
  inStock = true,
  stockCount = 45,
  icon = "⚛️"
}) {
  return (
    <div className="product-card">
      <div className="product-badge">{category}</div>
      <div className="product-icon">{icon}</div>
      <h3 className="product-title">{title}</h3>
      <StockStatus inStock={inStock} count={stockCount} />
      <PriceTag price={price} discountPrice={discountPrice} />
      <BuyButton onClick={() => alert(`Đã chọn đăng ký: ${title}`)} />
    </div>
  );
}
