import { useState } from 'react';
import Header from './components/common/Header';
import Navbar from './components/common/Navbar';
import RestaurantWorkflowLab from './components/restaurant-workflow/RestaurantWorkflowLab';
import TaskManagerLab from './components/task-manager/TaskManagerLab';
import MessengerAppLab from './components/messenger-app/MessengerAppLab';
import DraftRecipientLab from './components/draft-recipient/DraftRecipientLab';
import ImmerReducerLab from './components/immer-reducer/ImmerReducerLab';
import CustomReducerLab from './components/custom-reducer/CustomReducerLab';
import ReducerQuiz from './components/challenges/ReducerQuiz';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('restaurant-workflow');

  return (
    <div className="app-container">
      {/* Header */}
      <Header />

      {/* Navigation Tabs */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Tab Content */}
      <main>
        {activeTab === 'restaurant-workflow' && <RestaurantWorkflowLab />}
        {activeTab === 'task-manager' && <TaskManagerLab />}
        {activeTab === 'messenger-app' && <MessengerAppLab />}
        {activeTab === 'draft-recipient' && <DraftRecipientLab />}
        {activeTab === 'immer-reducer' && <ImmerReducerLab />}
        {activeTab === 'custom-reducer' && <CustomReducerLab />}
        {activeTab === 'quiz' && <ReducerQuiz />}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          👨‍🍳 <strong>ZeroToHeroReact</strong> — Bài 21: Extracting State Logic into a Reducer (Chương 3: Managing State).
        </p>
        <p style={{ marginTop: '0.4rem', color: '#6b7280', fontSize: '0.85rem' }}>
          Tài liệu chuẩn hóa kiến trúc Reducer, Dispatch Action, Immer Draft & Tự code useReducer từ con số 0.
        </p>
      </footer>
    </div>
  );
}
