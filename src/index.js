import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { db } from './firebase';

console.log("Firebase Connected Successfully!", db);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);