import { App } from './app/app';
import ReactDOM from 'react-dom/client';
import React from 'react';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
console.log(root);
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
