// ==========================================================================
// BADGE COMPONENT - Reusable Status Badge
// ==========================================================================
import React from 'react';

export default function Badge({ children, variant = 'primary', icon }) {
  return (
    <span className={`badge badge-${variant}`}>
      {icon && <span>{icon}</span>}
      {children}
    </span>
  );
}
