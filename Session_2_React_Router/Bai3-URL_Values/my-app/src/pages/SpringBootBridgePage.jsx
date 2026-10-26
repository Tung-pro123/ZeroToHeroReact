import React, { useState } from 'react';

export default function SpringBootBridgePage() {
  const [activeStep, setActiveStep] = useState(1);

  const pipelineSteps = [
    {
      step: 1,
      title: '1. Người Dùng Thao Tác Trên Trình Duyệt',
      desc: 'User click vào sản phẩm hoặc gõ URL: /shops/10/products/25?currency=VND&discount=true',
      badge: 'Client Event',
    },
    {
      step: 2,
      title: '2. React Router Phân Giải URL',
      desc: 'Route /shops/:shopId/products/:productId được kích hoạt. useParams trích xuất shopId="10", productId="25". useSearchParams đọc currency="VND", discount="true".',
      badge: 'React Router v6',
    },
    {
      step: 3,
      title: '3. Frontend Gửi HTTP Request Đến Spring Backend',
      desc: 'React gọi fetch("/api/v1/shops/10/products/25?currency=VND&discount=true") mang theo toàn bộ dữ liệu định danh và tùy chọn.',
      badge: 'HTTP Network',
    },
    {
      step: 4,
      title: '4. Spring Boot Controller Tiếp Nhận & Tiêm Dữ Liệu',
      desc: '@PathVariable tự động chuyển đổi sang Long (10L, 25L). @RequestParam tự động chuyển đổi sang String và boolean.',
      badge: 'Spring MVC Engine',
    },
    {
      step: 5,
      title: '5. Phản Hồi JSON & Cập Nhật Giao Diện',
      desc: 'Spring Boot trả về ResponseEntity<ProductDTO> chứa mã HTTP 200 OK. React parse JSON và render ra màn hình.',
      badge: 'UI Render Completed',
    },
  ];

  return (
    <div>
      <div className="glass-card" style={{ borderLeft: '4px solid #10b981' }}>
        <h2 className="card-title">
          <span>☕</span> Spring Boot Bridge: Cầu Nối Tư Duy Full-Stack (React ↔ Spring MVC)
        </h2>
        <p className="card-subtitle">
          Đối chiếu trực quan giữa cơ chế xử lý tham số của <strong>React Router phía Frontend</strong> và <strong>Spring Boot phía Backend</strong>.
        </p>

        {/* Rosetta Stone Comparison Table */}
        <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
          <table className="bridge-table">
            <thead>
              <tr>
                <th>Khái Niệm</th>
                <th>Phía Frontend (React Router 6)</th>
                <th>Phía Backend (Spring Boot 3)</th>
                <th>Đặc Điểm & Bản Chất</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong style={{ color: '#38bdf8' }}>Path Variable / Dynamic Segment</strong>
                </td>
                <td>
                  <code style={{ color: '#38bdf8' }}>useParams()</code><br />
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Khai báo <code>path="/users/:id"</code></span>
                </td>
                <td>
                  <code style={{ color: '#34d399' }}>@PathVariable</code><br />
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Khai báo <code>@GetMapping("/users/&#123;id&#125;")</code></span>
                </td>
                <td style={{ fontSize: '0.88rem', color: '#cbd5e1' }}>
                  Xác định <strong>Resource cụ thể</strong>. Luôn là thành phần bắt buộc của địa chỉ.
                </td>
              </tr>
              <tr>
                <td>
                  <strong style={{ color: '#34d399' }}>Query / Search Parameters</strong>
                </td>
                <td>
                  <code style={{ color: '#38bdf8' }}>useSearchParams()</code><br />
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}><code>searchParams.get("page")</code></span>
                </td>
                <td>
                  <code style={{ color: '#34d399' }}>@RequestParam</code><br />
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}><code>@RequestParam(defaultValue="1") int page</code></span>
                </td>
                <td style={{ fontSize: '0.88rem', color: '#cbd5e1' }}>
                  Xác định <strong>Trạng thái hiển thị</strong> (Search, Filter, Sort, Page). Thường có giá trị mặc định.
                </td>
              </tr>
              <tr>
                <td>
                  <strong style={{ color: '#c084fc' }}>Toàn Bộ Thông Tin Yêu Cầu</strong>
                </td>
                <td>
                  <code style={{ color: '#38bdf8' }}>useLocation()</code><br />
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>pathname, search, hash, state</span>
                </td>
                <td>
                  <code style={{ color: '#34d399' }}>HttpServletRequest</code><br />
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>getRequestURI(), getQueryString()</span>
                </td>
                <td style={{ fontSize: '0.88rem', color: '#cbd5e1' }}>
                  Cung cấp ngữ cảnh tổng thể về phiên làm việc và siêu dữ liệu của request.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Side-by-Side Code Comparison */}
        <h3 style={{ fontSize: '1.15rem', color: '#f8fafc', fontWeight: 700, marginBottom: '1rem' }}>
          💻 So Sánh Mã Nguồn Song Song (Side-by-Side Code)
        </h3>

        <div className="grid-2" style={{ marginBottom: '2rem' }}>
          {/* React Code */}
          <div style={{ background: '#030712', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <span style={{ color: '#38bdf8', fontWeight: 700, fontSize: '0.9rem' }}>⚛️ React Router 6 (Client-side)</span>
              <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>JavaScript / JSX</span>
            </div>
            <pre style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5, margin: 0, overflowX: 'auto' }}>
{`// 1. Khai báo Route
<Route 
  path="/shops/:shopId/products/:productId" 
  element={<ProductDetail />} 
/>

// 2. Đọc dữ liệu trong Component
function ProductDetail() {
  const { shopId, productId } = useParams();
  const [searchParams] = useSearchParams();
  
  const currency = searchParams.get('currency') ?? 'USD';
  const discount = searchParams.get('discount') === 'true';

  useEffect(() => {
    // 3. Gọi Backend Spring Boot
    fetch(\`/api/shops/\${shopId}/products/\${productId}?currency=\${currency}\`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [shopId, productId, currency]);
}`}
            </pre>
          </div>

          {/* Spring Boot Code */}
          <div style={{ background: '#030712', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(52, 211, 153, 0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <span style={{ color: '#34d399', fontWeight: 700, fontSize: '0.9rem' }}>🍃 Spring Boot 3 (Server-side)</span>
              <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>Java / Spring MVC</span>
            </div>
            <pre style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5, margin: 0, overflowX: 'auto' }}>
{`@RestController
@RequestMapping("/api/shops")
public class ProductController {

  @GetMapping("/{shopId}/products/{productId}")
  public ResponseEntity<ProductDTO> getProduct(
      @PathVariable Long shopId,
      @PathVariable Long productId,
      @RequestParam(defaultValue = "USD") String currency,
      @RequestParam(defaultValue = "false") boolean discount
  ) {
      ProductDTO product = productService.find(shopId, productId, currency, discount);
      return ResponseEntity.ok(product);
  }
}`}
            </pre>
          </div>
        </div>

        {/* Step-by-Step Interactive Pipeline Stepper */}
        <div style={{ background: 'rgba(0, 0, 0, 0.35)', padding: '1.5rem', borderRadius: '12px' }}>
          <h3 style={{ fontSize: '1.05rem', color: '#fbbf24', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🔄</span> Vòng Đời Luân Chuyển Dữ Liệu Full-Stack (Interactive Request Stepper)
          </h3>

          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
            {pipelineSteps.map((s) => (
              <button
                key={s.step}
                onClick={() => setActiveStep(s.step)}
                className={`btn btn-sm ${activeStep === s.step ? 'btn-primary' : 'btn-secondary'}`}
                style={{ whiteSpace: 'nowrap' }}
              >
                Bước {s.step}
              </button>
            ))}
          </div>

          {pipelineSteps
            .filter((s) => s.step === activeStep)
            .map((curr) => (
              <div key={curr.step} style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1.25rem', borderRadius: '10px', borderLeft: '4px solid #38bdf8' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h4 style={{ color: '#f8fafc', fontSize: '1.1rem', fontWeight: 700 }}>{curr.title}</h4>
                  <span className="badge badge-purple">{curr.badge}</span>
                </div>
                <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.6 }}>{curr.desc}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
