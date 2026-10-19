import { useState } from 'react';
import InfoBox from '../common/InfoBox';

export default function SpringTreeComparison() {
  const [selectedTopic, setSelectedTopic] = useState('tree-concept');

  const topics = [
    {
      id: 'tree-concept',
      title: '1. Render Tree ⟷ Spring IoC Bean Hierarchy',
      reactDesc: 'Mô hình hóa quan hệ cha - con giữa các Component thực thi trong RAM. Khi Component tầng trên (Top-level) đổi state, nó kéo theo các con cháu re-render.',
      springDesc: 'Mô hình hóa quan hệ giữa các Bean trong ApplicationContext (ví dụ Root Context chứa Security/DB Service, Child Web Context chứa Controllers).',
      reactCode: `// React Render Tree
<App>
  <SecurityProvider>
    <DashboardController>
      <UserTable />
    </DashboardController>
  </SecurityProvider>
</App>`,
      springCode: `// Spring Bean Hierarchy (ApplicationContext)
@Configuration
public class AppConfig {
    @Bean
    public SecurityService securityService() { ... }
    
    @Bean
    public DashboardService dashboardService(SecurityService sec) { ... }
}`
    },
    {
      id: 'dependency-tree',
      title: '2. Dependency Tree ⟷ Maven / Gradle Graph',
      reactDesc: 'Cây phụ thuộc tĩnh giữa các tệp mã nguồn thông qua câu lệnh import. Dùng cho Bundler gom file và tính kích thước bundle tải về trình duyệt.',
      springDesc: 'Cây phụ thuộc giữa các artifact (jar, library) định nghĩa trong pom.xml / build.gradle. Maven resolve dependencies theo thứ bậc phân cấp.',
      reactCode: `// ES Module Imports
import { Button } from './ui/Button';
import { calculateTax } from '../utils/tax';
import axios from 'axios';`,
      springCode: `<!-- Maven pom.xml Dependency Tree -->
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>`
    },
    {
      id: 'tree-shaking',
      title: '3. Tree Shaking ⟷ Dead Code Elimination / Spring Native AOT',
      reactDesc: 'Dựa trên phân tích cú pháp tĩnh của ES Module để loại bỏ các hàm/tệp export không được import, giảm dung lượng bundle tải về client.',
      springDesc: 'Spring Boot 3 Native Image (GraalVM AOT): Quét toàn bộ bytecode để loại bỏ các Class/Method không được gọi tới (reachability analysis) để tạo binary siêu nhẹ.',
      reactCode: `// Chỉ đóng gói hàm capitalize, loại bỏ hàm unusedHelper
import { capitalize } from './stringUtils';`,
      springCode: `// GraalVM AOT Compilation
// Phân tích reachability metadata để loại bỏ dead classes khỏi Native Binary`
    },
    {
      id: 'ioc-children',
      title: '4. Prop Children ⟷ Dependency Injection (IoC)',
      reactDesc: 'Component Layout không tự ý import nội dung con mà nhận con qua prop children từ bên ngoài truyền vào. Giúp giảm coupling tối đa.',
      springDesc: 'Inversion of Control: Class Service không tự khởi tạo đối tượng (new RepositoryImpl()), mà nhận Interface qua Constructor Injection.',
      reactCode: `// React: Injecting component via children
function Modal({ children }) {
  return <div className="dialog">{children}</div>;
}`,
      springCode: `// Spring: Constructor Dependency Injection
@Service
public class OrderService {
    private final PaymentGateway gateway;
    public OrderService(PaymentGateway gateway) { // Injected!
        this.gateway = gateway;
    }
}`
    }
  ];

  const currentTopic = topics.find((t) => t.id === selectedTopic);

  return (
    <div className="lab-card">
      <div className="card-header">
        <div>
          <h2 className="card-title">☕ Đối Chiếu Tư Duy Backend: React Trees ⟷ Java / Spring Boot</h2>
          <p className="card-desc">
            Phân tích bản chất các mô hình cấu trúc cây của React thông qua các kiến trúc tương đương 
            quen thuộc trong hệ sinh thái Java / Spring Boot.
          </p>
        </div>
      </div>

      {/* Danh sách chủ đề đối chiếu */}
      <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {topics.map((t) => (
          <button
            key={t.id}
            className={`btn-secondary ${selectedTopic === t.id ? 'active' : ''}`}
            onClick={() => setSelectedTopic(t.id)}
            style={{
              padding: '0.5rem 0.9rem',
              fontSize: '0.88rem',
              background: selectedTopic === t.id ? 'rgba(16, 185, 129, 0.2)' : undefined,
              borderColor: selectedTopic === t.id ? '#10b981' : undefined,
              color: selectedTopic === t.id ? '#6ee7b7' : undefined
            }}
          >
            {t.title}
          </button>
        ))}
      </div>

      {/* Nội dung chi tiết của chủ đề */}
      <div className="grid-2">
        {/* Phía React */}
        <div className="compare-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '1.2rem' }}>⚛️</span>
            <h3 style={{ fontSize: '1.1rem', color: '#38bdf8' }}>Phía React Frontend</h3>
          </div>
          <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1rem' }}>
            {currentTopic.reactDesc}
          </p>
          <pre style={{
            background: 'rgba(15, 23, 42, 0.9)',
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid rgba(56, 189, 248, 0.2)',
            fontSize: '0.85rem',
            color: '#7dd3fc',
            overflowX: 'auto'
          }}>
            <code>{currentTopic.reactCode}</code>
          </pre>
        </div>

        {/* Phía Spring Boot */}
        <div className="compare-box" style={{ borderColor: 'rgba(16, 185, 129, 0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '1.2rem' }}>🌱</span>
            <h3 style={{ fontSize: '1.1rem', color: '#34d399' }}>Phía Java / Spring Boot Backend</h3>
          </div>
          <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1rem' }}>
            {currentTopic.springDesc}
          </p>
          <pre style={{
            background: 'rgba(15, 23, 42, 0.9)',
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            fontSize: '0.85rem',
            color: '#a7f3d0',
            overflowX: 'auto'
          }}>
            <code>{currentTopic.springCode}</code>
          </pre>
        </div>
      </div>

      <InfoBox type="spring" title="Bài học rút ra cho Backend Engineer">
        Khi chuyển từ Spring Boot sang React, đừng xem React là "thao tác HTML". Hãy xem React Component như một 
        <strong> Stateless Service / Pure Transformer</strong> nhận đầu vào (Props/State) và tính toán ra bản mô tả giao diện. 
        Mọi nguyên lý kiến trúc tốt (Separation of Concerns, Dependency Injection, Idempotency) đều được giữ trọn vẹn!
      </InfoBox>
    </div>
  );
}
