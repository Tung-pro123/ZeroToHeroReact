import React, { useState } from 'react';

/**
 * CustomRating - Pure Controlled Component
 * Không phụ thuộc vào React Hook Form.
 * Nhận `rating` (number) và `onRatingChange(score)` callback.
 */
export default function CustomRating({
  rating = 0,
  onRatingChange,
  onBlur,
  maxStars = 5,
  label = 'Đánh giá mức độ hài lòng',
  invalid = false
}) {
  const [hoverRating, setHoverRating] = useState(0);

  const displayRating = hoverRating || rating;

  return (
    <div>
      {label && (
        <div style={{ fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.4rem', color: '#f8fafc' }}>
          {label}
        </div>
      )}
      <div
        className={`custom-rating-wrapper ${invalid ? 'invalid' : ''}`}
        onBlur={onBlur}
        tabIndex={0}
      >
        {Array.from({ length: maxStars }, (_, index) => {
          const starNumber = index + 1;
          const isFilled = starNumber <= displayRating;

          return (
            <button
              key={starNumber}
              type="button"
              className={`star-btn ${isFilled ? 'active' : 'inactive'}`}
              onClick={() => onRatingChange && onRatingChange(starNumber)}
              onMouseEnter={() => setHoverRating(starNumber)}
              onMouseLeave={() => setHoverRating(0)}
              title={`${starNumber} sao`}
            >
              ⭐
            </button>
          );
        })}

        <span style={{ fontSize: '0.85rem', color: '#cbd5e1', marginLeft: '0.5rem', fontWeight: 500 }}>
          {rating > 0 ? `${rating} / ${maxStars} sao` : '(Chưa chọn sao)'}
        </span>
      </div>
    </div>
  );
}

