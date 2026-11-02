import React from 'react';

/**
 * CustomColorSlider - Pure Slider with visual feedback
 * Props: `sliderValue` (number), `onSlide(number)`
 */
export default function CustomColorSlider({
  sliderValue = 50,
  onSlide,
  onBlur,
  min = 0,
  max = 100,
  step = 5,
  label = 'Mức độ kinh nghiệm (Năm làm việc / Điểm số)',
  unit = '%'
}) {
  return (
    <div className="custom-slider-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <label style={{ fontSize: '0.88rem', fontWeight: 600, color: '#f8fafc' }}>
          {label}
        </label>
        <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#38bdf8', fontFamily: 'monospace' }}>
          {sliderValue} {unit}
        </span>
      </div>

      <input
        type="range"
        className="slider-range-input"
        min={min}
        max={max}
        step={step}
        value={sliderValue}
        onChange={(e) => onSlide && onSlide(Number(e.target.value))}
        onBlur={onBlur}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b' }}>
        <span>{min} {unit} (Fresher)</span>
        <span>{Math.round((min + max) / 2)} {unit} (Junior / Mid)</span>
        <span>{max} {unit} (Principal Architect)</span>
      </div>
    </div>
  );
}

