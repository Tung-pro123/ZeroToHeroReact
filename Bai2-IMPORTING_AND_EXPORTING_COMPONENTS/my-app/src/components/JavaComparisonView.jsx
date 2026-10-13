// ============================================================================
// FILE: src/components/JavaComparisonView.jsx
// MỤC TIÊU: Góc Kỹ Sư Backend - So sánh trực quan Java / Spring Boot vs React
// ============================================================================

import React, { useState } from 'react';

export default function JavaComparisonView() {
  const [selectedTopic, setSelectedTopic] = useState('default_export');

  const topics = [
    {
      id: 'default_export',
      title: '1. Default Export vs Public Class',
      reactCode: `// Gallery.jsx
// Mỗi file chỉ có DUY NHẤT 1 export default
export default function Gallery() {
  return <div>Gallery View</div>;
}

// App.jsx
// Nơi nhận có thể đặt tên bất kỳ
import MyGallery from './Gallery';`,
      javaCode: `// Gallery.java
// Mỗi file chỉ có DUY NHẤT 1 public class trùng tên file
public class Gallery {
    public void render() {
        System.out.println("Gallery View");
    }
}

// Application.java
import com.example.models.Gallery;`
    },
    {
      id: 'named_export',
      title: '2. Named Export vs Static Utilities',
      reactCode: `// TeamUtils.jsx
// Một file có thể chứa VÔ SỐ named export
export function Badge() { ... }
export function Avatar() { ... }

// App.jsx
// BẮT BUỘC có dấu {} và đúng tên hàm
import { Badge, Avatar } from './TeamUtils';
import { Badge as UserBadge } from './TeamUtils'; // đổi tên`,
      javaCode: `// TeamUtils.java
// Một class chứa nhiều public static methods
public class TeamUtils {
    public static void renderBadge() { ... }
    public static void renderAvatar() { ... }
}

// Application.java
import static com.example.TeamUtils.renderBadge;
import static com.example.TeamUtils.renderAvatar;`
    },
    {
      id: 'encapsulation',
      title: '3. Encapsulation (Tính đóng gói nội bộ)',
      reactCode: `// Gallery.jsx
// Hàm KHÔNG CÓ 'export' -> Private file scope
function SecretHelper() {
  return <span>Private Logic</span>;
}

// Chỉ export hàm công khai
export default function Gallery() {
  return <SecretHelper />;
}

// App.jsx: KHÔNG THỂ import SecretHelper!`,
      javaCode: `// Gallery.java
public class Gallery {
    // Phương thức private chỉ nội bộ class dùng
    private void secretHelper() {
        System.out.println("Private Logic");
    }

    public void render() {
        secretHelper();
    }
}
// Application.java: Không thể gọi secretHelper()!`
    },
    {
      id: 'di_vs_esmodules',
      title: '4. Spring IoC (@Autowired) vs ES Modules',
      reactCode: `// React ES Modules: Static Module Resolution
// Nạp phụ thuộc rõ ràng tại thời điểm biên dịch (Build-time)
import Gallery from './Gallery';
import { Badge } from './TeamMembers';

// Ưu điểm: Tree-shaking loại bỏ code thừa,
// IDE phát hiện lỗi sai đường dẫn ngay khi gõ!`,
      javaCode: `// Spring Boot: Dynamic Dependency Injection
// Container quét classpath và tiêm vào Runtime
@Service
public class GalleryService {
    @Autowired
    private ProfileRepository profileRepo;
}

// Cần khởi động Spring ApplicationContext để giải quyết Bean`
    }
  ];

  const currentTopic = topics.find(t => t.id === selectedTopic);

  return (
    <div className="java-comparison-container">
      <div className="comparison-header">
        <span className="java-badge">☕ Java / Spring Boot</span>
        <span className="vs-badge">VS</span>
        <span className="react-badge">⚛️ React ES Modules</span>
        <h3>Bản Đồ Đối Chiếu Tư Duy Cho Backend Developer</h3>
      </div>

      <div className="topic-tabs">
        {topics.map(t => (
          <button
            key={t.id}
            className={`topic-tab-btn ${selectedTopic === t.id ? 'active' : ''}`}
            onClick={() => setSelectedTopic(t.id)}
          >
            {t.title}
          </button>
        ))}
      </div>

      <div className="comparison-cards-grid">
        <div className="comparison-card react-card">
          <div className="card-top">
            <span className="icon">⚛️</span>
            <strong>Cú pháp React / ES Modules (Frontend)</strong>
          </div>
          <pre className="code-snippet-box">{currentTopic.reactCode}</pre>
        </div>

        <div className="comparison-card java-card">
          <div className="card-top">
            <span className="icon">☕</span>
            <strong>Cú pháp Java / Spring Boot (Backend)</strong>
          </div>
          <pre className="code-snippet-box">{currentTopic.javaCode}</pre>
        </div>
      </div>
    </div>
  );
}
