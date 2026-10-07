// ==========================================================================
// CONTAINER QUẢN LÝ CẢ 4 BÀI TẬP THỬ THÁCH (REACT.DEV CHALLENGES)
// ==========================================================================
import React, { useState } from 'react';
import Challenge1SplitChemists from './Challenge1SplitChemists';
import Challenge2NestedRecipes from './Challenge2NestedRecipes';
import Challenge3ExtractedRecipe from './Challenge3ExtractedRecipe';
import Challenge4PoemSeparator from './Challenge4PoemSeparator';

export default function ChallengeContainer() {
  const [selectedChallenge, setSelectedChallenge] = useState('all');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Bộ chọn Thử thách */}
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          className={`toggle-btn ${selectedChallenge === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedChallenge('all')}
        >
          Tất Cả 4 Thử Thách
        </button>
        <button
          className={`toggle-btn ${selectedChallenge === 'c1' ? 'active' : ''}`}
          onClick={() => setSelectedChallenge('c1')}
        >
          Thử Thách 1 (Tách 2 nhóm)
        </button>
        <button
          className={`toggle-btn ${selectedChallenge === 'c2' ? 'active' : ''}`}
          onClick={() => setSelectedChallenge('c2')}
        >
          Thử Thách 2 (Danh sách lồng)
        </button>
        <button
          className={`toggle-btn ${selectedChallenge === 'c3' ? 'active' : ''}`}
          onClick={() => setSelectedChallenge('c3')}
        >
          Thử Thách 3 (Tách Component)
        </button>
        <button
          className={`toggle-btn ${selectedChallenge === 'c4' ? 'active' : ''}`}
          onClick={() => setSelectedChallenge('c4')}
        >
          Thử Thách 4 (Fragment & hr)
        </button>
      </div>

      {/* Nội dung tương ứng */}
      {(selectedChallenge === 'all' || selectedChallenge === 'c1') && <Challenge1SplitChemists />}
      {(selectedChallenge === 'all' || selectedChallenge === 'c2') && <Challenge2NestedRecipes />}
      {(selectedChallenge === 'all' || selectedChallenge === 'c3') && <Challenge3ExtractedRecipe />}
      {(selectedChallenge === 'all' || selectedChallenge === 'c4') && <Challenge4PoemSeparator />}
    </div>
  );
}
