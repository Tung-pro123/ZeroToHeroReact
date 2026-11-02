import React, { useState } from 'react';

/**
 * CustomTagPicker - Chip / Tag Multi-select Component
 * Props: `tags` (string[]), `onTagsChange(tags: string[])`
 */
export default function CustomTagPicker({
  tags = [],
  onTagsChange,
  onBlur,
  suggestions = ['React', 'TypeScript', 'Node.js', 'Next.js', 'Docker', 'GraphQL', 'TailwindCSS'],
  label = 'Kỹ năng chuyên môn (Tags)',
  invalid = false
}) {
  const [inputValue, setInputValue] = useState('');

  const addTag = (tagToAdd) => {
    const cleaned = tagToAdd.trim();
    if (cleaned && !tags.includes(cleaned)) {
      const nextTags = [...tags, cleaned];
      if (onTagsChange) onTagsChange(nextTags);
    }
    setInputValue('');
  };

  const removeTag = (indexToRemove) => {
    const nextTags = tags.filter((_, idx) => idx !== indexToRemove);
    if (onTagsChange) onTagsChange(nextTags);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  return (
    <div>
      {label && (
        <div style={{ fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.4rem', color: '#f8fafc' }}>
          {label}
        </div>
      )}

      <div className={`custom-tag-container ${invalid ? 'invalid' : ''}`} onBlur={onBlur}>
        {tags.map((tag, index) => (
          <span key={tag} className="tag-pill">
            <span>#{tag}</span>
            <button
              type="button"
              className="tag-remove-btn"
              onClick={() => removeTag(index)}
              title="Xóa tag"
            >
              ✕
            </button>
          </span>
        ))}

        <input
          type="text"
          className="tag-input-inline"
          placeholder={tags.length === 0 ? 'Nhập tag rồi ấn Enter (hoặc click gợi ý bên dưới)...' : 'Thêm tag...'}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Quick suggestions */}
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.5rem', alignItems: 'center' }}>
        <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Gợi ý nhanh:</span>
        {suggestions.map((sug) => {
          const isSelected = tags.includes(sug);
          return (
            <button
              key={sug}
              type="button"
              disabled={isSelected}
              onClick={() => addTag(sug)}
              style={{
                background: isSelected ? '#1e293b' : 'rgba(168, 85, 247, 0.12)',
                color: isSelected ? '#64748b' : '#c084fc',
                border: '1px solid rgba(168, 85, 247, 0.25)',
                padding: '0.2rem 0.5rem',
                borderRadius: '4px',
                fontSize: '0.75rem',
                cursor: isSelected ? 'not-allowed' : 'pointer'
              }}
            >
              +{sug}
            </button>
          );
        })}
      </div>
    </div>
  );
}

