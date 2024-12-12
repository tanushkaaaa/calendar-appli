import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // If this file doesn't exist, you can safely remove this line.
import App from './App'; // Ensure `App.js` exists in the same directory as `index.js`.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
