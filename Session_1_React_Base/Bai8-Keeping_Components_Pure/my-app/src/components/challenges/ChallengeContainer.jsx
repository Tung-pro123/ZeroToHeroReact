// ========================================================================================
// FILE: src/components/challenges/ChallengeContainer.jsx
// ========================================================================================
// LỜI GIẢI HOÀN CHỈNH CHO CẢ 3 BÀI TẬP THỬ THÁCH (CHALLENGES 1, 2, 3) CỦA BÀI 8 (REACT.DEV)
// ========================================================================================

import { useState } from 'react';
import Card from '../common/Card';

// ----------------------------------------------------------------------------------------
// CHALLENGE 1: SỬA ĐỒNG HỒ ĐỔI MÀU GIAO DIỆN (FIX A BROKEN CLOCK)
// Lỗi cũ: document.getElementById('time').className = ... (Sửa DOM trực tiếp trong render)
// Cách sửa chuẩn: Tính toán className và trả về trực tiếp trong JSX!
// ----------------------------------------------------------------------------------------
function Clock({ time }) {
  const hours = time.getHours();
  // Tính toán thuần túy (Pure Calculation)
  const isNight = hours >= 0 && hours <= 6;
  const timeClass = isNight ? 'clock--night' : 'clock--day';

  return (
    <div className={`clock-display-card ${timeClass}`}>
      <span className="clock-badge-mode">{isNight ? '🌙 Ban đêm (Night)' : '☀️ Ban ngày (Day)'}</span>
      <h3 className="clock-time-text">{time.toLocaleTimeString()}</h3>
    </div>
  );
}

// ----------------------------------------------------------------------------------------
// CHALLENGE 2: SỬA LỖI DÙNG CHUNG BIẾN TOÀN CỤC (FIX A BROKEN PROFILE)
// Lỗi cũ: Gán currentPerson = person vào biến toàn cục khiến component khác đọc nhầm
// Cách sửa chuẩn: Truyền person làm Prop trực tiếp cho các component con!
// ----------------------------------------------------------------------------------------
function ProfileHeader({ person }) {
  return <h4 className="profile-ch-name">{person.name}</h4>;
}

function ProfileAvatar({ person }) {
  return (
    <img
      className="profile-ch-avatar"
      src={person.imageUrl}
      alt={person.name}
      width={60}
      height={60}
    />
  );
}

function ProfileCardItem({ person }) {
  return (
    <div className="profile-challenge-item">
      <ProfileAvatar person={person} />
      <div className="profile-ch-info">
        <ProfileHeader person={person} />
        <span className="profile-ch-role">{person.role}</span>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------------------
// CHALLENGE 3: KHẮC PHỤC LỖI MẢNG BỊ CHÈN LẶP THẺ (FIX A BROKEN STORY TRAY)
// Lỗi cũ: stories.push(...) trực tiếp trên mảng nhận từ Prop khiến thẻ bị nhân đôi lặp lại
// Cách sửa chuẩn: Dùng [...stories] tạo bản sao mới trước khi thêm!
// ----------------------------------------------------------------------------------------
function StoryTray({ stories }) {
  // ✅ CÁCH SỬA CHUẨN: Clone mảng mới trước khi bổ sung nút tạo story
  const storiesToDisplay = [...stories];
  storiesToDisplay.push({ id: 'create', label: '➕ Tạo Tin Mới (Create Story)' });

  return (
    <ul className="story-tray-list">
      {storiesToDisplay.map(story => (
        <li 
          key={story.id} 
          className={`story-tray-badge ${story.id === 'create' ? 'badge-create' : ''}`}
        >
          {story.label}
        </li>
      ))}
    </ul>
  );
}

export default function ChallengeContainer() {
  const [activeTab, setActiveTab] = useState('c1');

  // Dữ liệu cho Challenge 2
  const scientists = [
    {
      name: "Subrahmanyan Chandrasekhar",
      role: "Nhà vật lý thiên văn (Giải Nobel)",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
    },
    {
      name: "Creola Katherine Johnson",
      role: "Nhà toán học NASA",
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
    }
  ];

  // Dữ liệu cho Challenge 3
  const initialStories = [
    { id: '1', label: '📖 Chuyện của An' },
    { id: '2', label: '📸 Ảnh du lịch của Bình' },
    { id: '3', label: '🎧 Bản nhạc của Chi' },
  ];

  return (
    <div className="demo-section">
      <div className="section-intro">
        <span className="badge-pill success">Mục 7: Lời Giải Các Bài Tập Thử Thách (Challenges)</span>
        <h2 className="section-title">Khắc Phục 3 Lỗi Kinh Điển Trong react.dev</h2>
        <p className="section-desc">
          Xem mã nguồn trước và sau khi được sửa chữa theo quy tắc tinh khiết (Purity).
        </p>
      </div>

      <div className="challenge-tabs-nav">
        <button
          className={`ch-tab-btn ${activeTab === 'c1' ? 'active' : ''}`}
          onClick={() => setActiveTab('c1')}
        >
          ⏰ Challenge 1: Sửa Đồng Hồ
        </button>
        <button
          className={`ch-tab-btn ${activeTab === 'c2' ? 'active' : ''}`}
          onClick={() => setActiveTab('c2')}
        >
          👤 Challenge 2: Sửa Profile Biến Toàn Cục
        </button>
        <button
          className={`ch-tab-btn ${activeTab === 'c3' ? 'active' : ''}`}
          onClick={() => setActiveTab('c3')}
        >
          📚 Challenge 3: Sửa Story Tray Bị Nhân Bản
        </button>
      </div>

      <div className="challenge-body-area">
        {activeTab === 'c1' && (
          <Card title="Challenge 1: Đồng Hồ Đổi Màu Tinh Khiết" variant="cyan">
            <div className="challenge-content-block">
              <p className="challenge-guide">
                <strong>Vấn đề:</strong> Đoạn code cũ gọi <code>document.getElementById('time').className = ...</code> trực tiếp trong hàm.
                <br />
                <strong>Giải pháp:</strong> Biến việc đổi màu thành phép tính trả về class trong JSX!
              </p>
              <div className="challenge-demo-screen">
                <Clock time={new Date()} />
              </div>
            </div>
          </Card>
        )}

        {activeTab === 'c2' && (
          <Card title="Challenge 2: Hồ Sơ Không Dùng Biến Toàn Cục" variant="indigo">
            <div className="challenge-content-block">
              <p className="challenge-guide">
                <strong>Vấn đề:</strong> Biến toàn cục <code>currentPerson</code> bị ghi đè chéo giữa các component.
                <br />
                <strong>Giải pháp:</strong> Xóa bỏ biến toàn cục, truyền <code>person</code> qua Props trực tiếp!
              </p>
              <div className="challenge-demo-screen">
                <div className="profiles-challenge-list">
                  {scientists.map((sc, i) => (
                    <ProfileCardItem key={i} person={sc} />
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {activeTab === 'c3' && (
          <Card title="Challenge 3: Khay Tin (Story Tray) Không Đột Biến Prop Mảng" variant="success">
            <div className="challenge-content-block">
              <p className="challenge-guide">
                <strong>Vấn đề:</strong> Gọi <code>stories.push(...)</code> trực tiếp trên mảng Props khiến nút "Tạo Tin" bị nhân đôi nhiều lần do Strict Mode.
                <br />
                <strong>Giải pháp:</strong> Dùng <code>[...stories]</code> để clone mảng mới an toàn!
              </p>
              <div className="challenge-demo-screen">
                <StoryTray stories={initialStories} />
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
