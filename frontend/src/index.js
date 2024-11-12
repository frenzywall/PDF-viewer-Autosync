import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Create the root element using React 18's createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

// Use root.render instead of ReactDOM.render
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
