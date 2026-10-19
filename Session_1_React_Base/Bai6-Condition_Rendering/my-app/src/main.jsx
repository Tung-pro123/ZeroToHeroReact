// ==========================================================================
// ENTRY POINT - MAIN.JSX
// ==========================================================================
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Mount ứng dụng vào thẻ div#root trong file index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
