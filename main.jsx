import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Simple in-memory storage polyfill (replaces window.storage from Claude artifacts)
window.storage = (() => {
  const store = {};
  return {
    get: async (key) => store[key] ? { key, value: store[key] } : null,
    set: async (key, value) => { store[key] = value; return { key, value }; },
    delete: async (key) => { const existed = key in store; delete store[key]; return { key, deleted: existed }; },
    list: async (prefix) => ({ keys: Object.keys(store).filter(k => !prefix || k.startsWith(prefix)) }),
  };
})();

// Use localStorage for persistence
const originalSet = window.storage.set;
const originalGet = window.storage.get;

window.storage.set = async (key, value) => {
  try { localStorage.setItem('qr_' + key, value); } catch {}
  return originalSet(key, value);
};
window.storage.get = async (key) => {
  try {
    const val = localStorage.getItem('qr_' + key);
    if (val) return { key, value: val };
  } catch {}
  return originalGet(key);
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
