// ========================================================================================
// FILE: src/components/common/Card.jsx
// ========================================================================================
// Component Card đa năng tái sử dụng (Prop children - Slot Pattern từ Bài 5)
// ========================================================================================

export default function Card({ 
  children, 
  title, 
  subtitle, 
  variant = 'default' 
}) {
  return (
    <div className={`pure-card card-variant--${variant}`}>
      {(title || subtitle) && (
        <div className="pure-card-header">
          {title && <h3 className="pure-card-title">{title}</h3>}
          {subtitle && <p className="pure-card-subtitle">{subtitle}</p>}
        </div>
      )}
      <div className="pure-card-body">
        {children}
      </div>
    </div>
  );
}
