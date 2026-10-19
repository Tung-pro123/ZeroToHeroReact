import { useState } from 'react';
import InfoBox from '../common/InfoBox';

const initialFoods = [
  { id: 1, title: 'Phở bò tái lăn' },
  { id: 2, title: 'Bún chả Hà Nội' },
  { id: 3, title: 'Cơm tấm Sài Gòn' },
];

export default function SelectionIdVsObjectLab() {
  const [foods, setFoods] = useState(initialFoods);
  const [mode, setMode] = useState('good_id'); // 'bad_object' | 'good_id'

  // Approach 1 (Bad): Lưu cả object
  const [selectedItemObj, setSelectedItemObj] = useState(initialFoods[0]);

  // Approach 2 (Good): Chỉ lưu ID
  const [selectedId, setSelectedId] = useState(1);
  const selectedItemFromId = foods.find((f) => f.id === selectedId);

  // Thao tác sửa tên món ăn
  const handleEditTitle = (id, newTitle) => {
    const updated = foods.map((f) =>
      f.id === id ? { ...f, title: newTitle } : f
    );
    setFoods(updated);

    // ⚠️ Ở bản Bad: Người dùng thường quên update selectedItemObj, hoặc nếu có update thì phải nhớ 2 chỗ!
  };

  const handleSelectFood = (food) => {
    if (mode === 'bad_object') {
      setSelectedItemObj(food);
    } else {
      setSelectedId(food.id);
    }
  };

  const currentSelection =
    mode === 'bad_object' ? selectedItemObj : selectedItemFromId;

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">📌 Lưu selectedId vs Lưu Cả Object (Stale Bug)</h2>
        <p className="lab-card-desc">
          Tái hiện Challenge 3 trong React Docs: Thao tác sửa tên món ăn để thấy lỗi dữ liệu bị lệch pha khi lưu cả Object vào State.
        </p>
      </div>

      <InfoBox
        type={mode === 'bad_object' ? 'danger' : 'tip'}
        title={mode === 'bad_object' ? 'Đang bật Bản Kém: Lưu cả Object (selectedItem)' : 'Đang bật Bản Chuẩn: Chỉ lưu selectedId'}
      >
        {mode === 'bad_object'
          ? 'Thử nghiệm: Chọn món "Phở bò", sau đó đổi tên ở ô input bên dưới. Bạn sẽ thấy danh sách menu đổi nhưng ô Chi Tiết Đang Chọn VẪN KẸT TÊN CŨ!'
          : 'Bản chuẩn chỉ lưu ID. Mỗi khi render, React tự tìm món đồ mới nhất theo ID, đảm bảo chi tiết món ăn luôn đồng bộ 100%!'}
      </InfoBox>

      {/* Mode Switcher */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', alignItems: 'center' }}>
        <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Cách thức lưu trữ:</span>
        <button
          className={`btn ${mode === 'good_id' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setMode('good_id')}
          style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}
        >
          ✅ Chuẩn: const [selectedId, setSelectedId] = useState(1)
        </button>
        <button
          className={`btn ${mode === 'bad_object' ? 'btn-danger' : 'btn-secondary'}`}
          onClick={() => setMode('bad_object')}
          style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}
        >
          ❌ Kém: const [selectedItem, setSelectedItem] = useState(item)
        </button>
      </div>

      {/* Menu List & Editor */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', margin: '1.25rem 0' }}>
        {/* Left: Food Menu List */}
        <div>
          <h4 style={{ color: '#38bdf8', marginBottom: '0.75rem' }}>🍽️ Danh Sách Thực Đơn (Bấm để chọn):</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {foods.map((food) => {
              const isSelected =
                mode === 'bad_object'
                  ? selectedItemObj?.id === food.id
                  : selectedId === food.id;

              return (
                <div
                  key={food.id}
                  onClick={() => handleSelectFood(food)}
                  className={`list-item-card ${isSelected ? 'selected' : ''}`}
                  style={{ cursor: 'pointer' }}
                >
                  <strong style={{ color: isSelected ? '#a855f7' : '#f8fafc' }}>
                    {food.title}
                  </strong>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    ID: {food.id}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Quick edit food name */}
          <div style={{ marginTop: '1rem', background: '#090d16', padding: '1rem', borderRadius: '8px', border: '1px solid #1e293b' }}>
            <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.4rem' }}>
              Sửa tên món đang chọn trực tiếp trong mảng menu:
            </label>
            <input
              className="form-input"
              value={foods.find((f) => f.id === (mode === 'bad_object' ? selectedItemObj?.id : selectedId))?.title || ''}
              onChange={(e) =>
                handleEditTitle(
                  mode === 'bad_object' ? selectedItemObj?.id : selectedId,
                  e.target.value
                )
              }
            />
          </div>
        </div>

        {/* Right: Selected Detail Panel */}
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Món Ăn Đang Được Chọn (Selected Preview)
          </span>

          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#a855f7', margin: '1rem 0' }}>
            {currentSelection?.title || 'Chưa chọn'}
          </div>

          <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
            Mã định danh: <code>ID = {currentSelection?.id}</code>
          </div>

          {mode === 'bad_object' && (
            <div style={{ marginTop: '1rem', padding: '0.6rem', background: 'rgba(239, 68, 68, 0.15)', color: '#fca5a5', borderRadius: '8px', fontSize: '0.8rem' }}>
              ⚠️ Hãy thử sửa tên món ở ô bên trái: Bạn sẽ thấy món bên phải này bị kẹt tên cũ do lưu cả Object nhân bản!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
