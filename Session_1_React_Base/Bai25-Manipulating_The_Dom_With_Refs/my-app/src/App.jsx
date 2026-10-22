import { useState } from 'react';
import Header from './components/common/Header';
import Navbar from './components/common/Navbar';
import FocusScrollPlayground from './components/basic-dom/FocusScrollPlayground';
import MediaPlayerLab from './components/media-player/MediaPlayerLab';
import CatFriendsGalleryLab from './components/ref-list/CatFriendsGalleryLab';
import ForwardRefImperativeLab from './components/forward-ref/ForwardRefImperativeLab';
import FlushSyncTodoLab from './components/flush-sync/FlushSyncTodoLab';
import DomChallenges from './components/challenges/DomChallenges';
import DomRefMasteryQuiz from './components/quiz/DomRefMasteryQuiz';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('focus-scroll');

  return (
    <div className="app-container">
      <Header />
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="app-main-content">
        {activeTab === 'focus-scroll' && <FocusScrollPlayground />}
        {activeTab === 'media-player' && <MediaPlayerLab />}
        {activeTab === 'cat-gallery' && <CatFriendsGalleryLab />}
        {activeTab === 'forward-ref' && <ForwardRefImperativeLab />}
        {activeTab === 'flush-sync' && <FlushSyncTodoLab />}
        {activeTab === 'challenges' && <DomChallenges />}
        {activeTab === 'quiz' && <DomRefMasteryQuiz />}
      </main>

      <footer className="app-footer">
        <p>
          🎯 <strong>Zero to Hero React 18 & 19 Mastery</strong> • Bài 25: Manipulating the DOM with Refs (Escape Hatches Chapter)
        </p>
        <p style={{ marginTop: '0.4rem', color: '#64748b', fontSize: '0.82rem' }}>
          Được thiết kế chuẩn kiến trúc Production theo React.dev & Tiêu chuẩn Phỏng vấn Senior Frontend Engineer.
        </p>
      </footer>
    </div>
  );
}
