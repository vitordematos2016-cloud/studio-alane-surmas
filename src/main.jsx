import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Fontes do Google: o <link> chega como media="print" (não bloqueia o JS); ativa antes do 1º render
document.getElementById('fonts-css')?.setAttribute('media', 'all');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
