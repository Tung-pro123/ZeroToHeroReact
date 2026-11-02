import React, { useRef } from "react";

export default function RenderCounter({
  name = "Component",
  badgeType = "inline",
}) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  const count = renderCount.current;
  let statusClass = "render-low";
  if (count > 10) statusClass = "render-high";
  else if (count > 5) statusClass = "render-medium";

  if (badgeType === "pill") {
    return (
      <span
        className={`render-badge ${statusClass}`}
        title={`${name} đã render ${count} lần`}
      >
        <span>🔥</span> {name}: <strong>{count}</strong>
      </span>
    );
  }

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
      <span className={`render-badge ${statusClass}`}>
        <span>🔄</span> {name} Renders: <strong>{count}</strong>
      </span>
    </div>
  );
}
