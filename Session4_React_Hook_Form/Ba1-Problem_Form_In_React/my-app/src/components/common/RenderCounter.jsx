import React, { useRef, useEffect, useState } from 'react';

export default function RenderCounter({ label = 'Renders' }) {
  const countRef = useRef(1);
  const [flashing, setFlashing] = useState(false);

  useEffect(() => {
    countRef.current += 1;
    setFlashing(true);
    const timer = setTimeout(() => setFlashing(false), 300);
    return () => clearTimeout(timer);
  });

  return (
    <span
      className={`render-badge ${flashing ? 'flash' : ''}`}
      title="Số lần component này đã re-render lại"
    >
      <span>🔥</span>
      <span>{label}: {countRef.current}</span>
    </span>
  );
}
