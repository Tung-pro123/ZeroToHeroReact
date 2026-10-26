import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function UrlOmnibar() {
  const location = useLocation();
  const [copied, setCopied] = useState(false);

  const fullUrl = window.location.origin + location.pathname + location.search + location.hash;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="url-omnibar">
      <div className="url-omnibar-label">
        <span>📡</span>
        <span>URL Inspector</span>
      </div>

      <div className="url-omnibar-box">
        <span className="url-part-domain">{window.location.origin}</span>
        <span className="url-part-path" title="Được đọc bởi useParams() & location.pathname">
          {location.pathname}
        </span>
        {location.search ? (
          <span className="url-part-query" title="Được đọc/ghi bởi useSearchParams() & location.search">
            {location.search}
          </span>
        ) : (
          <span style={{ color: '#475569', fontStyle: 'italic', fontSize: '0.8rem' }}>(không có query string)</span>
        )}
        {location.hash && (
          <span className="url-part-hash" title="Được đọc bởi location.hash">
            {location.hash}
          </span>
        )}
      </div>

      <button
        onClick={handleCopy}
        className="btn btn-secondary btn-sm"
        title="Sao chép URL hoàn chỉnh"
      >
        {copied ? '✓ Đã sao chép' : '📋 Copy URL'}
      </button>
    </div>
  );
}
