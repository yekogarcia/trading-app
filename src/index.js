import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './AppTrading';

import './css/style.css';
console.log(process.env)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

